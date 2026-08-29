import React, { useState } from 'react';
import { Store, Phone, MapPin, CreditCard, Save, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminSettingsPage: React.FC = () => {
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'TẤN ĐẠT SMARTPHONE',
    slogan: 'MUA BÁN • SỬA CHỮA • ÉP KÍNH SMARTPHONE',
    hotline: '0935677775',
    hotlineDisplay: '093 567 7775',
    address: 'Chợ Phong Xuân, Phong Điền, TP. Huế',
    bankName: 'MB Bank (Ngân hàng Quân Đội)',
    bankAccount: '0935677775',
    bankOwner: 'TẤN ĐẠT SMARTPHONE',
    workingHours: '8:00 - 21:00 (Hàng ngày)',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('phone_web_store_settings', JSON.stringify(storeInfo));
    toast.success('Đã lưu cấu hình thông tin cửa hàng thành công!');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cài Đặt Thông Tin Cửa Hàng
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Cập nhật thông tin hotline, địa chỉ hiển thị và tài khoản ngân hàng nhận thanh toán VietQR.
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-6">
        {/* Store General Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 font-bold text-slate-800 text-lg">
            <Store className="w-5 h-5 text-blue-600" />
            <span>Thông tin thương hiệu</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tên cửa hàng
              </label>
              <input
                type="text"
                value={storeInfo.storeName}
                onChange={(e) => setStoreInfo({ ...storeInfo, storeName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Khẩu hiệu / Dịch vụ
              </label>
              <input
                type="text"
                value={storeInfo.slogan}
                onChange={(e) => setStoreInfo({ ...storeInfo, slogan: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Số Hotline / Zalo
              </label>
              <input
                type="text"
                value={storeInfo.hotlineDisplay}
                onChange={(e) => setStoreInfo({ ...storeInfo, hotlineDisplay: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Giờ mở cửa
              </label>
              <input
                type="text"
                value={storeInfo.workingHours}
                onChange={(e) => setStoreInfo({ ...storeInfo, workingHours: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Địa chỉ Showroom
            </label>
            <input
              type="text"
              value={storeInfo.address}
              onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Banking QR Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 font-bold text-slate-800 text-lg">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Tài khoản nhận thanh toán VietQR</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tên Ngân Hàng
              </label>
              <input
                type="text"
                value={storeInfo.bankName}
                onChange={(e) => setStoreInfo({ ...storeInfo, bankName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Số Tài Khoản
              </label>
              <input
                type="text"
                value={storeInfo.bankAccount}
                onChange={(e) => setStoreInfo({ ...storeInfo, bankAccount: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-blue-600 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tên Chủ Tài Khoản (In hoa)
              </label>
              <input
                type="text"
                value={storeInfo.bankOwner}
                onChange={(e) => setStoreInfo({ ...storeInfo, bankOwner: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white uppercase"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Lưu cấu hình cửa hàng</span>
        </button>
      </form>
    </div>
  );
};
