import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrollTrigger]',
  standalone: true,
})
export class InfiniteScrollTriggerDirective implements AfterViewInit, OnDestroy {
  @Output() scrollTresholdReached: EventEmitter<void> = new EventEmitter<void>();

  @Input({ required: true }) thresholdFromEnd!: number;

  private parent: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLDivElement>);
  private mutationObserver = new MutationObserver((elements) => elements.forEach(() => this.observeElement()));

  private intersectionObserver: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      this.intersectionObserver.unobserve(entry.target);
      this.scrollTresholdReached.emit();
    });
  });

  ngAfterViewInit(): void {
    this.observeElement();
    this.mutationObserver.observe(this.parent.nativeElement, { childList: true });
  }

  private observeElement(): void {
    const element = this.parent.nativeElement.children.item(
      this.parent.nativeElement.children.length - this.thresholdFromEnd,
    );
    if (!element) {
      return;
    }
    this.intersectionObserver.observe(element);
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
    this.mutationObserver.disconnect();
  }
}
