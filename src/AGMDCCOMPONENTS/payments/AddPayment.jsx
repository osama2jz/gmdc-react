import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import {
  Button,
  Center,
  Grid,
  LoadingOverlay,
  Modal,
  Paper,
  SegmentedControl,
  Select,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { axiosGet, axiosPost } from "../apiCallHelpers/axiosCall";
import { ArrowLeft, ArrowRight, Trash, TrashOff, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);

export default function AddPayment() {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [selectedOrder, setSelectedOrder] = useState("");

  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [userType, setUserType] = useState("seller");
  const [clientSecret, setClientSecret] = useState("");
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(true);

  const [customerOrders, setCustomerOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);

  const [buttonLoader, setButtonLoader] = useState(false);
  useEffect(() => {
    console.count("COUNT");
    setSelectedOrder("");
  }, [userType]);

  const getDataFromApis = async () => {
    try {
      const [orders] = await Promise.all([axiosGet("/order/getOrders")]);
      console.log("ORDERS", orders);

      setOrders(orders.data.data.orders);

      let customerOrders = orders.data.data.orders.filter((order) => {
        if (order.status === "new") {
          return true;
        } else return false;
      });

      let customersOrders = customerOrders.map((order) => ({
        value: order._id,
        vehiclePrice: order.downPayment,
        label: order.vinNo,
      }));

      let sellerOrders = orders.data.data.orders.filter((order) => {
        if (order.status === "dp_paid") {
          return true;
        } else return false;
      });

      let sellersOrders = sellerOrders.map((order) => ({
        value: order?._id,
        vehiclePrice: order?.vehiclePrice,
        label: order?.vinNo,
      }));

      setCustomerOrders(customersOrders);
      setSellerOrders(sellersOrders);

      setVisible(false);
    } catch (e) {
      console.log("ERROR: ", e);
      setVisible(false);
      showNotification({
        title: "Error",
        message: "Error in fetching data",
        color: "red",
      });
    }
    setVisible(false);
  };

  useEffect(() => {
    getDataFromApis();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Paper
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <LoadingOverlay
        visible={visible}
        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
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
              onClick={() => navigate("/user/viewPayments")}
            >
              Yes, Cancel
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
      <Center>
        <Paper
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={1} align="center">
            {/*params.orderId ? "Edit Order Details" : "New Order Details" */}
            Add Payment
          </Title>

          <Stepper
            style={{ flexDirection: "row" }}
            orientation="horizontal"
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            allowStepClick={false}
          >
            <Stepper.Step
              label="Order"
              description="Select an order"
              allowStepSelect={active > 0}
            >
              <SegmentedControl
                value={userType}
                my={"xs"}
                color={"blue"}
                size="lg"
                data={[
                  { value: "seller", label: "Seller" },
                  { value: "customer", label: "Customer" },
                ]}
                onChange={setUserType}
              />
              {userType === "seller" ? (
                <Grid>
                  <Grid.Col>
                    <Select
                      label="Select VIN #"
                      disabled={sellerOrders.length > 0 ? false : true}
                      placeholder={
                        sellerOrders.length > 0
                          ? "Select a vehicle VIN"
                          : "No orders available"
                      }
                      searchable
                      value={selectedOrder}
                      onChange={(selectedOrder) => {
                        console.log("SELECTED ORDER", selectedOrder);
                        console.log("Calling intent");
                        setClientSecret("");
                        setSelectedOrder(selectedOrder);
                        console.log("Calling intent");
                        setSelectedOrderDetails(
                          orders.filter((order) => {
                            if (order._id === selectedOrder) {
                              return true;
                            } else {
                              return false;
                            }
                          })
                        );
                      }}
                      my={"xs"}
                      size="md"
                      data={sellerOrders}
                      required
                    />
                  </Grid.Col>
                </Grid>
              ) : (
                <Grid>
                  <Grid.Col>
                    <Select
                      disabled={customerOrders.length > 0 ? false : true}
                      label="Select VIN #"
                      placeholder={
                        customerOrders.length > 0
                          ? "Select a vehicle VIN"
                          : "No orders available"
                      }
                      searchable
                      value={selectedOrder}
                      onChange={(selectedOrder) => {
                        console.log("SELECTED ORDER", selectedOrder);
                        console.log("Calling intent");
                        setClientSecret("");
                        setSelectedOrder(selectedOrder);

                        setSelectedOrderDetails(
                          orders.filter((order) => {
                            if (order._id === selectedOrder) {
                              return true;
                            } else {
                              return false;
                            }
                          })
                        );
                        console.log("Calling intent");
                      }}
                      my={"xs"}
                      size="md"
                      data={customerOrders}
                      required
                    />
                  </Grid.Col>
                </Grid>
              )}

              {selectedOrder !== "" && (
                <Grid
                  style={{ border: "1px solid #e6e6e6" }}
                  justify={"flex-end"}
                >
                  <Grid.Col
                    style={{ border: "1px solid #e6e6e6" }}
                    xs={12}
                    sm={4}
                    lg={4}
                  >
                    <Text size={"lg"}>
                      <b>Down Payment:</b>{" "}
                      {selectedOrderDetails[0]?.downPayment.toLocaleString()}
                    </Text>
                  </Grid.Col>
                  <Grid.Col
                    style={{ border: "1px solid #e6e6e6" }}
                    xs={12}
                    sm={4}
                    lg={4}
                  >
                    <Text size={"lg"}>
                      <b>Vehicle Price:</b>{" "}
                      {selectedOrderDetails[0]?.vehiclePrice.toLocaleString()}
                    </Text>
                  </Grid.Col>
                  <Grid.Col
                    style={{ border: "1px solid #e6e6e6" }}
                    xs={12}
                    sm={4}
                    lg={4}
                  >
                    <Text size={"lg"}>
                      <b>Total Price:</b>{" "}
                      {selectedOrderDetails[0]?.totalPrice.toLocaleString()}
                    </Text>
                  </Grid.Col>
                </Grid>
              )}

              <Grid justify={"flex-end"} my={"md"}>
                <Grid.Col xs={12} sm={6} md={4} lg={3}>
                  <Button
                    disabled={buttonLoader ? true : false}
                    leftIcon={<X />}
                    color={"red"}
                    size={"md"}
                    fullWidth
                    onClick={() => setOpened(true)}
                  >
                    Cancel
                  </Button>
                </Grid.Col>

                <Grid.Col xs={12} sm={6} md={4} lg={3}>
                  <Button
                    loading={buttonLoader}
                    rightIcon={<ArrowRight />}
                    color={"dark"}
                    disabled={selectedOrder === "" ? true : false}
                    size={"md"}
                    fullWidth
                    onClick={async () => {
                      console.log("SELECTED ORDER", selectedOrder);
                      setButtonLoader(true);
                      try {
                        let apiResponse = await axiosPost(
                          "/payment/payment-intent",
                          {
                            orderId: selectedOrder,
                          }
                        );
                        console.log("API RESPONSE", apiResponse);
                        if (apiResponse === null) {
                          showNotification({
                            title: "Already paid",
                            message: "This order has already been paid",
                            color: "yellow",
                          });
                          setButtonLoader(false);
                        } else {
                          setClientSecret(apiResponse.data.data.client_secret);
                          nextStep();
                          setButtonLoader(false);
                        }
                      } catch (e) {
                        console.log("error");
                        setButtonLoader(false);
                      }
                      setButtonLoader(false);
                    }}
                  >
                    Next step
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>
            <Stepper.Step
              label="Pay"
              description="Verify email"
              allowStepSelect={active > 1}
            >
              <Paper withBorder p={"md"}>
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                      selectedOrder={orders.filter((order) => {
                        if (order._id === selectedOrder) {
                          return true;
                        } else return false;
                      })}
                    />
                  </Elements>
                )}
              </Paper>

              <Grid justify={"flex-end"} my={"md"}>
                <Grid.Col xs={12} sm={6} md={4} lg={3}>
                  <Button
                    leftIcon={<ArrowLeft />}
                    color={"red"}
                    size={"md"}
                    fullWidth
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>
          </Stepper>
        </Paper>
      </Center>
    </Paper>
  );
}
