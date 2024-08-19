import { axiosInstance } from "./axiosInstance";

export async function addToCart(values) {
    console.log(values)
    const data = await axiosInstance.post('/cart/addtocart', values)
    return data
}

export async function getCart(id) {
    const data = await axiosInstance.get(`/cart/getcart?userId=${id}`)
    return data
}

export async function updateQuantity(values) {
    const { id, productId, newQuantity } = values;
    const data = await axiosInstance.patch(`/cart/updatequantity`, { id, productId, newQuantity })
    return data
}

export async function removeFromCart(values) {
    const { id, productId } = values
    const data = await axiosInstance.put(`/cart/removefromcart`,{ id, productId,})
    return data
} 
