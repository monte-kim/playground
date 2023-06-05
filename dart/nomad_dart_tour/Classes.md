## Classes

- ### Dart Class

```
class Player{
    final String name = "monte";
    int xp = 1500;

    void sayHello(){
        print("Hi my name is $name");
    }
}

void main(){
    var player = Player();
}
```

Dart에서는 클래스를 위와 같이 선언하고 해당 객체를 생성할 때, `new` 키워드가 필요하지 않다.

클래스의 변수 값을 수정하지 못하도록 하고 싶다면 마찬가지로 `final` 키워드를 사용하면 된다.

또, 클래스 안의 함수에서는 `this`를 활용하지 않고 멤버 변수를 사용할 수 있으며, Dart에서는 `this`를 사용하지 않는 것을 권고한다.

하지만, 이미 함수 안에 멤버 변수와 같은 이름의 변수가 존재한다면 불가피하게 `this`를 활용해야한다.

- ### Constructor

```
class Player{
    late final String name;
    late int xp;

    Player(String name, int xp){
        this.name = name;
        this.xp = xp;
    }

    void sayHello(){
        print("Hi my name is $name");
    }
}

void main(){
    var player1 = Player("monte", 1500);
    var player2 = Player("taehwan", 2500);
    player1.sayHello();
}
```

클래스 객체의 멤버 변수 값들을 모두 다르게 하기 위해 생성자를 위와 같이 만들 수 있다.

이 때, 위 코드에서 생성자 코드를 보면 반복되는 코드가 많기 때문에, 이를 아래와 같이 수정할 수 있다.

```
class Player{
    late final String name;
    late int xp;

    Player(this.name, this.xp);
}
```

- ### Named Constructor Parameters

생성자를 활용할 때에도 함수와 같이 각 인자를 순서가 아닌 이름으로 전달할 수 있다.

```
class Player{
    final String name;
    int xp;
    String team;
    int age;

    Player({this.name, this.xp, this.team, this.age});
}

void main(){
    var player = Player(
        name: "monte",
        xp: 1500,
        team: "blue",
        age: 26,
    );
}
```

하지만 위 코드와 같은 경우에는 함수와 마찬가지로, 어떤 인자에 null값이 들어가서는 안 되므로 `required` 키워드를 함께 사용하거나 `default value`를 지정해줘야 한다.

- ### Named Constructors

```
class Player{
    final String name;
    int xp, age;
    String team;

    Player({this.name, this.xp, this.team, this.age});

    Player.createBluePlayer({
        required String name, required int age
    }) :  this.name = name,
          this.age = age,
          this.xp = 0,
          this.team = "blue";

    Player.createRedPlayer(
        String name, int age
    ) :  this.name = name,
          this.age = age,
          this.xp = 0,
          this.team = "red";
}

void main(){
    var bluePlayer = Player.createBluePlayer(
        name: "monte",
        age: 26,
    )
    var redPlayer = Player.createRedPlayer(
        name: "taehwan",
        age: 25,
    )
}
```

위 코드처럼 Dart에서는 생성자에 이름을 지정할 수 있다.

생성자마다 초기화하거나 생성자가 하는 역할이 다를 수 있으며, `{}`가 아닌 `:` 을 통해 멤버 변수 값을 초기화한다.

- ### Cascade Notation

```
class Player{
    final String name;
    int xp;
    String team;

    Player({required this.name, required this.xp, required this.team});
}

void main(){
    var player = Player(
        name: "monte",
        xp: 1500,
        team: "blue",
    )
    ..name = "taehwan"
    ..xp = 2300
    ..team = "red";
}
```

위 코드는 기존의 클래스 멤버 변수에 접근할 때, `player.name`로 접근하는 문법과는 달리 ..을 통해 생성자 호출 즉시 멤버변수도 접근할 수 있도록 하는 문법이다.

멤버 변수 외에도 같은 방법으로 멤버 함수도 접근이 가능하다.

- ### Enums

`Enums`란, 선택의 폭을 좁혀주는 역할을 한다, 보기를 주고 오타 등이 존재하더라도 해당 `enums` 안에 있는 목록에서 선택지가 정해지므로 에러를 통해 실수를 줄일 수 있다.

```
enum Team {red, blue}   // type Team

class Player{
    final String name;
    int xp;
    Team team;

    Player({required this.name, required this.xp, required this.team});
}

void main(){
    var player = Player(
        name: "monte",
        xp: 1500,
        team: Team.blue,
    )
}
```

위 코드에서 `player.team = "bule"` 와 같이 오타가 존재하는 경우, 오타를 늦게 발견할 가능성이 있다.

하지만, `enum`을 통해 멤버 변수를 지정한다면 오타로 인한 에러는 예방할 수 있다.

- ### Abstract Class

추상화 클래스는 다른 클래스들이 직접 구현해야 할 메소드들의 일종의 청사진(blue print), 및 틀이다.

```
abstract class Human{
    void walk();
}

class Player extends Human{
    //...
    void walk(){
        print("I'm walking");
    }
}
class Coach extends Human{
    //...
    void walk(){
        print("The coach is walking");
    }
}
```

위 코드와 같이 추상화 클래스는 특정 메소드의 반환값과 이름, 매개변수만 지정을 하고 구현하지는 않는다.

나머지 클래스들이 해당 클래스를 상속 받아 정해진 틀 안에서 메소드를 구현하면 된다.

- ### Inheritance

```
class Human{
    final String name;
    Human({required this.name});
    void sayHello(){
        print("Hi my name is $name");
    }
}
enum Team {blue, red}
class Player extends Human{
    final Team team;

    Player({
        required this.team,
        required String name,
    }) : super(name: name);

    @override
    void sayHello(){
        super.sayHello();
        print("and I play for ${team}");
    }
}
void main(){
    var player = Player(team: Team.red, name: "monte")
}
```

클래스 상속은 특정 메소드를 재구현하지 않아도 된다는 편리함이 있다.

다른 객체지향 언어들과 마찬가지로 super()을 통해 부모 클래스의 멤버함수 및 변수에 접근할 수 있다.

- ### Mixins

`Mixin`은 생성자가 없는 클래스를 의미한다.

클래스에 프로퍼티들을 추가할 때 사용한다.

```
class Strong{
    final double strengthLevel = 1500.99;
}
class QuickRunner{
    void runQuick(){
        print("ruuuuuuuuuun!");
    }
}
class Player with Strong, QuickRunner{

}
```

`with` 키워드를 통해 `Mixin` 클래스의 멤버 변수를 상속 없이 가져올 수 있다.

이 클래스의 장점은 같은 멤버를 갖는 클래스가 여러 개인 경우 같은 코드가 반복될 필요 없이 `with`를 통해 모두 같은 멤버를 가질 수 있다는 것이다.
