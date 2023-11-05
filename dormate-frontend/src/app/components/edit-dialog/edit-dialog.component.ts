import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  Roles: any = ['Admin', 'Landlord', 'User'];
  public showPassword: boolean = false;
  form: any = {
    username: null,
    first_name: null,
    last_name: null,
    address: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user : User;
  currentUser : User;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService : UserService,
    public tokenService: TokenStorageService,
  ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl({value:'', disabled: true}, [Validators.required, Validators.email]),
      username: new FormControl({value:'', disabled: true}, [Validators.required, Validators.maxLength(15)]),
      first_name: new FormControl({value:'', disabled: true}, [Validators.required, Validators.maxLength(60)]),
      last_name: new FormControl({value:'', disabled: true}, [Validators.required, Validators.maxLength(60)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      mobile_number: new FormControl('', [Validators.required, Validators.maxLength(12)]),

      //confirmPassword: new FormControl('', Validators.required),
    });
    
    this.currentUser = this.tokenService.getUser();
    this.retrieveUser();
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }

  retrieveUser(){
    this.userService.retrieveUserWithId(this.currentUser.id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => console.error(e)
    });

  }


  updateUser(): void {
    var message = '';
    const formData = this.form.getRawValue();

    this.userService.updateUser(this.currentUser.id, formData)
      .subscribe({
        next: (res) => {
          console.log(res);
          message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
    }

    
}
