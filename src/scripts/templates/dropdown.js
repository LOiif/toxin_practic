export class Dropdown {
    constructor(options, inits) {
        this.options = options;
        this.inits = inits;
    }

    hide() {
        const $contentEl = document.querySelector('.dropdown__content');
        const $inputEl = document.querySelector(`.dropdown__input[id=${this.options.inputId}]`);
        if (!$contentEl.classList.contains('visually-hidden')) {
            $contentEl.classList.add('visually-hidden');
            $inputEl.style.borderRadius = 4 + 'px';
            $inputEl.style.borderColor = 'rgba(31, 32, 65, 0.25)';
            $inputEl.disabled = false;
        }
    }

    show() {
        const $contentEl = document.querySelector('.dropdown__content');
        const $inputEl = document.querySelector(`.dropdown__input[id=${this.options.inputId}]`);
        if ($contentEl.classList.contains('visually-hidden')) {
            $contentEl.classList.remove('visually-hidden');
            $inputEl.style.borderBottomLeftRadius = 0;
            $inputEl.style.borderBottomRightRadius = 0;
            $inputEl.style.borderColor = 'rgba(31, 32, 65, 0.5)';
            $inputEl.disabled = true;
        }
    }

    createHTML() {
        return `<div class="${this.options.className} dropdown">
          <label class="dropdown__label" for=${this.options.inputId}>${this.inits.labelName}</label>
          <input class="dropdown__input text-input" type="text" id=${this.options.inputId} name=${this.options.inputName} placeholder="${this.options.placeholderText}">
         <div class="dropdown__content visually-hidden">
          <ul class="dropdown__list">
          ${createDropdownItem(this.inits)}
          </ul>
          ${createFooterButtons(this.options.showClearButton, this.options.showCloseButton)}
          </div>
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
