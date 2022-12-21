import {
  Button,
  Center,
  Group,
  MantineProvider,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit } from "tabler-icons-react";
import { axiosPost } from "../apiCallHelpers/axiosCall";
import { backendURL } from "../apiCallHelpers/backendURL";

const ForgotPassword = () => {
  const navigate = useNavigate();
  let urlParamas = new URLSearchParams(window.location.search);
  let id = urlParamas.get("id");
  let token = urlParamas.get("token");
  console.log("id:", id);
  console.log("token:", token);

  //   FORM
  const forgotPasswordFormStep3 = useForm({
    validateInputOnChange: true,
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      newPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  const updatePasswordMethod = async (values) => {
    console.log(
      "URL",
      `${backendURL}api/v1/auth/reset-password/${id}/${token}`
    );
    try {
      const response = await axios.post(
        `${backendURL}api/v1/auth/reset-password/${id}/${token}`,
        {
          password: values.newPassword,
        }
      );

      console.log(response);
      if (response.data.success) {
        showNotification({
          title: "SUCCESS",
          color: "green",
          message: "New Password Successfully Set",
        });
        forgotPasswordFormStep3.reset();
        navigate("/login");
      } else {
        showNotification({
          title: "ERROR",
          color: "Yellow",
          message: "Will see what this is",
        });
      }
    } catch (e) {
      showNotification({
        title: "ERROR",
        color: "red",
        message: "Sorry this action is not possible!",
      });
      console.error(e);
    }
  };
  return (
    <MantineProvider>
      <NotificationsProvider>
        <Paper style={{ height: "100%", width: "100%" }}>
          <Title align="center" my={"xl"}>
            GMDC Forgot password
          </Title>
          <Center>
            <Paper
              p={"xl"}
              withBorder
              style={{
                width: "400px",
                alignSelf: "center",
                /* From https://css.glass */
                background: "rgba(255, 255, 255, 0.75)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5.8px)",
                webkitBackdropFilter: "blur(5.8px)",
              }}
            >
              <form
                onSubmit={forgotPasswordFormStep3.onSubmit((values) =>
                  updatePasswordMethod(values)
                )}
              >
                <PasswordInput
                  size="md"
                  placeholder="New Password"
                  label="New Password"
                  required
                  onInput={(event) => {
                    if (
                      event.target.value !==
                      forgotPasswordFormStep3.values.confirmPassword
                    ) {
                      forgotPasswordFormStep3.setFieldError(
                        "confirmPassword",
                        "Passwords do not match"
                      );
                    } else {
                      forgotPasswordFormStep3.setFieldError(
                        "confirmPassword",
                        ""
                      );
                    }
                  }}
                  {...forgotPasswordFormStep3.getInputProps("newPassword")}
                />
                <PasswordInput
                  size="md"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  required
                  onInput={(event) => {}}
                  {...forgotPasswordFormStep3.getInputProps("confirmPassword")}
                />
                <Group position="right">
                  <Button
                    className="button"
                    my="md"
                    size="md"
                    type="submit"
                    uppercase
                    disabled={
                      forgotPasswordFormStep3.values.confirmPassword &&
                      forgotPasswordFormStep3.values.newPassword &&
                      forgotPasswordFormStep3.values.newPassword &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                        forgotPasswordFormStep3.values.newPassword
                      ) &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                        forgotPasswordFormStep3.values.confirmPassword
                      ) &&
                      forgotPasswordFormStep3.values.newPassword ===
                        forgotPasswordFormStep3.values.confirmPassword
                        ? false
                        : true
                    }
                    rightIcon={<Edit />}
                  >
                    Update Password
                  </Button>
                </Group>
              </form>
            </Paper>
          </Center>
        </Paper>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default ForgotPassword;
