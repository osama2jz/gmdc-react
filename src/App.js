// routes
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

export default function App() {
  // useEffect(() => {
  //    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  // }, [lang]);

  return (
    <Router>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      ></link>
      <Routes />
    </Router>
  );
}
