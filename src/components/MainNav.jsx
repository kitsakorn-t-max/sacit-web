import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ShoppingCart } from "lucide-react";


function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ธีมสีน้ำตาลไทย
  const activeClass = "bg-amber-800 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm";
  const inactiveClass = "text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md text-sm font-medium transition-all";

  return (
    <nav className="bg-[#FDFBF7] border-b border-amber-200 shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          
          {/* ฝั่งซ้าย: Logo & ทุกปุ่มที่คุณต้องการ */}
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-2xl font-bold text-amber-900 tracking-tighter mr-2">
              SIAM<span className="text-amber-600">SHOP</span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <NavLink className={({ isActive }) => isActive ? activeClass : inactiveClass} to={"/"}>
                หน้าหลัก
              </NavLink>

              <NavLink className={({ isActive }) => isActive ? activeClass : inactiveClass} to={"/shop"}>
                สินค้าทั้งหมด
              </NavLink>

              {/* ปุ่ม Cart แบบมี Badge ตัวเลข */}
              <NavLink 
                className={({ isActive }) => `relative ${isActive ? activeClass : inactiveClass}`} 
                to={"/cart"}
              >
                Cart
                {carts.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#FDFBF7]">
                    {carts.length}
                  </span>
                )}
              </NavLink>

              {/* ปุ่ม Details */}
              <NavLink className={({ isActive }) => isActive ? activeClass : inactiveClass} to={"/page"}>
                Details
              </NavLink>
            </div>
          </div>

          {/* ฝั่งขวา: Profile & Auth */}
          <div className="flex items-center gap-4">
            
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full transition-all"
                >
                  <span className="text-sm font-semibold text-amber-900 hidden sm:block">
                    {user.email.split('@')[0]}
                  </span>
                  <img
                    className="w-8 h-8 rounded-full border border-amber-300"
                    src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-professor-avatars-flat-icons-pack-people-456317.png?f=webp&w=256"
                    alt="User"
                  />
                  <ChevronDown size={16} className={`text-amber-800 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-100 shadow-xl rounded-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-amber-50">
                       <p className="text-xs text-amber-500 uppercase font-bold tracking-wider">บัญชีผู้ใช้</p>
                    </div>
                    <Link
                      to={"/user/history"}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors"
                    >
                      ประวัติการสั่งซื้อ
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to={"/register"} className="text-amber-800 hover:text-amber-600 text-sm font-medium px-3 py-2">
                  สมัครสมาชิก
                </NavLink>
                <NavLink to={"/login"} className="bg-amber-800 text-white hover:bg-amber-900 px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all">
                  เข้าสู่ระบบ
                </NavLink>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default MainNav;