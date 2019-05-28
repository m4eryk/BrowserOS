import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() tas;
  @Input() source;

  artist:string;
  title:string;
  src:string;
  img:string;
  justsrc:number=0;
  activ:boolean=false;
  timer;
  progressElmValue;
  progressElmMax;
  start:string='-';
  end:string='-';
  view:boolean=false;
  
  music=[]


  constructor(private _Audio: AppComponent) { }

  viewFalse(){
    this.view=false;
  }

  viewTrue(){
    this.view=true;
  }

  selectSong(obj){
    this.img=this.music[this.justsrc].image;
    this.artist=this.music[this.justsrc].name;
    this._Audio.audio.src=obj.source;
    this.play()
  }

  play(){
    this._Audio.audio.play();
    if(!this.activ){
      this.activ=true;
      this.timer= setInterval(()=>{
        this.progressElmValue=this._Audio.audio.currentTime.toFixed(0);
        this.start=(this._Audio.audio.currentTime / 60).toFixed(2);
        this.progressElmMax=this._Audio.audio.duration.toFixed(0);
        this.end=(this._Audio.audio.duration / 60).toFixed(2);
          if(this._Audio.audio.currentTime>=this._Audio.audio.duration){
            this.next()
          }
      })
    }
    this.progress(1000);
  }

  pause(){
    this._Audio.audio.pause();
  }

  next(){
    this.justsrc++;
    if(this.justsrc > this.music.length-1){
      this.justsrc=0;
    }
    this._Audio.audio.src=this.music[this.justsrc].source;
    this.img=this.music[this.justsrc].image;
    this.artist=this.music[this.justsrc].name;
    this.play();
  }

  previous(){
    this.justsrc--;
    if(this.justsrc <= 0){
      this.justsrc=this.music.length-1;
    }
    this._Audio.audio.src=this.music[this.justsrc].source;
    this.img=this.music[this.justsrc].image;
    this.artist=this.music[this.justsrc].name;
    this.play();
  }

  progress(time){
    if(!this.activ){
      this.activ=true;
      this.timer= setInterval(()=>{
          this.progressElmValue=this._Audio.audio.currentTime.toFixed(0);
          this.progressElmMax=this._Audio.audio.duration.toFixed(0);
      })
    }
  }

  change(val){
    this._Audio.audio.volume=(val/10)
  }

  ngOnInit() {
    this.music.push(this.tas)
    this.src=this.music[0].source;
    this._Audio.audio.src=this.src;
    this._Audio.audio.load();
    this._Audio.audio.volume= 0.5;
    this.artist=this.music[0].name;
    this.img=this.music[0].image;
  }

}
