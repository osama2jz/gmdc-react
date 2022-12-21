export const userType = () => {
  let data = JSON.parse(localStorage.getItem("userData"));
  return data.role;
};

export const getUserID = () => {
  let data = JSON.parse(localStorage.getItem("userData"));
  return data._id;
};
