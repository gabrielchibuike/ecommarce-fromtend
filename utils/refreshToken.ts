import { domain } from "@/api/client";

export async function refreshAccessToken() {
  console.log("hit!!");

  const response = await fetch(`${domain}/api/refreshToken`, {
    method: "POST",
    credentials: "include",
  });

  // const res = await response.json();
  if (response.status === 403) {
    window.location.href = "/auth/signIn";
  }

  const newAccessToken = await response.json();

  // console.log(newAccessToken, "newAccessToken");

  return newAccessToken;
}
