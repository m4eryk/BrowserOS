import { Component, OnInit, Input } from '@angular/core';
import {formatDate } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  panel:boolean=false;
  justtime='';
  @Input() tasks:object[];
  @Input() shortcut:object[];
  @Input() audio;
  @Input() exit;
  @Input() setting;

  constructor() { }

  ngOnInit() {
    setInterval( ()=>{
      let date= new Date();
      this.justtime = formatDate(date, 'HH:mm:ss', 'en-US')
    }, 1000);
  }

  showPanel(){
    this.panel= this.panel ? false :true ;
  }

}
