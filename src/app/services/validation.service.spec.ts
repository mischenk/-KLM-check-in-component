import { TestBed } from '@angular/core/testing';
import {FormControl, ValidationErrors} from '@angular/forms';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    expect(service).toBeTruthy();
  });

  it('tests international name validation of family name validator', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    const formControl: FormControl = new FormControl();
    formControl.setValue('山大');
    expect(service.familyNameValidator(formControl)).toEqual(null);
    formControl.setValue('Mångata');
    expect(service.familyNameValidator(formControl)).toEqual(null);
    formControl.setValue('热闹');
    expect(service.familyNameValidator(formControl)).toEqual(null);
    formControl.setValue('Yagán');
    expect(service.familyNameValidator(formControl)).toEqual(null);
  });

  it('tests mapping validation errors to human readable error feedback', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    const errors: ValidationErrors = { required: '', minlength: '' };
    const hrErrors: {[index: string]: string} = {
      required: 'this is a required input',
      minlength: 'length is too little'
    };
    const formControl: FormControl = new FormControl();
    formControl.setErrors(errors);
    const mappedErrors = service.mapErrorStrings(formControl)(hrErrors);
    // tslint:disable-next-line:no-string-literal
    expect(mappedErrors[0]).toEqual(hrErrors['required']);
    // tslint:disable-next-line:no-string-literal
    expect(mappedErrors[1]).toEqual(hrErrors['minlength']);
  });
});
