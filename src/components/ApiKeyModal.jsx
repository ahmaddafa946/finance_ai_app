import React, { useState } from 'react';
import { Key, CheckCircle, ExternalLink, X, Shield } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSave }) {
  const [inputValue, setInputValue] = useState(apiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSave(inputValue.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Key size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Pengaturan Gemini API</h3>
            <p className="text-xs text-slate-400">Google Generative AI Key</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              API Key Anda
            </label>
            <input
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
            <Shield size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>
              API Key tersimpan secara lokal di browser Anda (LocalStorage) dan tidak dikirim ke server pihak ketiga manapun selain API resmi Google.
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Dapatkan API Key gratis di Google AI Studio
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {isSaved ? (
                <>
                  <CheckCircle size={14} /> Tersimpan
                </>
              ) : (
                'Simpan Kunci'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
