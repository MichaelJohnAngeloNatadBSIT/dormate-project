import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { Dorm } from 'src/app/models/dorms.model';

@Component({
  selector: 'app-dorms',
  templateUrl: './dorms.component.html',
  styleUrls: ['./dorms.component.css']
})
export class DormsComponent implements OnInit {
  dataSource;

  constructor(
    private adminService: AdminService,
  ){

  }

  ngOnInit(): void {
    this.adminService.getAllDorm().subscribe(
      resp => {
        this.dataSource  = new MatTableDataSource<Dorm>(resp);
      }, err => {
        console.log(err);
      });
  }

  displayedColumns: string[] = ['_id', 'user_id', 'title', 'description', 'address', 'lessor_name', 'rent' , 'for_rent', 'publish', 'createdAt'];


}
