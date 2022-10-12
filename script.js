function clock() {
    var myDate = new Date();
    var day = myDate.getDate();
    var month = myDate.getMonth();
    var monthArray = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    var year = myDate.getYear();
    if (year < 1000) {
    year += 1900;
    }
    var currentTime = new Date();        
    var horas = currentTime.getHours();
    var minutos = currentTime.getMinutes();
    var segundos = currentTime.getSeconds();

    if (horas == 24) {
    horas = 0;
    } else if (horas > 12) {
    horas = horas - 0;
    }

    if (horas < 10) {
    horas = "0" + horas;
    }
    if (minutos < 10) {
    minutos = "0" + minutos;
    }
    if (segundos < 10) {
    segundos = "0" + segundos;
    }

    var clock = document.getElementById("relogio");
    clock.textContent = "" + day + " " + monthArray[month] + " " + year + " | " + horas + ":" + minutos + ":" + segundos;
    clock.innerText = "" + day + " " + monthArray[month] + " " + year + " | " + horas + ":" + minutos + ":" + segundos;

    setTimeout("clock()", 1000)
}
clock();
  