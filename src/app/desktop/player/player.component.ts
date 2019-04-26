import { Component, OnInit, Input } from '@angular/core';

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


  constructor() { }

  viewFalse(){
    this.view=false;
  }

  viewTrue(){
    this.view=true;
  }

  selectSong(obj){
    this.justsrc=obj.id;
    this.img=this.music[this.justsrc].img;
    this.artist=this.music[this.justsrc].artist;
    this.title=this.music[this.justsrc].title;
    this.tas.audio.src=obj.src;
    this.play()
  }

  play(){
    this.tas.audio.play();
    if(!this.activ){
      this.activ=true;
      this.timer= setInterval(()=>{
        this.progressElmValue=this.tas.audio.currentTime.toFixed(0);
        this.start=(this.tas.audio.currentTime / 60).toFixed(2);
        this.progressElmMax=this.tas.audio.duration.toFixed(0);
        this.end=(this.tas.audio.duration / 60).toFixed(2);
          if(this.tas.audio.currentTime>=this.tas.audio.duration){
            this.next()
          }
      })
    }
    this.progress(1000);
  }

  pause(){
    this.tas.audio.pause();
  }

  next(){
    this.justsrc++;
    if(this.justsrc > this.music.length-1){
      this.justsrc=0;
    }
    this.tas.audio.src=this.music[this.justsrc].src;
    this.img=this.music[this.justsrc].img;
    this.artist=this.music[this.justsrc].artist;
    this.title=this.music[this.justsrc].title;
    this.play();
  }

  previous(){
    this.justsrc--;
    if(this.justsrc <= 0){
      this.justsrc=this.music.length-1;
    }
    this.tas.audio.src=this.music[this.justsrc].src;
    this.img=this.music[this.justsrc].img;
    this.artist=this.music[this.justsrc].artist;
    this.title=this.music[this.justsrc].title;
    this.play();
  }

  progress(time){
    if(!this.activ){
      this.activ=true;
      this.timer= setInterval(()=>{
          this.progressElmValue=this.tas.audio.currentTime.toFixed(0);
          this.progressElmMax=this.tas.audio.duration.toFixed(0);
      })
    }
  }

  change(val){
    console.log((val/10))
    this.tas.audio.volume=(val/10)
  }

  ngOnInit() {
    var obj=this.source[0];
    console.log(obj)
    this.music.push(obj)
    console.log(this.music)
    this.src=this.music[0].src;
    this.tas.audio.src=this.src;
    this.tas.audio.load();
    this.tas.audio.volume= 0.5;
    this.artist=this.music[0].artist;
    this.title=this.music[0].title;
    this.img=this.music[0].img;
  }

}
