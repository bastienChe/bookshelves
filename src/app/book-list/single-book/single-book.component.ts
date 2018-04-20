import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    // cree un livre temporaire vide puis on recupère le bon livre
    this.book = new Book('','');
    const id = this.route.snapshot.params['id'];
    // + pour cast en nombre
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }


}
