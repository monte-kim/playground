import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          },
        ),
      );
    // .then((response) => {
    //   response.json()
    // })
    // .then((users) => {console.log(users)});
    // 중괄호 안에 response.json() 과 밖에 있는 것의 결과가 왜 다른가?
    // -> 화살표 함수 확인
  }

  render() {
    return (
      <div className='App'>
        {this.state.monsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
          // 리액트가 key를 요구하는 이유는 항상 re-render 할 때마다 배열 데이터 모두를 하지 않고 최적화된 방식으로, 바뀐 요소만을 바꾸기 위함.
        })}
      </div>
    );
  }
}

export default App;
