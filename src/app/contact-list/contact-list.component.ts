import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  users: any;
  constructor(private apiservice: ApiService, private router: Router){}
  ngOnInit():void{
    this.getAllUsers();
  }

  getAllUsers(){
    this.apiservice.getAllData().subscribe((res)=>{
      this.users = res.data;
    });
  }

  userDetails(id: number){
    this.router.navigate(['details', id]);
  }

  editDetails(id: number){
    this.router.navigate(['edit', id]);
  }

  //delete User
  removeUser(id:number){
    this.apiservice.deleteUser(id).subscribe((res)=>{
      //after delete get rest data
      this.getAllUsers();
    });
  }


}
