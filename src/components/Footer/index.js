import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div> */}
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4" style={{width:'50%'}}>
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Get My Dream Car
              </h6>
              <p style={{textAlign:'justify'}}>
                Get My Dream Car (GMDC) Inc is dedicated to providing you with the ultimate
                automobile buying experience. Get My Dream Car (GMDC) Inc is your #1 source for
                buying a quality pre-owned vehicle. We have extensive
                relationships in the dealer community allowing us to purchase a
                wide variety of lease returns and new car trades at exceptional
                values. This enables Get My Dream Car (GMDC) to pass along huge savings on
                the highest quality vehicles of your choice. In addition, we
                offer a full array of financing options to meet your needs.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Car Finder
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Apply Online
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  About Us
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                2747 Annapolis Rd , Hanover , MD 21076
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                gmdc@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + (240) 307-3416
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <a className="text-reset fw-bold m-2" href="/">
          Get Your Dream Car
        </a>
      </div>
    </MDBFooter>
  );
}
