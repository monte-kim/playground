const ImageUpload = ({ ad, setAd }) => {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length !== 0) {
        console.log(files);
        setAd({ ...ad, uploading: true });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, uploading: true });
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  return (
    <>
      <label className='btn btn-secondary'>
        Upload photos
        <input
          onChange={handleUpload}
          type='file'
          accept='image/*'
          multiple
          hidden
        />
      </label>
    </>
  );
};

export default ImageUpload;
