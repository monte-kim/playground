import 'package:flutter/material.dart';

class NewExpense extends StatefulWidget {
  const NewExpense({super.key});

  @override
  State<NewExpense> createState() {
    return _NewExpenseState();
  }
}

class _NewExpenseState extends State<NewExpense> {
  var _userTitle = '';

  void _saveTitleInput(String inputValue) {
    _userTitle = inputValue;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(30),
      child: Column(
        children: [
          TextField(
            onChanged: _saveTitleInput,
            maxLength: 50,
            // keyboardType: TextInputType.text,
            decoration: const InputDecoration(
              label: Text('Input title'),
            ),
          ),
          Row(
            children: [
              ElevatedButton(
                onPressed: () {
                  print(_userTitle);
                },
                child: const Text('Save Expense'),
              ),
            ],
          )
        ],
      ),
    );
  }
}
