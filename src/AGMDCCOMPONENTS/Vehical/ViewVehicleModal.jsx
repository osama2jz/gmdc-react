import { Carousel } from '@mantine/carousel'
import {
  Badge,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import React from 'react'
import {
  CalendarEvent,
  GasStation,
  Gauge,
  ManualGearbox,
} from 'tabler-icons-react'
import Car360View from '../Car360View'

const ViewVehicleModal = ({ vehicleDetails }) => {
  let iconSize = 30
  const images =
    vehicleDetails?.assets.length > 0 ? vehicleDetails?.assets : ['']
  let processedImages = images?.map((image) => image?.asset)
  console.log('PROCESSED IMAGS', processedImages, 'IMAGES', images, 'DETAILS')

  return (
    <div>
      <Group position="apart">
        <Group>
          <Title order={2}>{vehicleDetails?.title}</Title>
          <Badge
            color={vehicleDetails?.status === 'available' ? 'green' : 'blue'}
            // size="lg"
            variant="filled"
          >
            {vehicleDetails?.status}
          </Badge>
        </Group>

        <Title order={3}>${vehicleDetails?.price.toLocaleString()}</Title>
      </Group>
      <Grid>
        <Grid.Col lg={6}>
          <Paper px="lg" mt="xl">
            <Car360View
              basePath={vehicleDetails.image360?.basePath}
              amount={vehicleDetails.image360?.amount}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col lg={6}>
          {vehicleDetails.assets?.length > 0 && (
            <Carousel withIndicators>
              {processedImages?.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    key={index}
                    fit="cover"
                    src={image}
                    height="500px"
                    width="100%"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
        </Grid.Col>
      </Grid>

      <Grid mt={'md'} p={'sm'} style={{}}>
        <Grid.Col
          xs={6}
          sm={6}
          md={6}
          lg={3}
          xl={3}
          style={{ border: '1px solid #E6E6E6' }}
        >
          <Stack justify={'center'} align={'center'}>
            <CalendarEvent size={iconSize} />
            {vehicleDetails?.year}
          </Stack>
        </Grid.Col>
        <Grid.Col
          xs={6}
          sm={6}
          md={6}
          lg={3}
          xl={3}
          style={{ border: '1px solid #E6E6E6' }}
        >
          <Stack justify={'center'} align={'center'}>
            <Gauge size={iconSize} />
            {vehicleDetails?.mileage.toLocaleString() + ' km'}
          </Stack>
        </Grid.Col>
        <Grid.Col
          xs={6}
          sm={6}
          md={6}
          lg={3}
          xl={3}
          style={{ border: '1px solid #E6E6E6' }}
        >
          <Stack justify={'center'} align={'center'}>
            <GasStation size={iconSize} />
            {vehicleDetails?.fuelType}
          </Stack>
        </Grid.Col>
        <Grid.Col
          xs={6}
          sm={6}
          md={6}
          lg={3}
          xl={3}
          style={{ border: '1px solid #E6E6E6' }}
        >
          <Stack justify={'center'} align={'center'}>
            <ManualGearbox size={iconSize} />
            {vehicleDetails?.transmission}
          </Stack>
        </Grid.Col>
        <Grid my={'md'}>
          <Grid.Col span={6} style={{ borderRight: '1px solid #E6E6E6' }}>
            <Grid>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>VIN #</Text>
                  <Text>{vehicleDetails.vin}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Manufacturer</Text>
                  <Text>{vehicleDetails.manufacturer}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Make</Text>
                  <Text>{vehicleDetails.make}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Model</Text>
                  <Text>{vehicleDetails.model}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Color</Text>
                  <Text>{vehicleDetails.color}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  {' '}
                  <Text>Body Type</Text>
                  <Text>{vehicleDetails.vehicleType}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Type</Text>
                  <Text>{vehicleDetails.vehicleType}</Text>
                </Group>
                <Divider mt={'sm'} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6}>
            <Grid>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Trim</Text>
                  <Text>{vehicleDetails.trim}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Condition</Text>
                  <Text>{vehicleDetails.condition}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  {' '}
                  <Text>Horse Power</Text>
                  <Text>{vehicleDetails.horsePower}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  {' '}
                  <Text>Drive Train</Text>
                  <Text>{vehicleDetails.driveTrain}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  {' '}
                  <Text>Doors</Text>
                  <Text>{vehicleDetails.door}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Cylinders</Text>
                  <Text>{vehicleDetails.cylinder}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Divider mb={'sm'} />
                <Group position="apart">
                  <Text>Status</Text>
                  <Badge
                    color={
                      vehicleDetails?.status === 'available' ? 'green' : 'blue'
                    }
                    size="lg"
                    variant="filled"
                  >
                    {vehicleDetails?.status}
                  </Badge>
                </Group>
                <Divider mt={'sm'} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Grid.Col>
          <Text>Description</Text>
          <Text>{vehicleDetails.description}</Text>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default ViewVehicleModal
