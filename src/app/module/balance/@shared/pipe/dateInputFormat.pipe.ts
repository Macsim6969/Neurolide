import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateInputFormat'
})
export class DateInputFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Allow only numbers and /
    let formattedValue = value.replace(/[^0-9/]/g, '');

    // Limit to 5 characters
    if (formattedValue.length > 5) {
      formattedValue = formattedValue.slice(0, 5);
    }

    // Add / automatically after two digits if not already there
    if (formattedValue.length === 2 && !formattedValue.includes('/')) {
      formattedValue += '/';
    }

    return formattedValue;
  }
}
