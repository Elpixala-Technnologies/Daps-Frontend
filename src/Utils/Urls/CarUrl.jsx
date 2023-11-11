import { basedUrl } from "../Network/Network";

export const getCarUrl = basedUrl + '/car/get-car'
export const createUrl = basedUrl + '/car/create'
export const deleteCarUrl = (id) => basedUrl + `/car/delete/${id}`
export const updateCarUrl = (id) => basedUrl + `/car/update/${id}`
export const getCarByIdUrl = (id) => basedUrl + `/car/${id}`