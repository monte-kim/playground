## Functions

- ### Defining a Function

```
void sayHello(String name){
    print("Hello, $name!");
}

num plus(num a, num b) => a + b;

void main(){
    var name = "monte";
    sayHello(name); // Hello, monte!
    print(plus(3.1, 2.9));  // 6
}
```

Dart에서 함수를 선언할 때에는

`(return type)(function name)(<Data type> (parameter name)){(return value)};`

또는

`(return type)(function name)(<Data type> (parameter name)) => (return value)`

와 같은 형식으로 선언한다.

- ### Named Parameters

```
String sayHello(String name, int age, String country){
    return "Hello, $name, you are $age, from $country.";
}

void main(){
    print(sayHello("monte", 26, "Korea"));
    // Hello, monte, you are 26, from Korea.
}
```

이와 같이 함수에 여러 인자를 전달하면 개발자는 전달 순서를 잊을 수도 있어 좋지 않은 방법이다.

이 때, 사용할 수 있는 것이 `named arguments` 이며, 이 때는 전달 인자의 순서가 상관이 없고, 아래와 같이 활용할 수 있다.

```
String sayHello({
        String name,
        int age,
        String country,
    }){
    return "Hello, $name, you are $age, from $country.";
}

void main(){
    print(sayHello(
            age: 26,
            country: "Korea",
            name: "monte",
        ));
    // Hello, monte, you are 26, from Korea.
}
```

하지만 이 경우에도 에러가 발생할 수 있다.

사용자가 name, country 등을 전달하지 않아 null 값이 전달되는 경우를 막기 위해 `sayHello()`에서 `default value`를 정해둘 수 있고, 아래와 같다.

```
String sayHello({
        String name = "taehwan",
        int age = 26,
        String country = "United States of America"
    }){
    return "Hello, $name, you are $age, from $country.";
}
```

`default value`를 명시하지 않고 사용자로부터 무조건 받아야하는 경우, 아래와 같이 `required` 키워드를 사용하는 방법도 있다.

```
String sayHello({
        required String name,
        required int age,
        required String country,
    }){
    return "Hello, $name, you are $age, from $country.";
}
```

- ### Optional Positional Parameters

```
String sayHello({
        String name,
        int age,
        [String? country = "Korea"],
    }) => "Hello, $name, you are $age, from $country.";

void main(){
    sayHello("monte", 26);
}

```

위 코드에서는 마지막 인자인 `country`를 보내지 않아도 에러가 발생하지 않는다.

그 이유는 `sayHello()`의 매개변수 중 `country`를 `nullable`한 값으로 지정했기 때문이다.

- ### QQ Operator(??, ??=)

```
String capitalizeName(String? name) {
    if(name != null)
        return name.toUpperCase();

    return "ANONYMOUS";
}
//이 함수를 아래로 축약할 수 있다.

String capitalizeName2(String? name) => name != null ? name.toUpperCase() : "ANONYMOUS";

// 이 함수는 아래와 같이 더 축약할 수 있다.

String capitalizeName3(String? name) => name?.toUpperCase() ?? "ANONYMOUS";

void main(){
    capitalizeName("monte");    // MONTE
    capitalizeName3(null);  // ANONYMOUS
    String? name;
    name ??= "taehwan";
    print(name);    // taehwan
}
```

`??` 연산자를 활용하면 좌측 피연산자가 null값이 아닌 경우에 반환되고, null값이라면 우측 피연산자가 반환된다.

`??=` 연산자는 좌측 피연산자가 null값이라면 우측 피연산자를 좌측 피연산자의 값으로 할당하여 저장하는 것이다.

- ### typedef

```
List<int> reverseListOfNumbers(List<int> list){
    var reversed = list.reversed;   // list 형태와는 살짝 다른 자료형이 반환된다.
    return reversed.toList();   // 다시 list로 자료형 변환
}

void main(){
    reverseListOfNumbers([1, 2, 3]);    // [3, 2, 1]
}
```

`typedef` 키워드를 활용하면 위에서 `List<int>`와 같은 자료형에 대해 아래 코드와 같이 새로운 별칭(`alias`)를 부여할 수 있다.

```
typedef ListOfIntegers = List<int>;

ListOfIntegers reverseListOfNumbers(List<int> list){
    var reversed = list.reversed;   // list 형태와는 살짝 다른 자료형이 반환된다.
    return reversed.toList();   // 다시 list로 자료형 변환
}

void main(){
    reverseListOfNumbers([1, 2, 3]);    // [3, 2, 1]
}
```

<i>하지만, `Map<String, String>`과 같은 구조화된 데이터에 대해서도 `typedef`를 활용하고 싶을 때에는 클래스를 활용하는 것이 좋다.</i>
