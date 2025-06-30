/* eslint-disable @typescript-eslint/no-explicit-any */
import { domain } from "@/api/client";

export const createUser = async ({ formInfo }: { formInfo: any }) => {
  const response = await fetch(`${domain}/api/auth/create_user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formInfo),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }

  const data = await response.json();

  return data;
};

export const login = async ({ formInfo }: { formInfo: any }) => {
  const response = await fetch(`${domain}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formInfo),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }

  const data = await response.json();

  return data;
};

export const forgetPassword = async ({ formInfo }: { formInfo: any }) => {
  try {
    const response = await fetch(`${domain}/api/auth/getUserEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to procced");
    }

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to procced") {
      console.log("Something went wrong");
    }
  }
};

export const verifyOtp = async ({ formInfo }: { formInfo: any }) => {
  const response = await fetch(`${domain}/api/auth/verifyOtp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formInfo),
  });

  if (!response.ok) {
    throw new Error("Failed to verify otp");
  }

  const data = await response.json();

  return data;
};

export const resetPassword = async ({ formInfo }: { formInfo: any }) => {
  console.log(formInfo);

  const response = await fetch(`${domain}/api/auth/resetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formInfo),
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  const data = await response.json();

  return data;
};
