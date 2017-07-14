import {Items} from './mongooseModels/items.mongoose.model';
import {TODOLIST_DATA} from './mockData/listData';
import mongoose from 'mongoose';

export class MongoStart {

  removePromises: any[] = [];
  fillPromises: any[] = [];

  constructor() {
    this.dataBaseInit();
  }

  removeSchemas(schemaTypes: any[]): void {
    var that = this;
    for (let i = 0; i < schemaTypes.length; i++) {
      this.removePromises.push(
        new Promise((resolve, reject) => {
          schemaTypes[i].remove((err, removed) => {
            if (err) return console.error(err);
            console.log('removed ' + removed + ' entities');
            resolve();
          });
        })
      );
    }
    Promise.all(this.removePromises).then(() => {
      that.fillSchemas({data: TODOLIST_DATA, type: Items});
    });
  }

  fillSchemas(dataSet): void {
    console.log('fillSchemas');

    for (let i = 0; i < dataSet.data.length; i++) {
      this.fillPromises.push(new Promise((resolve, reject) => {
          let currentItem = new dataSet.type(dataSet.data[i]);
          currentItem.save((err) => {
            if (err) {
              console.log('Error on save!', err);
            } else resolve();
          });
        })
      );
    }
  }

  dataBaseInit() {
    mongoose.connect('mongodb://localhost/todo-app');
    this.removeSchemas([Items]);
  }
}
