import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children, ...otherProps }) => {
  const [cityLocation, setCityLocation] = useState(null);

  return (
    <LocationContext.Provider value={[cityLocation, setCityLocation]}>
      {children}
    </LocationContext.Provider>
  );
};
