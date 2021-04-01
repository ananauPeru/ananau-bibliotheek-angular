import {
  AfterContentInit,
  Directive,
  ElementRef,
  Renderer2,
} from "@angular/core";

/**
 * This `Directive` adds the following node to every DOM element containing the `required` attribute it encounters:
 * ```html
 * <span class="required-asterisk">*</span>
 * ```
 *
 * @remarks
 * This class was partly built using the information found
 * {@link https://www.freakyjolly.com/angular-add-star-asterisk-sign-to-required-fields-using-custom-directive-for-bootstrap-form here} and
 * {@link https://www.digitalocean.com/community/tutorials/angular-using-renderer2 here}
 */
@Directive({
  selector: "[required]",
})
export class MarkAsteriskDirective implements AfterContentInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  // ngOnInit() is not being used to ensure elements marked with the *ngIf directive have also been rendered
  ngAfterContentInit() {
    const inputField = this.el.nativeElement as Node; // input field marked as required
    const parent = inputField.parentNode; // div containing input field
    const label = parent.previousSibling; // label predecessing parent

    // ensure to only use <label> elements
    if (label.nodeName === "LABEL") {
      const span = this.renderer.createElement("span");
      const text = this.renderer.createText("*");
      this.renderer.setStyle(span, "color", "red");
      this.renderer.setStyle(span, "font-weight", "bold");
      this.renderer.setStyle(span, "margin-left", "3px");
      this.renderer.setStyle(span, "font-size", "1.2em");
      this.renderer.appendChild(span, text);

      // if label contains more than just text, ensure <span> element succeeds only text, not (all) other element(s)
      if (label.childNodes.length > 1) {
        this.renderer.insertBefore(label, span, label.childNodes[1]);
      } else {
        this.renderer.appendChild(label, span);
      }
    }
  }
}
