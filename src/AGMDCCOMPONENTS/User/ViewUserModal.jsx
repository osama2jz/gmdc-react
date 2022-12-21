import { Grid, Group, Image, Text } from "@mantine/core";
import React from "react";
import {
  At,
  BrandWhatsapp,
  DeviceMobile,
  LetterZ,
  Map2,
  User,
} from "tabler-icons-react";

const ViewUserModal = ({ viewUserDetails }) => {
  return (
    <div>
      <Grid>
        <Grid.Col lg={6}>
          <Image src={viewUserDetails?.profileImage?.image} d alt="userProfile" />
        </Grid.Col>
        <Grid.Col lg={6}>
          {" "}
          <Group align={"center"} my="sm" noWrap>
            <User size={30} />
            <Text size={20}>
              {" "}
              {viewUserDetails.name} ({viewUserDetails.role})
            </Text>
          </Group>
          <Group align={"center"} my="sm" noWrap>
            <At size={30} />
            <Text size={20}>{viewUserDetails.email}</Text>
          </Group>
          <Group align={"center"} my="sm" noWrap>
            <DeviceMobile size={30} />
            <Text size={20}>{viewUserDetails.phone}</Text>
          </Group>
          <Group align={"center"} my="sm" noWrap>
            <BrandWhatsapp size={30} />
            <Text size={20}>{viewUserDetails.whatsapp}</Text>
          </Group>
          <Group align={"center"} my="sm" noWrap>
            <Map2 size={30} />
            <Text size={20}>
              {viewUserDetails.city} ({viewUserDetails.state})
            </Text>
          </Group>
          <Group align={"center"} my="sm" noWrap>
            <LetterZ size={30} />
            <Text size={20}>{viewUserDetails.zip}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ViewUserModal;
