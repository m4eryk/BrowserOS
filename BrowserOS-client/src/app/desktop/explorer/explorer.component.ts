import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  @Input() tas;
  @Input() app;
  @Input() getData;

  value:object;
  backValue=[];
  img:object={ 
      folder : '../../assets/img/folder.png',
      text : '../../assets/img/text.png',
      player : '../../assets/img/player.png'
  }

  constructor(private _Data: DataService) { }
  
  back(){
    this.value=this.backValue[this.backValue.length-1];
    if(this.backValue.length > 1){
      this.backValue.pop();
    }
  }

  changeValue(param){
    if(param.key && param.type=='folder'){
      this.backValue.push(this.value);
      this.value=this.getData.folder(param.key);
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
