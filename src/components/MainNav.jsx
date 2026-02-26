import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ShoppingCart, Menu, X } from "lucide-react"; // เพิ่ม Menu กับ X

function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);

  const [isOpen, setIsOpen] = useState(false); // สำหรับ Profile Dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // สำหรับ Hamburger

  const activeClass = "bg-amber-800 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm";
  const inactiveClass = "text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md text-sm font-medium transition-all";

  return (
    <nav className="bg-[#FDFBF7] border-b border-amber-200 shadow-sm sticky top-0 z-[100]">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">

          <div className="flex items-center gap-4">
            {/* Hamburger Button (แสดงเฉพาะจอเล็ก) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-amber-900"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to={"/"} className="text-2xl font-bold text-amber-900 tracking-tighter">
              SIAM<span className="text-amber-600">SHOP</span>
            </Link>

            {/* Desktop Menu (ซ่อนในจอเล็ก) */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink className={({ isActive }) => isActive ? activeClass : inactiveClass} to={"/"}>หน้าหลัก</NavLink>
              <NavLink className={({ isActive }) => isActive ? activeClass : inactiveClass} to={"/shop"}>สินค้าทั้งหมด</NavLink>
              <NavLink className={({ isActive }) => `relative ${isActive ? activeClass : inactiveClass}`} to={"/cart"}>
                Cart
                {carts.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#FDFBF7]">
                    {carts.length}
                  </span>
                )}
              </NavLink>
              <NavLink className={({ isActive }) => isActive ? activeClass : inactiveClass} to={"/page"}>
                Details
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              /* กรณีเข้าระบบแล้ว (เหมือนเดิม) */
              <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-semibold text-amber-900 hidden sm:block">{user.email.split('@')[0]}</span>
                  <img className="w-8 h-8 rounded-full border border-amber-300" src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-professor-avatars-flat-icons-pack-people-456317.png?f=webp&w=256" alt="User" />
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-100 shadow-xl rounded-lg py-1 z-50">
                    <Link to={"/user/history"} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50">ประวัติการสั่งซื้อ</Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">ออกจากระบบ</button>
                  </div>
                )}
              </div>
            ) : (
              /* กรณีที่ยังไม่ได้เข้าระบบ: เพิ่มปุ่มสมัครสมาชิก */
              <div className="flex items-center gap-2">
                {/* สมัครสมาชิก (ซ่อนใน Mobile เพราะมีใน Hamburger แล้ว หรือจะโชว์ทั้งคู่ก็ได้) */}
                <NavLink
                  to={"/register"}
                  className="hidden sm:block text-amber-900 hover:text-amber-700 text-sm font-medium px-3"
                >
                  สมัครสมาชิก
                </NavLink>

                {/* เข้าสู่ระบบ */}
                <NavLink
                  to={"/login"}
                  className="bg-amber-800 text-white hover:bg-amber-900 px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all"
                >
                  เข้าสู่ระบบ
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (แสดงเมื่อกดแฮมเบอร์เกอร์) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-amber-100 px-4 py-4 space-y-2 shadow-lg">
          <NavLink onClick={() => setIsMobileMenuOpen(false)} className="block text-amber-900 hover:bg-amber-50 p-2 rounded" to={"/"}>หน้าหลัก</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} className="block text-amber-900 hover:bg-amber-50 p-2 rounded" to={"/shop"}>สินค้าทั้งหมด</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} className="block text-amber-900 hover:bg-amber-50 p-2 rounded" to={"/cart"}>รถเข็น ({carts.length})</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} className="block text-amber-900 hover:bg-amber-50 p-2 rounded" to={"/page"}>Details</NavLink>
          {!user && (
            <NavLink onClick={() => setIsMobileMenuOpen(false)} className="block text-amber-900 hover:bg-amber-50 p-2 rounded" to={"/register"}>สมัครสมาชิก</NavLink>
          )}
        </div>
      )}
    </nav>
  );
}

export default MainNav;