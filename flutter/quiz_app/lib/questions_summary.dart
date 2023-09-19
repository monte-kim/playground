import 'package:flutter/material.dart';

class QuestionsSummary extends StatelessWidget {
  const QuestionsSummary({super.key, required this.summaryData});

  final List<Map<String, Object>> summaryData;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 30,
      child: Column(
        children: summaryData.map((data) {
          return Row(
            children: [
              Text("${(data['question_index'] as int) + 1}"),
              Expanded(
                child: Column(
                  children: [
                    const SizedBox(height: 10),
                    Text("${data['question']}"),
                    Text("${data['correct_answer']}"),
                    Text("${data['selected_answer']}"),
                    const SizedBox(height: 10),
                  ],
                ),
              ),
            ],
          );
        }).toList(),
      ),
    );
  }
}
