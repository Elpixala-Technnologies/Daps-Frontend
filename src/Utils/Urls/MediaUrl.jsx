import { basedUrl } from "../Network/Network";

// === explore Brand 

export const addExploreBrandUrl = basedUrl + '/media/create/explore-brand'
export const getExploreBrandUrl = basedUrl + '/media/get/explore-brand'
export const getSingelExploreBrandUrl = (id) => basedUrl + `/media/get-singel/${id}/explore-brand`
export const updateExploreBrandUrl = (id) => basedUrl + `/media/update/${id}/explore-brand`
export const deletExploreBrandUrl = (id) => basedUrl + `/media/delete/${id}/explore-brand`



// =====

//     https://daps-server.vercel.app/media/create/story
// https://daps-server.vercel.app/media/get/story
// https://daps-server.vercel.app/media/get-singel/:id/story
// https://daps-server.vercel.app/media/update/:id/story
// https://daps-server.vercel.app/media/delete/:id/story

// ===
//     https://daps-server.vercel.app/media/create/trending-product
// https://daps-server.vercel.app/media/get/trending-product
// https://daps-server.vercel.app/media/get-singel/:id/trending-product
// https://daps-server.vercel.app/media/update/:id/trending-product
// https://daps-server.vercel.app/media/delete/:id/trending-product

