import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Volume2, VolumeX, AlertTriangle, ShieldCheck, ShieldAlert, Info, ExternalLink, QrCode, Megaphone, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { reportScam } from '../services/automation';

interface ResultCardProps {
  result: AnalysisResult;
  onClose: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const handleReport = async () => {
    setIsReporting(true);
    const success = await reportScam(result.content, result.result, result.reason);
    if (success) {
      setIsReported(true);
    } else {
      alert('İhbar gönderilirken bir sorun oluştu. (n8n bağlantısı kontrol edilmeli)');
    }
    setIsReporting(false);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const text = `Sonuç: ${result.result}. Neden: ${result.reason}. Ne yapmalısınız: ${result.action}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onstart = () => setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getBgColor = () => {
    switch (result.result) {
      case 'TEHLİKELİ': return 'bg-red-50 border-red-200';
      case 'ŞÜPHELİ': return 'bg-yellow-50 border-yellow-200';
      case 'GÜVENLİ': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (result.result) {
      case 'TEHLİKELİ': return <ShieldAlert className="text-red-600" size={48} />;
      case 'ŞÜPHELİ': return <AlertTriangle className="text-yellow-600" size={48} />;
      case 'GÜVENLİ': return <ShieldCheck className="text-green-600" size={48} />;
      default: return <Info className="text-gray-600" size={48} />;
    }
  };

  const getTextColor = () => {
    switch (result.result) {
      case 'TEHLİKELİ': return 'text-red-800';
      case 'ŞÜPHELİ': return 'text-yellow-800';
      case 'GÜVENLİ': return 'text-green-800';
      default: return 'text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-6 rounded-3xl border-4 shadow-xl ${getBgColor()} space-y-6 relative overflow-hidden`}
    >
      <div className="flex items-center gap-4">
        {getIcon()}
        <div>
          <h2 className={`text-3xl font-black uppercase tracking-tighter ${getTextColor()}`}>
            {result.result === 'TEHLİKELİ' ? '🔴 TEHLİKELİ' : result.result === 'ŞÜPHELİ' ? '🟡 ŞÜPHELİ' : '🟢 GÜVENLİ'}
          </h2>
          <p className="text-sm text-gray-500 font-bold">ANALİZ TAMAMLANDI</p>
        </div>
        <button
          onClick={speak}
          className={`ml-auto p-4 rounded-full transition-all ${isSpeaking ? 'bg-blue-600 text-white animate-pulse' : 'bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600'}`}
          title="Sesli Dinle"
        >
          {isSpeaking ? <VolumeX size={32} /> : <Volume2 size={32} />}
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white/50 p-4 rounded-2xl border-2 border-white/20">
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Info size={20} className="text-blue-600" /> Neden?
          </h3>
          <p className="text-lg leading-relaxed text-gray-700">{result.reason}</p>
        </div>

        <div className="bg-white/50 p-4 rounded-2xl border-2 border-white/20">
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-600" /> Ne yapmalısınız?
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 font-semibold">{result.action}</p>
        </div>
      </div>

      {result.linkVar && (
        <div className="bg-blue-100 p-4 rounded-2xl border-2 border-blue-200 flex items-start gap-3">
          <ExternalLink className="text-blue-600 shrink-0 mt-1" size={24} />
          <p className="text-blue-800 font-medium">
            💡 Bu mesajda bir link tespit ettik. Linkin güvenliğini de kontrol etmek ister misiniz? Aşağıdaki Link Kontrol bölümünü kullanabilirsiniz.
          </p>
        </div>
      )}

      {result.qrVar && (
        <div className="bg-purple-100 p-4 rounded-2xl border-2 border-purple-200 flex items-start gap-3">
          <QrCode className="text-purple-600 shrink-0 mt-1" size={24} />
          <p className="text-purple-800 font-medium">
            📷 Bu mesajda bir QR kod olduğu anlaşılıyor. QR kodlar da tehlikeli olabilir! Fotoğrafını aşağıdaki QR Kod Kontrol bölümüne yükleyin.
          </p>
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full py-4 bg-gray-800 text-white rounded-2xl font-bold text-xl hover:bg-black transition-colors"
      >
        Kapat
      </button>

      {result.result === 'TEHLİKELİ' && (
        <div className="pt-2">
          <button
            onClick={handleReport}
            disabled={isReporting || isReported}
            className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${isReported ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white border-red-200 text-red-600 hover:bg-red-50'}`}
          >
            {isReported ? (
              <><Check size={20} /> İhbar Edildi</>
            ) : (
              <><Megaphone size={20} /> {isReporting ? 'Gönderiliyor...' : 'Bu Dolandırıcılığı İhbar Et'}</>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            İhbarlar anonim olarak toplanır ve topluluğu uyarmak için kullanılır.
          </p>
        </div>
      )}
    </motion.div>
  );
};
