// components/Header.tsx
'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, LogOut, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface HeaderProps {
  onGetStarted?: () => void;
}

export default function Header({ onGetStarted }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { data: session } = useSession(); 
  const isLoggedIn = !!session?.user;
  const isHomePage = pathname === '/';

  const user = session?.user;
  const userInitial = user?.name 
    ? user.name.charAt(0).toUpperCase() 
    : user?.email 
      ? user.email.charAt(0).toUpperCase() 
      : '?';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
     setIsMobileMenuOpen(false);
    await signOut({ 
      callbackUrl: '/', 
      redirect: true 
    });
  };

  const handleLoginClick = () => {
     setIsMobileMenuOpen(false);
    router.push('/login');
  };

  const handleGetStartedClick = () => {
     setIsMobileMenuOpen(false);
    if (onGetStarted) {
      onGetStarted();
    } else if (!isLoggedIn) {
      router.push('/signup');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#1c0f14]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-rose-900/30 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-2">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
              >
                <path 
                  d="M9 29 L14 18 L21 27 L27 11 L33 23" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  {/* Updated to Rose -> Orange gradient */}
                  <linearGradient id="logoGradient" x1="9" y1="29" x2="33" y2="11" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f43f5e" /> 
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-[2.1rem] font-semibold tracking-tighter text-zinc-900 dark:text-white">
              PathWise
            </span>
          </div>

          {/* Desktop Navigation - Only show on homepage */}
          {isHomePage && (
            <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-zinc-700 dark:text-rose-100/80">
              <button 
                onClick={() => scrollToSection('problem')}
                className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
              >
                The Problem
              </button>
              <button 
                onClick={() => scrollToSection('solution')}
                className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
              >
                Solution
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how')}
                className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
              >
                How it Works
              </button>
            </nav>
          )}

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-x-4">
            {isLoggedIn ? (
              // Logged-in User Profile + Logout
              <div className="flex items-center gap-x-4">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center gap-x-3 px-4 py-2.5 rounded-3xl hover:bg-zinc-100 dark:hover:bg-[#2b131c] transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-orange-500 text-white rounded-2xl flex items-center justify-center font-semibold text-lg shadow-sm shadow-rose-500/20">
                    {userInitial}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-zinc-900 dark:text-rose-50">
                      {user?.name || 'Student'}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-rose-200/60 -mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-x-2 px-5 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-3xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              // Not Logged In - Show Login + Get Started
              <>
                <button 
                  onClick={handleLoginClick}
                  className="px-6 py-2.5 text-sm font-medium text-zinc-700 dark:text-rose-100/90 hover:bg-zinc-100 dark:hover:bg-[#2b131c] rounded-3xl transition-colors"
                >
                  Log in
                </button>
                
                <button 
                  onClick={handleGetStartedClick}
                  className="flex items-center gap-x-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-7 py-3 rounded-3xl font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all active:scale-[0.985]"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-rose-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-rose-900/30 py-6 bg-white dark:bg-[#1c0f14]">
            {isHomePage && (
              <div className="flex flex-col gap-y-6 px-4 text-lg font-medium mb-8 text-zinc-900 dark:text-rose-100">
                <button onClick={() => scrollToSection('problem')} className="text-left hover:text-rose-600 dark:hover:text-rose-400">The Problem</button>
                <button onClick={() => scrollToSection('solution')} className="text-left hover:text-rose-600 dark:hover:text-rose-400">Solution</button>
                <button onClick={() => scrollToSection('features')} className="text-left hover:text-rose-600 dark:hover:text-rose-400">Features</button>
                <button onClick={() => scrollToSection('how')} className="text-left hover:text-rose-600 dark:hover:text-rose-400">How it Works</button>
              </div>
            )}

            <div className="px-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-[#2b131c] rounded-3xl mb-4 border border-zinc-100 dark:border-rose-900/30">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 text-white rounded-2xl flex items-center justify-center font-semibold text-2xl shadow-sm shadow-rose-500/20">
                      {userInitial}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-rose-50">{user?.name || 'Student'}</p>
                      <p className="text-sm text-zinc-500 dark:text-rose-200/60">{user?.email}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-4 bg-zinc-100 dark:bg-[#2b131c] hover:bg-zinc-200 dark:hover:bg-[#3a1a26] text-zinc-900 dark:text-rose-50 rounded-3xl font-medium transition-colors"
                  >
                    Go to Dashboard
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-3xl font-medium flex items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleLoginClick}
                    className="w-full py-4 text-zinc-700 dark:text-rose-100 border border-zinc-300 dark:border-rose-800/50 rounded-3xl font-medium hover:bg-zinc-50 dark:hover:bg-[#2b131c] transition-colors"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={handleGetStartedClick}
                    className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-3xl font-semibold shadow-lg shadow-rose-500/30 active:scale-[0.985] transition-transform"
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}