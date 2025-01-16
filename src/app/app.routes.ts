import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

export const routes: Routes = [
    {path: '', component: BookListComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'book/:id', component: BookDetailsComponent}
];
