import { basedUrl } from "../Network/Network";

export const getBlogsUrl = basedUrl + '/blogs/'

export const addBlogsUrl = basedUrl + '/blogs/create-blog'

export const deleteBlogsUrl = (id) => basedUrl + `/blogs/delete/${id}`

export const updateBlogsUrl = (id) => basedUrl + `/blogs/update/${id}`
