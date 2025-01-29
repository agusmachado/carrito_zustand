import { create } from "zustand";
import { Automovil, CartItem } from "../types";
import { persist } from "zustand/middleware";

const MAX_QUANTITY = 10

type CartState = {
    cart: CartItem[]
    addToCart: (automovil: Automovil) => void
    eliminarDelCarrito: (automovilId: number) => void
    vaciarCarrito: () => void
    actualizarCantidad: (automovilId: number, ajusteCantidad: number) => void
    costoTotal: () => number
}


export const useCartStore = create<CartState>()(
    persist( 
    (set, get) =>({
        cart: [],

        addToCart: (automovil) =>
            set((state) => {
                const automovilExiste = state.cart.find((item) => item.id === automovil.id)
                return {
                        cart: automovilExiste ? 
                            state.cart.map((item) => item.id === automovil.id ?
                                {
                                    ...item,
                                    quantity: Math.min(item.quantity + 1, MAX_QUANTITY)
                                } 
                                : item
                    )

                : 
                    [
                        ...state.cart,
                        {
                            ...automovil,
                            quantity: 1
                        }
                    ],
                }
            }),

            eliminarDelCarrito: (automovilId) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== automovilId)
                })),

            vaciarCarrito: () =>
                set({
                    cart: []
                }),
            
            actualizarCantidad: (automovilId, ajusteCantidad) =>
                set((state) => ({
                    cart: state.cart.map((item) => item.id === automovilId ? {
                        ...item,
                        quantity: Math.min(
                            Math.max(item.quantity + ajusteCantidad, 1),
                            MAX_QUANTITY
                        )
                    } : item),
                })),

              
            costoTotal: () =>
                get().cart.reduce(( total,{ price, quantity}) => total  + price * quantity, 0 ),
}),
    {
        name: "carrito-storage,"
    }
    )
)