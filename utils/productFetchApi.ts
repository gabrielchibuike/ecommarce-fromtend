import { domain } from "@/api/client";
import { refreshAccessToken } from "./refreshToken";
import { filterProps } from "@/app/GlobalState/Context";

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

export const searchProduct = async (
  searchQuery: string,
  page: number = 1,
  limit: number = 10
) => {
  const fetchWithToken = async () => {
    const queryParams = new URLSearchParams({
      searchQuery: searchQuery,
      page: page.toString(),
      limit: limit.toString(),
    });
    console.log(queryParams);

    const response = await fetch(
      `${domain}/api/products/search?${queryParams}`,
      {
        headers: {
          "x-auth-token": JSON.parse(
            localStorage.getItem("Access_Token") as string
          ),
        },
      }
    );

    if (response.status === 403) {
      throw new Error("TokenExpired");
    }

    if (!response.ok) {
      throw new Error("Failed to get products");
    }

    return await response.json();
  };
  try {
    const data = await fetchWithToken();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "TokenExpired") {
      const result = await refreshAccessToken();

      const data = result.data;

      if (!data) {
        throw new Error("Failed to refresh token");
      }

      localStorage.setItem("Access_Token", JSON.stringify(data));

      return fetchWithToken();
    }
  }
};

export const fetchProducts = async (
  filters: filterProps,
  page: number = 1,
  limit: number = 10
) => {
  const fetchWithToken = async () => {
    const queryParams = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(filters).filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) =>
            (typeof value === "string" && value.length > 0) ||
            (Array.isArray(value) && value.length > 0) ||
            (typeof value === "number" && !isNaN(value))
        )
      ),
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${domain}/api/products/get_products?${queryParams}`,
      {
        headers: {
          "x-auth-token": JSON.parse(
            localStorage.getItem("Access_Token") as string
          ),
        },
      }
    );

    if (response.status === 403) {
      throw new Error("TokenExpired");
    }

    if (!response.ok) {
      throw new Error("Failed to get products");
    }

    return await response.json();
  };

  try {
    const data = await fetchWithToken();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "TokenExpired") {
      const result = await refreshAccessToken(); // Assume refreshAccessToken is defined elsewhere
      const data = result.data;

      if (!data) {
        throw new Error("Failed to refresh token");
      }

      localStorage.setItem("Access_Token", JSON.stringify(data));
      return fetchWithToken();
    }
    throw error;
  }
};

export const fetchFeatureProducts = async () => {
  const fetchWithToken = async () => {
    const response = await fetch(
      `${domain}/api/products/get_featured_products`,
      {
        headers: {
          "x-auth-token": JSON.parse(
            localStorage.getItem("Access_Token") as string
          ),
        },
      }
    );

    if (response.status === 403) {
      throw new Error("TokenExpired");
    }

    if (!response.ok) {
      throw new Error("Failed to get products");
    }

    return await response.json();
  };
  try {
    const data = await fetchWithToken();

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "TokenExpired") {
      const result = await refreshAccessToken();

      const data = result.data;

      if (!data) {
        throw new Error("Failed to refresh token");
      }

      localStorage.setItem("Access_Token", JSON.stringify(data));

      return fetchWithToken();
    }
  }
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
