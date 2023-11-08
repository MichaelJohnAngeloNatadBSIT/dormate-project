import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';
import { Dorm } from 'src/app/models/dorms.model';


const API_URL = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUser(): Observable<User[]>{
    return this.http.get<User[]>(API_URL + 'all_user');
  }

  getAllDorm(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'all_dorm');
  }

}
