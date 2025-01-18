import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TagService } from '../../services/tag.service';
import { ModalComponent } from '../../modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [ModalComponent, ReactiveFormsModule],
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
  trackById(index: number, tag: any): number {
    return tag.id; 
  }

  onCheckboxChange(tag: any): void {
    if (tag.selected) {
      this.selectedTags.push(tag.id); 
    } else {
      this.selectedTags = this.selectedTags.filter(id => id !== tag.id); 
  }
}
  ngOnInit(): void {
    this.getBooks();
    this.getTags();
  }

  getBooks(){
    this.apiService.getBooks().subscribe((data) => {
      this.books = data;
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
}
