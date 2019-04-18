import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {


  @Input() Image:string; 
  @Input() Name:string; 


  constructor() {}

  ngOnInit() {}
  

}
