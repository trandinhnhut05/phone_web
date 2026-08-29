import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Google Maps Direction */}
      <a
        href="https://www.google.com/maps/search/?api=1&query=Chợ+Phong+Xuân+Phong+Điền+Thừa+Thiên+Huế"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-white text-slate-800 px-3.5 py-2.5 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105"
        title="Chỉ đường đến cửa hàng"
      >
        <span className="text-xs font-bold hidden sm:inline group-hover:text-blue-600 transition-colors">
          Chợ Phong Xuân, Huế
        </span>
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <MapPin className="w-4 h-4" />
        </div>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0935677775"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-blue-600 text-white px-3.5 py-2.5 rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-105"
        title="Chat Zalo với Tấn Đạt Smartphone"
      >
        <span className="text-xs font-bold hidden sm:inline">
          Chat Zalo (0935.677.775)
        </span>
        <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-xs">
          Zalo
        </div>
      </a>

      {/* Hotline Pulse Button */}
      <a
        href="tel:0935677775"
        className="relative group flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-full shadow-xl shadow-red-600/40 hover:from-red-500 hover:to-rose-500 transition-all hover:scale-105"
        title="Gọi ngay 093 567 7775"
      >
        <span className="absolute -inset-1 rounded-full bg-red-600 opacity-40 animate-ping"></span>
        <span className="text-xs font-black relative z-10 hidden sm:inline">
          093 567 7775
        </span>
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center relative z-10">
          <Phone className="w-4 h-4 text-white animate-bounce" />
        </div>
      </a>
    </div>
  );
};
