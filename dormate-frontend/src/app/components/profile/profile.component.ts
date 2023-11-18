import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { UserImageDialogComponent } from '../../dialogs/user-image-dialog/user-image-dialog.component';
import { DormService } from 'src/app/services/dorm.service';
import { ChatService } from 'src/app/services/chat.service';
import { Dorm } from 'src/app/models/dorms.model';
import { SwiperOptions } from 'swiper';
import { CertificateUploadDialogComponent } from '../../dialogs/certificate-upload-dialog/certificate-upload-dialog.component';
import { DormImagesUploadDialogComponent } from '../../dialogs/dorm-images-upload-dialog/dorm-images-upload-dialog.component';
import { EditDormInfoDialogComponent } from '../../dialogs/edit-dorm-info-dialog/edit-dorm-info-dialog.component';
import { DeleteDormDialogComponent } from '../../dialogs/delete-dorm-dialog/delete-dorm-dialog.component';
import { ChangePasswordComponent } from 'src/app/dialogs/change-password/change-password.component';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/schedules.model';
import { ScheduleApproveComponent } from 'src/app/dialogs/schedule-approve/schedule-approve.component';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  user : User;
  dorms?: Dorm[];
  schedules?: Schedule[];
  schedulesApproved?: Schedule[];
  calendar_events : EventInput[] = [];

  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private dormService: DormService,
    private chatService: ChatService,
    private scheduleService: ScheduleService
    ) {

    }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.retrieveUser();
    this.retrieveForApprovalDorm();
    this.chatService.setupSocketConnection();
    this.retrieveForApprovalSchedule();
    this.retrieveForApprovalScheduleApproved()
  }
  ngOnDestroy() {
    this.chatService.disconnect();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev',
      center: 'title,today',
      right: 'next',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    displayEventTime: false,

  };

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
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

  retrieveForApprovalSchedule(): void {
    this.scheduleService.getAllScheduleLandlord(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.schedules = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveForApprovalScheduleApproved(): void {
    this.scheduleService.getAllScheduleLandlordApproved(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.schedulesApproved = data;
          this.schedulesApproved.forEach(d =>{
            this.calendar_events = this.calendar_events.concat(
              { start: new Date(d.schedule_date), title: d.user_full_name+" will visit "+d.dorm_title, test: 'test' }
            );
          })
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

  openScheduleApproveDialog(schedule: Schedule): void{
    let dialogRef = this.dialog.open(ScheduleApproveComponent, { 
      width: '500px', 
      height: '80vh',
      data: schedule
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalSchedule();
      this.retrieveForApprovalScheduleApproved();
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
//ADD BUTTON OR LIST FOR VIEW DIALOG OF APPROVED SCHEDULE WITH DIALOG INFO OF USERS

}
