import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})
export class DesktopPageComponent implements OnInit {

@Input() getData;
@Input() app;
@Input() audio;
@Input() tasks;
@Input() exit;
@Input() shortcut:object[]=[];

contextmenu:boolean = false;
contextmenuX:number = 0;
contextmenuY:number = 0;
arr = new Map();
windowX=200;
windowY=50;

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
                  type: 'folder',
                  name: 'Folder',
                }
              }
            },
            {
              name:'Text',
              click: () =>{
                var text= {
                  type: 'txt',
                  name: 'MyText',
                  id :2,
                  text: true,
                  value: '',
                  change: false
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

hight:number[]=[];
widht:number[]=[];
grid:object[]=[];


constructor(){
  
}


ngOnInit() {
  setTimeout(() => this.addGrid(),2000)
}

addGrid(){
       
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


