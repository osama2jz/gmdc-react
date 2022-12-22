import React from "react";
import React360Viewer from "react-360-view";
// import image1 from "../assets/360imagesassets"

const Car360View = (props) => {
  const basePath =
    props.basePath || "https://fastly-production.24c.in/webin/360";
  const amount = props.amount || 72;
  // const basePath = "https://res.cloudinary.com/amazon-virtual-assistant-chatbot/image/upload/v1671623493/GMDCAR/image360/1GYS4CKJ5FR205609";
  return (
    <div className="card mt-2">
      <div className="v360-header text-light bg-dark">
        <span className="v360-header-title">360 View</span>
        <span className="v360-header-description"></span>
      </div>

      <React360Viewer
        className="card-body"
        amount={amount}
        imagePath={basePath}
        fileName={
          props.basePath && props.amount
            ? "output_{index}.jpg"
            : "output_{index}.jpeg"
        }
        spinReverse
        autoplay
        buttonClass="dark"
      />
    </div>
  );
};

export default Car360View;
