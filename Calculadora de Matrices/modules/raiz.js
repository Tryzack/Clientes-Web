//método de newton-raphson

function calcularRaiz() {
  //declaracion de variables
  const valor_raiz = parseFloat(document.getElementById("raiz").value);
  const n = parseFloat(document.getElementById("nr").value);
  const tolerancia = parseFloat(document.getElementById("err").value);
  const iteraciones = parseFloat(document.getElementById("it").value);
  //calcular resultado utilizando la funcion
  const resultado = raiz(valor_raiz, tolerancia, iteraciones, n);
  //escribir el resultado en el html en caso de que no haya dado un error
  if (resultado !== null) {
    document.getElementById("resultadoRaiz").innerHTML = resultado.toFixed(5);
  } else {
    document.getElementById("resultadoRaiz").innerHTML = "Error";
  }
}

function raiz(numero, tolerancia, maxIteraciones, n) {
  const resultadoRaizDiv = document.getElementById("resultadoRaizDiv");
  resultadoRaizDiv.innerHTML = "";
  //mandar error si se usa un numero negativo
  if (numero < 0) {
    err(1);
    return null;
  }
  let x = 1, error = 1, it = 0;

  // iterar hasta alcanzar la tolerancia o el número máximo de iteraciones
  while (error > tolerancia && it < maxIteraciones) {
    // calcular la siguiente aproximación de la raíz
    let fx = potencia(x, n) - numero;
    let dfx = n * potencia(x, n-1);
    let xPrevio = x;
    x = x - fx/dfx;

    // calcular el error relativo
    error = Math.abs((x - xPrevio) / x);

    it++;
  }

  // si se alcanzó el número máximo de iteraciones sin encontrar la raíz, mostrar error
  if (it === maxIteraciones && error > tolerancia) {
    err(2);
    return null;
  }

  return x;
}

//funcion para obtener el exponente de un elemento
function potencia(base, exponente) {
  let resultado = 1;
  for (let i = 0; i < exponente; i++) {
    resultado *= base;
  }
  return resultado;
}

//funcion para tratamiento de errores
function err(x) {
  const resultadoRaizDiv = document.getElementById("resultadoRaizDiv");
  const titulo = document.createElement("h2");

  //error cuando la raiz tiene un valor negativo
  if (x === 1) {
    titulo.textContent = "Error, no se pueden utilizar numeros negativos";
    
    //error cuando la raiz alcanzo el limite de iteraciones
  } else if (x === 2) {
    titulo.textContent =
      "Error, no se ha podido obtener la raiz en el numero de iteraciones dadas";
  }
}

//exportar funcion
export {calcularRaiz}