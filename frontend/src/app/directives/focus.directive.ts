import { Input, Directive, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnChanges {
  @Input('appFocus') focus!: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    if (this.focus) {
      this.el.nativeElement.focus();
    }
  }
}
