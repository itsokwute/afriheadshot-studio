'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { Trash2, Lock, ShieldCheck, Server } from 'lucide-react';

export const BiometricPrivacySection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const cards = [
    {
      title: 'Delete when you want (or we do it for you)',
      desc: 'All uploaded selfies and generated images are automatically deleted after 30 days, or instantly upon request.',
      icon: Trash2,
      badge: '30-day auto-purge'
    },
    {
      title: 'Your images for your headshots only',
      desc: 'Individual AI models are run in ephemeral memory and never used to train public foundation models.',
      icon: Lock,
      badge: 'Ephemeral memory'
    },
    {
      title: 'Caring by not sharing',
      desc: 'We do not share, distribute, or sell your images or personal data to third parties.',
      icon: ShieldCheck,
      badge: 'Zero third-party sharing'
    },
    {
      title: 'Rock-solid security',
      desc: 'Passwordless, encrypted in transit via TLS 1.3 with protected, isolated storage buffers.',
      icon: Server,
      badge: 'TLS 1.3 encrypted'
    }
  ];

  return (
    <section className={`py-12 border-b transition-colors ${
      isLight
        ? 'bg-slate-50 border-slate-200'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5]'
        : 'bg-slate-950 border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* Sentence Case Heading & Subtitle */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Biometric privacy guarantee
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
          }`}>
            Your data is yours, <span className="text-blue-600">and yours only</span>
          </h2>
          <p className="text-sm opacity-75">
            Throughout your journey, your data is secure and in your control.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-3 transition-all hover:shadow-md ${
                  isLight
                    ? 'bg-white border-slate-200'
                    : isTerracotta
                    ? 'bg-white border-[#E8DFD5]'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {card.badge}
                    </span>
                  </div>

                  <h4 className={`font-bold text-sm sm:text-base leading-snug ${
                    isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                  }`}>
                    {card.title}
                  </h4>
                  
                  <p className="text-xs opacity-75 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
