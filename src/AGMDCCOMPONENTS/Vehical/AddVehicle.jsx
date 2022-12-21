import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Grid,
  Paper,
  Title,
  Button,
  TextInput,
  Select,
  LoadingOverlay,
  Center,
  Textarea,
  NumberInput,
  ActionIcon,
} from '@mantine/core'
import { Modal } from '@mantine/core'
import { getHeader } from '../apiCallHelpers/headers'
import { ArrowRight, Ce, Trash, TrashOff, X, Refresh } from 'tabler-icons-react'

import { useForm } from '@mantine/form'
import UploadImagesOnly from '../UploadImagesOnly/UploadImagesOnly'
import { backendURL } from '../apiCallHelpers/backendURL'
import { getUserID, userType } from '../apiCallHelpers/userDataHelper'
import { showNotification } from '@mantine/notifications'
import { userURL } from '../apiCallHelpers/urlToGoToHelper'
import { axiosGet } from '../apiCallHelpers/axiosCall'
import UploadImagesOnly360 from '../UploadImagesOnly/UploadImagesOnly360'

const axios = require('axios')

const AddVehicle = ({ setCurrentLocation }) => {
  const params = useParams()

  setCurrentLocation('Add Vehicle')
  // HOOKS
  const [errorMessages, setErrorMessages] = useState({})
  const [engine, setEngine] = useState('') // engine of car

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [disabled1, setDisabled1] = useState(false)
  const [disabled2, setDisabled2] = useState(true)
  const [opened, setOpened] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [indexOfCoverImageURL, setIndexOfCoverImageURL] = useState()
  const [allSellers, setAllSellers] = useState([
    {
      _id: '60a1c1b0b0b5a40015b0b0b4',
      name: 'Seller 1',
    },
    {
      _id: '60a1c1b0b0b5a40015b0b0b5',
      name: 'Seller 2',
    },
    {
      _id: '60a1c1b0b0b5a40015b0b0b6',
      name: 'Seller 3',
    },
  ])

  console.log('this is the seller baba', allSellers)
  const fetchAllSellers = async () => {
    const res = await axios({
      method: 'get',
      url: `${backendURL}api/v1/user/all_seller`,
      headers: getHeader(),
    })

    if (res.data.success) {
      let response = res.data?.data
      let filterSeller = response?.users?.filter((item) => item?.status === 1)
      setAllSellers(filterSeller)
      // setRefresh(false);
      // setVisible(false);
    } else {
      alert('Error')
    }
  }
  const sellerData = allSellers?.map((item) => ({
    value: item._id ? item._id : '123456798',
    label: item.name ? item.name : 'test',
  }))
  useEffect(() => {
    if (userType() === 'admin') {
      fetchAllSellers()
    }
  }, [])
  const [vehicleDetails, setVehicleDetails] = useState({})
  console.log('this is the vehicle details', vehicleDetails)

  const getVehicleDetails = async () => {
    setVisible(true)

    const url = `${backendURL}api/v1/vehicle/${params.vehicleId}`

    const res = await axios({
      method: 'get',
      url: url,
      headers: getHeader(),
    })

    console.log('this is the update res', res?.data?.data)
    if (res.data.success) {
      let response = res.data?.data
      setVehicleDetails(response)
      form.setFieldValue('seller', response?.addedBy)
      form.setFieldValue('title', response?.title)
      form.setFieldValue('vehicleType', response?.vehicleType)
      form.setFieldValue('bodyType', response?.vehicleType)
      form.setFieldValue('vehicleCondition', response?.condition)
      form.setFieldValue('VIN', response?.vin)
      form.setFieldValue('make', response?.make)
      form.setFieldValue('model', response?.model)
      form.setFieldValue('year', parseInt(response?.year))
      form.setFieldValue('trim', response?.trim)
      form.setFieldValue('location', response?.location)
      form.setFieldValue('manufacturer', response?.manufacturer)
      form.setFieldValue('engine', response?.engine)
      form.setFieldValue('engineCylinders', response?.cylinder)
      form.setFieldValue('transmissionType', response?.transmission)
      form.setFieldValue('driveTrain', response?.driveTrain)
      form.setFieldValue('doors', response?.door)
      form.setFieldValue('mileage', response?.mileage)
      form.setFieldValue('fuelType', response?.fuelType)
      form.setFieldValue('horsePower', response?.horsePower)
      form.setFieldValue('description', response?.description)
      form.setFieldValue('color', response?.color)
      form.setFieldValue('price', response?.price)

      setVisible(false)
      let images = response?.assets?.map((item) => item?.asset)
      setImages(images)
      let images360 = response?.image360?.urls.map((item) => item?.asset)
      setImages360(images360)
    } else {
      setVisible(false)

      alert('Error')
    }
  }
  useEffect(() => {
    console.log('IS ADD OR UPDATE?????')
    if (params?.vehicleId) {
      console.log('IS UPDATE SCREEN')
      getVehicleDetails()
    } else {
      console.log('IS ADD SCREEN')
      navigate('/admin/addVehicle')
    }
  }, [])

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      seller: userType() === 'admin' ? '' : getUserID(),
      title: '',
      vehicleType: '',
      bodyType: '',
      vehicleCondition: '',
      VIN: '',
      make: '',
      model: '',
      year: '',
      trim: '',
      location: '',
      manufacturer: '',
      engine: '',
      engineCylinders: '',
      transmissionType: '',
      driveTrain: '',
      doors: '',
      mileage: '',
      fuelType: '',
      horsePower: '',
      description: '',
      color: '',
      price: '',
    },

    validate: {
      title: (value) => {
        if (value === '') {
          return 'Title is Required'
        }
      },
      bodyType: (value) => {
        if (value === '') {
          return 'Body Type is Required'
        }
      },
      location: (value) => {
        if (value === '') {
          return 'Location is Required'
        }
      },
      seller: (value) => {
        if ((value === '') & (userType() === 'admin')) {
          return 'Seller Id is Required'
        } else return
      },
      vehicleType: (value) => {
        if (value === '') {
          return 'Vehicle Type is Required'
        }
      },
      vehicleCondition: (value) => {
        if (value === '') {
          return 'Vehicle Condition is Required'
        }
      },
      VIN: (value) => {
        if (value === '' || value.length !== 17) {
          return 'VIN of 17 characters is Required'
        }
      },
      make: (value) => {
        if (value === '') {
          return 'Make is Required'
        }
      },
      model: (value) => {
        if (value === '') {
          return 'Model is Required'
        }
      },
      year: (value) => {
        if (value === '') {
          return 'Year is Required'
        } //regex for numbers only
        else if (!/^[0-9]+$/.test(value)) {
          return 'Year must be a number'
        } else if (value?.toString()?.length !== 4) {
          return 'Year of 4 characters is Required'
        } else if (value < 1900 || value > new Date().getFullYear()) {
          return `Year must be between 1900 and ${new Date().getFullYear()}`
        }
      },
      trim: (value) => {
        if (value === '') {
          return 'Trim is Required'
        }
      },
      manufacturer: (value) => {
        if (value === '') {
          return 'Manufacturer is Required'
        }
      },
      engine: (value) => {
        if (value === '') {
          return 'Engine is Required'
        }
      },
      engineCylinders: (value) => {
        if (value === '') {
          return 'Engine Cylinders is Required'
        }
      },
      transmissionType: (value) => {
        if (value === '') {
          return 'Transmission Type is Required'
        }
      },
      driveTrain: (value) => {
        if (value === '') {
          return 'Drive Train is Required'
        }
      },
      doors: (value) => {
        if (value === '') {
          return 'Doors is Required'
        }
      },
      mileage: (value) => {
        if (value === '') {
          return 'Mileage is Required'
        }
      },
      fuelType: (value) => {
        if (value === '') {
          return 'Fuel Type is Required'
        }
      },
      horsePower: (value) => {
        if (value === '') {
          return 'Horse Power is Required'
        }
      },
      description: (value) => {
        if (value === '') {
          return 'Description is Required'
        }
      },
    },
  })

  const handleSubmit = async (event) => {
    console.log('inside body')
    console.log('this is event,', event)
    let form_data = new FormData()
    form_data.append('title', event?.title)
    form_data.append(
      'vehicleType',
      event.vehicleType === 'other' ? event.bodyType : event.vehicleType,
    )
    form_data.append(
      'bodyType',
      event.vehicleType === 'other' ? event.bodyType : event.vehicleType,
    ) // need to verify
    form_data.append('location', event.location) // need to verify
    form_data.append(
      'type',
      event.vehicleType === 'other' ? event.bodyType : event.vehicleType,
    ) // need to verify
    form_data.append('condition', event.vehicleCondition)
    form_data.append('vin', event?.VIN)
    form_data.append('make', event?.make)
    // form_data.append("name", event?.make); // need to verify
    form_data.append('model', event?.model)
    form_data.append('year', event?.year)
    form_data.append('trim', event?.trim)
    form_data.append('manufacturer', event?.manufacturer)
    form_data.append('engine', event?.engine)
    form_data.append('cylinder', event?.engineCylinders)
    form_data.append('transmission', event?.transmissionType)
    form_data.append('driveTrain', event?.driveTrain)
    form_data.append('door', event?.doors)
    form_data.append('mileage', event?.mileage)
    form_data.append('fuelType', event?.fuelType)
    form_data.append('horsePower', event?.horsePower)
    form_data.append('description', event?.description)
    form_data.append('price', event?.price)
    form_data.append('addedBy', event?.seller)
    form_data.append('color', 'color') // need to verify
    form_data.append('status', 'available') // need to verify

    // form_data.append("images", images[0]);

    for (let image of images) {
      // form_data.append("images", image); // uncomment to create error .. ewein hi
      console.log(
        'IMAGE -----------------------------------------------------------------',
        image,
      )
      form_data.append('assets', image)
    }

    for (let image360 of images360) {
      form_data.append('image360', image360)
    }
    // console.log("this is form data", form_data);
    try {
      setVisible(true)
      let url = params.vehicleId
        ? `${backendURL}api/v1/vehicle/${params.vehicleId}`
        : `${backendURL}api/v1/vehicle/add`
      const response = await axios({
        method: params.vehicleId ? 'PUT' : 'POST',
        url: url,
        data: form_data,
        headers: {
          ...getHeader(),
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.data.success) {
        console.log('Upload success')
        showNotification({
          title: 'Success',
          message: 'Vehicle Added Successfully',
          color: 'green',
        })
        navigate('/seller/viewvehicals')
      } else {
        showNotification({
          title: 'Error',
          message: 'Vehicle Not Added',
          color: 'red',
        })
        console.log("Don't know the error")
      }
    } catch (error) {
      setVisible(false)
      showNotification({
        title: 'Error',
        message: `${error.response.data.data}`,
        color: 'red',
      })
      console.log('error in catch', error.response.data.data)
    }
    setVisible(false)
  }

  const [images, setImages] = useState([])
  const [images360, setImages360] = useState([])
  const [percentages, setPercentages] = useState([])
  const [percentages360, setPercentages360] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [urls, setUrls] = useState([])
  const [imageURLS, setImageURLS] = useState([])

  let navigate = useNavigate()

  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name]
    }
  }

  const getDataFromAPI = () => {
    setVisible(true)
    axiosGet('api/v1/vehicle/vin/' + form.values.VIN).then(async (response) => {
      setVisible(false)
      console.log('API CALLED')
      let formBody = []
      var encodedKey = encodeURIComponent('DATA')
      var encodedValue = encodeURIComponent(form.values.VIN)
      formBody.push(encodedKey + '=' + encodedValue)
      encodedKey = encodeURIComponent('format')
      encodedValue = encodeURIComponent('JSON')
      formBody.push(encodedKey + '=' + encodedValue)
      // let data = await axios.post(
      //   "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
      //   formBody.join("&")
      // );
      // console.log("data", data?.data?.Results?.[0]);
      // data = data?.data?.Results?.[0];
      let resp = response?.data?.data
      let auto = response?.data?.data?.auto
      let nhtsa = response?.data?.data?.nhtsa?.Results?.[0]
      form.setFieldValue(
        'bodyType',
        auto?.categories?.primaryBodyType?.toLowerCase(),
      )
      let bodyType = auto?.categories?.primaryBodyType?.toLowerCase()
      if (
        auto?.categories?.primaryBodyType?.toLowerCase() !== 'truck' &&
        auto?.categories?.primaryBodyType?.toLowerCase() !== 'hatchback' &&
        auto?.categories?.primaryBodyType?.toLowerCase() !== 'sedan' &&
        auto?.categories?.primaryBodyType?.toLowerCase() !== 'suv' &&
        auto?.categories?.primaryBodyType?.toLowerCase() !== 'coupe' &&
        auto?.categories?.primaryBodyType?.toLowerCase() !== 'electric'
      ) {
        console.log(auto?.categories?.primaryBodyType)
        bodyType = 'other'
      }
      if (resp) {
        console.log(resp.data)
        console.log('auto', auto)
        console.log('nhtsa', nhtsa)

        form.setFieldValue('make', auto.make?.name)
        form.setFieldValue('model', auto.model?.name)
        form.setFieldValue('year', auto.years?.[0]?.year.toString())
        form.setFieldValue('trim', auto.years?.[0].styles?.[0]?.trim)
        form.setFieldValue(
          'manufacturer',
          nhtsa.Manufacturer || auto.manufacturer?.manufacturerCode,
        )
        form.setFieldValue('engine', nhtsa.EngineModel || auto.engine?.name)
        console.log(
          'Engine Cylinders',
          nhtsa.EngineCylinders,
          auto.engine?.cylinder,
        )
        form.setFieldValue(
          'engineCylinders',
          parseInt(nhtsa.EngineCylinders) || parseInt(auto.engine?.cylinder),
        )
        form.setFieldValue(
          'transmissionType',
          auto.transmission?.transmissionType?.toLowerCase(),
        )
        form.setFieldValue(
          'driveTrain',
          nhtsa?.DriveType.split('/')?.[0] || auto?.driveTrain?.toLowerCase(),
        )
        form.setFieldValue('doors', parseInt(auto.numOfDoors))
        form.setFieldValue('vehicleType', bodyType)
        form.setFieldValue('fuelType', nhtsa.FuelTypePrimary || auto.fuelType)
        form.setFieldValue('horsePower', auto?.engine?.rpm?.horsepower)
      } else {
        console.log('No data found')
      }
    })
  }
  // const fieldsDisabled = params.vehicleId ? true : false;
  const fieldsDisabled = false

  return (
    <Paper
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Center>
        <Paper
          style={{
            width: '80%',
            height: '100%',
          }}
        >
          <LoadingOverlay
            visible={visible}
            loaderProps={{ size: 'xl', color: 'pink', variant: 'bars' }}
            overlayOpacity={0.5}
            overlayColor="#c5c5c5"
            zIndex={1}
          />
          <Modal
            styles={{
              close: {
                color: 'black',
                backgroundColor: '#EAEAEA',
                borderRadius: '50%',
                '&:hover': {
                  transition: '50ms',
                  color: 'white',
                  backgroundColor: 'red',
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
            <Grid align="center" justify="space-around" p="md">
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
                  onClick={() => navigate(`/${userURL()}/viewvehicals`)}
                >
                  Yes, Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Modal>
          <Title order={1} p="md" align="center">
            {params?.vehicleId
              ? 'Update Vehicle Details'
              : 'Enter Vehicle Details'}
          </Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid justify="space-around">
              <Grid.Col md={12} lg={12}>
                <TextInput
                  maxLength={50}
                  error={renderErrorMessage('Title')}
                  size="md"
                  required
                  label="Vehicle Title"
                  placeholder="Enter Vehicle's Title"
                  {...form.getInputProps('title')}
                />
              </Grid.Col>
              {userType() === 'admin' && (
                <Grid.Col md={12} hidden={userType() !== 'admin'}>
                  <Select
                    hidden={userType() !== 'admin'}
                    label="Seller"
                    searchable
                    required
                    size="md"
                    placeholder="Select Seller"
                    data={sellerData}
                    {...form.getInputProps('seller')}
                  />
                </Grid.Col>
              )}
              <Grid.Col lg={6}>
                <TextInput
                  error={renderErrorMessage('VIN')}
                  size="md"
                  required
                  disabled={fieldsDisabled}
                  label="VIN"
                  placeholder="Enter Vehicle's VIN"
                  {...form.getInputProps('VIN')}
                  rightSection={
                    !params?.vehicleId && (
                      <ActionIcon
                        disabled={form.values.VIN?.length === 17 ? false : true}
                        onClick={() => getDataFromAPI()}
                      >
                        <Refresh
                          color={
                            form.values.VIN?.length === 17
                              ? form.values.bodyType
                                ? 'Green'
                                : 'Red'
                              : 'grey'
                          }
                        />
                      </ActionIcon>
                    )
                  }
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <Select
                  label="Condition"
                  searchable
                  required
                  size="md"
                  placeholder="New or Used?"
                  data={[
                    { value: 'new', label: 'New' },
                    { value: 'used', label: 'Used' },
                  ]}
                  {...form.getInputProps('vehicleCondition')}
                />
              </Grid.Col>

              <Grid.Col lg={6}>
                <TextInput
                  size="md"
                  required
                  label="State/Location"
                  placeholder="Enter Vehicle's State/Location"
                  {...form.getInputProps('location')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <NumberInput
                  error={renderErrorMessage('Price')}
                  size="md"
                  required
                  label="Vehicle Price"
                  placeholder="Enter Vehicle's Price"
                  {...form.getInputProps('price')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <NumberInput
                  error={renderErrorMessage('Mileage')}
                  size="md"
                  required
                  label="Mileage"
                  min={0}
                  placeholder="Enter Vehicle's Mileage"
                  {...form.getInputProps('mileage')}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <Select
                  label="Select Vehicle Type"
                  searchable
                  required
                  size="md"
                  disabled={fieldsDisabled}
                  placeholder="Select Vehicle Type"
                  data={[
                    { value: 'truck', label: 'Truck' },
                    { value: 'hatchback', label: 'Hatchback' },
                    { value: 'sedan', label: 'Sedan' },
                    { value: 'suv', label: 'SUV' },
                    { value: 'electric', label: 'Electric' },
                    { value: 'coupe', label: 'Coupe' },
                    { value: 'other', label: 'OTHER' },
                  ]}
                  {...form.getInputProps('vehicleType')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  error={renderErrorMessage('Trim')}
                  size="md"
                  required
                  disabled={fieldsDisabled}
                  label="Trim"
                  placeholder="Enter Vehicle's Trim"
                  {...form.getInputProps('trim')}
                />
              </Grid.Col>

              <Grid.Col md={12} lg={6}>
                <TextInput
                  error={renderErrorMessage('Make')}
                  size="md"
                  disabled={fieldsDisabled}
                  required
                  label="Make"
                  placeholder="Enter Vehicle's Make"
                  {...form.getInputProps('make')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  error={renderErrorMessage('Model')}
                  size="md"
                  required
                  label="Model"
                  placeholder="Enter Vehicle's Model"
                  disabled={fieldsDisabled}
                  {...form.getInputProps('model')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  error={renderErrorMessage('Year')}
                  size="md"
                  required
                  label="Year"
                  placeholder="Enter Vehicle's Year"
                  disabled={fieldsDisabled}
                  {...form.getInputProps('year')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  size="md"
                  required
                  label="Manufacturer"
                  disabled={fieldsDisabled}
                  placeholder="Enter Vehicle's Manufacturer"
                  {...form.getInputProps('manufacturer')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  error={renderErrorMessage('Engine')}
                  size="md"
                  required
                  label="Engine"
                  placeholder="Enter Vehicle's Engine"
                  value={engine}
                  disabled={fieldsDisabled}
                  onChange={(e) => setEngine(e.target.value)}
                  {...form.getInputProps('engine')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <NumberInput
                  size="md"
                  min={0}
                  // max={128}
                  required
                  disabled={fieldsDisabled}
                  hideControls
                  label="Engine Cylinders"
                  placeholder="Enter Vehicle's Engine Cylinders"
                  {...form.getInputProps('engineCylinders')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  error={renderErrorMessage('Fuel Type')}
                  size="md"
                  searchable
                  disabled={fieldsDisabled}
                  required
                  label="Fuel Type"
                  placeholder="Enter Vehicle's Fuel Type"
                  // data={[
                  //   { value: "gasoline", label: "Gasoline" },
                  //   { value: "diesel", label: "Diesel" },
                  //   { value: "electric", label: "Electric" },
                  //   { value: "hybrid", label: "Hybrid" },
                  // ]}
                  // disabled={disabled}
                  {...form.getInputProps('fuelType')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <Select
                  label="Transmission"
                  required
                  searchable
                  size="md"
                  disabled={fieldsDisabled}
                  placeholder="Select Transmission Type"
                  data={[
                    { value: 'manual', label: 'Manual' },
                    { value: 'automatic', label: 'Automatic' },
                  ]}
                  {...form.getInputProps('transmissionType')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  label="Drive Train"
                  required
                  searchable
                  size="md"
                  disabled={fieldsDisabled}
                  placeholder="Select Drive Train"
                  // data={[
                  //   { value: "AWD", label: "All-Wheel Drive (AWD) " },
                  //   { value: "4WD", label: "Four-Wheel Drive (4WD)" },
                  //   { value: "FWD", label: "Front-Wheel Drive (FWD) " },
                  //   { value: "RWD", label: "Rear-Wheel Drive (RWD) " },
                  // ]}
                  {...form.getInputProps('driveTrain')}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <Select
                  label="Doors"
                  required
                  searchable
                  disabled={fieldsDisabled}
                  size="md"
                  placeholder="Select Number Of Doors"
                  data={[
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                  ]}
                  {...form.getInputProps('doors')}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <NumberInput
                  size="md"
                  required
                  disabled={fieldsDisabled}
                  label="Horse Power"
                  placeholder="Enter Vehicle's Horse Power"
                  {...form.getInputProps('horsePower')}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <Textarea
                  error={renderErrorMessage('Description')}
                  size="md"
                  required
                  maxLength={250}
                  label="Vehicle Description"
                  placeholder="Enter Vehicle's Description"
                  minRows={3}
                  autosize
                  // disabled={disabled}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
            </Grid>
            <UploadImagesOnly
              error={error}
              setError={setError}
              disabled={disabled}
              setDisabled={setDisabled}
              disabled1={disabled1}
              setDisabled1={setDisabled1}
              disabled2={disabled2}
              setDisabled2={setDisabled2}
              images={images}
              setImages={setImages}
              percentages={percentages}
              setPercentages={setPercentages}
              urls={urls}
              setUrls={setUrls}
              imageURLS={imageURLS}
              setImageURLS={setImageURLS}
              indexOfCoverImageURL={indexOfCoverImageURL}
              setIndexOfCoverImageURL={setIndexOfCoverImageURL}
              hidden={hidden}
              setHidden={setHidden}
              folder="Vehicles"
              addImages="Describe Your Car With Images"
            />
            <UploadImagesOnly360
              error={error}
              setError={setError}
              disabled={disabled}
              setDisabled={setDisabled}
              disabled1={disabled1}
              setDisabled1={setDisabled1}
              disabled2={disabled2}
              setDisabled2={setDisabled2}
              images={images360}
              setImages={setImages360}
              percentages={percentages360}
              setPercentages={setPercentages360}
              addImages="Upload Images Of Car For 360 View"
            />

            <Grid justify="flex-end">
              <Grid.Col sm={6} xs={6} md={6} lg={3}>
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
              <Grid.Col sm={6} xs={6} md={6} lg={3}>
                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  variant="filled"
                  color="dark"
                  disabled={disabled}
                  loading={loading}
                  rightIcon={<ArrowRight />}
                >
                  {params?.vehicleId ? 'UPDATE' : 'REGISTER'}
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Center>
    </Paper>
  )
}

export default AddVehicle
