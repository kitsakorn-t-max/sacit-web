import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state เพื่อความสวยงาม

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("sold", "desc", 12)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  return (
    /* หุ้มด้วย container เพื่อเว้นระยะ margin ซ้าย-ขวา ให้เข้ากับ vibe หน้าจอต่างๆ */
    <div className="w-full px-4 md:px-8 py-6">
      <SwiperShowProduct>
        {data?.map((item) => (
          /* ปรับ key เป็น item.id เพื่อความเสถียร */
          <SwiperSlide key={item.id}>
            <div className="pb-10"> {/* เพิ่ม padding ล่างกันเงาของ Card โดนตัด */}
              <ProductCard item={item} />
            </div>
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </div>
  );
};

export default BestSeller;