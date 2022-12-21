import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import storage from "../FB";
import { showNotification } from "@mantine/notifications";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Button,
  Grid,
  Group,
  Image,
  Input,
  Paper,
  Progress,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { ArrowLeft, ArrowRight, Upload } from "tabler-icons-react";

const UpdateImagesOnly = (props) => {
  const randomNum = Math.random(999999) * 10000;
  //   const [error, setError] = useState("");
  //   const [disabled, setDisabled] = useState(false);
  //   const [disabled1, setDisabled1] = useState(false);
  //   const [images, setImages] = useState([]);
  //   const [percentages, setPercentages] = useState([]);
  //   const [urls, setUrls] = useState([]); // for useEffect only.... else not needed
  //   const [imageURLS, setImageURLS] = useState([]);
  //   const [indexOfCoverImageURL, setIndexOfCoverImageURL] = useState();
  const [refresh, setRefresh] = useState(false);

  console.log("imageUrls are ", props.imageURLS);

  console.log("urls are", props.urls);
  const previews = props?.images.map((file, index) => {
    if (file.path) {
      file = URL.createObjectURL(file);
    }
    return (
      <div
        key={index}
        style={{
          alignContent: "center",
          MozWindowDragging: "no-drag",
          alignContent: "center",
        }}
      >
        <div>
          <Image
            // draggable={false}
            onClick={() => {
              props.setIndexOfCoverImageURL(index);
            }}
            key={index}
            src={file}
            // size={140}
            width="100%"
            height={120}
            radius={20}
            mx="auto"
            imageProps={{
              onLoad: () => URL.revokeObjectURL(file),
            }}
          />
          {props.disabled1 ? (
            <div>
              <Progress
                animate={props.percentages[index] === 100 ? false : true}
                value={
                  props.percentages[index] === 100
                    ? 100
                    : props.percentages[index]
                }
                label={
                  props.percentages[index] === 100
                    ? "100% Completed"
                    : props.percentages[index]
                }
                size="xl"
                radius="xl"
                color={props.percentages[index] === 100 ? "green" : "gray"}
              />
            </div>
          ) : null}

          <Group position="center">
            <Button
              fullWidth
              mt="sm"
              size="sm"
              hidden={props.disabled1}
              compact
              color="red"
              onClick={() => {
                if (props.urls.length !== 0) {
                  if (props.indexOfCoverImageURL === index) {
                    props.setIndexOfCoverImageURL(0);
                  } else if (props.indexOfCoverImageURL > index) {
                    props.setIndexOfCoverImageURL(
                      props.indexOfCoverImageURL - 1
                    );
                  }
                } else {
                  console.log("URL LENGTH", props.urls.length);
                  //   props.setHidden(true);
                  props.setIndexOfCoverImageURL(null);
                }

                props.setImageURLS((mapper) =>
                  mapper.filter((_, i) => i !== index)
                );
                props.setUrls(props.urls.filter((_, i) => i !== index));
                props.setImages(props.images.filter((_, i) => i !== index));
                props.setPercentages(
                  props.percentages.filter((_, i) => i !== index)
                );
                props.setCompareImageObject((compare) =>
                  compare.filter((_, i) => i !== index)
                );
              }}
            >
              Remove
            </Button>
          </Group>
        </div>
      </div>
    );
  });

  React.useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);
  React.useEffect(() => {
    console.log("ACHA JEE");
    if (props.disabled1) {
      props.setDisabled(true);
      console.log("ACHA JEE 2");
      let enable = true;
      for (let i = 0; i < props.images.length; i++) {
        if (props.percentages[i] !== 100) {
          enable = false;
        }
      }
      if (enable) {
        props.setIndexOfCoverImageURL(0);
        props.setDisabled(false);
        props.setDisabled1(false);
      }
    }
  }, [props.percentages, props.urls, props.images]);

  const handleUpload = (images, prevLength = 0) => {
    props.setError("");
    // props.setPercentages([]);
    props.setDisabled1(true);
    // props.setDisabled2(true);
    // if (images.length <= 0) {
    //   alert("Please choose a file first!");
    // }
    var percent = 0;
    for (
      let indexOfNewImage = 0;
      indexOfNewImage < images.length;
      indexOfNewImage++
    ) {
      const image = images[indexOfNewImage];
      // alert("IN2");
      const storageRef = ref(
        storage,
        `/VenueImages/${image.name}@_@${randomNum}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          let Percentages = props.percentages;
          Percentages[indexOfNewImage + prevLength] = percent;
          props.setPercentages(Percentages);
          console.log(Percentages);
          setRefresh(!refresh);
        },
        (err) => console.log(err),
        () => {
          // download url

          //   alert(Percentages)
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            let Percentages = props.percentages;
            Percentages[indexOfNewImage + prevLength] = 100;
            props.setPercentages(Percentages);
            console.log("@TEST", indexOfNewImage + prevLength);
            props.setImageURLS((newMapper) => {
              newMapper[indexOfNewImage + prevLength] = url;
              return newMapper;
            });

            props.setUrls((URLS) => [...URLS, url]);

            setRefresh(!refresh);
            // props.setDisabled2(false);

            props.setHidden(false);
            props.setError("");
          });
        }
      );
    }
    // alert("OUT");
  };

  const coverImagePreview = (
    <Image
      // draggable={false}
      src={props.imageURLS[props.indexOfCoverImageURL]}
      // size={140}
      width="100%"
      height={300}
      radius={20}
      mx="auto"
      withPlaceholder={props.imageURLS.length === 0 ? true : false}
    />
  );

  return (
    <div>
      <Grid>
        <Grid.Col
          lg={props.hidden ? 12 : 9}
          style={{
            transition: "1s",
          }}
        >
          <Input.Wrapper error={props.error} size="lg">
            <Text weight="bold" size="xl" py="md">
              {props.addImages}
            </Text>
          </Input.Wrapper>

          <Paper>
            <Dropzone
              //prevent default url in dropzone preview

              // maxFiles={1}
              // multiple={false}
              maxSize={3 * 1024 ** 2}
              accept={[
                MIME_TYPES.jpeg,
                MIME_TYPES.png,
                MIME_TYPES.svg,
                MIME_TYPES.gif,
              ]}
              // onDrop={props.setImages}
              onReject={(file) => {
                showNotification({
                  color: "red",
                  title: `ERROR`,

                  message: `THIS FILE TYPE IS NOT SUPPORTED`,
                });
              }}
              activateOnDrag={false}
              onDrop={(newImages) => {
                let newFilteredImages = [];
                let showDuplicateAlert = false;

                newImages?.map((newImage) => {
                  let addImage = true;
                  props?.images?.map((image) => {
                    console.log("@COMPARE", newImage.path, image.path);
                    console.log("@@OLD", image);
                    console.log("@@New", newImage);
                    if (newImage.path == image.path) {
                      showDuplicateAlert = true;

                      addImage = false;
                    }
                  });
                  props.compareImageObject.map((image) => {
                    console.log("@COMPARE", newImage.path, image.name);
                    if (
                      newImage.path == image.name &&
                      newImage.size == image.size
                    ) {
                      showDuplicateAlert = true;

                      addImage = false;
                    }
                  });
                  if (addImage) {
                    newFilteredImages.push(newImage);
                  }
                });
                if (showDuplicateAlert) {
                  console.log("YAALLLLLLLLLLLLAAAAAAAAAAHHHHHHHH");
                  showNotification({
                    color: "yellow",
                    title: `IT'S ALREADY THERE!!`,

                    message: `DUPLICATE IMAGES HAVE NOT BEEN ADDED`,
                  });
                }
                const prevLength = props.images.length;

                props.setImages((prevImages) => [
                  ...prevImages,
                  ...newFilteredImages,
                ]);
                props.setCompareImageObject((prevImages) => [
                  ...prevImages,
                  ...newFilteredImages,
                ]);
                handleUpload(newFilteredImages, prevLength);
              }}
              style={{
                height: "150px",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Group>
                <Upload />
                <Text>Drop Images Here</Text>
              </Group>
            </Dropzone>

            <SimpleGrid
              cols={6}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              mt={previews.length > 0 ? "xl" : 0}
            >
              {previews}
            </SimpleGrid>
          </Paper>
        </Grid.Col>
        {!props.hidden && (
          <Grid.Col lg={3}>
            <Input.Wrapper error={props.error} size="lg">
              <Text weight="bold" size="xl" py="md">
                Cover Image
              </Text>
            </Input.Wrapper>

            <Paper>{coverImagePreview}</Paper>
          </Grid.Col>
        )}
      </Grid>
    </div>
  );
};

export default UpdateImagesOnly;
