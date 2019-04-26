import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit, OnDestroy {


  @Input() tas;
  @Input() roll : boolean;
  @Input() destroy;
  @Input() desktopSetting;
  @Input() app;
  @Input() TS;

  path:string;
  x:string;
  y:string;
  height:string='0';
  width:string='0';
  top:string;
  left:string;
  size: number[]=[];

  constructor() {
    
    for(let i = 30; i < 200; i+=40){
      this.size.push(i);
    }
   }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.size, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    console.log(this.tas);
    this.x=this.desktopSetting.getWindowX()+'px';
    this.y=this.desktopSetting.getWindowY()+'px';
    this.top=this.y;
    this.left=this.x;
  }

  toggle(){
   this.roll=false;
  }

  sizing(){
    if(this.height != '460px'){
      return '460px';
    }
    else{
      return '100%';
    }
  }

  changeSize(){
    this.height=this.sizing();
    if( this.top ==  this.y){
      this.top='0';
      this.left='0';
    }
    else{
      this.top=this.y;
      this.left=this.x;
    }
  }

  ngOnDestroy(){
   
  }
}

