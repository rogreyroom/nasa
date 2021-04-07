import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LocationContext } from '../context/LocationContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  z-index: 1;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  max-width: 450px;
  min-width: 300px;
  min-height: 100%;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  --input-bg-color: #f5f5f5;
  --input-font-color: #252525;
  --input-border-color: #e7e7e7;
  --input-outline-color: #addeff;
  --input-border-size: 1px;
  --input-border-radius: 5px;
  background-color: var(--input-bg-color);
  font-family: inherit;
  font-size: 1rem;
  font-size: max(16px, 1em);
  color: var(--input-font-color);
  padding: 0.25em 0.5em;
  border-style: solid;
  border-color: var(--input-border-color);
  border-width: var(--input-border-size);
  border-radius: var(--input-border-radius);
  width: 100%;
  cursor: pointer;
  transition: 180ms box-shadow ease-in-out;

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--input-outline-color);
  }
`;

const StyledAutocompleteList = styled.div`
  --list-bg-color: #f5f5f5;
  --list-border-color: #e7e7e7;
  --list-border-size: 1px;
  --list-border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--list-bg-color);
  border-style: solid;
  border-color: var(--list-border-color);
  border-width: var(--list-border-size);
  border-radius: var(--list-border-radius);
  width: 100%;
  height: auto;
  z-index: 10;
`;

const StyledTipButton = styled.button`
  --button-bg-color: #f5f5f5;
  --button-bg-hover-color: #f0f0f0;
  --button-font-color: #252525;
  --button-border-color: #e7e7e7;
  --button-outline-color: #addeff;

  display: flex;
  background: var(--button-bg-color);
  box-shadow: none;
  color: var(--button-font-color);
  font-family: inherit;
  font-size: 1rem;
  line-height: 1rem;
  text-decoration: none;
  border: none;
  margin: 0;
  padding: 0.5rem 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  justify-content: start;
  align-items: center;
  width: 100%;

  &:hover {
    background: var(--button-bg-hover-color);
  }

  &:focus,
  &:active {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--button-outline-color);
  }
`;

const AutocompleteInput = () => {
  // eslint-disable-next-line no-unused-vars
  const { register, watch, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: { inputLocation: '' },
  });
  const watchInput = watch('inputLocation', '');
  // eslint-disable-next-line no-unused-vars
  const [cityLocation, setCityLocation] = useContext(LocationContext);
  const [location, setLocation] = useState(null);
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [isServerError, setServerError] = useState(false);

  const getLocation = async (searchText) => {
    try {
      const searchResponse = await axios.post(
        `https://nominatim.openstreetmap.org/search?city=${searchText}&format=json&zoom=10&limit=25`,
      );
      return searchResponse.data;
    } catch (error) {
      console.error(error);
      return setServerError((isServerError) => true);
    }
  };

  // eslint-disable-next-line
  useEffect(async () => {
    const searchResult = await getLocation(watchInput);
    const citesData = searchResult.reduce((acc, curr) => {
      const cityNameArray = curr.display_name.split(',');
      const cityName = `${cityNameArray[0]} / ${cityNameArray[1]} / ${
        cityNameArray[cityNameArray.length - 1]
      }`;
      acc.push({ name: cityName, lat: curr.lat, lon: curr.lon });
      return acc;
    }, []);
    setSuggestedLocations((suggestedLocations) => citesData);
  }, [watchInput]);

  useEffect(() => {
    location && setCityLocation((cityLocation) => location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSubmit = () => {
    reset();
  };

  const handleLocationClick = async (selectedLocation) => {
    setLocation((location) => selectedLocation);
    onSubmit();
  };

  return (
    <StyledInputWrapper>
      <StyledForm handleSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="Search city..."
          {...register('inputLocation', { pattern: /^[A-Za-z]+$/i })}
        />
      </StyledForm>
      {isServerError ? (
        <spam>Server Error</spam>
      ) : (
        suggestedLocations.length > 0 && (
          <StyledAutocompleteList>
            {suggestedLocations.map((location) => {
              const uuid = uuidv4();
              const locationName = location.name;
              return (
                <StyledTipButton
                  type="button"
                  key={uuid}
                  onClick={() => handleLocationClick(location)}
                >
                  {locationName}
                </StyledTipButton>
              );
            })}
          </StyledAutocompleteList>
        )
      )}
    </StyledInputWrapper>
  );
};

export default AutocompleteInput;
