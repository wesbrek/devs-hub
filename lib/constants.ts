export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: 'Tech Innovators Summit 2026',
    image: '/images/event1.png',
    slug: 'tech-innovators-summit-2026',
    location: 'San Francisco, CA',
    date: '2026-01-15',
    time: '09:00 AM',
  },
  {
    title: 'Global Hackathon 2026',
    image: '/images/event2.png',
    slug: 'global-hackathon-2026',
    location: 'Online',
    date: '2026-02-01',
    time: '10:00 AM',
  },
  {
    title: 'AI & Future Tech',
    image: '/images/event3.png',
    slug: 'ai-future-tech',
    location: 'New York, NY',
    date: '2026-03-20',
    time: '08:30 AM',
  },
  {
    title: 'Developer Week',
    image: '/images/event4.png',
    slug: 'developer-week',
    location: 'Austin, TX',
    date: '2026-04-15',
    time: '09:00 AM',
  },
  {
    title: 'Web3 Conference',
    image: '/images/event5.png',
    slug: 'web3-conference',
    location: 'Miami, FL',
    date: '2026-05-10',
    time: '10:00 AM',
  },
  {
    title: 'Startup Pitch Night',
    image: '/images/event6.png',
    slug: 'startup-pitch-night',
    location: 'Seattle, WA',
    date: '2026-06-05',
    time: '06:00 PM',
  },
];
