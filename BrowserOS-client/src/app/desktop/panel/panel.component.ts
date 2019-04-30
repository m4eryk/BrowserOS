import { Component, OnInit, Input } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }
  
  @Input() shortcut:object[];
  @Input() exit;
  @Input() setting;
  @Input() app;

  day='';
  dayI='';
  time='';

  ngOnInit() {
    console.log(this.shortcut)
    setInterval(()=>{
      let date= new Date()
      this.time=formatDate(date, 'HH:mm', 'en-US');
      this.day= formatDate(date, 'EEEE', 'en-Us');
      this.dayI= formatDate(date, 'd', 'en-Us');
    });

  }

  dblclick(obj){
    if(obj.type == 'txt'){
      this.app.textreader.bild(obj);
    }
    else if(obj.type == 'mp3' || obj.type == 'mp4'){
      this.app.player.bild(obj);
    }
    else{
      this.app.explorer.bild(obj);
    }
  }

}
