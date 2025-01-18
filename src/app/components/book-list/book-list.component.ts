import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TagService } from '../../services/tag.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {

  isModalVisible = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }






  books : any = [];
  tags : any = [];
  constructor(private apiService : ApiService, private tagService : TagService) { }

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
}
