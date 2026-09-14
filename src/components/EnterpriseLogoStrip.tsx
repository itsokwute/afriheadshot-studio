'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';

export const EnterpriseLogoStrip: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const enterpriseBrands = [
    { name: 'Paystack', hub: 'Lagos & SF' },
    { name: 'Flutterwave', hub: 'Lagos & NY' },
    { name: 'Safaricom', hub: 'Nairobi' },
    { name: 'Standard Bank', hub: 'Johannesburg' },
    { name: 'Access Bank', hub: 'Lagos & London' },
    { name: 'MTN Group', hub: 'Johannesburg' },
    { name: 'Interswitch', hub: 'Lagos & Nairobi' },
    { name: 'Kuda Bank', hub: 'Lagos & London' }
  ];

  return (
    <section className={`py-10 border-b transition-colors ${
      isLight
        ? 'bg-white border-slate-200'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5]'
        : 'bg-slate-950 border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        {/* Sentence Case Heading */}
        <div className="text-center">
          <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
            isLight ? 'text-slate-700' : isTerracotta ? 'text-[#2D241E]' : 'text-slate-300'
          }`}>
            36 million professional headshots created for the best teams in the world
          </h3>
        </div>

        {/* Grayscale Logo Marquee */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pt-2">
          {enterpriseBrands.map((brand, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 group hover:grayscale-0 grayscale opacity-75 hover:opacity-100 ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md'
                  : isTerracotta
                  ? 'bg-white border-[#E8DFD5] hover:shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <span className={`font-black text-sm tracking-tight ${
                isLight ? 'text-slate-800' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
              }`}>
                {brand.name}
              </span>
              <span className="text-[10px] opacity-60 font-medium truncate max-w-[100px] mt-0.5">
                {brand.hub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
