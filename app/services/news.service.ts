import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

@Injectable()
export class NewsService {
    private news: any;
    private source = 'guardian';
    private apiKey = 'aa1c9a27-8121-4051-bd77-bbc1671ec160';
    private url = 'https://content.guardianapis.com/search?api-key=' + this.apiKey + '&format=json&show-fields=thumbnail&page-size=30'

    constructor( private http: Http ) {
        this.news = [{
            title: 'This is the first news headline',
            urlToImage: 'https://placekitten.com/300/300'
        }];
    }

    public getNews(): Observable<any> {
        return this.http.get(this.url)
            .mergeMap(data => data.json().response.results)
            .map(this.mapNews);
    }

    private extractData(data: Response) {
        let body = data.json();
        console.log(Observable.from(body.response.results));
        return Observable.from(body.response.results);
    }

    private mapNews(item: any) {
        if (item['fields']) {
        return {
            title: item['webTitle'],
            urlToImage: item['fields']['thumbnail'],
            disabled: false,
            flip: false
            };
        } else {
            return;
        }
    }
}
