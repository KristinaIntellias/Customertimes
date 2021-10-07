import { debounceTime } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CustomValidators } from './../../validators';
import { Subscription } from 'rxjs';
import { UserModel } from '../../models/user.model';
@Component({
  selector: 'app-signup-reactive-form',
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.css'],
})
export class SignupReactiveFormComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private validationMessagesMap = {
    email: {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address.',
      asyncEmailInvalid:
        'This email already exists. Please enter other email address.',
    },
  };

  validationMessage: string;
  userForm: FormGroup;
  // data model
  user: UserModel = new UserModel(
    'Mykola',
    'Maksymiv',
    'meow@gmail.com',
    false
  );

  placeholder = {
    email: 'Email (required)',
    confirmEmail: 'Confirm Email (required)',
    phone: 'Phone',
  };
  rMin = 1;
  rMax = 3;

  constructor(private fb: FormBuilder) {}

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  ngOnInit() {
    // this.createForm();
    // this.setFormValues();
    // this.patchFormValues()
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSave() {
    // Form model
    console.log(this.userForm);
    // Form value w/o disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    // Form value w/ disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
  }

  onBlur() {
    const emailControl = this.userForm.get('emailGroup.email');
    this.setValidationMessage(emailControl, 'email');
  }

  onAddAddress() {
    this.addresses.push(this.buildAddress());
  }

  onRemoveAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  setNotification(notifyVia: string) {
    const controls = new Map();
    controls.set('phoneControl', this.userForm.get('phone'));
    controls.set('emailGroup', this.userForm.get('emailGroup'));
    controls.set('emailControl', this.userForm.get('emailGroup.email'));
    controls.set(
      'confirmEmailControl',
      this.userForm.get('emailGroup.confirmEmail')
    );

    if (notifyVia === 'text') {
      controls.get('phoneControl').setValidators(Validators.required);
      controls.forEach((control, index) => {
        if (index !== 'phoneControl') {
          control.clearValidators();
          control.clearAsyncValidators();
        }
      });

      this.placeholder = {
        phone: 'Phone (required)',
        email: 'Email',
        confirmEmail: 'Confirm Email',
      };
    } else {
      const emailControl = controls.get('emailControl');
      emailControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        Validators.email,
      ]);
      emailControl.setAsyncValidators(
        CustomValidators.asyncEmailPromiseValidator
      );
      controls.get('confirmEmailControl').setValidators([Validators.required]);
      controls.get('emailGroup').setValidators([CustomValidators.emailMatcher]);
      controls.get('phoneControl').clearValidators();

      this.placeholder = {
        phone: 'Phone',
        email: 'Email (required)',
        confirmEmail: 'Confirm Email (required)',
      };
    }

    controls.forEach((control) => control.updateValueAndValidity());
  }

  private setFormValues() {
    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      sendProducts: this.user.sendProducts,
    });
  }

  private patchFormValues() {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }

  private buildForm() {
    this.userForm = this.fb.group({
      firstName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      lastName: [
        { value: 'Maksymiv', disabled: true },
        {
          validators: [Validators.required, Validators.maxLength(50)],
        },
      ],

      emailGroup: this.fb.group(
        {
          email: [
            '',
            [
              Validators.required,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
              Validators.email,
            ],
            // [CustomValidators.asyncEmailPromiseValidator]
          ],
          confirmEmail: ['', Validators.required],
        },
        { validator: CustomValidators.emailMatcher }
      ),

      phone: '',
      notification: 'email',
      serviceLevel: this.fb.control('', {
        validators: [],
        updateOn: 'blur',
      }),
      sendProducts: true,
      addresses: this.fb.array([this.buildAddress()]),
    });
  }

  private createForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      notification: new FormControl('email'),
      serviceLevel: new FormControl('', {
        validators: [CustomValidators.serviceLevel],
        updateOn: 'blur',
      }),
      sendProducts: new FormControl(true),
    });
  }

  private watchValueChanges() {
    this.sub = this.userForm
      .get('notification')
      .valueChanges.subscribe((value) => this.setNotification(value));

    const emailControl = this.userForm.get('emailGroup.email');
    const sub = emailControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.setValidationMessage(emailControl, 'email'));

    this.sub.add(sub);
  }

  private buildAddress(): FormControl {
    return this.fb.control('');
  }

  private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map((key) => this.validationMessagesMap[controlName][key])
        .join(' ');
    }
  }
}
