import { axiosInstance } from "./axiosInstance";

export async function getWishlist(id) {
    const data = await axiosInstance.get(`/wishlist/getwishlist?userId=${id}`)
    return data
}

export async function addToWishlist(values) {
    const {userId,productId} = values
    const data = await axiosInstance.post('/wishlist/addtowishlist', { userId, productId })
    return data
}

export async function removeFromWishlist(values) {
    const {userId,productId} = values
    const data = await axiosInstance.put('/wishlist/removefromwishlist', { userId, productId })
    return data
}