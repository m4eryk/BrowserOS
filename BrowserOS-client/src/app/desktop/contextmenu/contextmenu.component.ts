import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.css']
})
export class ContextmenuComponent implements OnInit {
  @Input() x=0;
  @Input() y=0;
  @Input() contextMenu;
  value;
  constructor() { }

  ngOnInit() {
    this.value=this.contextMenu[1].value;
  }

  leave() {
    this.contextMenu[1].viewChild=false;
  }

}
