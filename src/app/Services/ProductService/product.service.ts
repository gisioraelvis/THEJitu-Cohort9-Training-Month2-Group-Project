import { Injectable } from '@angular/core';
import { Product } from '../../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private products:Product[]=[
    {  
      id:1,
      name:'Mouse',
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.',
      price:'200',
      category:'Eletronics',
      image:'https://imgs.search.brave.com/wiDD94TXUQBQ1sdeTO4G8moouSpgKEvwUdV26pkNkd8/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0LzJp/YTlpVTllclNkZkRr/QXhweGQ5M1gtMTIw/MC04MC5qcGc'
    },
    {  
      id:2,
      name:'Keyboard',
      description:'orem ipsum dolor sit amet, consectetur adipisicing elit. N',
      price:'200',
      category:'Eletronics',
      image:'https://imgs.search.brave.com/0y8P1ia8N65WYCSAVGgH8Fg4w0Oxrt0Dgd-R-FQdiVY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly90ZWNo/bnVvdm8uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAx/L3JvY2NhdC1zdW9y/YS1meC0xLmpwZw'
    },
    {  
      id:3,
      name:'Monitor',
      description:'|Lorem ipsum dolor sit amet, consectetur adipisicing elit. N',
      price:'200',
      category:'Eletronics',
      image:'https://imgs.search.brave.com/-q-wbWygJT_1QEGWVb94C7mIJ2qeomYiCRxDwtFqVFg/rs:fit:1200:1150:1/g:ce/aHR0cDovL2tzYXNz/ZXRzLnRpbWVpbmN1/ay5uZXQvd3AvdXBs/b2Fkcy9zaXRlcy81/NC8yMDE2LzEwL3Jv/Y2NhdC1za2VsdHIt/Mi0xLmpwZw'
    },
    {  
      id:4,
      name:'Nike Shoes',
      description:'lorem ipsum dolor sit amet, consectetur adipisicing elit. N',
      price:'200',
      category:'Shoes',
      image:'https://imgs.search.brave.com/lfgJIwPFgZqZyTt60Q-7kLXy99FBIZV4ovrQ6h_EOTs/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93d3cu/Ymlnc2FsZW1heC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDMvTmlrZS1T/Qi1EdW5rLUxvdy1Q/cmVtaXVtLVdoaXRl/LUxpZ2h0LUJsdWUt/Um95YWwtQmx1ZS04/NTQ4NjYtMDA5Lmpw/Zw'
    },
    {  
      id:5,
      name:'Mercedes Benz AMG',
      description:'orem ipsum dolor sit amet, consectetur adipisicing elit. N',
      price:'200',
      category:'Cars',
      image:'https://imgs.search.brave.com/i5hYzgNUbQ56Bu4LT6b-z_2IsIeUNaY8v46A60yVFFk/rs:fit:1200:1012:1/g:ce/aHR0cHM6Ly8xLmJw/LmJsb2dzcG90LmNv/bS8tU19KSHhJa19S/ZVEvWFFMUTkxLXRD/OUkvQUFBQUFBQUFF/MG8vSDFfNG9UVVJU/M2dKWkwzUk04TF9J/MEJUS093VU1VOS1R/Q0xjQkdBcy9zMTYw/MC9TY3JlZW4lMkJT/aG90JTJCMjAxOS0w/Ni0xNCUyQmF0JTJC/MTIuNDAuMjYlMkJB/TS5wbmc'
    }
    
    ]

  constructor() { }

  addProduct(product:Product):void{
    this.products.push(product)
      }

  getProducts():Product[]{
    return this.products
  }

  getOneProduct(id:number):Product{
    return this.products.find(x=>x.id===id) as Product
  }

  getProductCategories():string[]{
    let category:string[]=[];

    for(let c of this.products){
      let x = category.find(p=>p===c.category)
      if(!x){
        category.push(c.category)
      }
    }
    return category;
  }

  getProductinaCategory(categoryName:string):Product[]{
    let x = this.products.filter(x=>x.category===categoryName)
    return x
  }

  updateProduct(id:number, product:Product){
    let index= this.products.findIndex(x=>x.id===id)
    this.products[index]=product
  }
}
