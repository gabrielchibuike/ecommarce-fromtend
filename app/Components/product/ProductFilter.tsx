// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "../UI/CheckBox";
import Products from "../Products";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productFetchApi";
import { useDebounce } from "use-debounce";
import { Slider } from "../UI/Slider";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setMainCategory,
  setProductCategory,
  setSubCategory,
  toggleColor,
  toggleSize,
  setPriceMax,
  setManufacturerBrand,
  clearFilters,
} from "@/app/GlobalState/store";
import { useDispatch, useSelector } from "react-redux";

export default function ProductFilter({
  gender,
  productCategory,
  subCategory,
}: {
  gender: string;
  productCategory: string;
  subCategory: string;
}) {
  const dispatch = useDispatch();

  const filters = useSelector((state: any) => state.filters);

  const [page, setPage] = useState(1);

  useEffect(() => {
    // Initialize filters
    dispatch(
      clearFilters({
        main_category: `${gender.replace("m", "M")}'s wear`,
        product_category: productCategory,
        sub_category: subCategory,
        color: [],
        size: [],
        price_max: 7000,
        manufacturer_brand: "",
        searchQuery: "",
      })
    );
  }, []);

  // Debounce filters to avoid excessive API calls
  const [debouncedFilters] = useDebounce(filters, 500);

  // Handle main category checkbox change
  const handleMainCategoryChange = () => {
    dispatch(
      setMainCategory(
        filters.main_category ? "" : `${gender.replace("m", "M")}'s wear`
      )
    );
  };

  // Handle product category checkbox change
  const handleProductCategoryChange = () => {
    dispatch(
      setProductCategory(filters.product_category ? "" : productCategory)
    );
  };

  // Handle sub category checkbox change
  const handleSubCategoryChange = () => {
    dispatch(setSubCategory(filters.sub_category ? "" : subCategory));
  };

  // Handle color checkbox changes
  const handleColorChange = (color: string) => {
    dispatch(toggleColor(color.toLowerCase()));
  };

  // Handle size checkbox changes
  const handleSizeChange = (size: string) => {
    dispatch(toggleSize(size.toLowerCase()));
  };

  // Handle price slider change
  const handlePriceChange = (value: number[]) => {
    dispatch(setPriceMax(value[0])); // Extract the single value from the array
  };

  // Handle brand input change
  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setManufacturerBrand(e.target.value));
  };

  // Clear all filters
  const clearFiltersHandler = () => {
    dispatch(
      clearFilters({
        main_category: `${gender.replace("m", "M")}'s wear`,
        product_category: productCategory,
        sub_category: subCategory,
        color: [],
        size: [],
        price_max: 100,
        manufacturer_brand: "",
        searchQuery: "",
      })
    );
    setPage(1);
  };

  // Fetch products using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debouncedFilters, page],
    queryFn: () => fetchProducts(debouncedFilters, page, 10),
    staleTime: 0,
  });

  // Fetch search products

  const products = data?.products;
  const total = data?.total;

  console.log(products);

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  return (
    <div className="w-full flex min-h-[500px] ">
      <div className=" py-4 border-r border-gray-200 max-sm:hidden">
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Category</h4>
          <div className="flex items-center gap-1.5 mb-2">
            <Checkbox
              id="main_category"
              checked={
                filters.main_category === `${gender.replace("m", "M")}'s wear`
              }
              onCheckedChange={handleMainCategoryChange}
            />
            <label
              htmlFor="main_category"
              className="text-sm font-medium leading-none"
            >
              {gender}
            </label>
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            <Checkbox
              id="product_category"
              checked={filters.product_category === productCategory}
              onCheckedChange={handleProductCategoryChange}
            />
            <label
              htmlFor="product_category"
              className="text-sm font-medium leading-none"
            >
              {productCategory}
            </label>
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            <Checkbox
              id="sub_category"
              checked={filters.sub_category === subCategory}
              onCheckedChange={handleSubCategoryChange}
            />
            <label
              htmlFor="sub_category"
              className="text-sm font-medium leading-none"
            >
              {subCategory}
            </label>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Price</h4>
          <div>
            <Slider
              defaultValue={[7000]}
              max={10000}
              min={0}
              step={100}
              value={[filters.price_max || 7000]}
              onValueChange={(value) => {
                console.log("Slider value:", value); // Debug slider input
                handlePriceChange(value);
              }}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-2">
              $0 - ${filters.price_max || 7000}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Color</h4>
          {["Black", "Red", "Blue", "White"].map((color) => (
            <div key={color} className="flex items-center gap-1.5 mb-2">
              <Checkbox
                id={`color-${color.toLowerCase()}`}
                checked={filters.color.includes(color.toLowerCase())}
                onCheckedChange={() => handleColorChange(color)}
              />
              <label
                htmlFor={`color-${color.toLowerCase()}`}
                className="text-sm font-medium leading-none"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Size</h4>
          {["S", "M", "lg", "XL"].map((size) => (
            <div key={size} className="flex items-center gap-1.5 mb-2">
              <Checkbox
                id={`size-${size.toLowerCase()}`}
                checked={filters.size.includes(size.toLowerCase())}
                onCheckedChange={() => handleSizeChange(size)}
              />
              <label
                htmlFor={`size-${size.toLowerCase()}`}
                className="text-sm font-medium leading-none"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Brand</h4>
          <input
            type="text"
            value={filters.manufacturer_brand}
            onChange={handleBrandChange}
            placeholder="e.g., Nike"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={clearFiltersHandler}
          className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear All
        </button>
      </div>
      <div className="w-full p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="mb-4">{total} products found</p>
            <Products products={products} isLoading={isLoading} />
            <div className="flex justify-center gap-4 mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button
                disabled={page * 10 >= total}
                onClick={() => setPage(page + 1)}
                className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
