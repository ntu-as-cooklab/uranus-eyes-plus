import { Component, ElementRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { AppService } from '../app.service';
import 'rxjs/operators/map';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  _percent = 0;
  target = 'cirrus';
  inputFileName = 'note: jpg only';
  isResultShowed = false;
  isResultWaiting = true;
  filename = '';
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
  @ViewChild('imgPreview') imgPreview: ElementRef;

  constructor(
    private el: ElementRef,
    private service: AppService,
    private nns: NzNotificationService
  ) {
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
      this.inputFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview.nativeElement.src = reader.result;
      };
      reader.readAsDataURL(file);
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
        .subscribe(data => {
          if (data['success']) {
            this._percent = 100;
            this.isResultShowed = true;
            this.getResult({
              target: data['target'],
              filename: data['filename']
            });
          } else {
            this.nns.create('error',
              'Error',
              'Upload image failed! Please try again.'
            );
          }
        });
    }
  }

  getResult(data) {
    this.service.getResult(data)
      .subscribe(res => {
        if (res['success']) {
          this.result = res['result'];
          this.isResultWaiting = false;
        } else {
          this.nns.create('error',
            'Error',
            'Cannot analyze image! Please try again.'
          );
        }
      });
  }
}
