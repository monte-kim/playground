import { Component } from 'react';

class CardList extends Component {
  render() {
    console.log('render from CardList');
    // 리액트가 re-render 할 때는, state가 변할 때, 또는 props가 변할 때이다.
    const { monsters } = this.props;

    return (
      <div>
        {monsters.map((monster) => {
          return <h1 key={monster.id}>{monster.name}</h1>;
          // 리액트가 key를 요구하는 이유는 항상 re-render 할 때마다 배열 데이터 모두를 하지 않고 최적화된 방식으로, 바뀐 요소만을 바꾸기 위함.
        })}
      </div>
    );
  }
}

export default CardList;
