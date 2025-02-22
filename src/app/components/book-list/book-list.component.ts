import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TagService } from '../../services/tag.service';
import { ModalComponent } from '../../modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  //Datos de formulario
  bookForm : FormGroup;
  title : FormControl;
  author : FormControl;
  shortDescription : FormControl;
  description : FormControl;
  tagsSelected : FormControl;

  // Datos del modal
  isModalVisible = false;
  openModal() {
    this.isModalVisible = true;
  }
  closeModal() {
    this.isModalVisible = false;
  }

  // Datos de la lista de libros
  books : any = [];
  popularBooks : any = [];
  tags : any = [];
  
  constructor(private apiService : ApiService, private tagService : TagService) { 
    
    this.title = new FormControl('');
    this.author = new FormControl('');
    this.shortDescription = new FormControl('');
    this.description = new FormControl('');
    this.tagsSelected = new FormControl('');
    
    this.bookForm = new FormGroup({
      title: this.title,
      author: this.author,
      shortDescription: this.shortDescription,
      description: this.description,
      tags : this.tagsSelected
    });    
  }

  selectedTags: number[] = [];
  
  onCheckboxChange(event: any, tagId: number): void {
    if (this.selectedTags) {
      for (let book of this.books) {
        if (book.tags.includes(tagId)) {
          this.books.push(book);
    } else {
      this.getBooks();
    }

    if (event.target.checked) {
      this.selectedTags.push(tagId);
      console.log(this.selectedTags);
    } else {
      this.selectedTags = this.selectedTags.filter(id => id !== tagId);
      console.log(this.selectedTags);
    }
  }}}

  ngOnInit(): void {
    this.getBooks();
    this.getTags();
    this.getPopularBooks();
  }

  getBooks(){
    this.apiService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  getPopularBooks(){
    this.apiService.getPopularBooks().subscribe((data) => {
      this.popularBooks = data;
    });
  }

  getTags(){
    this.tagService.getTags().subscribe((data) => {
      this.tags = data;
    });
  }

  handleBookForm(){
    console.log(this.bookForm.value);
    const data = {
      title : this.title.value,
      author : this.author.value,
      shortDescription : this.shortDescription.value,
      description : this.description.value,
      tags: [this.tagsSelected.value]
    }

    this.apiService.addBook(data).subscribe({
      next: () => {
        this.getBooks();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al comentar:', err);
      }
    });
  }

  // Toggle menu
  isActive: boolean = false; 

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
