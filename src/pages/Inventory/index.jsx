import React, { useCallback, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Button from "../../components/Button";
import Page from "../../components/Page";
import searchh from "../../assets/search.svg";
import { Pagination } from "@mantine/core";
import "./styles.scss";
import InputField from "../../components/InputField";
import DropDown from "../../components/DropDown";
import { Checkbox, Loader } from "@mantine/core";
import InventoryCard from "../../components/InventoryCard";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL } from "../../AGMDCCOMPONENTS/apiCallHelpers/backendURL";

const Inventory = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [type, setType] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [cars, setCars] = useState({});
  const [year, setyear] = useState({ from: undefined, to: undefined });
  const [price, setPrice] = useState({ from: undefined, to: undefined });
  const [transmission, setTransmission] = useState([]);
  const [mileage, setMileage] = useState({ from: undefined, to: undefined });
  // const [hp, setHp] = useState({ from: undefined, to: undefined });
  const [engine, setEngine] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (params.filter) {
      const options = {
        method: "GET",
      };

      fetch(
        `${backendURL}/vehicle/allvehicles?limit=9&page=${page}&vehicleType=${params.filter.toLocaleLowerCase()}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setCars((cars) => response.data.vehicles);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } else if (params.search) {
      const options = {
        method: "GET",
      };

      fetch(
        `${backendURL}/vehicle/allvehicles?limit=9&page=${page}&search=${params.search.toLocaleLowerCase()}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setCars((cars) => response.data.vehicles);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } else {
      const options = {
        method: "GET",
      };

      fetch(`${backendURL}/vehicle/allvehicles?limit=9&page=${page}`, options)
        .then((response) => response.json())
        .then((response) => {
          setCars((cars) => response.data.vehicles);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [page]);

  //for pagination
  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(`${backendURL}/vehicle/allvehicles`, options)
      .then((response) => response.json())
      .then((response) => {
        setCount((count) => response.data.count);
      })
      .catch((err) => console.error(err));
  }, []);

  //apply filters
  const applyFilters = () => {
    setLoading(true);
    let url = `${backendURL}/vehicle/allvehicles?limit=9&page=1`;
    if (type) url = url + "&vehicleType=" + type.toLocaleLowerCase();
    if (search) url = url + "&search=" + search.toLocaleLowerCase();
    if (make) url = url + "&make=" + make.toLocaleLowerCase();
    if (model) url = url + "&model=" + model.toLocaleLowerCase();
    if (transmission.length > 0)
      url = url + "&transmission=" + transmission.toString();
    if (engine.length > 0) url = url + "&fuelType=" + engine.toString();
    if (price.from) url = url + "&minPrice=" + price.from;
    if (price.to) url = url + "&maxPrice=" + price.to;
    if (year.from) url = url + "&minYear=" + year.from;
    if (year.to) url = url + "&maxYear=" + year.to;
    if (mileage.from) url = url + "&minMileage=" + mileage.from;
    if (mileage.to) url = url + "&maxMileage=" + mileage.to;
    const options = {
      method: "GET",
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setCars((cars) => response.data.vehicles);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  //search
  const applySearch = () => {
    setLoading(true);
    let url = "";
    if (search.length > 0)
      url = `${backendURL}/vehicle/allvehicles?limit=9&page=1&search=${search}`;
    else url = `${backendURL}/vehicle/allvehicles?limit=9&page=1`;
    const options = {
      method: "GET",
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setCars((cars) => response.data.vehicles);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  //Clear Filters

  const clearFilters = () => {
    navigate("/inventory");
    window.location.reload();
  };

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
          <img src={searchh} style={{ width: "25px" }} />
          <input
            type="text"
            placeholder="Search Make, Model or keyword"
            onChange={(v) => setSearch(v.target.value)}
            style={{ width: "100vw", border: "none" }}
            className="in"
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
          <h6 className="mt-3">Make</h6>
          <InputField
            title="Make"
            type="text"
            onChange={(v) => setMake(v.target.value)}
          />
          <h6 className="mt-3">Model</h6>
          <InputField
            title="Make"
            type="text"
            onChange={(v) => setModel(v.target.value)}
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
          <div>
            <Checkbox.Group
              className="d-flex"
              value={transmission}
              size="xs"
              onChange={setTransmission}
            >
              <Checkbox value="automatic" label="Automatic" />
              <Checkbox value="manual" label="Manual" />
            </Checkbox.Group>
          </div>
          <h6 className="mt-3">Fuel Type</h6>
          <div className="d-flex gap-4">
            <Checkbox.Group
              className="d-flex"
              value={engine}
              size="xs"
              onChange={setEngine}
            >
              <Checkbox value="petrol" label="Petrol" />
              <Checkbox value="diesel" label="Diesel" />
              <Checkbox value="gasoline" label="Gasoline" />
              <Checkbox value="electric" label="Electric" />
              <Checkbox value="hybrid" label="Hybrid" />
            </Checkbox.Group>
          </div>
          <h6 className="mt-3">Year</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From"
              type="number"
              onChange={(v) => setyear({ ...year, from: v.target.value })}
            />
            <p className="mx-3 my-0">-</p>
            <InputField
              title="To"
              type="number"
              onChange={(v) => setyear({ ...year, to: v.target.value })}
            />
          </div>
          <h6 className="mt-3 ">Mileage</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From"
              type="number"
              onChange={(v) => setMileage({ ...mileage, from: v.target.value })}
            />
            <p className="mx-3 my-0">-</p>
            <InputField
              title="To"
              type="number"
              onChange={(v) => setMileage({ ...mileage, to: v.target.value })}
            />
          </div>
          {/* <h6 className="mt-3">Horsepower</h6>
          <div className="d-flex align-items-center">
            <InputField
              title="From"
              type="number"
              onChange={(v) => setHp({ ...hp, from: v.target.value })}
            />
            <p className="mx-3 my-0">-</p>
            <InputField
              title="To"
              type="number"
              onChange={(v) => setHp({ ...hp, to: v.target.value })}
            />
          </div> */}
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              title="Apply"
              primary={true}
              width="100px"
              onClick={applyFilters}
            />
            <Button title="Clear" width="100px" onClick={clearFilters} />
          </div>
        </div>
        <div className="row w-100 d-flex m-auto mt-2">
          {loading && <Loader className="w-100 m-auto" />}
          {cars.length > 0
            ? cars.map((obj, key) => {
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
              })
            : !loading && (
                <h2
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: "100vh",
                    color: "rgb(0,0,0,0.6)",
                  }}
                >
                  No Data Found
                </h2>
              )}
          <Pagination
            total={Math.ceil(count / 9)}
            position="center"
            className="mb-2 w-100"
            onChange={(v) => setPage(v)}
          />
        </div>
      </div>
    </Page>
  );
};

export default withTranslation()(Inventory);
