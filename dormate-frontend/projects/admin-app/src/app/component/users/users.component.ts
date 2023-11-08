import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { User } from 'src/app/interface/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  dataSource;

  constructor(
    private adminService: AdminService,
  ){

  }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe(
      resp => {
        this.dataSource  = new MatTableDataSource<User>(resp);
      }, err => {
        console.log(err);
      });
  }

  displayedColumns: string[] = ['_id', 'username', 'email', 'address', 'first_name', 'last_name', 'mobile_number', 'updatedAt'];

}
