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
    description: 'Learn the exact roadmap to build a 6-figure freelancing career on Upwork and Fiverr from the ground up.',
    price: 15000, 
    category: 'Freelancing', 
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'The Freelance Mindset', duration: '20:00' },
      { title: 'Choosing Your High-Income Niche', duration: '35:00' },
      { title: 'Upwork Algorithm Mastery', duration: '45:00' },
      { title: 'Fiverr Gigs that Rank #1', duration: '40:00' },
      { title: 'Proposal Writing Secrets', duration: '55:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Win high-ticket clients consistently',
      'Optimize profiles for maximum visibility',
      'Master the art of cold outreach',
      'Build a sustainable recurring income stream'
    ]),
    skool_url: 'https://www.skool.com/skills-pay-the-bills-by-umar-7418/classroom'
  },
  { 
    id: 2,
    title: 'UI/UX Design for Modern Web', 
    slug: 'ui-ux-design', 
    description: 'Design world-class user interfaces and experiences using Figma and modern design principles.',
    price: 18000, 
    category: 'Design', 
    image_url: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&w=800&q=80', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'Introduction to Figma', duration: '30:00' },
      { title: 'Typography & Color Theory', duration: '45:00' },
      { title: 'Layout & Spacing Systems', duration: '50:00' },
      { title: 'Prototyping & Interactions', duration: '60:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Create pixel-perfect UI designs',
      'Build comprehensive design systems',
      'Conduct professional user research',
      'Deliver developer-ready handoffs'
    ]),
    skool_url: 'https://www.skool.com/skills-pay-the-bills-by-umar-7418/classroom'
  },
  { 
    id: 3,
    title: 'Digital Marketing & FB Ads', 
    slug: 'digital-marketing', 
    description: 'Complete guide to Facebook Ads, Sales Funnels, and lead generation for local and international brands.',
    price: 12000, 
    category: 'Marketing', 
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'Ads Manager Foundations', duration: '25:00' },
      { title: 'Targeting & Audience Research', duration: '40:00' },
      { title: 'Copywriting for Conversions', duration: '35:00' },
      { title: 'Scaling & Retargeting', duration: '50:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Launch profitable ad campaigns',
      'Calculate ROI and CPA precisely',
      'Build high-converting landing pages',
      'Master the Facebook Pixel & CAPI'
    ]),
    skool_url: 'https://www.skool.com/skills-pay-the-bills-by-umar-7418/classroom'
  },
  { 
    id: 4,
    title: 'Content Strategy & Branding', 
    slug: 'content-branding', 
    description: 'Build your personal brand and learn content strategies that get you noticed by high-paying clients.',
    price: 10000, 
    category: 'Branding', 
    image_url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80', 
    instructor_name: 'Umar Farooq',
    curriculum: JSON.stringify([
      { title: 'Personal Branding Roadmap', duration: '20:00' },
      { title: 'LinkedIn Authority Building', duration: '30:00' },
      { title: 'Short-Form Video Content', duration: '40:00' },
      { title: 'Storytelling for Business', duration: '35:00' }
    ]),
    learning_outcomes: JSON.stringify([
      'Grow a targeted audience on LinkedIn',
      'Create viral content consistently',
      'Position yourself as an industry expert',
      'Generate inbound leads effortlessly'
    ]),
    skool_url: 'https://www.skool.com/skills-pay-the-bills-by-umar-7418/classroom'
  }
];
