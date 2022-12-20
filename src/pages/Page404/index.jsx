import React from 'react';
import { withTranslation } from 'react-i18next';

import Page from '../../components/Page';
import './styles.scss';

const Page404 = ({ t }) => {
   return (
      <Page meta='PISES' className='page-404'>
         <div className='d-flex flex-column align-items-center gap-4'>
            <h1>{t("generic.404")}</h1>
            <h6>{t("generic.404Msg")}</h6>
         </div>
      </Page>
   );
};

export default withTranslation()(Page404);