/* eslint-disable @typescript-eslint/no-explicit-any */
import { domain } from "@/api/client";

export const createAddress = async ({ formInfo }: { formInfo: any }) => {
  console.log("formInfo", formInfo);

  const response = await fetch(
    `${domain}/api/shippingAddress/createShippingAddress`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formInfo),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create Address");
  }

  const data = await response.json();

  return data;
};

export const fetchShippingAddress = async (productId: string) => {
  const response = await fetch(
    `${domain}/api/products/get_product/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get products");
  }

  return await response.json();
};
