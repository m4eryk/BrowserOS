import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})
export class DesktopPageComponent implements OnInit {

@Input() app;
@Input() audio;
@Input() tasks;
@Input() exit;
@Input() shortcutArray:object[]=[];

shortcut:object[]=[];
contextmenu:boolean = false;
contextmenuX:number = 0;
contextmenuY:number = 0;
windowX=200;
windowY=50;
config;
hight:number[]=[];
widht:number[]=[];
grid:object[]=[];

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
                  creat: true
                }
                this.addShorcat(folder);
              }
            },
            {
              name:'Text',
              click: () =>{
                var text= {
                  type: 'txt',
                  name: 'MyText',
                  creat: true
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
    setting: true
  },
  {
    name: 'Change user',
    onclick:'',
    explorer: false,
    setting: true
  }
]

creatDesktopShorcat(obj){
    for(let i=0; i < this.config.length ; i++ ){
      if(this.shortcut.length >= Math.round(window.outerHeight/80)){
        var arrID = this.config[i]['id']
        if(this.config[i]['name'] == obj.name && arrID[0] == 0){
          this.shortcut[i]=obj
        }
      }
    }
    var close=false;
    for( let i = 0; i < Math.round(window.outerWidth/100) ; i++)
    {
      for ( let j = 0; j < Math.round(window.outerHeight/80); j++) 
      { 
        for(let k=0; k < this.config.length ; k++ ){
          var arrID = this.config[k]['id']
          if(this.config[k]['name'] == obj.name && arrID[0]==i+1 && arrID[1]==j){
            this.grid[i][j]=obj;
            close=true;
            break;   
          }
        }
      }
      if(close){
        break;
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
      for ( let j = 0; j < Math.round(window.outerHeight/80); j++) 
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




constructor(private _config: AppComponent){
  
}


async ngOnInit() {
  this.config = await this._config.getData.getConfig()
  this.addGrid()
  for(let item of this.shortcutArray){
    //this.addShorcat(item)
    this.creatDesktopShorcat(item)
  }
}
@HostListener('window:beforeunload')
async ngOnDestroy(){
  var config=[]
  for( let j = 0; j < this.shortcut.length; j++ ){
    var shortcut = {
      id : [ 0, j ],
      name : this.shortcut[j]['name']
    }
    config.push(shortcut)
  }
  for( let i = 0 ;  i <   this.grid.length ; i++){
    for( let index in this.grid[i]){
      if(!(Object.keys(this.grid[i][index]).length == 0)){
        var buf = this.grid[i][index];
        shortcut = {
          id : [ i+1, Number.parseInt(index) ],
          name : buf.name
        }
        config.push(shortcut)
      }
    }
  }
  await this._config.setData.setConfig(config)
}

addGrid(){   
  var widht = Math.round(window.outerWidth/100), height = Math.round(window.outerHeight/80);
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

disableContextMenu(){
  setTimeout(() => {
    this.contextmenu=false;
  },100)
}

}


