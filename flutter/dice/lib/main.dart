import 'package:flutter/material.dart';

import 'package:dice/gradient_container.dart';

void main() {
  print("Hello, Monte!");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dice',
      home: Scaffold(
        body: GradientContainer(colors: const [
          Color.fromARGB(255, 16, 25, 81),
          // Colors.white,
          Color.fromARGB(255, 106, 0, 125),
        ]),
      ),
    );
  }
}
