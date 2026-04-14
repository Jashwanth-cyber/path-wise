// components/Footer.tsx
import React from 'react';


export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand Section */}
          <div className="max-w-xs">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="w-9 h-9 bg-sky-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                P
              </div>
              <span className="text-3xl font-semibold tracking-tighter text-white">
                PathWise
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              AI-powered career guidance platform helping Indian students go from confusion to clarity with personalized roadmaps and daily tasks.
            </p>
            <p className="mt-8 text-xs text-slate-500">
              © 2026 PathWise Technologies Pvt Ltd<br />
              Hyderabad, Telangana, India
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10">
            <div>
              <p className="uppercase text-xs tracking-widest text-slate-500 mb-4 font-medium">Product</p>
              <div className="space-y-3 text-sm">
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block hover:text-white transition-colors">For Colleges</a>
                <a href="#" className="block hover:text-white transition-colors">Roadmap</a>
              </div>
            </div>

            <div>
              <p className="uppercase text-xs tracking-widest text-slate-500 mb-4 font-medium">Company</p>
              <div className="space-y-3 text-sm">
                <a href="#" className="block hover:text-white transition-colors">About Us</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <p className="uppercase text-xs tracking-widest text-slate-500 mb-4 font-medium">Legal</p>
              <div className="space-y-3 text-sm">
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-white transition-colors">Trust & Safety</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          {/* <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
          </div> */}

          <div className="text-center md:text-right text-slate-500">
            Made with ❤️ for every student who wants clarity in their career
          </div>

          <div className="text-emerald-400 text-xs font-medium">
            Version 24.04 
          </div>
        </div>
      </div>
    </footer>
  );
}