import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main-layout',
  templateUrl: './admin-main-layout.component.html',
  styleUrls: ['./admin-main-layout.component.css']
})
export class AdminMainLayoutComponent implements OnInit {
  hide = false;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.hide = !this.hide;
  }

}
