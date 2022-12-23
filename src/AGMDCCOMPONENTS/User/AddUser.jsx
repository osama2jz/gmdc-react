import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Title,
  Button,
  PasswordInput,
  TextInput,
  Select,
  LoadingOverlay,
  Center,
  Avatar,
  Text,
  Group,
  Image,
  SimpleGrid,
  Input,
} from "@mantine/core";
import InputMask from "react-input-mask";

import { Modal } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons";
import { Progress } from "@mantine/core";
import storage from "../FB";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  ArrowRight,
  Phone,
  Trash,
  TrashOff,
  Upload,
  X,
} from "tabler-icons-react";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { backendURL } from "../apiCallHelpers/backendURL";
import { getHeader } from "../apiCallHelpers/headers";
import { userURL } from "../apiCallHelpers/urlToGoToHelper";

const axios = require("axios");

const AddUser = ({ setCurrentLocation }) => {
  const params = useParams();
  // HOOKS
  const [errorMessages, setErrorMessages] = useState({});

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(true);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");

  const [percentages, setPercentages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState([]);
  const form = useForm({
    validateInputOnChange: true,
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
      userType: (value) => (value === "" ? "Please select a user type" : null),
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value?.trim())
          ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
            null
          : "Invalid Email",
      name: (value) =>
        value?.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value?.trim())
          ? null
          : "Alphabetic Name with 2 or more characters",
      phoneNumber: (value) =>
        value?.trim() !== "" ? null : "Invalid Phone Number",
      state: (value) =>
        value?.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value?.trim())
          ? null
          : "Alphabetic State with 2 or more characters",
      zipCode: (value) =>
        value?.trim()?.length > 1 ? null : "Zip Code with 2 or more characters",

      password: (value) =>
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
        //   value
        // )
        params.userId && value === ""
          ? null
          : value.length > 6
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });
  useEffect(() => {
    console.log("IS ADD OR UPDATE?????");
    if (params?.userId) {
      console.log("IS UPDATE SCREEN");
      setCurrentLocation("Update User");
      //axios call and set hooks and set images url
      let url = `${backendURL}/user/${params.userId}`;
      axios({
        method: "GET",
        url: url,
        headers: getHeader(),
      }).then((res) => {
        console.log("DATA FROM API", res.data);
        const responseData = res.data.data;
        form.setFieldValue("userType", responseData.role);
        form.setFieldValue("email", responseData.email);
        form.setFieldValue("name", responseData.name);
        form.setFieldValue("phoneNumber", responseData.phone);
        form.setFieldValue("whatsappNumber", responseData.whatsapp);
        form.setFieldValue("city", responseData.city);
        form.setFieldValue("state", responseData.state);
        form.setFieldValue("zipCode", responseData.zip);

        setProfileImageURL([responseData.profileImage]);
      });
    } else {
      console.log("IS ADD SCREEN");
      // navigate("/admin/adduser");
      setCurrentLocation("Add User");
    }
  }, []);

  console.log("PROFILE IMAGE URL", profileImageURL);
  const previews = profileImageURL?.map((file, index) => {
    console.log("File:", file);
    let imageUrl;
    try {
      imageUrl = URL.createObjectURL(file?.[0]);
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

  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();
  const handleUpload = (images) => {
    setError("");
    setPercentages([]);
    setDisabled(true);
    setDisabled2(true);
    if (images.length <= 0) {
      alert("Please choose a file first!");
    }
    var percent = 0;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // alert("IN2");
      const storageRef = ref(
        storage,
        `/defaultAvatar/${image.name}+${Math.random(999999)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
          // download url
          let Percentages = percentages;
          Percentages[i] = percent;
          // alert(i);
          console.log(Percentages);
          //   alert(Percentages)
          setPercentages(Percentages);
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setProfileImageURL([url]);
            setRefresh(!refresh);
            setDisabled(false);
            setDisabled2(false);
            setError("");
          });
        }
      );
    }
    // alert("OUT");
  };

  const handleSubmit = async (values) => {
    console.log("FORM VALUES", values);
    setVisible(true);
    setLoading(true);
    try {
      let form_data = new FormData();
      form_data.append("name", values.name);
      form_data.append("email", values.email);
      form_data.append("phone", values.phoneNumber);
      form_data.append("whatsapp", values.phoneNumber);
      form_data.append("city", values.city);
      form_data.append("state", values.state);
      form_data.append("zip", values.zipCode);
      form_data.append("password", values.password);
      form_data.append("role", values.userType);
      console.log(profileImageURL?.[0]);
      form_data.append("image", profileImageURL?.[0]?.[0]);
      // form_data.append("Image", profileImageURL?.[0]);
      // form_data.append("profileImage", profileImageURL?.[0]);

      let url = params?.userId
        ? `${backendURL}/user/${params.userId}`
        : `${backendURL}/user/add`;

      console.log("URL", url);
      const apiResponse = await axios({
        headers: {
          ...getHeader(),
          "Content-type": "multipart/form-data",
        },
        method: params?.userId ? "PUT" : "POST",
        url: url,
        data: form_data,
      });
      console.log("API RESPONSE", apiResponse);

      if (true) {
        showNotification({
          color: "green",
          title: "Success",
          message: params?.userId
            ? "User Added Successfully"
            : "User Updated Successfully",
        });
        navigate("/admin/viewusers");
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
    }
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
              Are You Sure Yo Want To Cancel?
            </Title>
            <Grid align="center" justify="space-around">
              <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
                <Button
                  align="center"
                  color="light"
                  leftIcon={<TrashOff size={14} />}
                  onClick={() => setOpened(false)}
                >
                  No, Don't Cancel
                </Button>
              </Grid.Col>
              <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
                <Button
                  align="center"
                  color="red"
                  leftIcon={<Trash size={14} />}
                  onClick={() => navigate(`/${userURL()}/viewusers`)}
                >
                  Yes, Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Modal>
          <Title order={1} align="center">
            {params?.userId ? "Update User Details" : "Enter User's Details"}
          </Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid justify="space-around">
              <Grid.Col lg={12}>
                <Select
                  clearable
                  autoComplete="off"
                  autoSave="off"
                  label="Select User Type"
                  required
                  autoCorrect="off"
                  searchable
                  size="md"
                  placeholder="Customer, Seller, Admin?"
                  data={[
                    { value: "customer", label: "Customer" },
                    { value: "seller", label: "Seller" },
                    { value: "admin", label: "Admin" },
                  ]}
                  {...form.getInputProps("userType")}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <TextInput
                  error={renderErrorMessage("firstName")}
                  size="md"
                  required
                  label="Name"
                  placeholder="Enter User's Name"
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
                  {...form.getInputProps("phoneNumber")}
                />
              </Grid.Col>
              <Grid.Col lg={12}>
                <TextInput
                  error={renderErrorMessage("email")}
                  size="md"
                  placeholder="Enter User's Email"
                  required
                  label="Email Address"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <PasswordInput
                  error={renderErrorMessage("password")}
                  size="md"
                  required={params?.userId ? false : true}
                  placeholder="Enter Password"
                  label="Password"
                  {...form.getInputProps("password")}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <PasswordInput
                  // error={renderErrorMessage("cpassword")}
                  size="md"
                  required={params?.userId ? false : true}
                  label="Confirm Password"
                  // disabled={disabled}
                  placeholder="Re-Enter Password"
                  {...form.getInputProps("confirmPassword")}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <TextInput
                  size="md"
                  label="State"
                  required
                  placeholder="Enter State"
                  {...form.getInputProps("state")}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <TextInput
                  size="md"
                  label="Zip Code"
                  required
                  placeholder="Enter Zip Code"
                  {...form.getInputProps("zipCode")}
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
                        setProfileImageURL([e]);
                      }}
                      // onDrop={(files) => console.log("accepted files", files)}
                      onReject={(files) => console.log("rejected files", files)}
                      maxSize={3 * 1024 ** 2}
                      disabled={disabled}
                      maxFiles={1}
                      multiple={false}
                      accept={[
                        MIME_TYPES.jpeg,
                        MIME_TYPES.png,
                        MIME_TYPES.svg,
                        MIME_TYPES.gif,
                      ]}
                    >
                      {profileImageURL.length < 1 && (
                        <Avatar
                          // key={index}
                          src="https://firebasestorage.googleapis.com/v0/b/awep-dummy.appspot.com/o/defaultAvatar%2FDefaultAvatarForAllUsersWith%20No%20Profile%20Image.jpg%2B0.4989565837086003?alt=media&token=86eb4791-707e-4409-b6e8-dcc47caa2461"
                          size={150}
                          radius={120}
                          mx="auto"
                        />
                      )}
                      {previews}

                      {/* <Group>
                    <Upload />
                    <Text>Drop Your Image Here</Text>
                  </Group> */}
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
                        setProfileImageURL([]);
                        setProfileImageURL(
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
              <Grid.Col sm={6} xs={6} lg={3}>
                <Button
                  size="md"
                  fullWidth
                  variant="filled"
                  color="red"
                  disabled={loading}
                  rightIcon={<X />}
                  onClick={() => setOpened(true)}
                >
                  CANCEL
                </Button>
              </Grid.Col>
              <Grid.Col sm={6} xs={6} lg={3}>
                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  variant="filled"
                  color="dark"
                  disabled={disabled}
                  onClick={() => {
                    const data = form.validate();
                    console.log("AAAAAAAAA", data);
                    if (data.hasErrors === false) {
                      handleSubmit(form.values);
                    }
                  }}
                  loading={loading}
                  rightIcon={<ArrowRight />}
                >
                  {params?.userId ? "UPDATE" : "REGISTER"}
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
};

export default AddUser;
