import { useParams } from 'react-router-dom';

const AdView = () => {
  const params = useParams();
  return <>{params.slug}</>;
};

export default AdView;
