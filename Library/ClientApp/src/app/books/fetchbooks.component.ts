import { Component } from '@angular/core';
import { BooksService } from '../books/books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from '../books/addbook.component';
import { Book } from '../books/book';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetchbooks.component.html',
  providers: [DecimalPipe]
})

export class FetchBooksComponent {
  books$: Observable<Book[]>;
  books: Book[];
  size: number;
  pageSize: number;
  itemsPerPage = 5;
  page = 1;
  filter = new FormControl('');

  constructor(private _modalService: NgbModal, private _booksService: BooksService) {
    this.getBooks();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  search(text: string): Book[] {
    return this.books.filter(book => {
      const term = text.toLowerCase();
      return book.title.toLowerCase().includes(term)
        || book.author.toLowerCase().includes(term)
        || book.publishedBy.toLowerCase().includes(term);
    });
  }
  getBooks() {
    this._booksService.getBooks().subscribe(
      data => {
        this.books = data;
        this.size = data.length;
        this.books$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text))
        );
      }
    )
  }

  delete(bookId) {
    var ans = confirm("Do you want to delete book with Id: " + bookId);
    if (ans) {
      this._booksService.deleteEmployee(bookId).subscribe((data) => {
        this.getBooks();
      }, error => console.error(error))
    }
  }

  create() {
    const modalRef = this._modalService.open(AddBookComponent);
    modalRef.componentInstance.dialogTitle = "Add new book";
    modalRef.componentInstance.book = {
      title: '',
      author: '',
      publishedBy: ''
    }
    modalRef.result.then((data) => {
      this.getBooks();
    });
  }

  edit(book) {
    const modalRef = this._modalService.open(AddBookComponent);
    modalRef.componentInstance.dialogTitle = "Edit book data";
    modalRef.componentInstance.book = {
      id: book.id,
      title: book.title,
      author: book.author,
      publishedBy: book.publishedBy
    };
    modalRef.result.then((data) => {
      book.title = data.title;
      book.author = data.author;
      book.publishedBy = data.publishedBy;
    });
  }
}


