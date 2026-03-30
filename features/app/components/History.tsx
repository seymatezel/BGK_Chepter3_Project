import React from 'react';
import { AnalysisResult } from '../types';
import { formatDate } from '../lib/utils';
import { History as HistoryIcon, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryProps {
  history: AnalysisResult[];
  onDelete: (id: string) => void;
  onClose: () => void;
  onSelect: (result: AnalysisResult) => void;
}

export const History: React.FC<HistoryProps> = ({ history, onDelete, onClose, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
    >
      <div className="p-6 border-b flex justify-between items-center bg-blue-600 text-white">
        <div className="flex items-center gap-2">
          <HistoryIcon size={24} />
          <h2 className="text-xl font-bold">Geçmiş Analizler</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">Henüz bir analiz yapmadınız.</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-xl hover:border-blue-300 cursor-pointer transition-all bg-gray-50 group relative"
              onClick={() => onSelect(item)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={item.result === 'TEHLİKELİ' ? 'text-red-600 font-bold' : item.result === 'ŞÜPHELİ' ? 'text-yellow-600 font-bold' : 'text-green-600 font-bold'}>
                  {item.result === 'TEHLİKELİ' ? '🔴' : item.result === 'ŞÜPHELİ' ? '🟡' : '🟢'} {item.result}
                </span>
                <span className="text-xs text-gray-400">{formatDate(item.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
