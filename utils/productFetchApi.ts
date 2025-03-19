import { domain } from "@/api/client";

export const createProduct = async ({ formData }: { formData: FormData }) => {
  const response = await fetch(`${domain}/api/products/create_product`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  const data = await response.json();

  return data;
};

export const fetchProducts = async () => {
  const response = await fetch(`${domain}/api/products/get_products`);

  if (!response.ok) {
    throw new Error("Failed to get products");
  }

  const data = await response.json();

  return data;
};

export const fetchSingleProduct = async (productId: string) => {
  const response = await fetch(
    `${domain}/api/products/get_product/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get products");
  }

  return await response.json();
};

export const editProduct = async ({
  formData,
  productId,
}: {
  formData: FormData;
  productId: string;
}) => {
  const response = await fetch(
    `${domain}/api/products/edit_product/${productId}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update products");
  }
  const data = await response.json();

  return data;
};

export const deleteProduct = async ({ productId }: { productId: string }) => {
  const response = await fetch(`${domain}/api/products/delete_product`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to update products");
  }
  const data = await response.text();

  return data;
};
