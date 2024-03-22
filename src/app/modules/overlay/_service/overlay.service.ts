import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { OverlayComponent } from '../overlay.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayComponentRef: ComponentRef<OverlayComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(content: string, duration: number = 0) {
    if (!this.overlayComponentRef) {
      this.createOverlay();
    }
    this.setOverlayContent(content);
    this.setOverlayDuration(duration);
    this.overlayComponentRef.instance.open();
  }

  close() {
    if (this.overlayComponentRef) {
      this.overlayComponentRef.instance.close();
    }
  }

  private createOverlay() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
    this.overlayComponentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.overlayComponentRef.hostView);
    const domElem = (this.overlayComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  private setOverlayContent(content: string) {
    this.overlayComponentRef.instance.content = content;
  }

  private setOverlayDuration(duration: number) {
    this.overlayComponentRef.instance.duration = duration;
  }
}