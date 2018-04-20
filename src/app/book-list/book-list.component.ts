import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subscription } from 'rxjs/Subscription';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']); 
  }

  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  } 

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', 'id']); 
  }

}
