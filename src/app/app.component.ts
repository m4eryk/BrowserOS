import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

audio = new Audio();

playerActiv:boolean=false;

taskCount:number=0;
tasks:object[]=[];

openWind:number[]=[];

desktopIsActivete:boolean;

message:object=[
  {
    name: 'Save',
    quest: "Quit without saving",
    destroy : (obj ) =>{
      this.app.message.destroy(obj)
    },
    bild : (obj, param) =>{
      this.app.message.bild(obj, param)
    },
    click: (obj) =>{
      this.app.message.click(obj)
    }
  },
  {
    name: 'Alert',
    quest: "Player is active",
    destroy : (obj ) =>{
      this.app.message.destroy(obj)
    },
    bild : (obj, param) =>{
      this.app.message.bild(obj, param)
    }
  }
]

shortcut:object[] = [
  {
    image: '../../assets/img/folder.png',
    name: 'MyFolder',
    id :0,
    explorer: true,
    dblclick:(obj) => {
      this.app.explorer.bild(obj)
    },
    destroy : (obj) =>{
      this.app.explorer.destroy(obj)
    },
    colappase : (param) =>{
      this.app.explorer.colappase(param)
    }
  },
  {
    image: '../../assets/img/folder.png',
    name: 'YouFolder',
    id :1,
    explorer: true,
    dblclick:(obj) => {
      this.app.explorer.bild(obj)
    },
    destroy : (obj) =>{
      this.app.explorer.destroy(obj)
    },
    colappase : (param) =>{
      this.app.explorer.colappase(param)
    }
  },
  {
    image: '../../assets/img/text.png',
    name: 'MyText',
    id :2,
    text: true,
    value: '',
    change: false,
    dblclick:(obj) => {
      this.app.textreader.bild(obj);
    },
    destroy : (obj) =>{
      this.app.textreader.destroy(obj)
    },
    colappase : (param) =>{
      this.app.textreader.colappase(param)
    }
  },
  {
    image: '../../assets/img/player.png',
    name: 'Video',
    id :2,
    player: true,
    video: true,
    source: [
              {
                src:'../../assets/video/videoplayback.mp4',
                type:'video/mp4'
              }
            ],
    dblclick:(obj) => {
      this.app.player.bild(obj);
    },
    destroy : (obj) =>{
      this.app.player.destroy(obj)
    },
    colappase : (param) =>{
      this.app.player.colappase(param)
    }
  },
  {
    image: '../../assets/img/player.png',
    name: 'Music',
    id :2,
    player: true,
    music: true,
    dblclick:(obj) => {
      if(!this.playerActiv){
        this.app.player.bild(obj);
        this.playerActiv=true;
      }
      else{
        this.app.message.bild(this.message[1], obj);
      }
    },
    destroy : (obj) =>{
      this.app.player.destroy(obj);
      this.playerActiv=false;
    },
    colappase : (param) =>{
      this.app.player.colappase(param)
    }
  }
]

app = {
  launcher : {
    bild : () => {
      var task = {
          shortcut: this.shortcut,
          audio: this.audio,
          tasksList: this.tasks,
          id: 0,
          destroy: this.app.launcher.destroy
      }
      task.id=this.taskCount;
      this.tasks.push(task);
      this.taskCount++;
      this.desktopIsActivete=true;
    },
    destroy : () => {
      let n= this.tasks.length;
      while(n--) {
          this.tasks.splice(n, 1);
      }
      this.desktopIsActivete=false;
    }
  },
  explorer :{  
    bild : (obj) => {
      var task = {
          image: obj.image,
          name: obj.name,
          minimize: true,
          id: 0,
          destroy: obj.destroy,
          colappase: obj.colappase,
          explorer: obj.explorer
      }
      task.id=this.taskCount;
      this.tasks.push(task);
    this.taskCount++;
    },
    destroy : (obj) => {
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
    },
    colappase : (param) =>{
      param.minimize=!param.minimize;
    }
  },
  setting :{
      bild : (obj) => {
        var task = {
            image: obj.image,
            name: obj.name,
            minimize: true,
            id: 0,
            destroy: obj.destroy,
            colappase: obj.colappase,
            setting: obj.setting,
            desktopObj: obj.desktopObj
        }
        task.id=this.taskCount;
        this.tasks.push(task);
        this.taskCount++;
        
      },
      destroy : (obj) => {
        let n= this.tasks.length;
        while(n--) {
          if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
            this.tasks.splice(n, 1);
          }
        }
      },
      colappase : (param) =>{
        param.minimize=!param.minimize;
      }
  },
  player:{ 
    bild: (obj) => {
    var task ={
      image: obj.image,
      name: obj.name,
      minimize: true,
      id: 0,
      video : obj.video,
      music: obj.music,
      destroy: obj.destroy,
      colappase: obj.colappase,
      source : obj.source,
      player: obj.player,
      audio: this.audio
    }
    task.id=this.taskCount;
    this.tasks.push(task);
    this.taskCount++;
    },
    destroy : (obj) => {
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
      this.audio.src=''
    },
    colappase : (param) =>{
      param.minimize=!param.minimize;
    }   
  },
  message:{
    bild: (obj, param) => {
      var task ={
        name: obj.name,
        id: 0,
        message: true,
        quest: obj.quest,
        destroy: obj.destroy,
        click: obj.click,
        obj: param
    }
    task.id=this.taskCount;
    this.tasks.push(task);
    this.taskCount++;
    },
    destroy : (obj) => {
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
      obj.obj.close = false;
      obj.obj.value.change= true;
    },
    click : (obj) =>{
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
      obj.obj.close = true;
      obj.obj.value.change= false;
    }
  },
  textreader :{
    bild : (obj) => {
      var task ={
        image: obj.image,
        name: obj.name,
        minimize: true,
        id: 0,
        text : obj.text,
        destroy: obj.destroy,
        colappase: obj.colappase,
        value: obj,
        close: false
      }
      task.id=this.taskCount;
      this.tasks.push(task);
      this.taskCount++;
    },
    destroy : (obj) => {

      if(!obj.value.change){
        
        let n= this.tasks.length;
        while(n--) {
          if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
            this.tasks.splice(n, 1);
          }
        }
      }else{
        this.app.message.bild(this.message[0], obj);
      }
    },
    colappase : (param) =>{
      param.minimize=!param.minimize;
    }
  }   
}

 exit = () =>{
  this.app.launcher.destroy();
}
ngOnInit(){
  this.app.launcher.bild();
}

}
