import { axiosInstance } from "./axiosInstance";

export async function addCategory(category){
    const data = await axiosInstance.post('/category/addcategory',{categoryName:category})
    return data
}

export async function getCategory(){
    const data = await axiosInstance.get('/category/getcategory')
    return data
}

export async function getOneCategory(name){
    const data = await axiosInstance.get(`/category/getonecategory?name=${name}`)
    return data
}