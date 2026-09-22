import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, Sparkles,
  ArrowUpRight, ArrowDownRight, Key, LogOut, Search, Filter, ShieldCheck,
  ChevronDown, BarChart2, PieChart, Clock, Layers
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({ user, onLogout, onOpenAiDrawer, onOpenKeyModal, apiKey }) {
  const [timeRange, setTimeRange] = useState('6M');
  const [filterCategory, setFilterCategory] = useState('All');

  // Business metrics data
  const kpis = [
    { title: 'Total Pendapatan (YTD)', value: 'Rp 4,820,000,000', change: '+12.5%', positive: true, icon: DollarSign },
    { title: 'Laba Bersih (Net Margin)', value: 'Rp 1,450,000,000', change: '+8.2%', positive: true, icon: Wallet },
    { title: 'Bebun Operasional (OpEx)', value: 'Rp 820,000,000', change: '-3.1%', positive: true, icon: CreditCard },
    { title: 'Cash Runway Perusahaan', value: '14.2 Bulan', change: '+1.5 Bln', positive: true, icon: Clock }
  ];

  // Cash flow chart data
  const lineChartData = {
    labels: ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Pemasukan (Inflow)',
        data: [620, 710, 850, 780, 890, 970],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Pengeluaran (Outflow)',
        data: [410, 430, 520, 480, 490, 510],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.05)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { size: 11, family: 'Plus Jakarta Sans' } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1'
      }
    },
    scales: {
      x: { grid: { color: '#1e293b' }, ticks: { color: '#64748b' } },
      y: { grid: { color: '#1e293b' }, ticks: { color: '#64748b' } }
    }
  };

  // Transactions list
  const transactions = [
    { id: 'TX-9021', desc: 'SaaS Subscription Revenue (Enterprise)', category: 'Pendapatan', date: '21 Mar 2026', amount: '+Rp 240,000,000', status: 'Selesai', type: 'in' },
    { id: 'TX-9020', desc: 'Sewa Server Cloud AWS & Infrastructure', category: 'Infrastruktur', date: '20 Mar 2026', amount: '-Rp 45,000,000', status: 'Selesai', type: 'out' },
    { id: 'TX-9019', desc: 'Pembayaran Gaji Tim Engineering & Product', category: 'Payroll', date: '19 Mar 2026', amount: '-Rp 310,000,000', status: 'Selesai', type: 'out' },
    { id: 'TX-9018', desc: 'Lisensi Software Perusahaan & Alat AI', category: 'Software', date: '18 Mar 2026', amount: '-Rp 18,500,000', status: 'Pending', type: 'out' },
    { id: 'TX-9017', desc: 'Kontrak Konsultasi Keuangan Korporat', category: 'Pendapatan', date: '15 Mar 2026', amount: '+Rp 180,000,000', status: 'Selesai', type: 'in' }
  ];

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              FP
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">FinPulse</span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                Enterprise
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Assistant Trigger Button */}
            <button
              onClick={onOpenAiDrawer}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <Sparkles size={14} />
              <span>Tanya FinPulse AI</span>
            </button>

            {/* API Key Modal Button */}
            <button
              onClick={onOpenKeyModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                apiKey
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              <Key size={13} />
              <span>{apiKey ? 'Gemini Active' : 'Set Gemini Key'}</span>
            </button>

            {/* User Profile & Logout */}
            <div className="pl-2 border-l border-slate-800 flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-white">{user.name}</div>
                <div className="text-[10px] text-slate-400">{user.role}</div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Keluar"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl">
          <div>
            <h1 className="text-xl font-bold text-white">Ikhtisar Eksekutif Keuangan</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Data transaksi terintegrasi real-time untuk <span className="text-slate-200 font-medium">{user.company || 'Nusantara Global Tech'}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Rentang Waktu:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    timeRange === range
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium">{kpi.title}</span>
                  <div className="p-2 rounded-lg bg-slate-800/80 text-emerald-400">
                    <Icon size={16} />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white tracking-tight">{kpi.value}</div>
                  <div className="flex items-center gap-1 text-[11px] font-medium mt-1 text-emerald-400">
                    <ArrowUpRight size={12} />
                    <span>{kpi.change} vs periode lalu</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Financial Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Cashflow Line Chart */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Tren Arus Kas (Inflow vs Outflow)</h3>
                <p className="text-[11px] text-slate-400">Pemasukan operasional vs pengeluaran beban dalam jutaan Rupiah</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Inflow</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Outflow</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          {/* AI Financial Health Summary */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles size={14} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">Analisis Singkat AI</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Sehat</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="font-medium text-slate-200 mb-1">Rasio Margin Kotor: 68%</div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Margin kotor berada di atas rata-rata industri SaaS (60%). Pertahankan beban server untuk menjaga efisiensi.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="font-medium text-slate-200 mb-1">Rekomendasi Optimalisasi:</div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Alokasikan 15% dari cadangan kas ke instrumen pasar uang untuk tambahan pendapatan imbal hasil.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAiDrawer}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Diskusi Lebih Lanjut dengan AI</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Transaksi Terbaru</h3>
              <p className="text-[11px] text-slate-400">Catatan arus masuk dan keluar dana korporasi</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">ID Transaksi</th>
                  <th className="py-2.5 px-3">Deskripsi</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3">Tanggal</th>
                  <th className="py-2.5 px-3">Jumlah</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{tx.id}</td>
                    <td className="py-3 px-3 font-medium">{tx.desc}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{tx.date}</td>
                    <td className={`py-3 px-3 font-semibold ${tx.type === 'in' ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {tx.amount}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          tx.status === 'Selesai'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
