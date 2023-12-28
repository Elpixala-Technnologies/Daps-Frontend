import { basedUrl } from '../Network/Network';

export const getHomeSliderUrl = basedUrl + '/media/get/slider';

export const addHomeSliderUrl = basedUrl + '/media/create/slider';

export const deleteHomeSliderUrl = (id) => basedUrl + `/media/delete/${id}/slider`;

export const updateHomeSliderUrl = (id) => basedUrl + `/media/update/${id}/slider`;
 