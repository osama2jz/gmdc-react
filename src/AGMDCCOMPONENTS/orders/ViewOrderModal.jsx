import { Badge, Grid, Text } from "@mantine/core";
import React from "react";
import { userType } from "../apiCallHelpers/userDataHelper";

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
          <Text>{orderDetails?.vinNo}</Text>
        </Grid.Col>
        {userType() === "admin" && (
          <>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Customer</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>{orderDetails?.customer?.name || "No Customer"}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Seller</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>{orderDetails?.sellerId?.name || "No Seller"}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Vehicle Price</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.vehiclePrice}</Text>
            </Grid.Col>
          </>
        )}

        {userType() !== "seller" && (
          <>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Title Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.titleFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Registration Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.registrationFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>GAP Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.licenseFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Warranty Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.warrantyFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Lean Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.leanFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Sales Tax</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>
                {orderDetails?.salesTax
                  ? orderDetails?.salesTax?.toFixed(2)
                  : 0}
              </Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Freight Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.freightFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Amount Financed (From Bank)</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.inspectionFee}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Dealer Fee</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.dealerFee}</Text>
            </Grid.Col>
          </>
        )}
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Order Status </Text>
        </Grid.Col>
        <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Badge
            size="lg"
            color={
              orderDetails?.paymentStatus === "paid"
                ? "green"
                : orderDetails?.paymentStatus === "unpaid"
                ? "yellow"
                : "blue"
            }
          >
            <Text>{orderDetails?.status}</Text>
          </Badge>
        </Grid.Col>
        {userType() !== "seller" && (
          <>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Total Price</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.totalPrice?.toLocaleString()}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Down Payment</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Rs. {orderDetails?.downPayment?.toLocaleString()}</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>Remaining Amount</Text>
            </Grid.Col>
            <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
              <Text>
                Rs. {orderDetails?.remainingPayment?.toLocaleString()}
              </Text>
            </Grid.Col>
          </>
        )}
        {/* <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Text>Payment Status</Text>
        </Grid.Col> */}
        {/* <Grid.Col style={{ border: "1px solid #e6e6e6" }} lg={6}>
          <Badge
            size="lg"
            color={
              orderDetails?.paymentStatus === "paid"
                ? "green"
                : orderDetails?.paymentStatus === "unpaid"
                ? "yellow"
                : "blue"
            }
          >
            <Text>{orderDetails?.status}</Text>
          </Badge>
        </Grid.Col> */}
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
