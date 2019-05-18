import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-textreader',
  templateUrl: './textreader.component.html',
  styleUrls: ['./textreader.component.css']
})
export class TextreaderComponent implements OnInit {

  @Input() value;
  @Input() tas;
  
  constructor(private _setData:AppComponent) { }

  ngOnInit() {
    console.log(this.tas)
    setInterval(()=>{
      if( this.tas.close == true ){
        this.tas.destroy(this.tas)
      }
    },5000)
  }

  setValue(value, path){
    console.log(path)
    var obj = {
      buf : value,
      path : path
    }
    console.log(obj)
    this._setData.setData.setTextValue(obj)
    this.value.change=false;
  }



}
