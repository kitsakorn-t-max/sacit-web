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

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

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
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4"
      style={{ backgroundImage: "url('/pic/bgthai1.jpg')" }}
    >
      {/* Overlay เพื่อให้แบบฟอร์มอ่านง่ายขึ้น */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full shadow-2xl bg-white/90 p-8 max-w-md rounded-2xl border border-amber-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-900 flex justify-center items-center gap-2">
            <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span>
            สมัครสมาชิก
          </h1>
          <p className="text-amber-700/60 mt-2 text-sm">สร้างบัญชีเพื่อเริ่มต้นการสั่งซื้อ</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-1 ml-1">อีเมล</label>
              <input
                {...register("email")}
                placeholder="Email address"
                className={`border w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.email ? "border-red-500 ring-1 ring-red-100" : "border-amber-200"
                } bg-white/50`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-1 ml-1">รหัสผ่าน</label>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={`border w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.password ? "border-red-500 ring-1 ring-red-100" : "border-amber-200"
                } bg-white/50`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
              )}
              
              {/* Password Strength Meter */}
              {watch().password?.length > 0 && (
                <div className="flex mt-2 gap-1 px-1">
                  {Array.from(Array(5).keys()).map((_, index) => (
                    <div key={index} className="w-1/5">
                      <div
                        className={`rounded-full h-1.5 transition-colors duration-500 ${
                          index <= passwordScore 
                            ? (passwordScore <= 1 ? "bg-red-400" : passwordScore <= 3 ? "bg-amber-400" : "bg-emerald-500")
                            : "bg-gray-200"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-1 ml-1">ยืนยันรหัสผ่านอีกครั้ง</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className={`border w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.confirmPassword ? "border-red-500 ring-1 ring-red-100" : "border-amber-200"
                } bg-white/50`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-amber-800 rounded-xl w-full text-white font-bold py-3 shadow-lg 
              hover:bg-amber-900 transform active:scale-[0.98] transition-all duration-200 mt-2"
            >
              ลงทะเบียน
            </button>

            {/* ลิงก์กลับไปหน้า Login */}
            <div className="text-center mt-4">
               <p className="text-sm text-amber-800">
                 มีบัญชีอยู่แล้ว?{" "}
                 <span 
                   onClick={() => navigate("/login")}
                   className="font-bold text-amber-900 cursor-pointer hover:underline"
                 >
                   เข้าสู่ระบบที่นี่
                 </span>
               </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;