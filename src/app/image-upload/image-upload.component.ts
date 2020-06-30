import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.scss']
})
export class ImageUploadComponent {

  selectedFile: ImageSnippet;

  constructor(private userService: UserService) {}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'Ошибка';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.userService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
          this.onSuccess();
        },
        (err) => {
          console.log(err);
          this.onError();
        });
    });

    reader.readAsDataURL(file);
  }
}
