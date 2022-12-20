import { Suspense } from 'react';
// components
import Loader from '../Loader';

const Loadable = (Component) => (props) => (
   <Suspense fallback={<Loader />}>
      <Component {...props} />
   </Suspense>
);

export default Loadable;
