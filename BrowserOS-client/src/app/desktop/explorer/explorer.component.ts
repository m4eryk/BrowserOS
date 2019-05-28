import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  @Input() tas;
  @Input() app;


  value;
  backValue=[];
  img:object={ 
    folder : '../../assets/img/folder.png',
    text : '../../assets/img/text.png',
    player : '../../assets/img/player.png',
    picture : '../../assets/img/picture.png'
  } 

  constructor(private _Data: AppComponent) { }
  
  back(){
    this.value=this.backValue[this.backValue.length-1];
    if(this.backValue.length > 1){
      this.backValue.pop();
    }
  }

  async changeValue(param){
    if(param.type=='folder'){
      this.backValue.push(this.value);
      this.value = await this._Data.getData.getDataTable(param.url+'/');
    }
    else{
      if(param.type == 'txt'){
        this.app.textreader.bild(param);
      
      }
      else if(param.type == 'mp3' || param.type == 'mp4' || param.type == 'jpg' ){
        this.app.player.bild(param);
        
      }
    }
  }

  ngOnInit() {
    var buf = { dir : this.tas.dir }
    this.value=buf.dir;
    this.backValue.push(buf.dir);
  }

}
