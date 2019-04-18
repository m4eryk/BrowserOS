import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopPageComponent } from './desktop-page/desktop-page.component';
import { WindowComponent } from './window/window.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { TaskComponent } from './task/task.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PanelComponent } from './panel/panel.component';
import { ShortcutComponent } from './shortcut/shortcut.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';
import { SettingComponent } from './setting/setting.component';
import { TextreaderComponent } from './textreader/textreader.component';
import { PlayerComponent } from './player/player.component';
import { MessageboxComponent } from './messagebox/messagebox.component';

@NgModule({
  declarations: [
    AppComponent,
    DesktopPageComponent,
    WindowComponent,
    TaskComponent,
    PanelComponent,
    ShortcutComponent,
    NavBarComponent,
    ContextmenuComponent,
    SettingComponent,
    TextreaderComponent,
    PlayerComponent,
    MessageboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
