import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseString'
})
export class ReverseStringPipe implements PipeTransform {
  nvalue:string
  constructor(){
    this.nvalue=''
  }

  transform(value: string, ...args: unknown[]): any {
    this.nvalue=value.split('').reverse().join('')
    return this.nvalue
  }

}
