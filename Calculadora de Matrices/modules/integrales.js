//metodo de trapecios

//funcion principal
function calcularIntegral() {
  //obtener el valor del html asi como reemplazar los datos para hacerlo legible
  const funcionString = document.getElementById("funcion").value
  .replace(/\s+/g, "") //quitar espacios
  .replace(/(\d+)([a-zA-Z])/g, "$1*$2") //funcion que permita si hay 5x convertirlo en 5*x
  .replace(/([a-zA-Z]+)(\d)/g, "$1*$2") //funcion que permita si hay x5 convertirlo en x*5
  .replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2") //funcion que permita multiplicar x*x cuando se de xx
  .replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2") //funcion que repite el proceso ya que toma solo dos variabls (xxx sin esta funcion seria x*xx)
  .replace(/([a-zA-Z])/g, "x") //reemplazar cualquier valor no numerico de la A a la Z a "x"
  .replace(/(\w+)\^(\d+)/g, (match, variable, exponente) => { //funcion que permita obtener cualquier ocurrencia de una o mas letras o numeros seguidos de "^" y elevarlos al valor del siguiente digito numerico
    let resultado = variable;
    for (let i = 1; i < exponente; i++) {
      resultado += "*" + variable;
    }
    return resultado;
  })
  .replace(/([a-zA-Z])/g, "x"); //reemplazar cualquier valor no numerico de la A a la Z a "x"

  //obtener las variables del html
  const ix = parseFloat(document.getElementById("ix").value); //limite inferior
  const sx = parseFloat(document.getElementById("sx").value); //limite superior
  const n = parseFloat(document.getElementById("n").value); //numero de trapecios a utilizar
  const divIntegral = document.getElementById("resultadoIntegral");
  const funcion = new Function("x", "return " + funcionString); //funcion para obtener la una funcion f(x) dada por el usuario
  divIntegral.innerHTML = ""; //refrezcar el hrml del div integral para ser reutilizado
  document.getElementById("resultadoIntegralDiv").innerHTML = ""; //refrezcar el hrml del div del resultado de la integral para ser reutilizado

  try {
    const resultado = integral(funcion, ix, sx, n); //intenta realizar la operacion de la integral
    divIntegral.innerHTML = resultado.toFixed(6); //convierte el resultado para 6 decimales
  } catch (error) {
    err(error); //si no se obtiene la integral da error
  }
  //imprimir el resultado
  const funcionObtenida = document.createElement("h2"); 
  funcionObtenida.textContent = `Como el sistema ve la funcion: ${funcionString}`;
  divIntegral.appendChild(funcionObtenida);
}

//funcion que realiza los calculos
function integral(funcion, limitebajo, limitealto, n) {
  
  const h = (limitealto - limitebajo) / n; //longitud del intervalo
  let sum = 0;

  for (let i = 1; i < n; i++) { //se itera tantas veces como trapezoides hayan
    const x = limitebajo + i * h; //calculo del punto medio del trapecio actual
    sum += funcion(x); //sumatoria de todos los puntos medios de cada trapecio
  }
  return h * (0.5 * (funcion(limitebajo) + funcion(limitealto)) + sum); //calculo y retorno del area total bajo la curva
}

//funcion para manejo de errores
function err(x) {
  const resultadoIntegralDiv = document.getElementById("resultadoIntegralDiv");
  resultadoIntegralDiv.innerHTML = "";
  const titulo = document.createElement("h2");
  titulo.textContent = `Error al realizar la operacion >>> ${x}`;
  resultadoIntegralDiv.appendChild(titulo);
}

export { calcularIntegral };