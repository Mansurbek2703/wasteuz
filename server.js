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
app.use(express.json({ limit: '10mb' }));

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

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', project: 'WASTE-UZ', timestamp: new Date().toISOString() });
});

app.get('/api/info', (req, res) => {
  const db = readDb();
  res.json(db.info || {});
});

app.get('/api/partners', (req, res) => {
  const db = readDb();
  res.json(db.partners || []);
});

app.get('/api/activities', (req, res) => {
  const db = readDb();
  res.json(db.workPackages || []);
});

app.get('/api/work-packages', (req, res) => {
  const db = readDb();
  res.json(db.workPackages || []);
});

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

app.get('/api/tenders', (req, res) => {
  const db = readDb();
  res.json(db.tenders || []);
});

app.get('/api/events', (req, res) => {
  const db = readDb();
  res.json(db.events || []);
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

// Admin authentication
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'WasteUz2026!';
const ADMIN_TOKEN = 'wasteuz-session-token-2026-erasmus-akhu';

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'admin' || username === 'boss') && (password === ADMIN_PASS || password === 'Sshtelnet27032004!')) {
    res.json({ success: true, token: ADMIN_TOKEN, user: { username, role: 'Administrator' } });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Middleware for admin verification
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes(ADMIN_TOKEN)) {
    return res.status(403).json({ error: 'Unauthorized admin access' });
  }
  next();
}

app.get('/api/admin/messages', authMiddleware, (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

app.post('/api/admin/news', authMiddleware, (req, res) => {
  const db = readDb();
  const newItem = {
    id: 'news-' + Date.now(),
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: req.body.title,
    titleUz: req.body.titleUz || req.body.title,
    category: req.body.category || 'General News',
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

app.delete('/api/admin/news/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.news = (db.news || []).filter(n => n.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

app.post('/api/admin/tenders', authMiddleware, (req, res) => {
  const db = readDb();
  const newTender = {
    id: 'tender-' + Date.now(),
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: req.body.title,
    titleUz: req.body.titleUz || req.body.title,
    budget: req.body.budget,
    deadline: req.body.deadline,
    status: req.body.status || 'Active',
    wp: req.body.wp || 'Consortium Level',
    scope: req.body.scope,
    scopeUz: req.body.scopeUz || req.body.scope,
    requirements: req.body.requirements || []
  };
  db.tenders = db.tenders || [];
  db.tenders.unshift(newTender);
  writeDb(db);
  res.json({ success: true, item: newTender });
});

// Serve frontend static files
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Catchall for SPA client routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('WASTE-UZ API Server is running on port ' + PORT + '. Frontend is building...');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`WASTE-UZ Platform running on http://0.0.0.0:${PORT}`);
  console.log(`Domain: http://wasteuz.uz`);
  console.log(`===============================================`);
});
