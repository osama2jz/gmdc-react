// routes
import { BrowserRouter as Router } from "react-router-dom";
// import R from './routes'

import { Routes, Route } from "react-router-dom";
import AddUser from "./AGMDCCOMPONENTS/User/AddUser";
import AddVehicle from "./AGMDCCOMPONENTS/Vehical/AddVehicle";
import Home from "./pages/Home/Home";
import BrokenPage from "./AGMDCCOMPONENTS/MissingLinks/BrokenPage";
import ViewUser from "./AGMDCCOMPONENTS/User/ViewUser";
import ViewVehicals from "./AGMDCCOMPONENTS/Vehical/ViewVehicals";
import AddOrder from "./AGMDCCOMPONENTS/orders/AddOrder";
import ViewOrders from "./AGMDCCOMPONENTS/orders/ViewOrders";
import AddPayment from "./AGMDCCOMPONENTS/payments/AddPayment";
import ViewPayments from "./AGMDCCOMPONENTS/payments/ViewPayments";
import ViewPaidOrders from "./AGMDCCOMPONENTS/orders/ViewPaidOrders";
import ViewProcessedOrders from "./AGMDCCOMPONENTS/orders/ViewProcessedOrders";
import EditProfile from "./AGMDCCOMPONENTS/settings/EditProfile";
import Dashboard from "./AGMDCCOMPONENTS/DashBoard/Dashboard";
import Login from "./AGMDCCOMPONENTS/auth/Login";
import ProtectedRoutes from "./AGMDCCOMPONENTS/protectedRoutes/ProtectedRoutes";
import SignUp from "./AGMDCCOMPONENTS/auth/SignUp";
import ForgotPassword from "./AGMDCCOMPONENTS/auth/ForgotPassword";
import Car360View from "./AGMDCCOMPONENTS/Car360View";
import CustomerDashboard from "./AGMDCCOMPONENTS/CustomerDashboardComponenets/CustomerDashboard";
import { useState } from "react";
import routeNames from "./routes/routeNames";
import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
import ViewCar from "./pages/ViewCar";
import ApplyOnline from "./pages/ApplyOnline";
import AboutUs from "./pages/AboutUs";
import Page404 from "./pages/Page404";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AddHeaderFooter = ({ Component }) => {
  return (
    <>
      <Header />
      {Component}
      <Footer />
    </>
  );
};

export default function App() {
  // useEffect(() => {
  //    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  // }, [lang]);
  const [currentLocation, setCurrentLocation] = useState("Dashbaord");
  return (
    <Router>
      <Routes>
        <Route
          path={routeNames.general.landing}
          element={<AddHeaderFooter Component={<Landing />} />}
        />
        <Route
          path={routeNames.general.inventory}
          element={<AddHeaderFooter Component={<Inventory />} />}
        />
        <Route
          path={routeNames.general.inventory2}
          element={<AddHeaderFooter Component={<Inventory />} />}
        />
        <Route
          path={routeNames.general.inventory3}
          element={<AddHeaderFooter Component={<Inventory />} />}
        />
        <Route
          path={routeNames.general.viewCar}
          element={<AddHeaderFooter Component={<ViewCar />} />}
        />
        <Route
          path={routeNames.general.apply}
          element={<AddHeaderFooter Component={<ApplyOnline />} />}
        />
        <Route
          path={routeNames.general.aboutUs}
          element={<AddHeaderFooter Component={<AboutUs />} />}
        />

        <Route path="/testingShah" element={<Car360View />} />
        <Route path="/testingShah" element={<Car360View />} />
        <Route path="/testingShah" element={<Car360View />} />
        <Route path="/testingShah" element={<Car360View />} />
        <Route path="/testingShah" element={<Car360View />} />
        <Route path="/testingShah" element={<Car360View />} />

        <Route
          path="/login"
          element={<AddHeaderFooter Component={<Login />} />}
        />
        <Route
          path="/login/:redirect"
          element={<AddHeaderFooter Component={<Login />} />}
        />
        <Route
          path="/signup"
          element={<AddHeaderFooter Component={<SignUp />} />}
        />
        <Route
          path="/:password-reset"
          element={<AddHeaderFooter Component={<ForgotPassword />} />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route
            path="/user/"
            element={<Home currentLocation={currentLocation} />}
          >
            <Route
              path="/user/"
              element={<Dashboard setCurrentLocation={setCurrentLocation} />}
            />

            <Route
              path="/user/viewUsers"
              element={<ViewUser setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/viewvehicals"
              element={<ViewVehicals setCurrentLocation={setCurrentLocation} />}
            />

            <Route
              path="/user/addUser"
              element={<AddUser setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/updateUser/:userId"
              element={<AddUser setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/addVehicle"
              element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/updateVehicle/:vehicleId"
              element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/addOrder"
              element={<AddOrder setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/updateOrder/:orderId"
              element={<AddOrder setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/viewOrder"
              element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/viewPaidOrders"
              element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/viewProcessedOrders"
              element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/addPayment"
              element={<AddPayment setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/addPayment/:status/:orderId"
              element={<AddPayment setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/viewPayments"
              element={<ViewPayments setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/user/viewPaidPayments"
              element={<ViewPayments setCurrentLocation={setCurrentLocation} />}
            />

            <Route
              path="/user/editProfile"
              element={<EditProfile setCurrentLocation={setCurrentLocation} />}
            />
            <Route path="/user/dashboard" element={<CustomerDashboard />}>
              <Route
                path="dashboard"
                element={<Dashboard setCurrentLocation={setCurrentLocation} />}
              />

              <Route
                path="profile"
                element={
                  <EditProfile setCurrentLocation={setCurrentLocation} />
                }
              />
            </Route>

            <Route path="/user/*" element={<BrokenPage />} />
          </Route>
        </Route>

        <Route
          path="/user/"
          element={<Home currentLocation={currentLocation} />}
        >
          <Route
            path="/user/"
            element={<Dashboard setCurrentLocation={setCurrentLocation} />}
          />

          <Route
            path="/user/viewUsers"
            element={<ViewUser setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/viewvehicals"
            element={<ViewVehicals setCurrentLocation={setCurrentLocation} />}
          />

          <Route
            path="/user/addUser"
            element={<AddUser setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/updateUser/:userId"
            element={<AddUser setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/addVehicle"
            element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/updateVehicle/:vehicleId"
            element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/addOrder"
            element={<AddOrder setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/updateOrder/:orderId"
            element={<AddOrder setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/viewOrder"
            element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/viewPaidOrders"
            element={<ViewPaidOrders setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/viewProcessedOrders"
            element={
              <ViewProcessedOrders setCurrentLocation={setCurrentLocation} />
            }
          />
          <Route
            path="/user/addPayment"
            element={<AddPayment setCurrentLocation={setCurrentLocation} />}
          />
          <Route
            path="/user/viewPayments"
            element={<ViewPayments setCurrentLocation={setCurrentLocation} />}
          />

          <Route
            path="/user/editProfile"
            element={<EditProfile setCurrentLocation={setCurrentLocation} />}
          />
          <Route path="/user/*" element={<BrokenPage />} />
        </Route>

        <Route
          path="/customer/"
          element={<Home currentLocation={currentLocation} />}
        >
          <Route path="/customer/" element={<Dashboard />} />
          <Route path="/customer/orders" element={<ViewOrders />} />
          <Route path="/customer/profile" element={<EditProfile />} />
        </Route>
        {/*</Route>*/}
      </Routes>
    </Router>
  );
}
