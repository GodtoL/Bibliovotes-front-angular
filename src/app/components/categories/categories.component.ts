import { Component } from '@angular/core';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  tags : any = [];
  
  constructor( private tagService : TagService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.tagService.getTags().subscribe((data) => {
      this.tags = data;
    });
  }
}
