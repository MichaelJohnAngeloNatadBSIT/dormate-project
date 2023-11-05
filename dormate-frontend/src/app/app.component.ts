import { Component } from '@angular/core';
import { ResponsiveService } from './responsive/responsive.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from './interface/user';

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content?: string;
  title = 'dormate-app';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showLandlordBoard = false;
  username?: string;
  dataRefresher: any;

  // currentUser: User;
  user : User;
  isUserLoggedIn: boolean;


  

  constructor(
    public responsiveService:ResponsiveService, 
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    public router: Router,
    private tokenService: TokenStorageService,
    ) {
      this.authService.isUserLoggedIn.subscribe( value => {
        this.isUserLoggedIn = value;
    });

  }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();


    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showLandlordBoard = this.roles.includes('ROLE_LANDLORD');

      this.username = user.username;

      this.authService.isUserLoggedIn.next(true);
    }



    // this.userService.getUserBoard().subscribe({
    //   next: data => {
    //     this.content = data;
    //     // console.log(data)
    //   },
    //   error: err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // });

    // this.retrieveUser();
  }

  
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorageService.clean();
        this.router.navigate(['/login'])
                .then(()=> {
                window.location.reload();
              });
      },
      error: err => {
        console.log(err);
      }
    });
  }



}
