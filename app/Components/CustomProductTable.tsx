import { BsTrash3 } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import useCustomRouter from "../hooks/useCustomRouter";
// import { products } from "../admin/product/page";
import { useSelector } from "react-redux";
import Image from "next/image";
import { domain } from "@/api/client";
import { deleteProduct, editProduct } from "@/utils/productFetchApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function CustomTable({ products }: { products: any }) {
  const { navigateTo } = useCustomRouter();

  const queryClient = useQueryClient();

  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  // const products: products[] = useSelector(
  //   (state: any) => state.productStore.value.productPayload
  // );

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setToastData({
        description: data,
      });
      setIsOpen(true);
    },
    onError: (error) => {
      setToastData({
        description: error?.message!,
      });
      setIsOpen(true);
    },
  });
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-300 rounded-lg shadow-md">
          <thead className="bg-black text-primary-foreground">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Products
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product: any, i: number) => (
                <tr
                  className="bg-zinc-100 hover:bg-zinc-200 cursor-pointer"
                  onClick={() => navigateTo(`product/${product._id}`)}
                  key={i}
                >
                  <td className="px-6 py-4 text-sm text-zinc-800/80 flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-lg bg-zinc-500">
                      <Image
                        src={product.product_image[0]}
                        // src={`${domain}/${product.product_image[0]}`}
                        width={200}
                        height={200}
                        className="object-cover w-10 h-10 "
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="overflow-hidden text-ellipsis text-nowrap w-28 text-sm font-semibold">
                        {product.product_name}
                      </p>
                      <p className="text-xs font-semibold">
                        {product.product_category}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-800/80">
                    <p className="overflow-hidden text-ellipsis text-nowrap w-20  font-semibold">
                      {product.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-800/80 font-semibold">
                    <span>{product.price}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-800/80 font-semibold">
                    <span>{product.manufacturer_brand}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-800/80 font-semibold">
                    <div>
                      {product.status === "Avaliable" ? (
                        <div className="h-7 border border-green-400 bg-green-400/10 rounded-lg flex justify-center items-center text-green-400 font-bold">
                          {product.status}
                        </div>
                      ) : (
                        <div className="h-7 border border-red-400 bg-red-400/10 rounded-lg flex justify-center items-center text-red-400 font-bold">
                          {"Unavailable"}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-800/80 font-semibold">
                    <span>{product.quantity}</span>
                  </td>
                  <td className="px-6 py-4 text-sm ">
                    <div className="flex gap-3">
                      <div
                        className=" p-2"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigateTo(
                            `/admin/product/editProduct/${product._id}`
                          );
                        }}
                      >
                        <AiFillEdit />
                      </div>
                      <div
                        className=" p-2"
                        onClick={async (event) => {
                          event.stopPropagation();
                          console.log("deleting!!");

                          await deleteMutation({ productId: product._id });
                        }}
                      >
                        <BsTrash3 />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomTable;
