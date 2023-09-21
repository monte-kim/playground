import 'package:flutter/material.dart';

import 'package:expense_tracker/widgets/expenses.dart';

void main() {
  runApp(const ExpenseTracker());
}

class ExpenseTracker extends StatelessWidget {
  const ExpenseTracker({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Expenses(),
    );
  }
}
