import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker/ngx";

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import {PostAdd} from '../Model/class';
// import {RestService } from '../Services/rest.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// import {File} from '@ionic-native/file/ngx';

import { toBase64String } from '@angular/compiler/src/output/source_map';
@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.page.html',
  styleUrls: ['./postadd.page.scss'],
})
export class PostaddPage implements OnInit {
  public formcontrol: FormGroup;
  public formValid = true;
  isSubmitted = false;
  today = Date.now();
  cameraphotos: any;
  galleryphotos: any;
  demo: any = {};
  // public data: PostAdd = new PostAdd();
  images: any = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private picker: ImagePicker
  ) {
    this.route.queryParams.subscribe(res => {
      console.log(res);
      this.demo = res;
    });
    this.formcontrol = this.fb.group({
      postadname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      postadprice: ['', [Validators.required, (Validators.minLength(10), (Validators.pattern(/^[0-9]\d{9}$/)))]],
      postadquant: ['', [Validators.required, (Validators.minLength(10))]],
      postaddesc: ['', [Validators.required,]],
      postadimage: ['', [Validators.required,]],
      roles: this.fb.array(['USER'])
    });
  }

  //helps in triggers an error in validation
  get errorControl() {
    return this.formcontrol.controls;
  }
  post() {
    this.isSubmitted = true;
    if (!this.formcontrol.valid) {
      alert("myself");
      return false;
    } else {
      alert("hello");
    }
  }


  ngOnInit() {
  }
  //GET IMAGE FROM CAMERA
  //   getfromcamera() {
  //     const options: CameraOptions = {
  //       quality: 70,

  //       sourceType:this.camera.PictureSourceType.CAMERA,
  //       destinationType: this.camera.DestinationType.FILE_URI,
  //       //encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE
  //     }
  //     this.camera.getPicture(options).then((ImageData) => {
  //       this.cameraphotos = 'data:image/jpeg;base64,' + ImageData;
  //     }, (err) => {
  //       //Handle error
  //     });
  //  }

  //  getfromgallery() {
  //   var options : ImagePickerOptions ={
  //     maximumImagesCount:5,
  //     width:100,
  //     height:100  
  //    }
  //    this.imagePicker.getPictures(options).then((results) =>{
  //     for (var i = 0; i < results.length; i++) {
  //       console.log('Image URI: ' + results[i]);
  //  }

  // }, (err) => { });
  // }
//   checkPermission() {
//     this.picker.hasReadPermission().then((val) => {
// alert(val);
//       if (val == undefined) {
//         this.picker.requestReadPermission().then(() => {
//           this.pickImages();

//         })
//       }
//       else {
//         this.pickImages();
//       }
//     }, (err) => {
//       alert(JSON.stringify(err));
//     })
//   }
  pickImages() {
   
    let options: ImagePickerOptions = {
      maximumImagesCount: 10,
      outputType: 1
    }
    this.picker.getPictures(options).then((arr) => {
      for (var i = 0; i < arr.length; i++) {
        this.images.push("data:image/png;base64," + arr[i]);
      }
     
    }, (err) => {
      alert(JSON.stringify(err));
    })
  }
  remove(i) {
    if (window.confirm("do you want to delete?")) {
      this.images.splice(i, 1);
    }
  }
  showImages() {

  }

}