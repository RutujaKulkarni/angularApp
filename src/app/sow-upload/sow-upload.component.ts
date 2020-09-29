import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-sow-upload',
  templateUrl: './sow-upload.component.html',
  styleUrls: ['./sow-upload.component.css']
})
export class SowUploadComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

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
      this.httpClient.post('http://localhost:8000/api/citi-portal/uploadFile', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Excel uploaded successfully';
          } else {
            this.message = 'Excel uploaded successfully';
          }
        }
      );
  }

}
