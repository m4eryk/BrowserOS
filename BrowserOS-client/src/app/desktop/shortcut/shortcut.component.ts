import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {


  @Input() cut;
  @Input() app;
  
  img:object={ 
    folder : '../../assets/img/folder.png',
    text : '../../assets/img/text.png',
    player : '../../assets/img/player.png'
  } 

  dblclick(obj){
    console.log(obj)
    if(obj.type == 'txt'){
      this.app.textreader.bild(obj);
    }
    else if(obj.type == 'mp3' || obj.type == 'mp4'){
      this.app.player.bild(obj);
    }
    else{
      this.app.explorer.bild(obj);
    }
  }
  constructor() {}

  ngOnInit() {}
  

}
