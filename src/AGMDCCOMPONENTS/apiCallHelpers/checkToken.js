// GET ADMIN TOKEN
export const getToken = () => {
  let data = JSON.parse(localStorage.getItem("userData"));
  // if (data.role === "admin") {
  return `Bearer ${data.token}`;
};
