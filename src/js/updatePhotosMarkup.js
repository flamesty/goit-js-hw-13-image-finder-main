import templateCardPhoto from '../templates/photoCard.hbs';
import refs from './refs'

function updatePhotosMarkup(photos) {
    
    const markup = templateCardPhoto(photos);
    refs.gallery.insertAdjacentHTML('beforeend', markup)
    
};

export default updatePhotosMarkup;
