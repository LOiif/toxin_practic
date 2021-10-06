export function guestsCorrector(values) {
    let value = 0;

    values.forEach(el => value += el);

    if (check1(value))
        return value + ' гость';
    else if (check2(value))
        return value + ' гостя';
    return value + ' гостей';
}

export function comfortCorrector(values) {

    let value = '';

    if (values[0] === 0)
        value += '';
    else if (check1(values[0]))
        value += values[0] + ' спальня, ';
    else if (check2(values[0]))
        value += values[0] + ' спальни, ';
    else
        value += values[0] + ' спален, ';


    if (values[1] === 0)
        value += '';
    else if (check1(values[1]))
        value += values[1] + ' кровать, ';
    else if (check2(values[1]))
        value += values[1] + ' кровати, ';
    else
        value += values[1] + ' кроватей, ';


    if (values[2] === 0)
        value += '';
    else if (check1(values[2]))
        value += values[2] + ' ванная комнат';
    else if (check2(values[2]))
        value += values[2] + ' ванные комнаты';
    else
        value += values[2] + ' ванных комнат';

    return value;
}

function check1(value) {
    return value % 10 === 1 && value !== 11 && value !== 111;
}

function check2(value) {
    return (value % 10 === 2 && value !== 12 && value !== 112) || (value % 10 === 3 && value !== 13 && value !== 113) || (value % 10 === 4 && value !== 14 && value !== 114);
}