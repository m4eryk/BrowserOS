import { Component, ElementRef, OnInit, Input, HostListener} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DesktopPageComponent } from '../desktop-page/desktop-page.component';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {


  @Input() cut;
  @Input() app;


  img:object={ 
    folder : './assets/img/folder.png',
    text : './assets/img/text.png',
    player : './assets/img/player.png',
    picture : './assets/img/picture.png'
  } 

  @HostListener('document:click')
  clickout() {
    if( this.cut.creat ) this.onclick( '' , this.cut.type)
  }

  constructor(private _creatFile: AppComponent, private _contextMenuActiv: DesktopPageComponent) {}

  dblclick(obj){
    console.log(obj)
    if(obj.type == 'txt'){
      this.app.textreader.bild(obj);
    }
    else if(obj.type == 'mp3' || obj.type == 'mp4' || obj.type == 'jpeg'){
      this.app.player.bild(obj);
    }
    else{
      this.app.explorer.bild(obj);
    }
  }

  onclick(name,type){
    if(!this._contextMenuActiv.contextmenu){  
      console.log(name + type)
      if(type == 'txt'){
        if(name === ''){
          console.log('wdwadawdwa')
          this._creatFile.creatData.textFile('newText')
        }
        else this._creatFile.creatData.textFile(name)
      }
      else {
        if(name === ''){
          this._creatFile.creatData.folder('newFolder')
        }
        else this._creatFile.creatData.folder(name)
      }
    }
  }


  ngOnInit() {
    console.log(this.cut.type)
  }
  

}
