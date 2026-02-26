import React from "react";
import ListCart from "../components/card/ListCart";

const Cart = () => {
  return (
    /* 1. คลุมด้วย Background สีครีมอ่อนๆ ให้เข้ากับธีมไทยพรีเมียม */
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto">
        {/* 2. Header ส่วนบนของตะกร้า */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-2 h-10 bg-amber-700 rounded-full"></div>
          <div>
            <h1 className="text-3xl font-bold text-amber-900">ตะกร้าสินค้าของคุณ</h1>
            <p className="text-amber-700/60 text-sm">ตรวจสอบรายการสินค้าและดำเนินการชำระเงิน</p>
          </div>
        </div>

        {/* 3. ส่วนแสดงรายการสินค้า (Logic เดิมทั้งหมดอยู่ในนี้) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/5 border border-amber-100 overflow-hidden">
          <div className="p-2 sm:p-6">
            <ListCart />
          </div>
        </div>

        {/* 4. Footer ตกแต่งเล็กน้อย (Optional) */}
        <div className="mt-8 text-center">
            <p className="text-amber-800/40 text-xs">
              ระบบรักษาความปลอดภัย SSL Secure Payment
            </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;