import React from "react";
import { userType } from "../apiCallHelpers/userDataHelper";
import ViewOrders from "../orders/ViewOrders";
import ViewPaymentsTable from "./ViewOrdersTable";

const ordersData = [
  {
    SR: 1,
    vinNo: "1FTFW1ED5MFC21640",
    customerId: "638c71cb3465369956db3dbe",
    sellerId: "638c30c9cfc7d3b6c47c9286",
    title: "Order 1",
    registration: "Registration 1",
    license: "License 1",
    warranty: "Warranty 1",
    orderStatus: "Order Status 1",
    totalPrice: 13000,
    downPayment: 3000,
    remainingAmount: 10000,
    // paymentStatus: "paid",
    // paymentStatus: "unpaid",
    paymentStatus: "processed",
  },
];
const ViewPayments = ({ setCurrentLocation }) => {
  return (
    <div>
      {userType() === "admin" && (
        <ViewPaymentsTable
          setCurrentLocation={setCurrentLocation}
          orders={ordersData}
        />
      )}
      {userType() === "seller" && (
        <ViewOrders setCurrentLocation={setCurrentLocation} hideStatus={true} />
      )}
    </div>
  );
};

export default ViewPayments;
