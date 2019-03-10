import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import * as XRegExp from 'xregexp';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public familyNameValidator(c: AbstractControl): ValidationErrors | null {
    const unicodeLetterTest = XRegExp.test(c.value, XRegExp('^\\pL+$'));
    if (unicodeLetterTest) {
      return null;
    } else {
      return { notletter : 'family name can only consist of characters.' };
    }
  }

  public mapErrorStrings(control: AbstractControl) {
    return (errorStrings: {[index: string]: string}) => {
      return Object.keys(control.errors).map(key => errorStrings[key]);
    };
  }

}
