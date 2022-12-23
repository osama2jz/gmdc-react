import React from "react";
import { withTranslation } from "react-i18next";
import Button from "../Button";
import fwd from "../../assets/fwd.svg";
import loc from "../../assets/location.svg";
import meter from "../../assets/meter.svg";
import transm from "../../assets/transmission.svg";
import tire from "../../assets/tire.svg";
import vinn from "../../assets/vin.svg";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

const InventoryCard = ({
  vin,
  model,
  trans,
  mileage,
  icon,
  price,
  awd,
  title,
  location,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="card shadow" onClick={() => navigate(`/viewCar/${id}`)}>
      <img
        src={icon || require(`../../assets/notavailable.jpg`)}
        className="mr-2"
        style={{
          height: "200px",
          width: "100%",
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
        }}
      />
      <div className="p-2 d-flex flex-column justify-content-between" style={{height:'220px'}}>
        <div className="row d-flex gap-1">
          <h3>{title}</h3>
          <h6 className="col d-flex">
            <img src={vinn} style={{ width: "20px" }} className="mr-2" />
            {vin}
          </h6>
          <h6 className="col d-flex">
            <img src={tire} style={{ width: "20px" }} className="mr-2" />
            {model}
          </h6>
          <div className="w-100"></div>
          <h6 className="col d-flex">
            <img src={transm} style={{ width: "20px" }} className="mr-2" />
            {trans}
          </h6>
          {mileage && (
            <h6 className="col d-flex">
              <img src={meter} style={{ width: "20px" }} className="mr-2" />
              {mileage}
            </h6>
          )}
          <div className="w-100"></div>
          {location && (
            <h6 className="col d-flex">
              <img src={loc} style={{ width: "20px" }} className="mr-2" />
              {location}
            </h6>
          )}
          {awd && (
            <h6 className="col d-flex">
              <img src={fwd} style={{ width: "20px" }} className="mr-2" />
              {awd}
            </h6>
          )}
        </div>
        <div
          className="d-flex justify-content-between mt-2 align-items-end"
          style={{
            borderTop: "1px solid gray",
            fontSize: "12px",
            height: "40px",
          }}
        >
          <h3>{price}</h3>
          <Button
            title="Book Now"
            primary={true}
            className="btn-sm"
            width="100px"
            fontSize="14px"
          />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(InventoryCard);
