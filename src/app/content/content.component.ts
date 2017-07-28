import {Component} from '@angular/core';
import {ItemService} from '../services/item.service';
import {Item} from '../item';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ItemService]
})

export class ContentComponent {

  newItem: Item = new Item();
  items: Item[];

  constructor(public itemService: ItemService) {
    this.getItems();
  }

  addItem() {
    this.items.push(this.newItem);
    this.itemService.addItem(this.newItem)
      .subscribe((data) => console.log(data), (err) => console.log('error: ', err));
    this.newItem = new Item();
  }

  getItems() {
    this.itemService.getItems()
      .subscribe((data)=> this.items = data, (err) => console.log('error: ', err));
  }

  editItem(item: Item) {
    item.isComplete = !item.isComplete; // or add modal to edit?
    this.itemService.updateItem(item)
      .subscribe((data) => console.log(data), (err) => console.log(err));
  }

  deleteItem(id: string) {
    this.items = this.items.filter(i => i._id !== id);
    this.itemService.deleteItem(id)
      .subscribe((data) => console.log(data), (err) => console.log(err));
  }
}
