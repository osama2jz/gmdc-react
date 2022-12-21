import { Badge, Grid, Text } from "@mantine/core";
import React from "react";

const ViewOrderModal = ({ orderDetails }) => {
  console.log("ORDER DETAILS", orderDetails);
  return (
    <div>
      <Grid>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text weight={"bold"}>ITEM</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text weight={"bold"}>VALUE</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>VIN #</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.vinNo}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Customer</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.customerId}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Seller</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.sellerId}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Registration #</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.registration}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>License </Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.license}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Warranty </Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.warranty}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Order Status </Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.orderStatus}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Total Price</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.totalPrice.toLocaleString()}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Down Payment</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.downPayment.toLocaleString()}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Remaining Amount</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>{orderDetails.remainingAmount.toLocaleString()}</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Payment Status</Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Badge
            size="lg"
            color={
              orderDetails.paymentStatus === "paid"
                ? "green"
                : orderDetails.paymentStatus === "unpaid"
                ? "yellow"
                : "blue"
            }
          >
            <Text>{orderDetails.paymentStatus}</Text>
          </Badge>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ViewOrderModal;

//     license: {
//       type: String,
//       required: [true, "Please add a License"],
//     },
//     warranty: {
//       type: String,
//       required: [true, "Please add a Warranty"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Please add Price"],
//     },

//     status: {
//       type: String,
//       default: "new",
//     },
//   },
