import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Send, Loader2, X, Link as LinkIcon, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysisFormProps {
  onAnalyze: (content: string, isImage: boolean, type: 'text' | 'image' | 'link' | 'qr') => Promise<void>;
  isLoading: boolean;
  type: 'text' | 'image' | 'link' | 'qr';
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, isLoading, type }) => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !preview) return;

    if (preview) {
      await onAnalyze(preview, true, type);
      setPreview(null);
    } else {
      await onAnalyze(content, false, type);
      setContent('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'text': return 'Gelen mesajı buraya yapıştırın...';
      case 'link': return 'Şüpheli linki (URL) buraya yapıştırın...';
      case 'qr': return 'QR kod görselini buraya yükleyin...';
      default: return 'Buraya yazın...';
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'text': return 'Mesajı Kontrol Et';
      case 'link': return 'Linki Kontrol Et';
      case 'qr': return 'QR Kodu Kontrol Et';
      case 'image': return 'Görseli Kontrol Et';
      default: return 'Kontrol Et';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        {type === 'text' || type === 'link' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={getPlaceholder()}
            className="w-full p-6 text-xl border-4 border-gray-200 rounded-3xl focus:border-blue-500 focus:ring-0 min-h-[150px] transition-all bg-white shadow-inner resize-none"
            disabled={isLoading}
          />
        ) : (
          <div 
            onClick={() => !isLoading && fileInputRef.current?.click()}
            className={`w-full p-10 border-4 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${preview ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'}`}
          >
            {preview ? (
              <div className="relative w-full max-w-xs aspect-square">
                <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                  className="absolute -top-4 -right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 bg-white rounded-full shadow-md text-blue-600">
                  {type === 'qr' ? <QrCode size={48} /> : <ImageIcon size={48} />}
                </div>
                <p className="text-xl font-bold text-gray-600 text-center">
                  Görseli seçmek için buraya tıklayın
                </p>
                <p className="text-sm text-gray-400">Ekran görüntüsü veya fotoğraf yükleyebilirsiniz</p>
              </>
            )}
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {(type === 'text' || type === 'image') && !preview && (
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-4 px-6 bg-white border-4 border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-gray-700"
              disabled={isLoading}
            >
              <ImageIcon size={24} /> Görsel Yükle
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || (!content && !preview)}
        className={`w-full py-6 rounded-3xl font-black text-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${isLoading || (!content && !preview) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={32} />
            Bakıyoruz, bir saniye...
          </>
        ) : (
          <>
            <Send size={32} />
            {getButtonText()}
          </>
        )}
      </button>
    </form>
  );
};
