export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  instructor_name: string;
  curriculum: string; // JSON string
  learning_outcomes: string; // JSON string
  skool_url: string;
}

export const COURSES: Course[] = [
  { 
    id: 1,
    title: 'Freelancing Mastery', 
    slug: 'freelancing-mastery', 
    description: 'Master the art of freelancing and build a sustainable 6-figure business from scratch.',
    price: 15000, 
    category: 'Freelancing', 
    image_url: 'https://picsum.photos/seed/freelance/800/500', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'Introduction to Freelancing', duration: '15:00' },
      { title: 'Setting up your Profile', duration: '25:00' },
      { title: 'Winning your first Client', duration: '45:00' },
      { title: 'Scaling to $5k/month', duration: '60:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Master Upwork and Fiverr algorithms',
      'Build a high-converting professional portfolio',
      'Learn advanced client psychological triggers',
      'Systematize your freelance business for growth'
    ]),
    skool_url: 'https://www.skool.com/freelancing-skill'
  },
  { 
    id: 2,
    title: 'Digital Marketing Pro', 
    slug: 'digital-marketing', 
    description: 'Learn high-ROI digital marketing strategies to scale any business online.',
    price: 12000, 
    category: 'Marketing', 
    image_url: 'https://picsum.photos/seed/marketing/800/500', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'Social Media Basics', duration: '20:00' },
      { title: 'Running High-ROI Ads', duration: '35:00' },
      { title: 'Content Strategy', duration: '40:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Run profitable Facebook & Instagram Ads',
      'Master SEO basics for organic growth',
      'Create content that converts followers to buyers'
    ]),
    skool_url: 'https://www.skool.com/freelancing-skill'
  },
  { 
    id: 3,
    title: 'UI/UX Design for Freelancers', 
    slug: 'ui-ux-design', 
    description: 'Design beautiful, user-centric interfaces that clients will love.',
    price: 18000, 
    category: 'Design', 
    image_url: 'https://picsum.photos/seed/design/800/500', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'Figma Essentials', duration: '30:00' },
      { title: 'User Research Methods', duration: '45:00' },
      { title: 'Prototyping & Handoff', duration: '50:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Master Figma from scratch to advanced',
      'Understand user psychology in design',
      'Build a world-class design portfolio'
    ]),
    skool_url: 'https://www.skool.com/freelancing-skill'
  }
];
