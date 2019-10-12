const numeral = require('numeral');

module.exports = function(amount) {
    var total = '';
    var salites = Math.floor(amount / 1000000);
    var velites = Math.floor((amount - (salites * 1000000)) / 10000);
    var calites = Math.floor((amount - (salites * 1000000) - (velites * 10000)) / 100);
    var emites = amount - (salites * 1000000) - (velites * 10000) - (calites * 100);

    if (salites > 0) {
        total = '<span title="Salites" style="color:#4ec381">' + numeral(salites).format('0,0') + 's</span> <span title="Velites" style="color:#ffcccb">' + velites + 'v</span> <span title="Calites" style="color:#e68916">' + calites + 'c</span> <span title="Emites" style="color:#9799ff">' + emites + 'e</span>';
    }
    if (salites == 0 && velites > 0) {
        total = '<span title="Velites" style="color:#ffcccb">' + velites + 'v</span> <span title="Calites" style="color:#e68916">' + calites + 'c</span> <span title="Emites" style="color:#9799ff">' + emites + 'e</span>';
    }
    if (salites == 0 && velites == 0 && calites > 0) {
        total = '<span title="Calites" style="color:#e68916">' + calites + 'c</span> <span title="Emites" style="color:#9799ff">' + emites + 'e</span>';
    }
    if (salites == 0 && velites == 0 && calites == 0) {
        total = '<span title="Emites" style="color:#9799ff">' + emites + 'e</span>';
    }
    return total;
}