import { useState } from 'react';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { GOOGLE_PLACES_KEY } from '../../config';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ImageUpload from './ImageUpload';

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
    title: '',
    description: '',
    loading: false,
    type: type,
    action: action,
  });

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.post('/ad', ad);
      console.log('ad create response => ', data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success('Ad created successfully');
        setAd({ ...ad, loading: false });
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <>
      <div className='mb-3'>
        <ImageUpload ad={ad} setAd={setAd} />
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions='kp'
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: 'Search for address...',
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

      {type === 'House' ? (
        <>
          <input
            type='number'
            min='0'
            className='form-control mb-3'
            placeholder='Enter how many bedrooms'
            value={ad.bedrooms}
            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          />

          <input
            type='number'
            min='0'
            className='form-control mb-3'
            placeholder='Enter how many bathrooms'
            value={ad.bathrooms}
            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          />

          <input
            type='number'
            min='0'
            className='form-control mb-3'
            placeholder='Enter how many carparks'
            value={ad.carpark}
            onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
          />
        </>
      ) : (
        ''
      )}

      <input
        type='text' //450sqm
        className='form-control mb-3'
        placeholder='Size of land'
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />

      <input
        type='text'
        className='form-control mb-3'
        placeholder='Enter title'
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />

      <textarea
        className='form-control mb-3'
        placeholder='Enter description'
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />

      <button
        onClick={handleClick}
        className={`btn btn-primary ${ad.loading ? 'disabled' : ''}`}
      >
        {ad.loading ? 'Saving...' : 'Submit'}
      </button>

      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
};

export default AdForm;
