import { Component } from '@angular/core';

import {ItemService} from '../services/item.service';
import {Item} from '../item';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers:  [ ItemService ]
})

export class ContentComponent {

  newItem: Item = new Item();
  items: Item[];

  constructor(public itemService: ItemService) {
    this.getItems();
  }

  addItem() {
    this.itemService.addItem(this.newItem);
    this.newItem = new Item();
  }

  getItems() {
    this.itemService.getItems()
      .subscribe((data)=>{
      this.items = data;
    }, (err) => {
      console.log('error: ', err);
    });
  }

}
