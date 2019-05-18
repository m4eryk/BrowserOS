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
    this.img=this.music[this.justsrc].image;
    this.artist=this.music[this.justsrc].name;
    this.tas.audio.src=obj.source;
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
    this.tas.audio.src=this.music[this.justsrc].source;
    this.img=this.music[this.justsrc].image;
    this.artist=this.music[this.justsrc].name;
    this.play();
  }

  previous(){
    this.justsrc--;
    if(this.justsrc <= 0){
      this.justsrc=this.music.length-1;
    }
    this.tas.audio.src=this.music[this.justsrc].source;
    this.img=this.music[this.justsrc].image;
    this.artist=this.music[this.justsrc].name;
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
    this.tas.audio.volume=(val/10)
  }

  ngOnInit() {
    this.music.push(this.tas)
    console.log(this.music)
    this.src=this.music[0].source;
    this.tas.audio.src=this.src;
    this.tas.audio.load();
    this.tas.audio.volume= 0.5;
    this.artist=this.music[0].name;
    this.img=this.music[0].image;
  }

}
