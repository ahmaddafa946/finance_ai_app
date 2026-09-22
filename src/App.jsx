import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import AIAssistantDrawer from './components/AIAssistantDrawer.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  // Load API Key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('finpulse_gemini_key') || '';
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('finpulse_gemini_key', newKey);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
          onOpenKeyModal={() => setIsKeyModalOpen(true)}
          apiKey={apiKey}
        />
      )}

      {/* Global AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        apiKey={apiKey}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        financialContext={`
- Perusahaan: ${user?.company || 'Nusantara Global Tech'}
- User Role: ${user?.role || 'Executive'}
- Total Pendapatan YTD: Rp 4.820.000.000
- Laba Bersih (Net Margin): Rp 1.450.000.000
- Beban Operasional: Rp 820.000.000
- Cash Runway: 14.2 Bulan
        `}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}
