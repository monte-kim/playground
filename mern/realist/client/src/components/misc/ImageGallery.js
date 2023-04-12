import { useParams } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

// const photos = [
//   {
//     src: 'https://realist-bucket.s3.ap-northeast-2.amazonaws.com/98qzraslmns-J0f0Gr0md.jpeg',
//     width: 4,
//     height: 3,
//   },
//   {
//     src: 'https://realist-bucket.s3.ap-northeast-2.amazonaws.com/pRyKxQz3J9c2K5_poDrLr.jpeg',
//     width: 1,
//     height: 1,
//   },
// ];

const ImageGallery = ({ photos }) => {
  // state
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // hooks
  const params = useParams();

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
    </>
  );
};

export default ImageGallery;
