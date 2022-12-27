import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../apiCallHelpers/checkToken";
import {
  Grid,
  Paper,
  Title,
  Button,
  TextInput,
  Select,
  LoadingOverlay,
  Center,
  NumberInput,
  Radio,
  Input,
} from "@mantine/core";
import { Modal } from "@mantine/core";

import { ArrowRight, Trash, TrashOff, X } from "tabler-icons-react";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useEffect } from "react";
import { backendURL } from "../apiCallHelpers/backendURL";
import {
  getHeader,
  hardCodedToken,
  swapAdminToken,
} from "../apiCallHelpers/headers";

const axios = require("axios");

const AddOrder = ({ setCurrentLocation }) => {
  setCurrentLocation("Add Order");
  const params = useParams();
  console.log("MY PARAMS: ", params);
  // HOOKS

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [opened, setOpened] = useState(false);

  const [visible, setVisible] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  let navigate = useNavigate();

  const form = useForm({
    // validateInputOnChange: true,
    initialValues: {
      customer: "",
      seller: "",
      vinNumber: "",
      vehiclePrice: 0,
      titleFee: 100,
      registrationFee: 187,
      licenseFee: 0,
      warrantyFeeRadio: "2400",
      leanFee: 20,
      freightFee: 0,
      dealerProcessingFee: 499,
      salesTax: 6,
      inspectionFee: 0,
      dealerFeeRadio: "0",
      totalPrice: 0,
      downPayment: 0,
      remainingPayment: 0,
      installments: 0,
    },

    validate: {
      customer: (value) => {
        if (!value) {
          return "Customer is Required";
        }
      },
      seller: (value) => {
        if (!value) {
          return "Seller is Required";
        }
      },
      vinNumber: (value) => {
        if (!value) {
          return "VIN Number is Required";
        }
      },
      vehiclePrice: (value) =>
        value >= 0 ? null : "Vehicle Price is Required",

      titleFee: (value) => (value >= 0 ? null : "Title Fee is Required"),
      registrationFee: (value) =>
        value >= 0 ? null : "Registration Fee is Required",

      licenseFee: (value) => (value >= 0 ? null : "GAP is Required"),
      warrantyFeeRadio: (value) => (value >= 0 ? null : "Warranty is Required"),

      leanFee: (value) => (value >= 0 ? null : "Lien Fee is Required"),
      freightFee: (value) => (value >= 0 ? null : "Freight Fee is Required"),
      dealerProcessingFee: (value) =>
        value >= 0 ? null : "Freight Fee is Required",
      salesTax: (value) =>
        value >= 0 ? null : "Sales Tax must be greater than 0",
      inspectionFee: (value) =>
        value >= 0 ? null : "Inspection Fee is Required",
      dealerFeeRadio: (value) => {
        if (value === "fixed") {
          if (form.values.dealerFeeRadio <= 0) {
            return "Dealer Fee is Required";
          }
        } else if (value === "percentage") {
          if (
            form.values.dealerFeeRadio <= 0 ||
            form.values.dealerFeeRadio > 100
          ) {
            return "Dealer Fee is Required and should be between 0 and 100";
          }
        }
      },

      totalPrice: (value) =>
        value > 0 ? null : "Total Price is Required greater than 0",
      downPayment: (value) =>
        value >= 0 ? null : "Down Payment is Required greater than 0",
      remainingPayment: (value) =>
        value >= 0 ? null : "Invalid Remaining Amount",
      installments: (value) => (value >= 0 ? null : "Invalid Remaining Amount"),
    },
  });
  const [allCustomers, setAllCustomers] = useState([
    // {
    //   _id: "60a1c1b0b0b5a40015b0b0b0",
    //   name: "Customer 1",
    // },
    // {
    //   _id: "60a1c1b0b0b5a40015b0b0b1",
    //   name: "Customer 2",
    // },
    // {
    //   _id: "60a1c1b0b0b5a40015b0b0b2",
    //   name: "Customer 3",
    // },
  ]);
  console.log("ALL CUSTOMERS: ", allCustomers);
  const [allSellers, setAllSellers] = useState([
    {
      _id: "60a1c1b0b0b5a40015b0b0b4",
      name: "Seller 1",
    },
    {
      _id: "60a1c1b0b0b5a40015b0b0b5",
      name: "Seller 2",
    },
    {
      _id: "60a1c1b0b0b5a40015b0b0b6",
      name: "Seller 3",
    },
  ]);
  console.log("ALL SELLERS: ", allSellers);
  const [allVinNumbers, setAllVinNumbers] = useState([
    {
      _id: "60a1c1b0b0b5a40015b0b0b7",
      name: "CAR 1",
    },
    {
      _id: "60a1c1b0b0b5a40015b0b0b8",
      name: "CAR 2",
    },
    {
      _id: "60a1c1b0b0b5a40015b0b0b9",
      name: "CAR 3",
    },
  ]);
  console.log("ALL VIN NUMBERS: ", allVinNumbers);
  const fetchAllCustomers = async () => {
    const res = await axios({
      method: "get",
      url: `${backendURL}/user/all_customer`,
      headers: getHeader(),
    });
    console.log("RES: ", res.data?.data?.users);

    if (res.data.success) {
      console.log("RES in success: ", res.data?.data?.users);
      let response = res.data?.data;
      setAllCustomers(response?.users);
      // setRefresh(false);
      // setVisible(false);
    } else {
      alert("Error");
      setVisible(false);
    }
  };
  const fetchAllSellers = async () => {
    setVisible(true);
    const res = await axios({
      method: "get",
      url: `${backendURL}/user/all_seller`,
      headers: getHeader(),
    });

    if (res.data.success) {
      let response = res.data?.data;
      setAllSellers(response?.users);
      // setRefresh(false);
      // setVisible(false);
      setVisible(false);
    } else {
      setVisible(false);

      alert("Error");
    }
  };
  const fetchAllVehicles = async () => {
    setVisible(true);

    const res = await axios({
      method: "get",
      url: `${backendURL}/vehicle/available`,
      headers: getHeader(),
    });

    if (res.data.success) {
      let response = res.data?.data;
      setAllVinNumbers(response?.vehicles);
      setFilteredVins(response?.vehicles);
      // setRefresh(false);
      setVisible(false);
    } else {
      setVisible(false);

      alert("Error");
    }
  };

  useEffect(() => {
    fetchAllSellers();
    fetchAllCustomers();
    fetchAllVehicles();
  }, []);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredVins, setFilteredVins] = useState([]);
  const getAllOrders = async () => {
    form.setFieldValue("vinNumber", "");
    form.setFieldValue("seller", "");
    form.setFieldValue("vehiclePrice", null);
    setVisible(true);

    const url = `${backendURL}/order/getOrders`;

    const res = await axios({
      method: "get",
      url: url,
      headers: getHeader(),
    });

    console.log("this is the uodate res", res?.data?.data);
    if (res.data.success) {
      console.log("this is the uodate asdasdsares", res?.data?.data);
      let response = res.data?.data;
      console.log("this is the uodate response", response);
      setAllOrders(response);
      //all vin which is ordered by the customer and status is new
      let ordersOfSelectedCustomer = response?.orders
        ?.filter((order) => order?.customer?._id === form.values.customer)
        ?.filter((order) => order?.status === "new");
      console.log("vinNumbers ye hain", ordersOfSelectedCustomer);

      //filter vinNumber from allVinNumbers
      if (ordersOfSelectedCustomer?.length === 0) {
        setFilteredVins(allVinNumbers);
      } else {
        let filteredVinNumbers = allVinNumbers.filter((vinNumber) => {
          let found = ordersOfSelectedCustomer?.some(
            (vin) => vin?.vinNo === vinNumber?.vin
          );
          if (found) {
            return;
          } else {
            return true;
          }
        });
        // let filteredVinNumbers = allVinNumbers.filter((vehicle) =>
        //   ordersOfSelectedCustomer?.some((vin) => vin?.vinNo !== vehicle?.vin)
        // );
        setFilteredVins(filteredVinNumbers);
        console.log("filteredVinNumbers", filteredVinNumbers);
      }

      console.log("vinNumbers hahaha", filteredVins);

      setVisible(false);
    } else {
      setVisible(false);

      alert("Error");
    }
  };

  useEffect(() => {
    if (!params.orderId) {
      getAllOrders();
    }
  }, [form.values.customer]);

  const getOrderDetails = async () => {
    setVisible(true);

    const url = `${backendURL}/order/getOrder/${params.orderId}`;

    const res = await axios({
      method: "get",
      url: url,
      headers: getHeader(),
    });

    console.log("this is the uodate res", res?.data?.data);
    if (res.data.success) {
      let response = res.data?.data;
      setOrderDetails(response);
      form.setFieldValue("customer", response?.customer);
      form.setFieldValue("seller", response?.sellerId);
      form.setFieldValue("vinNumber", response?.vinNo);
      form.setFieldValue("vehiclePrice", response?.vehiclePrice);
      form.setFieldValue("titleFee", response?.titleFee);
      form.setFieldValue("registrationFee", response?.registrationFee);
      form.setFieldValue("licenseFee", response?.licenseFee);
      form.setFieldValue("warrantyFeeRadio", response?.warrantyFee?.toString());
      form.setFieldValue("leanFee", response?.leanFee);
      form.setFieldValue("freightFee", response?.freightFee);
      form.setFieldValue("dealerProcessingFee", response?.dealerProcessingFee);
      form.setFieldValue("salesTax", response?.salesTax);
      form.setFieldValue("inspectionFee", response?.inspectionFee);
      form.setFieldValue("dealerFeeRadio", response?.dealerFee?.toString());
      form.setFieldValue("totalPrice", response?.totalPrice);
      form.setFieldValue("downPayment", response?.downPayment);
      form.setFieldValue("remainingPayment", response?.remainingPayment);
      form.setFieldValue("installments", response?.installments);
      setVisible(false);

      // setRefresh(false);
      // setVisible(false);
    } else {
      setVisible(false);

      alert("Error");
    }
  };
  useEffect(() => {
    console.log("use effect");
    if (params.orderId && params.orderId !== "undefined") {
      getOrderDetails();
    } else {
      console.log("inside else");
    }
  }, [params.orderId]);
  const handleSubmit = async (event) => {
    console.log("this is event", event);
    setVisible(true);
    // setLoading(true);
    console.log("inside body");
    var {
      customer,
      seller,
      vinNumber,
      vehiclePrice,
      titleFee,
      registrationFee,
      licenseFee,
      warrantyFeeRadio,
      leanFee,
      freightFee,
      dealerProcessingFee,
      salesTax,
      inspectionFee,
      dealerFeeRadio,
      totalPrice,
      downPayment,
      remainingPayment,
      installments
    } = event;
    const body = {
      vehicleId: selectedVehicleId,
      vinNo: vinNumber,
      customer: customer,
      sellerId: seller,
      titleFee: titleFee,
      registrationFee: registrationFee,
      licenseFee: licenseFee,
      warrantyFee: warrantyFeeRadio,
      vehiclePrice: vehiclePrice,
      leanFee: leanFee,
      freightFee: freightFee,
      dealerProcessingFee: dealerProcessingFee,
      salesTax: salesTax,
      inspectionFee: inspectionFee,
      dealerFee: dealerFeeRadio,
      totalPrice: totalPrice,
      downPayment: downPayment,
      remainingPayment: remainingPayment,
      installments
    };
    // for (let key in body) {
    //   if (typeof body[key] == "string") {
    //     body[key] = body[key].trim();
    //   }
    // }
    console.log("body", body);

    console.log(event);

    let url;
    if (params.orderId) {
      url = `${backendURL}/order/${params.orderId}`;
    } else {
      url = `${backendURL}/order/add`;
    }
    try {
      console.log("PUT OR POST", params.orderId ? "put" : "post");
      const response = await axios({
        method: params.orderId ? "put" : "post",
        url: url,
        data: body,
        headers: getHeader(),
      });
      setLoading(false);
      console.log("hiii", response.data);
      if (!response.data.success) {
        showNotification({
          title: `ERROR`,
          color: "red",
          icon: <IconX size={18} />,
          message: `${response.data}`,
        });
        setVisible(false);
      } else {
        console.log("success", response.data);
        showNotification({
          title: `SUCCESS`,
          color: "green",
          message: `ORDER PLACED SUCCESSFULLY!!`,
        });
        setVisible(false);
        navigate("/user/viewOrder");
      }
    } catch (err) {
      showNotification({
        title: `Error`,
        color: "red",
        message: `${err.response.data.data}`,
      });
      setVisible(false);

      console.log(err);
    }
    setVisible(false);
  };
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  console.log("selectedVehicleId", selectedVehicleId);
  useEffect(() => {
    //set id of vehicle of selected vin
    if (form.values.vinNumber) {
      let vehicleId = allVinNumbers.find(
        (item) => item.vin === form.values.vinNumber
      );
      setSelectedVehicleId(vehicleId?._id);
    }
  }, [form.values.vinNumber]);

  const customerData = allCustomers?.map((item) => ({
    ...item,
    value: item._id ? item._id : "123456798",
    label: item.name ? item.name : "test",
  }));
  const sellerData = allSellers?.map((item) => ({
    ...item,
    value: item._id ? item._id : "123456798",
    label: item.name ? item.name : "test",
  }));
  const VinNumberData = filteredVins?.map((item) => ({
    ...item,
    value: item.vin ? item.vin : "123456798",
    label: item.vin ? item.vin : "test",
  }));
  useEffect(() => {
    if (form.values.vinNumber) {
      let priceOfVehicle = allVinNumbers.find(
        (item) => item.vin === form.values.vinNumber
      )?.price;
      form.setFieldValue("vehiclePrice", priceOfVehicle ? priceOfVehicle : 0);
    }
  }, [form.values.vinNumber]);
  console.log("dealer fees is", form.values.dealerFeeRadio);
  useEffect(() => {
    //set value of salesTax 6% of vehicle price
    if (!params.orderId) {
      form.setFieldValue(
        "salesTax",
        parseInt(form.values.vehiclePrice || 0) * 0.06
      );
    }
  }, [form.values.vehiclePrice]);
  useEffect(() => {
    //set value of salesTax 6% of vehicle price
    if (!params.orderId) {
      form.setFieldValue("downPayment", form.values.totalPrice * 0.2);
    }
  }, [form.values.totalPrice]);
  useEffect(() => {
    //calculate total price from all form values
    let finalPrice =
      parseInt(form.values.vehiclePrice || 0) +
      parseInt(form.values.titleFee || 0) +
      parseInt(form.values.registrationFee || 0) +
      parseInt(form.values.licenseFee || 0) +
      parseInt(form.values.warrantyFeeRadio) +
      parseInt(form.values.leanFee || 0) +
      parseInt(form.values.freightFee || 0) +
      parseInt(form.values.dealerProcessingFee || 0) +
      parseInt(form.values.salesTax || 0) +
      (parseInt(form.values.dealerFeeRadio) === 300
        ? 300
        : parseFloat(form.values.dealerFeeRadio) *
          parseInt(form.values.vehiclePrice));

    form.setFieldValue(
      "totalPrice",
      finalPrice || 0

      // parseInt(form.values.dealerFee)
    );
    //set 20% value of total price as down payment

    console.log("total price is", form.values.totalPrice);
  }, [
    form.values.vehiclePrice,
    form.values.titleFee,
    form.values.registrationFee,
    form.values.licenseFee,
    form.values.warrantyFeeRadio,
    form.values.leanFee,
    form.values.freightFee,
    form.values.dealerProcessingFee,
    form.values.salesTax,
    form.values.inspectionFee,
    form.values.dealerFeeRadio,
  ]);
  useEffect(() => {
    //calculate total price from all form values
    let remainingPrice = form.values.totalPrice - form.values.downPayment;

    form.setFieldValue("remainingPayment", remainingPrice);
    let installments = remainingPrice/72;
    form.setFieldValue("installments", installments);
  }, [form.values.downPayment, form.values.totalPrice]);
  useEffect(() => {
    let sellerId = allVinNumbers.find(
      (item) => item.vin === form.values.vinNumber
    )?.addedBy;
    console.log("seller id is", sellerId);

    form.setFieldValue("seller", sellerId);
  }, [form.values.vinNumber]);

  return (
    <Paper
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Center>
        <Paper
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <LoadingOverlay
            visible={visible}
            loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
            overlayOpacity={0.5}
            overlayColor="#c5c5c5"
            zIndex={1}
          />
          <Modal
            styles={{
              close: {
                color: "black",
                backgroundColor: "#EAEAEA",
                borderRadius: "50%",
                "&:hover": {
                  transition: "50ms",
                  color: "white",
                  backgroundColor: "red",
                },
              },
            }}
            opened={opened}
            transition="rotate-left"
            transitionDuration={600}
            size={600}
            transitionTimingFunction="ease"
            onClose={() => setOpened(false)}
          >
            <Title align="center" order={3}>
              Are You Sure Yo Want To Cancel?
            </Title>
            <Grid my={"md"} align="center" justify="space-around">
              <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
                <Button
                  align="center"
                  color="light"
                  leftIcon={<TrashOff size={14} />}
                  onClick={() => setOpened(false)}
                >
                  No, Don't Cancel
                </Button>
              </Grid.Col>
              <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
                <Button
                  align="center"
                  color="red"
                  leftIcon={<Trash size={14} />}
                  onClick={() => navigate("/user/viewOrder")}
                >
                  Yes, Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Modal>
          <Title order={1} align="center">
            {params.orderId ? "Edit Order Details" : "New Order Details"}
          </Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid justify="space-around">
              <Grid.Col md={12}>
                <Select
                  label="Customer"
                  disabled={params.orderId ? true : false}
                  searchable
                  required
                  size="md"
                  placeholder="Select Customer"
                  data={customerData}
                  {...form.getInputProps("customer")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <Select
                  label="VIN Number"
                  disabled={
                    !form.values.customer || params.orderId ? true : false
                  }
                  searchable
                  required
                  size="md"
                  placeholder="Select VIN Number"
                  data={VinNumberData}
                  {...form.getInputProps("vinNumber")}
                />
              </Grid.Col>

              <Grid.Col md={6} lg={6}>
                <Select
                  disabled
                  label="Seller"
                  searchable
                  required
                  size="md"
                  placeholder="Select VIN to Set Seller"
                  data={sellerData}
                  {...form.getInputProps("seller")}
                />
              </Grid.Col>

              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  placeholder="Select VIN to for Vehicle Price"
                  disabled
                  required
                  min={0}
                  hideControls
                  label="Vehicle Price (Seller's Demand)"
                  {...form.getInputProps("vehiclePrice")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  placeholder="Enter Sales Tax"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Sales Tax (Default 6%)"
                  {...form.getInputProps("salesTax")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  placeholder="Enter Amount Financed"
                  required
                  min={0}
                  hideControls
                  label="Amount Financed (From Bank)"
                  {...form.getInputProps("inspectionFee")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Title Fee"
                  placeholder="Enter Title Fee"
                  {...form.getInputProps("titleFee")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Lien Fee"
                  placeholder="Enter Lien Fee"
                  {...form.getInputProps("leanFee")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Registration Fee"
                  placeholder="Enter Registration Fee"
                  {...form.getInputProps("registrationFee")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="GAP"
                  placeholder="Enter GAP"
                  {...form.getInputProps("licenseFee")}
                />
              </Grid.Col>

              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Freight Fee"
                  placeholder="Enter Freight Free"
                  {...form.getInputProps("freightFee")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={12}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Dealer Processing Fee"
                  placeholder="Enter Dealer Processing Free"
                  {...form.getInputProps("dealerProcessingFee")}
                />
              </Grid.Col>

              <Grid.Col md={6}>
                <Input.Wrapper
                  name="Warranty"
                  label="Select Warranty"
                  required
                  size="md"
                >
                  <Radio.Group {...form.getInputProps("warrantyFeeRadio")}>
                    <Radio value="2400" label="A ($2400)" />
                    <Radio value="3400" label="B ($3400)" />
                    <Radio value="4000" label="C ($4000)" />
                  </Radio.Group>
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  placeholder="Enter Warranty"
                  value={
                    form.values.warrantyFeeRadio === "2400"
                      ? 2400
                      : form.values.warrantyFeeRadio === "3400"
                      ? 3400
                      : 4000
                  }
                  hideControls
                  label="Warranty"
                  disabled
                  // {...form.getInputProps("dealerFee")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <Input.Wrapper
                  name="Dealer Center Fee"
                  label="Select Dealer Center Fee"
                  required
                  size="md"
                >
                  <Radio.Group {...form.getInputProps("dealerFeeRadio")}>
                    <Radio value="0" label="A (0%)" />
                    <Radio value="300" label="B ($300)" />
                    <Radio value="0.03" label="C (3%)" />
                  </Radio.Group>
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  placeholder="Enter Dealer Fee"
                  value={
                    form.values.dealerFeeRadio === "0.03"
                      ? form.values.vehiclePrice * 0.03
                      : form.values.dealerFeeRadio === "300"
                      ? 300
                      : 0
                  }
                  hideControls
                  label="Dealer Fee"
                  disabled
                  // {...form.getInputProps("dealerFee")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={12}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  placeholder="Enter Total Price"
                  required
                  // value={form.values.totalPrice}
                  min={0}
                  hideControls
                  label="Total Price"
                  description="Total Price = Vehicle Price + Sales Tax + Title Fee + Lien Fee + Registration Fee + GAP + Freight Fee + Warranty + Dealer Processing Fee+ Dealer Center Fee"
                  {...form.getInputProps("totalPrice")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  disabled={form.values.vinNumber ? false : true}
                  required
                  min={0}
                  hideControls
                  label="Down Payment"
                  placeholder="Enter Down Payment"
                  {...form.getInputProps("downPayment")}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <NumberInput
                  size="md"
                  required
                  min={0}
                  hideControls
                  disabled
                  label="Remaining Payment"
                  placeholder="Remaining Payment"
                  {...form.getInputProps("remainingPayment")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={12}>
                <NumberInput
                  size="md"
                  required
                  min={0}
                  hideControls
                  disabled
                  label="Monthly Installments"
                  placeholder="Installments"
                  {...form.getInputProps("installments")}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col sm={6} xs={6} md={6} lg={3}>
                <Button
                  size="md"
                  fullWidth
                  variant="filled"
                  color="red"
                  disabled={loading}
                  rightIcon={<X />}
                  onClick={() => setOpened(true)}
                >
                  CANCEL
                </Button>
              </Grid.Col>
              <Grid.Col sm={6} xs={6} md={6} lg={3}>
                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  variant="filled"
                  color="dark"
                  disabled={disabled}
                  loading={loading}
                  rightIcon={<ArrowRight />}
                  uppercase
                >
                  {params.orderId ? "update" : "create"}
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
};

export default AddOrder;
