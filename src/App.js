// routes
import { BrowserRouter as Router } from 'react-router-dom'
// import R from './routes'

import { Routes, Route } from 'react-router-dom'
import AddUser from './AGMDCCOMPONENTS/User/AddUser'
import AddVehicle from './AGMDCCOMPONENTS/Vehical/AddVehicle'
import Home from './pages/Home/Home'
import BrokenPage from './AGMDCCOMPONENTS/MissingLinks/BrokenPage'
import ViewUser from './AGMDCCOMPONENTS/User/ViewUser'
import ViewVehicals from './AGMDCCOMPONENTS/Vehical/ViewVehicals'
import AddOrder from './AGMDCCOMPONENTS/orders/AddOrder'
import ViewOrders from './AGMDCCOMPONENTS/orders/ViewOrders'
import AddPayment from './AGMDCCOMPONENTS/payments/AddPayment'
import ViewPayments from './AGMDCCOMPONENTS/payments/ViewPayments'
import ViewPaidOrders from './AGMDCCOMPONENTS/orders/ViewPaidOrders'
import ViewProcessedOrders from './AGMDCCOMPONENTS/orders/ViewProcessedOrders'
import EditProfile from './AGMDCCOMPONENTS/settings/EditProfile'
import Dashboard from './AGMDCCOMPONENTS/DashBoard/Dashboard'
import Login from './AGMDCCOMPONENTS/auth/Login'
import ProtectedRoutes from './AGMDCCOMPONENTS/protectedRoutes/ProtectedRoutes'
import SignUp from './AGMDCCOMPONENTS/auth/SignUp'
import ForgotPassword from './AGMDCCOMPONENTS/auth/ForgotPassword'
import Car360View from './AGMDCCOMPONENTS/Car360View'
import CustomerDashboard from './AGMDCCOMPONENTS/CustomerDashboardComponenets/CustomerDashboard'
import { useState } from 'react'
import routeNames from './routes/routeNames'
import Landing from './pages/Landing'
import Inventory from './pages/Inventory'
import ViewCar from './pages/ViewCar'
import ApplyOnline from './pages/ApplyOnline'
import AboutUs from './pages/AboutUs'
import Page404 from './pages/Page404'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  // useEffect(() => {
  //    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  // }, [lang]);
  const [currentLocation, setCurrentLocation] = useState('Dashbaord')
  return (
    <>
      <Header />

      <Router>
        <Routes>
          <Route path={routeNames.general.landing} element=<Landing /> />
          <Route path={routeNames.general.inventory} element=<Inventory /> />
          <Route path={routeNames.general.inventory2} element=<Inventory /> />
          <Route path={routeNames.general.inventory3} element=<Inventory /> />
          <Route path={routeNames.general.viewCar} element=<ViewCar /> />
          <Route path={routeNames.general.apply} element=<ApplyOnline /> />
          <Route path={routeNames.general.aboutUs} element=<AboutUs /> />
          <Route path={routeNames.general.notFound} element=<Page404 /> />

          <Route path="/testingShah" element={<Car360View />} />
          <Route path="/testingShah" element={<Car360View />} />
          <Route path="/testingShah" element={<Car360View />} />
          <Route path="/testingShah" element={<Car360View />} />
          <Route path="/testingShah" element={<Car360View />} />
          <Route path="/testingShah" element={<Car360View />} />

          <Route path="/login" element={<Login />} />
          <Route path="/:password-reset" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/admin/"
              element={<Home currentLocation={currentLocation} />}
            >
              <Route
                path="/admin/"
                element={<Dashboard setCurrentLocation={setCurrentLocation} />}
              />

              <Route
                path="/admin/viewUsers"
                element={<ViewUser setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/viewvehicals"
                element={
                  <ViewVehicals setCurrentLocation={setCurrentLocation} />
                }
              />

              <Route
                path="/admin/addUser"
                element={<AddUser setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/updateUser/:userId"
                element={<AddUser setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/addVehicle"
                element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/updateVehicle/:vehicleId"
                element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/addOrder"
                element={<AddOrder setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/updateOrder/:orderId"
                element={<AddOrder setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/viewOrder"
                element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/viewPaidOrders"
                element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/viewProcessedOrders"
                element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/addPayment"
                element={<AddPayment setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/addPayment/:status/:orderId"
                element={<AddPayment setCurrentLocation={setCurrentLocation} />}
              />
              <Route
                path="/admin/viewPayments"
                element={
                  <ViewPayments setCurrentLocation={setCurrentLocation} />
                }
              />
              <Route
                path="/admin/viewPaidPayments"
                element={
                  <ViewPayments setCurrentLocation={setCurrentLocation} />
                }
              />

              <Route
                path="/admin/editProfile"
                element={
                  <EditProfile setCurrentLocation={setCurrentLocation} />
                }
              />
              <Route path="/admin/dashboard" element={<CustomerDashboard />}>
                <Route
                  path="dashboard"
                  element={
                    <Dashboard setCurrentLocation={setCurrentLocation} />
                  }
                />

                <Route
                  path="profile"
                  element={
                    <EditProfile setCurrentLocation={setCurrentLocation} />
                  }
                />
              </Route>

              <Route path="/admin/*" element={<BrokenPage />} />
            </Route>
          </Route>

          <Route
            path="/seller/"
            element={<Home currentLocation={currentLocation} />}
          >
            <Route
              path="/seller/"
              element={<Dashboard setCurrentLocation={setCurrentLocation} />}
            />

            <Route
              path="/seller/viewUsers"
              element={<ViewUser setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/viewvehicals"
              element={<ViewVehicals setCurrentLocation={setCurrentLocation} />}
            />

            <Route
              path="/seller/addUser"
              element={<AddUser setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/updateUser/:userId"
              element={<AddUser setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/addVehicle"
              element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/updateVehicle/:vehicleId"
              element={<AddVehicle setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/addOrder"
              element={<AddOrder setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/updateOrder/:orderId"
              element={<AddOrder setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/viewOrder"
              element={<ViewOrders setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/viewPaidOrders"
              element={
                <ViewPaidOrders setCurrentLocation={setCurrentLocation} />
              }
            />
            <Route
              path="/seller/viewProcessedOrders"
              element={
                <ViewProcessedOrders setCurrentLocation={setCurrentLocation} />
              }
            />
            <Route
              path="/seller/addPayment"
              element={<AddPayment setCurrentLocation={setCurrentLocation} />}
            />
            <Route
              path="/seller/viewPayments"
              element={<ViewPayments setCurrentLocation={setCurrentLocation} />}
            />

            <Route
              path="/seller/editProfile"
              element={<EditProfile setCurrentLocation={setCurrentLocation} />}
            />
            <Route path="/seller/*" element={<BrokenPage />} />
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
      <Footer />
    </>
  )
}
