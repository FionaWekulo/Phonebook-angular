import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.scss']
})
export class SearchContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    enteredSearchValue: string = '';

    @Output()
    searchTextChanged: EventEmitter<string>= new EventEmitter<string>();

    onSearchTextChanged(){
      this.searchTextChanged.emit(this.enteredSearchValue);
    }
  

}
