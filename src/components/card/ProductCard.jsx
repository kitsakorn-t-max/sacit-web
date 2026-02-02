import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";
// 1. นำเข้า toast
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  // 2. สร้างฟังก์ชันสำหรับกดปุ่ม
  const handleAddToCart = (product) => {
    actionAddtoCart(product); // บันทึกลง store
    
    // แสดงแจ้งเตือน
    toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า", {
      position: "top-center",    // ตำแหน่งตามรูปตัวอย่าง
      autoClose: 2000,          // ปิดเองใน 2 วินาที
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="border border-amber-100 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-3 w-48 h-[300px] flex flex-col justify-between">
        
        <div>
          <div className="rounded-md overflow-hidden relative h-32 bg-amber-50">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                alt={item.title}
                className="w-full h-full object-cover rounded-md hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full text-center flex items-center justify-center shadow-inner">
                <span className="text-amber-300 font-medium">No Image</span>
              </div>
            )}
          </div>

          <div className="py-3 h-24 overflow-hidden">
            <h2 className="text-lg font-bold text-amber-900 line-clamp-2">
              {item.title}
            </h2>
            <p className="text-sm text-amber-700/60 line-clamp-2 mt-1 leading-tight">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-amber-100 pt-3">
          <div className="flex flex-col">
            <span className="text-xs text-amber-600 font-medium">ราคา</span>
            <span className="text-lg font-bold text-amber-900 leading-none">
              {numberFormat(item.price)}
              <span className="text-sm font-medium text-amber-900 ml-1">บาท</span>
            </span>
          </div>
          
          <button
            // 3. เปลี่ยนจาก actionAddtoCart โดยตรง มาเป็น handleAddToCart
            onClick={() => handleAddToCart(item)}
            className="bg-amber-800 hover:bg-amber-900 text-white p-2.5 rounded-full shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
      </div>
    </motion.div>
  );
};

export default ProductCard;