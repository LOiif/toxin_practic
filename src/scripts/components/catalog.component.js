export class CatalogComponent {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', sliderButtonHandler)
    }
}

function sliderButtonHandler(evt) {
    if (!evt.target.classList.contains('slider__control')) {
        return;
    }

    evt.preventDefault();

    const $sliderEl = evt.target.parentElement;
    const indicators = $sliderEl.querySelectorAll('.slider__indicator');
    const sliders = $sliderEl.querySelectorAll('.slider__item');
    let indicatorActivePosition = 0;
    let sliderActivePosition = 0;


    indicatorActivePosition = searchActivePosition(indicators, indicatorActivePosition, 'slider__indicator_active');
    sliderActivePosition = searchActivePosition(sliders, sliderActivePosition, 'slider__item_active');

    if (evt.target.dataset.slide === 'prev') {
        if (sliderActivePosition === 0 || indicatorActivePosition === 0) return;

        prevButtonHandler(indicators, indicatorActivePosition, 'slider__indicator_active');
        prevButtonHandler(sliders, sliderActivePosition, 'slider__item_active');
    }

    if (evt.target.dataset.slide === 'next') {

        if ((sliderActivePosition + 1) === sliders.length || (indicatorActivePosition + 1) === indicators.length) return;

        nextButtonHandler(indicators, indicatorActivePosition, 'slider__indicator_active');
        nextButtonHandler(sliders, sliderActivePosition, 'slider__item_active');
    }
}


function searchActivePosition(els, pos, className) {
    els.forEach((el, i) => {
        if (el.classList.contains(className)) {
            pos = i;
        }
    });
    return pos;
}

function nextButtonHandler(els, position, className) {
    els[position].classList.remove(className);
    els[position + 1].classList.add(className);
    position++;
}

function prevButtonHandler(els, position, className) {
    els[position].classList.remove(className);
    els[position - 1].classList.add(className);
    position--;
}