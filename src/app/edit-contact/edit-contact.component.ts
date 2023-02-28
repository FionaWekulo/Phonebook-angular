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
  address: string;}

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  id: number;
  user: User;
  editForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private apiservice: ApiService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.apiservice.getSingleUser(this.id).subscribe((res)=>{
      this.editForm.patchValue({
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        email: res.data[0].email,
        mobile: res.data[0].mobile,
        address: res.data[0].address

      })
    });

    this.editForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required]

    });
  }

  onSubmit() {   
    this.apiservice.editUser(this.id, this.user).subscribe((res) => {
      this.user = new User();
      this.gotoList();
    });
  }

  //go to list after update value
  gotoList() {
    this.router.navigate(['/list']);
  }

}
