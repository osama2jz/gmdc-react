import React, { useEffect, useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import Button from "../../components/Button";
import Page from "../../components/Page";
import fwd from "../../assets/fwd.svg";
import loc from "../../assets/location.svg";
import meter from "../../assets/meter.svg";
import transm from "../../assets/transmission.svg";
import tire from "../../assets/tire.svg";
import vinn from "../../assets/vin.svg";
import "./styles.scss";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Loader } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";

const ViewCar = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params, "hahaha");
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [car, setCar] = useState({});
  const [status, setStatus] = useState("green");
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWE4OWY0YjM4NmRhZmQwMjU3NzYxOSIsInJvbGUiOiJhZG1pbiIsImFkbWluIjp0cnVlLCJzdGF0dXMiOjEsImlhdCI6MTY3MTUzNTUyNywiZXhwIjoxNjc0MTI3NTI3fQ.8AVWFOxDbc1llTwDASK6U4uPQg1xgw-26rGziFVGroc",
      },
    };

    fetch(
      `https://gmdc-server-production.up.railway.app/api/v1/vehicle/${params.vehicleId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCar((car) => response.data);
        setStatus(response.data.status === "sold" ? "red" : "green");
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(car);
  return (
    <Page meta="PISES">
      {car.title ? (
        <>
          <Carousel
            align="start"
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            loop
            slideSize="40%"
            slidesToScroll={1}
            height={450}
          >
            {car.assets.length > 0 ? (
              car.assets.map((obj, ind) => (
                <Carousel.Slide key={ind} className="m-2">
                  <img src={obj.asset} style={{ width: "50vw" }} />
                </Carousel.Slide>
              ))
            ) : (
              <Carousel.Slide className="m-2">
                <img
                  src={require(`../../assets/notavailable.jpg`)}
                  style={{ width: "50vw" }}
                />
              </Carousel.Slide>
            )}
          </Carousel>
          <div
            className="d-flex p-3 justify-content-between my-4 rounded align-items-center"
            style={{
              width: "98vw",
              backgroundColor: "rgb(0, 0, 0, 0.1)",
              margin: "auto",
            }}
          >
            <div className="d-flex gap-4 text-align-end">
              <div className="mr-5">
                <h2>{car.title}</h2>
                <div
                  className="mt-1 ml-1"
                  style={{
                    backgroundColor: "rgb(0, 97, 148)",
                    width: "40%",
                    height: "5px",
                  }}
                ></div>
              </div>
            </div>
            <div style={{ marginRight: "2%" }}>
              <h2>${car.price}</h2>
              <div
                className="mt-1 ml-1 float-right"
                style={{
                  backgroundColor: "rgb(0, 97, 148)",
                  width: "50px",
                  height: "5px",
                }}
              ></div>
              <p
                style={{
                  backgroundColor: status,
                  color: "white",
                  padding: "2px 7px",
                  minWidth: "70px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  borderRadius: "5px",
                  textTransform: "capitalize",
                }}
                className="status"
              >
                {car.status}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "auto",
              width: "90%",
              marginBottom: "30px",
            }}
            className="specss"
          >
            <div className="row d-flex gap-1 ml-4 py-3 specs">
              <h3>Vehicle Specifications</h3>

              <h6 className="col d-flex mt-3 align-items-center">
                <img src={vinn} style={{ width: "20px" }} className="mr-2" />
                {car.vin}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.make}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.model}
              </h6>
              <div className="w-100"></div>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.condition}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.vehicleType}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={loc} style={{ width: "20px" }} className="mr-2" />
                {car.location}
              </h6>
              <div className="w-100"></div>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.year}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={transm} style={{ width: "20px" }} className="mr-2" />
                {car.transmission}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={meter} style={{ width: "20px" }} className="mr-2" />
                {car.mileage} miles
              </h6>

              <div className="w-100"></div>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={fwd} style={{ width: "20px" }} className="mr-2" />
                {car.driveTrain}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.engine}
              </h6>
              <h6 className="col d-flex mt-3 align-items-center">
                <img src={tire} style={{ width: "20px" }} className="mr-2" />
                {car.horsePower}hp
              </h6>

              <div
                className="mt-4 mb-2 des"
                style={{
                  borderTop: "1px solid rgb(0, 0, 0, 0.1)",
                  width: "95%",
                  margin: "auto",
                }}
              ></div>
              <h3>Vehicle Details</h3>
              <p>{car.description}</p>
            </div>
            <div className="d-flex flex-column m-auto text-center gap-y-2">
              <h4>Found Your Dream Vehicle?</h4>
              <Button
                onClick={() => navigate("/apply")}
                title="Book Now"
                fontSize={"30px"}
                primary={true}
                fontWeight="bold"
                style={{ width: "300px" }}
              />
            </div>
          </div>
        </>
      ) : (
        <Loader className="w-100 m-auto my-5" />
      )}
    </Page>
  );
};

export default withTranslation()(ViewCar);
