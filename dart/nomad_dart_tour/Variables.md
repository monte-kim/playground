## Variables

- ### Var

Var은 선언될 때, 아무거나 들어갈 수 있음.
하지만 이후에 다른 값으로 수정은 가능하나 데이터 타입을 바꿀 수는 없음.
클래스 property에서는 주로 명시적 타입을 사용하지만, 이 외에 메서드 내에서 등은 var을 사용함.

- ### Dynamic Type

Dynamic은 선언될 때, 데이터 타입이 정해지지 않는 것이다.
따라서, 다른 데이터 타입의 값이 저장되어도 에러가 발생하지 않는다.
if절 안의 조건문에서 dynamic type의 변수가 사용되면 해당 변수의 타입을 몰라도
비교 대상 및 dynamicData is String 과 같은 조건문에서는 해당 변수를 String 타입으로 생각한다.

```
void main(){
  dynamic name = 'monte';
  if(name is String){
    name.(string 관련 함수들)
  }
}
```

자주 쓰지 말것.

- ### null safety
  개발자가 null 값을 참조하지 못하도록 하는 기능.
  코드에서 null 값을 참조한다면 runtime(실행 중) 에러가 발생하는데 이러면 위험하므로 컴파일 전에 잡는 것이 좋다. 이를 돕는 것이 null safety이다.

```
bool isEmpty(String string) => string.length == 0;

main(){
    isEmpty(null);
}
```

null safety를 활용하는 방법

```
void main(){
    String? monte = "monte";
    monte = null;
    if(monte != null){
        print(monte.length);
    }   //print(monte?.length);
}
```

여기서 컴파일러는 String?의 물음표를 통해 monte 변수가 null일 수도 있음을 알고 실행 전에 에러를 잡을 수 있다.

- ### final
  가끔 변수의 값이 재할당 되어서는 안 될 때가 있다.
  이를 위한 키워드가 final이다.
  final로 정의된 변수는 값을 수정할 수 없다.(javascript의 const 역할)

```
//to be specific
final String name = "monte";
name = "taehwan"; // 에러 발생
```

- ### late

```
late final String name;
// do smth, like.. go to api
name = "monte";
name = 12;  // 에러 발생
```

late 키워드는 초기 데이터 없이 final 변수를 정의할 수 있게 해주고, 해당 변수의 값은 나중에 할당해도 된다.
이 때, Dart는 late로 정의된 변수를 값이 할당되기 전에 접근하려고 하면 에러를 발생시킨다.

- ### const
  Dart의 const 키워드는 javascript의 const 키워드와 다르다.
  Dart의 const는 compile-time constant로, final처럼 수정될 수 없는 변수이지만, 컴파일 할 때, 해당 변수의 값을 알고 있어야한다.

<hr/>

### 👀 잊지 말 것!

- const와 final의 차이는 값을 할당하는 시간이 compile-time이냐, run-time이냐의 차이.

  공통점은 둘 다 값이 재할당 될 수는 없음.

- late는 변수를 초기화하지 않아도 되도록 하는 키워드(for var, String, final).

- null safety는 내 코드가 null값을 참조하지 못하도록 예방해주는 기능.

  하지만 null을 사용해야하는 경우 변수 선언 시 변수 타입에 ?를 추가하면 된다.(String? name = "monte";)
