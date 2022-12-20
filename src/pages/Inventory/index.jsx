import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Button from "../../components/Button";
import Page from "../../components/Page";
import search from "../../assets/search.svg";
import { Pagination } from "@mantine/core";
import "./styles.scss";
import InputField from "../../components/InputField";
import DropDown from "../../components/DropDown";
import { Checkbox, Loader } from "@mantine/core";
import InventoryCard from "../../components/InventoryCard";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [cars, setCars] = useState({});
  const [model, setModel] = useState({ from: "", to: "" });
  const [price, setPrice] = useState({ from: "", to: "" });
  const [transmission, setTransmission] = useState({
    auto: false,
    manual: false,
  });
  const [mileage, setMileage] = useState({ From: "", to: "" });
  const [hp, setHp] = useState({ From: "", to: "" });
  const [engine, setEngine] = useState({
    fuel: false,
    electric: false,
    hybrid: false,
  });
  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(
      `https://gmdc-server-production.up.railway.app/api/v1/vehicle/allvehicles?limit=9&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCars((cars) => response.data.vehicles);
      })
      .catch((err) => console.error(err));
  }, [page]);

  //for pagination
  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(
      "https://gmdc-server-production.up.railway.app/api/v1/vehicle/allvehicles",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCount((count) => response.data.count);
      })
      .catch((err) => console.error(err));
  }, []);
  const applyFilters = () => {
    const options = {
      method: "GET",
      // headers: {
      //   authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWE4OWY0YjM4NmRhZmQwMjU3NzYxOSIsInJvbGUiOiJhZG1pbiIsImFkbWluIjp0cnVlLCJzdGF0dXMiOjEsImlhdCI6MTY3MTUzNTUyNywiZXhwIjoxNjc0MTI3NTI3fQ.8AVWFOxDbc1llTwDASK6U4uPQg1xgw-26rGziFVGroc",
      // },
    };
    fetch(
      "https://gmdc-server-production.up.railway.app/api/v1/vehicle/allvehicles?limit=9&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
  };
console.log("page", page)
  const applySearch = () => {
    navigate("/inventory");
  };
  console.log("cars", count);
  return (
    <Page meta="PISES">
      <div className="main2">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "black",
            opacity: "0.4",
          }}
        ></div>

        <h1 className="text-center mt-0 text-white" style={{ zIndex: "5" }}>
          FIND YOUR SOUL RIDE
        </h1>
        <div className="search">
          <img src={search} style={{ width: "25px" }} />
          <input
            type="text"
            placeholder="Search Make, Model or keyword"
            style={{ width: "100vw", border: "none" }}
          />
          <Button onClick={applySearch} title={"GO"} primary={true} />
        </div>
      </div>
      <div className="inven">
        <div className="filters">
          <h2 className="mb-2">Advanced Filters</h2>
          <DropDown
            onChange={(v) => setType(v)}
            title="Vehicle Type"
            children={[
              "Sedan",
              "Truck",
              "Coupe",
              "SUV",
              "Hatchback",
              "Minivan",
              "Electric",
            ]}
          />
          <DropDown
            onChange={(v) => setModel(v)}
            style={{ width: "80% !important" }}
            title="Make/Model"
            children={[
              "Honda",
              "Toyota",
              "Nissan",
              "Suzuki",
              "Ford",
              "BMW",
              "Audi",
            ]}
          />
          <h6 className="mt-3">Vehicle Price</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From ($)"
              type="number"
              onChange={(v) => setPrice({ ...price, from: v.target.value })}
            />
            <p className="mx-3">-</p>
            <InputField
              title="To ($)"
              type="number"
              onChange={(v) => setPrice({ ...price, to: v.target.value })}
            />
          </div>
          <h6 className="mt-3">Transmission</h6>
          <div className="w-25 d-flex gap-4">
            <Checkbox
              size="xs"
              label="Automatic"
              onChange={(event) =>
                setTransmission({
                  ...transmission,
                  auto: event.currentTarget.checked,
                })
              }
            />
            <Checkbox
              size="xs"
              label="Manual"
              onChange={(event) =>
                setTransmission({
                  ...transmission,
                  manual: event.currentTarget.checked,
                })
              }
            />
          </div>
          <h6 className="mt-3">Engine Type</h6>
          <div className="w-25 d-flex gap-4">
            <Checkbox
              size="xs"
              label="Fuel"
              onChange={(event) =>
                setEngine({
                  ...engine,
                  fuel: event.currentTarget.checked,
                })
              }
            />
            <Checkbox
              size="xs"
              label="Electric"
              onChange={(event) =>
                setEngine({
                  ...engine,
                  electric: event.currentTarget.checked,
                })
              }
            />
            <Checkbox
              size="xs"
              label="Hybrid"
              onChange={(event) =>
                setEngine({
                  ...engine,
                  hybrid: event.currentTarget.checked,
                })
              }
            />
          </div>
          <h6 className="mt-3">Make</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From"
              type="number"
              onChange={(v) => setModel({ ...model, from: v.target.value })}
            />
            <p className="mx-3">-</p>
            <InputField
              title="To"
              type="number"
              onChange={(v) => setModel({ ...model, to: v.target.value })}
            />
          </div>
          <h6 className="mt-3">Mileage</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From"
              type="number"
              onChange={(v) => setMileage({ ...mileage, from: v.target.value })}
            />
            <p className="mx-3">-</p>
            <InputField
              title="To"
              type="number"
              onChange={(v) => setMileage({ ...mileage, to: v.target.value })}
            />
          </div>
          <h6 className="mt-3">Horsepower</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From"
              type="number"
              onChange={(v) => setHp({ ...hp, from: v.target.value })}
            />
            <p className="mx-3">-</p>
            <InputField
              title="To"
              type="number"
              onChange={(v) => setHp({ ...hp, to: v.target.value })}
            />
          </div>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          >
            <Button
              title="Apply"
              primary={true}
              width="200px"
              onClick={applyFilters}
            />
          </div>
        </div>
        {cars.length > 0 ? (
          <div className="row px-2 d-flex m-auto mt-2">
            {cars.map((obj, key) => {
              return (
                <div className="col mb-4" key={key}>
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
                </div>
              );
            })}
            <Pagination total={Math.ceil(count/9)} position="center" className="mb-2 w-100" onChange={(v)=>setPage(v)}/>
          </div>
        ) : (
          <Loader className="w-100 m-auto" />
        )}
      </div>
    </Page>
  );
};

export default withTranslation()(Inventory);
