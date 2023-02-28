import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: number;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.apiservice.getSingleUser(this.id).subscribe((res)=>{
      this.user = res.data;
    })
  }

}
