import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedules.model';


const baseUrl = 'http://192.168.1.178:8080/api/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getAllSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${baseUrl}/get_schedule`);
  }

  getAllScheduleLandlord(id:any): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${baseUrl}/get_schedule_landlord/${id}`);
  }

  getAllScheduleLandlordApproved(id:any): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${baseUrl}/get_schedule_approved_landlord/${id}`);
  }

  getSchedule(id: any): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${baseUrl}/get_schedule/${id}`);
  }

  createSchedule(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create_schedule`, data);
  }

  updateSchedule(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update_schedule/${id}`, data);
  }

  deleteSchedule(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete_schedule/${id}`);
  }
}