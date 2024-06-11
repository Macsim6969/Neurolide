import { Component } from '@angular/core';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent {

  public isSidebar: boolean;
  constructor(){}

  public toogleSidebar(){
    this.isSidebar = !this.isSidebar
  }
}
