import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  address: string;

}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  errormsg:any;
  successmsg: any;
  user: User = new User();
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private apiservice: ApiService, 
    private actrouter: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    if(this.userForm.valid){
      this.apiservice.createNewUser(this.userForm.value).subscribe((res)=>{
        console.log(res, 'data submitted');
        this.userForm.reset();
        this.successmsg = res.message;
      })
    } else {
      this.errormsg ="All field required.";
    }
  }

}
