// const getToken = () => {
//   if (typeof window === "undefined") {
//     console.error("localStorage is not available on the server.");
//     return null;
//   }
//   const token = localStorage.getItem("Access_Token");
//   if (!token) {
//     console.error("Access_Token not found in localStorage.");
//     return null;
//   }
//   try {
//     return JSON.parse(token);
//   } catch (error) {
//     console.error("Error parsing Access_Token from localStorage:", error);
//     return null;
//   }
// };
