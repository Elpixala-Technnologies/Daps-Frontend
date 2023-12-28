import { basedUrl } from "../Network/Network";

// === explore Brand 

export const addExploreBrandUrl = basedUrl + '/media/create/explore-brand'
export const getExploreBrandUrl = basedUrl + '/media/get/explore-brand'
export const getSingelExploreBrandUrl = (id) => basedUrl + `/media/get-singel/${id}/explore-brand`
export const updateExploreBrandUrl = (id) => basedUrl + `/media/update/${id}/explore-brand`
export const deletExploreBrandUrl = (id) => basedUrl + `/media/delete/${id}/explore-brand`



// ===== story

export const addStoryUrl = basedUrl + '/media/create/story'
export const getStoryUrl = basedUrl + '/media/get/story'
export const getSingelStoryUrl = (id) => basedUrl + `/media/get-singel/${id}/story`
export const updateStoryUrl = (id) => basedUrl + `/media/update/${id}/story`
export const deletStoryUrl = (id) => basedUrl + `/media/delete/${id}/story`


// ===== trendingProduct

export const addTrendingProductUrl = basedUrl + '/media/create/trending-product'
export const getTrendingProductUrl = basedUrl + '/media/get/trending-product'
export const getSingelTrendingProductUrl = (id) => basedUrl + `/media/get-singel/${id}/trending-product`
export const updateTrendingProductUrl = (id) => basedUrl + `/media/update/${id}/trending-product`
export const deletTrendingProductUrl = (id) => basedUrl + `/media/delete/${id}/trending-product`
 

// ====== Banners

export const addBannersUrl = basedUrl + '/banner/create'
export const getBannersUrl = basedUrl + '/banner/get-all'
export const getSingelBannersUrl = (id) => basedUrl + `/banner/${id}`
export const updateBannersUrl = (id) => basedUrl + `/banner/update/${id}`
export const deletBannersUrl = (id) => basedUrl + `/banner/delete/${id}`

// ======  

export const addBestsellersUrl = basedUrl + '/media/create/bestsellers'
export const getBestsellersUrl = basedUrl + '/media/get/bestsellers'
export const getSingelBestsellersUrl = (id) => basedUrl + `/media/get-singel/${id}/bestsellers`
export const updateBestsellersUrl = (id) => basedUrl + `/media/update/${id}/bestsellers`
export const deletBestsellersUrl = (id) => basedUrl + `/media/delete/${id}/bestsellers`
 
 