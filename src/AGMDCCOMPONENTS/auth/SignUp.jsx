import {
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Paper,
  TextInput,
  MantineProvider,
  Text,
  NativeSelect,
  PasswordInput,
  NumberInput,
  Image,
  Select,
  Radio,
  Title,
  Stack,
} from "@mantine/core";
import jwt_decode from "jwt-decode";
import { At, Id, Key, Phone, User } from "tabler-icons-react";
import { IconX, IconCheck } from "@tabler/icons";
import { Box } from "@mantine/core";
import InputMask from "react-input-mask";
import {
  cleanNotifications,
  cleanNotificationsQueue,
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import signupImage from "./assets/signupImage.png";
// import signupBGimage from "./customerIMG.svg";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../apiCallHelpers/backendURL";
import { useMediaQuery } from "@mantine/hooks";
// import FooterComponenet from "./FooterComponenet";
// BACKGROUND PICTURE
// const pictureBackground = [
//   new URL("./customerIMG1.png", import.meta.url),
//   //   new URL("./menuBackground4.png", import.meta.url),
//   //   new URL("./menuBackground5.png", import.meta.url),
//   //   new URL("./menuBackground.png", import.meta.url),
//   //   new URL("./menuBackground.png", import.meta.url),
//   //
// ];
// NAVIGATION

const SignUp = ({ setHookEmail, setHookPassword }) => {
  const matches769 = useMediaQuery("(min-width: 769px)");
  // HOOKS
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [blockedEmailField, setBlockEmailField] = useState(false);
  const [blockedUserNameField, setBlockUserNameField] = useState(false);
  const [socialSignUpEmail, setSocialSignUpEmail] = useState("");
  const [socialSignUpName, setSocailSignUpName] = useState("");
  const [socialSignUpPicture, setSocialSignupPicture] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
  );

  const [cpassword, setCPassword] = useState("");
  const [getUserTypes, setUserTypes] = useState([
    { value: "customer", label: "Customer" },
    { value: "seller", label: "Seller" },
  ]);

  const [hiddenButton, setHiddenButton] = useState(true);

  // STYLES HOOKS
  const [inputSize, setInputSize] = useState("md");
  const [paddingSize, setPaddingSize] = useState(5);
  //  USE EFFECT
  //   AXIOS POST DATA
  // SIGN UP FUNCTION
  const signUpFunction = async (values) => {
    cleanNotifications();
    cleanNotificationsQueue();
    console.log("FORM VALUES", values);
    try {
      let form_data = new FormData();
      form_data.append("name", values.name);
      form_data.append("email", values.email);
      form_data.append("phone", values.phoneNumber);
      // form_data.append("whatsapp", values.whatsappNumber);
      // form_data.append("city", values.city);
      form_data.append("state", values.state);
      form_data.append("zip", values.zipCode);
      form_data.append("password", values.password);
      form_data.append("role", values.userType);
      form_data.append("image", socialSignUpPicture);

      console.log("FORM DATA:", form_data.keys);

      const apiResponse = await axios({
        headers: {
          "Content-type": "multipart/form-data",
        },
        method: "post",
        url: `${backendURL}/user/register`,
        data: form_data,
      });
      console.log("API RESPONSE", apiResponse);

      if (true) {
        showNotification({
          color: "green",
          title: "SUCCESSFULLY SIGNED UP",
          message:
            "You have successfully signed up, we are redirecting you to the sign in page",
        });
        navigate("/login");
      } else {
        showNotification({
          color: "red",
          title: "ERROR",
          message: "Something went wrong, please try again",
        });
      }
    } catch (e) {
      showNotification({
        color: "red",
        title: "ERROR",
        message: "Something went wrong, please try again",
      });
      console.log("ERROR", e);
    }
  };

  // FORM
  const form = useForm({
    initialValues: {
      userType: "",
      email: "",
      name: "",
      phoneNumber: "",
      state: "",
      zipCode: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      userType: (value) => (value !== "" ? null : "Please Select User Type"),
      email: (value) =>
        blockedEmailField
          ? null
          : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Invalid email",

      name: (value) =>
        value !== ""
          ? blockedUserNameField
            ? null
            : /^[A-Za-z ]+$/.test(value)
            ? value.length > 2
              ? null
              : "Name Should Contain Minimum 3 characters"
            : "Name Can Contain Only alphabets"
          : null,

      password: (value) =>
        // /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
        //   value
        // )
        value !== ""
          ? null
          : "Password must be 8 characters long, contain atleast 1 upper case letter, 1 special & 1 digit",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
    zipCode: (value) => /^\d{5}(?:[-\s]\d{4})?$/.test(value),
  });

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <Paper p={0} m={0} style={{ height: "100%", width: "100%" }}>
          <Grid
            align={"center"}
            p={0}
            m={0}
            style={{
              height: "100vh",
              width: "100%",
            }}
          >
            <Grid.Col
              p={0}
              m={0}
              sm={6}
              lg={6}
              style={{
                backgroundColor: "#F7F7F7",
                borderRight: "1px solid #eaeaea",
                height: "100%",
                width: "100%",
              }}
            >
              <Stack
                justify={"center"}
                style={{ height: "100%", width: "100%" }}
              >
                <Title align="center">Welcome to Get My Dream Car</Title>
                <Text align="center">
                  A perfect place to find your dream car!
                </Text>
                <Image
                  fit="cover"
                  height={"500px"}
                  width="100%"
                  src={signupImage}
                  alt=""
                />
              </Stack>
            </Grid.Col>

            <Grid.Col
              sm={6}
              lg={6}
              style={{
                position: matches769 ? "relative" : "absolute",
                width: "100%",
              }}
              p={"xl"}
            >
              <Paper
                withBorder
                mt={"xl"}
                p={"xl"}
                style={{
                  /* From https://css.glass */
                  background: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5.8px)",
                  webkitBackdropFilter: "blur(5.8px)",
                }}
              >
                <Text align="center" size={40}>
                  Sign Up
                </Text>

                <form
                  style={{
                    padding: 0,
                    margin: 0,
                  }}
                  onSubmit={form.onSubmit((values) => signUpFunction(values))}
                >
                  <LoadingOverlay
                    loaderProps={{
                      size: "xl",
                      color: "pink",
                      variant: "bars",
                    }}
                    overlayOpacity={0.5}
                    overlayColor="#c5c5c5"
                    visible={loading}
                  />
                  {/*
    <Select
      searchable
      icon={<User />}
      py={paddingSize}
      label="Select User Type"
      required
      size={inputSize}
      placeholder={"Select User Type"}
      data={getUserTypes}
    />
*/}
                  <Radio.Group
                    // value={value}
                    // onChange={setValue}
                    py={paddingSize}
                    defaultChecked="customer"
                    defaultValue="customer"
                    label="Select User Type"
                    size={inputSize}
                    required
                    {...form.getInputProps("userType")}
                  >
                    <Radio value="customer" label="Customer" />
                    <Radio value="seller" label="Seller" />
                  </Radio.Group>

                  <Grid>
                    <Grid.Col span={12}>
                      <TextInput
                        icon={<User />}
                        py={paddingSize}
                        size={inputSize}
                        required
                        value={socialSignUpName}
                        placeholder={"Enter Name"}
                        label="Enter Name"
                        {...form.getInputProps("name")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col span={12}>
                      <TextInput
                        icon={<Phone />}
                        py={paddingSize}
                        size={inputSize}
                        required
                        placeholder="001-XXX-XXX-XXXX"
                        component={InputMask}
                        mask="001-999-999-9999"
                        label="Enter Mobile Number"
                        {...form.getInputProps("phoneNumber")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col lg={12}>
                      <TextInput
                        icon={<At />}
                        py={paddingSize}
                        size={inputSize}
                        required
                        disabled={blockedEmailField}
                        value={socialSignUpEmail}
                        label="Enter Email"
                        placeholder={
                          blockedEmailField ? socialSignUpEmail : "Enter Email"
                        }
                        {...form.getInputProps("email")}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <PasswordInput
                        icon={<Key />}
                        py={paddingSize}
                        size={inputSize}
                        placeholder="Enter Password"
                        label="Password"
                        required
                        onInput={(e) => {
                          if (e.target.value !== form.values.confirmPassword) {
                            form.setFieldError(
                              "confirmPassword",
                              "Passwords Do Not Match"
                            );
                          } else {
                            form.setFieldError("confirmPassword", "");
                          }
                        }}
                        {...form.getInputProps("password")}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <PasswordInput
                        icon={<Key />}
                        py={paddingSize}
                        // error={renderErrorMessage("cpassword")}
                        size="md"
                        required
                        label="Confirm Password"
                        // disabled={disabled}
                        placeholder="Re-Enter Password"
                        value={cpassword}
                        errorProps={(v) => {
                          return v !== password;
                        }}
                        onChange={(e) => setCPassword(e.target.value)}
                        {...form.getInputProps("confirmPassword")}
                      />
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={6}>
                      <TextInput
                        size={inputSize}
                        label="State"
                        required
                        placeholder="Enter State"
                        {...form.getInputProps("state")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      {" "}
                      <TextInput
                        size={inputSize}
                        label="Zip Code"
                        required
                        placeholder="Enter Zip Code"
                        {...form.getInputProps("zipCode")}
                      />
                    </Grid.Col>
                  </Grid>
                  <Button
                    my="md"
                    size={inputSize}
                    fullWidth
                    type="submit"
                    uppercase
                  >
                    Sign Up
                  </Button>
                </form>

                <Group mt={0} p="sm">
                  <Box
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Text component={Link} to="/" size={18}>
                      SIGN IN
                    </Text>
                  </Box>
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default SignUp;
