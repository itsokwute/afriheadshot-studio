'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { ShieldCheck, Award, Building2 } from 'lucide-react';

export const EnterpriseLogoStrip: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const enterpriseHubs = [
    { name: 'Paystack', location: 'Lagos & San Francisco', tag: 'Fintech' },
    { name: 'Flutterwave', location: 'Lagos & New York', tag: 'Payments' },
    { name: 'Safaricom', location: 'Nairobi', tag: 'Telecom & M-Pesa' },
    { name: 'Standard Bank', location: 'Johannesburg', tag: 'Investment Banking' },
    { name: 'Access Bank', location: 'Lagos & London', tag: 'Corporate Banking' },
    { name: 'MTN Group', location: 'Johannesburg', tag: 'Global Telecom' },
    { name: 'Interswitch', location: 'Lagos & Nairobi', tag: 'Digital Payments' },
    { name: 'Kuda Bank', location: 'Lagos & London', tag: 'Neobank' }
  ];

  return (
    <section className={`py-8 border-b transition-colors ${
      isLight
        ? 'bg-white border-slate-200'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5]'
        : 'bg-slate-950 border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
        {/* Header Text */}
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-widest font-extrabold text-amber-500 flex items-center justify-center space-x-1.5">
            <Award className="h-4 w-4" />
            <span>Trusted Enterprise Leadership Standard</span>
          </p>
          <h3 className={`text-sm sm:text-base font-bold ${
            isLight ? 'text-slate-800' : isTerracotta ? 'text-[#2D241E]' : 'text-slate-300'
          }`}>
            Trusted by professionals across leading organizations in Lagos, Nairobi, Johannesburg, and London
          </h3>
        </div>

        {/* Responsive Logo & Hub Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
          {enterpriseHubs.map((hub, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 group hover:border-amber-500/50 ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md'
                  : isTerracotta
                  ? 'bg-white border-[#E8DFD5] hover:shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center space-x-1 mb-1">
                <Building2 className="h-3.5 w-3.5 text-amber-500 opacity-80 group-hover:opacity-100" />
                <span className={`font-extrabold text-xs tracking-tight ${
                  isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                }`}>
                  {hub.name}
                </span>
              </div>
              <span className="text-[10px] opacity-60 font-medium truncate max-w-[100px]">
                {hub.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
