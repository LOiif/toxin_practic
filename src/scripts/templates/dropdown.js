import {guestsCorrector} from "../services/correctors";
import {comfortCorrector} from "../services/correctors";

export class Dropdown {
    constructor(options, inits) {
        this.options = options;
        this.inits = inits;
        this.className = options.className;
        this.$el = document.querySelector('.' + this.options.className);
        document.addEventListener('DOMContentLoaded', init.bind(this));
    }

    hide() {
        const $contentEl = this.$el.querySelector('.dropdown__content');
        const $inputEl = this.$el.querySelector(`.dropdown__input[id=${this.options.inputId}]`);
        const $labelEl = this.$el.querySelector('.dropdown__label');
        if (!$contentEl.classList.contains('visually-hidden')) {
            $contentEl.classList.add('visually-hidden');
            $inputEl.style.borderRadius = 4 + 'px';
            $inputEl.style.borderColor = 'rgba(31, 32, 65, 0.25)';
            $inputEl.disabled = false;

            if ($labelEl.classList.contains('dropdown__label_active')) {
                $labelEl.classList.remove('dropdown__label_active');
            }
        }
    }

    show() {
        const $contentEl = this.$el.querySelector('.dropdown__content');
        const $inputEl = this.$el.querySelector(`.dropdown__input[id=${this.options.inputId}]`);
        const $labelEl = this.$el.querySelector('.dropdown__label');
        if ($contentEl.classList.contains('visually-hidden')) {
            $contentEl.classList.remove('visually-hidden');
            $inputEl.style.borderBottomLeftRadius = 0;
            $inputEl.style.borderBottomRightRadius = 0;
            $inputEl.style.borderColor = 'rgba(31, 32, 65, 0.5)';
            $inputEl.disabled = true;

            if (!$labelEl.classList.contains('dropdown__label_active')) {
                $labelEl.classList.add('dropdown__label_active');
            }
        }
    }

    createHTML() {
        return `<label class="dropdown__label" for=${this.options.inputId}>${this.inits.labelName}</label>
          <input class="dropdown__input text-input" autocomplete="off" type="text" id=${this.options.inputId} name=${this.options.inputName} placeholder="${this.options.placeholderText}">
         <div class="dropdown__content visually-hidden">
          <ul class="dropdown__list">
          ${createDropdownItem(this.inits)}
          </ul>
          ${createFooterButtons(this.options.showClearButton, this.options.showCloseButton)}
          </div>`;
    }
}

function createDropdownItem(inits) {
    let res = ''
    for (let init in inits) {
        res += init !== 'labelName' ? `<li class="dropdown__item">
              <p class="dropdown__item-name">${inits[init]}</p>
              <div class="dropdown__buttons-container">
              <button class="dropdown__item-button dropdown__item-button_minus" type="button" data-name=${init} data-type="minus" disabled>-<span class="visually-hidden">Уменьшить</span></button>
              <span class="dropdown__item-counter" data-name=${init}>0</span>
              <button class="dropdown__item-button dropdown__item-button_plus" type="button" data-name=${init} data-type="plus">+<span class="visually-hidden">Увеличить</span></button>
              </div>
            </li>` : '';
    }
    return res;
}

function createFooterButtons(showClearButton = false, showCloseButton = false) {

    let resHTML = ''

    if (!showCloseButton && !showClearButton) return resHTML;
    if (showClearButton) {
        resHTML += `<div class="dropdown__footer-buttons">
<button class="dropdown__footer-button dropdown__footer-button_clear" data-name="clear" type="button">Очистить</button>`;
    } else {
        resHTML += `<div class="dropdown__footer-buttons">`;
    }
    if (showCloseButton) {
        resHTML += `<button class="dropdown__footer-button dropdown__footer-button_close" data-name="close" type="button">Применить</button></div>`
    } else {
        resHTML += `</div>`
    }
    return resHTML;
}

function inputClickHandler(evt) {
    if (!this.$el.contains(evt.target)) {
        this.hide()
    } else {
        this.show();
    }
}

function buttonClickHandler(evt) {
    if (evt.target.tagName !== 'BUTTON') return;

    const $inputEl = this.$el.querySelector('.dropdown__input');
    const $buttonsMinus = this.$el.querySelectorAll(`.dropdown__item-button[data-type="minus"]`);
    const $buttonMinusEl = this.$el.querySelector(`.dropdown__item-button[data-type="minus"][data-name=${evt.target.dataset.name}]`);
    const $counters = this.$el.querySelectorAll(`.dropdown__item-counter`);
    const $counterEl = this.$el.querySelector(`.dropdown__item-counter[data-name=${evt.target.dataset.name}]`);
    let values = [0, 0, 0];

    if (evt.target.dataset.type === 'plus') {
        $counterEl.textContent = +$counterEl.textContent + 1 + '';
        $counters.forEach((c, i) => values[i] += +c.textContent);
        if ($buttonMinusEl.hasAttribute('disabled') && +$counterEl.textContent > 0) {
            $buttonMinusEl.disabled = false;
        }
        if (this.options.inputId === 'guests') {
            $inputEl.value = guestsCorrector(values);
        } else if (this.options.inputId === 'comfort') {
            $inputEl.value = comfortCorrector(values)
        }

    } else if (evt.target.dataset.type === 'minus') {
        $counterEl.textContent = +$counterEl.textContent - 1 + '';
        $counters.forEach((c, i) => values[i] += +c.textContent);
        if (+$counterEl.textContent < 1) $buttonMinusEl.disabled = true;

        if (this.options.inputId === 'guests') {
            $inputEl.value = guestsCorrector(values);
        } else if (this.options.inputId === 'comfort') {
            $inputEl.value = comfortCorrector(values)
        }

    } else if (evt.target.dataset.name === 'clear') {
        $inputEl.value = '';
        $counters.forEach(c => c.textContent = '0');
        $buttonsMinus.forEach(b => b.disabled = true);

        evt.target.disabled
    } else if (evt.target.dataset.name === 'close') {
        this.hide();
    }
}

function init() {
    this.$el.addEventListener('click', buttonClickHandler.bind(this));
    document.body.addEventListener('click', inputClickHandler.bind(this));
    document.body.addEventListener('focusin', inputClickHandler.bind(this));
}