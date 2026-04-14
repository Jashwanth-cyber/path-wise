// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  
  const { data: session, status } = useSession(); 
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
    await signOut({ 
      callbackUrl: '/', 
      redirect: true 
    });
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleGetStartedClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (!isLoggedIn) {
      router.push('/signup');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-2">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-x-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow"
              >
                <path 
                  d="M9 29 L14 18 L21 27 L27 11 L33 23" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="logoGradient" x1="9" y1="29" x2="33" y2="11" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-[2.1rem] font-semibold tracking-tighter text-slate-900 dark:text-white">
              PathWise
            </span>
          </div>

          {/* Desktop Navigation - Only show on homepage */}
          {isHomePage && (
            <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-slate-700 dark:text-slate-300">
              <button 
                onClick={() => scrollToSection('problem')}
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                The Problem
              </button>
              <button 
                onClick={() => scrollToSection('solution')}
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Solution
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how')}
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
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
                  className="flex items-center gap-x-3 px-4 py-2.5 rounded-3xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-amber-500 text-white rounded-2xl flex items-center justify-center font-semibold text-lg shadow-sm">
                    {userInitial}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {user?.name || 'Student'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-x-2 px-5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-3xl transition-colors"
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
                  className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-3xl transition-colors"
                >
                  Log in
                </button>
                
                <button 
                  onClick={handleGetStartedClick}
                  className="flex items-center gap-x-2 bg-amber-500 hover:bg-amber-600 text-white px-7 py-3 rounded-3xl font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all active:scale-[0.985]"
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
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900">
            {isHomePage && (
              <div className="flex flex-col gap-y-6 px-4 text-lg font-medium mb-8">
                <button onClick={() => scrollToSection('problem')} className="text-left hover:text-sky-600">The Problem</button>
                <button onClick={() => scrollToSection('solution')} className="text-left hover:text-sky-600">Solution</button>
                <button onClick={() => scrollToSection('features')} className="text-left hover:text-sky-600">Features</button>
                <button onClick={() => scrollToSection('how')} className="text-left hover:text-sky-600">How it Works</button>
              </div>
            )}

            <div className="px-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-amber-500 text-white rounded-2xl flex items-center justify-center font-semibold text-2xl">
                      {userInitial}
                    </div>
                    <div>
                      <p className="font-semibold">{user?.name || 'Student'}</p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl font-medium"
                  >
                    Go to Dashboard
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-3xl font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleLoginClick}
                    className="w-full py-4 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-3xl font-medium"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={handleGetStartedClick}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-3xl font-semibold"
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