import 'package:flutter/material.dart';

import 'package:dice/dice_roller.dart';

// import 'package:dice/styled_text.dart';

// final과 const의 차이점은 무엇일까? final은 런타임에 초기화되고 const는 컴파일 타임에 초기화된다.
const Alignment beginAlignment = Alignment.topLeft;
const Alignment endAlignment = Alignment.bottomRight;

class GradientContainer extends StatelessWidget {
  GradientContainer({super.key, required this.colors});
  // const GradientContainer(this.colors, {super.key});

  // List, Objects are editable in Dart so we can't use const in components.
  final List<Color> colors;
  var activeDiceImage = 'assets/images/dice-1.png';

  void rollDice() {
    activeDiceImage = 'assets/images/dice-5.png';
    print('changeeeee');
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: colors,
          begin: beginAlignment,
          end: endAlignment,
        ),
      ),
      child: const Center(
        child: DiceRoller(),
        // child: StyledText("Hello, Monte"),
      ),
    );
    // throw UnimplementedError();
  }
}
