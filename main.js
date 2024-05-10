let primeraTarjeta = false;
let cronometro = false;
let tarjeta1 = null;
let tarjeta2 = null;
let primerValor = null;
let segundoValor = null;
let contadorMovinientos = 0;
let contadorAciertos = 0;
let contadorTiempo = 30;
let idInterval = null;

let contenedor = document.getElementById('container');
let contenedorResultado = document.getElementById("resultado");
let mensaje = document.getElementById("mensaje");
let movimientos = document.getElementById("movimientos");
let aciertos = document.getElementById("aciertos");
let tiempo = document.getElementById("tiempo");

let valores = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

let voltea = new Audio("sounds/voltea.wav");
let coicide = new Audio("sounds/coicide.wav");
let noCoicide = new Audio("sounds/no-coicide.wav");
let gana = new Audio("sounds/gana.wav");
let pierde = new Audio("sounds/pierde.wav");

valores = valores.sort(() => {
  return Math.random() - 0.5;
});
console.log(valores);

function voltear(id) {
  if (!cronometro) {
    correrTiempo();
    cronometro = true;
  }

  if (!primeraTarjeta) {
    voltea.play();
    tarjeta1 = document.getElementById(id);
    primerValor = valores[id];
    tarjeta1.innerHTML = `<img class="imagen" src="images/${valores[id]}.png">`;
    tarjeta1.disabled = true;
    primeraTarjeta = true;
  } else {
    tarjeta2 = document.getElementById(id);
    segundoValor = valores[id];
    tarjeta2.innerHTML = `<img class="imagen" src="images/${valores[id]}.png">`;
    tarjeta2.disabled = true;
    movimientos.innerHTML = `Movimientos: ${++contadorMovinientos}`;

    if (primerValor == segundoValor) {
      coicide.play();
      primeraTarjeta = false;
      aciertos.innerHTML = `Aciertos: ${++contadorAciertos}`;
      if (contadorAciertos == 8) {
        clearInterval(idInterval);
        gana.play();
        mensaje.innerHTML = "Ganastes";
        contenedor.style.margin = '30px auto';
        contenedorResultado.style.display = "block";
      }
    } else {
      noCoicide.play();
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.innerHTML = "";
        tarjeta2.disabled = false;
        primeraTarjeta = false;
      }, 300);
    }
  }
}

function correrTiempo() {
  idInterval = setInterval(() => {
    tiempo.innerHTML = `Tiempo: ${--contadorTiempo}`;
    if (contadorTiempo == 0) {
      pierde.play();
      mensaje.innerHTML = "perdistes";
      contenedor.style.margin = '30px auto';
      contenedorResultado.style.display = "block";
      clearInterval(idInterval);
      for (let index = 0; index < valores.length; index++) {
        let tarjetaBloqueada = document.getElementById(index);
        tarjetaBloqueada.innerHTML = `<img class="imagen" src="images/${valores[index]}.png">`;
        tarjetaBloqueada.disabled = true;
      }
    }
  }, 1000);
}
