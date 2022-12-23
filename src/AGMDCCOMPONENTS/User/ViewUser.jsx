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
  Check,
  ChevronDown,
  Eye,
  Filter,
  UserSearch,
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
import ViewUserModal from "../User/ViewUserModal";
import { backendURL } from "../apiCallHelpers/backendURL";
import { getHeader } from "../apiCallHelpers/headers";
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
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
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
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Type",
    sort: true,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    sort: true,
  },

  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    sort: true,
  },

  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
    sort: true,
  },

  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    sort: true,
  },

  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Created At",
    sort: true,
  },
  {
    id: "actionsDontShow",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    sort: false,
  },
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
        {headCells.map((headCell) => (
          <TableCell
            style={{ fontWeight: "bold" }}
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sort === true ? (
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

const ViewUsers = ({ setCurrentLocation }) => {
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");

  setCurrentLocation("View All Users");
  let navigate = useNavigate();
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [users, setUsers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [viewUserDetails, setUserDetails] = useState({});
  const [filterString, setFilterString] = useState([]);
  const getAllUsersFunction = async () => {
    try {
      const apiResponse = await axios({
        headers: getHeader(),
        method: "GET",
        url: `${backendURL}/user/all`,
      });

      console.log("API RESPONSE: ", apiResponse);
      if (apiResponse.data.success === true) {
        console.log("WE ARE IN IF BLOCK");

        let data = apiResponse.data.data.users.map((user, index) => {
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
    getAllUsersFunction().then(setUsers);
  }, [refresh]);
  useEffect(() => {
    filtering();
  }, [refresh, type, status, search]);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const [id, setId] = useState("");
  const deleteCustomer = (id) => {
    setOpened(true);
    setId(id);
  };
  const confirmDelete = () => {
    setOpened(false);
    setVisible(true);

    axios({
      headers: getHeader(),
      method: "DELETE",
      url: `${backendURL}/user/${id}`,
    })
      .then((res) => {
        if (res.data.success) {
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
          setRefresh(!refresh);
        } else {
          setVisible(false);
          showNotification({
            title: `${"Oops"}`,
            color: "red",

            icon: <IconX size={18} />,
            message: `${res?.data?.message}`,
          });
        }
      })
      .catch((e) => {
        console.log("ERROR", e);
        setVisible(false);
        showNotification({
          title: `${"Oops"}`,
          color: "red",

          icon: <IconX size={18} />,
          message: `${e?.response?.data?.data}`,
        });
        console.log("errsdfdsf", e);
      });
  };

  const filtering = () => {
    console.log("hi there");
    if (type === "all" && status === "all" && search === "") {
      setDisabled(true);
      return setFilterString(users);
    } else if (type === "all" && status === "all") {
      setDisabled(false);
      return setFilterString(
        users.filter(
          (x) =>
            x.name?.toLowerCase().includes(search.toLowerCase()) ||
            x.email?.toLowerCase().includes(search.toLowerCase()) ||
            x.phone?.toString().toLowerCase().includes(search.toLowerCase()) ||
            x.role?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (type === "all" && status !== "all") {
      setDisabled(false);
      return setFilterString(
        users.filter(
          (x) =>
            x.status === status &&
            (x.name?.toLowerCase().includes(search.toLowerCase()) ||
              x.email?.toLowerCase().includes(search.toLowerCase()) ||
              x.phone
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.role?.toLowerCase().includes(search.toLowerCase()))
        )
      );
    } else if (type !== "all" && status === "all") {
      setDisabled(false);
      return setFilterString(
        users.filter(
          (x) =>
            x.role === type &&
            (x.name?.toLowerCase().includes(search.toLowerCase()) ||
              x.email?.toLowerCase().includes(search.toLowerCase()) ||
              x.phone
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.role?.toLowerCase().includes(search.toLowerCase()))
        )
      );
    } else if (type !== "all" && status !== "all") {
      setDisabled(false);
      return setFilterString(
        users.filter(
          (x) =>
            x.role === type &&
            x.status === status &&
            (x.name?.toLowerCase().includes(search.toLowerCase()) ||
              x.email?.toLowerCase().includes(search.toLowerCase()) ||
              x.phone
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              x.role?.toLowerCase().includes(search.toLowerCase()))
        )
      );
    }
  };

  const updateStatus = async (id, status) => {
    setVisible(true);
    const body = {
      status: status,
    };

    try {
      const response = await axios({
        method: "patch",
        url: `${backendURL}/user/block/${id}`,
        data: body,
        headers: getHeader(),
      });
      console.log("RESPONSE: ", response);
      setRefresh(!refresh);
      setVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Paper style={{ position: "relative" }}>
        <LoadingOverlay
          visible={visible}
          loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
          overlayOpacity={0.5}
          overlayColor="#c5c5c5"
        />

        <Paper shadow="xl" style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              component={Link}
              to="/user/addUser"
              rightIcon={<Plus />}
              variant="filled"
              color="dark"
              radius="lg"
              m="md"
            >
              ADD USER
            </Button>
            <div style={{ display: "flex", alignItems: "center" }}>
              {matches1200 ? (
                <React.Fragment>
                  <Select
                    m="md"
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
                  <Select
                    m="md"
                    label="Filter By Status"
                    value={status}
                    data={[
                      { value: "all", label: "All" },
                      { value: 1, label: "Active" },
                      { value: 0, label: "Blocked" },
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
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <TextInput
                    placeholder="Search..."
                    m="md"
                    icon={<UserSearch size={14} />}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                  />

                  <Menu
                    closeOnItemClick={false}
                    shadow="md"
                    width={200}
                    mt={matches1200 && "xl"}
                    mr="md"
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
                            { value: 1, label: "Active" },
                            { value: 0, label: "Blocked" },
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
                </React.Fragment>
              )}
            </div>
          </div>
        </Paper>

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
          title={<Title>User Details</Title>}
          opened={viewUserModal}
          onClose={() => setViewUserModal(false)}
          // variant="transparent"
          size={matches1200 ? "xl" : "md"}
          radius="md"
          centered
          shadow={0}
          padding="xl"
        >
          <ViewUserModal viewUserDetails={viewUserDetails} />
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
                      rowCount={users?.length}
                    />
                    <TableBody>
                      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 customer.slice().sort(getComparator(order, orderBy)) */}
                      {stableSort(filterString, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {row?.SR}
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
                              {row?.role ? (
                                <TableCell align="left">
                                  {row?.role === "customer"
                                    ? "Customer"
                                    : row?.role === "seller"
                                    ? "Seller"
                                    : "Admin"}
                                </TableCell>
                              ) : (
                                <TableCell align="left">
                                  User Type Missing
                                </TableCell>
                              )}
                              {row?.name && (
                                <TableCell align="left">
                                  {row?.name?.length > 15
                                    ? row?.name?.substr(0, 15) + "..."
                                    : row?.name}
                                </TableCell>
                              )}
                              <TableCell align="left">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  {row?.isEmailVerified ? (
                                    <HoverCard closeDelay={10} shadow="md">
                                      <HoverCard.Target>
                                        <ActionIcon color="green">
                                          <Check />
                                        </ActionIcon>
                                      </HoverCard.Target>
                                      <HoverCard.Dropdown>
                                        <Text color="green" size="sm">
                                          Verified Email
                                        </Text>
                                      </HoverCard.Dropdown>
                                    </HoverCard>
                                  ) : (
                                    <HoverCard closeDelay={10} shadow="md">
                                      <HoverCard.Target>
                                        <ActionIcon color="red">
                                          <Check />
                                        </ActionIcon>
                                      </HoverCard.Target>
                                      <HoverCard.Dropdown>
                                        <Text color="red" size="sm">
                                          Unverified Email
                                        </Text>
                                      </HoverCard.Dropdown>
                                    </HoverCard>
                                  )}
                                  <a
                                    href={"mailto:" + row?.email}
                                    target="_blank"
                                  >
                                    {row?.email}
                                  </a>
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  {row?.isPhoneVerified ? (
                                    <HoverCard closeDelay={10} shadow="md">
                                      <HoverCard.Target>
                                        <ActionIcon color="green">
                                          <Check />
                                        </ActionIcon>
                                      </HoverCard.Target>
                                      <HoverCard.Dropdown>
                                        <Text color="green" size="sm">
                                          Verified Phone
                                        </Text>
                                      </HoverCard.Dropdown>
                                    </HoverCard>
                                  ) : (
                                    <HoverCard closeDelay={10} shadow="md">
                                      <HoverCard.Target>
                                        <ActionIcon color="red">
                                          <Check />
                                        </ActionIcon>
                                      </HoverCard.Target>
                                      <HoverCard.Dropdown>
                                        <Text color="red" size="sm">
                                          Unverified Phone
                                        </Text>
                                      </HoverCard.Dropdown>
                                    </HoverCard>
                                  )}
                                  {row?.phone}
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                {row?.status ? (
                                  <Menu
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
                                        compact
                                        fullWidth
                                        m={0}
                                        p={0}
                                        onClick={() => {
                                          updateStatus(
                                            row?._id,
                                            row?.name,
                                            false
                                          );
                                        }}
                                      >
                                        Block
                                      </Button>
                                    </Menu.Dropdown>
                                  </Menu>
                                ) : (
                                  <Menu
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
                                        onClick={() => {
                                          updateStatus(
                                            row?._id,
                                            row?.name,
                                            true
                                          );
                                        }}
                                      >
                                        Activate
                                      </Button>
                                    </Menu.Dropdown>
                                  </Menu>
                                )}
                              </TableCell>

                              <TableCell align="left">
                                {row?.createdAt
                                  ? row?.createdAt.split("T")[0]
                                  : "N/A"}
                              </TableCell>
                              <TableCell>
                                <SimpleGrid cols={3}>
                                  <ActionIcon
                                    color="dark"
                                    variant="transparent"
                                    onClick={() => {
                                      setUserDetails(row);
                                      setViewUserModal(true);
                                    }}
                                  >
                                    <Eye color="#a905b6" />
                                  </ActionIcon>

                                  <ActionIcon
                                    color="dark"
                                    variant="transparent"
                                    onClick={() => {
                                      if (
                                        JSON.parse(
                                          localStorage.getItem("userData")
                                        )?.role === "admin"
                                      ) {
                                        navigate(
                                          `/user/updateUser/${row._id}`
                                        );
                                      } else {
                                        navigate(
                                          `/user/updateUser/${row._id}`
                                        );
                                      }
                                    }}
                                  >
                                    <Edit color="green" />
                                  </ActionIcon>

                                  <ActionIcon
                                    color="red"
                                    variant="transparent"
                                    onClick={() => deleteCustomer(row?._id)}
                                  >
                                    <Trash />
                                  </ActionIcon>
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
                  count={users?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              filterString.map((row) => {
                return (
                  <Group position="apart" p="md">
                    <div>
                      <Group noWrap>
                        <Avatar src={row.profileImage?.image} radius="md" />
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
                              {row?.status ? (
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
                          setUserDetails(row);
                          setViewUserModal(true);
                        }}
                      >
                        <Eye color="#a905b6" />
                      </ActionIcon>

                      <ActionIcon
                        color="dark"
                        variant="transparent"
                        onClick={() => {
                          console.log("Clicked on edit button");

                          if (
                            JSON.parse(localStorage.getItem("userData"))
                              ?.role === "admin"
                          ) {
                            navigate(`/user/updateUser/${row._id}`);
                          } else {
                            navigate(`/user/updateUser/${row._id}`);
                          }
                        }}
                      >
                        <Edit color="green" />
                      </ActionIcon>

                      <ActionIcon
                        color="red"
                        variant="transparent"
                        onClick={() => deleteCustomer(row?._id)}
                      >
                        <Trash />
                      </ActionIcon>
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
    </React.Fragment>
  );
};

export default ViewUsers;
