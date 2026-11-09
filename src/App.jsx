import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PartnersSection from './components/PartnersSection';
import WorkPackagesSection from './components/WorkPackagesSection';
import VirtualLabSection from './components/VirtualLabSection';
import NewsSection from './components/NewsSection';
import TendersSection from './components/TendersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ArticleModal from './components/ArticleModal';
import AdminModal from './components/AdminModal';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');
  const [info, setInfo] = useState(null);
  const [partners, setPartners] = useState([]);
  const [workPackages, setWorkPackages] = useState([]);
  const [news, setNews] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const t = translations[lang] || translations.en;

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-brand-blue selection:text-white">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero t={t} lang={lang} />
        <AboutSection t={t} lang={lang} info={info} />
        <PartnersSection t={t} lang={lang} partners={partners} />
        <WorkPackagesSection t={t} lang={lang} workPackages={workPackages} />
        <VirtualLabSection t={t} lang={lang} />
        <NewsSection
          t={t}
          lang={lang}
          news={news}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
        <TendersSection
          t={t}
          lang={lang}
          tenders={tenders}
          onApplyTender={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <ContactSection t={t} lang={lang} />
      </main>

      {/* Footer */}
      <Footer t={t} lang={lang} partners={partners} />

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        lang={lang}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshData={loadAllData}
      />
    </div>
  );
}
