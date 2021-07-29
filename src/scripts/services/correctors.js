export function guestsCorrector(value) {
    if (value % 10 === 1 && value !== 11 && value !== 111)
        return value + ' гость';
    else if ((value % 10 === 2 && value !== 12 && value !== 112) || (value % 10 === 3 && value !== 13 && value !== 113) || (value % 10 === 4 && value !== 14 && value !== 114))
        return value + ' гостя';
    return value + ' гостей';
}