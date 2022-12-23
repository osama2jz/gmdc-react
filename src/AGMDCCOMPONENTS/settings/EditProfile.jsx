import React, { useEffect } from "react";
import { useState } from "react";
import storage from "../FB";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  Title,
  Button,
  PasswordInput,
  TextInput,
  NativeSelect,
  LoadingOverlay,
  Center,
  Avatar,
  Progress,
  Input,
  Image,
  Group,
  Accordion,
  Text,
  Loader,
  NumberInput,
} from "@mantine/core";
import { Modal, useMantineTheme } from "@mantine/core";
import InputMask from "react-input-mask";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

import axios from "axios";
import {
  IconEdit,
  IconKey,
  IconTrash,
  IconTrashOff,
  IconX,
} from "@tabler/icons";
import { backendURL } from "../apiCallHelpers/backendURL";
import { getHeader } from "../apiCallHelpers/headers";
import { Phone } from "tabler-icons-react";

// COMPONNET
const EditProfile = () => {
  // CURRENT LOCATION
  // NAVIGATE STATE
  const [id, setId] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [opened, setOpened] = useState(false);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  const [refresh3, setRefresh3] = useState(true);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [changepwdVisible, setChangepwdVisible] = useState(false);
  // PASSWORD HOOKS
  const [getCurrentPassword, setCurrentPassword] = useState("");
  const [getNewPassword, setNewPassword] = useState("");
  const [getConfirmPassword, setConfirmPassword] = useState("");
  // const [urls, setUrls] = useState(PROFILEIMAGE);
  const [myDetails, setMyDetails] = useState();

  const [urls, setUrls] = useState();
  const [profileData, setProfileData] = useState({});
  const fetchAllMyDetails = async () => {};
  console.log("PROFILE DATA: ", profileData);
  const fetchUserDetails = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${backendURL}/user/me`,
        headers: getHeader(),
      });
      console.log("RES: ", res.data?.data);

      if (res.data.success) {
        console.log("RES in success: ", res.data?.data);
        let response = res.data?.data;
        setMyDetails(response);
        // setRefresh(false);
        // setVisible(false);
        setId(response?._id);
        setUrls(response?.profileImage);
        form.setFieldValue("name", response?.name);
        form.setFieldValue("email", response?.email);
        form.setFieldValue("phone", response?.phone);
        form.setFieldValue("state", response?.state);
        form.setFieldValue("zip", response?.zip);
        setImages([response?.profileImage?.image]);
    

        return response;
      } else {
        alert("Error");
      }
    } catch (e) {
      console.log("ERROR in fetching all venues:", e);
    }
  };
  useEffect(() => {
    fetchUserDetails().then(setProfileData);
  }, []);
  const previews = images?.map((file, index) => {
    let imageUrl;
    console.log("USER PROFILE IMAGE", file);
    try {
      imageUrl = URL.createObjectURL(file);
    } catch (e) {
      imageUrl = file;
    }
    return (
      <div>
        <Avatar
          key={index}
          src={imageUrl}
          size={140}
          radius={120}
          mx="auto"
          imageProps={{
            onLoad: () => URL.revokeObjectURL(imageUrl),
          }}
        />
      </div>
    );
  });

  // NAVIGATE
  let navigate = useNavigate();

  // FORM
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      phone: "",
      state: "",
      zip: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) =>
        value.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Invalid Email",

      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      cpassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      name: (value) =>
        value.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value.trim())
          ? null
          : "Alphabetic Name with 2 or more characters",
      phone: (value) =>
        // /^(03)(\d{9})$/.test(value)
        value.length > 0 ? null : "Please Enter Valid Phone Number",

      state: (value) =>
        value.trim().length > 2 && /^[a-zA-Z\s]*$/.test(value.trim())
          ? null
          : "Alphabetic State with 3 or more characters",

      zip: (value) =>
        value?.length > 1 && /^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/.test(value.trim())
          ? null
          : "Numeric Zip of Proper Format",
      currentPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      newPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? // ? values.currentPassword !== value
            null
          : // : "The current password and new password cant be the same"
            "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });
  // EDIT PASSWORD FORM
  const form1 = useForm({
    validateInputOnChange: true,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      currentPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      newPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? values.currentPassword !== value
            ? null
            : "The current password and new password cant be the same"
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });
  // FORM SUBMIT
  const handleSubmit = async (event) => {
    setVisible(true);
    setLoading(true);
    var { name, phone, state, zip } = event;
    // console.log(event);

    const body = {
      name: name,
      phone: phone,
      image: images[0],
      profileImage: {
        image: images[0],
        imageId: images[0],
      },
      zip: zip,
      state: state,
    };
    console.log("BODY INSIDE PATCH: ", body);

    try {
      const response = await axios({
        method: "put",
        url: `${backendURL}/user/update_profile/${id}`,
        data: body,
        headers: getHeader(),
      });

      console.log("RESPONSE OBJECT: ", response);
      setLoading(false);

      if (!response.data.success) {
        setVisible(false);
        console.log("ERROR: ", response.data.message);
        showNotification({
          title: `${response.data.error}`,
          color: "red",
          message: `${response.data.message}`,
        });
        setVisible(false);
      } else if (response.data.success) {
        showNotification({
          title: `SUCCESS`,
          color: "green",
          message: `DETAILS UPDATED SUCCESSFULLY!!`,
        });

        setVisible(false);
        navigate("/admin/");
      } else {
        showNotification({
          title: "THIS ERROR SHOULD NOT HAVE OCCURRED",
          color: "red",
          message: "DONT KNOW WHAT WENT WRONG!",
        });
        setVisible(false);
      }
    } catch (err) {
      console.log("TRY CATCH ERROR: ", err);
    }
  };

  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
    }
  };

  const updatePasswordMethod = async (values) => {
    setChangepwdVisible(true);
    try {
      const data = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.getItem("customerToken"),
      };
      const response = await axios({
        method: "patch",
        url: `https://a-wep.herokuapp.com/auth/user/updatePassword`,
        data: data,
        headers: headers,
      });
      console.log(response);
      if (response.data.status === "success") {
        console.log("hello success", response.data);
        showNotification({
          title: "SUCCESS",
          color: "green",
          message: "PASSWORD UPDATED SUCCESSFULLY",
        });
        form1.reset();
        setChangepwdVisible(false);
        setRefresh3(!refresh3);
      } else if (response.data.status === "error") {
        console.log("hello errors", response.data);
        showNotification({
          title: "INVALID PASSWORD",
          color: "yellow",
          message:
            "PASSWORD COULD NOT BE UPDATED BECAUSE YOU HAVE ENTERED AN INVALID PASSWORD",
        });
        form1.setFieldError(
          "currentPassword",
          "The entered password is incorrect"
        );
        setChangepwdVisible(false);
      } else {
        showNotification({
          title: "ERROR",
          color: "red",
          message: "SOME INTERNAL ERROR",
        });
        setChangepwdVisible(false);
      }
    } catch (e) {
      console.error(e);
      setChangepwdVisible(false);
    }
    setChangepwdVisible(false);
  };
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Center>
        <Paper
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <LoadingOverlay
            visible={visible}
            loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
            overlayOpacity={0.5}
            overlayColor="#c5c5c5"
            zIndex={1}
          />
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
              Are you sure you want to cancel?
            </Title>
            <Grid align="center" justify="space-around">
              <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
                <Button
                  align="center"
                  color="light"
                  leftIcon={<IconTrashOff size={14} />}
                  onClick={() => setOpened(false)}
                >
                  No, Don't Cancel
                </Button>
              </Grid.Col>
              <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
                <Button
                  align="center"
                  color="red"
                  leftIcon={<IconTrash size={14} />}
                  onClick={() => navigate("/admin/viewOrder")}
                >
                  Yes, Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Modal>
          <Title order={1} align="center">
            Update Profile
          </Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid justify="space-around">
              <Grid.Col lg={12}>
                <TextInput
                  size="md"
                  required
                  label="Full Name"
                  placeholder="Enter User's Full Name"
                  {...form.getInputProps("name")}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <TextInput
                  icon={<Phone />}
                  size="md"
                  required
                  placeholder="001-XXX-XXX-XXXX"
                  component={InputMask}
                  mask="001-999-999-9999"
                  label="Enter Mobile Number"
                  {...form.getInputProps("phone")}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <TextInput
                  error={renderErrorMessage("email")}
                  size="md"
                  placeholder="Enter User's Email"
                  required
                  disabled={true}
                  label="Email Address"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <TextInput
                  size="md"
                  required
                  label="State"
                  placeholder="Enter State"
                  {...form.getInputProps("state")}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <TextInput
                  size="md"
                  required
                  label="ZIP Code"
                  placeholder="Enter ZIP Code"
                  {...form.getInputProps("zip")}
                />
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col lg={4} hidden>
                <PasswordInput
                  size="md"
                  placeholder="Current Password"
                  label="Current Password"
                  onInput={(event) => {
                    if (event.target.value === form.values.newPassword) {
                      form.setFieldError(
                        "newPassword",
                        "CURRENT PASSWORD AND NEW PASSWORD CANT BE THE SAME"
                      );
                    } else {
                      form.setFieldError("newPassword", "");
                    }
                  }}
                  {...form.getInputProps("currentPassword")}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <PasswordInput
                  size="md"
                  placeholder="New Password"
                  label="New Password"
                  onInput={(event) => {
                    if (event.target.value !== form.values.confirmPassword) {
                      form.setFieldError(
                        "confirmPassword",
                        "New password and confrim password don't match"
                      );
                    } else {
                      form.setFieldError("confirmPassword", "");
                    }
                  }}
                  {...form.getInputProps("newPassword")}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <PasswordInput
                  size="md"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  onInput={(event) => {}}
                  {...form.getInputProps("confirmPassword")}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-start">
              <Grid.Col lg={12}>
                <Input.Wrapper size="md" label="Profile Picture" error={error}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      // alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Dropzone
                      style={{
                        height: "180px",
                        width: "200px",
                        backgroundColor: "#E0E0E0",
                      }}
                      // radius={120}
                      onDrop={(e) => {
                        setImages(e);
                        // handleUpload(e);
                      }}
                      maxSize={3 * 1024 ** 2}
                      maxFiles={1}
                      multiple={false}
                      disabled={disabled}
                      accept={[
                        MIME_TYPES.jpeg,
                        MIME_TYPES.jpg,
                        MIME_TYPES.png,
                        MIME_TYPES.svg,
                        MIME_TYPES.gif,
                      ]}
                    >
                      {images.length < 1 && (
                        <Avatar
                          // key={index}
                          src={urls}
                          size={150}
                          radius={120}
                          mx="auto"
                        />
                      )}
                      {previews}
                    </Dropzone>
                    <Button
                      size="sm"
                      mt="sm"
                      compact
                      style={{
                        width: "200px",
                      }}
                      color="red"
                      hidden={disabled2}
                      onClick={() => {
                        setImages([]);
                        setUrls(
                          "https://firebasestorage.googleapis.com/v0/b/awep-dummy.appspot.com/o/defaultAvatar%2FDefaultAvatarForAllUsersWith%20No%20Profile%20Image.jpg%2B0.4989565837086003?alt=media&token=86eb4791-707e-4409-b6e8-dcc47caa2461"
                        );
                        setDisabled(false);
                        setDisabled2(true);
                        // setRemove(false);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Input.Wrapper>
              </Grid.Col>
            </Grid>

            <Grid justify="flex-end">
              <Grid.Col xs={6} sm={6} md={6} lg={6} xl={3}>
                <Button
                  size="md"
                  fullWidth
                  variant="filled"
                  color="red"
                  disabled={disabled}
                  rightIcon={<IconX />}
                  uppercase
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  Cancel
                </Button>
              </Grid.Col>
              <Grid.Col xs={6} sm={6} md={6} lg={6} xl={3}>
                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  variant="filled"
                  color="dark"
                  disabled={disabled}
                  loading={loading}
                  rightIcon={<IconEdit />}
                  uppercase
                >
                  update profile
                </Button>

                <Group position="right">
                  <Button
                    hidden
                    my="md"
                    size="md"
                    color="dark"
                    type="submit"
                    uppercase
                    disabled={
                      form1.values.confirmPassword &&
                      form1.values.newPassword &&
                      form1.values.currentPassword &&
                      form1.values.currentPassword !==
                        form1.values.newPassword &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                        form1.values.currentPassword
                      ) &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                        form1.values.newPassword
                      ) &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                        form1.values.confirmPassword
                      ) &&
                      form1.values.newPassword === form1.values.confirmPassword
                        ? false
                        : true
                    }
                    rightIcon={<IconEdit />}
                  >
                    Update Password
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </form>

          {/* <Grid pt={0} mt={0}>
            <Grid.Col lg={12} style={{ position: "relative" }}>
              <LoadingOverlay
                loaderProps={{ color: "grape", variant: "bars" }}
                visible={changepwdVisible}
              />
              <Accordion variant="contained" radius="xs" color="ffffff">
                <Accordion.Item value="customization">
                  <Accordion.Control icon={<IconKey />}>
                    <Text> Change Password</Text>
                    <Text size="sm" color="dimmed" weight={400}>
                      It's a good idea to use a strong password that you don't
                      use elsewhere
                    </Text>
                  </Accordion.Control>

                  <Accordion.Panel>
                    <form
                      onSubmit={form1.onSubmit((values) =>
                        updatePasswordMethod(values)
                      )}
                    >
                      <PasswordInput
                        size="md"
                        placeholder="Current Password"
                        label="Current Password"
                        required
                        onInput={(event) => {
                          if (event.target.value === form1.values.newPassword) {
                            form1.setFieldError(
                              "newPassword",
                              "CURRENT PASSWORD AND NEW PASSWORD CANT BE THE SAME"
                            );
                          } else {
                            form1.setFieldError("newPassword", "");
                          }
                        }}
                        {...form1.getInputProps("currentPassword")}
                      />
                      <PasswordInput
                        size="md"
                        placeholder="New Password"
                        label="New Password"
                        required
                        onInput={(event) => {
                          if (
                            event.target.value !== form1.values.confirmPassword
                          ) {
                            form1.setFieldError(
                              "confirmPassword",
                              "New password and confrim password don't match"
                            );
                          } else {
                            form1.setFieldError("confirmPassword", "");
                          }
                        }}
                        {...form1.getInputProps("newPassword")}
                      />
                      <PasswordInput
                        size="md"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        required
                        onInput={(event) => {}}
                        {...form1.getInputProps("confirmPassword")}
                      />
                      <Group position="right">
                        <Button
                          my="md"
                          size="md"
                          color="dark"
                          type="submit"
                          uppercase
                          disabled={
                            form1.values.confirmPassword &&
                            form1.values.newPassword &&
                            form1.values.currentPassword &&
                            form1.values.currentPassword !==
                              form1.values.newPassword &&
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                              form1.values.currentPassword
                            ) &&
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                              form1.values.newPassword
                            ) &&
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                              form1.values.confirmPassword
                            ) &&
                            form1.values.newPassword ===
                              form1.values.confirmPassword
                              ? false
                              : true
                          }
                          rightIcon={<IconEdit />}
                        >
                          Update Password
                        </Button>
                      </Group>
                    </form>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>
          </Grid> */}
        </Paper>
      </Center>
    </Paper>
  );
};

export default EditProfile;
