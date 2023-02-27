export interface User{
    name:string
    email:string
    password:string 
    confirmPassword:string
    isAdmin?:boolean 
    JWT:string
}

export interface login{
    email:string
    password:string
}