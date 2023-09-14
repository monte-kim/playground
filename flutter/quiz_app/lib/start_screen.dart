import 'package:flutter/material.dart';

class StartScreen extends StatelessWidget {
  const StartScreen({super.key, required this.startQuiz});

  final void Function() startQuiz;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Image(
            image: AssetImage('assets/images/quiz-logo.png'),
            height: 300,
            color: Color.fromRGBO(255, 255, 255, 0.5),
          ),
          const SizedBox(height: 80),
          const Text(
            "Learn Flutter the fun way!",
            style: TextStyle(
                fontSize: 30, color: Colors.white, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 50),
          OutlinedButton.icon(
            onPressed: startQuiz,
            style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: const BorderSide(
                  color: Colors.white,
                  width: 2,
                )),
            icon: const Icon(Icons.arrow_forward),
            label: const Text("Start Quiz"),
          ),
          // OutlinedButton(
          //   style: OutlinedButton.styleFrom(
          //     foregroundColor: Colors.white,
          //     side: const BorderSide(color: Colors.white, width: 2),
          //   ),
          //   onPressed: () {},
          //   child: const Row(
          //     mainAxisSize: MainAxisSize.min,
          //     children: [
          //       Icon(Icons.arrow_forward),
          //       SizedBox(width: 10),
          //       Text("Start Quiz"),
          //     ],
          //   ),
          // ),
        ],
      ),
    );
  }
}
