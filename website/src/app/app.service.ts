import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  API_LINK = {
    UPLOAD: '/upload',
    GET_RESULT: '/api/getResult'
  };

  constructor(private http: Http) { }

  uploadSingleFile(data) {
    return this.http.post(
      this.API_LINK.UPLOAD, data
    );
  }

  getResult(data) {
    return this.http.post(
      this.API_LINK.GET_RESULT, data
    );
  }

}
