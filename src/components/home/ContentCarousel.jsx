import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    const myImages = [
      { id: 1, download_url: "/pic/1.png" },
      { id: 2, download_url: "/pic/2.JPG" },
       { id: 3, download_url: "/pic/3.png" },
       { id: 4, download_url: "/pic/4.png" }, 
       { id: 5, download_url: "/pic/5.JPG" }, 
    ];
    setData(myImages);
  };

  return (
    <div className="w-full">
      {/* Swiper ตัวบน: บังคับความสูงคงที่ */}
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="mySwiper h-[550px] rounded-md mb-4 overflow-hidden" // ล็อคความสูง h-80
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img 
              src={item.download_url} 
              className="w-full h-full object-cover" // บังคับรูปเต็มพื้นที่และไม่เสียสมดุล
              alt="banner"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper ตัวล่าง: สำหรับ Thumbnail หรือรูปเล็กหลายรูป */}
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="mySwiper h-32 rounded-md" // ล็อคความสูงให้เล็กลง h-32
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img 
              className="w-full h-full object-cover rounded-md" 
              src={item.download_url} 
              alt="thumbnail"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;