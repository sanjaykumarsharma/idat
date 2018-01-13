import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  apiEndpoint: 'http://localhost/idatum_api/api';
  message_sent = false;
  email_subject = '';

  @ViewChild('f') contactForm: NgForm;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const message = form.value;
    console.log(message);
    const url = 'http://sanjyconsultinggroup.com/idatum_api/api' + '/mail' ;
    console.log(url);

      this.sendMail(message).subscribe(res => {
        // console.log('AppComponent Success', res);
        this.message_sent = true;
        this.email_subject = message.subject;
        console.log(message.subject);
        console.log(this.email_subject);
        form.reset();
      }, error => {
        console.log('AppComponent Error', error);
      });
  }

sendMail(message: any): Observable <any> {
  return this.http.post('http://sanjyconsultinggroup.com/idatum_api/api/mail', message)
    .map(response => {
      console.log('Sending email was successfull', response);
      return response;
    })
    .catch(error => {
      console.log('Sending email got error', error);
      return Observable.throw(error);
    });
}

}
