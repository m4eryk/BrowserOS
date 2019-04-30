import { Component, OnInit, Input } from '@angular/core';
import { MatMenuModule, MatButtonModule, MatRadioModule} from '@angular/material';
import {  BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  @Input() desktopObj;
  color :string;
  image:object[]=[
    {
      src:'https://bipbap.ru/wp-content/uploads/2017/06/tmb_145037_6611.jpg',
      alt:'nature'
    },
    {
      src:'http://hdwpro.com/wp-content/uploads/2017/01/3D-Cool-Image.jpg',
      alt:'nature'
    },
    {
      src:'https://i.imgur.com/OzNqkf7.jpg',
      alt:'anime'
    },
    {
      src:'https://zabavnik.club/wp-content/uploads/2018/02/Odinochestvo_1_06021818.jpg',
      alt:'anime'
    },
    {
      src:'https://zabavnik.club/wp-content/uploads/2018/02/kartinki_krasivye_skachat_besplatno_3_04121556.jpg',
      alt:'anime'
    }
  ]

  box:string[]=[ 'red', 'black', 'cyan', 'darkgreen', 'white'];
  
  constructor() { }

  ngOnInit() {
  }

  getColor(){
    this.desktopObj.isBackgroundImg=false;
    return this.color
  }


}
