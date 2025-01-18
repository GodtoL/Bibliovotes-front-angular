import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  API_URL : String = 'https://bibliovotes-production.up.railway.app/api/tag';
  constructor(private httpClient : HttpClient) { }

  getTags(){
    return this.httpClient.get(`${this.API_URL}`);
  }

}
