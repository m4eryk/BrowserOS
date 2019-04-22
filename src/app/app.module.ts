import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopPageComponent } from './desktop/desktop-page/desktop-page.component';
import { WindowComponent } from './desktop/window/window.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { TaskComponent } from './desktop/task/task.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PanelComponent } from './desktop/panel/panel.component';
import { ShortcutComponent } from './desktop/shortcut/shortcut.component';
import { NavBarComponent } from './desktop/nav-bar/nav-bar.component';
import { ContextmenuComponent } from './desktop/contextmenu/contextmenu.component';
import { SettingComponent } from './desktop/setting/setting.component';
import { TextreaderComponent } from './desktop/textreader/textreader.component';
import { PlayerComponent } from './desktop/player/player.component';
import { MessageboxComponent } from './desktop/messagebox/messagebox.component';
import { ExplorerComponent } from './desktop/explorer/explorer.component';

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
    MessageboxComponent,
    ExplorerComponent
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
