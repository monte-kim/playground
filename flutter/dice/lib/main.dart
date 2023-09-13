import 'package:flutter/material.dart';

import 'package:dice/gradient_container.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GradientContainer(colors: const [
          Color.fromARGB(255, 16, 25, 81),
          // Colors.white,
          Color.fromARGB(255, 106, 0, 125),
        ]),
      ),
    ),
  );
}
