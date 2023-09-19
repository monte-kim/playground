import 'package:flutter/material.dart';

class AnswerButton extends StatelessWidget {
  const AnswerButton(
      {super.key, required this.answerText, required this.onTapAnswer});

  final String answerText;
  final void Function() onTapAnswer;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        ElevatedButton(
          onPressed: onTapAnswer,
          style: ElevatedButton.styleFrom(
            // minimumSize: const Size(160, 50),
            padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
            foregroundColor: const Color.fromARGB(255, 0, 50, 77),
            backgroundColor: const Color.fromARGB(230, 255, 255, 255),
            shape: BeveledRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          child: Text(
            answerText,
            style: const TextStyle(fontSize: 20),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 15),
      ],
    );
  }
}
