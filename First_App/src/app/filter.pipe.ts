import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/Interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:Product[], searchString: string): Product[] {
    if(value.length==0){
      return value
    }
    let searchItems = []
    for(let product of value){
      if(product.category.toLowerCase()===searchString.toLowerCase() || 
        product.name.toLowerCase() === searchString.toLowerCase()){
          searchItems.push(product)
        }
    }

    return searchItems
  }

}
