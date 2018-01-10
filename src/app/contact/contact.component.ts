import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  apiEndpoint: 'http://localhost/idatum_api/api';

  @ViewChild('f') contactForm: NgForm;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const url = 'http://sanjyconsultinggroup.com/idatum_api/api' + '/mail' ;
    console.log(url);
    this.http.post(url, value).subscribe(res => console.log(res.json()));
  }

}
