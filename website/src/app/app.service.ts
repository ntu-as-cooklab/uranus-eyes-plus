import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  API_LINK = {
    UPLOAD: '/upload'
  };

  constructor(private http: Http) { }

  uploadSingleFile(data) {
    return this.http.post(
      this.API_LINK.UPLOAD, data
    );
  }

}
