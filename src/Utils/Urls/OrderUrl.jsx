import { basedUrl } from "../Network/Network";

// === explore Brand 

export const addOrderUrl = basedUrl + '/order/create-order'
export const getOrderUrl = basedUrl + '/order/get-orders'
export const getSingelOrderUrl = (id) => basedUrl + `/order/get-order/${id}`
export const getSingelOrderByEmailUrl = (email) => basedUrl + `/order/get-orders/${email}`
export const updateOrderUrl = (id) => basedUrl + `/order/update-order/${id}`
export const deletOrderUrl = (id) => basedUrl + `/order/delete-order/${id}`