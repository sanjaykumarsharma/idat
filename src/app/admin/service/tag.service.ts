import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Tag } from '../model/tag.model';

@Injectable()
export class TagService {

    private static handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status === 404) {
                errMsg = `Resource ${error.url} was not found`;
            } else {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }

    constructor(private http: Http) {
    }

    getTags(): Observable<Tag[]> {
        return this.http.get('http://localhost/creatcareers_api/api/tags')
            .map(response => response.json() as Tag[])
            .catch(TagService.handleError);
    }

    createTag(tag: Tag): Observable<Tag> {
        return this.http.post('http://localhost/creatcareers_api/api/tags', tag)
            .map(response => response.json() as Tag)
            .catch(TagService.handleError);
    }

    updateTag(tag: Tag): Observable<any> {
        return this.http.put('http://localhost/creatcareers_api/api/tags', tag)
            .map(response => response.json())
            .catch(TagService.handleError);
    }

    deleteTag(id: string): Observable<any> {
        return this.http.delete('http://localhost/creatcareers_api/api/tags/:' + id)
            .map(response => response.json())
            .catch(TagService.handleError);
    }
}
