import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "อีเมลไม่ถูกต้อง!!!" }),
    password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    setPasswordScore(zxcvbn(passwordValue).score);
  }, [passwordValue]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://sacit-api-hh5g.vercel.app/api/register", data);
      toast.success(res.data.message || "สมัครสมาชิกสำเร็จ!");
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message || "เกิดข้อผิดพลาดในการสมัคร";
      toast.error(errMsg);
    }
  };

  return (
    /* ใช้ 'fixed inset-0' และ 'overflow-y-auto' เหมือนหน้า Login 
      เพื่อให้หน้า Register มีอิสระในการ Scroll เอง 100% 
    */
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#FDFBF7]">
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 py-10"
        style={{ 
          backgroundImage: "url('/pic/bgthai1.jpg')",
          backgroundAttachment: 'fixed' 
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

        {/* Register Card - ปรับ max-w ให้เท่ากับ Login (450px) เพื่อความต่อเนื่อง */}
        <div className="relative z-10 w-full max-w-[450px] shadow-2xl bg-white/95 p-6 sm:p-10 rounded-3xl border border-amber-100 my-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 flex justify-center items-center gap-2">
              <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span>
              สมัครสมาชิก
            </h1>
            <p className="text-amber-700/60 mt-2 text-sm sm:text-base">สร้างบัญชีเพื่อเริ่มต้นการสั่งซื้อ</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-4">
              
              {/* Email Field */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-amber-900 mb-1.5 ml-1">อีเมล</label>
                <input
                  {...register("email")}
                  placeholder="Email address"
                  className={`w-full px-4 py-3 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 ${
                    errors.email ? "border-red-500 ring-1 ring-red-100" : "border-amber-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-[11px] mt-1.5 ml-1 leading-none">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-amber-900 mb-1.5 ml-1">รหัสผ่าน</label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className={`w-full px-4 py-3 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 ${
                    errors.password ? "border-red-500 ring-1 ring-red-100" : "border-amber-200"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-[11px] mt-1.5 ml-1 leading-none">{errors.password.message}</p>
                )}
                
                {/* Strength Meter: ใช้ความสูงที่พอเหมาะเพื่อให้ Vibe ดู Clean */}
                {passwordValue.length > 0 && (
                  <div className="flex mt-2.5 gap-1 px-1">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div key={index} className="w-1/5">
                        <div className={`rounded-full h-1.5 transition-all duration-500 ${
                            index <= passwordScore 
                              ? (passwordScore <= 1 ? "bg-red-400" : passwordScore <= 3 ? "bg-amber-400" : "bg-emerald-500")
                              : "bg-gray-200"
                          }`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-amber-900 mb-1.5 ml-1">ยืนยันรหัสผ่าน</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-3 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 ${
                    errors.confirmPassword ? "border-red-500 ring-1 ring-red-100" : "border-amber-200"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-[11px] mt-1.5 ml-1 leading-none">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-800 text-white font-bold py-3.5 rounded-2xl shadow-md hover:bg-amber-900 active:scale-[0.98] transition-all duration-300 mt-2 text-lg"
              >
                ลงทะเบียน
              </button>

              {/* Footer Link: เพิ่มปุ่มกลับไปหน้า Login */}
              <div className="text-center mt-4 pt-4 border-t border-amber-50">
                 <p className="text-sm text-amber-800">
                   มีบัญชีอยู่แล้ว?{" "}
                   <span 
                     onClick={() => navigate("/login")}
                     className="font-bold text-amber-900 cursor-pointer hover:underline underline-offset-4"
                   >
                     เข้าสู่ระบบที่นี่
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

export default Register;