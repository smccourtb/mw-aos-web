'use client';

import ReactGA from 'react-ga4';

import clientConfig from '@/firebase/clientConfig';

ReactGA.initialize(clientConfig.measurementId as string);

const GoogleAnalytics = () => {
  return <></>;
};

export default GoogleAnalytics;
