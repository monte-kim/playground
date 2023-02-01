// import { Component } from 'react';

import './card.styles.css';

const Card = (props) => {
  const { name, email, id } = props.monster;

  return (
    <div className='card-container' key={id}>
      {/* // 리액트가 key를 요구하는 이유는 항상 re-render 할 때마다 배열 데이터 모두를 하지 않고 최적화된 방식으로, 바뀐 요소만을 바꾸기 위함. */}
      <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
