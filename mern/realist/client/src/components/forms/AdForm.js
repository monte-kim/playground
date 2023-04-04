import { useState } from 'react';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';

import { GOOGLE_PLACES_KEY } from '../../config';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AdForm = ({ action, type }) => {
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    carpark: '',
    landsize: '',
    type: '',
    title: '',
    description: '',
    loading: false,
  });

  return (
    <>
      <div className='mb-3 form-control'>
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions='kp'
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: 'Search for address..',
            onChange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>

      <CurrencyInput
        placeholder='Enter price'
        defaultValue={ad.price}
        className='form-control mb-3'
        onValueChange={(value) => setAd({ ...ad, price: value })}
      />

      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
};

export default AdForm;
