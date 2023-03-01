import { Observable } from "rxjs"

export interface AddProduct{
    name:string
    description:string
    image:string
    price:string
}


export interface Product{
    id:string
    name:string
    description:string
    image:string
    price:string
    category:string

}

export interface Order{
    id:string
    userId:string
    shippingAddress:string
    paymentMethod :string
    totalPrice:string
    isDelivered:boolean
}

export interface User{
    id:string
    name:string
    email:string
    isAdmin :string
    totalPrice:string

}

export interface CanDeactivateComponent{
    canDeactive:()=> Promise<boolean> | Observable<boolean> | boolean 
}