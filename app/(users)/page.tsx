"use client";
import { useDispatch, useSelector } from "react-redux";
import BillBoard from "../Components/BillBoard";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import SideNav from "../Components/SideNav";
// import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import { useEffect } from "react";
import { tokenPayload } from "../GlobalState/store";
import ItemCategories from "../Components/ItemCategories";
// import PaystackPop from "@paystack/inline-js";

export default function Home() {
  return (
    <>
      <NavBar />
      <BillBoard />
      {/* <div className="px-20 py-4 max-lg:py-2 max-lg:px-1">
        <Categories />
      </div> */}
      <ItemCategories />
      <FeaturedProducts />
      <Footer />
      <SideNav />
    </>
  );
}
