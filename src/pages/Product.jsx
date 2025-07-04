import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import BestSeller from "../components/BestSeller";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState(null);
  const [productData, setProductData] = useState({});
  const [size, setSize] = useState(null);

  useEffect(() => {
    const fetchProductData = () => {
      products.map((item) => {
        if (item._id === productId) {
          setProductData(item);
          setImage(item.image[0]);
        }
      });
      return null;
    };
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-1 border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images*/}
        <div className="flex1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* ----------------------Product Info-------------------------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("x")
              .map((_, index) => (
                <img
                  key={index}
                  src={assets.star_icon}
                  alt=""
                  className="w-4"
                />
              ))}
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`py-2 px-4 border rounded transition-colors duration-200 ${
                    item === size
                      ? "border-orange-400 bg-orange-100 text-orange-600"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery is available on this rpoduct</p>
            <p>Easy Return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/*-----------------------Description & product Details section----------------------------------------*/}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm border-gray-300">
            Description
          </b>
          <p className="border px-5 py-3 text-sm border-gray-300">
            Product details
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 border-gray-300">
          <p>
            {productData.description} {productData.description}
            {productData.description} {productData.description}
          </p>
          <p>
            {productData.description} {productData.description}
            {productData.description} {productData.description}
          </p>
        </div>
      </div>

      {/*-------------------------------display related products-----------------------------------------*/}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
      {/*-------------------------------Latest collection products-----------------------------------------*/}
      <BestSeller />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
