import React, { useState, useEffect } from 'react';
import { X, Shield, Lock, KeyRound, Mail, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onRefreshData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('wasteuz_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [newNews, setNewNews] = useState({ title: '', titleUz: '', category: 'Project News', summary: '', content: '' });
  const [newTender, setNewTender] = useState({ title: '', titleUz: '', budget: '', deadline: '', scope: '', requirements: '' });
  const [actionStatus, setActionStatus] = useState('');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchMessages(token);
    }
  }, [token]);

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
        setIsLoggedIn(true);
        fetchMessages(data.token);
      } else {
        setLoginErr(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginErr('Connection error');
    }
  };

  const fetchMessages = async (authToken) => {
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const msgs = await res.json();
        setMessages(msgs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    setActionStatus('');
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newNews)
      });
      if (res.ok) {
        setActionStatus('News published successfully!');
        setNewNews({ title: '', titleUz: '', category: 'Project News', summary: '', content: '' });
        onRefreshData();
      }
    } catch (err) {
      setActionStatus('Failed to publish');
    }
  };

  const handleAddTender = async (e) => {
    e.preventDefault();
    setActionStatus('');
    try {
      const reqsArray = newTender.requirements.split('\n').filter(Boolean);
      const res = await fetch('/api/admin/tenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...newTender, requirements: reqsArray })
      });
      if (res.ok) {
        setActionStatus('Tender published successfully!');
        setNewTender({ title: '', titleUz: '', budget: '', deadline: '', scope: '', requirements: '' });
        onRefreshData();
      }
    } catch (err) {
      setActionStatus('Failed to publish tender');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wasteuz_admin_token');
    setToken('');
    setIsLoggedIn(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-blue" />
            <h3 className="font-black text-slate-900 text-lg">WASTE-UZ Administration Portal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-sky-100 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Consortium Staff Login</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Access restricted to authorized project coordinators.
                </p>
              </div>

              {loginErr && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{loginErr}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                    placeholder="admin or boss"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                    placeholder="••••••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition"
                >
                  Log In
                </button>
              </form>
            </div>
          ) : (
            /* Admin Panel Dashboard */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      activeTab === 'messages' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Inquiries ({messages.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('addNews')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      activeTab === 'addNews' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    + Publish News
                  </button>
                  <button
                    onClick={() => setActiveTab('addTender')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      activeTab === 'addTender' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    + Publish Tender
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Log Out
                </button>
              </div>

              {actionStatus && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{actionStatus}</span>
                </div>
              )}

              {/* Tab 1: Contact Inquiries */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Received Inquiries & Collaboration Requests:
                  </h4>
                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      No inquiries received yet. Form submissions from visitors will appear here.
                    </p>
                  ) : (
                    messages.map((m) => (
                      <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 text-sm">{m.name}</strong>
                          <span className="text-slate-400 font-mono">{new Date(m.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-brand-blue">{m.email} • {m.institution}</div>
                        <div className="font-semibold text-slate-700">Subject: {m.subject}</div>
                        <p className="text-slate-600 bg-white p-2.5 rounded border border-slate-200 mt-1">
                          {m.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Add News */}
              {activeTab === 'addNews' && (
                <form onSubmit={handleAddNews} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Title (Uzbek)</label>
                    <input
                      type="text"
                      value={newNews.titleUz}
                      onChange={(e) => setNewNews({ ...newNews, titleUz: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category</label>
                      <select
                        value={newNews.category}
                        onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      >
                        <option>Project News</option>
                        <option>Tenders & Vacancies</option>
                        <option>Events</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Short Summary *</label>
                    <textarea
                      required
                      rows={2}
                      value={newNews.summary}
                      onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Content *</label>
                    <textarea
                      required
                      rows={4}
                      value={newNews.content}
                      onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <button type="submit" className="px-5 py-2.5 bg-brand-blue text-white rounded-lg font-bold">
                    Publish News
                  </button>
                </form>
              )}

              {/* Tab 3: Add Tender */}
              {activeTab === 'addTender' && (
                <form onSubmit={handleAddTender} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tender Title *</label>
                    <input
                      type="text"
                      required
                      value={newTender.title}
                      onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Budget (EUR) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 8,000 EUR"
                        value={newTender.budget}
                        onChange={(e) => setNewTender({ ...newTender, budget: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Deadline *</label>
                      <input
                        type="date"
                        required
                        value={newTender.deadline}
                        onChange={(e) => setNewTender({ ...newTender, deadline: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Scope of Work *</label>
                    <textarea
                      required
                      rows={3}
                      value={newTender.scope}
                      onChange={(e) => setNewTender({ ...newTender, scope: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Requirements (one per line)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 5+ years experience in EU projects&#10;Fluency in English"
                      value={newTender.requirements}
                      onChange={(e) => setNewTender({ ...newTender, requirements: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <button type="submit" className="px-5 py-2.5 bg-amber-600 text-white rounded-lg font-bold">
                    Publish Tender
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
