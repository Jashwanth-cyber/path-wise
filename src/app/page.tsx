// app/page.tsx
'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, PlayCircle, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';


export default function PathWiseLanding() {
  const router = useRouter();
  
  const features = [
    { icon: "🧬", title: "AI Career Assessment", desc: "7-minute quiz that understands your stream, strengths, and career goals" },
    { icon: "🛤️", title: "Personalized Roadmaps", desc: "24-month hyper-specific plan with weekly milestones." },
    { icon: "📊", title: "Skill Gap Analysis", desc: "Real-time skill gap report based on industry requirements and current job market demand." },
    { icon: "📅", title: "Daily Task Dashboard", desc: "AI-generated micro-tasks with deadlines and streak protection." },
    { icon: "📈", title: "Progress Tracking & Streaks", desc: "Visual progress, weekly reviews, and AI motivation nudges." },
    { icon: "📄", title: "Exportable Career Plan (PDF)", desc: "Beautiful one-page plan you can share with parents or mentors." },
  ];

  const handleGetStarted = () => {
    router.push("/signup");
  };

  // Reusable animation variants with TypeScript type
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
   
    <div className="bg-zinc-50 dark:bg-[#1c0f14] min-h-screen font-sans overflow-hidden transition-colors duration-300">
      {/* HERO SECTION */}
      {/* Gradients lifted to softer rose/plum tones */}
      <section className="pt-20 pb-24 px-12 lg:px-24 bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100 dark:from-[#3a1622] dark:via-[#240f17] dark:to-[#2b1115]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-white dark:bg-[#2b131c] px-5 h-9 rounded-3xl text-rose-600 dark:text-rose-300 text-sm font-medium shadow-sm mb-6 border border-rose-100 dark:border-rose-800/50">
                <span className="text-lg">✨</span>
                AI built for Indian students
              </div>

              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tighter leading-none mb-6 text-zinc-900 dark:text-white">
                Stop Guessing Your Career.<br />
                <span className="bg-gradient-to-r from-rose-600 to-orange-500 dark:from-rose-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Start Building It.
                </span>
              </h1>

              <p className="text-xl text-zinc-600 dark:text-rose-100/80 max-w-xl mb-10">
                PathWise gives you a clear career path, daily tasks, and a step-by-step roadmap to go from confusion to clarity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-10 py-6 rounded-3xl text-xl font-semibold shadow-xl shadow-rose-500/20 flex items-center justify-center gap-x-3 transition-all transform hover:-translate-y-1"
                >
                  Get Started Free
                  <ArrowRight className="w-6 h-6" />
                </button>

                <button
                  onClick={() => alert("Demo video would play here")}
                  className="border-2 border-zinc-300 dark:border-rose-800/50 hover:border-zinc-400 dark:hover:border-rose-600 text-zinc-800 dark:text-rose-100 px-8 py-6 rounded-3xl text-xl font-medium flex items-center gap-x-3 transition-colors bg-transparent dark:bg-[#240f17]/50"
                >
                  <PlayCircle className="w-8 h-8 text-rose-500" />
                  See How It Works
                </button>
              </div>
            </motion.div>

            {/* Hero Dashboard with Parallax Tilt */}
            <motion.div 
              className="lg:col-span-5 flex justify-center lg:justify-end hidden md:block"
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor="#f43f5e" glarePosition="bottom" tiltMaxAngleX={12} tiltMaxAngleY={15} perspective={1200} scale={1.02} className="w-full max-w-[420px]">
                <div className="mock-dashboard bg-gradient-to-br from-[#331722] to-[#1c0f14] text-white rounded-3xl p-7 shadow-2xl shadow-rose-900/20 border border-rose-800/40">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-rose-500 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-rose-500/30">P</div>
                      <span className="font-semibold text-2xl">PathWise</span>
                    </div>
                    <div className="bg-[#421e2c] px-4 py-1 rounded-3xl text-sm border border-rose-800/50 text-rose-50">Hi, Buddy👋</div>
                  </div>

                  <div className="bg-white/10 rounded-3xl p-5 mb-7 border border-rose-200/10">
                    <div className="flex justify-between text-xs mb-3">
                      <span className="flex items-center gap-1 text-orange-400"><Flame className="w-4 h-4" /> 19-day streak</span>
                      <span className="text-rose-300">AI Engineer @ OpenAI</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full w-[83%] bg-gradient-to-r from-rose-500 to-orange-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                    </div>
                    <div className="flex justify-between text-[10px] mt-2 text-rose-100/70">
                      <span>Week 14 / 78</span>
                      <span>83% complete</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-black/10 border border-rose-800/30 rounded-2xl p-4 flex gap-4 hover:bg-rose-900/30 transition-colors">
                      <input type="checkbox" defaultChecked className="accent-orange-500 w-4 h-4 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-white">Finish LeetCode — Two Sum variations</p>
                        <p className="text-xs text-rose-200/60 mt-1">42 min suggested today</p>
                      </div>
                    </div>
                    <div className="bg-black/10 border border-rose-800/30 rounded-2xl p-4 flex gap-4 hover:bg-rose-900/30 transition-colors">
                      <input type="checkbox" className="accent-orange-500 w-4 h-4 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-white">Build portfolio with Next.js + Tailwind</p>
                        <p className="text-xs text-rose-300/90 mt-1">Due tomorrow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-white dark:bg-[#240f17]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <span className="px-6 py-2 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 rounded-3xl text-sm font-bold tracking-wider border border-transparent dark:border-rose-800/30">
              THE REALITY CHECK
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-6 text-zinc-900 dark:text-white">Why Most Students Stay Confused</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🌐", title: "Too many career options", desc: "200+ paths and no smart filter" },
              { emoji: "🗺️", title: "No clear roadmap", desc: "“Study hard” is not a plan" },
              { emoji: "📚", title: "Learning without direction", desc: "Watching endless videos with no goal" },
              { emoji: "⏳", title: "Zero accountability", desc: "Motivation dies after 9 days" },
            ].map((pain, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} className="tilt-card h-full">
                  <div className="bg-zinc-50 dark:bg-[#1c0f14] border border-zinc-100 dark:border-rose-900/40 p-8 rounded-3xl h-full shadow-sm">
                    <div className="text-5xl mb-6">{pain.emoji}</div>
                    <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-rose-50">{pain.title}</h3>
                    <p className="text-zinc-500 dark:text-rose-200/70">{pain.desc}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solution" className="py-24 bg-zinc-50 dark:bg-[#1c0f14]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">From Confusion → Clarity → Execution</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-2">
            {[
              { num: "1", emoji: "🧪", title: "Take AI Assessment", desc: "7 minutes • Personalized to Indian students" },
              { num: "2", emoji: "🛤️", title: "Get Your Roadmap", desc: "Exact 24-month plan with milestones" },
              { num: "3", emoji: "📅", title: "Follow Daily Tasks", desc: "Micro-tasks + streak protection" },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white dark:bg-[#2b131c] rounded-3xl p-10 relative shadow-md shadow-zinc-200/50 dark:shadow-rose-900/5 border border-zinc-100 dark:border-rose-800/30"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-rose-500/30">
                  {step.num}
                </div>
                <div className="text-6xl mb-6">{step.emoji}</div>
                <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-rose-50">{step.title}</h3>
                <p className="text-zinc-500 dark:text-rose-200/70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-white dark:bg-[#240f17]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <motion.div 
            className="text-center mb-12"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">Everything you need in one place</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} glareEnable glareMaxOpacity={0.05} glareColor="#f43f5e" className="h-full">
                  <div className="bg-zinc-50 dark:bg-[#1c0f14] border border-zinc-100 dark:border-rose-900/40 rounded-3xl p-8 h-full flex flex-col hover:border-rose-200 dark:hover:border-rose-700/60 transition-colors">
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h4 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-rose-50">{feature.title}</h4>
                    <p className="text-zinc-500 dark:text-rose-200/70 flex-1">{feature.desc}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-zinc-50 dark:bg-[#1c0f14]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">5 minutes to your first roadmap</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-16 relative pl-12">
            <motion.div 
              className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-rose-300 dark:via-rose-700/50 to-transparent origin-top" 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {[
              { step: "1", title: "Sign up with Google", desc: "Takes 12 seconds" },
              { step: "2", title: "Complete your profile", desc: "Marks, stream, goals & preferences" },
              { step: "3", title: "Take the AI Assessment", desc: "7 fun minutes" },
              { step: "4", title: "Receive your career matches", desc: "Instant personalized roadmap" },
              { step: "5", title: "Start daily tasks", desc: "Build momentum with streaks" },
            ].map((item, i) => (
              <motion.div 
                key={item.step} 
                className="flex gap-8 relative group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-[#2b131c] border-2 border-rose-100 dark:border-rose-800/60 group-hover:border-rose-500 dark:group-hover:border-rose-400 group-hover:text-rose-500 transition-colors shadow-sm rounded-3xl flex items-center justify-center text-2xl font-semibold z-10 text-zinc-900 dark:text-rose-100">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-rose-50 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500 dark:text-rose-200/70 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-rose-600 via-fuchsia-600 to-orange-500 py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/0 dark:bg-black/10 pointer-events-none" />
        
        <motion.div 
          className="max-w-screen-2xl mx-auto px-6 lg:px-10 text-center relative z-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter max-w-3xl mx-auto drop-shadow-sm">
            Your Career Won’t Build Itself.<br />Start Today.
          </h2>
          <p className="mt-6 text-2xl max-w-md mx-auto opacity-90 font-medium text-white">
            Be among the first students to get clarity on their career path with <span className="text-yellow-600 font-bold">Pathwise</span>
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-12 bg-white dark:bg-[#1c0f14] text-rose-600 dark:text-rose-300 hover:bg-zinc-50 dark:hover:bg-[#24131a] px-14 py-7 rounded-3xl text-xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-x-4 mx-auto shadow-2xl shadow-zinc-900/20 dark:shadow-black/20 border border-transparent dark:border-rose-800/40"
          >
            Get Started Free
            <ArrowRight className="w-7 h-7" />
          </button>
        </motion.div>
      </section>
    </div>
    
  );
}