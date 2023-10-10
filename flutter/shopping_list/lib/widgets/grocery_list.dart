import 'package:flutter/material.dart';

// import 'package:shopping_list/data/dummy_items.dart';
import 'package:shopping_list/models/grocery_item.dart';
import 'package:shopping_list/widgets/new_item.dart';

class GroceryList extends StatefulWidget {
  const GroceryList({super.key});

  @override
  State<GroceryList> createState() => _GroceryListState();
}

class _GroceryListState extends State<GroceryList> {
  final List<GroceryItem> _groceryItems = [];

  void _addItem() async {
    final newItem = await Navigator.of(context).push<GroceryItem>(
      MaterialPageRoute(
        builder: (ctx) => const NewItem(),
      ),
    );
    if (newItem == null) {
      return;
    }
    setState(() {
      _groceryItems.add(newItem);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Groceries'),
        actions: [
          IconButton(
            onPressed: _addItem,
            icon: const Icon(Icons.add),
          )
        ],
      ),
      body: _groceryItems.isEmpty
          ? const Center(
              child: Text(
              "EMPTY",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ))
          : ListView.builder(
              itemCount: _groceryItems.length,
              itemBuilder: (ctx, index) => Dismissible(
                onDismissed: (direction) {
                  setState(() {
                    _groceryItems.removeAt(index);
                  });
                },
                key: ValueKey(_groceryItems[index].id),
                child: ListTile(
                  title: Text(_groceryItems[index].name),
                  leading: Container(
                    width: 24,
                    height: 24,
                    color: _groceryItems[index].category.color,
                  ),
                  trailing: Text(_groceryItems[index].quantity.toString()),
                ),
              ),
            ),
      // Padding(
      //   padding: const EdgeInsets.all(24),
      //   child: Column(
      //     // crossAxisAlignment: CrossAxisAlignment.center,
      //     children: [
      //       for (final groceryItem in groceryItems)
      //         Row(
      //           mainAxisSize: MainAxisSize.max,
      //           children: [
      //             Container(
      //               width: 20,
      //               height: 20,
      //               color: groceryItem.category.color,
      //             ),
      //             const SizedBox(
      //               width: 8,
      //             ),
      //             Text(groceryItem.name),
      //             Text(groceryItem.quantity.toString()),
      //             const SizedBox(height: 40),
      //           ],
      //         ),
      //     ],
      //   ),
      // ),
    );
  }
}
