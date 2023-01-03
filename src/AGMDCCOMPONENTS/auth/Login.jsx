// IMPORTS
import { Center, Image, Modal, Stack, Title } from "@mantine/core";

import { At, Key } from "tabler-icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// import signupBGimage from "./customerIMG.svg";
import { useForm } from "@mantine/form";
import axios from "axios";

// import { login } from "../../features/user";
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  MantineProvider,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";

import {
  cleanNotifications,
  cleanNotificationsQueue,
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

import loginImage from "./assets/loginImg.png";
import { backendURL } from "../apiCallHelpers/backendURL";
import { useMediaQuery } from "@mantine/hooks";
// NAVIGATION
const Login = ({ email, password }) => {
  const params = useParams();
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotPasswordSendEmailButton, setForgotPasswordSendEmailButton] =
    useState(false);
  const matches769 = useMediaQuery("(min-width: 769px)");
  let navigate = useNavigate();
  // HOOKS
  const [visible, setVisible] = useState(false);
  const [getUserType, setUserType] = useState("");
  const [inputSize, setInputSize] = useState("md");
  const [paddingSize, setPaddingSize] = useState(5);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(email);
  // FORM
  const form = useForm({
    initialValues: {
      userType: getUserType,
      email: email,
      password: password,
    },

    validate: {
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Invalid email",
      password: (value) => (value !== "" ? null : "Password is required"),
    },
  });

  // SIGN IN FUNCTION
  const signInFunction = async (values) => {
    cleanNotifications();
    cleanNotificationsQueue();
    setVisible(true);
    console.log("Values passed to function: ", values);
    let email = values.email;
    let password = values.password;

    try {
      const apiResponse = await axios({
        method: "post",
        url: `${backendURL}/auth`,
        data: {
          email: email,
          password: password,
        },
      });
      console.log("API RESPONSE: ", apiResponse);

      if (apiResponse?.data?.success === true) {
        const response = apiResponse.data.data;
        if (response.role === "admin") {
          localStorage.setItem("userData", JSON.stringify(response));
          navigate("/user");
          showNotification({
            title: "SUCCESS",
            color: "green",
            message: "LOGIN SUCCESSFUL",
          });
        } else if (response.role === "seller") {
          localStorage.setItem("userData", JSON.stringify(response));
          navigate("/user");
          showNotification({
            title: "SUCCESS",
            color: "green",
            message: "LOGIN SUCCESSFUL",
          });
          setVisible(false);
        } else if (response.role === "customer") {
          localStorage.setItem("userData", JSON.stringify(response));
          params.redirect === "redirect"
            ? navigate("/apply")
            : navigate("/customer/");
          showNotification({
            title: "SUCCESS",
            color: "green",
            message: "LOGIN SUCCESSFUL",
          });
          setVisible(false);
        } else if (apiResponse?.data?.success === false) {
          showNotification({
            title: "CREDENTIALS ERROR",
            color: "Yellow",
            message: "Invalid email or password",
          });
          setVisible(false);
        } else {
          showNotification({
            title: "ERROR",
            color: "red",
            message: "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
          });
          setVisible(false);
        }
        setVisible(false);
      }
      setVisible(false);
    } catch (error) {
      if (error.response?.data?.data === "Invalid Password") {
        showNotification({
          title: "CREDENTIALS ERROR",
          color: "yellow",
          message: "Invalid PASSWORD",
        });
        form.setFieldError("password", "Invalid password");
      } else if (error.response?.data?.data === "Email address not found") {
        showNotification({
          title: "CREDENTIALS ERROR",
          color: "yellow",
          message: "Invalid EMAIL",
        });
        form.setFieldError("email", "Invalid email");
      } else if (error.response?.data?.data === "inactive") {
        showNotification({
          title: "User Blocked",
          color: "red",
          message: "Sorry but this user is blocked",
        });
        form.setFieldError("email", "User access blocked, contact admin");
      }
      // showNotification({
      //   title: "ERROR",
      //   color: "red",
      //   message: `${error.response.data.data}`,
      // });
      setVisible(false);
      console.error(error);
    }
    setVisible(false);
  };

  // FORGOT PASSWORD FUNCTION
  const forgotPasswordFormStep1 = useForm({
    initialValues: {
      forgotPasswordEmail: "",
    },
    validate: {
      forgotPasswordEmail: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Invalid email",
    },
  });
  // FORGOT PASSWORD STEP 1
  const forPasswordStep1 = async (values) => {
    setForgotPasswordSendEmailButton(true);
    try {
      const response = await axios.post(`${backendURL}/auth/forget-password`, {
        email: values.forgotPasswordEmail,
      });
      console.log("RESPONSE: ", response);
      console.log("RESPONSE.data: ", response.data);
      if (response.data.success) {
        setForgotPasswordSendEmailButton(false);
        setForgotPasswordModal(false);
        showNotification({
          title: "SUCCESS",
          color: "green",
          message: `Email sent on ${values.forgotPasswordEmail} successfully`,
        });

        // console.log("RESPONSE", response.data.data)
      } else if (response.data.response.data.success === false) {
        setForgotPasswordSendEmailButton(false);
        forgotPasswordFormStep1.setFieldError(
          "forgotPasswordEmail",
          "This email is invalid"
        );
      } else {
        setForgotPasswordSendEmailButton(false);
        showNotification({
          title: "ERROR",
          color: "red",
          message: "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
        });
      }
      setForgotPasswordSendEmailButton(false);
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        showNotification({
          title: "ERROR",
          color: "red",
          message: "You have entered an invalid email",
        });
        forgotPasswordFormStep1.setFieldError(
          "forgotPasswordEmail",
          "This email is not registered"
        );
        setForgotPasswordSendEmailButton(false);
      }
    }
    setForgotPasswordSendEmailButton(false);
  };

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <Modal
          closeOnClickOutside={false}
          size={"xl"}
          title={<Title>Forgot Password</Title>}
          opened={forgotPasswordModal}
          onClose={() => {
            setForgotPasswordModal(false);
            setForgotPasswordSendEmailButton(false);
            forgotPasswordFormStep1.setValues({ forgotPasswordEmail: "" });
          }}
        >
          <form
            onSubmit={forgotPasswordFormStep1.onSubmit((values) => {
              console.log("Values: ", values);
              forPasswordStep1(values);
            })}
          >
            <TextInput
              icon={<At />}
              size={inputSize}
              py={paddingSize}
              label="Enter Email"
              placeholder="Enter Email"
              required
              {...forgotPasswordFormStep1.getInputProps("forgotPasswordEmail")}
            />

            <Group position="right" mt="sm">
              <Button
                loading={
                  forgotPasswordSendEmailButton
                    ? forgotPasswordSendEmailButton
                    : false
                }
                rightIcon={<At />}
                size={inputSize}
                type="submit"
                uppercase
              >
                Submit email
              </Button>
            </Group>
          </form>
        </Modal>
        {/* REST OF THE PAGE */}
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
                <Title align="center">Welcome to Get My Dream Ride</Title>
                <Text align="center">
                  A perfect place to find your dream car!
                </Text>
                <Image
                  fit="cover"
                  height={"500px"}
                  width="100%"
                  src={loginImage}
                  alt=""
                />
              </Stack>
            </Grid.Col>
            <Grid.Col
              sm={6}
              lg={6}
              style={{
                height: "100%",
                width: "100%",

                position: matches769 ? "relative" : "absolute",
                top: matches769 ? "0px" : "100px",
              }}
              p={"xl"}
            >
              <Center style={{ height: "100%", width: "100%" }}>
                <Paper
                  withBorder
                  mt={"xl"}
                  p={"xl"}
                  style={{
                    width: "100%",
                    /* From https://css.glass */
                    background: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5.8px)",
                    webkitBackdropFilter: "blur(5.8px)",
                  }}
                >
                  <Text align="center" size={40}>
                    Sign In
                  </Text>

                  <form
                    style={{ padding: 0, margin: 0 }}
                    onSubmit={form.onSubmit((values) => signInFunction(values))}
                  >
                    <LoadingOverlay
                      loaderProps={{
                        size: "xl",
                        color: "pink",
                        variant: "bars",
                      }}
                      overlayOpacity={0.5}
                      overlayColor="#c5c5c5"
                      visible={visible}
                    />
                    <TextInput
                      icon={<At />}
                      size={inputSize}
                      py={paddingSize}
                      label="Enter Email Address"
                      placeholder="Enter Email Address"
                      required
                      value={forgotPasswordEmail}
                      onInput={(e) =>
                        setForgotPasswordEmail(e.currentTarget.value)
                      }
                      {...form.getInputProps("email")}
                    />
                    <PasswordInput
                      icon={<Key />}
                      py={paddingSize}
                      size={inputSize}
                      placeholder="Enter Password"
                      label="Password"
                      required
                      {...form.getInputProps("password")}
                    />
                    <Button
                      my="md"
                      size={inputSize}
                      uppercase
                      fullWidth
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </form>

                  <Group mt={0} p="sm" position="apart">
                    <Box
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        component={Link}
                        to="/signup"
                        // onClick={() => {
                        //   setModalEmail("");
                        //   setModalPhoneNumber("");
                        //   setUserType("");
                        //   setVerificationCode("");
                        // navigate("/signup");
                        // }}
                        size={18}
                      >
                        SIGN UP
                      </Text>
                    </Box>
                    <Box
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        size={18}
                        onClick={() => {
                          setForgotPasswordModal(true);
                        }}
                      >
                        FORGOT PASSWORD?
                      </Text>
                    </Box>
                  </Group>
                </Paper>
              </Center>
            </Grid.Col>
          </Grid>
        </Paper>
      </NotificationsProvider>
    </MantineProvider>
  );
};
export default Login;
