'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export const FaqAccordion: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does AfriHeadshot Studio work?',
      answer: 'Simply upload 1 to 10 casual selfies or reference photos. Our biometric identity pipeline extracts your facial bone structure, skin tone, and hair boundaries, then synthesizes photorealistic corporate executive portraits in your choice of 50 backgrounds, 11 African hairstyles, and 6 formal attire options.'
    },
    {
      question: 'What kind of photos do I need to upload?',
      answer: 'Upload clear head & shoulders photos with good natural lighting and neutral or smiling facial expressions. Avoid heavy sunglasses, hats, pixelated crops, or group shots. Varied facial angles (frontal, 3/4 left, 3/4 right) yield optimal identity preservation.'
    },
    {
      question: 'How accurate are the melanin skin tones and afro hairstyles?',
      answer: 'Our custom prompt injector enforces zero skin-lightening bias. It strictly locks in authentic melanin undertones (Rich Warm Cocoa, Deep Ebony, Golden Bronze) and authentic 4C hair textures including low fades, 360 waves, locs, box braids, and Senegalese twists.'
    },
    {
      question: 'Can I use these headshots on LinkedIn, resumes, and executive profiles?',
      answer: 'Yes! All exported headshots are delivered in high-resolution 2048x2048 PNG format with standard 1:1 square and 4:5 portrait aspect ratio presets, perfect for LinkedIn profile avatars, corporate websites, speaker press kits, and executive resumes.'
    },
    {
      question: 'Do I retain full ownership of my headshots?',
      answer: 'Yes, 100%. You retain full commercial and personal ownership of all generated headshots. You are free to use them across any corporate, commercial, or personal platform without attribution.'
    }
  ];

  return (
    <section className={`py-16 border-b transition-colors ${
      isLight
        ? 'bg-white border-slate-200'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5]'
        : 'bg-slate-950 border-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* Sentence Case Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got questions?</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
          }`}>
            Frequently asked <span className="text-blue-600">questions</span>
          </h2>
          <p className="text-sm opacity-75">
            Everything you need to know about our AI headshot studio process.
          </p>
        </div>

        {/* Clean Border Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : isTerracotta
                    ? 'bg-white border-[#E8DFD5] hover:border-[#D6C4B4]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-base flex items-center justify-between space-x-4 transition-colors"
                >
                  <span className={isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-blue-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm leading-relaxed opacity-85 border-t border-slate-200/40">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
