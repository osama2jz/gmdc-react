import React, { useEffect, useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import Button from "../../components/Button";
import MiniCard from "../../components/MiniCard";
import Page from "../../components/Page";
import sixt from "../../assets/l6.svg";
import fift from "../../assets/l5.svg";
import fort from "../../assets/l4.svg";
import thirt from "../../assets/l3.svg";
import search from "../../assets/search.svg";
import "./styles.scss";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import MiniCarView from "../../components/MiniCarView";
import InventoryCard from "../../components/InventoryCard";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

const Landing = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [cars, setCars] = useState({});
  const [searchh, setSearchh] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(
      "https://gmdc-server-production.up.railway.app/api/v1/vehicle/allvehicles?limit=10&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.vehicles);
        setCars((cars) => response.data.vehicles);
      })
      .catch((err) => console.error(err));
  }, []);
  // console.log("cars", cars)
  return (
    <Page meta="PISES" className="landing-page">
      <div className="main">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "black",
            opacity: "0.4",
          }}
        ></div>

        <h1 className="text-center mt-0">FIND YOUR SOUL RIDE</h1>
        <div className="search">
          <img src={search} style={{ width: "25px" }} />
          <input
            type="text"
            placeholder="Search Make, Model or keyword"
            style={{ width: "100%", border: "none" }}
            onChange={(v) => setSearchh(v.target.value)}
          />
          <Button
            onClick={() => navigate(`/inventory/s/${searchh}`)}
            title={"GO"}
            primary={true}
          />
        </div>
        <div className="carss">
          <div className="cars">
            <MiniCard title="Truck" icon="trucks" />
            <MiniCard
              title="Hatchbacks"
              icon="hatchbacks"
            />
            <MiniCard
              title="Sedans"
              icon="sedan"
            />
          </div>
          <div className="cars">
            <MiniCard
              title="Coupe"
              icon="coupe"
            />
            <MiniCard
              title="Electric"
              icon="ev"
            />
            <MiniCard
              title="SUVs"
              icon="suv"
            />
          </div>
        </div>
      </div>
      <h2 className="text-center mt-5">Top Trending Cars</h2>
      {cars.length > 0 ? (
        <Carousel
          align="center"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          loop
          slideSize="35%"
          slidesToScroll={1}
          height={450}
        >
          {cars.map((obj, ind) => (
            <Carousel.Slide key={ind} className="m-2">
              <InventoryCard
                id={obj._id}
                title={obj.title}
                icon={obj.assets[0]?.asset}
                trans={obj.transmission}
                mileage={`${obj.mileage} miles`}
                price={`$${obj.price}`}
                price2="$250"
                vin={obj.vin}
                model={obj.year}
                location={obj.location}
                awd={obj.driveTrain}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Loader className="w-100 my-5" />
      )}
      <h2 className="text-center">Affordable Cars Available Now</h2>
      <div className="third">
        <div
          className="d-flex flex-column align-items-center justify-content-center rounded px-5 py-4 shadow mb-3"
          style={{ backgroundColor: "rgb(0, 97, 158, 0.2)" }}
        >
          <img src={thirt} />
          <h3>Cars Under $20,000</h3>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-between rounded px-5 py-4 shadow mb-3"
          style={{ backgroundColor: "rgb(0, 97, 158, 0.2)" }}
        >
          <img src={fort} />
          <h3>Shop Great Deals</h3>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-between rounded px-5 py-4 shadow mb-3"
          style={{ backgroundColor: "rgb(0, 97, 158, 0.2)" }}
        >
          <img src={fift} style={{ width: "40px" }} />
          <h3>Delivery by Saturday</h3>
        </div>
        <div
          className="d-flex flex-column align-items-center rounded px-5 py-4 shadow mb-3"
          style={{ backgroundColor: "rgb(0, 97, 158, 0.2)" }}
        >
          <img src={sixt} />
          <h3>Shop Fuel Efficient</h3>
        </div>
      </div>
      <div
        className="row d-flex justify-content-center gap-3 m-auto py-4"
        style={{ backgroundColor: "rgb(0, 97, 158, 0.2)" }}
      >
        <h2 className="col text-center">Shop Great Values</h2>
        <div className="w-100"></div>
        <MiniCarView title="Honda Civic" icon="p1" className="carcard" />
        <MiniCarView title="Ford F-150" icon="p2" className="carcard" />
        <div className="w-100"></div>
        <MiniCarView title="Toyota Camry" icon="p3" className="carcard" />
        <MiniCarView title="Chevrolet Equinox" icon="p4" className="carcard" />
        <div className="w-100"></div>
        <MiniCarView title="Nissan Altima" icon="p5" className="carcard" />
        <MiniCarView title="Ford Mustang" icon="p6" className="carcard" />
        <div className="w-100"></div>
        <Button
          title="View All"
          width={"200px"}
          onClick={() => navigate("/inventory")}
          style={{
            width: "20%",
            marginTop: "20px",
            fontWeight: "bold",
            border: "1px solid rgb(0, 0, 0, 0.1)",
            backgroundColor: "rgb(255, 255, 255, 0.5)",
          }}
        />
      </div>
    </Page>
  );
};

export default withTranslation()(Landing);
