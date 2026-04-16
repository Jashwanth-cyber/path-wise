// components/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-[#0f0407] text-zinc-600 dark:text-rose-200/60 border-t border-zinc-200 dark:border-rose-900/20 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand Section */}
          <div className="max-w-xs">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-rose-500/30">
                P
              </div>
              <span className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-white">
                PathWise
              </span>
            </div>
            <p className="leading-relaxed">
              AI-powered career guidance platform helping Indian students go from confusion to clarity with personalized roadmaps and daily tasks.
            </p>
            <p className="mt-8 text-xs text-zinc-400 dark:text-rose-200/40">
              © 2026 PathWise Technologies Pvt Ltd<br />
              Hyderabad, Telangana, India
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10">
            <div>
              <p className="uppercase text-xs tracking-widest text-zinc-500 dark:text-rose-400/60 mb-4 font-bold">Product</p>
              <div className="space-y-3 text-sm">
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Features</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Pricing</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">For Colleges</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Roadmap</a>
              </div>
            </div>

            <div>
              <p className="uppercase text-xs tracking-widest text-zinc-500 dark:text-rose-400/60 mb-4 font-bold">Company</p>
              <div className="space-y-3 text-sm">
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">About Us</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Blog</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Careers</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <p className="uppercase text-xs tracking-widest text-zinc-500 dark:text-rose-400/60 mb-4 font-bold">Legal</p>
              <div className="space-y-3 text-sm">
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-rose-600 dark:hover:text-rose-300 transition-colors">Trust & Safety</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-rose-900/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="text-center md:text-right text-zinc-500 dark:text-rose-200/50">
            Made with <span className="text-rose-500">❤️</span> for every student who wants clarity in their career
          </div>

          {/* Changed version color to match the orange accent */}
          <div className="text-orange-500 dark:text-orange-400/80 font-medium tracking-wide">
            Version 24.04 
          </div>
        </div>
      </div>
    </footer>
  );
}