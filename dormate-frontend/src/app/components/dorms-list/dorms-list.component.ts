import { Component, OnInit } from '@angular/core';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/interface/user';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-dorms-list',
  templateUrl: './dorms-list.component.html',
  styleUrls: ['./dorms-list.component.css']
})
export class DormsListComponent implements OnInit{
  content?: string;

  dorms?: Dorm[];
  currentDorm: Dorm = {};
  currentIndex = -1;
  title = '';
  currentUser: User;
  user : User;

  constructor(
    private dormService: DormService, 
    private tokenService: TokenStorageService
    ) { }
  

  ngOnInit(): void {
    this.retrieveDorms();
    this.currentUser = this.tokenService.getUser();
    // this.retrieveUser();

  }

  // retrieveUser(){
  //   this.userService.retrieveUserWithId(this.currentUser.id).subscribe({
  //     next: (data) => {
  //       this.user = data;
  //     },
  //     error: (e) => console.error(e)
  //   });

  // }

    retrieveDorms(): void {
      this.dormService.getAllApproved()
        .subscribe({
          next: (data) => {
            this.dorms = data;
          },
          error: (e) => console.error(e)
        });
   
    }

    refreshList(): void {
      this.retrieveDorms();
      this.currentDorm = {};
      this.currentIndex = -1;
    }

    setActiveDorm(dorm: Dorm, index: number): void {
      this.currentDorm = dorm;
      this.currentIndex = index;
    }

    removeAllDorms(): void {
      this.dormService.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
    }

    searchTitle(): void {
      this.currentDorm = {};
      this.currentIndex = -1;
  
      this.dormService.findByTitle(this.title)
        .subscribe({
          next: (data) => {
            this.dorms = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    config: SwiperOptions = {
      pagination: { 
        el: '.swiper-pagination', 
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 30
    }; 
}



