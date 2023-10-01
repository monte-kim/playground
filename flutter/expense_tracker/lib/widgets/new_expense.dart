import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:expense_tracker/models/expense.dart';

class NewExpense extends StatefulWidget {
  const NewExpense({super.key, required this.onAddExpense});

  final void Function(Expense expense) onAddExpense;

  @override
  State<NewExpense> createState() {
    return _NewExpenseState();
  }
}

class _NewExpenseState extends State<NewExpense> {
  final _titleController = TextEditingController();
  final _amountController = TextEditingController();
  DateTime? _selectedDate;
  Category _selectedCategory = Category.food;

  void _presentDatePicker() async {
    final now = DateTime.now();
    final firstDate = DateTime(now.year - 1, now.month, now.day);
    final pickedDate = await showDatePicker(
      context: context,
      initialDate: now,
      firstDate: firstDate,
      lastDate: now,
    );
    setState(() {
      _selectedDate = pickedDate;
    });
  }

  void _showDialog() {
    Platform.isIOS
        ? showCupertinoDialog(
            context: context,
            builder: (ctx) {
              return CupertinoAlertDialog(
                title: const Text("Invalid input"),
                content: const Text(
                    "Please make sure to input a valid title and amount!"),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(ctx);
                      },
                      child: const Text("OK"))
                ],
              );
            },
          )
        : showDialog(
            context: context,
            builder: (ctx) {
              return AlertDialog(
                title: const Text("Invalid input"),
                content: const Text(
                    "Please make sure to input a valid title and amount!"),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(ctx);
                      },
                      child: const Text("OK"))
                ],
              );
            },
          );
  }

  void _submitExpense() {
    final enteredAmount = double.tryParse(_amountController.text);
    final amountIsInvalid = enteredAmount == null || enteredAmount <= 0;
    if (_titleController.text.trim().isEmpty ||
        amountIsInvalid ||
        _selectedDate == null) {
      _showDialog();
      return;
    }
    widget.onAddExpense(
      Expense(
        title: _titleController.text,
        amount: enteredAmount,
        date: _selectedDate!,
        category: _selectedCategory,
      ),
    );
    Navigator.pop(context);
  }

  @override
  void dispose() {
    _titleController.dispose();
    _amountController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final keyBoardSpace = MediaQuery.of(context).viewInsets.bottom;
    return LayoutBuilder(builder: (ctx, constraints) {
      final width = constraints.maxWidth;
      // return SizedBox(
      //   height: double.infinity,
      // child:
      return SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.fromLTRB(30, 60, 30, keyBoardSpace + 60),
          child: Column(
            children: [
              if (width >= 600)
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _titleController,
                        maxLength: 50,
                        // keyboardType: TextInputType.text,
                        decoration: const InputDecoration(
                          label: Text('Input title'),
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 24,
                    ),
                    Expanded(
                      child: TextField(
                        controller: _amountController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          prefixText: '\$',
                          label: Text('Input amount'),
                        ),
                      ),
                    ),
                  ],
                )
              else
                TextField(
                  controller: _titleController,
                  maxLength: 50,
                  // keyboardType: TextInputType.text,
                  decoration: const InputDecoration(
                    label: Text('Input title'),
                  ),
                ),
              if (width >= 600)
                Row(
                  children: [
                    DropdownButton(
                      value: _selectedCategory,
                      items: Category.values
                          .map(
                            (category) => DropdownMenuItem(
                              value: category,
                              child: Text(category.name.toUpperCase()),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        if (value == null) return;
                        setState(() {
                          _selectedCategory = value;
                        });
                      },
                    ),
                    const SizedBox(width: 24),
                    // const Spacer(),
                    Expanded(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          IconButton(
                            onPressed: _presentDatePicker,
                            icon: const Icon(Icons.calendar_month_rounded),
                          ),
                          Text(
                            _selectedDate == null
                                ? "No date selected"
                                : dateFormatter.format(_selectedDate!),
                          )
                        ],
                      ),
                    ),
                  ],
                )
              else
                Row(
                  children: [
                    SizedBox(
                      width: 130,
                      child: TextField(
                        controller: _amountController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          prefixText: '\$',
                          label: Text('Input amount'),
                        ),
                      ),
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          IconButton(
                            onPressed: _presentDatePicker,
                            icon: const Icon(Icons.calendar_month_rounded),
                          ),
                          Text(
                            _selectedDate == null
                                ? "No date selected"
                                : dateFormatter.format(_selectedDate!),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              const SizedBox(height: 40),
              if (width >= 600)
                Row(
                  children: [
                    const Spacer(),
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Cancel'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        _submitExpense();
                      },
                      child: const Text('Save Expense'),
                    ),
                  ],
                )
              else
                Row(
                  children: [
                    DropdownButton(
                      value: _selectedCategory,
                      items: Category.values
                          .map(
                            (category) => DropdownMenuItem(
                              value: category,
                              child: Text(category.name.toUpperCase()),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        if (value == null) return;
                        setState(() {
                          _selectedCategory = value;
                        });
                      },
                    ),
                    const Spacer(),
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Cancel'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        _submitExpense();
                      },
                      child: const Text('Save Expense'),
                    ),
                  ],
                )
            ],
          ),
        ),
      );
      // );
    });
  }
}
