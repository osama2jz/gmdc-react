import React from 'react'
import { useState } from 'react'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import storage from '../FB'
import { showNotification } from '@mantine/notifications'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
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
} from '@mantine/core'
import { Upload } from 'tabler-icons-react'

const UploadImagesOnly360 = (props) => {
  const randomNum = Math.random(999999) * 10000

  const [refresh, setRefresh] = useState(false)
  React.useEffect(() => {
    if (refresh) {
      setRefresh(false)
    }
  }, [refresh])
  console.log('imageUrls are ', props.imageURLS)

  console.log('urls are', props.urls)
  const previews = props.images?.map((file, index) => {
    let imageUrl
    try {
      imageUrl = URL.createObjectURL(file)
    } catch (e) {
      imageUrl = file
    }
    return (
      <div
        key={index}
        style={{
          alignContent: 'center',
          MozWindowDragging: 'no-drag',
          alignContent: 'center',
        }}
      >
        <div>
          <Image
            // draggable={false}
            key={index}
            src={imageUrl}
            // size={140}
            width="100%"
            height={120}
            radius={20}
            mx="auto"
            imageProps={{
              onLoad: () => URL.revokeObjectURL(imageUrl),
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
                    ? '100% Completed'
                    : props.percentages[index]
                }
                size="xl"
                radius="xl"
                color={props.percentages[index] === 100 ? 'green' : 'gray'}
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
                let images = props.images.filter((_, i) => i !== index)
                props.setImages(images)
                props.setPercentages(
                  props.percentages.filter((_, i) => i !== index),
                )
              }}
            >
              Remove
            </Button>
          </Group>
        </div>
      </div>
    )
  })

  React.useEffect(() => {
    console.log('ACHA JEE')
    if (props.disabled1) {
      props.setDisabled(true)
      console.log('ACHA JEE 2')
      let enable = true

      // for (let i = 0; i < props.images.length; i++) {
      //   if (props.percentages[i] !== 100) {
      //     enable = false;
      //   }
      // }
      if (enable) {
        props.setDisabled(false)
        props.setDisabled1(false)
      }
    }
  }, [props.percentages, props.urls, props.images])

  const handleUpload = (images, prevLength = 0) => {
    props.setError('')
    // props.setPercentages([]);
    props.setDisabled1(true)
    // props.setDisabled2(true);
    // if (images.length <= 0) {
    //   alert("Please choose a file first!");
    // }
    var percent = 0
    for (
      let indexOfNewImage = 0;
      indexOfNewImage < images.length;
      indexOfNewImage++
    ) {
      const image = images[indexOfNewImage]
      // alert("IN2");
      const storageRef = ref(
        storage,
        `/${props.folder}/${image.name}@_@${randomNum}`,
      )
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot)
          percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          )
          let Percentages = props.percentages
          Percentages[indexOfNewImage + prevLength] = percent
          props.setPercentages(Percentages)
          console.log(Percentages)
          setRefresh(!refresh)
        },
        (err) => console.log(err),
        () => {
          // download url

          //   alert(Percentages)
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            let Percentages = props.percentages
            Percentages[indexOfNewImage + prevLength] = 100
            props.setPercentages(Percentages)
            console.log('@TEST', indexOfNewImage + prevLength)

            // props.setUrls((URLS) => [...URLS, url]);

            setRefresh(!refresh)
            // props.setDisabled2(false);

            props.setError('')
          })
        },
      )
    }
    // alert("OUT");
  }

  return (
    <div>
      <Grid>
        <Grid.Col
          lg={12}
          style={{
            transition: '1s',
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
              maxSize={4 * 1024 ** 3}
              accept={[
                MIME_TYPES.jpeg,
                MIME_TYPES.png,
                MIME_TYPES.svg,
                MIME_TYPES.gif,
              ]}
              onReject={(file) => {
                showNotification({
                  color: 'red',
                  title: `ERROR`,

                  message: `THIS FILE SIZE IS TOO LARGE OR TYPE IS NOT SUPPORTED`,
                })
              }}
              // onDrop={props.setImages}
              activateOnDrag={false}
              onDrop={(newImages) => {
       

                // console.log('------------------------------------------------')
                // for (let image of newImages) {
                //   console.log(image)
                // }
                // console.log('------------------------------------------------')
                props.setImages(newImages)
                handleUpload(newImages, 0)
              }}
              style={{
                height: '150px',
                backgroundColor: '#E0E0E0',
              }}
            >
              <Group>
                <Upload />
                <Text>Drop Images Here</Text>
              </Group>
            </Dropzone>

            <SimpleGrid
              cols={6}
              breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
              mt={previews?.length > 0 ? 'xl' : 0}
            >
              {previews}
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default UploadImagesOnly360
