import { Component } from 'react';

import './card-list.styles.css';

class CardList extends Component {
  render() {
    // 리액트가 re-render 할 때는, state가 변할 때, 또는 props가 변할 때이다.
    const { monsters } = this.props;

    return (
      <div className='card-list'>
        {monsters.map((monster) => {
          const { name, email, id } = monster;
          return (
            <div className='card-container' key={id}>
              {/* // 리액트가 key를 요구하는 이유는 항상 re-render 할 때마다 배열 데이터 모두를 하지 않고 최적화된 방식으로, 바뀐 요소만을 바꾸기 위함. */}
              <img
                alt={`monster ${name}`}
                src={`https://robohash.org/${id}?set=set2&size=180x180`}
              />
              <h2>{name}</h2>
              <p>{email}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CardList;
