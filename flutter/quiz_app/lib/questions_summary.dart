import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class QuestionsSummary extends StatelessWidget {
  const QuestionsSummary({super.key, required this.summaryData});

  final List<Map<String, Object>> summaryData;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 400,
      child: SingleChildScrollView(
        child: Column(
          children: summaryData.map((data) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 30,
                  height: 30,
                  decoration: BoxDecoration(
                    color: data['correct_answer'] == data['selected_answer']
                        ? const Color.fromARGB(255, 0, 166, 255)
                        : Colors.red,
                    borderRadius: const BorderRadius.all(Radius.circular(10)),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    "${(data['question_index'] as int) + 1}",
                    style: GoogleFonts.kanit(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                    // textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(
                  width: 30,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Q) ${data['question']}",
                        style: GoogleFonts.kanit(
                          color: const Color.fromARGB(255, 0, 166, 255),
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        "A) ${data['correct_answer']}",
                        style: GoogleFonts.kanit(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        "YOURS) ${data['selected_answer']}",
                        style: GoogleFonts.kanit(
                          color:
                              data['correct_answer'] == data['selected_answer']
                                  ? Colors.white
                                  : Colors.red,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      )
                    ],
                  ),
                ),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }
}
