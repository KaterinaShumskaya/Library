import { Http, Headers } from '@angular/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book';

@Component({
  templateUrl: './addbook.component.html'
})

export class AddBookComponent implements OnInit {
  public _book: Book;
  @Input() book: Book;
  @Input() dialogTitle;
  bookForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _booksService: BooksService
  ) {
   
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this._book = this.book;

    this.bookForm = this.formBuilder.group({
      title: this._book.title,
      author: this._book.author,
      publisher: this._book.publishedBy
    });
  }

  public submitForm() {
    if (this.book.id) {
      this._booksService.updateBook(this.book).subscribe((data) => {
        this.activeModal.close(this.book);
      }, error => console.error(error))
    }
    else {
      this._booksService.saveBook(this.book).subscribe((data) => {
        this.activeModal.close(this.book);
      }, error => console.error(error))
    }
  } 
}
