import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import 'rxjs/add/operator/map';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  _percent = 0;
  target = 'cirrus';
  fileName = '';
  optionsName = [
    'cirrus',
    'cirrostratus',
    'cirrocumulus',
    'altocumulus',
    'altostratus',
    'stratocumulus',
    'stratus',
    'nimbostratus',
    'cumulus',
    'cumulonimbus'
  ];
  options = [];
  result;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private el: ElementRef, private service: AppService) {
    this.optionsName.forEach(e => {
      this.options.push({
        value: e,
        label: e
      });
    });
  }

  getFileName() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const file = fileBrowser.files[0];
      this.fileName = file.name;
    }
  }

  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      const file = fileBrowser.files[0];
      formData.append('upload', file, file.name);
      formData.append('target', this.target);
      this.service
        .uploadSingleFile(formData)
        .map(response => response.json())
        .subscribe(data => {
          if (data.success) {
            this._percent = 100;
            this.getResult({
              target: data.target,
              uuid: data.uuid
            });
          } else {
            //
          }
        });
    }
  }

  getResult(data) {
    this.service.getResult(data)
    .map(response => response.json())
    .subscribe(res => {
      if (res.success) {
        this.result = res.data;
      } else {
        //
      }
    });
  }
}
