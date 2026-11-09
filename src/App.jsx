import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/PartnersPage';
import ActivitiesPage from './pages/ActivitiesPage';
import VirtualLabPage from './pages/VirtualLabPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import TendersPage from './pages/TendersPage';
import TenderDetailPage from './pages/TenderDetailPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('uz');
  const [info, setInfo] = useState(null);
  const [partners, setPartners] = useState([]);
  const [workPackages, setWorkPackages] = useState([]);
  const [news, setNews] = useState([]);
  const [tenders, setTenders] = useState([]);

  const t = translations[lang] || translations.uz;

  const loadAllData = async () => {
    try {
      const [infoRes, partnersRes, wpRes, newsRes, tendersRes] = await Promise.all([
        fetch('/api/info').then((r) => r.json()).catch(() => null),
        fetch('/api/partners').then((r) => r.json()).catch(() => []),
        fetch('/api/activities').then((r) => r.json()).catch(() => []),
        fetch('/api/news').then((r) => r.json()).catch(() => []),
        fetch('/api/tenders').then((r) => r.json()).catch(() => []),
      ]);

      if (infoRes) setInfo(infoRes);
      if (partnersRes) setPartners(partnersRes);
      if (wpRes) setWorkPackages(wpRes);
      if (newsRes) setNews(newsRes);
      if (tendersRes) setTenders(tendersRes);
    } catch (err) {
      console.error('Failed to load project data:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-[#1b6b37] selection:text-white font-sans">
        <Navbar lang={lang} setLang={setLang} t={t} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  t={t}
                  lang={lang}
                  info={info}
                  partners={partners}
                  workPackages={workPackages}
                  news={news}
                  tenders={tenders}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage t={t} lang={lang} info={info} />}
            />
            <Route
              path="/partners"
              element={<PartnersPage t={t} lang={lang} partners={partners} />}
            />
            <Route
              path="/activities"
              element={<ActivitiesPage t={t} lang={lang} workPackages={workPackages} />}
            />
            <Route
              path="/virtual-lab"
              element={<VirtualLabPage t={t} lang={lang} />}
            />
            <Route
              path="/news"
              element={<NewsPage t={t} lang={lang} news={news} />}
            />
            <Route
              path="/news/:slug"
              element={<NewsDetailPage news={news} lang={lang} />}
            />
            <Route
              path="/tenders"
              element={<TendersPage t={t} lang={lang} tenders={tenders} />}
            />
            <Route
              path="/tenders/:slug"
              element={<TenderDetailPage tenders={tenders} lang={lang} t={t} />}
            />
            <Route
              path="/contact"
              element={<ContactPage t={t} lang={lang} />}
            />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={loadAllData} />}
            />
            <Route
              path="/admin"
              element={
                <AdminPage
                  info={info}
                  partners={partners}
                  workPackages={workPackages}
                  news={news}
                  tenders={tenders}
                  onRefreshData={loadAllData}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer t={t} lang={lang} partners={partners} />
      </div>
    </BrowserRouter>
  );
}
