'use client';

import { MutatingDots } from 'react-loader-spinner';

const GenericLoading = () => (
  <MutatingDots
    ariaLabel="Chargement"
    color="#ffffff"
    secondaryColor="#ffffff"
    visible={true}
    height="100"
    width="100"
    radius="12.5"
  />
);

export default GenericLoading;
