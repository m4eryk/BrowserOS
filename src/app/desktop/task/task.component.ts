import { Component, OnInit, Input, NgModule, Output, EventEmitter } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [  ],
  imports: [
    ScrollingModule
  ],
  providers: [],
  bootstrap: []
})
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() direction:string;
  @Input() top:string;
  @Input() task: object[];
  @Input() color:string; 
  @Output() clickChange: EventEmitter<boolean> = new EventEmitter();
  
  img:object={ 
    folder : '../../assets/img/folder.png',
    text : '../../assets/img/text.png',
    player : '../../assets/img/player.png'
  }
  
  constructor() { }

  ngOnInit() {
 }
  
  
  roll:boolean;

   public click(){
      this.roll=!this.roll;
      this.clickChange.emit(this.roll);
   }

}

