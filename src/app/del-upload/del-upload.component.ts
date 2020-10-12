import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-del-upload',
  templateUrl: './del-upload.component.html',
  styleUrls: ['./del-upload.component.css']
})
export class DelUploadComponent implements OnInit {


    constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

    selectedFile: File;
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;

    ngOnInit() {}

    //Gets called when the user selects an image
    public onFileChanged(event) {
      this.selectedFile = event.target.files[0];     //Select File
    }

    //Gets called when the user clicks on submit to upload the image
    onUpload() {
      console.log(this.selectedFile);
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
       this.uploadFileService(uploadImageData)
          .subscribe((response: {error: string, message: string, time: string}) => {
            alert(response.message);
            this.router.navigate(['/delivery-ops']);
          }, error => {
            this.message = error.error.message;
          }
        );
    }

    uploadFileService(uploadImageData){
      return this.httpClient.post<{error: string, message: string, time: string}>('http://localhost:8004/uploadFile', uploadImageData).pipe(
        tap(
          (event) => this.handleResponse('http://localhost:8004/uploadFile', event),
          (error) => this.handleError('http://localhost:8004/uploadFile', error)
        )
      )
    }

    handleResponse(reqUrl: string, event){
      if(event instanceof HttpResponse){
        console.log(event)
      }
    }

    handleError(reqUrl: string, event){
      if(event instanceof HttpResponse){
        console.log(event)
      }
    }
}
