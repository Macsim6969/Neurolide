import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormatter'
})
export class CreditCardFormatterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const cleanedValue = value.replace(/\D/g, ''); // Remove all non-digit characters
    let formattedValue = '';

    for (let i = 0; i < cleanedValue.length; i += 4) {
      if (i > 0) {
        formattedValue += ' ';
      }
      formattedValue += cleanedValue.substr(i, 4);
    }

    return formattedValue;
  }
}
