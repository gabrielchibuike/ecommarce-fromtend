"use client";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}
export async function DecodeJwt() {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("Access_Token") as string);

    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded;
    } else {
      throw new Error("Token not found");
    }
  }
  return;
}
