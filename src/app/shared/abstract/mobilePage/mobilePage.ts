import { Component, HostListener, OnInit } from "@angular/core";


@Component({
  template: ''
})

export abstract class IsMobilePage implements OnInit {
  public isMobile: boolean
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.initializeIsMobilePage();
  }

  ngOnInit(): void {
    this.initializeIsMobilePage();
  }

  private initializeIsMobilePage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}