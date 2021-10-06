import $ from 'jquery';
import 'jquery-ui/datepicker'
import 'jquery-ui-css/datepicker.css'
import '../extensions/jquery.datepicker.extension.range.min'
import 'jquery-ui/../i18n/datepicker-ru';
import {Dropdown} from "../templates/dropdown";

export class MiniFormComponent {
    constructor() {
        this.init();
    }

    init() {
        createDatepicker();

        const dropdown = createDropdown();
    }
}

function createDropdown() {
    const dropdown = new Dropdown(
        {
            inputId: 'guests',
            className: 'mini-form__dropdown',
            inputName: 'guests',
            placeholderText: 'Сколько гостей',
            showClearButton: true,
            showCloseButton: true,
        },
        {labelName: 'Гости', adults: 'Взрослые', children: 'Дети', babies: 'Младенцы',},
    );
    const $submit = document.querySelector('.dropdown');

    if ($submit.classList.contains(dropdown.options.className)) {
        $submit.insertAdjacentHTML('afterbegin', dropdown.createHTML());
    }

    return dropdown;
}

function createDatepicker() {
    const $datepicker = $(".mini-form__datepicker");
    $.datepicker.setDefaults($.datepicker.regional["ru"])
    $datepicker.datepicker({
        range: 'period',
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        currentText: "Очистить",
        closeText: "Применить",

        onSelect: function (dateText, inst, extensionRange) {
            $('.mini-form__datepicker_start').val(extensionRange.startDateText);
            $('.mini-form__datepicker_end').val(extensionRange.endDateText);
        },
    });
    const $uiDatepicker = $('.ui-datepicker');
    const $start = $('.mini-form__start-stay');
    $datepicker.on('click', () => {
        $uiDatepicker.css({
            left: $start.offset().left,
            top: $start.offset().top + 71,
        });
    });
}