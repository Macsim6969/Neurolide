import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '+380';

    // Убираем все нецифровые символы
    let phone = value.replace(/\D/g, '');

    // Если телефон уже содержит префикс +380, то не добавляем его повторно
    if (phone.startsWith('380')) {
      phone = '+380 ' + phone.substring(3);
    } else {
      phone = '+380 ' + phone;
    }

    if (phone.length > 6) {
      phone = phone.substring(0, 7) + ' ' + phone.substring(7);
    }

    if (phone.length > 10) {
      phone = phone.substring(0, 11) + ' ' + phone.substring(11, 15);
    }

    return phone.trim();
  }
}
