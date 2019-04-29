import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  @Input() tas;
  @Input() app;
  @Input() TS;

  value:object;
  backValue=[];
  img:object={ 
      folder : '../../assets/img/folder.png',
      text : '../../assets/img/text.png',
      player : '../../assets/img/player.png'
  }

  constructor() { }
  
  back(){
    this.value=this.backValue[this.backValue.length-1];
    if(this.backValue.length > 1){
      this.backValue.pop();
    }
  }

  changeValue(param){
    console.log(param)
    if(param.key && param.type=='folder'){
      this.backValue.push(this.value);
      this.value=this.TS.getData.folder(param.key);
    }
    else{
      if(param.type == 'txt'){
        this.app.textreader.bild(param);
      }
      else if(param.type == 'mp3' || param.type == 'mp4'){
        this.app.player.bild(param);
      }
    }
    
  }
  ngOnInit() {
    this.value=this.tas.dir;
  
    this.backValue.push(this.tas.dir);
  }

}
