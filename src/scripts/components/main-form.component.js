import $ from 'jquery';
import 'jquery-ui/datepicker'
import 'jquery-ui-css/datepicker.css'
import '../extensions/jquery.datepicker.extension.range.min'
import 'jquery-ui/../i18n/datepicker-ru';
import {Dropdown} from "../templates/dropdown";

export class MainFormComponent {
    constructor() {
        this.init();
    }

    init() {
        createDatepicker();

        const dropdownGuests = createDropdownGuests();
        const dropdownComfort = createDropdownComfort();

        const $checklistButton = document.querySelector('.form-comfort__title');
        $checklistButton.addEventListener('click', checklistButtonHandler);
    }
}

function createDropdownGuests() {
    const dropdownGuests = new Dropdown(
        {
            inputId: 'guests',
            className: 'main-form__dropdown-guests',
            inputName: 'guests',
            placeholderText: 'Сколько гостей',
            showClearButton: true,
            showCloseButton: true,
        },
        {labelName: 'Гости', adults: 'Взрослые', children: 'Дети', babies: 'Младенцы',},
    );
    const $submit = document.querySelector('.' + dropdownGuests.options.className);
    $submit.insertAdjacentHTML('afterbegin', dropdownGuests.createHTML());

    return dropdownGuests;
}

function createDropdownComfort() {
    const dropdownComfort = new Dropdown(
        {
            inputId: 'comfort',
            className: 'main-form__dropdown-comfort',
            inputName: 'comfort',
            placeholderText: 'Удобства номера',
            showClearButton: false,
            showCloseButton: false,
        },
        {
            labelName: 'Удобства номера',
            bedrooms: 'Спальни',
            beds: 'Кровати',
            baths: 'Ванные комнаты',
        });

    const $submit = document.querySelector('.' + dropdownComfort.options.className);
    $submit.insertAdjacentHTML('afterbegin', dropdownComfort.createHTML());

    return dropdownComfort;
}

function createDatepicker() {
    const $datepicker = $(".main-form__datepicker");
    $.datepicker.setDefaults($.datepicker.regional["ru"])
    $datepicker.datepicker({
        range: 'period',
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        currentText: "Очистить",
        closeText: "Применить",

        onSelect: function (dateText, inst, extensionRange) {
            $('.main-form__datepicker').val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
        },
    });
    const $uiDatepicker = $('.ui-datepicker');
    const $datepickerInput = $('.main-form__datepicker');
    $datepicker.on('click', () => {
        $uiDatepicker.css({
            left: $datepickerInput.offset().left - 25,
            top: $datepickerInput.offset().top + 46,
        });
    });
}

function checklistButtonHandler(evt) {

    if (!evt.target) {
        return;
    }
    const $checklistEl = document.querySelector('.form-comfort__wrapper');

    $checklistEl.classList.toggle('form-comfort__wrapper_open');
    evt.target.classList.toggle('form-comfort__title_open');
}