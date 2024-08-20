import { axiosInstance } from "./axiosInstance";


export async function addProduct(productData){
    const data = await axiosInstance.post('/products/addproduct',productData)
    return data
}

export async function getProducts(){
    const data = await axiosInstance.get('/products/getproducts')
    return data
}

export async function searchProucts(value){
    const data = await axiosInstance.get(`/products/searchproducts?value=${value}`)
    return data
}

export async function editProduct(details){
    const data = await axiosInstance.post('/products/editdetails',details)
    return data
}