package hello.itemservice.domain.item;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

class ItemRepositoryTest {

  ItemRepository itemRepository = new ItemRepository();

  @AfterEach
  void afterEach() {
    itemRepository.clearStore();
  }

  @Test
  void save() {
    Item item = new Item("Item A", 10000, 10);
    Item savedItem = itemRepository.save(item);
    Item findItem = itemRepository.findById(item.getId());
    assertThat(findItem).isEqualTo(savedItem);
  }

  @Test
  void findAll() {
    Item itemA = new Item("Item A", 10000, 10);
    itemRepository.save(itemA);
    Item itemB = new Item("Item B", 10000, 10);
    itemRepository.save(itemB);

    List<Item> itemList = itemRepository.findAll();
    assertThat(itemList.size()).isEqualTo(2);
    assertThat(itemList).contains(itemA);
    assertThat(itemList).contains(itemB);
  }

  @Test
  void updateItem() {
    Item item = new Item("Item A", 10000, 10);
    Item savedItem = itemRepository.save(item);
    Long id = savedItem.getId();

    Item updateParam = new Item("item 2", 12000, 30);
    itemRepository.update(id, updateParam);

    Item findItem = itemRepository.findById(id);
    assertThat(findItem.getItemName()).isEqualTo(updateParam.getItemName());
    assertThat(findItem.getPrice()).isEqualTo(updateParam.getPrice());
    assertThat(findItem.getQuantity()).isEqualTo(updateParam.getQuantity());
  }
}
