import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("updatedAt", "desc", 12)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="py-12 ">
      <div className="container mx-auto px-4">
        
        {/* Header ส่วนหัวคล้าย BestSeller: เน้นความหรูหราด้วยเส้นสีทอง */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-[2px] w-12 bg-amber-600 hidden sm:block"></div>
            <h2 className="text-3xl font-bold text-amber-900 tracking-tight">
              สินค้ามาใหม่
            </h2>
            <div className="h-[2px] w-12 bg-amber-600 hidden sm:block"></div>
          </div>
          <p className="text-amber-700/60 text-sm italic font-light">
            — คัดสรรสินค้าคุณภาพล่าสุดเพื่อคุณ —
          </p>
        </div>

        {/* Swiper Section */}
        <div className="relative group">
          <SwiperShowProduct>
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="py-4"> {/* เพิ่ม Padding เล็กน้อยกันเงา Card โดนตัด */}
                  <ProductCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </SwiperShowProduct>
        </div>
        
      </div>
    </div>
  );
};

export default NewProduct;