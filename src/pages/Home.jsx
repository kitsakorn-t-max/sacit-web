import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  // สไตล์สำหรับพื้นหลัง (เปลี่ยน URL รูปตรงนี้)
  const backgroundStyle = {
    backgroundImage: `url('pic/bgthai1.jpg')`, // ตัวอย่างลายกระดาษนวลๆ
    backgroundAttachment: 'fixed', // ให้รูปอยู่กับที่เวลาเลื่อน (Parallax จางๆ)
  };

  return (
    <div 
      className="bg-[#FDFBF7] min-h-screen pb-12 relative" 
      style={backgroundStyle}
    >
      {/* ส่วนสำหรับ Overlay เพื่อคุมความชัดของรูปหลัง ไม่ให้กวนตา */}
      <div className="absolute inset-0 bg-[#FDFBF7]/70 pointer-events-none"></div>

      {/* ใส่ z-10 เพื่อให้เนื้อหาอยู่บน Overlay */}
      <div className="relative z-10">
        <ContentCarousel />

        <div className="px-4 md:px-8 mt-10">
          
          {/* Section: สินค้าขายอย่างดี */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
               <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span>
               สินค้าขายที่ขายดี
            </h2>
            <BestSeller />
          </div>

          {/* Section: สินค้าใหม่ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
               <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span>
               สินค้าใหม่
            </h2>
            <NewProduct />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;