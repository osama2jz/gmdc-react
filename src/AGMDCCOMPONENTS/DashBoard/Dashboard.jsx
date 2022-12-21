import React, { useEffect, useState } from "react";
import { Grid, Group, LoadingOverlay, Paper, Text, Title } from "@mantine/core";

import { StatsCard } from "./StatsCard";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { axiosGet } from "../apiCallHelpers/axiosCall";
import { userType } from "../apiCallHelpers/userDataHelper";
const Dashboard = () => {
  // setCurrentLocation("Dashboard");
  const [getTotalActiveUsersCount, setTotalActiveUsersCount] = useState(0);
  const [getTotalBlockedUsersCount, setTotalBlockedUsersCount] = useState(0);
  const [getCustomerCount, setCustomerCount] = useState(0);
  const [getSellerCount, setSellerCount] = useState(0);
  // LOADING OVERLAY
  const [visible, setVisible] = useState(false);
  // USERS STATS DATA
  const [getAllUsersCount, setAllUsersCount] = useState(0);
  const [getTotalSoldCarsCount, setTotalSoldCarsCount] = useState(0);
  const [getTotalDpPaidCarsCount, setTotalDpPaidCarsCount] = useState(0);
  const [getTotalProcessedCarsCount, setTotalProcessedCarsCount] = useState(0);
  const [getTotalAvailableCarsCount, setTotalAvailableCarsCount] = useState(0);
  const [getTotalDeliveredCarsCount, setTotalDeliveredCarsCount] = useState(0);
  const [getTotalVehicleCount, setTotalVehicleCount] = useState(0);

  const [getTotalOrders, setTotalOrders] = useState(0);

  const [getTotalNewOrdersCount, setTotalNewOrdersCount] = useState(0);
  const [getTotalDPOrdersCount, setTotalDPOrdersCount] = useState(0);
  const [getTotalProcessedOrdersCount, setTotalProcessedOrdersCount] =
    useState(0);
  const [getTotalCompletedOrdersCount, setTotalCompletedOrdersCount] =
    useState(0);
  const [getTotalPayments, setTotalPayments] = useState(0);

  const [getTotalPaymentsToSeller, setTotalPaymentsToSeller] = useState(0);
  const [getTotalSellersPayments, setTotalSellersPayments] = useState(0);
  const [getSellersTotalOrdersCount, setSellersTotalOrdersCount] = useState(0);
  const [getTotalPaymentFromCustomer, setTotalPaymentFromCustomer] =
    useState(0);
  const [getTotalRemainingPayments, setTotalRemainingPayments] = useState(0);
  const [getTotalDPRecievedPayments, setTotalDPRecievedPayments] = useState(0);
  const [getTotalCustomerPaidPayments, setTotalCustomerPaidPayments] =
    useState(0);
  const [getTotalCustomerRemainingPayments, setTotalCustomerRemainingPayments] =
    useState(0);
  const [allDashboardStats, setAllDashboardStats] = useState();
  const [refresh, setRefresh] = useState(true);
  console.log("allDashboardStats", allDashboardStats);

  const fetchDashboardStats = async () => {
    // setVisible(true);
    try {
      const dashboardStats = await // USERS
      axiosGet("api/v1/user/stats");
      setAllDashboardStats(dashboardStats.data.data);
      setAllUsersCount(
        allDashboardStats?.activeUsers + allDashboardStats?.blockedUsers || 0
      );
      setSellerCount(allDashboardStats?.sellers || 0);
      setCustomerCount(allDashboardStats?.customers || 0);
      setTotalActiveUsersCount(allDashboardStats?.activeUsers || 0);
      setTotalBlockedUsersCount(allDashboardStats?.blockedUsers || 0);
      // VEHICLES
      setTotalVehicleCount(allDashboardStats?.vehicles || 0);
      setTotalSoldCarsCount(allDashboardStats?.soldVehicles || 0);
      setTotalDpPaidCarsCount(allDashboardStats?.dpVehicles || 0);
      setTotalProcessedCarsCount(allDashboardStats?.processedVehicles || 0);
      setTotalAvailableCarsCount(allDashboardStats?.availableVehicles || 0);
      setTotalDeliveredCarsCount(allDashboardStats?.deliveredVehicles || 0);
      // ORDERS
      setTotalOrders(allDashboardStats?.totalOrders || 0);
      setTotalNewOrdersCount(allDashboardStats?.newOrders || 0);
      setTotalDPOrdersCount(allDashboardStats?.dpPaidOrders || 0);
      setTotalProcessedOrdersCount(allDashboardStats?.processedOrders || 0);
      setTotalCompletedOrdersCount(allDashboardStats?.completedOrders || 0);
      // PAYMENTS
      setTotalPayments(allDashboardStats?.totalPayments || 0);
      setTotalPaymentsToSeller(allDashboardStats?.totalSellerPaymentsDue || 0);
      setSellersTotalOrdersCount(
        allDashboardStats?.newOrders + allDashboardStats?.processedOrders || 0
      );
      setTotalCustomerPaidPayments(allDashboardStats?.totalDpPaid || 0);
      setTotalDPRecievedPayments(allDashboardStats?.totalPaidPayments || 0);
      setTotalPaymentFromCustomer(allDashboardStats?.dpReceivedPayments || 0);
      setTotalSellersPayments(allDashboardStats?.totalPayments || 0);
      setTotalRemainingPayments(allDashboardStats?.remainingPaymentsTotal || 0);
      setTotalCustomerRemainingPayments(
        allDashboardStats?.remainingPayments || 0
      );
      // setVisible(false);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  const dataUsersPie = [
    {
      value: getCustomerCount,
      title: "Total Customers",
      icon: "user",
    },
    {
      value: getSellerCount,
      title: "Total Sellers",
      icon: "user",
    },
    {
      value: getAllUsersCount - getSellerCount - getCustomerCount,
      title: "Total Admins",
      icon: "user",
    },
  ];

  const vehiclesDataPie = [
    {
      value: getTotalSoldCarsCount,
      title: "Total Sold Vehicles",
      icon: "receipt",
    },
    {
      value: getTotalVehicleCount - getTotalSoldCarsCount,
      title: "Total Available Vehicles",
      icon: "receipt",
    },
  ];

  const sellersOrdersDataPie = [
    {
      value: getTotalProcessedOrdersCount,
      title: "Total Processed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total Completed Orders",
      icon: "bookingCancelled",
    },
  ];
  const ordersDataPie = [
    {
      value: getTotalDPOrdersCount,
      title: "Total Orders DP Received ",
      icon: "bookingCancelled",
    },
    {
      value: getTotalProcessedOrdersCount,
      title: "Total Processed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total Completed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalNewOrdersCount,
      title: "Total New Orders",
      icon: "bookingCancelled",
    },
  ];

  const paymentsDataPie = [
    {
      value: getTotalPaymentsToSeller,
      title: "Due Payments To Seller",
      icon: "bookingCancelled",
    },
    {
      value: getTotalPaymentFromCustomer,
      title: "Payments From Customer",
      icon: "bookingCancelled",
    },
    {
      value: getTotalDPRecievedPayments,
      title: "DP Received",
      icon: "bookingCancelled",
    },
    {
      value: getTotalRemainingPayments,
      title: "Total Remaining Payments",
      icon: "bookingCancelled",
    },
  ];

  const dataUsers = [
    {
      value: getAllUsersCount,
      title: "Total Users",
      icon: "user",
    },

    {
      value: getCustomerCount,
      title: "Total Customers",
      icon: "user",
    },
    {
      value: getSellerCount,
      title: "Total Sellers",
      icon: "user",
    },
    {
      value: getAllUsersCount - getSellerCount - getCustomerCount,
      title: "Total Admins",
      icon: "user",
    },
    {
      value: getTotalActiveUsersCount,
      title: "Active Users",
      icon: "user",
    },
  ];

  const sellersVehiclesData = [
    {
      value: getTotalVehicleCount,
      title: "Total Vehicles",
      icon: "receipt",
    },
    {
      value: getTotalProcessedCarsCount,
      title: "Total Vehicles Processed",
      icon: "receipt",
    },
    {
      value: getTotalDeliveredCarsCount,
      title: "Total Vehicles Delivered",
      icon: "receipt",
    },

    {
      value: getTotalVehicleCount - getTotalSoldCarsCount,
      title: "Total Available Vehicles",
      icon: "receipt",
    },
  ];
  const vehiclesData = [
    {
      value: getTotalVehicleCount,
      title: "Total Vehicles",
      icon: "receipt",
    },
    {
      value: getTotalDpPaidCarsCount,
      title: "Total Vehicles DP Received",
      icon: "receipt",
    },
    {
      value: getTotalProcessedCarsCount,
      title: "Total Vehicles Processed",
      icon: "receipt",
    },
    {
      value: getTotalDeliveredCarsCount,
      title: "Total Vehicles Delivered",
      icon: "receipt",
    },

    {
      value: getTotalVehicleCount - getTotalSoldCarsCount,
      title: "Total Available Vehicles",
      icon: "receipt",
    },
  ];

  const ordersData = [
    {
      value: getTotalOrders,
      title: "Total Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalDPOrdersCount,
      title: "Total Orders DP Received ",
      icon: "bookingCancelled",
    },
    {
      value: getTotalProcessedOrdersCount,
      title: "Total Processed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total Completed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalNewOrdersCount,
      title: "Total New Orders",
      icon: "bookingCancelled",
    },
  ];

  const paymentsData = [
    {
      value: `$ ${getTotalPayments}`,
      title: "Total Payments",
      icon: "bookingCancelled",
    },
    {
      value: `$ ${getTotalPaymentsToSeller}`,
      title: "Due Payments To Seller",
      icon: "bookingCancelled",
    },
    {
      value: `$ ${getTotalPaymentFromCustomer}`,
      title: "Payments From Customer",
      icon: "bookingCancelled",
    },
    {
      value: `$ ${getTotalDPRecievedPayments}`,
      title: "DP Received",
      icon: "bookingCancelled",
    },
    {
      value: `$ ${getTotalRemainingPayments}`,
      title: "Total Remaining Payments",
      icon: "bookingCancelled",
    },
  ];
  const customersPaymentsData = [
    {
      value: `$ ${getTotalPayments}`,
      title: "Total Payments",
      icon: "bookingCancelled",
    },
    {
      value: `$ ${getTotalCustomerPaidPayments}`,
      title: "Paid Payments",
      icon: "bookingCancelled",
    },
    {
      value: `$ ${getTotalCustomerRemainingPayments}`,
      title: "Total Remaining Payments",
      icon: "bookingCancelled",
    },
  ];
  const customersPaymentsDataPie = [
    {
      value: getTotalCustomerPaidPayments,
      title: "Paid Payments",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCustomerRemainingPayments,
      title: "Total Remaining Payments",
      icon: "bookingCancelled",
    },
  ];
  const sellerPaymentsAndOrdersData = [
    {
      value: getTotalNewOrdersCount,
      title: "Total Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalProcessedOrdersCount,
      title: "Total Processed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total Completed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total New Orders",
      icon: "bookingCancelled",
    },
  ];
  const customerPaymentsAndOrdersData = [
    {
      value: getTotalOrders,
      title: "Total Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalDPOrdersCount,
      title: "Total Orders DP Received ",
      icon: "bookingCancelled",
    },
    {
      value: getTotalProcessedOrdersCount,
      title: "Total Processed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total Completed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalNewOrdersCount,
      title: "Total New Orders",
      icon: "bookingCancelled",
    },
  ];
  const customerPaymentsAndOrdersDataPie = [
    {
      value: getTotalOrders,
      title: "Total Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalDPOrdersCount,
      title: "Total Orders DP Received ",
      icon: "bookingCancelled",
    },
    {
      value: getTotalProcessedOrdersCount,
      title: "Total Processed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalCompletedOrdersCount,
      title: "Total Completed Orders",
      icon: "bookingCancelled",
    },
    {
      value: getTotalNewOrdersCount,
      title: "Total New Orders",
      icon: "bookingCancelled",
    },
  ];
  useEffect(() => {
    fetchDashboardStats();
  });
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#DC143C"];
  // TOOLTIP
  const CustomTooltip = ({ active, payload, label }) => {
    console.log("ACTIVE: ", active);
    console.log("PAYLOAD: ", payload);
    console.log("PAYLOAD NAME: ", payload[0]?.name);
    console.log("LABEL: ", label);
    label = payload.name;
    if (active && payload && payload.length) {
      return (
        <Paper>
          <Text p="md">{`${payload[0]?.payload?.title} : ${payload[0].value}`}</Text>
        </Paper>
      );
    }

    return null;
  };

  return (
    <Paper p="md" style={{ position: "relative" }}>
      <LoadingOverlay
        loaderProps={{
          size: "xl",
          color: "grape",
          variant: "bars",
        }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
        visible={visible}
      />
      <Grid>
        <Grid.Col my="lg">
          <Title align="left">
            <u>Dashboard Statistics</u>
          </Title>
        </Grid.Col>
        {userType() === "admin" && (
          <>
            <Grid.Col lg={3}>
              <StatsCard data={dataUsers} cols={1} />
            </Grid.Col>
            <Grid.Col lg={3}>
              <StatsCard cols={1} data={vehiclesData} />
            </Grid.Col>
            <Grid.Col lg={3}>
              <StatsCard cols={1} data={ordersData} />
            </Grid.Col>

            <Grid.Col lg={3}>
              <StatsCard cols={1} data={paymentsData} />
            </Grid.Col>
          </>
        )}
        {userType() === "seller" && (
          <>
            <Grid.Col lg={6}>
              <StatsCard cols={1} data={sellerPaymentsAndOrdersData} />
            </Grid.Col>
            <Grid.Col lg={6}>
              <StatsCard cols={1} data={sellersVehiclesData} />
            </Grid.Col>
          </>
        )}
        {userType() === "customer" && (
          <>
            <Grid.Col lg={12}>
              <StatsCard cols={5} data={customerPaymentsAndOrdersData} />
            </Grid.Col>
            <Grid.Col lg={12}>
              <StatsCard cols={3} data={customersPaymentsData} />
            </Grid.Col>
          </>
        )}

        {userType() === "admin" && (
          <Grid.Col sm={12} md={5} lg={4} xl={3}>
            <Paper
              shadow="md"
              className="statsCardBorder"
              style={{ height: "100%", width: "100%" }}
            >
              <Group position="center" mt={"md"}>
                <Title order={2}>Users</Title>
              </Group>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width="100%" height={400}>
                  <Tooltip content={<CustomTooltip data={dataUsersPie} />} />
                  <Pie
                    data={dataUsersPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label="Hello"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataUsersPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid.Col>
        )}
        <Grid.Col
          sm={12}
          md={userType() === "admin" && 5}
          lg={userType() === "admin" ? 4 : 6}
          xl={userType() === "admin" && 3}
        >
          <Paper
            shadow="md"
            className="statsCardBorder"
            style={{ height: "100%", width: "100%" }}
          >
            <Group position="center" mt={"md"}>
              <Title order={2}>Orders</Title>
            </Group>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart width="100%" height={400}>
                <Tooltip
                  content={
                    <CustomTooltip
                      data={
                        userType() === "admin"
                          ? ordersDataPie
                          : userType() === "seller"
                          ? sellersOrdersDataPie
                          : customerPaymentsAndOrdersDataPie
                      }
                    />
                  }
                />
                <Pie
                  data={ordersDataPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label="Hello"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersDataPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid.Col>
        {userType() !== "customer" && (
          <Grid.Col
            sm={12}
            md={userType() === "admin" && 5}
            lg={userType() === "admin" ? 4 : 6}
            xl={userType() === "admin" && 3}
          >
            <Paper
              shadow="md"
              className="statsCardBorder"
              style={{ height: "100%", width: "100%" }}
            >
              <Group position="center" mt={"md"}>
                <Title order={2}>Vehicles</Title>
              </Group>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width="100%" height={400}>
                  <Tooltip content={<CustomTooltip data={vehiclesDataPie} />} />
                  <Pie
                    data={vehiclesDataPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label="Hello"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehiclesDataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid.Col>
        )}
        {userType() === "customer" && (
          <Grid.Col
            sm={12}
            md={userType() === "admin" && 5}
            lg={userType() === "admin" ? 4 : 6}
            xl={userType() === "admin" && 3}
          >
            <Paper
              shadow="md"
              className="statsCardBorder"
              style={{ height: "100%", width: "100%" }}
            >
              <Group position="center" mt={"md"}>
                <Title order={2}>Payments</Title>
              </Group>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width="100%" height={400}>
                  <Tooltip
                    content={<CustomTooltip data={customersPaymentsDataPie} />}
                  />
                  <Pie
                    data={customersPaymentsDataPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label="Hello"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customersPaymentsDataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid.Col>
        )}

        {userType() === "admin" && (
          <Grid.Col sm={12} md={5} lg={4} xl={3}>
            <Paper
              shadow="md"
              className="statsCardBorder"
              style={{ height: "100%", width: "100%" }}
            >
              <Group position="center" mt={"md"}>
                <Title order={2}>Payments</Title>
              </Group>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width="100%" height={400}>
                  <Tooltip content={<CustomTooltip data={paymentsDataPie} />} />
                  <Pie
                    data={paymentsDataPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label="Hello"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentsDataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </Paper>
  );
};
export default Dashboard;
