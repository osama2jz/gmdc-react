export const userURL = () => {
  let role = JSON.parse(localStorage.getItem("userData")).role;
  console.log("HERE IN THIS FUNCTION");
  if (role === "admin") {
    console.log("ADMIN");
    return `user`;
  } else {
    console.log("SELLER");
    return `user`;
  }
};
