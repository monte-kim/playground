import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

import AdCard from '../components/cards/AdCard';

const Buy = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get('/ads-for-sell');
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className='display-1 bg-primary text-light p-5'>For Sell</h1>
      <div className='container'>
        {/* <pre>{JSON.stringify(ads.ads, null, 4)}</pre>
        <div></div> */}
        <div className='row'>
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
