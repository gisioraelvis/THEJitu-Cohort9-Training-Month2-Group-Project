import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { HttpErrorPopupComponent } from './http-error-popup.component';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorPopupService {
  private componentRef?: ComponentRef<HttpErrorPopupComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showError(code?: number, errorMessage?: string): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      HttpErrorPopupComponent
    );
    const componentRef = factory.create(this.injector);
    componentRef.instance.code = code || 500;
    componentRef.instance.errorMessage =
      errorMessage || 'An error occurred. Please try again later.';
    componentRef.instance.close.subscribe(() => {
      this.hideError(componentRef);
    });
    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as any)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);
    this.componentRef = componentRef;
  }

  private hideError(componentRef: ComponentRef<HttpErrorPopupComponent>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
