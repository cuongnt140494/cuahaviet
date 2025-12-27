'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const contacts = {
    phone: '0919086272',
    zalo: '0919086272',
    messenger: 'cuahaviet',
};

export function FloatingCTA() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3 group">
            {/* Main Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-[#1b399d] hover:bg-[#132a75] text-white p-4 rounded-full shadow-glow transition-all hover:scale-110 flex items-center justify-center"
            >
                <span className="material-symbols-outlined text-[28px]">
                    {isExpanded ? 'close' : 'chat'}
                </span>
            </button>

            {/* Sub Buttons */}
            <a
                href={`tel:${contacts.phone}`}
                className={cn(
                    "flex items-center gap-2 bg-red-500 text-white pl-4 pr-2 py-2 rounded-full shadow-lg transition-all origin-bottom",
                    isExpanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0 pointer-events-none"
                )}
            >
                <span className="font-bold text-sm">{contacts.phone}</span>
                <div className="bg-white/20 p-1.5 rounded-full flex items-center">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
            </a>

            <a
                href={`https://zalo.me/${contacts.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "flex items-center gap-2 bg-[#0068FF] text-white pl-4 pr-2 py-2 rounded-full shadow-lg transition-all origin-bottom delay-75",
                    isExpanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0 pointer-events-none"
                )}
            >
                <span className="font-bold text-sm">Zalo Chat</span>
                <div className="bg-white/20 p-1.5 rounded-full flex items-center">
                    <span className="material-symbols-outlined text-[20px]">forum</span>
                </div>
            </a>

            <a
                href={`https://m.me/${contacts.messenger}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "flex items-center gap-2 bg-blue-500 text-white pl-4 pr-2 py-2 rounded-full shadow-lg transition-all origin-bottom delay-100",
                    isExpanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0 pointer-events-none"
                )}
            >
                <span className="font-bold text-sm">Messenger</span>
                <div className="bg-white/20 p-1.5 rounded-full flex items-center">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                </div>
            </a>
        </div>
    );
}
