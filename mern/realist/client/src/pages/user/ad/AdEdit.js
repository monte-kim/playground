import { useState, useEffect } from 'react';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { GOOGLE_PLACES_KEY } from '../../../config';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ImageUpload from '../../../components/forms/ImageUpload';
import Sidebar from '../../../components/nav/Sidebar';

const AdEdit = ({ action, type }) => {
  const [ad, setAd] = useState({
    _id: '',
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
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data.ad);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      // validation
      if (!ad.photos?.length) {
        toast.error('Photo is required');
      } else if (!ad.price) {
        toast.error('Price is required');
      } else if (!ad.description) {
        toast.error('Description is required');
        return;
      } else {
        setAd({ ...ad, loading: true });
        // make API put request
        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success('Ad updated successfully');
          setAd({ ...ad, loading: false });
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });
      // make API put request
      const { data } = await axios.delete(`/ad/${ad._id}`);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success('Ad deleted successfully');
        setAd({ ...ad, loading: false });
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <div>
      <h1 className='display-1 bg-primary text-light p-5'>Ad Edit</h1>
      <Sidebar />
      <div className='container'>
        <div className='mb-3'>
          <ImageUpload ad={ad} setAd={setAd} />
          {loaded ? (
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
          ) : (
            ''
          )}
        </div>

        {loaded ? (
          <CurrencyInput
            placeholder='Enter price'
            defaultValue={ad.price}
            className='form-control mb-3'
            onValueChange={(value) => setAd({ ...ad, price: value })}
          />
        ) : (
          ''
        )}

        {ad.type === 'House' ? (
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

        <div className='d-flex justify-content-between'>
          <button
            onClick={handleClick}
            className={`btn btn-primary ${ad.loading ? 'disabled' : ''}`}
          >
            {ad.loading ? 'Saving...' : 'Submit'}
          </button>

          <button
            onClick={handleDelete}
            className={`btn btn-danger ${ad.loading ? 'disabled' : ''}`}
          >
            {ad.loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>

        {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
      </div>
    </div>
  );
};

export default AdEdit;
