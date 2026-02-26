import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);

  // กำหนด State สำหรับเก็บข้อมูลฟอร์ม
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ฟังก์ชันจัดการการเปลี่ยนแปลงใน Input
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม (Login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      toast.success("ยินดีต้อนรับกลับเข้าสู่ระบบ");
      
      // Redirect ตาม Role ของผู้ใช้งาน
      role === "admin" ? navigate("/admin") : navigate("/");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ";
      toast.error(errMsg);
    }
  };

  return (
    /* ใช้วิธีแก้ปัญหา Layout ขั้นเด็ดขาด: 
      - fixed inset-0 กางเต็มจอโดยไม่สน Layout อื่น
      - overflow-y-auto เพื่อให้สไลด์หน้าจอได้กรณีเปิดในมือถือเครื่องเล็ก
    */
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#FDFBF7]">
      <div
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 py-10"
        style={{ 
          backgroundImage: "url('/pic/bgthai1.jpg')",
          backgroundAttachment: 'fixed' // ล็อคพื้นหลังให้นิ่งเวลาเลื่อนฟอร์ม
        }}
      >
        {/* 1. Overlay: ช่วยให้อ่านข้อความง่ายขึ้น ไม่โดนรูปพื้นหลังแย่งสายตา */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

        {/* 2. Login Card: ดีไซน์ขอบมน Rounded-3xl และโทนสี Amber หรูหรา */}
        <div className="relative z-10 w-full max-w-[450px] shadow-2xl bg-white/95 p-8 sm:p-10 rounded-3xl border border-amber-100 my-auto">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 flex justify-center items-center gap-3">
              <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span>
              เข้าสู่ระบบ
            </h1>
            <p className="text-amber-700/60 mt-2 text-sm sm:text-base">กรุณากรอกข้อมูลเพื่อใช้บริการ</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-5">
              
              {/* ส่วนของ Email */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-amber-900 mb-1.5 ml-1">
                  อีเมล
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email} // ต้องมี value เพื่อเป็น Controlled Component
                  onChange={handleOnChange}
                  placeholder="Email"
                  className="w-full px-4 py-3.5 rounded-2xl border border-amber-200 
                             bg-white outline-none focus:ring-2 focus:ring-amber-500 
                             transition-all duration-200 shadow-sm"
                />
              </div>

              {/* ส่วนของ Password */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-amber-900 mb-1.5 ml-1">
                  รหัสผ่าน
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={form.password} // ต้องมี value เพื่อเป็น Controlled Component
                  onChange={handleOnChange}
                  placeholder="Password"
                  className="w-full px-4 py-3.5 rounded-2xl border border-amber-200 
                             bg-white outline-none focus:ring-2 focus:ring-amber-500 
                             transition-all duration-200 shadow-sm"
                />
              </div>

              {/* 3. ปุ่ม Login: สี Amber-800 พร้อม Effect เวลาคลิก */}
              <button
                type="submit"
                className="w-full bg-amber-800 text-white font-bold py-4 
                           rounded-2xl shadow-lg hover:bg-amber-900 active:scale-[0.98] 
                           transition-all duration-300 mt-2 text-lg shadow-amber-900/20"
              >
                เข้าสู่ระบบ
              </button>

              {/* ลิงก์สมัครสมาชิก */}
              <div className="mt-4 text-center border-t border-amber-50 pt-5">
                <p className="text-sm text-amber-700">
                  ยังไม่มีบัญชีสมาชิก?{" "}
                  <span 
                    onClick={() => navigate("/register")}
                    className="font-bold text-amber-900 cursor-pointer hover:underline underline-offset-4 decoration-2 transition-colors"
                  >
                    สมัครสมาชิกใหม่
                  </span>
                </p>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;