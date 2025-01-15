import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books : any = [];
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.getBooks(); 
  }

  getBooks(){
    this.apiService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
}
