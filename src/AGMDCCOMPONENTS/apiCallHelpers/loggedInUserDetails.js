export const getUserDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  return userDetails;
};
