import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textreader',
  templateUrl: './textreader.component.html',
  styleUrls: ['./textreader.component.css']
})
export class TextreaderComponent implements OnInit {

  @Input() value;
  @Input() tas;
  
  constructor() { }

  ngOnInit() {

    setInterval(()=>{
      console.log(this.value.change+' change')
      if( this.tas.close == true ){
        this.tas.destroy(this.tas)
      }
    },5000)
    
  }

  setValue(value){
   console.log(this.value.change);
    this.value.change=false;
    this.value.value=value;
  }



}
