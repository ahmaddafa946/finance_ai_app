// Google Gemini API service for Financial & Business AI Assistant

export async function askGeminiFinancialAdvisor({ apiKey, prompt, conversationHistory = [], systemContext = "" }) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API Key Gemini belum dimasukkan. Silakan atur API Key pada tombol di sudut kanan atas.');
  }

  const defaultSystemInstruction = `Anda adalah "FinPulse AI", Chief Financial Officer (CFO) dan Senior Business Strategy Advisor berkualifikasi internasional (CFA / MBA).
Tugas Anda adalah:
1. Memberikan analisis keuangan, perhitungan rasio (ROI, CAC, LTV, Burn Rate, Margin), dan saran strategi bisnis yang tajam, logis, terstruktur, dan aplikatif.
2. Gaya bahasa: Profesional, ringkas, objektif, tanpa basa-basi berlebihan, berbasis data, dan mudah dipahami.
3. Gunakan pemformatan Markdown (poin-poin, tabel ringkas jika relevan, bolding untuk angka kunci).
4. Jika menghitung mata uang di Indonesia, gunakan format Rupiah (Rp).
${systemContext ? `\nKonteks Data Finansial Pengguna Saat Ini:\n${systemContext}` : ''}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

  // Build contents
  const contents = [];

  // Previous turns
  conversationHistory.forEach((item) => {
    contents.push({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    });
  });

  // Current prompt
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const body = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: defaultSystemInstruction }]
    },
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData?.error?.message || `HTTP Error ${response.status}: ${response.statusText}`;
      
      // Fallback try gemini-1.5-flash if 2.5-flash model name has version issue
      if (response.status === 404 || message.includes('not found')) {
        return await fallbackGemini15({ apiKey, prompt, conversationHistory, systemInstruction: defaultSystemInstruction });
      }
      
      throw new Error(message);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      throw new Error('Tidak ada respon yang valid dari model Gemini.');
    }
    return reply;
  } catch (err) {
    console.error('Gemini API call error:', err);
    throw err;
  }
}

async function fallbackGemini15({ apiKey, prompt, conversationHistory, systemInstruction }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
  
  const contents = [];
  conversationHistory.forEach((item) => {
    contents.push({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    });
  });
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: contents,
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP Error ${response.status}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada teks respon.';
}
