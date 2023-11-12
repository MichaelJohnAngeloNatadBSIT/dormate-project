import { Component } from '@angular/core';
import { Admin } from 'projects/admin-app/interface/admin';
import { StorageService } from 'projects/admin-app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  admin: Admin;
  isUserLoggedIn: boolean;
  isLoggedIn = false;
  username;

  constructor(
    private storageService: StorageService, 
  ){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.admin = this.storageService.getUser();
      this.username = this.admin.username;
    }
  }

}
