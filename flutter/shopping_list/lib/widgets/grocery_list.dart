import 'package:flutter/material.dart';

import 'package:shopping_list/data/dummy_items.dart';

class GroceryList extends StatelessWidget {
  const GroceryList({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Groceries'),
      ),
      body: ListView.builder(
        itemCount: groceryItems.length,
        itemBuilder: (ctx, index) => ListTile(
          title: Text(groceryItems[index].name),
          leading: Container(
            width: 24,
            height: 24,
            color: groceryItems[index].category.color,
          ),
          trailing: Text(groceryItems[index].quantity.toString()),
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
