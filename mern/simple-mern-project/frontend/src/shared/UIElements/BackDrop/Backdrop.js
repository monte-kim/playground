import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';

import './Backdrop.scss';

const Backdrop = (props) => {
  return createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook'),
  );
};

export default Backdrop;
