import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  int counter = 0;

  List<int> numbers = [];

  void onClicked() {
    setState(() {
      // extends State<App>에서 State 클래스에게
      // 상태값이 변했으니 뭐라도 해라, 스스로 새로고침 좀 해라 하고 알려주는 함수
      counter++;
    });
  }

  void onClicked2() {
    setState(() {
      numbers.add(numbers.length);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: const Color(0xFFF4EDDB),
        body: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    "Click Counter",
                    style: TextStyle(fontSize: 30),
                  ),
                  Text(
                    "$counter",
                    style: const TextStyle(fontSize: 30),
                  ),
                  IconButton(
                    iconSize: 40,
                    onPressed: onClicked,
                    icon: const Icon(Icons.add_box_rounded),
                  ),
                ],
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    "Click Counter2",
                    style: TextStyle(fontSize: 30),
                  ),
                  for (var number in numbers) Text("$number"),
                  IconButton(
                    iconSize: 40,
                    onPressed: onClicked2,
                    icon: const Icon(Icons.add_box_rounded),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
