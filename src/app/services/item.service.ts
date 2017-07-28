import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
// noinspection TypeScriptCheckImport
import {Item} from '../item';

@Injectable()
export class ItemService {

  list: Item[] = [];
  protected _url: string = 'http://127.0.0.1:8080/list';

  private request: Observable<Item[]>;

  constructor(private http: Http) {
  }

  addItem(body: Item): Observable<Item[]> {
    let that = this;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url, JSON.stringify(body), {headers: headers})
      .map((res: Response) => {
        let item = res.json();
        that.request = null;
        return item;
      });
  }

  getItems(): Observable<Item[]> {
    if (this.list && this.list.length) {
      return Observable.from([this.list]);
    }
    if (!this.request) {
      this.request = this.http.get(this._url)
        .map((res: Response) => res.json())
        .map((data: Item[]) => {
          this.request = null;
          return this.list = data;
        });
    }
    return this.request;
  }

  deleteItem(id: string): Observable<Response> {
    let that = this;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this._url + id, {headers: headers})
      .map((res: Response) => {
        that.request = null;
        return res;
      });
  }

  updateItem(body: Item): Observable<Item[]> {
    let that = this;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._url, JSON.stringify(body), {headers: headers})
      .map((res: Response) => {
        that.request = null;
        return res.json();
      });
  }

}
