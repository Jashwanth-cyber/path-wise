'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Flame, CalendarDays, CheckCircle2, Milestone, LayoutDashboard, Folder, ListTodo, Calendar, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import CalendarWidget from '../components/Calendar';
import { getUserById } from '../actions/user';

export default function DashboardPage() {
    const { data: session } = useSession();
    const [userName, setUserName] = useState("Guest");

    useEffect(() => {
        if (session?.user?.id) {
            getUserById(session.user.id).then((user) => {
                if (user?.name) {
                    setUserName(user.name);
                }
            });
        }
    }, [session?.user?.id]);

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-[#1c0f14] text-zinc-900 dark:text-white">

            {/* SIDEBAR */}
            <aside className="w-70 min-h-screen bg-white dark:bg-[#2b131c] border-r border-zinc-200 dark:border-rose-800/40 p-6 flex flex-col justify-between">

                <div>
                    <nav className="space-y-3">
                        {[
                            { icon: LayoutDashboard, label: 'Dashboard', active: true },
                            { icon: Folder, label: 'Projects' },
                            { icon: ListTodo, label: 'Tasks' },
                            { icon: Calendar, label: 'Calendar' },
                            { icon: Milestone, label: 'Roadmap' },
                            { icon: Settings, label: 'Settings' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition ${item.active
                                    ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white'
                                    : 'hover:bg-zinc-100 dark:hover:bg-[#3a1622]'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </div>
                        ))}
                    </nav>
                </div>


            </aside>

            {/* MAIN */}
            <main className="flex-1 p-6 lg:p-8">

                {/* TOP GRID */}
                <div className="grid lg:grid-cols-3 gap-6 mb-6">

                    {/* HERO CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-gradient-to-br from-rose-50 to-white dark:from-[#3a1622] dark:to-[#1c0f14] border border-rose-200 dark:border-rose-800/40 rounded-3xl p-6 flex flex-col sm:flex-row justify-start items-start sm:items-center gap-6"
                    >
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                                Hello, {userName} 👋
                            </h2>
                            <p className="text-rose-600/80 dark:text-rose-200/70 mb-4">
                                Keep building your AI Engineer roadmap.
                            </p>

                            <div className="flex justify-between text-xs mb-2">
                                <span className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-medium">
                                    <Flame className="w-4 h-4" /> 19-day streak
                                </span>
                                <span className="text-zinc-600 dark:text-zinc-300 font-medium">83%</span>
                            </div>

                            <div className="h-2 bg-zinc-200 dark:bg-black/30 rounded-full overflow-hidden">
                                <div className="h-full w-[83%] bg-gradient-to-r from-rose-500 to-orange-400" />
                            </div>
                        </div>

                        <div className="hidden sm:block">
                            <img
                                src={`https://api.dicebear.com/9.x/micah/svg?seed=${userName.replace(/\s+/g, '')}&backgroundColor=transparent`}
                                alt="Avatar"
                                className="w-28 h-28 object-contain drop-shadow-md"
                            />
                        </div>
                    </motion.div>

                    {/* CALENDAR */}

                    <CalendarWidget />
                </div>

                {/* BOTTOM GRID */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* TASK LIST */}
                    <div className="bg-white dark:bg-[#2b131c] border border-zinc-200 dark:border-rose-800/40 rounded-3xl p-6">
                        <h3 className="font-semibold mb-4">Today Tasks</h3>

                        <div className="space-y-4">
                            {[
                                { title: 'Design Homepage', done: false },
                                { title: 'Dribbble Shot', done: true },
                                { title: 'Onboarding UI', done: false },
                            ].map((task, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2
                                        className={`w-5 h-5 ${task.done ? 'text-orange-400' : 'text-zinc-400'
                                            }`}
                                    />
                                    <p>{task.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="bg-white dark:bg-[#2b131c] border border-zinc-200 dark:border-rose-800/40 rounded-3xl p-6">
                        <h3 className="font-semibold mb-4">Task Progress</h3>

                        <div className="space-y-4">
                            {[
                                { name: 'Frontend', value: 80 },
                                { name: 'Backend', value: 60 },
                                { name: 'DSA', value: 40 },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{item.name}</span>
                                        <span>{item.value}%</span>
                                    </div>
                                    <div className="h-2 bg-zinc-200 dark:bg-black/30 rounded-full">
                                        <div
                                            style={{ width: `${item.value}%` }}
                                            className="h-full bg-gradient-to-r from-rose-500 to-orange-400 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EVENTS */}
                    <div className="bg-white dark:bg-[#2b131c] border border-zinc-200 dark:border-rose-800/40 rounded-3xl p-6">
                        <h3 className="font-semibold mb-4">Upcoming Events</h3>

                        <div className="space-y-4">
                            {[
                                { title: 'Design Review', time: '9:00 AM' },
                                { title: 'Beep Party', time: '11:00 PM' },
                            ].map((event, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-2xl border border-zinc-200 dark:border-rose-800/30"
                                >
                                    <p className="font-medium">{event.title}</p>
                                    <p className="text-sm text-zinc-500 dark:text-rose-200/70">
                                        {event.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}