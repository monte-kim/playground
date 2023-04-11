import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from 'react-photo-gallery';

const photos = [
  {
    src: 'https://realist-bucket.s3.ap-northeast-2.amazonaws.com/98qzraslmns-J0f0Gr0md.jpeg',
    width: 4,
    height: 3,
  },
  {
    src: 'https://realist-bucket.s3.ap-northeast-2.amazonaws.com/pRyKxQz3J9c2K5_poDrLr.jpeg',
    width: 1,
    height: 1,
  },
];

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

  return (
    <>
      <Gallery photos={photos} />
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
};

export default AdView;
