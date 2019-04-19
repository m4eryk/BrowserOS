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

  @Input()  direction:string;
  @Input()  top:string;
  @Input() task: object[];
  @Output() clickChange: EventEmitter<boolean> = new EventEmitter();
  
  
  constructor() { }

  ngOnInit() {
  }
  
  
  roll:boolean;

   public click(){
      this.roll=!this.roll;
      this.clickChange.emit(this.roll);
   }

}

