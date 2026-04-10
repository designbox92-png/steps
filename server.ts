import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category TEXT,
    image_url TEXT,
    instructor_name TEXT,
    curriculum TEXT, -- JSON string
    learning_outcomes TEXT, -- JSON string
    skool_url TEXT,
    is_published INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS sections (
    id TEXT PRIMARY KEY,
    content TEXT -- JSON string
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed Courses if empty
const courseCount = db.prepare("SELECT COUNT(*) as count FROM courses").get() as { count: number };
if (courseCount.count === 0) {
  const seedCourses = [
    { 
      title: 'Freelancing Mastery', 
      slug: 'freelancing-mastery', 
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
      title: 'Digital Marketing Pro', 
      slug: 'digital-marketing', 
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
      title: 'UI/UX Design for Freelancers', 
      slug: 'ui-ux-design', 
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
  const insertCourse = db.prepare("INSERT INTO courses (title, slug, price, category, image_url, instructor_name, curriculum, learning_outcomes, skool_url, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");
  seedCourses.forEach(c => insertCourse.run(c.title, c.slug, c.price, c.category, c.image_url, c.instructor_name, c.curriculum, c.learning_outcomes, c.skool_url));
}

// Seed Sections if empty
const sectionCount = db.prepare("SELECT COUNT(*) as count FROM sections").get() as { count: number };
if (sectionCount.count === 0) {
  const seedSections = [
    {
      id: 'home_hero',
      content: JSON.stringify({
        title: 'Skill your way to Success, Master the Global Market.',
        subtitle: "I'm Umar Farooq, and I've helped thousands of freelancers build 6-figure businesses online. Join Freelancing Skill and start your journey to financial freedom today.",
        cta_text: 'Explore Our Trainings',
        video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      })
    },
    {
      id: 'home_why_us',
      content: JSON.stringify({
        title: 'Your Shortcut to Digital Mastery.',
        subtitle: "Freelancing Skill isn't just another course platform. It's a hub where we test, refine, and share the exact strategies I use to dominate the global marketplace.",
        features: [
          { title: 'Structured Learning', description: 'Step-by-step curriculum from basics to advanced mastery.' },
          { title: 'Expert Mentors', description: 'Direct access to industry leaders and successful entrepreneurs.' }
        ]
      })
    },
    {
      id: 'home_testimonials',
      content: JSON.stringify([
        { name: 'Ahmed Khan', role: 'Top Rated Seller', text: 'Freelancing Skill was the turning point in my career.', stats: '$50k+ Earned' },
        { name: 'Sara Malik', role: 'Agency Owner', text: 'The mentorship at Freelancing Skill is unmatched.', stats: '12+ Team Members' }
      ])
    }
  ];
  const insertSection = db.prepare("INSERT INTO sections (id, content) VALUES (?, ?)");
  seedSections.forEach(s => insertSection.run(s.id, s.content));
}

// Seed Settings if empty
const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const seedSettings = [
    { key: 'site_name', value: 'Freelancing Skill' },
    { key: 'logo_text', value: 'FS' },
    { key: 'contact_email', value: 'contact@freelancingskill.com' },
    { key: 'contact_phone', value: '+92 300 1234567' },
    { key: 'contact_address', value: 'Lahore, Pakistan' }
  ];
  const insertSetting = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  seedSettings.forEach(s => insertSetting.run(s.key, s.value));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---
  app.get("/api/courses", (req, res) => {
    const courses = db.prepare("SELECT * FROM courses WHERE is_published = 1").all();
    res.json(courses);
  });

  app.get("/api/courses/:id", (req, res) => {
    const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  });

  app.post("/api/courses", (req, res) => {
    const { title, slug, description, price, category, image_url, instructor_name, curriculum, learning_outcomes, skool_url } = req.body;
    const result = db.prepare(`
      INSERT INTO courses (title, slug, description, price, category, image_url, instructor_name, curriculum, learning_outcomes, skool_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, description, price, category, image_url, instructor_name, JSON.stringify(curriculum), JSON.stringify(learning_outcomes), skool_url);
    res.json({ id: result.lastInsertRowid });
  });

  app.put("/api/courses/:id", (req, res) => {
    const { title, slug, description, price, category, image_url, instructor_name, curriculum, learning_outcomes, skool_url } = req.body;
    db.prepare(`
      UPDATE courses 
      SET title = ?, slug = ?, description = ?, price = ?, category = ?, image_url = ?, instructor_name = ?, curriculum = ?, learning_outcomes = ?, skool_url = ?
      WHERE id = ?
    `).run(title, slug, description, price, category, image_url, instructor_name, JSON.stringify(curriculum), JSON.stringify(learning_outcomes), skool_url, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/courses/:id", (req, res) => {
    db.prepare("DELETE FROM courses WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/sections/:id", (req, res) => {
    const section = db.prepare("SELECT * FROM sections WHERE id = ?").get(req.params.id) as any;
    if (!section) return res.status(404).json({ error: "Section not found" });
    res.json(JSON.parse(section.content));
  });

  app.post("/api/sections/:id", (req, res) => {
    const content = JSON.stringify(req.body);
    db.prepare("INSERT OR REPLACE INTO sections (id, content) VALUES (?, ?)").run(req.params.id, content);
    res.json({ success: true });
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = (settings as any[]).reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  app.post("/api/settings", (req, res) => {
    const { settings } = req.body;
    const updateSetting = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    Object.entries(settings).forEach(([key, value]) => {
      updateSetting.run(key, value);
    });
    res.json({ success: true });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
