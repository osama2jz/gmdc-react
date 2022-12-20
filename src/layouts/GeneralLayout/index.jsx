import React from 'react';
import { withTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const GeneralLayout = ({ t  }) => {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
};

export default withTranslation()(GeneralLayout);