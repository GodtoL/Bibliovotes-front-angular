import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL : String = 'https://bibliovotes-production.up.railway.app/api/book';
  constructor(private httpClient : HttpClient) { }

  getBooks(){
    return this.httpClient.get(`${this.API_URL}`);
  }

  getBookById(id : string){
    return this.httpClient.get(`${this.API_URL}/${id}`);
  }

  voteBook(id : string){
    return this.httpClient.put(`${this.API_URL}/${id}`, {});
  }
}
