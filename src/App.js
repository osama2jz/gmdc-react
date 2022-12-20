// routes
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

export default function App() {
   // useEffect(() => {
   //    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
   // }, [lang]);

   return (
      <Router>
         <Routes />
      </Router>
   );
}