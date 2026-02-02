import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      toast.success("ยินดีต้อนรับกลับเข้าสู่ระบบ");
      roleRedirect(role);
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ";
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    // 1. ใส่พื้นหลังรูปภาพ และใช้ Overlay สีครีมจางๆ ทับเพื่อให้กรอกข้อมูลได้ง่ายขึ้น
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/pic/bgthai1.jpg')" }}
    >
      {/* Overlay: กันรูปพื้นหลังเด่นเกินไปจนอ่านยาก */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

      {/* 2. กล่อง Login: เปลี่ยนเป็น Rounded-2xl และขอบสีน้ำตาลทอง */}
      <div className="relative z-10 w-full shadow-2xl bg-white/90 p-10 max-w-md rounded-2xl border border-amber-100">
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900 flex justify-center items-center gap-2">
                <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span>
                เข้าสู่ระบบ
            </h1>
            <p className="text-amber-700/60 mt-2">กรุณากรอกข้อมูลเพื่อใช้บริการ</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-amber-900">อีเมล</label>
              <input
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-xl mt-1
                focus:outline-none focus:ring-2 focus:ring-amber-500
                focus:border-transparent border-amber-200 bg-white/50"
                onChange={handleOnChange}
                name="email"
                type="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900">รหัสผ่าน</label>
              <input
                placeholder="Password"
                className="border w-full px-4 py-3 rounded-xl mt-1
                focus:outline-none focus:ring-2 focus:ring-amber-500
                focus:border-transparent border-amber-200 bg-white/50"
                onChange={handleOnChange}
                name="password"
                type="password"
                required
              />
            </div>

            {/* 3. ปุ่ม Login: เปลี่ยนจากสีฟ้าเป็นสีน้ำตาลทอง (Amber) */}
            <button
              type="submit"
              className="bg-amber-800 rounded-xl w-full text-white font-bold py-3 shadow-lg
              hover:bg-amber-900 hover:shadow-amber-900/20 transform active:scale-[0.98] 
              transition-all duration-300 mt-4 text-lg"
            >
              เข้าสู่ระบบ
            </button>

           {/* ส่วนตกแต่งเพิ่มเติม */}
<div className="mt-6 text-center">
    <p className="text-sm text-amber-700">
        ยังไม่มีบัญชีสมาชิก?{" "}
        <span 
            // 1. ใส่ onClick เพื่อเปลี่ยนหน้าไปที่ /register
            onClick={() => navigate("/register")} 
            className="font-bold text-amber-900 cursor-pointer hover:underline hover:text-amber-600 transition-colors"
        >
            สมัครสมาชิกใหม่
        </span>
    </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;