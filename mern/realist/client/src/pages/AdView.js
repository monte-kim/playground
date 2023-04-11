import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

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
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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

  const openLightBox = useCallback((event, { photo, index }) => {
    setCurrent(index);
    setIsOpen(true);
  }, []);

  const closeLightBox = () => {
    setCurrent(0);
    setIsOpen(false);
  };

  return (
    <>
      <Gallery photos={photos} onClick={openLightBox} />
      <ModalGateway>
        {isOpen ? (
          <Modal onClose={closeLightBox}>
            <Carousel
              currentIndex={current}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
};

export default AdView;
