import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone:true
})
export class ShortenPipe implements PipeTransform {
  transform(value: string,limit:number):string {
    if(value.length>limit){
        return value.substring(0,limit) + '...'
    }
    return value
}

}
