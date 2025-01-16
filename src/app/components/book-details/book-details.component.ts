import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TagService } from '../../services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
   id: string | null = null;
   private routeSub: Subscription | null = null;
    book : any = {};
    tags : any = [];
    constructor(private route: ActivatedRoute, private apiService : ApiService, private tagService : TagService) { }
  
  
    ngOnInit(): void {
      this.getTags();
      this.routeSub = this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');
      });
      this.getBookById(this.id);
    }
  
    getBookById(id :any){
      this.apiService.getBookById(id).subscribe((data) => {
        this.book = data;
      });
    }
  
    getTags(){
      this.tagService.getTags().subscribe((data) => {
        this.tags = data;
      });
    }
}
