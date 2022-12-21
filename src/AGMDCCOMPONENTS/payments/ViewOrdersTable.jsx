// IMPORTS

import * as React from "react";
import {
  ActionIcon,
  HoverCard,
  LoadingOverlay,
  Select,
  SimpleGrid,
  TextInput,
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
import {
  Eye,
  TrashX,
  Filter,
  CircleOff,
  UserSearch,
  AlertCircle,
  ChevronDown,
} from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { Plus } from "tabler-icons-react";
import { visuallyHidden } from "@mui/utils";
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
import { userType } from "../apiCallHelpers/userDataHelper";
import { getHeader } from "../apiCallHelpers/headers";
import { backendURL } from "../apiCallHelpers/backendURL";
// import ViewVehicleModal from "./ViewVehicleModal";
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

const headCells = [
  {
    id: "SR",
    numeric: true,
    disablePadding: true,
    label: "ID",
    sort: true,
  },

  {
    id: "paidTo",
    numeric: false,
    disablePadding: false,
    label: "Paid To",
    sort: true,
  },
  {
    id: "vinNo",
    numeric: false,
    disablePadding: false,
    label: "VIN #",
    sort: true,
  },
  {
    id: "orderId",
    numeric: false,
    disablePadding: false,
    label: "Order ID",
    sort: true,
  },

  {
    id: "paymentAmount",
    numeric: false,
    disablePadding: false,
    label: "Payment Amount",
    sort: true,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Paid At",
    sort: false,
  },

  // {
  //   id: "Actions",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "actions",
  //   sort: false,
  // },
];

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
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
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

const ViewPaymentsTable = ({ setCurrentLocation }) => {
  const [getAllPayments, setAllPayments] = React.useState([]);
  const getAllPaymentsFunction = async () => {
    try {
      const apiResponse = await axios({
        headers: getHeader(),
        method: "GET",
        url: `${backendURL}api/v1/payment/getAllPayments`,
      });

      console.log("API RESPONSE: ", apiResponse);
      if (apiResponse.data.success === true) {
        console.log("WE ARE IN IF BLOCK");

        let data = apiResponse.data.data.payments.map((user, index) => {
          return {
            ...user,
            SR: index + 1,
          };
        });
        setFilterString(data);
        setVisible(false);
        return data;
      } else {
        console.log("API CALL FAILED");
        setVisible(false);
      }
    } catch (e) {
      console.log("ERROR", e);
      setVisible(false);
      showNotification({
        message: "Something went wrong",
        title: "Error",
        color: "red",
      });
    }
  };

  useEffect(() => {
    getAllPaymentsFunction().then(setAllPayments);
  }, []);
  const [orderDetails, setOrderDetails] = useState({});
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  setCurrentLocation("View All Orders");
  let navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [viewOrdersModal, setViewOrdersModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const [refresh, setRefresh] = React.useState(true);

  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  console.log("Vehicals::::::: ", getAllPayments);

  useEffect(() => {
    filtering();
  }, [refresh, type, status, search]);

  console.log("USERS_DATA: ", getAllPayments);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - getAllPayments?.length)
      : 0;

  const [id, setId] = useState("");

  const deleteOrder = (id) => {
    setOpened(true);
    setId(id);
  };
  const confirmDelete = () => {
    setOpened(false);
    setVisible(true);
    axios
      .delete(`https://a-wep.herokuapp.com/admin/deleteUser/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          showNotification({
            autoClose: 5000,
            style: { size: "small" },

            title: "Success",
            message: `User Has Been Deleted From The System! 🤥`,
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
          setRefresh(true);
        } else {
          showNotification({
            title: `${res.data.error}`,
            color: "red",

            icon: <IconX size={18} />,
            message: `${res.data.message.toUpperCase()}`,
          });
        }
        setVisible(false);
      });
  };

  const [filterString, setFilterString] = useState([]);
  console.log(type);
  console.log(status);
  console.log(filterString);

  const filtering = () => {
    console.log("hi there");
    if (type === "all" && status === "all" && search === "") {
      setDisabled(true);
      return setFilterString(getAllPayments);
    } else if (type === "all" && status === "all") {
      setDisabled(false);
      return setFilterString(
        getAllPayments.filter(
          (x) =>
            x.orderId?._id?.toLowerCase().includes(search.toLowerCase()) ||
            x.orderId?.vinNo?.toLowerCase().includes(search.toLowerCase()) ||
            x.paymentAmount
              ?.toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            x.phone?.toString().toLowerCase().includes(search.toLowerCase()) ||
            x.CNIC?.toLowerCase().includes(search.toLowerCase()) ||
            x.paymentType?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (type === "all" && status !== "all") {
      setDisabled(false);
      return setFilterString(
        getAllPayments.filter(
          (x) =>
            x.isEnabled === (status === "true") &&
            (x.orderId?._id?.toLowerCase().includes(search.toLowerCase()) ||
              x.orderId?.vinNo?.toLowerCase().includes(search.toLowerCase()) ||
              x.paymentAmount
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.phone
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.paymentType?.toLowerCase().includes(search.toLowerCase()) ||
              x.CNIC?.toLowerCase().includes(search.toLowerCase()))
        )
      );
    } else if (type !== "all" && status === "all") {
      setDisabled(false);
      return setFilterString(
        getAllPayments.filter(
          (x) =>
            x.paymentType === type &&
            (x.orderId?._id?.toLowerCase().includes(search.toLowerCase()) ||
              x.orderId?.vinNo?.toLowerCase().includes(search.toLowerCase()) ||
              x.paymentAmount
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.phone
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.CNIC?.toLowerCase().includes(search.toLowerCase()) ||
              x.paymentType?.toLowerCase().includes(search.toLowerCase()))
        )
      );
    } else if (type !== "all" && status !== "all") {
      setDisabled(false);
      return setFilterString(
        getAllPayments.filter(
          (x) =>
            x.paymentType === type &&
            x.isEnabled === (status === "true") &&
            (x.orderId?._id?.toLowerCase().includes(search.toLowerCase()) ||
              x.orderId?.vinNo?.toLowerCase().includes(search.toLowerCase()) ||
              x.paymentAmount
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.phone
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.CNIC?.toLowerCase().includes(search.toLowerCase()) ||
              x.paymentType?.toLowerCase().includes(search.toLowerCase()))
        )
      );
    }
  };

  const updateStatus = async (id, name, isEnabled) => {
    setVisible(true);
    const body = {
      isEnabled: isEnabled,
    };
    console.log(body);

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios({
        method: "patch",
        url: `https://a-wep.herokuapp.com/admin/updateUser/${id}`,
        data: body,
        headers: headers,
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

          message: `${name} Has Been ${isEnabled ? "Activated" : "Blocked"}! `,
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

  return (
    // <ThemeProvider theme={darkTheme}>
    <>
      <Paper style={{ position: "relative" }}>
        {/*
        
        <LoadingOverlay
          visible={visible}
          loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
          overlayOpacity={0.5}
          overlayColor="#c5c5c5"
        />
        
    */}
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
                JSON.parse(localStorage.getItem("userData")).role === "admin"
                  ? "/admin/addPayment"
                  : "/seller/addPayment"
              }
              rightIcon={<Plus />}
              variant="filled"
              color="dark"
              radius="lg"
              m="md"
              uppercase
            >
              ADD Payment
            </Button>
            <div style={{ display: "flex", alignItems: "center" }}>
              {matches1200 ? (
                <>
                  <Select
                    m="md"
                    label="Filter By User Type"
                    value={type}
                    data={[
                      { value: "all", label: "All" },
                      { value: "customer", label: "Customer" },
                      { value: "seller", label: "Seller" },
                    ]}
                    placeholder="All User Types"
                    onChange={setType}
                  />
                  {/*
                  <Select
                  m="md"
                  label="Filter By Status"
                  value={status}
                  data={[
                    { value: "all", label: "All" },
                    { value: "true", label: "Active" },
                    { value: "false", label: "Blocked" },
                  ]}
                  placeholder="All Status"
                  onChange={setStatus}
                />
                */}
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
                    m="md"
                    icon={<UserSearch size={14} />}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                  />

                  <Menu
                    shadow="md"
                    width={200}
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
                          label="Filter By User Type"
                          value={type}
                          data={[
                            { value: "all", label: "All" },
                            { value: "customer", label: "Customer" },
                            { value: "seller", label: "Seller" },
                            { value: "admin", label: "Admin" },
                          ]}
                          placeholder="All User Types"
                          onChange={setType}
                        />
                      </Menu.Item>
                      <Menu.Item>
                        {" "}
                        <Select
                          label="Filter By Status"
                          value={status}
                          data={[
                            { value: "all", label: "All" },
                            { value: "true", label: "Active" },
                            { value: "false", label: "Blocked" },
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

              {/*
<Menu
shadow="md"
width={200}
p="s"
mt={matches1200 && "xl"}
mr="md"
>
<Menu.Target>
  <ActionIcon variant="filled" color="dark">
    <Download />
  </ActionIcon>
</Menu.Target>

<Menu.Dropdown>
  <Menu.Label>Download Options</Menu.Label>
  <Menu.Item>
    {users?.length !== 0 ? (
      <DownloadAsCSV
        name="All Users of AWEP"
        headCells={pdfHeadCells}
        data={users}
      />
    ) : (
      <Text>Download as CSV</Text>
    )}
  </Menu.Item>
  <Menu.Item>
    {users?.length !== 0 ? (
      <PDFTable
        headCells={pdfHeadCells}
        data={users}
        title="All Users of AWEP"
      />
    ) : null}
  </Menu.Item>
</Menu.Dropdown>
</Menu>
*/}
            </div>
          </div>
        </Paper>

        {/* 
        

        <ActionIcon
          onClick={() => {
            console.log("DOWNLOAD AS PDF");
            downloadPDF();
          }}
        >
          <Download />
        </ActionIcon>
      
      
      
      
      
      <Box sx={{ width: "100%" }}> */}
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
          title={"Order Details"}
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
            Are you Sure You Want to Delete This User?
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
            {matches800 ? (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={getAllPayments?.length}
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
                          return (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {row?.SR}
                              </TableCell>
                              <TableCell align="left">
                                <Text>{row?.paymentType}</Text>
                              </TableCell>

                              {/*
<TableCell align="left">
<Avatar
  size={"lg"}
  radius="xl"
  src={row?.profileImage}
></Avatar>
</TableCell>
*/}

                              <TableCell align="left">
                                {row?.orderId?.vinNo}
                              </TableCell>
                              <TableCell align="left">
                                {row?.orderId?._id}
                              </TableCell>
                              <TableCell align="left">
                                {row?.paymentAmount?.toLocaleString()}
                              </TableCell>

                              <TableCell align="left">
                                {row?.createdAt?.split("T")[0] +
                                  " " +
                                  row?.createdAt?.split("T")[1].split(".")[0]}
                              </TableCell>

                              {/*
<TableCell>
<SimpleGrid cols={4}>
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
  <ActionIcon
    color="blue"
    variant="transparent"
    onClick={() => {
      console.log("ALERT USER FOR PAYMENT");
    }}
  >
    <AlertCircle />
  </ActionIcon>
  <ActionIcon
    color="dark"
    variant="transparent"
    onClick={() => {
      console.log("Clicked on edit button");
      let currentUser = JSON.parse(
        localStorage.getItem("user")
      );
      if (currentUser?.role === "admin") {
        navigate(
          `/admin/updateOrder/${row._id}`
        );
      } else {
        navigate(
          `/seller/updateOrder/${row._id}`
        );
      }
    }}
  >
    <Edit color="green" />
  </ActionIcon>

  <ActionIcon
    color="red"
    variant="transparent"
    onClick={() => deleteOrder(row?._id)}
  >
    <Trash />
  </ActionIcon>
</SimpleGrid>
</TableCell>
*/}
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
                  count={getAllPayments?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              filterString?.map((row) => {
                return (
                  <Group position="apart" p="md">
                    <div>
                      <Group noWrap>
                        <Avatar radius="md" />
                        <div>
                          <Group
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              lineClamp={1}
                              size="lmdg"
                              weight={500}
                              className={classes.name}
                            >
                              {row?.name}
                            </Text>
                            <Text>
                              {row?.isEnabled ? (
                                <Menu
                                  trigger="hover"
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
                                      Active
                                      <ChevronDown size={14} />
                                    </Button>
                                  </Menu.Target>
                                  <Menu.Dropdown p={0}>
                                    <Button
                                      color="red"
                                      size="xs"
                                      fullWidth
                                      compact
                                      m={0}
                                      p={0}
                                      onClick={() =>
                                        updateStatus(row?._id, row?.name, false)
                                      }
                                    >
                                      Block
                                    </Button>
                                  </Menu.Dropdown>
                                </Menu>
                              ) : (
                                <Menu
                                  trigger="hover"
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
                                      Blocked
                                      <ChevronDown size={14} />
                                    </Button>
                                  </Menu.Target>
                                  <Menu.Dropdown p={0}>
                                    <Button
                                      color="green"
                                      size="xs"
                                      compact
                                      fullWidth
                                      m={0}
                                      p={0}
                                      onClick={() =>
                                        updateStatus(row?._id, row?.name, true)
                                      }
                                    >
                                      Activate
                                    </Button>
                                  </Menu.Dropdown>
                                </Menu>
                              )}
                            </Text>
                          </Group>
                          {row?.role ? (
                            <Text size="xs" color="dimmed">
                              {row?.role === "customer"
                                ? "Customer"
                                : row?.role === "seller"
                                ? "Seller"
                                : "Admin"}
                            </Text>
                          ) : (
                            <TableCell align="left">
                              User Type Missing
                            </TableCell>
                          )}

                          <Group noWrap spacing={10} mt={3}>
                            <IconAt
                              stroke={1.5}
                              size={16}
                              className={classes.icon}
                            />
                            <Text size="xs" lineClamp={1} color="dimmed">
                              {row?.email}
                            </Text>
                          </Group>

                          <Group noWrap spacing={10} mt={5}>
                            <IconPhoneCall
                              stroke={1.5}
                              size={16}
                              className={classes.icon}
                            />
                            <Text size="xs" color="dimmed">
                              {row?.phone}
                            </Text>
                          </Group>
                        </div>
                      </Group>
                    </div>
                    <div>
                      <ActionIcon
                        color="dark"
                        variant="transparent"
                        onClick={() => {
                          console.log("CLICKED");
                        }}
                      >
                        <Eye color="#a905b6" />
                      </ActionIcon>
                      {row?._id ===
                      JSON.parse(localStorage.getItem("userData"))?.id ? (
                        <ActionIcon
                          color="dark"
                          variant="transparent"
                          onClick={() => {
                            navigate("/editProfile", {
                              state: {
                                ID: row?._id,
                                NAME: row?.name,
                                EMAIL: row?.email,
                                role: row?.role,
                                PROFILEIMAGE: row?.profileImage,
                                ISEMAILVERIFIED: row?.isEmailVerified,
                                ISPHONEVERIFIED: row?.isPhoneVerified,
                                CNIC: row?.CNIC,
                                PHONE: row?.phone,
                              },
                            });
                          }}
                        >
                          <Edit color="green" />
                        </ActionIcon>
                      ) : row?.isEnabled && !row?.isNotDeletable ? (
                        <ActionIcon
                          color="dark"
                          variant="transparent"
                          onClick={() =>
                            // navigate(`/updateuser/${id}`, {
                            navigate("/updateuser", {
                              state: {
                                Id: row?._id,
                                Name: row?.name,
                                Type: row?.role,
                                Email: row?.email,
                                Phone: row?.phone,
                                Cnic: row?.CNIC,
                                ProfileImage: row?.profileImage,
                              },
                            })
                          }
                        >
                          <Edit color="green" />
                        </ActionIcon>
                      ) : (
                        <HoverCard width={280} shadow="md">
                          <HoverCard.Target>
                            <ActionIcon
                              color="dark"
                              variant="transparent"
                              sx={{
                                cursor: "not-allowed",
                              }}
                            >
                              <CircleOff />
                            </ActionIcon>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text size="sm">This User Can't Be Updated</Text>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      )}
                      {!row?.isNotDeletable ? (
                        <ActionIcon
                          color="red"
                          variant="transparent"
                          onClick={() => deleteOrder(row?._id)}
                        >
                          <Trash />
                        </ActionIcon>
                      ) : (
                        <HoverCard width={280} shadow="md">
                          <HoverCard.Target>
                            <ActionIcon
                              color="dark"
                              variant="transparent"
                              sx={{
                                cursor: "not-allowed",
                              }}
                            >
                              <TrashX />
                            </ActionIcon>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text size="sm">This User Is Not Deletable</Text>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      )}
                    </div>
                  </Group>
                );
              })
            )}
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

export default ViewPaymentsTable;
