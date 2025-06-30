/* eslint-disable react/react-in-jsx-scope */
"use client";
// import { useDispatch, useSelector } from "react-redux";
import BillBoard from "../Components/BillBoard";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import SideNav from "../Components/SideNav";
// import Categories from "./Categories";
// import FeaturedProducts from "./FeaturedProducts";
import ItemCategories from "../Components/ItemCategories";
import BestSelling from "../Components/BestSelling";
import DealOfTheDay from "../Components/DealOfTheDay";
import LatestCollection from "../Components/LatestCollection";
import Tesitimonial from "../Components/Tesitimonial";
// import PaystackPop from "@paystack/inline-js";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-between">
        <NavBar />
        <BillBoard />
        <ItemCategories />
        <BestSelling />
        <DealOfTheDay />
        <LatestCollection />
        <Tesitimonial />
        {/* <FeaturedProducts /> */}
        <Footer />
        <SideNav />
      </div>
    </>
  );
}
