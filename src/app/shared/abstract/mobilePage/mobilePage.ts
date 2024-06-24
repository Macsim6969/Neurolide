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
    this.isMobile = innerWidth < 1124;
  }
}