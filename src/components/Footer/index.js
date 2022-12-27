import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import loc from "../../assets/location.svg";
import email from "../../assets/email.svg";
import phone from "../../assets/phone.svg";

export default function footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol className="mx-auto mb-4 desp">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Get My Dream Car
              </h6>
              <p style={{ textAlign: "justify" }}>
                Get My Dream Car (GMDC) Inc is dedicated to providing you with
                the ultimate automobile buying experience. Get My Dream Car
                (GMDC) Inc is your #1 source for buying a quality pre-owned
                vehicle. We have extensive relationships in the dealer community
                allowing us to purchase a wide variety of lease returns and new
                car trades at exceptional values. This enables Get My Dream Car
                (GMDC) to pass along huge savings on the highest quality
                vehicles of your choice. In addition, we offer a full array of
                financing options to meet your needs.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="/" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="/inventory" className="text-reset">
                  Car Finder
                </a>
              </p>
              <p>
                <a href="/apply" className="text-reset">
                  Apply Online
                </a>
              </p>
              <p>
                <a href="/aboutus" className="text-reset">
                  About Us
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <img src={loc} style={{ width: "20px" }} className="mr-2" />
                2747 Annapolis Rd , Hanover , MD 21076
              </p>
              <p>
                <img src={email} style={{ width: "20px" }} className="mr-2" />
                usergmdc@gmail.com
              </p>
              <p>
                <img src={phone} style={{ width: "20px" }} className="mr-2" />+
                (240) 307-3416
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <a className="text-reset fw-bold m-2" href="/">
          Get My Dream Car
        </a>
      </div>
    </MDBFooter>
  );
}
