import React, { useState } from "react"; // 1. เพิ่ม useState ตรงนี้
import MainNav from "../components/MainNav";
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม AnimatePresence เพื่อความลื่นไหล
import { toast } from "react-toastify";

const Test = () => {
  // 2. ข้อมูลเดิมของคุณ (ห้ามลบ)
  const craftCategories = [
    { title: "เครื่องทอ", count: "1,240 ชิ้นงาน", desc: "ผ้าไหมมัดหมี่, ผ้าลาวครั่ง, ผ้ายกเมืองนคร", img: "pic/tool1.png" },
    { title: "เครื่องโลหะ", count: "850 ชิ้นงาน", desc: "งานสลักดุน, เครื่องเงิน, เครื่องทอง, ดาบหัวสิงห์", img: "pic/tool2.jpg" },
    { title: "เครื่องจักสาน", count: "920 ชิ้นงาน", desc: "ย่านลิเภา, งานสานไม้ไผ่ลายดอกพิกุล, หวาย", img: "pic/tool3.jpg" },
    { title: "เครื่องดิน", count: "640 ชิ้นงาน", desc: "เครื่องปั้นดินเผานนทบุรี, ศิลาดล, เบญจรงค์", img: "pic/tool4.jpg" },
    { title: "เครื่องรัก", count: "430 ชิ้นงาน", desc: "งานลงรักประดับมุก, เครื่องเขิน, ลายรดน้ำ", img: "pic/tool5.jpg" },
    { title: "เครื่องไม้", count: "510 ชิ้นงาน", desc: "แกะสลักไม้เทพทาโร, กรงนกเขาชวา, เทริดมโนราห์", img: "pic/tool6.jpg" },
  ];

  const masters = [
    { name: "คําใหม่ โยคะสิงห์", role: "ครูศิลป์ของแผ่นดิน", expertise: "เครื่องทอ (ผ้าไหม)", img: "pic/tech1.JPG" },
    { name: "นายไพโรจน์ สืบสาม", role: "ครูช่างศิลปหัตถกรรม", expertise: "เครื่องโลหะ", img: "pic/tech2.JPG" },
    { name: "นิทัศน์ จันทร", role: "ทายาทศิลปหัตถกรรม", expertise: "เครื่องทอ", img: "pic/tech3.JPG" },
    { name: "กิจ คชรัตน์", role: "ครูช่างศิลปหัตถกรรม", expertise: "เครื่องหนัง", img: "pic/tech4.JPG" },
  ];

  // 3. เพิ่ม State สำหรับการค้นหา
  const [searchTerm, setSearchTerm] = useState("");

  // 4. สร้าง Logic สำหรับกรองข้อมูล (ค้นหาจากหัวข้อ และ รายละเอียด)
  const filteredCategories = craftCategories.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const backgroundStyle = {
    backgroundImage: `url('/pic/bgthai1.jpg')`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  };

  return (
    <div className="min-h-screen relative font-sans" style={backgroundStyle}>
      <div className="absolute inset-0 bg-[#FDFBF7]/90 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* --- Hero Section --- */}
        <section className="py-20 px-6 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-6xl font-extrabold text-amber-900 mb-6 drop-shadow-sm">Siam Archive</h1>
            <p className="text-xl text-amber-800/80 max-w-3xl mx-auto leading-relaxed">
              แหล่งสืบค้นข้อมูลหัตถกรรมที่ใหญ่ที่สุดในประเทศไทย รวบรวมองค์ความรู้จาก 
              <span className="text-amber-600 font-bold"> ครูศิลป์ของแผ่นดิน </span> 
              และ <span className="text-amber-600 font-bold"> ครูช่างศิลปหัตถกรรม </span> 
              เพื่อการอนุรักษ์และสืบสานภูมิปัญญาไทยอย่างยั่งยืน
            </p>
          </motion.div>
        </section>

        {/* --- Search Bar --- */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-amber-100 flex items-center gap-4 focus-within:ring-2 focus-within:ring-amber-500 transition-all">
            <input 
              type="text" 
              placeholder="ค้นหาชิ้นงาน, ชื่อครูช่าง, หรือประเภทงานหัตถกรรม..." 
              className="flex-1 p-4 outline-none text-amber-900 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-amber-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-900 transition-all">
              ค้นหาข้อมูล
            </button>
          </div>
          {searchTerm && (
            <p className="mt-4 text-amber-800 font-medium animate-pulse">
              🔍 กำลังแสดงผลการค้นหาสำหรับ: "{searchTerm}" (พบ {filteredCategories.length} รายการ)
            </p>
          )}
        </div>

        {/* --- Categories Section --- */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-amber-900 mb-10 flex items-center gap-4">
            <span className="w-1.5 h-10 bg-amber-600 rounded-full"></span>
            คลังข้อมูลงานหัตถศิลป์ไทย
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={cat.title}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-md border border-amber-50 group cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden">
                      <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-amber-900">{cat.title}</h3>
                        <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">{cat.count}</span>
                      </div>
                      <p className="text-sm text-amber-700/70 mb-4">{cat.desc}</p>
                      <div className="w-full h-[1px] bg-amber-50 mb-4"></div>
                      <span className="text-amber-600 text-sm font-bold flex items-center gap-1 group-hover:gap-3 transition-all">
                        สืบค้นละเอียด <span>→</span>
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-amber-200"
                >
                  <p className="text-2xl text-amber-900/40 font-bold font-serif">ไม่พบข้อมูลศิลปหัตถกรรมที่ท่านค้นหา...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* --- ส่วนที่เพิ่มใหม่: Video Showcase Section --- */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center gap-4">
            <span className="w-1.5 h-10 bg-amber-600 rounded-full"></span>
            วีดิทัศน์กระบวนการสร้างสรรค์
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-video bg-black group"
          >
            <video 
              controls 
              className="w-full h-full object-cover"
              poster="pic/me1.jpg"
            >
              <source src="pic/wei.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 pointer-events-none border-[10px] border-amber-900/5 rounded-[1.8rem]"></div>
          </motion.div>
        </section>

        {/* --- ส่วน Featured Masters (คงเดิม) --- */}
        <section className="bg-amber-900/5 py-20 mb-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">ผู้สร้างสรรค์งานศิลปหัตถกรรม</h2>
            <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide">
              {masters.map((master, idx) => (
                <div key={idx} className="min-w-[300px] bg-white p-8 rounded-3xl shadow-lg border border-amber-100 text-center">
                  <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <img src={master.img} alt={master.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-amber-900">{master.name}</h4>
                  <p className="text-amber-600 text-sm font-bold mt-1 mb-4">{master.role}</p>
                  <p className="text-sm text-amber-800/60 italic">เชี่ยวชาญด้าน: {master.expertise}</p>
                  <button className="mt-6 border border-amber-200 text-amber-800 px-6 py-2 rounded-full text-sm hover:bg-amber-800 hover:text-white transition-all">
                    ดูประวัติและผลงาน
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-amber-100 text-center">
          <p className="text-amber-900/40 text-sm">
            รวบรวมข้อมูลเพื่อการศึกษาและอนุรักษ์ อ้างอิงโครงสร้างฐานข้อมูลจาก 
            <a href="https://archive.sacit.or.th/" target="_blank" className="underline ml-1">Siam Archive</a>
          </p>
        </footer>
      </div>
    </div>
  );
};
 
export default Test;