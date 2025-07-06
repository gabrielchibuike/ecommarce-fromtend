/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { CgSearchLoading } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ContextApi } from "../GlobalState/Context";
import { useRouter } from "next/navigation";
import NavigationMenu from "./NavigationMenu";
import { useDispatch } from "react-redux";
// import { setSearchQuery } from "../GlobalState/store";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { searchProduct } from "@/utils/productFetchApi";
// import { useDebounce } from "use-debounce";

function NavBar() {
  const { toggleSideNav } = useContext(ContextApi);
  const menu = useRef<HTMLDivElement>(null);
  const route = useRouter();
  const toggleElement = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  // Fetch search results
  const { data, isLoading } = useQuery({
    queryKey: ["searchProducts", searchQuery],
    queryFn: () => searchProduct(searchQuery),
    enabled: !!searchQuery,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  console.log(data, "data");
  console.log(searchQuery);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setSearchQuery(""); // Clear search on outside click
      }
    }
    if (searchQuery) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  function viewMenu() {
    toggleSideNav.current?.classList.replace("hidden", "block");
    setTimeout(() => {
      toggleSideNav.current?.classList.replace(
        "translate-x-full",
        "translate-x-0"
      );
    }, 300);
  }

  // const slugify = (text: string): string => {
  //   const slug = text.toLowerCase().replace("'s wear", "");

  //   return slug;
  // };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      // .replace(/\s+/g, "-")
      // .replace(/&/g, "and")
      // .replace(/[^\w-]+/g, "")
      .replace("'s wear", "");

  return (
    <>
      <nav className="w-full h-fit flex flex-col max-lg:h-12 bg-white fixed right-0 left-0 z-50">
        <ul className="w-full h-16 flex items-center px-10 max-md:px-4 max-lg: justify-between bg-white fixed right-0 left-0 z-50">
          <div className="flex items-center gap-1">
            <Image
              alt=""
              src={"/DC.png"}
              width={100}
              height={100}
              className="contain w-12 max-lg:w-10 max-lg:h-10"
            />
            <Image
              alt=""
              src={"/text.png"}
              width={100}
              height={100}
              className="contain w-20 max-lg:w-20"
            />
          </div>

          <div className="text-sm font-semibold flex items-center gap-5 cursor-pointer max-xl:hidden">
            <div
              className="flex items-center gap-1 hover:text-yellow-600"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={(e) => {
                if (!toggleElement.current?.contains(e.relatedTarget as Node))
                  setIsOpen(false);
              }}
            >
              <div>Shop</div>
              <IoIosArrowDown />
            </div>
            <div className="hover:text-yellow-600">
              <Link href={"/BestSelling"}>
                <div>Best Selling Items</div>
              </Link>
            </div>
            <div className="hover:text-yellow-600">
              <Link href={"/NewArrival"}>
                <div>New Arrival</div>
              </Link>
            </div>
          </div>

          <div className="max-lg:hidden relative">
            <input
              type="text"
              value={searchQuery || ""}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-[400px] py-3 px-3 text-xs focus:outline-none font-medium rounded-lg border border-zinc-600/20 focus:border-primary"
            />
            <div ref={cardRef}>
              {data && (
                <Card additionalClass="w-[400px] min-h-[200px] absolute buoton-0 mt-1 rounded-xl shadow-lg border  z-50 p-4 !bg-white">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <CgSearchLoading className="text-2xl animate-spin" />
                    </div>
                  ) : data?.products?.length > 0 ? (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {data.products.map((product: any) => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm font-normal rounded-md"
                          onClick={() => {
                            console.log(product.main_category, "slugfy");

                            const categorySlug = slugify(product.main_category);
                            route.push(
                              `/categories/${categorySlug}/${product.product_category}/${product.sub_category}`
                            );
                          }}
                        >
                          {product.product_name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-foreground">
                      No results found.
                    </p>
                  )}
                </Card>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end max-lg:gap-3 items-center cursor-pointer">
            <div className="flex gap-1 items-center hover:text-yellow-600 lg:hidden">
              <CgSearchLoading className="text-2xl font-semibold" />
            </div>
            <div className="flex gap-1 items-center hover:text-yellow-600 max-lg:hidden">
              <HiUser className="text-xl font-medium" />
              <p className="font-medium text-sm">Account</p>
            </div>
            <div
              className="flex gap-1 items-center hover:text-yellow-600"
              onClick={() => route.push("/cart")}
            >
              <AiOutlineShoppingCart className="text-xl font-medium" />
              <p className="font-medium max-lg:hidden text-sm">Cart</p>
            </div>
            <div onClick={viewMenu}>
              <div
                className="hidden max-lg:text-2xl gap-1 items-center max-xl:block"
                ref={menu}
              >
                <BiMenu />
              </div>
            </div>
          </div>
        </ul>
      </nav>

      <NavigationMenu
        toggleElement={toggleElement}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default NavBar;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { IoIosArrowDown } from "react-icons/io";
// import { BiMenu } from "react-icons/bi";
// import { CgSearchLoading } from "react-icons/cg";
// import { HiUser } from "react-icons/hi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import Link from "next/link";
// import React, { useContext, useEffect, useRef, useState } from "react";
// // import CustomInput from "./CustomInput";
// import Image from "next/image";
// import { ContextApi } from "../GlobalState/Context";
// import { useRouter } from "next/navigation";
// import NavigationMenu from "./NavigationMenu";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchQuery } from "../GlobalState/store";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./UI/Dialog";
// import Card from "./Card";
// import { useQuery } from "@tanstack/react-query";
// import { fetchProducts } from "@/utils/productFetchApi";
// import { useDebounce } from "use-debounce";

// function NavBar() {
//   const { toggleSideNav } = useContext(ContextApi);
//   const menu = useRef<HTMLDivElement>(null);
//   const route = useRouter();
//   const toggleElement = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [newData, setNewData] = useState<any[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
//         setIsDialogOpen(false); // Close the card
//       }
//     }

//     if (isDialogOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDialogOpen, setIsDialogOpen]);

//   function viewMenu() {
//     toggleSideNav.current?.classList.replace("hidden", "block");
//     setTimeout(() => {
//       toggleSideNav.current?.classList.replace(
//         "translate-x-full",
//         "translate-x-0"
//       );
//     }, 300);
//   }

//   // function hoverMenu() {
//   //   toggleElement.current?.classList.replace("hidden", "block");
//   // }

//   const dispatch = useDispatch();

//   const filters = useSelector((state: any) => state.filters);

//   const searchData = useSelector((state: any) => state.search);

//   // Debounce the search term

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // setSearchTerm(value);
//     dispatch(setSearchQuery(value)); // Update Redux store
//     if (value) {
//       setIsDialogOpen(true); // Open dialog when typing
//     } else {
//       setIsDialogOpen(false);
//     }
//   };

//   // Debounce filters to avoid excessive API calls
//   const [debouncedFilters] = useDebounce(filters, 500);

//   // Fetch products for search results
//   const { data } = useQuery({
//     queryKey: ["searchProducts", debouncedFilters.searchQuery],
//     queryFn: () => fetchProducts({ ...filters, page: 1, limit: 10 }), // Fetch top 5 results
//     enabled: debouncedFilters.searchQuery
//       ? debouncedFilters.searchQuery.length > 0
//       : undefined, // Only fetch when search term exists
//     staleTime: 0,
//   });

//   useEffect(() => {
//     if (data) {
//       setIsLoading(false);
//       setNewData([data]);
//       // dispatch(searchPayloadData(data));
//     }
//   }, [dispatch, data]);

//   console.log(newData[0]);

//   const slugify = (text: string): string => {
//     let slug = text
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/&/g, "and")
//       .replace(/[^\w-]+/g, "");

//     // More robust handling for "men's wear" and similar patterns
//     if (slug.match(/^mens?-wear$/)) {
//       slug = "men"; // Transform "mens-wear" or "men-wear" to "men"
//     }

//     slug = slug.replace(/-+/g, "-").replace(/^-|-$/g, "");

//     return slug;
//   };

//   return (
//     <>
//       <nav className="w-full h-fit  flex flex-col   max-lg:h-12   bg-white fixed right-0 left-0  z-50 ">
//         {/* <NavNotification /> */}
//         <ul className="w-full h-16 flex items-center  px-10 max-lg:px-1 justify-between bg-white fixed right-0 left-0  z-50   ">
//           <div className=" flex items-center gap-1">
//             <Image
//               alt=""
//               src={"/DC.png"}
//               width={100}
//               height={100}
//               className="contain w-12  max-lg:w-10 max-lg:h-10"
//             />
//             <Image
//               alt=""
//               src={"/text.png"}
//               width={100}
//               height={100}
//               className="contain w-20  max-lg:w-20 "
//             />
//           </div>

//           <div className="text-sm font-semibold flex items-center gap-5 cursor-pointer max-xl:hidden">
//             <div
//               className="flex items-center gap-1 hover:text-yellow-600"
//               onMouseEnter={() => {
//                 setIsOpen(true);
//               }}
//               onMouseLeave={(e) => {
//                 if (!toggleElement.current?.contains(e.relatedTarget as Node)) {
//                   setIsOpen(false);
//                 }
//               }}
//             >
//               <div>Shop</div>
//               <IoIosArrowDown />
//             </div>
//             <div className="hover:text-yellow-600">
//               <Link href={"/BestSelling"}>
//                 <div>Best Selling Items</div>
//               </Link>
//             </div>
//             <div className="hover:text-yellow-600">
//               <Link href={"/NewArrival"}>
//                 <div>New Arrival</div>
//               </Link>
//             </div>
//           </div>

//           <div className="max-lg:hidden relative">
//             <input
//               type="text"
//               value={filters.search}
//               onChange={(e) => handleSearchChange(e)}
//               placeholder="Search products..."
//               className="w-[400px] py-3  px-3  text-xs focus:outline-none  font-medium rounded-lg border border-zinc-600/20 focus:border-primary"
//             />
//             <div ref={cardRef} className="">
//               {isDialogOpen && (
//                 <Card additionalClass="w-[400px] min-h-[200px] absolute buoton-0 mt-1 rounded-xl shadow-lg border  z-50 p-4 !bg-white">
//                   <div>
//                     {isLoading ? (
//                       <div className="flex justify-center">
//                         <CgSearchLoading className="text-2xl animate-spin" />
//                       </div>
//                     ) : newData[0].products?.length > 0 ? (
//                       <div className="space-y-2 max-h-[300px] overflow-y-auto">
//                         {newData[0].products.map((product: any) => (
//                           <div
//                             key={product.id}
//                             className="p-2 hover:bg-gray-100 cursor-pointer text-sm font-normal rounded-md"
//                             onClick={() => {
//                               route.push(
//                                 `/categories/${slugify(
//                                   product.main_category
//                                 )}/${product.product_category}/${
//                                   product.product_name
//                                 }`
//                               );
//                             }}
//                           >
//                             {product.product_name}
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-center text-foreground">
//                         No results found.
//                       </p>
//                     )}
//                   </div>
//                 </Card>
//               )}
//             </div>
//           </div>

//           <div className="flex gap-3 justify-end max-lg:gap-3 items-center cursor-pointer ">
//             <div className="flex gap-1 items-center hover:text-yellow-600 lg:hidden">
//               <CgSearchLoading className="text-2xl font-semibold " />
//             </div>
//             <div className="flex gap-1 items-center hover:text-yellow-600 max-lg:hidden">
//               <HiUser className="text-xl font-medium" />
//               <p className="font-medium  text-sm">Account</p>
//             </div>
//             <div
//               className="flex gap-1 items-center hover:text-yellow-600"
//               onClick={() => {
//                 route.push("/cart");
//               }}
//             >
//               <AiOutlineShoppingCart className="text-xl font-medium" />
//               <p className="font-medium max-lg:hidden text-sm">Cart</p>
//             </div>

//             <div onClick={viewMenu}>
//               <div
//                 className="hidden max-lg:text-2xl  gap-1 items-center max-xl:block"
//                 ref={menu}
//               >
//                 <BiMenu />
//               </div>
//             </div>
//           </div>
//         </ul>
//       </nav>

//       <NavigationMenu
//         toggleElement={toggleElement}
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//       />
//     </>
//   );
// }

// export default NavBar;
