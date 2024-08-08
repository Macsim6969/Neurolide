import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateUserId'
})
export class TruncateUserIdPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const truncated = value.length > 6 ? value.substring(0, 6) : value;
      return `(${truncated}...)`;
    }
    return '';
  }

}
