import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true,
})
export class TruncateNamePipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 16,
    ellipsis: string = '...'
  ): unknown {
    return value.length > maxLength
      ? value.slice(0, maxLength) + ellipsis
      : value;
  }
}
