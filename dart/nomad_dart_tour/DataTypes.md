## Data Types

- ### Basic Data Types

  - String
  - bool
  - num

    - int
    - double

  - etc...
    이 모든 자료형들은 object 맟 class 이다.

- ### List
  list는 배열이며, 아래와 같이 사용한다.

```
void main(){
    var numbers1 = [1, 2, 3, 4];
    List<int> numbers2 = [1, 2, 3, 4];  // class 안애서 선언 시 적합

    // list 관련 함수들
    numbers2.add(5);
    numbers1.firts();
    numbers1.last();
}
```

list 관련 기능 중 collection if, collection for이 있다.

> collection if
>
> ```
> void main(){
>    var giveMeFive = true;
>    var numbers = [
>        1,
>        2,
>        3,
>        4,
>        if(giveMeFive) 5,
>    ]
>    // if(giveMeFive) numbers.add(5);
> }
> ```
>
> list 안에서 조건문을 활용할 수 있으며, 해당 조건식이 참인 경우 요소가 추가된다.

> collection for
>
> void main(){
>
> ```
> var oldFriends = ['monte', 'taehwan'];
> var newFriends = [
>  'louis',
>  'jose',
>  'nico',
>  for(var friend in oldFriends) "😀 $friend"
>  ];
> print(newFriends); //[louis, jose, nico, 😀 monte, 😀 taehwan];
>
> }
> ```
>
> list 안에서 반복문을 활용하여 기존의 다른 배열 원소들을 간략한 문법으로 추가할 수 있다.

이러한 기능들은 Dart 내에서 개발자가 문법들을 간략히 축약할 수 있도록 도와준다.

- ### String Interpolation

```
void main(){
    var name = "monte";
    var greeting = "Hello, this is $name!";
    print(greeting);    // Hello, this is monte!
}
```

이처럼 문자열 안에 문자열 변수를 넣을 때는 `$` 뒤에 변수를 넣으면 된다.

이 때, 변수가 아닌 다른 것이 오면 안 된다.

변수에 연산을 추가할 때는 `${age + 2}`와 같이 사용하면 된다.

- ### Maps

Dart의 Maps는 Javscript의 object 또는 Python의 dictionary와 같은 역할이다.

```
void main(){
    var player = {
        'name': 'monte',
        'age': 26,
        'univ': true,
    };  // datatype: Map<String, Object> -> <Key, Value>
    // var 대신 Map<int, bool> 이런 식으로 선언할 수도 있다.
    }
```

<i>여기서 Object는 datatype이 any라고 봐도 된다. 숫자, 문자열, 불리안 등이 올 수 있다.</i>

Dart의 모든 자료형은 class 형태이므로 `player.~~~' 형태로 관련 함수들을 활용할 수 있다.

- ### Sets

```
void main(){
    var numbers = {1, 2, 3, 4};
    // Set<int> numbers = {1, 2, 3, 4};
    numbers.add(1);
    numbers.add(1);
    numbers.add(1);
    print(numbers); // {1, 2, 3, 4}
}
```

Set와 List의 차이는 Set에 있는 원소들은 모두 하나씩만 존재할 수 있다는 것이다.

Python의 tuple과 같은 역할이며, 집합이라 생각하면 편리하다.
