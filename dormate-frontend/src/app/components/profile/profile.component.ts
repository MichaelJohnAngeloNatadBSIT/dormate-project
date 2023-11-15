import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { FormGroup } from "@angular/forms";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { UserImageDialogComponent } from '../../dialogs/user-image-dialog/user-image-dialog.component';
import { DormService } from 'src/app/services/dorm.service';
import { Dorm } from 'src/app/models/dorms.model';
import { SwiperOptions } from 'swiper';
import { CertificateUploadDialogComponent } from '../../dialogs/certificate-upload-dialog/certificate-upload-dialog.component';
import { DormImagesUploadDialogComponent } from '../../dialogs/dorm-images-upload-dialog/dorm-images-upload-dialog.component';
import { EditDormInfoDialogComponent } from '../../dialogs/edit-dorm-info-dialog/edit-dorm-info-dialog.component';
import { DeleteDormDialogComponent } from '../../dialogs/delete-dorm-dialog/delete-dorm-dialog.component';
import { ChangePasswordComponent } from 'src/app/dialogs/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  form: FormGroup;
  percentDone: any = 0;
  user : User;
  dorms?: Dorm[];
  currentDorm: Dorm = {};
  currentIndex = -1;

  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private dormService: DormService,
    ) {

    }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.retrieveUser();
    this.retrieveForApprovalDorm();
  }


  retrieveUser(){
    this.userService.retrieveUserWithId(this.currentUser.id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveForApprovalDorm(): void {
    this.dormService.getForApproval(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.dorms = data;
        },
        error: (e) => console.error(e)
      });
 
  }

  openEditDialog(): void {
    let dialogRef = this.dialog.open(EditDialogComponent, { 
      width: '700px', 
      height: '80vh',
      data: this.user
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveUser();
     }); 
  }
  openChangePassDialog(): void{
    let dialogRef = this.dialog.open(ChangePasswordComponent, { 
      width: '500px', 
      height: '80vh',
      data: this.user
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveUser();
     }); 
  }

  openUserImageDialog(): void {
    let dialogRef = this.dialog.open(UserImageDialogComponent, { 
      width: '900px', 
      height: '80vh',
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveUser();
     }); 
  }

  openCertUploadDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(CertificateUploadDialogComponent, { 
      width: '900px', 
      height: '80vh',
      data: dorm
    }); 

    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalDorm();
    }); 

  }

  openDormImgUploadDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(DormImagesUploadDialogComponent, { 
      width: '900px', 
      height: '80vh',
      data: dorm
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalDorm();
     }); 

  }
  openEditDormDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(EditDormInfoDialogComponent, { 
      width: '900px', 
      height: '80vh',
      data: dorm
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalDorm();
     }); 
  }
  
  openDeleteDormDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(DeleteDormDialogComponent, { 
      data: dorm
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalDorm();
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

  // setActiveDorm(dorm: Dorm, index: number): void {
  //   this.currentDorm = dorm;
  //   this.currentIndex = index;
  // }


}
