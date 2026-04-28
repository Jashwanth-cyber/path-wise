'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

export default function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selected, setSelected] = useState<Date | null>(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const today = new Date();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthName = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    const selectedDateText = (selected || today).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const daysArray = [
        ...Array(firstDayOfMonth).fill(null),
        ...Array(daysInMonth).fill(0).map((_, i) => i + 1),
    ];

    return (
        <div className="bg-white dark:bg-[#2b131c] border border-zinc-200 dark:border-rose-800/40 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-rose-500" />
                    <div>
                        <h3 className="font-semibold">{monthName}</h3>
                        <p className="text-xs text-zinc-500 dark:text-rose-200/70">
                            {selectedDateText}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a1622]"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a1622]"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* DAYS */}
            <div className="grid grid-cols-7 text-xs text-zinc-500 dark:text-rose-200/70 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-center">{d}</div>
                ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7 gap-2 text-sm text-center">
                {daysArray.map((day, i) => {
                    const isToday =
                        day &&
                        day === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear();

                    const isSelected =
                        selected &&
                        day === selected.getDate() &&
                        month === selected.getMonth() &&
                        year === selected.getFullYear();

                    return (
                        <div
                            key={i}
                            onClick={() =>
                                day && setSelected(new Date(year, month, day))
                            }
                            className={`
                p-2 rounded-lg cursor-pointer transition
                ${!day && 'invisible'}
                ${isSelected && 'bg-gradient-to-r from-rose-500 to-orange-500 text-white'}
                ${!isSelected && isToday && 'border border-rose-500 text-rose-500'}
                ${!isSelected && !isToday && 'hover:bg-zinc-100 dark:hover:bg-[#3a1622]'}
              `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}