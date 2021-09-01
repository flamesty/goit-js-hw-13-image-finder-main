import '../src/scss/style.scss';
import '../src/scss/lightbox.scss';

import apiService from '../src/js/apiService';
import updatePhotosMarkup from '../src/js/updatePhotosMarkup';
import refs from '../src/js/refs';
import '../src/js/spin';
import * as basicLightbox from 'basiclightbox'
import notice from '../src/js/pnotify'

refs.searchForm.addEventListener('submit', onInputSearch);
refs.loadMoreBtn.addEventListener('click', fetchPhotos);

function onInputSearch(event) {
    event.preventDefault();
    apiService.query = event.target.elements.query.value;
    refs.gallery.innerHTML = '';
    apiService.resetPage();
    fetchPhotos();
}

function fetchPhotos() {
    spinnerOn();
    disableButton();

    apiService
        .fetchPhoto()
        .then(({ hits, total }) => {
            updatePhotosMarkup(hits);
            switchBtn(total);

            window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth',
            });

            refs.gallery.addEventListener('click', onOpenModal)
        })
        .catch(err => console.log(err))
        .finally(() => {
            spinnerOff();
            enableButton();
        });
}

function onOpenModal(event) {
    if (event.target.nodeName !== 'IMG') return;
    const src = event.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src=${src} width="800" height="600">`)
    instance.show()
}

function switchBtn(total) {
    const { perPage, page } = apiService;
    if (((page - 1) * perPage) >= total) {
        hideButton();
        notify(total);
    } else { showButton() }
}

function notify(total) {
    if (total === 0) {
        notice({
            text: 'Ничего не найдено',
        })
    }
    if (total > 0) {
        notice({
            text: 'Больше нет((',
        })
    }
}

function showButton() {
    refs.loadMoreBtn.classList.remove("is-hidden");
};

function hideButton() {
    refs.loadMoreBtn.classList.add("is-hidden");
};

function enableButton() {
    refs.loadMoreBtn.removeAttribute("disabled");
};

function disableButton() {
    refs.loadMoreBtn.setAttribute("disabled", 'true');

};

function spinnerOn() {
    refs.spinner.classList.remove('is-hidden')

}

function spinnerOff() {
    refs.spinner.classList.add('is-hidden')
}

let searchInput = document.querySelector('.input-search'); // поиск инпута в документе

const regex = /[а-яА-ЯёЁ]/i; // регулярное виражение на запрет ввода русских букв

searchInput.oninput = function () {
    this.value = this.value.replace(regex, "");
};