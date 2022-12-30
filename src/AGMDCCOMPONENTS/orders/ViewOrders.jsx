import * as React from "react";
import {
  ActionIcon,
  Badge,
  Divider,
  LoadingOverlay,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useMediaQuery } from "@mantine/hooks";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Avatar, Text, Group } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  AlertCircle,
  BrandStripe,
  Check,
  ChevronDown,
  CircleOff,
  CornerUpLeftDouble,
  Download,
  EditOff,
  Eye,
  Filter,
  Id,
  Search,
  TrashX,
  UserSearch,
} from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { Plus } from "tabler-icons-react";
import { visuallyHidden } from "@mui/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Menu } from "@mantine/core";
import { useState } from "react";
import { Modal, Button, Title, Grid } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { TrashOff } from "tabler-icons-react";
import { Edit } from "tabler-icons-react";
import axios from "axios";
import { createStyles } from "@mantine/core";
import { useEffect } from "react";
import ViewOrderModal from "./ViewOrderModal";
import { backendURL } from "../apiCallHelpers/backendURL";
import { getHeader } from "../apiCallHelpers/headers";
import { userType } from "../apiCallHelpers/userDataHelper";
import CheckoutForm from "../payments/CheckoutForm";
import { axiosPost } from "../apiCallHelpers/axiosCall";
const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype?.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const ViewOrders = ({ hideStatus }) => {
  let headCells;
  if (userType() === "admin") {
    headCells = [
      {
        id: "SR",
        numeric: true,
        disablePadding: true,
        label: "ID",
        sort: true,
      },
      {
        id: "vinNo",
        numeric: false,
        disablePadding: false,
        label: "Vin #",
        sort: true,
      },
      {
        id: "customer",
        numeric: false,
        disablePadding: false,
        label: "Customer",
        sort: true,
      },
      {
        id: "seller",
        numeric: false,
        disablePadding: false,
        label: "Seller",
        sort: true,
      },
      {
        id: "totalPrice",
        numeric: false,
        disablePadding: false,
        label: "Total Price",
        sort: false,
      },
      {
        id: "downPayment",
        numeric: false,
        disablePadding: false,
        label: "Down Payment",
        sort: false,
      },
      {
        id: "remainingAmount",
        numeric: false,
        disablePadding: false,
        label: "Remaining Amount",
        sort: false,
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Monthly Installments",
        sort: true,
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Order Status",
        sort: true,
      },
      {
        id: "Actions",
        numeric: false,
        disablePadding: false,
        label: "Actions",
        sort: false,
      },
    ];
  } else if (userType() === "seller" && !hideStatus) {
    headCells = [
      {
        id: "SR",
        numeric: true,
        disablePadding: true,
        label: "ID",
        sort: true,
      },
      {
        id: "vinNo",
        numeric: false,
        disablePadding: false,
        label: "Vin #",
        sort: true,
      },
      {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Title",
        sort: true,
      },

      {
        id: "totalPrice",
        numeric: false,
        disablePadding: false,
        label: "Vehicle Price",
        sort: true,
      },

      {
        id: "createdAt",
        numeric: false,
        disablePadding: false,
        label: "Order Created At",
        sort: true,
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Order Status",
        sort: true,
      },
      {
        id: "Actions",
        numeric: false,
        disablePadding: false,
        label: "Actions",
        sort: false,
      },
    ];
  } else if (userType() === "seller" && hideStatus) {
    headCells = [
      {
        id: "SR",
        numeric: true,
        disablePadding: true,
        label: "ID",
        sort: true,
      },
      {
        id: "vinNo",
        numeric: false,
        disablePadding: false,
        label: "Vin #",
        sort: true,
      },
      {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Title",
        sort: true,
      },

      {
        id: "totalPrice",
        numeric: false,
        disablePadding: false,
        label: "Vehicle Payment",
        sort: true,
      },

      {
        id: "createdAt",
        numeric: false,
        disablePadding: false,
        label: "Payment Created At",
        sort: true,
      },

      {
        id: "Actions",
        numeric: false,
        disablePadding: false,
        label: "Actions",
        sort: false,
      },
    ];
  } else if (userType() === "customer") {
    headCells = [
      {
        id: "SR",
        numeric: true,
        disablePadding: true,
        label: "ID",
        sort: true,
      },
      {
        id: "vinNo",
        numeric: false,
        disablePadding: false,
        label: "Vin #",
        sort: true,
      },
      {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Title",
        sort: true,
      },
      {
        id: "totalPrice",
        numeric: false,
        disablePadding: false,
        label: "Total Price",
        sort: false,
      },
      {
        id: "downPayment",
        numeric: false,
        disablePadding: false,
        label: "Down Payment",
        sort: false,
      },
      {
        id: "remainingAmount",
        numeric: false,
        disablePadding: false,
        label: "Remaining Amount",
        sort: false,
      },
      {
        id: "remainingAmount",
        numeric: false,
        disablePadding: false,
        label: "Monthly Installments",
        sort: true,
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Order Status",
        sort: true,
      },
      {
        id: "Actions",
        numeric: false,
        disablePadding: false,
        label: "Actions",
        sort: false,
      },
    ];
  }

  function EnhancedTableHead(props) {
    const {
      order,
      orderBy,

      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells?.map((headCell) => (
            <TableCell
              style={{ fontWeight: "bold" }}
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell?.sort === true ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const [orderDetails, setOrderDetails] = useState({});
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const theme = useMantineTheme();

  let navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  const [viewOrdersModal, setViewOrdersModal] = useState(false);
  const [visible, setVisible] = useState(true);

  const [refresh, setRefresh] = React.useState(true);
  const [allOrders, setOrders] = React.useState();
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  console.log("Vehicals::::::: ", allOrders);
  const [viewPaymentModal, setViewPaymentModal] = useState(false);
  const [amountPayable, setAmountPayable] = useState({});
  const [orderStatus, setOrderStatus] = useState("");

  // CSV_DATA_HOOK
  const [csvData, setCsvData] = useState([]);
  const fetchAllOrders = async () => {
    const res = await axios({
      method: "get",
      url: `${backendURL}/order/getOrders`,
      headers: getHeader(),
    });
    console.log("RES: ", res.data?.data);

    if (res.data.success) {
      console.log("RES in success: ", res.data?.data);
      let response = res.data?.data;

      let orderResponse;
      if (userType() === "seller") {
        console.log("Seller here haha");
        orderResponse = response.orders.filter(
          (order) => order.status !== "new" && order.status !== "dp_paid"
        );
      } else {
        orderResponse = response.orders;
      }
      let sr = 1;
      orderResponse?.map((order) => {
        order.SR = sr++;
      });
      setOrders(orderResponse);
      setRefresh(!refresh);
      setVisible(false);
    } else {
      console.log("RES in error: ", res.data?.data);
      showNotification({
        title: `${res.data.error}`,
        color: "red",

        icon: <IconX size={18} />,
        message: `${res?.data?.message?.toUpperCase()}`,
      });
    }
  };

  useEffect(() => {
    // if (refresh) {
    fetchAllOrders();
    // }
    filtering();
  }, [refresh, search, status]);

  console.log("CSV_DATA: ", csvData);
  console.log("USERS_DATA: ", allOrders);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const { classes } = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allOrders?.length) : 0;

  const [id, setId] = useState("");

  const deleteOrder = (id) => {
    setOpened(true);
    setId(id);
  };
  const confirmDelete = async () => {
    setOpened(false);
    setVisible(true);
    const res = await axios({
      method: "delete",
      url: `${backendURL}/order/${id}`,
      headers: getHeader(),
    });

    if (res.data.success) {
      // console.log(res.data);
      showNotification({
        autoClose: 5000,
        style: { size: "small" },

        title: "Success",
        message: `Order Has Been Deleted From The System! 🤥`,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
      setRefresh(!refresh);
    } else {
      showNotification({
        title: `${res.data.error}`,
        color: "red",

        icon: <IconX size={18} />,
        message: `${res.data.message.toUpperCase()}`,
      });
      setVisible(false);
    }
  };

  const [filterString, setFilterString] = useState([]);
  console.log(type);
  console.log(status);
  console.log(filterString);

  const filtering = () => {
    console.log("hi there");
    if (status === "all" && search === "") {
      setDisabled(true);
      return setFilterString(allOrders);
    } else if (status === "all" && search !== "") {
      setDisabled(false);
      return setFilterString(
        allOrders.filter((x) =>
          x.vinNo?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (status !== "all" && search === "") {
      setDisabled(false);
      return setFilterString(
        allOrders.filter((x) => x.status?.toLowerCase() === status)
      );
    }
    if (status !== "all" && search !== "") {
      setDisabled(false);
      return setFilterString(
        allOrders.filter(
          (x) =>
            x.status?.toLowerCase() === status &&
            x.vinNo?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };
  const updateStatus = async (id, status) => {
    setVisible(true);
    const body = {
      status: status,
    };
    console.log(body);

    try {
      const response = await axios({
        method: "patch",
        url: `${backendURL}/order/updateStatus/${id}`,
        data: body,
        headers: getHeader(),
      });
      console.log(response.data);

      if (response.data.status === "error") {
        if (response?.data?.error?.title) {
          showNotification({
            title: `${response?.data?.error?.title}`,
            color: "red",

            icon: <IconX size={18} />,
            message: `${response?.data?.error?.message?.toUpperCase()}`,
          });
        } else {
          showNotification({
            title: `${response?.data?.error}`,
            color: "red",

            icon: <IconX size={18} />,
            message: `${response?.data?.message?.toUpperCase()}`,
          });
        }
        setVisible(false);
      } else {
        showNotification({
          title: `SUCCESS`,
          color: "green",
          message: `Status Changed to Delivered Successfully! `,
        });
        console.log("navigating");
        setVisible(false);
        setRefresh(true);
        // navigate("/users");
        console.log("navigated");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [checked, setChecked] = useState(false);

  const [messageModal, setMessageModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const orderStatusMessage = useForm({
    validateInputOnChange: true,
    initialValues: {
      customerMessage:
        "Hello, Your Car will Be Delivered in Next 3 to 5 Working Days. Thank You for Choosing Us! ",
      sellerMessage:
        "Hello, Please Get The Car Ready. Our Staff Will Be Reaching Out To You Soon.",
    },
    validate: {
      customerMessage: (value) =>
        value.length > 20 || value.length === 0
          ? null
          : "Please Enter a Valid Message with at least 20 characters",
      sellerMessage: (value) =>
        value.length > 20 || value.length === 0
          ? null
          : "Please Enter a Valid Message with at least 20 characters",
    },
  });

  const handleChangeStatusAndReply = async (event) => {
    setMessageModal(false);

    setVisible(true);
    var { customerMessage, sellerMessage } = event;

    const body = {
      forCustomer: customerMessage,
      forSeller: sellerMessage,
      status: "processed",
    };

    console.log("ye to body hai", body);

    try {
      let url = `${backendURL}/order/${orderId}`;

      const response = await axios({
        method: "put",
        url: url,
        data: body,
        headers: getHeader(),
      });
      // setLoading(false);
      console.log("This is Data");
      console.log(response.data);

      if (!response.data.success) {
        console.log(response.data.error);
        showNotification({
          color: "green",
          title: `${response.data.error}`,
          message: `${response.data.message}`,
        });
        setVisible(false);
      } else {
        showNotification({
          color: "green",
          title: `SUCCESS`,

          message: `Message Sent Successfully`,
        });
        console.log("navigating");
        // setOpened(true);
        setVisible(false);
        setRefresh(true);
      }
    } catch (err) {
      setVisible(false);
      showNotification({
        color: "red",
        title: `Error`,
        message: `Something Went Wrong`,
      });
      console.log(err);
    }

    orderStatusMessage.reset();
    setChecked(false);
  };
  const stripePromise = loadStripe(
    "pk_test_51MIHwcLtRN90YHBGUp2oPpwp49eL58N8ORBHzmxeaYEtvgZRfkUUTG55zGrdepvEHHkIFe1TqbFqpsdsCZ2tXVvu00kSmub0Dm"
  );
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    // <ThemeProvider theme={darkTheme}>
    <>
      <Paper style={{ position: "relative" }}>
        <LoadingOverlay
          visible={visible}
          loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
          overlayOpacity={0.5}
          overlayColor="#c5c5c5"
        />

        <Modal
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          title="Message To Customer/ Seller And Status Change"
          // overlayOpacity={0.55}
          size="xl"
          // overlayBlur={3}
          opened={messageModal}
          onClose={() => setMessageModal(false)}
        >
          <form
            onSubmit={orderStatusMessage.onSubmit((values) =>
              handleChangeStatusAndReply(values)
            )}
          >
            <Group noWrap pb="xl" position="apart">
              <Group noWrap>
                <Text>Current Status:</Text>
                <Badge>
                  {orderStatus === "dp_paid"
                    ? "Down Payment Paid"
                    : orderStatus === "new"
                    ? "New Order"
                    : orderStatus === "processed"
                    ? "Processed"
                    : orderStatus === "completed"
                    ? "Completed"
                    : "Cancelled"}
                </Badge>
              </Group>

              {/* {orderStatus === "new" ? (
                <Button
                  color="orange"
                  onClick={() => {
                    navigate(`/user/addPayment/${"downPayment"}/${orderId}`);
                  }}
                >
                  Mark As DP Paid
                </Button>
              ) : orderStatus === "processed" ? (
                <Button
                  color="yellow"
                  onClick={() => {
                    navigate(`/user/addPayment/${"processing"}/${orderId}`);
                  }}
                >
                  Mark As Processed
                </Button>
              ) : (
                <Button color="green">Mark As Completed</Button>
              )} */}
            </Group>
            <Divider />

            <Textarea
              size="md"
              py="md"
              required
              maxLength={300}
              label={`Post Message To Customer`}
              {...orderStatusMessage.getInputProps("customerMessage")}
              minRows={3}
              maxRows={5}
              autosize
            />

            <Textarea
              size="md"
              py="md"
              required
              maxLength={300}
              label={`Post Message To Seller`}
              {...orderStatusMessage.getInputProps("sellerMessage")}
              minRows={3}
              maxRows={5}
              autosize
            />

            <Group position="right">
              <Button
                color="orange"
                type="submit"
                // onClick={() => {
                //   navigate(`/user/addPayment/${"downPayment"}/${orderId}`);
                // }}
              >
                Reply and Mark As Processed
              </Button>
            </Group>
          </form>
        </Modal>
        <Paper shadow="xl" style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                userType() === "admin" ? "space-between" : "flex-end",
            }}
          >
            <Button
              hidden={userType() === "admin" ? false : true}
              component={Link}
              to={
                JSON.parse(localStorage.getItem("userData"))?.role === "admin"
                  ? "/user/addOrder"
                  : "/user/addOrder"
              }
              rightIcon={<Plus />}
              variant="filled"
              color="dark"
              radius="lg"
              m="md"
              uppercase
            >
              ADD Order
            </Button>

            <div style={{ display: "flex", alignItems: "center" }}>
              {matches1200 ? (
                <>
                  {" "}
                  <Select
                    p="s"
                    m="md"
                    label="Filter By Status"
                    value={status}
                    data={[
                      { value: "all", label: "All" },
                      { value: "new", label: "New" },
                      { value: "downPayment", label: "Down Payment Paid" },
                      { value: "processed", label: "Processed" },
                      { value: "completed", label: "Completed" },
                    ]}
                    placeholder="All Status"
                    onChange={setStatus}
                  />
                  <TextInput
                    label="Search"
                    placeholder="Search..."
                    m="md"
                    icon={<UserSearch size={14} />}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                  />
                  <Button
                    rightIcon={<Filter />}
                    variant="filled"
                    color="blue"
                    // radius="lg"

                    mt="xl"
                    mr="md"
                    disabled={disabled}
                    onClick={() => {
                      setStatus("all");
                      setType("all");
                      setSearch("");
                    }}
                  >
                    Clear
                  </Button>
                </>
              ) : (
                <>
                  <TextInput
                    placeholder="Search..."
                    p="s"
                    m="md"
                    icon={<UserSearch size={14} />}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                  />

                  <Menu
                    shadow="md"
                    width={200}
                    p="s"
                    mt={matches1200 && "xl"}
                    mr="md"
                    // closeOnClickOutside={false}
                    closeOnItemClick={false}
                  >
                    <Menu.Target>
                      <ActionIcon variant="filled" color="yellow">
                        <Filter />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item>
                        <Select
                          p="s"
                          m="md"
                          label="Filter By Status"
                          value={status}
                          data={[
                            { value: "all", label: "All" },
                            { value: "new", label: "New" },
                            {
                              value: "downPayment",
                              label: "Down Payment Paid",
                            },
                            { value: "processed", label: "Processed" },
                            { value: "completed", label: "Completed" },
                          ]}
                          placeholder="All Status"
                          onChange={setStatus}
                        />
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          rightIcon={<Filter />}
                          variant="filled"
                          color="blue"
                          fullWidth
                          // radius="lg"

                          disabled={disabled}
                          onClick={() => {
                            setStatus("all");
                            setType("all");
                            setSearch("");
                          }}
                        >
                          Clear
                        </Button>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </>
              )}
            </div>
          </div>
        </Paper>
        <Modal
          title={<Title order={2}>Complete Payment</Title>}
          size={"lg"}
          radius="sm"
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={viewPaymentModal}
          onClose={() => setViewPaymentModal(false)}
        >
          <Paper withBorder p={"md"}>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  selectedOrder={[amountPayable]}
                  setViewPaymentModal={setViewPaymentModal}
                  viewOrder={true}
                />
              </Elements>
            )}
          </Paper>
        </Modal>
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
          title={
            hideStatus ? (
              <Title>Payment Details</Title>
            ) : (
              <Title>Order Details</Title>
            )
          }
          opened={viewOrdersModal}
          onClose={() => setViewOrdersModal(false)}
          // variant="transparent"
          size={matches1200 ? "xl" : "md"}
          radius="md"
          centered
          shadow={0}
          padding="xl"
        >
          <ViewOrderModal orderDetails={orderDetails} />
        </Modal>

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
            Are you Sure You Want to Delete This Order?
          </Title>
          <Grid align="center" justify="space-around" p="md">
            <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
              <Button
                align="center"
                color="light"
                leftIcon={<TrashOff size={14} />}
                onClick={() => setOpened(false)}
              >
                No, Don't Delete
              </Button>
            </Grid.Col>
            <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
              <Button
                align="center"
                color="red"
                leftIcon={<Trash size={14} />}
                onClick={() => confirmDelete()}
              >
                Yes, Delete
              </Button>
            </Grid.Col>
          </Grid>
        </Modal>
        {filterString?.length !== 0 ? (
          <Paper sx={{ width: "100%", mb: 2 }}>
            <>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={allOrders?.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 customer?.slice()?.sort(getComparator(order, orderBy)) */}
                    {stableSort(filterString, getComparator(order, orderBy))
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row, index) => {
                        console.log("row data", row);

                        return (
                          <TableRow key={index}>
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={() => {
                                console.log("View vehical");
                                if (userType() === "customer") {
                                  setOrderDetails(row);
                                  setViewOrdersModal(true);
                                }
                              }}
                            >
                              {row?.SR}
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={() => {
                                console.log("View vehical");
                                if (userType() === "customer") {
                                  setOrderDetails(row);
                                  setViewOrdersModal(true);
                                }
                              }}
                            >
                              <Text>{row?.vinNo}</Text>
                            </TableCell>
                            {userType() !== "admin" && (
                              <>
                                <TableCell
                                  align="left"
                                  onClick={() => {
                                    console.log("View vehical");
                                    if (userType() === "customer") {
                                      setOrderDetails(row);
                                      setViewOrdersModal(true);
                                    }
                                  }}
                                >
                                  {row?.title || "No Title"}
                                </TableCell>
                              </>
                            )}

                            {userType() === "admin" && (
                              <>
                                <TableCell
                                  align="left"
                                  onClick={() => {
                                    console.log("View vehical");
                                    if (userType() === "customer") {
                                      setOrderDetails(row);
                                      setViewOrdersModal(true);
                                    }
                                  }}
                                >
                                  {row?.customer?.name || "No Customer"}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  onClick={() => {
                                    console.log("View vehical");
                                    if (userType() === "customer") {
                                      setOrderDetails(row);
                                      setViewOrdersModal(true);
                                    }
                                  }}
                                >
                                  {row?.sellerId?.name || "No Seller"}
                                </TableCell>
                              </>
                            )}
                            {userType() !== "seller" && (
                              <>
                                <TableCell
                                  align="left"
                                  onClick={() => {
                                    console.log("View vehical");
                                    if (userType() === "customer") {
                                      setOrderDetails(row);
                                      setViewOrdersModal(true);
                                    }
                                  }}
                                >
                                  {row?.totalPrice?.toLocaleString()}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.downPayment?.toLocaleString()}
                                  {row?.status == "new" ? (
                                    <Button
                                      size="xs"
                                      m={"3px"}
                                      compact
                                      color="blue"
                                      onClick={async () => {
                                        console.log("LAUNCHING PAYMENT");
                                        try {
                                          let apiResponse = await axiosPost(
                                            "/payment/payment-intent",
                                            {
                                              orderId: row?._id,
                                            }
                                          );
                                          console.log(
                                            "API RESPONSE",
                                            apiResponse
                                          );
                                          if (apiResponse === null) {
                                            showNotification({
                                              title: "Already paid",
                                              message:
                                                "This order has already been paid",
                                              color: "yellow",
                                            });
                                          } else {
                                            setClientSecret(
                                              apiResponse.data.data
                                                .client_secret
                                            );
                                          }
                                        } catch (e) {
                                          console.log("error");
                                        }
                                        // setViewOrdersModal(false);
                                        setViewPaymentModal(true);
                                        setAmountPayable(row);
                                      }}
                                    >
                                      Pay Now
                                    </Button>
                                  ) : (
                                    <Button
                                      size="xs"
                                      m={"3px"}
                                      compact
                                      color="blue"
                                      disabled
                                    >
                                      Paid
                                    </Button>
                                  )}
                                </TableCell>

                                <TableCell align="left">
                                  {row?.remainingPayment?.toLocaleString()}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.remainingPayment / 60}
                                  {userType() === "customer" &&
                                    row?.status !== "new" && (
                                      <Button
                                        size="xs"
                                        m={"3px"}
                                        compact
                                        color="blue"
                                        onClick={async () => {
                                          console.log("LAUNCHING PAYMENT");
                                          try {
                                            let apiResponse = await axiosPost(
                                              "/payment/payment-intent",
                                              {
                                                orderId: row?._id,
                                              }
                                            );
                                            console.log(
                                              "API RESPONSE",
                                              apiResponse
                                            );
                                            if (apiResponse === null) {
                                              showNotification({
                                                title: "Already paid",
                                                message:
                                                  "This order has already been paid",
                                                color: "yellow",
                                              });
                                            } else {
                                              setClientSecret(
                                                apiResponse.data.data
                                                  .client_secret
                                              );
                                            }
                                          } catch (e) {
                                            console.log("error");
                                          }
                                          // setViewOrdersModal(false);
                                          setViewPaymentModal(true);
                                          setAmountPayable(row);
                                        }}
                                      >
                                        Pay Now
                                      </Button>
                                    )}
                                </TableCell>
                              </>
                            )}

                            {userType() === "seller" && (
                              <>
                                <TableCell
                                  align="left"
                                  onClick={() => {
                                    console.log("View vehical");
                                    if (userType() === "customer") {
                                      setOrderDetails(row);
                                      setViewOrdersModal(true);
                                    }
                                  }}
                                >
                                  {row?.vehiclePrice?.toLocaleString() || 0}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  onClick={() => {
                                    console.log("View vehical");
                                    if (userType() === "customer") {
                                      setOrderDetails(row);
                                      setViewOrdersModal(true);
                                    }
                                  }}
                                >
                                  {row?.createdAt.split("T")[0] || 0}
                                </TableCell>
                              </>
                            )}

                            {userType() !== "seller" && (
                              <TableCell align="left">
                                {row?.status === "new" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="yellow"
                                      >
                                        New
                                        <ChevronDown size={14} />
                                      </Button>
                                    </Menu.Target>
                                    <Menu.Dropdown p={0}>
                                      <Button
                                        color="red"
                                        size="xs"
                                        compact
                                        fullWidth
                                        m={0}
                                        p={0}
                                        onClick={() => {
                                          setRefresh(true);
                                          updateStatus(row?._id, "cancelled");
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </Menu.Dropdown>
                                  </Menu>
                                ) : row?.status === "dp_paid" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="orange"
                                      >
                                        DP Received
                                        {/* <ChevronDown size={14} /> */}
                                      </Button>
                                    </Menu.Target>
                                  </Menu>
                                ) : row?.status === "processed" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="blue"
                                      >
                                        Processed
                                        <ChevronDown size={14} />
                                      </Button>
                                    </Menu.Target>
                                    {userType() === "admin" && (
                                      <Menu.Dropdown p={0}>
                                        <Button
                                          color="green"
                                          size="xs"
                                          compact
                                          fullWidth
                                          m={0}
                                          p={0}
                                          onClick={() => {
                                            setRefresh(true);
                                            updateStatus(row?._id, "completed");
                                          }}
                                        >
                                          Delivered
                                        </Button>
                                      </Menu.Dropdown>
                                    )}
                                  </Menu>
                                ) : row.status === "completed" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="green"
                                      >
                                        Delivered
                                        {/* <ChevronDown size={14} /> */}
                                      </Button>
                                    </Menu.Target>
                                  </Menu>
                                ) : (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="red"
                                      >
                                        Canceled
                                        {/* <ChevronDown size={14} /> */}
                                      </Button>
                                    </Menu.Target>
                                  </Menu>
                                )}
                              </TableCell>
                            )}
                            {userType() === "seller" && !hideStatus && (
                              <TableCell align="left">
                                {row?.status === "processed" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="yellow"
                                      >
                                        Delivery Pending
                                        {/* <ChevronDown size={14} /> */}
                                      </Button>
                                    </Menu.Target>
                                  </Menu>
                                ) : row.status === "completed" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="green"
                                      >
                                        Delivered
                                        {/* <ChevronDown size={14} /> */}
                                      </Button>
                                    </Menu.Target>
                                  </Menu>
                                ) : row.status === "cancelled" ? (
                                  <Menu
                                    zIndex={1000}
                                    align="center"
                                    offset={2}
                                    width="target"
                                    transition="rotate-right"
                                    transitionDuration={150}
                                  >
                                    <Menu.Target width="target">
                                      <Button
                                        size="xs"
                                        compact
                                        fullWidth
                                        color="red"
                                      >
                                        Cancelled
                                        {/* <ChevronDown size={14} /> */}
                                      </Button>
                                    </Menu.Target>
                                  </Menu>
                                ) : null}
                              </TableCell>
                            )}

                            <TableCell>
                              <SimpleGrid
                                style={{
                                  zIndex: 1000,
                                }}
                                cols={
                                  userType() === "admin"
                                    ? 4
                                    : userType() === "seller"
                                    ? 1
                                    : 2
                                }
                                breakpoints={[
                                  { maxWidth: "xl", cols: 2 },
                                  { maxWidth: "lg", cols: 2 },
                                  { maxWidth: "md", cols: 2 },
                                ]}
                              >
                                <ActionIcon
                                  color="dark"
                                  variant="transparent"
                                  onClick={() => {
                                    console.log("View vehical");
                                    setOrderDetails(row);
                                    setViewOrdersModal(true);
                                  }}
                                >
                                  <Eye color="#a905b6" />
                                </ActionIcon>
                                {/* {userType() === "customer" && (
                                  <ActionIcon
                                    color="dark"
                                    variant="transparent"
                                    onClick={async () => {
                                      console.log("LAUNCHING PAYMENT");
                                      try {
                                        let apiResponse = await axiosPost(
                                          "/payment/payment-intent",
                                          {
                                            orderId: row?._id,
                                          }
                                        );
                                        console.log(
                                          "API RESPONSE",
                                          apiResponse
                                        );
                                        if (apiResponse === null) {
                                          showNotification({
                                            title: "Already paid",
                                            message:
                                              "This order has already been paid",
                                            color: "yellow",
                                          });
                                        } else {
                                          setClientSecret(
                                            apiResponse.data.data.client_secret
                                          );
                                        }
                                      } catch (e) {
                                        console.log("error");
                                      }
                                      // setViewOrdersModal(false);
                                      setViewPaymentModal(true);
                                      setAmountPayable(row);
                                    }}
                                  >
                                    <BrandStripe />
                                  </ActionIcon>
                                )} */}
                                {userType() === "admin" && (
                                  <ActionIcon
                                    disabled={row?.status !== "dp_paid"}
                                    variant="transparent"
                                    onClick={() => {
                                      setMessageModal(true);
                                      setOrderId(row._id);
                                      setOrderStatus(row.status);
                                    }}
                                  >
                                    {row?.status !== "dp_paid" ? (
                                      <CornerUpLeftDouble />
                                    ) : (
                                      <CornerUpLeftDouble />
                                    )}
                                  </ActionIcon>
                                )}

                                {userType() === "admin" && (
                                  <ActionIcon
                                    disabled={row?.status !== "new"}
                                    color="dark"
                                    variant="transparent"
                                    onClick={() => {
                                      console.log("Clicked on edit button");
                                      let currentUser = JSON.parse(
                                        localStorage.getItem("user")
                                      );
                                      if (currentUser?.role === "admin") {
                                        navigate(
                                          `/user/updateOrder/${row._id}`
                                        );
                                      } else {
                                        navigate(
                                          `/user/updateOrder/${row._id}`
                                        );
                                      }
                                    }}
                                  >
                                    {row?.status !== "new" ? (
                                      <EditOff />
                                    ) : (
                                      <Edit />
                                    )}
                                  </ActionIcon>
                                )}

                                {userType() === "admin" && (
                                  <ActionIcon
                                    disabled={row?.status !== "new"}
                                    color="red"
                                    variant="transparent"
                                    onClick={() => deleteOrder(row?._id)}
                                  >
                                    {row?.status !== "new" ? (
                                      <TrashOff />
                                    ) : (
                                      <Trash />
                                    )}
                                  </ActionIcon>
                                )}
                              </SimpleGrid>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allOrders?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          </Paper>
        ) : (
          <Text weight="bold" align="center">
            No Data Found
          </Text>
        )}
      </Paper>
    </>
  );
};

export default ViewOrders;
