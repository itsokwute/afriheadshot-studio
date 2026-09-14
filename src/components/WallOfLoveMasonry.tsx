'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export const WallOfLoveMasonry: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const reviews = [
    {
      type: 'photo-card',
      // Black female professional — natural hair, bold confident gaze
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
      quote: 'My locs and skin tone were perfectly captured — it looked like a $2,000 studio shoot.',
      author: 'Amara D.',
      role: 'Product Lead, Lagos'
    },
    {
      type: 'quote-card',
      quote: 'Loved the variety and styling. The pictures turned out great and look completely natural.',
      author: 'Michael O.',
      role: 'Corporate VP, Nairobi',
      stars: 5,
      verified: true
    },
    {
      type: 'photo-card',
      // Black male professional — tailored suit, sharp studio lighting
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80',
      quote: 'Several colleagues reached out asking which studio I visited. I told them it was AI.',
      author: 'Richard P.',
      role: 'Tech Founder, Johannesburg'
    },
    {
      type: 'quote-card',
      quote: 'I was amazed at how easy it was to get executive headshots from my bedroom.',
      author: 'Carol R.',
      role: 'Senior Attorney, London',
      stars: 5,
      verified: true
    },
    {
      type: 'photo-card',
      // Black African woman — corporate blazer, natural hair
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      quote: 'The melanin tone and box braids look astonishingly authentic in every variation.',
      author: 'Zainab M.',
      role: 'Design Director, Kigali'
    },
    {
      type: 'quote-card',
      quote: 'Saved $400 on a physical photoshoot. The senator suit and lighting options are immaculate.',
      author: 'Tunde A.',
      role: 'Finance Manager, Abuja',
      stars: 5,
      verified: true
    },
    {
      type: 'photo-card',
      // Black male executive — navy blazer, confident boardroom framing
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      quote: 'Landed my CEO role partly because of how commanding my new headshot looks on LinkedIn.',
      author: 'Emeka N.',
      role: 'Chief Executive Officer, Accra'
    },
    {
      type: 'quote-card',
      quote: 'The 360 waves and dark skin tone were preserved perfectly. No whitewashing whatsoever.',
      author: 'Kofi A.',
      role: 'Software Engineer, London',
      stars: 5,
      verified: true
    }
  ];

  return (
    <section className={`py-16 border-b transition-colors ${
      isLight
        ? 'bg-slate-50 border-slate-200'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5]'
        : 'bg-slate-950 border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Sentence Case Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Wall of love
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
          }`}>
            Loved by professionals <span className="text-blue-600">across 25+ countries</span>
          </h2>
          <p className="text-sm opacity-75">
            Read authentic reviews from Black executives and professionals worldwide.
          </p>
        </div>

        {/* 3-Column Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => {
            if (rev.type === 'photo-card') {
              return (
                <div
                  key={idx}
                  className="relative group rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 aspect-[4/5] flex flex-col justify-end p-6 bg-slate-950"
                >
                  <img
                    src={rev.image}
                    alt={rev.author}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Bottom Pinned Quote */}
                  <div className="relative z-10 text-white space-y-2">
                    <p className="font-bold text-sm leading-snug drop-shadow-md">
                      "{rev.quote}"
                    </p>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-white/20">
                      <span className="font-extrabold text-amber-300">— {rev.author}</span>
                      <span className="text-[11px] opacity-80">{rev.role}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 shadow-lg transition-all ${
                  isLight
                    ? 'bg-white border-slate-200'
                    : isTerracotta
                    ? 'bg-white border-[#E8DFD5]'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 stroke-none" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Verified output</span>
                      </span>
                    )}
                  </div>

                  <p className={`font-bold text-base leading-relaxed ${
                    isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                  }`}>
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/40 flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-xs shrink-0">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h5 className={`font-bold text-xs ${
                      isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                    }`}>
                      — {rev.author}
                    </h5>
                    <p className="text-[11px] opacity-75">{rev.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
