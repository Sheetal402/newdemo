import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
   }

   get(uri: string) : Observable<any>{
    return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

  post(uri: string, payload: Object) : Observable<any>{
    console.log("inside webService",`${this.ROOT_URL}/${uri}`);
    // console.log(222,payload);  
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

   patch(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
   }

   delete(uri: string){
    console.log(("inside webservice delete"));
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
   }
}
