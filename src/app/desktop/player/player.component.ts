import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
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
  
  music=[{
    src :"../../assets/music/Мари Краимбрери – Ты полюби меня пьяную.mp3",
    title : "Ты полюби меня пьяную",
    artist : "Мари Краимбрери",
    img : '../../assets/img/song/pyanay.jpg',
    id: 0
  },
  {
    src : "../../assets/music/tima_belorusskikh_-_nezabudka_(zaycev.net).mp3",
    title : "Незабудка",
    artist : "Тима Беларуских",
    img : '../../assets/img/song/nezabudka.jpg',
    id: 1
  },
  {
    src :"../../assets/music/Smash – Сохрани (ft. Артем Пивоваров).mp3",
    title : "Сохрани",
    artist : "Smash",
    img : '../../assets/img/song/sochrani.jpg',
    id: 2
  }
]


  constructor() { }

  viewFalse(){
    console.log(1)
    this.view=false;
  }

  viewTrue(){
    console.log(2)
    this.view=true;
  }

  selectSong(obj){
    this.justsrc=obj.id;
    this.img=this.music[this.justsrc].img;
    this.artist=this.music[this.justsrc].artist;
    this.title=this.music[this.justsrc].title;
    this.source.audio.src=obj.src;
    this.play()
  }

  play(){
    this.source.audio.play();
    if(!this.activ){
      this.activ=true;
      this.timer= setInterval(()=>{
        this.progressElmValue=this.source.audio.currentTime.toFixed(0);
        this.start=(this.source.audio.currentTime / 60).toFixed(2);
        this.progressElmMax=this.source.audio.duration.toFixed(0);
        this.end=(this.source.audio.duration / 60).toFixed(2);
          if(this.source.audio.currentTime>=this.source.audio.duration){
            this.next()
          }
      })
    }
    this.progress(1000);
  }

  pause(){
    this.source.audio.pause();
  }
  next(){
    this.justsrc++;
    if(this.justsrc > this.music.length-1){
      this.justsrc=0;
    }
    this.source.audio.src=this.music[this.justsrc].src;
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
    this.source.audio.src=this.music[this.justsrc].src;
    this.img=this.music[this.justsrc].img;
    this.artist=this.music[this.justsrc].artist;
    this.title=this.music[this.justsrc].title;
    this.play();
  }

  progress(time){
    if(!this.activ){
      this.activ=true;
      this.timer= setInterval(()=>{
          this.progressElmValue=this.source.audio.currentTime.toFixed(0);
          this.progressElmMax=this.source.audio.duration.toFixed(0);
      })
    }
  }

  change(val){
    console.log((val/10))
    this.source.audio.volume=(val/10)
  }
  ngOnInit() {
    this.src=this.music[0].src;
    this.source.audio.src=this.src;
    this.source.audio.load();
    this.source.audio.volume= 0.5;
    this.artist=this.music[0].artist;
    this.title=this.music[0].title;
    this.img=this.music[0].img;
  }

}
