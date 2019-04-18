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
  day='';
  dayI='';
  time='';

  ngOnInit() {
    setInterval(()=>{
      let date= new Date()
      this.time=formatDate(date, 'HH:mm', 'en-US');
      this.day= formatDate(date, 'EEEE', 'en-Us');
      this.dayI= formatDate(date, 'd', 'en-Us');
    });

  }

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}
