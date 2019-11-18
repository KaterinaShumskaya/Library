import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BooksService } from './books/books.service';

import { AppComponent } from './app.component';
import { AddBookComponent } from './books/addbook.component';
import { FetchBooksComponent } from './books/fetchbooks.component';


@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    FetchBooksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FetchBooksComponent, pathMatch: 'full' }
    ])
  ],
  providers: [BooksService],
  bootstrap: [AppComponent],
  entryComponents: [AddBookComponent]
})
export class AppModule { }
