import { basedUrl } from "../Network/Network";

 

export const getBrandsUrl = basedUrl + '/brand/get-all'

export const addBrandsUrl = basedUrl + '/brand/create'

export const deleteBrandsUrl = (id) => basedUrl + `/brand/delete/${id}`

export const updateBrandsUrl = (id) => basedUrl + `/brand/update/${id}`

export const getBrandsByIdUrl = (id) => basedUrl + `/brand/get-singel/${id}`
 


export const getCarUrl = basedUrl + '/car/get-all'

export const addCarUrl = basedUrl + '/car/create'

export const deleteCarUrl = (id) => basedUrl + `/car/delete/${id}`

export const updateCarUrl = (id) => basedUrl + `/car/update/${id}`

export const getCarByIdUrl = (id) => basedUrl + `/car/get-singel/${id}`


export const getSocketUrl = basedUrl + '/socket/get-all'

export const addSocketUrl = basedUrl + '/socket/create'

export const deleteSocketUrl = (id) => basedUrl + `/socket/delete/${id}`

export const updateSocketUrl = (id) => basedUrl + `/socket/update/${id}`

export const getSocketByIdUrl = (id) => basedUrl + `/socket/get-singel/${id}`


export const getProcessorsUrl = basedUrl + '/processor/get-all'

export const addProcessorsUrl = basedUrl + '/processor/create'

export const deleteProcessorsUrl = (id) => basedUrl + `/processor/delete/${id}`

export const updateProcessorsUrl = (id) => basedUrl + `/processor/update/${id}`

export const getProcessorsByIdUrl = (id) => basedUrl + `/processor/get-singel/${id}`









