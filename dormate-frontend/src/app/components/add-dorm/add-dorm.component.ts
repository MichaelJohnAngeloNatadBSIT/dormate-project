import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dorm',
  templateUrl: './add-dorm.component.html',
  styleUrls: ['./add-dorm.component.css']
})
export class AddDormComponent {
  selectedFiles?: FileList;
  currentUser : User;
  dormForm: FormGroup;

  dorm: Dorm = {
    user_id: '',
    title: '',
    description: '',
    address: '',
    lessor: '', 
    bedroom: 0,
    bathroom: 0,
    rent: 0,
    for_rent: false,
    published: false,
  };

  constructor(
    private dormService: DormService,
    private tokenService: TokenStorageService,
    private fb : FormBuilder,
    private router: Router,
    ) { 
      this.createForm();
    }

    createForm() {
      this.dormForm = this.fb.group({
         title: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
         description: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
         address: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
         bedroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
         bathroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
         rent: ['', [Validators.required, Validators.maxLength(100000), Validators.minLength(100)]],

      });
    }



  submitted = false;

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }

  saveDorm(): void {
    var lessorName = this.currentUser.first_name+' ' + this.currentUser.last_name;
    const data = {
      user_id: this.currentUser.id,
      title: this.dorm.title,
      description: this.dorm.description,
      address: this.dorm.address,
      lessor: lessorName,
      bedroom: this.dorm.bedroom,
      bathroom: this.dorm.bathroom,
      rent: this.dorm.rent,
    };
    this.dormService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.router.navigate(['/profile'])
        },
        error: (e) => console.error(e)
      });
  }

  newDorm(): void {
    this.submitted = false;
    this.dorm = {
      title: '',
      description: '',
      address: '',
      lessor: '', 
      bedroom: 0,
      bathroom: 0,
      rent: 0,
      

      for_rent: false
    };
  }

}
