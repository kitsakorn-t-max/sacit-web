import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct()
  }, [])

  return (
    /* 1. เปลี่ยนจาก flex เป็น flex-col ในมือถือ (จอเล็ก) 
      2. และเป็น flex-row ในจอขนาดใหญ่ (md ขึ้นไป)
    */
    <div className='flex flex-col md:flex-row min-h-screen'>

      {/* --- SearchBar (ซ้าย) --- 
          - มือถือ: เต็มความกว้าง (w-full)
          - Desktop: 1 ใน 4 (md:w-1/4)
      */}
      <div className='w-full md:w-1/4 p-4 bg-gray-100 md:h-screen overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200'>
        <SearchCard />
      </div>

      {/* --- Product (กลาง) --- 
          - md:w-1/2 (50%) สำหรับจอคอม
      */}
      <div className='w-full md:w-1/2 p-4 h-screen overflow-y-auto'>
        <p className='text-2xl font-bold mb-4'>สินค้าทั้งหมด</p>
        
        {/* ปรับ Grid ของสินค้าให้ Responsive
            - มือถือ: 2 คอลัมน์ (grid-cols-2)
            - จอคอม: 3 คอลัมน์ (lg:grid-cols-3)
        */}
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* --- Cart (ขวา) --- 
          - md:w-1/4 (25%) สำหรับจอคอม
      */}
      <div className='w-full md:w-1/4 p-4 bg-gray-100 md:h-screen overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200'>
        <CartCard />
      </div>

    </div>
  )
}

export default Shop