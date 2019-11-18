import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BooksService {
  baseUrl: string = "";

  constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getBooks() {
    return this._http.get(this.baseUrl + 'api/books')
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  saveBook(book) {
    return this._http.post(this.baseUrl + 'api/books', book)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  updateBook(book) {
    return this._http.put(this.baseUrl + 'api/books', book)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteEmployee(id) {
    return this._http.delete(this.baseUrl + "api/books/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
