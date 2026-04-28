'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function RoleSelection() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [customRole, setCustomRole] = useState('');
    const [suggestedRoles, setSuggestedRoles] = useState<{ title: string; reason: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const Roles = [
        {
            id: 1,
            title: "Frontend Developer",
            description: "Build user interfaces using React, HTML, CSS, and JavaScript",
            skills: ["HTML", "CSS", "JavaScript", "React"],
        },
        {
            id: 2,
            title: "Backend Developer",
            description: "Develop APIs and server-side logic",
            skills: ["Node.js", "Express", "MongoDB", "SQL"],
        },
        {
            id: 3,
            title: "Full Stack Developer",
            description: "Work on both frontend and backend systems",
            skills: ["React", "Node.js", "MongoDB", "APIs"],
        },
        {
            id: 4,
            title: "UI/UX Designer",
            description: "Design user-friendly interfaces and experiences",
            skills: ["Figma", "Adobe XD", "User Research"],
        },
        {
            id: 5,
            title: "Mobile App Developer",
            description: "Build mobile applications for Android/iOS",
            skills: ["React Native", "Flutter", "Kotlin", "Swift"],
        },
        {
            id: 6,
            title: "DevOps Engineer",
            description: "Manage CI/CD pipelines and cloud infrastructure",
            skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
        },
        {
            id: 7,
            title: "Data Analyst",
            description: "Analyze data to derive business insights",
            skills: ["SQL", "Python", "Excel", "Power BI"],
        },
        {
            id: 8,
            title: "Machine Learning Engineer",
            description: "Build and deploy ML models",
            skills: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
        },
        {
            id: 9,
            title: "Cybersecurity Analyst",
            description: "Protect systems and networks from threats",
            skills: ["Network Security", "Ethical Hacking", "SIEM"],
        },
        {
            id: 10,
            title: "Product Manager",
            description: "Define product vision and coordinate development",
            skills: ["Roadmapping", "Agile", "Communication"],
        }
    ];
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!session?.user?.id) return;

            try {
                const profileRes = await fetch(`/api/profile?userId=${session.user.id}`);
                if (!profileRes.ok) throw new Error('Failed to fetch profile');

                const profileData = await profileRes.json();
                if (!profileData.exists || !profileData.profile) {
                    router.push('/onboarding');
                    return;
                }

                const suggestRes = await fetch('/api/suggest-roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData.profile)
                });

                if (!suggestRes.ok) throw new Error('Failed to fetch suggestions');

                const suggestData = await suggestRes.json();
                if (suggestData.success) {
                    setSuggestedRoles(suggestData.suggestions);
                }
            } catch (err) {
                console.error('Error fetching suggestions:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchSuggestions();
        }
    }, [status, session, router]);

    const handleSelectRole = async (role: string) => {
        if (!role.trim()) return toast.error('Please enter or select a role');

        setIsSubmitting(true);
        try {
            setCustomRole(role);
            toast.success(`Role selected: ${role} 🎉`);
            router.push('/dashboard');
        } catch (err) {
            toast.error('Failed to select role');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading' || !session?.user?.id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100">
                <div className="w-12 h-12 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100 dark:from-[#3a1622] dark:via-[#240f17] dark:to-[#2b1115] overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >


                    <h1 className="text-3xl lg:text-4xl font-semibold tracking-tighter leading-none text-zinc-900 dark:text-white mb-6">
                        What role do you want to <span className="bg-gradient-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">conquer?</span>
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-rose-100/80 max-w-2xl mx-auto">
                        Choose your dream role or type your own. Our AI will build a complete 24-month roadmap for you.
                    </p>
                </motion.div>

                {/* Main Content Card */}
                <div className="max-w-5xl mx-auto">
                    <Tilt
                        glareEnable={true}
                        glareMaxOpacity={0.15}
                        glareColor="#f43f5e"
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1200}
                        scale={1.02}
                    >
                        <div className="bg-white/70 dark:bg-[#1c0f14]/90 backdrop-blur-2xl border border-white/50 dark:border-rose-800/40 rounded-3xl p-10 shadow-2xl shadow-rose-900/10">
                            {/* Custom Role Input */}
                            <div className="relative mb-10">
                                <input
                                    type="text"
                                    placeholder="e.g. AI Research Engineer, SD1 at Google"
                                    value={customRole}
                                    onChange={(e) => setCustomRole(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSelectRole(customRole)}
                                    className="w-full px-8 py-6 bg-white dark:bg-[#2b131c] border-2 border-gray-200 dark:border-rose-800/50 rounded-2xl text-lg placeholder:text-gray-400 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-400/20 transition-all font-medium"
                                />
                                <button
                                    onClick={() => handleSelectRole(customRole)}
                                    disabled={isSubmitting || !customRole.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white font-semibold rounded-2xl flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95"
                                >
                                    Let's Go
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Suggested Roles */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-2xl">✨</div>
                                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">AI Suggested Roles for You</h3>
                                </div>

                                {isLoading ? (
                                    <div className="flex flex-col items-center py-16">
                                        <div className="w-10 h-10 border-4 border-fuchsia-300 border-t-fuchsia-600 rounded-full animate-spin mb-4" />
                                        <p className="text-gray-500 dark:text-rose-200/70 font-medium">Analyzing your profile & strengths...</p>
                                    </div>
                                ) : Roles.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <AnimatePresence>
                                            {Roles.map((role, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.08 }}
                                                    onClick={() => handleSelectRole(role.title)}
                                                    className="group pl-2 p-3 text-center bg-white/80 dark:bg-[#2b131c] border border-transparent hover:border-rose-200 dark:hover:border-rose-700 hover:bg-rose-50/70 dark:hover:bg-rose-900/30 rounded-2xl transition-all hover:shadow-md text-start"
                                                >
                                                    <h4 className="font-semibold text-md text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2">
                                                        {role.title}
                                                    </h4>
                                                    {/* <p className="text-sm text-gray-600 dark:text-rose-200/70 line-clamp-3 leading-relaxed">
                                                        {role.reason}
                                                    </p> */}
                                                </motion.button>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-white/50 dark:bg-[#2b131c]/50 rounded-2xl border border-gray-100 dark:border-rose-800/30">
                                        <p className="text-gray-500 dark:text-rose-200/70">Couldn't load suggestions right now.</p>
                                        <p className="text-sm mt-1">Feel free to type your dream role above!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Tilt>
                </div>

                {/* Footer hint */}
                <p className="text-center text-sm text-zinc-500 dark:text-rose-200/60 mt-10">
                    Your choice will help us create a hyper-personalized 24-month roadmap
                </p>
            </div>
        </div>
    );
}