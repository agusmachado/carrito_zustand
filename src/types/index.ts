export type Automovil = {
    id: number
    name: string
    image: string
    brand: string
    price: number
    topSpeed: string
    year: number
}

export type CartItem = Automovil & { 
    quantity: number
}