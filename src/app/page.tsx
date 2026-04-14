// app/page.tsx
'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, PlayCircle, Star, Users, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function PathWiseLanding() {
  const router = useRouter();
  const features = [
    {
      icon: "🧬",
      title: "AI Career Assessment",
      desc: "7-minute quiz that understands your unique strengths, JEE rank & goals.",
    },
    {
      icon: "🛤️",
      title: "Personalized Roadmaps",
      desc: "24-month hyper-specific plan with weekly milestones.",
    },
    {
      icon: "📊",
      title: "Skill Gap Analysis",
      desc: "Real-time gap report vs top companies like Google, Atlassian & Zomato.",
    },
    {
      icon: "📅",
      title: "Daily Task Dashboard",
      desc: "AI-generated micro-tasks with deadlines and streak protection.",
    },
    {
      icon: "📈",
      title: "Progress Tracking & Streaks",
      desc: "Visual progress, weekly reviews, and AI motivation nudges.",
    },
    {
      icon: "📄",
      title: "Exportable Career Plan (PDF)",
      desc: "Beautiful one-page plan you can share with parents or mentors.",
    },
  ];

  

  const handleGetStarted = () => {
    router.push("/signup")
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
      
     

      {/* HERO SECTION */}
      <section className="pt-20 pb-24 px-12 lg:px-24 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-200 dark:from-slate-700 dark:via-slate-500 dark:to-slate-800">
        <div className="max-w-screen-2xl  mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-5 h-9 rounded-3xl text-sky-600 dark:text-sky-400 text-sm font-medium shadow-sm mb-6">
                <span className="text-lg">✨</span>
                AI built for Indian students
              </div>

              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tighter leading-none mb-6">
                Stop Guessing Your Career.<br />
                <span className="bg-gradient-to-r from-sky-600 to-amber-500 bg-clip-text text-transparent">
                  Start Building It.
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-10">
                PathWise gives you a clear career path, daily tasks, and a step-by-step roadmap to go from confusion to clarity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-6 rounded-3xl text-xl font-semibold shadow-xl flex items-center justify-center gap-x-3"
                >
                  Get Started Free
                  <ArrowRight className="w-6 h-6" />
                </button>

                <button
                  onClick={() => alert("Demo video would play here")}
                  className="border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 px-8 py-6 rounded-3xl text-xl font-medium flex items-center gap-x-3"
                >
                  <PlayCircle className="w-8 h-8" />
                  See How It Works
                </button>
              </div>

              {/* <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900 rounded-2xl ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-sm">🇮🇳</div>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-2xl ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-sm">IIT</div>
                </div>
                <div>
                  <p className="font-semibold">14,892 students joined today</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">from IITs, NITs &amp; top colleges</p>
                </div>
              </div> */}
            </div>

            {/* Hero Dashboard with Parallax Tilt */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end hidden md:block">
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="bottom"
                tiltMaxAngleX={12}
                tiltMaxAngleY={15}
                perspective={1200}
                scale={1.02}
                className="w-full max-w-[420px]"
              >
                <div className="mock-dashboard bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-500 rounded-2xl flex items-center justify-center font-bold text-xl">P</div>
                      <span className="font-semibold text-2xl">PathWise</span>
                    </div>
                    <div className="bg-slate-700 px-4 py-1 rounded-3xl text-sm">Hi, Buddy👋</div>
                  </div>

                  <div className="bg-white/10 rounded-3xl p-5 mb-7">
                    <div className="flex justify-between text-xs mb-3">
                      <span className="flex items-center gap-1"><Flame className="w-4 h-4" /> 19-day streak</span>
                      <span className="text-emerald-400">AI Engineer @ OpenAI</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[83%] bg-gradient-to-r from-amber-400 to-sky-400 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] mt-1 text-white/60">
                      <span>Week 14 / 78</span>
                      <span>83% complete</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-2xl p-4 flex gap-4">
                      <input type="checkbox" defaultChecked className="accent-amber-400 mt-1" />
                      <div>
                        <p className="text-sm">Finish LeetCode — Two Sum variations</p>
                        <p className="text-xs text-white/60">42 min suggested today</p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 flex gap-4">
                      <input type="checkbox" className="accent-amber-400 mt-1" />
                      <div>
                        <p className="text-sm">Build portfolio with Next.js + Tailwind</p>
                        <p className="text-xs text-white/60">Due tomorrow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-6 py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-3xl text-sm font-medium">
              THE REALITY CHECK
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-6">Why Most Students Stay Confused</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🌐", title: "Too many career options", desc: "200+ paths and no smart filter" },
              { emoji: "🗺️", title: "No clear roadmap", desc: "“Study hard” is not a plan" },
              { emoji: "📚", title: "Learning without direction", desc: "Watching endless videos with no goal" },
              { emoji: "⏳", title: "Zero accountability", desc: "Motivation dies after 9 days" },
            ].map((pain, i) => (
              <Tilt key={i} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} className="tilt-card">
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl h-full">
                  <div className="text-5xl mb-6">{pain.emoji}</div>
                  <h3 className="text-2xl font-semibold mb-3">{pain.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{pain.desc}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solution" className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">From Confusion → Clarity → Execution</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-2">
            {[
              { num: "1", emoji: "🧪", title: "Take AI Assessment", desc: "7 minutes • Personalized to Indian students" },
              { num: "2", emoji: "🛤️", title: "Get Your Roadmap", desc: "Exact 24-month plan with milestones" },
              { num: "3", emoji: "📅", title: "Follow Daily Tasks", desc: "Micro-tasks + streak protection" },
            ].map((step, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl p-10 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-sky-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow">
                  {step.num}
                </div>
                <div className="text-6xl mb-6">{step.emoji}</div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">Everything you need in one place</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} glareEnable glareMaxOpacity={0.15}>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h4 className="text-2xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 flex-1">{feature.desc}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-semibold tracking-tight">5 minutes to your first roadmap</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-16 relative pl-12">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
            
            {[
              { step: "1", title: "Sign up with Google", desc: "Takes 12 seconds" },
              { step: "2", title: "Complete your profile", desc: "Marks, stream, goals & preferences" },
              { step: "3", title: "Take the AI Assessment", desc: "7 fun minutes" },
              { step: "4", title: "Receive your career matches", desc: "Instant personalized roadmap" },
              { step: "5", title: "Start daily tasks", desc: "Build momentum with streaks" },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 relative">
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 shadow rounded-3xl flex items-center justify-center text-2xl font-semibold z-10">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      {/* <section id="proof" className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-emerald-600 font-medium mb-8">Trusted by ambitious students across India</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Ananya Sharma",
                college: "IIT Delhi • AI & DS",
                quote: "Went from confusion to a crystal-clear roadmap in 10 minutes. On day 47 of my streak now!",
              },
              {
                name: "Rohan Patel",
                college: "NIT Trichy • CSE",
                quote: "The daily tasks are incredibly specific. I’m actually building things instead of just watching videos.",
              },
              {
                name: "Priya Menon",
                college: "IISc Bangalore • Data Science",
                quote: "My parents finally understand what I’m doing because of the progress dashboard.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl text-left">
                <div className="flex gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.college}</p>
                  </div>
                </div>
                <p className="italic text-slate-600 dark:text-slate-400">“{testimonial.quote}”</p>
                <div className="flex text-amber-400 mt-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 py-28 text-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter max-w-3xl mx-auto">
            Your Career Won’t Build Itself.<br />Start Today.
          </h2>
          <p className="mt-6 text-2xl max-w-md mx-auto opacity-90">
            Join thousands of students who finally know exactly what to do next.
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-12 bg-white text-slate-900 px-14 py-7 rounded-3xl text-xl font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-x-4 mx-auto shadow-2xl"
          >
            Get Started Free
            <ArrowRight className="w-7 h-7" />
          </button>

          {/* <p className="text-sm mt-8 opacity-75">No credit card • Cancel anytime • Built for students like you</p> */}
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div>
              <div className="flex items-center gap-3 text-white mb-4">
                <div className="w-9 h-9 bg-sky-600 rounded-2xl flex items-center justify-center text-2xl font-bold">P</div>
                <span className="text-3xl font-semibold tracking-tighter">PathWise</span>
              </div>
              <p className="max-w-xs">AI career co-pilot for ambitious Indian students.</p>
            </div>

            <div className="grid grid-cols-3 gap-x-16">
              <div>
                <p className="uppercase text-xs tracking-widest mb-4">Product</p>
                <p className="py-1 hover:text-white cursor-pointer">Features</p>
                <p className="py-1 hover:text-white cursor-pointer">Pricing</p>
                <p className="py-1 hover:text-white cursor-pointer">For Colleges</p>
              </div>
              <div>
                <p className="uppercase text-xs tracking-widest mb-4">Company</p>
                <p className="py-1 hover:text-white cursor-pointer">About</p>
                <p className="py-1 hover:text-white cursor-pointer">Blog</p>
                <p className="py-1 hover:text-white cursor-pointer">Contact</p>
              </div>
              <div>
                <p className="uppercase text-xs tracking-widest mb-4">Legal</p>
                <p className="py-1 hover:text-white cursor-pointer">Privacy</p>
                <p className="py-1 hover:text-white cursor-pointer">Terms</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 PathWise Technologies Pvt Ltd • Made with ❤️ in Hyderabad</p>
            <p>Version 24.04 • Live AI v3</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}