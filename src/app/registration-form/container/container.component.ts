import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FormTarget } from "../models/form-target";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  public formContainer: FormGroup;
  public target: FormTarget;
  public personalFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };
  public organizationalFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };
  public scansFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };
  public questionsFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.target = data["target"] ? data["target"] : FormTarget.VOLUNTEER;
    });
  }

  ngOnInit() {
    this.formContainer = this.fb.group({
      personalForm: this.fb.group({}),
      organizationalForm: this.fb.group({}),
      scansForm: this.fb.group({}),
      questionsForm: this.fb.group({}),
    });

    this.personalFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
    this.organizationalFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
    this.scansFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
    this.questionsFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
  }

  onSumbit() {
    console.log(ContainerComponent.countFields(this.formContainer));
  }

  /**
   * Returns for a given AbstractControl the amount of FormControls, the amount of FormControls labelled as required and the amount of FormControls labelled as required and valid.
   *
   * @remarks
   * This method is loosely based on the discussion found {@link https://stackoverflow.com/questions/49778432/reactive-forms-count-all-formcontrols-in-a-formgroup here}.
   *
   * @param control - The `AbstractControl` to be processed
   *
   * @returns An object containing three numbers:
   * 1) `all`: The amount of all objects of type `FormControl` present in the given `AbstractControl`
   * 2) `required`: The amount of all objects of type `FormControl`, containing a `required` validator, present in the given `AbstractControl`
   * 3) `requiredAndValid`: The amount of all objects of type `FormControl`, containing a `required` validator and labelled as `valid`, present in the given `AbstractControl`
   */
  static countFields(
    control: AbstractControl
  ): { all: number; required: number; requiredAndValid: number } {
    if (control instanceof FormControl) {
      let isRequired = ContainerComponent.isFieldRequired(control);
      return {
        all: 1,
        required: isRequired ? 1 : 0,
        requiredAndValid: isRequired && control.valid ? 1 : 0,
      };
    }

    if (control instanceof FormArray) {
      return control.controls.reduce(
        (valuesObject, currentControl) => {
          const intermediateResult = ContainerComponent.countFields(
            currentControl
          );
          return {
            all: valuesObject.all + intermediateResult.all,
            required: valuesObject.required + intermediateResult.required,
            requiredAndValid:
              valuesObject.requiredAndValid +
              intermediateResult.requiredAndValid,
          };
        },
        { all: 0, required: 0, requiredAndValid: 0 }
      );
    }

    if (control instanceof FormGroup) {
      return Object.keys(control.controls)
        .map((key) => control.controls[key])
        .reduce(
          (valuesObject, currentControl) => {
            const intermediateResult = ContainerComponent.countFields(
              currentControl
            );
            return {
              all: valuesObject.all + intermediateResult.all,
              required: valuesObject.required + intermediateResult.required,
              requiredAndValid:
                valuesObject.requiredAndValid +
                intermediateResult.requiredAndValid,
            };
          },
          { all: 0, required: 0, requiredAndValid: 0 }
        );
    }
  }

  /**
   * Returns a boolean indicating whether or not the given FormControl is labelled as required.
   *
   * @remarks
   * This method is loosely based on the discussion found {@link https://stackoverflow.com/questions/39819123/angular2-find-out-if-formcontrol-has-required-validator here}.
   *
   * @param control - The `FormControl` to be processed
   *
   * @returns A boolean where `true` indicates a `required` validator is present and `false` indicates no `required` validator is present
   */
  static isFieldRequired(control: FormControl): boolean {
    let isRequired = false;
    if (control.validator) {
      const validator = control.validator({} as FormControl);
      if (validator && validator.required) {
        isRequired = true;
      }
    }
    return isRequired;
  }
}
