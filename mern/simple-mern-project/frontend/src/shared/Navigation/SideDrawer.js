import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';

import './SideDrawer.scss';

const SideDrawer = (props) => {
  const content = <aside className='side-drawer'>{props.children}</aside>;

  return createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
