import Link from 'next/link';

const navigation = {
    sanPham: [
        { name: 'Cửa cuốn Austdoor', href: '/danh-muc/cua-cuon' },
        { name: 'Cửa nhôm Xingfa', href: '/danh-muc/cua-nhom' },
        { name: 'Cửa gỗ nhựa Composite', href: '/danh-muc/cua-go-composite' },
        { name: 'Cửa kính cường lực', href: '/san-pham' },
        { name: 'Phụ kiện cửa', href: '/san-pham' },
    ],
    chinhSach: [
        { name: 'Chính sách bảo hành', href: '/bao-hanh' },
        { name: 'Vận chuyển & Lắp đặt', href: '/van-chuyen' },
        { name: 'Phương thức thanh toán', href: '/thanh-toan' },
        { name: 'Bảo mật thông tin', href: '/bao-mat' },
    ],
};

const companyInfo = {
    name: 'Cửa Hà Việt',
    phone: '0919086272',
    email: 'cuahaviet@gmail.com',
    address: '46 Vũ Văn Cẩn, Q. Hà Đông, TP. Hà Nội',
    hours: '8:00 - 18:00 (Thứ 2 - Thứ 7)',
};

export function Footer() {
    return (
        <footer className="bg-[#1e2330] text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="text-white bg-[#1b399d] p-1.5 rounded-lg">
                                <span className="material-symbols-outlined">door_sliding</span>
                            </div>
                            <span className="text-xl font-bold text-white">{companyInfo.name}</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Đơn vị tiên phong trong lĩnh vực cung cấp các giải pháp cửa tổng thể hàng đầu tại Việt Nam. Uy tín tạo nên thương hiệu.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a
                                href="https://facebook.com/cuahaviet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center hover:bg-[#1b399d] transition-colors text-white"
                            >
                                <span className="material-symbols-outlined text-[18px]">group</span>
                            </a>
                            <a
                                href="https://zalo.me/0919086272"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center hover:bg-[#1b399d] transition-colors text-white text-sm font-bold"
                            >
                                Z
                            </a>
                            <a
                                href={`mailto:${companyInfo.email}`}
                                className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center hover:bg-[#1b399d] transition-colors text-white"
                            >
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                            </a>
                        </div>
                    </div>

                    {/* Sản phẩm */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Sản phẩm</h3>
                        <ul className="space-y-3 text-sm">
                            {navigation.sanPham.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="hover:text-[#1b399d] transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Chính sách */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Chính sách</h3>
                        <ul className="space-y-3 text-sm">
                            {navigation.chinhSach.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="hover:text-[#1b399d] transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Liên hệ</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-[#1b399d] text-[20px] flex-shrink-0">location_on</span>
                                <span>{companyInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#1b399d] text-[20px]">phone_in_talk</span>
                                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                                    {companyInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#1b399d] text-[20px]">mail</span>
                                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                                    {companyInfo.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#1b399d] text-[20px]">schedule</span>
                                <span>{companyInfo.hours}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
