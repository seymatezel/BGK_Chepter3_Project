import React, { useState, useEffect } from 'react';
import { Shield, History as HistoryIcon, AlertTriangle, Link as LinkIcon, QrCode, MessageSquare, Info, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalysisResult } from './types';
import { analyzeContent, analyzeUrl } from './services/gemini';
import { History } from './components/History';
import { ResultCard } from './components/ResultCard';
import { AnalysisForm } from './components/AnalysisForm';
import { cn } from './lib/utils';

import { reportScam, subscribeToBulletin } from './services/automation';

export default function App() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'link' | 'qr' | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const success = await subscribeToBulletin(email);
    if (success) {
      setIsSubscribed(true);
      setEmail('');
    } else {
      alert('Kayıt sırasında bir sorun oluştu. (n8n bağlantısı kontrol edilmeli)');
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('trustcheck_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (result: AnalysisResult) => {
    const newHistory = [result, ...history].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem('trustcheck_history', JSON.stringify(newHistory));
  };

  const deleteFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('trustcheck_history', JSON.stringify(newHistory));
  };

  const handleAnalyze = async (content: string, isImage: boolean, type: 'text' | 'image' | 'link' | 'qr') => {
    setIsLoading(true);
    try {
      let aiResponse;
      if (type === 'link') {
        aiResponse = await analyzeUrl(content);
      } else {
        aiResponse = await analyzeContent(content, isImage);
      }

      const result: AnalysisResult = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        type: type === 'image' ? 'text' : type,
        content: isImage ? '[Görsel Analizi]' : content,
        result: aiResponse.SONUÇ,
        reason: aiResponse.NEDEN,
        action: aiResponse.NE_YAPMALI,
        linkVar: aiResponse.LINK_VAR,
        qrVar: aiResponse.QR_VAR,
      };

      setCurrentResult(result);
      saveToHistory(result);
      
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-gray-900 font-sans">
      {/* Header - Dark theme like the screenshot */}
      <header className="bg-[#101828] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="text-blue-400" size={28} />
            <span className="text-2xl font-bold tracking-tight">TrustCheck</span>
          </div>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-medium border border-white/20"
          >
            <HistoryIcon size={18} />
            <span>Eski Kontrollerim</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-black text-[#101828] leading-tight">
            Şüpheli mesajları <span className="text-blue-600">birlikte kontrol edelim.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Gelen SMS, e-posta veya linkleri buraya yapıştırın, güvenli olup olmadığını saniyeler içinde söyleyelim.
          </p>
        </section>

        {/* Main Interaction Area */}
        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid gap-4"
            >
              {/* Menu Cards */}
              <button 
                onClick={() => setActiveTab('text')}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 text-left hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="bg-purple-50 p-4 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
                  <MessageSquare size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Mesaj İncele</h3>
                  <p className="text-gray-500">Gelen mesajın metnini veya fotoğrafını sor</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('link')}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 text-left hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <LinkIcon size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Link Kontrolü</h3>
                  <p className="text-gray-500">Şüpheli internet adreslerini (URL) kontrol et</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('qr')}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 text-left hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform">
                  <QrCode size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Karekod Tara</h3>
                  <p className="text-gray-500">QR kod fotoğrafı yükleyerek analiz et</p>
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={() => { setActiveTab(null); setCurrentResult(null); }}
                className="flex items-center gap-2 text-blue-600 font-bold hover:underline mb-4"
              >
                <ArrowLeft size={20} /> Geri Dön
              </button>
              
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                <AnalysisForm 
                  onAnalyze={handleAnalyze} 
                  isLoading={isLoading} 
                  type={activeTab} 
                />
              </div>

              {/* Result Section inside the active view */}
              <AnimatePresence>
                {currentResult && (
                  <motion.div 
                    id="result-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-8"
                  >
                    <ResultCard 
                      result={currentResult} 
                      onClose={() => setCurrentResult(null)} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Section - Restored from previous version */}
        <section className="bg-white p-8 rounded-[2.5rem] border-4 border-gray-100 space-y-6 shadow-sm">
          <div className="flex items-center gap-4 text-blue-600">
            <Info size={40} />
            <h3 className="text-3xl font-black">Nasıl Kullanılır?</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border-2 border-gray-100">
              <div className="text-3xl font-black text-blue-600 mb-2">01</div>
              <p className="text-lg font-bold text-gray-700">Mesajı kopyalayın veya ekran görüntüsü alın.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border-2 border-gray-100">
              <div className="text-3xl font-black text-blue-600 mb-2">02</div>
              <p className="text-lg font-bold text-gray-700">Buraya yapıştırın veya görseli yükleyin.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border-2 border-gray-100">
              <div className="text-3xl font-black text-blue-600 mb-2">03</div>
              <p className="text-lg font-bold text-gray-700">Sonucu bekleyin ve önerileri uygulayın.</p>
            </div>
          </div>
        </section>

        {/* AI Warning / Info Section */}
        <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 text-center space-y-4">
          <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-2">
            <Info size={24} />
          </div>
          <h4 className="text-xl font-bold text-blue-900">Önemli Hatırlatma</h4>
          <p className="text-blue-800/80 leading-relaxed">
            Bu uygulama bir yapay zeka asistanıdır. Güvenliğiniz için her zaman resmi kurumların (bankanız, e-Devlet vb.) kendi uygulamalarını kullanın. Şüpheli durumlarda asla kişisel bilgilerinizi paylaşmayın.
          </p>
        </section>

        {/* Bulletin Subscription Section */}
        <section className="bg-[#101828] p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Haftalık Güvenlik Bülteni</h3>
            <p className="text-gray-400">En yeni dolandırıcılık yöntemlerinden haberdar olun, kendinizi koruyun.</p>
          </div>
          
          {isSubscribed ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500/20 border border-green-500/50 p-4 rounded-2xl text-center text-green-400 font-bold"
            >
              Aramıza hoş geldiniz! Artık daha güvendesiniz. 🛡️
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-blue-400 transition-all"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all whitespace-nowrap"
              >
                Bültene Katıl
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-gray-200">
        <p className="text-gray-400 text-sm font-medium">
          © 2026 TrustCheck - Dijital Güvenlik Rehberiniz
        </p>
      </footer>

      {/* History Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <History 
              history={history} 
              onDelete={deleteFromHistory} 
              onClose={() => setIsHistoryOpen(false)}
              onSelect={(item) => {
                setActiveTab(item.type as any);
                setCurrentResult(item);
                setIsHistoryOpen(false);
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
