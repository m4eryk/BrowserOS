import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})
export class DesktopPageComponent implements OnInit {


  

taskCount:number=0;
openWind:number[]=[];
dec:number=0;
contextmenu:boolean = false;
contextmenuX:number = 0;
contextmenuY:number = 0;
audio = new Audio();
windowX=200;
windowY=50;
playerActiv:boolean=false;

tasks:object[]=[];

desktopSetting ={
  backgroundImg: 'https://bipbap.ru/wp-content/uploads/2017/06/tmb_145037_6611.jpg',
  color: '',
  isBackgroundImg: true,
  getBackground: () => { 

    let  background = { 
      'background-image' :  this.desktopSetting.isBackgroundImg ? 'url('+this.desktopSetting.backgroundImg+')' : 'none',
      'background-color' : !this.desktopSetting.isBackgroundImg ?   this.desktopSetting.color : 'none'   
    }

    return background
  },
  setBackground: (value) => {
    if( value !=""){
     this.desktopSetting.backgroundImg= this.desktopSetting.isBackgroundImg ? value : 'none';
     this.desktopSetting.color= !this.desktopSetting.isBackgroundImg ? value : 'none'
    } 
  },
  getWindowX: () => {

    if(window.outerWidth < this.windowX+470){
      return this.windowX=200;
    }
    else{
      return this.windowX+=50;
    }
    
  },
  getWindowY: () => {

    if(window.outerHeight < this.windowY+470){ 
      return this.windowY=50;
    }
    else{
      return this.windowY+=50;
    }
    
  }
}

hight:number[]=[];
widht:number[]=[];


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

contextMenu:object=[
    {
      image: '../../assets/img/wrench.png',
      id :0,
      name: 'Setting',
      explorer: false,
      setting: true,
      desktopObj: this.desktopSetting,
      click: (obj) =>{
        this.app.setting.bild(obj);
      },
      destroy : (obj) =>{
        this.app.setting.destroy(obj)
      },
      colappase : (param) =>{
        this.app.setting.colappase(param)
      }
    },
    {
      name: 'Create',
      viewChild:false,
      value: [
              {
                name:'Folder',
                click: () =>{
                  var folder = {
                    image: '../../assets/img/folder.png',
                    name: 'Folder',
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
                  }
                  this.addShorcat(folder);
                }
              },
              {
                name:'Text',
                click: () =>{
                  var text= {
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
                  }
                  this.addShorcat(text);
                }
              }
      ],
      click: (obj) =>{
        obj.viewChild=!obj.viewChild
      },
      mouseenter: (obj) =>{
        obj.viewChild=true
      }
    },
    {
      name: 'Exit full screen mode',
      onclick:'',
      explorer: false,
      setting: true,
      click: (obj) =>{
      }
    },
    {
      name: 'Change user',
      onclick:'',
      explorer: false,
      setting: true,
      click: (obj) =>{
      }
    }
]

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

grid:object[]=[];


constructor(){
}

ngOnInit() {
  var widht = Math.round(window.outerWidth/100), height = Math.round(window.outerHeight/113);
  for( let i =0 ; i < height ; i++ ) {
    if( i > this.shortcut.length-2 ){
      this.shortcut.push({});
    }
  }
  for( let i = 0 ;  i <  widht+1 ; i++){
    let obj=[];
    for( let j = 0; j < this.shortcut.length-1; j++ ){
      obj.push({})
    }
    this.grid.push(obj)
  }
  console.log(this.grid)
}

app = {

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



addShorcat(obj){
  for( let i = 0 ; i < this.shortcut.length ; i++ ){
    if(Object.keys(this.shortcut[i]).length == 0){
      this.shortcut.splice(i,(this.shortcut.length - i));
    }
  }
  if( Math.round(window.outerHeight/113) > this.shortcut.length)
  {
    this.shortcut.push(obj);
  }
  else
  {
    var close=false;
    for( let i = 0; i < Math.round(window.outerWidth/100) ; i++)
    {
      for ( let j = 0; j < Math.round(window.outerHeight/113); j++) 
      { 
        if(Object.keys(this.grid[i][j]).length == 0)
        {
          this.grid[i][j]=obj;
          close=true;
          break;                  
        }
      }
      if(close){
        break;
      }
    }
  }
}


drop(event: CdkDragDrop<object[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}

onRightClick(event){
  this.contextmenuX=event.clientX;
  this.contextmenuY=event.clientY;
  this.contextmenu=true;
}

disableContextMenu(event){
  this.contextmenu=false;
}
}


