import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';
import { Event } from '@/database';
import { handleApiError } from '@/lib/api-error-handler';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: 'Invalid JSON data format' },
        { status: 400 }
      );
    }
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { message: 'Image is required' },
        { status: 400 }
      );
    }

    // Convert File to Buffer for Cloudinary upload
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            folder: 'DevEvent',
          },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        )
        .end(buffer);
    });

    const cloudinaryResult = uploadResult as {
      secure_url: string;
      public_id: string;
    };
    event.image = cloudinaryResult.secure_url;

    // Try to create the event, but cleanup Cloudinary image if it fails
    let createdEvent;
    try {
      createdEvent = await Event.create(event);
    } catch (dbError) {
      // Rollback: Delete the uploaded image from Cloudinary
      try {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary image:', cleanupError);
      }
      // Re-throw the original database error
      throw dbError;
    }

    return NextResponse.json(
      { message: 'Event Created Successfully', event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    return handleApiError(e, 'Event Creation Failed');
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    return handleApiError(e, 'Event Fetching Failed');
  }
}
