import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, LogOut, Newspaper, FileBadge, Building, Layers, 
  Info, Mail, Plus, Trash2, Edit3, CheckCircle, AlertCircle, Save, 
  ExternalLink, Calendar, Users, Eye
} from 'lucide-react';

export default function AdminPage({ 
  info, partners, workPackages, news, tenders, onRefreshData 
}) {
  const [token, setToken] = useState(localStorage.getItem('wasteuz_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  // Active section in Admin sidebar
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'news', 'tenders', 'partners', 'wps', 'info', 'messages'
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(null);

  // Forms states
  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '', titleUz: '', category: 'Project News', summary: '', summaryUz: '', content: '', author: 'WASTE-UZ Team', image: '/logo.jpg'
  });

  const [editingTender, setEditingTender] = useState(null);
  const [tenderForm, setTenderForm] = useState({
    title: '', titleUz: '', budget: '', deadline: '', status: 'Active', wp: 'WP1 - Quality', scope: '', scopeUz: '', requirements: ''
  });

  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerForm, setPartnerForm] = useState({
    shortName: '', legalName: '', role: 'Beneficiary', country: 'Uzbekistan', city: '', website: '', leadWp: '', description: ''
  });

  const [infoForm, setInfoForm] = useState({ ...info });

  useEffect(() => {
    if (info) setInfoForm({ ...info });
  }, [info]);

  useEffect(() => {
    if (token) {
      fetchMessages();
    }
  }, [token]);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErr('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('wasteuz_admin_token', data.token);
        setToken(data.token);
        showNotification("Muvaffaqiyatli kirdingiz!");
      } else {
        setLoginErr(data.error || "Noto'g'ri login yoki parol");
      }
    } catch (err) {
      setLoginErr("Server bilan bog'lanishda xatolik");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wasteuz_admin_token');
    setToken('');
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- NEWS ACTIONS ---
  const handleSaveNews = async (e) => {
    e.preventDefault();
    try {
      const url = editingNews ? `/api/admin/news/${editingNews.id}` : '/api/admin/news';
      const method = editingNews ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newsForm)
      });

      if (res.ok) {
        showNotification(editingNews ? "Yangilik yangilandi!" : "Yangi xabar qo'shildi!");
        setEditingNews(null);
        setNewsForm({ title: '', titleUz: '', category: 'Project News', summary: '', summaryUz: '', content: '', author: 'WASTE-UZ Team', image: '/logo.jpg' });
        onRefreshData();
      }
    } catch (err) {
      showNotification("Xatolik yuz berdi", "error");
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm("Rostdan ham ushbu yangilikni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("Xabar o'chirildi!");
        onRefreshData();
      }
    } catch (err) {
      showNotification("O'chirishda xatolik", "error");
    }
  };

  // --- TENDERS ACTIONS ---
  const handleSaveTender = async (e) => {
    e.preventDefault();
    try {
      const url = editingTender ? `/api/admin/tenders/${editingTender.id}` : '/api/admin/tenders';
      const method = editingTender ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tenderForm)
      });

      if (res.ok) {
        showNotification(editingTender ? "Tender yangilandi!" : "Yangi tender e'lon qilindi!");
        setEditingTender(null);
        setTenderForm({ title: '', titleUz: '', budget: '', deadline: '', status: 'Active', wp: 'WP1 - Quality', scope: '', scopeUz: '', requirements: '' });
        onRefreshData();
      }
    } catch (err) {
      showNotification("Tender saqlashda xatolik", "error");
    }
  };

  const handleDeleteTender = async (id) => {
    if (!window.confirm("Rostdan ham ushbu tenderni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/admin/tenders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("Tender o'chirildi!");
        onRefreshData();
      }
    } catch (err) {
      showNotification("O'chirishda xatolik", "error");
    }
  };

  // --- PARTNERS ACTIONS ---
  const handleSavePartner = async (e) => {
    e.preventDefault();
    try {
      const url = editingPartner ? `/api/admin/partners/${editingPartner.id}` : '/api/admin/partners';
      const method = editingPartner ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(partnerForm)
      });

      if (res.ok) {
        showNotification(editingPartner ? "Hamkor ma'lumotlari yangilandi!" : "Yangi hamkor qo'shildi!");
        setEditingPartner(null);
        setPartnerForm({ shortName: '', legalName: '', role: 'Beneficiary', country: 'Uzbekistan', city: '', website: '', leadWp: '', description: '' });
        onRefreshData();
      }
    } catch (err) {
      showNotification("Hamkor saqlashda xatolik", "error");
    }
  };

  const handleDeletePartner = async (id) => {
    if (!window.confirm("Rostdan ham ushbu hamkorni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("Hamkor o'chirildi!");
        onRefreshData();
      }
    } catch (err) {
      showNotification("O'chirishda xatolik", "error");
    }
  };

  // --- INFO ACTIONS ---
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(infoForm)
      });
      if (res.ok) {
        showNotification("Loyiha ma'lumotlari saqlandi!");
        onRefreshData();
      }
    } catch (err) {
      showNotification("Saqlashda xatolik", "error");
    }
  };

  // --- MESSAGES ACTIONS ---
  const handleDeleteMessage = async (id) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
        showNotification("Xabar o'chirildi!");
      }
    } catch (err) {
      showNotification("Xatolik", "error");
    }
  };

  // If NOT logged in, show Login Screen
  if (!token) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-sky-100 text-brand-blue rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">WASTE-UZ Boshqaruv</h1>
            <p className="text-xs text-slate-500">
              Admin panelga kirish uchun tizim parolini kiriting.
            </p>
          </div>

          {loginErr && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{loginErr}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Foydalanuvchi nomi</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin yoki boss"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Parol</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold transition shadow-md"
            >
              Tizimga kirish
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN: Dedicated Admin Dashboard
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-brand-blue rounded-2xl">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">WASTE-UZ Platform Administrator</h1>
            <p className="text-xs text-slate-400">
              Konsorsium koordinatori: Al-Xorazmiy universiteti • wasteuz.uz
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold transition self-start md:self-center"
        >
          <LogOut className="w-4 h-4" />
          <span>Chiqish</span>
        </button>
      </div>

      {notification && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold animate-fadeIn ${
          notification.type === 'error'
            ? 'bg-rose-50 text-rose-800 border border-rose-200'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
        }`}>
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Grid: Sidebar + Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1.5 font-bold text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Dashboard Umumiy</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'news' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-4 h-4" />
              <span>Yangiliklar & E'lonlar</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px]">
              {news.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tenders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'tenders' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileBadge className="w-4 h-4" />
              <span>Tenderlar & Vakansiyalar</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px]">
              {tenders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'partners' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4" />
              <span>Hamkor OTMlar</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px]">
              {partners.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('wps')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'wps' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>Ish Paketlari (WPs)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px]">
              {workPackages.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'info' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Loyiha Pasporti & Matnlar</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition text-left ${
              activeTab === 'messages' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>Murojaatlar & Takliflar</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-brand-blue text-white text-[10px]">
              {messages.length}
            </span>
          </button>
        </div>

        {/* Workspace Panels */}
        <div className="lg:col-span-9 bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900">Platforma ko'rsatkichlari</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase">Yangiliklar</div>
                  <div className="text-3xl font-black text-brand-blue mt-1">{news.length}</div>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase">Tenderlar</div>
                  <div className="text-3xl font-black text-amber-600 mt-1">{tenders.length}</div>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase">Hamkorlar</div>
                  <div className="text-3xl font-black text-emerald-600 mt-1">{partners.length}</div>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase">Murojaatlar</div>
                  <div className="text-3xl font-black text-indigo-600 mt-1">{messages.length}</div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setEditingNews(null);
                    setNewsForm({ title: '', titleUz: '', category: 'Project News', summary: '', summaryUz: '', content: '', author: 'WASTE-UZ Team', image: '/logo.jpg' });
                    setActiveTab('news');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs"
                >
                  + Yangi maqola yozish
                </button>

                <button
                  onClick={() => {
                    setEditingTender(null);
                    setTenderForm({ title: '', titleUz: '', budget: '', deadline: '', status: 'Active', wp: 'WP1 - Quality', scope: '', scopeUz: '', requirements: '' });
                    setActiveTab('tenders');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
                >
                  + Yangi tender e'lon qilish
                </button>

                <a
                  href="/"
                  target="_blank"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <span>Saytni ko'rish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: NEWS MANAGER */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900">
                  {editingNews ? "Yangilikni tahrirlash" : "Yangi xabar / e'lon qo'shish"}
                </h2>
                {editingNews && (
                  <button
                    onClick={() => {
                      setEditingNews(null);
                      setNewsForm({ title: '', titleUz: '', category: 'Project News', summary: '', summaryUz: '', content: '', author: 'WASTE-UZ Team', image: '/logo.jpg' });
                    }}
                    className="text-xs font-bold text-slate-500 hover:underline"
                  >
                    Bekor qilish
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSaveNews} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Sarlavha (Inglizcha) *</label>
                    <input
                      type="text"
                      required
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Sarlavha (O'zbekcha) *</label>
                    <input
                      type="text"
                      required
                      value={newsForm.titleUz}
                      onChange={(e) => setNewsForm({ ...newsForm, titleUz: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategoriya</label>
                    <select
                      value={newsForm.category}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    >
                      <option>Project News</option>
                      <option>Tenders & Vacancies</option>
                      <option>Events</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Muallif / Bo'lim</label>
                    <input
                      type="text"
                      value={newsForm.author}
                      onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rasm URL yoki fayl</label>
                    <input
                      type="text"
                      value={newsForm.image}
                      onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Qisqa mazmun (EN) *</label>
                    <textarea
                      required
                      rows={2}
                      value={newsForm.summary}
                      onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Qisqa mazmun (UZ) *</label>
                    <textarea
                      required
                      rows={2}
                      value={newsForm.summaryUz}
                      onChange={(e) => setNewsForm({ ...newsForm, summaryUz: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">To'liq matn *</label>
                  <textarea
                    required
                    rows={4}
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-md"
                >
                  {editingNews ? "O'zgarishlarni saqlash" : "Xabarni chop etish"}
                </button>
              </form>

              {/* List */}
              <div className="pt-8 border-t border-slate-100 space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Mavjud yangiliklar ro'yxati:</h3>
                {news.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-brand-blue border">
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-400">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{item.titleUz || item.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingNews(item);
                          setNewsForm({ ...item });
                          window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-brand-blue"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TENDERS MANAGER */}
          {activeTab === 'tenders' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900">
                  {editingTender ? "Tenderni tahrirlash" : "Yangi tender qo'shish"}
                </h2>
                {editingTender && (
                  <button
                    onClick={() => {
                      setEditingTender(null);
                      setTenderForm({ title: '', titleUz: '', budget: '', deadline: '', status: 'Active', wp: 'WP1 - Quality', scope: '', scopeUz: '', requirements: '' });
                    }}
                    className="text-xs font-bold text-slate-500 hover:underline"
                  >
                    Bekor qilish
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSaveTender} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tender nomi (EN) *</label>
                    <input
                      type="text"
                      required
                      value={tenderForm.title}
                      onChange={(e) => setTenderForm({ ...tenderForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tender nomi (UZ) *</label>
                    <input
                      type="text"
                      required
                      value={tenderForm.titleUz}
                      onChange={(e) => setTenderForm({ ...tenderForm, titleUz: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Byudjet *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 8,000 EUR"
                      value={tenderForm.budget}
                      onChange={(e) => setTenderForm({ ...tenderForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Oxirgi muddat *</label>
                    <input
                      type="date"
                      required
                      value={tenderForm.deadline}
                      onChange={(e) => setTenderForm({ ...tenderForm, deadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ish paketi / Holat</label>
                    <input
                      type="text"
                      value={tenderForm.wp}
                      onChange={(e) => setTenderForm({ ...tenderForm, wp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vazifa doirasi (Scope) *</label>
                  <textarea
                    required
                    rows={3}
                    value={tenderForm.scopeUz || tenderForm.scope}
                    onChange={(e) => setTenderForm({ ...tenderForm, scopeUz: e.target.value, scope: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Talablar (har biri alohida qatorda)</label>
                  <textarea
                    rows={3}
                    placeholder="Masalan: YI grantlarida 5+ yillik tajriba&#10;Ingliz tilini mukammal bilish"
                    value={Array.isArray(tenderForm.requirements) ? tenderForm.requirements.join('\n') : tenderForm.requirements}
                    onChange={(e) => setTenderForm({ ...tenderForm, requirements: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-md"
                >
                  {editingTender ? "O'zgarishlarni saqlash" : "Tenderni e'lon qilish"}
                </button>
              </form>

              {/* List */}
              <div className="pt-8 border-t border-slate-100 space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Mavjud tenderlar:</h3>
                {tenders.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {item.status}
                        </span>
                        <span className="text-xs font-bold text-amber-700">{item.budget}</span>
                        <span className="text-xs text-slate-400">Deadline: {item.deadline}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{item.titleUz || item.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTender(item);
                          setTenderForm({ ...item });
                          window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-amber-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTender(item.id)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PARTNERS MANAGER */}
          {activeTab === 'partners' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900">
                  {editingPartner ? "Hamkorni tahrirlash" : "Yangi hamkor OTM qo'shish"}
                </h2>
                {editingPartner && (
                  <button
                    onClick={() => {
                      setEditingPartner(null);
                      setPartnerForm({ shortName: '', legalName: '', role: 'Beneficiary', country: 'Uzbekistan', city: '', website: '', leadWp: '', description: '' });
                    }}
                    className="text-xs font-bold text-slate-500 hover:underline"
                  >
                    Bekor qilish
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSavePartner} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Universitet to'liq nomi *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.legalName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, legalName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Qisqartma (Acronym) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AKHU"
                      value={partnerForm.shortName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, shortName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Shahar</label>
                    <input
                      type="text"
                      value={partnerForm.city}
                      onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mamlakat</label>
                    <input
                      type="text"
                      value={partnerForm.country}
                      onChange={(e) => setPartnerForm({ ...partnerForm, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rasmiy veb-sayt</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={partnerForm.website}
                      onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Yetakchi ish paketi</label>
                  <input
                    type="text"
                    placeholder="e.g. WP1 — Project Management"
                    value={partnerForm.leadWp}
                    onChange={(e) => setPartnerForm({ ...partnerForm, leadWp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tavsif (Description)</label>
                  <textarea
                    rows={3}
                    value={partnerForm.description}
                    onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  {editingPartner ? "Hamkorni saqlash" : "Hamkorni qo'shish"}
                </button>
              </form>

              {/* List */}
              <div className="pt-8 border-t border-slate-100 space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Konsorsium a'zolari:</h3>
                {partners.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-blue text-white">
                          {p.shortName}
                        </span>
                        <span className="text-xs text-slate-500">{p.city}, {p.country}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{p.legalName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{p.leadWp}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingPartner(p);
                          setPartnerForm({ ...p });
                          window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePartner(p.id)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WORK PACKAGES */}
          {activeTab === 'wps' && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900">Ish paketlari (Work Packages)</h2>
              <div className="space-y-4">
                {workPackages.map((wp) => (
                  <div key={wp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-brand-blue text-white font-mono font-bold text-xs">
                          {wp.code}
                        </span>
                        <strong className="text-sm text-slate-900">{wp.titleUz || wp.title}</strong>
                      </div>
                      <span className="text-xs font-bold text-slate-500">Lead: {wp.lead}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{wp.objectivesUz || wp.objectives}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200">
                      <span>Davomiyligi: {wp.duration}</span>
                      <span>Mehnat: {wp.personMonths} person-months</span>
                      <span>Vazifalar: {wp.tasks?.length || 0} ta</span>
                      <span>Natijalar: {wp.deliverables?.length || 0} ta</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROJECT INFO & HERO */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-4 text-xs sm:text-sm">
              <h2 className="text-xl font-black text-slate-900 pb-2 border-b border-slate-100">
                Loyiha pasporti va umumiy matnlar
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Loyiha qisqartmasi</label>
                  <input
                    type="text"
                    value={infoForm.acronym || 'WASTE-UZ'}
                    onChange={(e) => setInfoForm({ ...infoForm, acronym: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grant raqami</label>
                  <input
                    type="text"
                    value={infoForm.projectNumber || '101322962'}
                    onChange={(e) => setInfoForm({ ...infoForm, projectNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Loyiha to'liq nomi (O'zbekcha)</label>
                <input
                  type="text"
                  value={infoForm.fullNameUz || ''}
                  onChange={(e) => setInfoForm({ ...infoForm, fullNameUz: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Loyiha annotatsiyasi (O'zbekcha) *</label>
                <textarea
                  rows={4}
                  value={infoForm.abstractUz || ''}
                  onChange={(e) => setInfoForm({ ...infoForm, abstractUz: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Abstract (English) *</label>
                <textarea
                  rows={4}
                  value={infoForm.abstract || ''}
                  onChange={(e) => setInfoForm({ ...infoForm, abstract: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md"
              >
                O'zgarishlarni saqlash
              </button>
            </form>
          )}

          {/* TAB 7: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900">
                  Kelib tushgan murojaatlar ({messages.length})
                </h2>
                <button onClick={fetchMessages} className="text-xs text-brand-blue font-bold hover:underline">
                  Yangilash
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 py-10 text-center">
                  Hozircha hech qanday yangi xabar yo'q.
                </p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-slate-900">{m.name}</strong>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(m.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-brand-blue font-medium">
                      {m.email} • {m.institution}
                    </div>
                    <div className="text-xs font-bold text-slate-700">Mavzu: {m.subject}</div>
                    <p className="text-xs sm:text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-200 mt-1 leading-relaxed">
                      {m.message}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>O'chirish</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

