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
    let label = inputField.previousSibling; // label predecessing input field

    if (label.nodeType === Node.COMMENT_NODE) {
      /*
      some elements are marked with the *ngIf directive and are therefore preceded by
      the comment below in the compiled DOM

      <!--bindings={
        "ng-reflect-ng-if": "true"
      }-->

      the label that's being searched for, proceeds this comment
      */

      label = label.previousSibling;
    }

    // ensure to only use <label> elements
    if (label.nodeName === "LABEL") {
      const span = this.renderer.createElement("span");
      const text = this.renderer.createText("*");
      this.renderer.addClass(span, "required-asterisk");
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
