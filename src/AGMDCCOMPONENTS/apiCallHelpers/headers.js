import { getToken, getSellerToken } from "./checkToken";

export const hardCodedToken = process.env.REACT_APP_HARDCODED_TOKEN;

export const allowForLoop = (data) => {
  if (JSON.parse(localStorage.getItem("userData")).role === "admin") {
    return data;
  } else {
    if (process.env.REACT_APP_ALLOW_FOR_LOOP) {
      let vehicles = data.filter((vehicle) => {
        if (
          vehicle.addedBy === JSON.parse(localStorage.getItem("userData"))._id
        ) {
          return vehicle;
        }
      });
      return vehicles;
    }
  }
};
export const getHeader = () => {
  return {
    Authorization: hardCodedToken || getToken(),
  };
};
