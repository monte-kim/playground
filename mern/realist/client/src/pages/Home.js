import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

const Home = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [adsForSell, setAdsForSell] = useState();
  const [adsForRent, setAdsForRent] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get('/ads');
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className='display-1 bg-primary text-light p-5'>Home</h1>
      <pre>{JSON.stringify({ adsForSell, adsForRent }, null, 4)}</pre>
    </div>
  );
};

export default Home;
