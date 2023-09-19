import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'package:quiz_app/data/questions.dart';
import 'package:quiz_app/questions_summary.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen(
      {super.key, required this.selectedAnswers, required this.restartQuiz});

  final List<String> selectedAnswers;
  final void Function() restartQuiz;

  List<Map<String, Object>> getSummaryData() {
    final List<Map<String, Object>> summary = [];

    for (var i = 0; i < selectedAnswers.length; i++) {
      summary.add({
        "question_index": i,
        "question": questions[i].question,
        "correct_answer": questions[i].answers[0],
        "selected_answer": selectedAnswers[i],
      });
    }

    return summary;
  }

  @override
  Widget build(BuildContext context) {
    final summaryData = getSummaryData();
    final numTotalQuestions = questions.length;
    final numCorrectQuestions = summaryData.where((data) {
      return data['correct_answer'] == data['selected_answer'];
    }).length;

    return SizedBox(
      width: double.infinity,
      child: Container(
        margin: const EdgeInsets.all(40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'You answered $numCorrectQuestions out of $numTotalQuestions questions correctly!',
              style: GoogleFonts.kanit(
                  color: const Color.fromARGB(255, 44, 171, 255),
                  fontSize: 24,
                  fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 30),
            QuestionsSummary(summaryData: summaryData),
            const SizedBox(height: 50),
            // TextButton(
            //   onPressed: restartQuiz,
            //   child: const Text('Restart Quiz'),
            // ),
            TextButton.icon(
              onPressed: restartQuiz,
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('Restart Quiz'),
            ),
          ],
        ),
      ),
    );
  }
}
