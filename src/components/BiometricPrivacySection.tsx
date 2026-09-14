'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { Trash2, Lock, ShieldCheck, Server } from 'lucide-react';

export const BiometricPrivacySection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const privacyPoints = [
    {
      title: 'Delete when you want (or we do it for you)',
      desc: 'All uploaded selfie inputs and vector face maps are automatically deleted after 30 days, or instantly upon request.',
      icon: Trash2
    },
    {
      title: 'Your images for your headshots only',
      desc: 'Your facial likeness remains 100% your property; never used or licensed to train public AI foundation models.',
      icon: Lock
    },
    {
      title: 'Caring by not sharing',
      desc: 'Strict zero third-party data selling, ad tracking, or commercial monetization of user photos.',
      icon: ShieldCheck
    },
    {
      title: 'Rock-solid security',
      desc: 'Bank-grade TLS 1.3 encrypted transit with SOC-2 compliant isolated storage buffers.',
      icon: Server
    }
  ];

  return (
    <div className={`p-6 rounded-2xl border transition-colors my-6 ${
      isLight
        ? 'bg-slate-50/80 border-slate-200 shadow-sm'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5] shadow-sm'
        : 'bg-slate-900/60 border-slate-800'
    }`}>
      {/* Section Header */}
      <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-200/40">
        <ShieldCheck className="h-5 w-5 text-emerald-500" />
        <h4 className={`font-bold text-sm sm:text-base ${
          isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
        }`}>
          Enterprise-Grade Biometric Privacy & Data Security Architecture
        </h4>
      </div>

      {/* 4-Point Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {privacyPoints.map((point, idx) => {
          const IconComp = point.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200'
                  : isTerracotta
                  ? 'bg-white border-[#E8DFD5]'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2 text-emerald-500 mb-2">
                <IconComp className="h-4 w-4 shrink-0" />
                <h5 className={`font-bold text-xs ${
                  isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                }`}>
                  {point.title}
                </h5>
              </div>
              <p className="text-[11px] opacity-75 leading-relaxed">
                {point.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
