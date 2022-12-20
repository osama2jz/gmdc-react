import * as React from "react";
import { Helmet } from "react-helmet-async";

const Page = React.forwardRef(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Helmet>{meta}</Helmet>

      <div ref={ref} {...other}>
        {children}
      </div>
    </>
  )
);

export default Page;
