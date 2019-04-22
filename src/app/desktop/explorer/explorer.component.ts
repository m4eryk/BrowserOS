import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  @Input() tas;
  value:object;
  backValue=[];

  constructor() { }
  back(){
    this.value=this.backValue[this.backValue.length-1];
    if(this.backValue.length > 1){
      this.backValue.pop();
    }
  }

  changeValue(param){
    if(param.dir){
      this.backValue.push(this.value);
      this.value=param.dir;
    }
    else{
      param.dblclick(param);
    }
    
  }
  ngOnInit() {
    this.value=this.tas.dir;
    this.backValue.push(this.tas.dir);
  }

}
