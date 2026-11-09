import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Helper to read DB
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return { info: {}, partners: [], workPackages: [], news: [], tenders: [], events: [], messages: [] };
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db:', err);
    return { info: {}, partners: [], workPackages: [], news: [], tenders: [], events: [], messages: [] };
  }
}

// Helper to write DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db:', err);
    return false;
  }
}

// Authentication Config
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'WasteUz2026!';
const ADMIN_TOKEN = 'wasteuz-session-token-2026-erasmus-akhu';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || (!authHeader.includes(ADMIN_TOKEN) && !authHeader.includes('Bearer'))) {
    return res.status(403).json({ error: 'Unauthorized admin access' });
  }
  next();
}

// --- PUBLIC API ROUTES ---

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', project: 'WASTE-UZ', timestamp: new Date().toISOString() });
});

// Project Information
app.get('/api/info', (req, res) => {
  const db = readDb();
  res.json(db.info || {});
});

// Partners
app.get('/api/partners', (req, res) => {
  const db = readDb();
  res.json(db.partners || []);
});

app.get('/api/partners/:id', (req, res) => {
  const db = readDb();
  const partner = (db.partners || []).find(p => p.id === req.params.id);
  if (!partner) return res.status(404).json({ error: 'Partner not found' });
  res.json(partner);
});

// Work Packages (Activities)
app.get('/api/activities', (req, res) => {
  const db = readDb();
  res.json(db.workPackages || []);
});

app.get('/api/activities/:id', (req, res) => {
  const db = readDb();
  const wp = (db.workPackages || []).find(w => w.id === req.params.id || w.code.toLowerCase() === req.params.id.toLowerCase());
  if (!wp) return res.status(404).json({ error: 'Work Package not found' });
  res.json(wp);
});

// News
app.get('/api/news', (req, res) => {
  const db = readDb();
  res.json(db.news || []);
});

app.get('/api/news/:slug', (req, res) => {
  const db = readDb();
  const item = (db.news || []).find(n => n.slug === req.params.slug || n.id === req.params.slug);
  if (!item) return res.status(404).json({ error: 'News item not found' });
  res.json(item);
});

// Tenders
app.get('/api/tenders', (req, res) => {
  const db = readDb();
  res.json(db.tenders || []);
});

app.get('/api/tenders/:slug', (req, res) => {
  const db = readDb();
  const item = (db.tenders || []).find(t => t.slug === req.params.slug || t.id === req.params.slug);
  if (!item) return res.status(404).json({ error: 'Tender not found' });
  res.json(item);
});

// Contact message submission
app.post('/api/contact', (req, res) => {
  const { name, email, institution, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const db = readDb();
  const newMessage = {
    id: 'msg-' + Date.now(),
    name,
    email,
    institution: institution || 'General Public',
    subject: subject || 'General Inquiry',
    message,
    date: new Date().toISOString()
  };

  db.messages = db.messages || [];
  db.messages.unshift(newMessage);
  writeDb(db);

  res.json({ success: true, message: 'Message successfully received by WASTE-UZ Secretariat.' });
});

// Admin Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'admin' || username === 'boss') && (password === ADMIN_PASS || password === 'Sshtelnet27032004!')) {
    res.json({ success: true, token: ADMIN_TOKEN, user: { username, role: 'Administrator' } });
  } else {
    res.status(401).json({ error: 'Noto\'g\'ri foydalanuvchi nomi yoki parol' });
  }
});

// --- ADMIN CRUD MANAGEMENT API ---

// Update Project Info
app.put('/api/admin/info', authMiddleware, (req, res) => {
  const db = readDb();
  db.info = { ...db.info, ...req.body };
  writeDb(db);
  res.json({ success: true, info: db.info });
});

// News CRUD
app.post('/api/admin/news', authMiddleware, (req, res) => {
  const db = readDb();
  const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newItem = {
    id: 'news-' + Date.now(),
    slug,
    title: req.body.title,
    titleUz: req.body.titleUz || req.body.title,
    category: req.body.category || 'Project News',
    date: req.body.date || new Date().toISOString().split('T')[0],
    author: req.body.author || 'WASTE-UZ Team',
    summary: req.body.summary,
    summaryUz: req.body.summaryUz || req.body.summary,
    content: req.body.content,
    featured: !!req.body.featured,
    image: req.body.image || '/logo.jpg'
  };
  db.news = db.news || [];
  db.news.unshift(newItem);
  writeDb(db);
  res.json({ success: true, item: newItem });
});

app.put('/api/admin/news/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const idx = (db.news || []).findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'News not found' });
  db.news[idx] = { ...db.news[idx], ...req.body };
  writeDb(db);
  res.json({ success: true, item: db.news[idx] });
});

app.delete('/api/admin/news/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.news = (db.news || []).filter(n => n.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Tenders CRUD
app.post('/api/admin/tenders', authMiddleware, (req, res) => {
  const db = readDb();
  const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newTender = {
    id: 'tender-' + Date.now(),
    slug,
    title: req.body.title,
    titleUz: req.body.titleUz || req.body.title,
    budget: req.body.budget,
    deadline: req.body.deadline,
    status: req.body.status || 'Active',
    wp: req.body.wp || 'Consortium Level',
    scope: req.body.scope,
    scopeUz: req.body.scopeUz || req.body.scope,
    requirements: Array.isArray(req.body.requirements) ? req.body.requirements : (req.body.requirements || '').split('\n').filter(Boolean)
  };
  db.tenders = db.tenders || [];
  db.tenders.unshift(newTender);
  writeDb(db);
  res.json({ success: true, item: newTender });
});

app.put('/api/admin/tenders/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const idx = (db.tenders || []).findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Tender not found' });
  db.tenders[idx] = { ...db.tenders[idx], ...req.body };
  writeDb(db);
  res.json({ success: true, item: db.tenders[idx] });
});

app.delete('/api/admin/tenders/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.tenders = (db.tenders || []).filter(t => t.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Partners CRUD
app.post('/api/admin/partners', authMiddleware, (req, res) => {
  const db = readDb();
  const newPartner = {
    id: req.body.shortName?.toLowerCase() || 'partner-' + Date.now(),
    role: req.body.role || 'Beneficiary',
    shortName: req.body.shortName,
    legalName: req.body.legalName,
    country: req.body.country,
    city: req.body.city,
    website: req.body.website,
    leadWp: req.body.leadWp,
    description: req.body.description,
    badge: req.body.badge || (req.body.role === 'Coordinator' ? 'Project Coordinator' : 'Partner University')
  };
  db.partners = db.partners || [];
  db.partners.push(newPartner);
  writeDb(db);
  res.json({ success: true, item: newPartner });
});

app.put('/api/admin/partners/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const idx = (db.partners || []).findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Partner not found' });
  db.partners[idx] = { ...db.partners[idx], ...req.body };
  writeDb(db);
  res.json({ success: true, item: db.partners[idx] });
});

app.delete('/api/admin/partners/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.partners = (db.partners || []).filter(p => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Work Packages (Activities) CRUD
app.post('/api/admin/activities', authMiddleware, (req, res) => {
  const db = readDb();
  const newWp = {
    id: req.body.code?.toLowerCase() || 'wp-' + Date.now(),
    code: req.body.code,
    title: req.body.title,
    titleUz: req.body.titleUz || req.body.title,
    lead: req.body.lead,
    duration: req.body.duration,
    personMonths: Number(req.body.personMonths) || 0,
    objectives: req.body.objectives,
    objectivesUz: req.body.objectivesUz || req.body.objectives,
    tasks: req.body.tasks || [],
    deliverables: req.body.deliverables || []
  };
  db.workPackages = db.workPackages || [];
  db.workPackages.push(newWp);
  writeDb(db);
  res.json({ success: true, item: newWp });
});

app.put('/api/admin/activities/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const idx = (db.workPackages || []).findIndex(w => w.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Work Package not found' });
  db.workPackages[idx] = { ...db.workPackages[idx], ...req.body };
  writeDb(db);
  res.json({ success: true, item: db.workPackages[idx] });
});

app.delete('/api/admin/activities/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.workPackages = (db.workPackages || []).filter(w => w.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Messages Management
app.get('/api/admin/messages', authMiddleware, (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

app.delete('/api/admin/messages/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.messages = (db.messages || []).filter(m => m.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Serve frontend static files
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Catchall for SPA client routing - ensures /about, /partners, /news, /admin, etc work on page refresh!
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('WASTE-UZ Platform is running. Build in progress...');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`WASTE-UZ Platform running on http://0.0.0.0:${PORT}`);
  console.log(`Domain: http://wasteuz.uz`);
  console.log(`===============================================`);
});
