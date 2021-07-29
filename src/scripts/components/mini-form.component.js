import $ from 'jquery';
import 'jquery-ui/datepicker'
import 'jquery-ui-css/datepicker.css'
import '../extensions/jquery.datepicker.extension.range.min'
import 'jquery-ui/../i18n/datepicker-ru';
import {Dropdown} from "../templates/dropdown";
import {guestsCorrector}from "../services/correctors";

export class MiniFormComponent {
    constructor() {
        this.init();
    }

    init() {
        createDatepicker();

        const dropdown = createDropdown();
        const $dropdownEl = document.querySelector('.' + dropdown.options.className);

        $dropdownEl.addEventListener('click', buttonClickHandler.bind(dropdown));
        document.body.addEventListener('click', inputClickHandler.bind(dropdown));
        document.body.addEventListener('focusin', inputClickHandler.bind(dropdown));
    }
}

function createDropdown() {
    const dropdown = new Dropdown(
        {
            inputId: 'guests',
            className: 'search-form__dropdown',
            inputName: 'guests',
            placeholderText: 'Сколько гостей',
            showClearButton: true,
            showCloseButton: true,
        },
        {labelName: 'Гости', adults: 'Взрослые', children: 'Дети', babies: 'Младенцы',},
    );
    const $submit = document.querySelector('.search-form__submit');
    $submit.insertAdjacentHTML('beforebegin', dropdown.createHTML());

    return dropdown;
}

function createDatepicker() {
    const $datepicker = $(".datepicker");
    $.datepicker.setDefaults($.datepicker.regional["ru"])
    $datepicker.datepicker({
        range: 'period',
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        currentText: "Очистить",
        closeText: "Применить",

        onSelect: function (dateText, inst, extensionRange) {
            $('.search-form__datepicker_start').val(extensionRange.startDateText);
            $('.search-form__datepicker_end').val(extensionRange.endDateText);
        },
    });
}

function buttonClickHandler(evt) {
    if (evt.target.tagName !== 'BUTTON') return;

    const $dropdownEl = document.querySelector('.' + this.options.className);
    const $inputEl = $dropdownEl.querySelector('.dropdown__input');
    const $buttonsMinus = $dropdownEl.querySelectorAll(`.dropdown__item-button[data-type="minus"]`);
    const $buttonMinusEl = $dropdownEl.querySelector(`.dropdown__item-button[data-type="minus"][data-name=${evt.target.dataset.name}]`);
    const $counters = $dropdownEl.querySelectorAll(`.dropdown__item-counter`);
    const $counterEl = $dropdownEl.querySelector(`.dropdown__item-counter[data-name=${evt.target.dataset.name}]`);
    let value = 0;


    if (evt.target.dataset.type === 'plus') {
        $counterEl.textContent = +$counterEl.textContent + 1 + '';
        $counters.forEach(c => value += +c.textContent);
        if ($buttonMinusEl.hasAttribute('disabled') && +$counterEl.textContent > 0) {
            $buttonMinusEl.disabled = false;
        }
        $inputEl.value = guestsCorrector(value);

    } else if (evt.target.dataset.type === 'minus') {
        $counterEl.textContent = +$counterEl.textContent - 1 + '';
        $counters.forEach(c => value += +c.textContent);
        if (+$counterEl.textContent < 1) $buttonMinusEl.disabled = true;
        $inputEl.value = guestsCorrector(value);

    } else if (evt.target.dataset.name === 'clear') {
        $inputEl.value = '';
        $counters.forEach(c => c.textContent = '0');
        $buttonsMinus.forEach(b => b.disabled = true);

        evt.target.disabled
    } else if (evt.target.dataset.name === 'close') {
        this.hide();
    }
}

function inputClickHandler(evt) {
    const $dropdownEl = document.querySelector('.' + this.options.className);
    if (evt.target.getAttribute('id') === this.options.inputId) {
        this.show();
    } else if (!$dropdownEl.contains(evt.target)) {
        this.hide();
    }
}



