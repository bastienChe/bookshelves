import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class BooksService {

  // pattern : 

  // un array global
  books: Book[] = [];

  // un subject qui emettra cet array
  bookSubject = new Subject<Book[]>();

  constructor() { }

  // on emet le subject
  emitBooks(){
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    // similaire à un .put en http
    // enregistre l'array local
    firebase.database().ref('/books').set(this.books);  
  }

  getBooks() {

    firebase.database()
      .ref('/books')
      .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
      });
  }

  getSingleBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database()
          .ref('/books/'+id)
          .once('value')
          .then(
            (data) => {
              resolve(data.val());
            },
            (error) => {
              reject(error);
            }
          );
      }
    )
  }

  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    if(book.photo){
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée');
        }
      ).catch(
        (error) => {
          console.log('Erreur suppression : '+ error);
        } 
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookElement) => {
        if(bookElement === book){
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove,1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
}

}
