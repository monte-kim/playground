import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import ImageGallery from '../components/misc/ImageGallery';
import Logo from '../logo.svg';
import AdFeatures from '../components/cards/AdFeatures';

const AdView = () => {
  // state
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  // hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setRelated(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

  const generatePhotosArray = (photos) => {
    if (photos?.length > 0) {
      const x = photos?.length === 1 ? 2 : 4;
      let arr = [];
      photos.map((photo) => {
        arr.push({
          src: photo.Location,
          width: x,
          height: x,
        });
      });
      return arr;
    } else {
      return [
        {
          src: Logo,
          width: 2,
          height: 1,
        },
      ];
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='row mt-2'>
          <div className='col-lg-4'>
            <button className='btn btn-primary disabled mt-5'>
              {ad.type} for {ad.action}
            </button>
            <div className='mt-4 mb-4'>
              {ad?.sold ? '❌ Off market' : '✔ In market'}
            </div>
            <h1>{ad.address}</h1>
            <AdFeatures ad={ad} />
          </div>
          <div className='col-lg-8'>
            <ImageGallery photos={generatePhotosArray(ad?.photos)} />
          </div>
        </div>
      </div>
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
};

export default AdView;
