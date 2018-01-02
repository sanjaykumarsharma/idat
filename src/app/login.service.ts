import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class LoginService {
    constructor(private http: HttpClient) {}



    login(loginData: {}) {
        return this.http.post('http://localhost/slim/api/post', JSON.stringify(loginData));
        // return this.http.get('http://localhost/slim/api/');
    }

}
