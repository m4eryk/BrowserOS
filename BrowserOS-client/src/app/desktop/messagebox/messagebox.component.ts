import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  @Input() quest:string;
  @Input() tas;
  @Input() destroy;
  @Input() obj
  
  constructor() { }

  ngOnInit() {

  }

  getPostion() { 
    let  postion = { 
      'top' :   ((window.innerHeight / 2)-75) + 'px',
      'left' :  ((window.innerWidth / 2)-150) + 'px'   
    }
    return postion
  }

  ok(param){
    param.value.change=false;
    param.destroy(param);
    this.tas.destroy(this.tas);
  }

  dst(){
    this.tas.destroy(this.tas);
  }
}
