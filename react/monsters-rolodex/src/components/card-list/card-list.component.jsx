// import { Component } from 'react';

import './card-list.styles.css';
import Card from '../card/card.component';

const CardList = ({ monsters }) => {
  // 리액트가 re-render 할 때는, state가 변할 때, 또는 props가 변할 때이다.
  // const { monsters } = props;

  return (
    <div className='card-list'>
      {monsters.map((monster) => {
        return <Card monster={monster} key={monster.id} />;
      })}
    </div>
  );
};

export default CardList;
