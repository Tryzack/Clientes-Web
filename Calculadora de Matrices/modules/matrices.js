
//Funcion que permite crear las matrices del html A y B
function crearMatriz() {
  const filas = document.getElementById("filas").value; //obtener el numero de filas
  const columnas = document.getElementById("columnas").value; //obtener el numero de columnas

  const inputMatrices = document.getElementById("matrices");
  inputMatrices.innerHTML = "";

  const matrizA = crearTabla(filas, columnas, "matrizA"); //crear una tabla para la matriz A
  const matrizB = crearTabla(filas, columnas, "matrizB"); //crear una tabla para la matriz B

  //Titulo de las tablas
  const A = document.createElement("p");
  A.textContent = "Matriz A";
  const B = document.createElement("p");
  B.textContent = "Matriz B";

  //Introducir tablas al html
  inputMatrices.appendChild(A);
  inputMatrices.appendChild(matrizA);
  inputMatrices.appendChild(B);
  inputMatrices.appendChild(matrizB);
}

//Funcion para crear las tablas
function crearTabla(filas, columnas, nombrematriz) { 
  const tabla = document.createElement("table"); //se crea un elemento de tipo tabla
  tabla.id = nombrematriz; //el id de la tabla sera su nombre
  for (let i = 0; i < filas; i++) {
    const tr = document.createElement("tr"); //se crea un table row o una fila en la tabla por tantas filas haya (i)
    for (let j = 0; j < columnas; j++) {
      const td = document.createElement("td"); //se crea una informacion de datos o (table data)
      const input = document.createElement("input"); //se crea un input que permita introducir valores
      input.type = "number"; //los valores del input seran numeros
      input.value = 0 // se inicializa el input con un 0
      input.id = `${nombrematriz}_${i}_${j}`; //el id sera el nombre de la matriz seguido de su fila y su columna
      td.appendChild(input); //se introduce el input al table data
      tr.appendChild(td); //se introduce el table data a la fila
    }
    tabla.appendChild(tr); //al final de tener todas las columnas metidas en la fila se introduce este valor a la tabla
  } //se repite este proceso hasta introducir todas las columnas
  return tabla;  //se devuelve el valor de la tabla
}

//funcion para obtener una tabla del html y convertirlo en matriz
function getMatriz(filas, columnas, nombrematriz) {
  const matriz = [];
  for (let i = 0; i < filas; i++) {
    const filas = [];
    for (let j = 0; j < columnas; j++) {
      const input = document.getElementById(`${nombrematriz}_${i}_${j}`);
      filas.push(Number(input.value));
    }
    matriz.push(filas); //se introduce en la matriz los valores añadidos a las filas
  }
  return matriz; //se devuelve la matriz
}

//funcion para llenar la tabla del html con los valores de una matriz dada
function llenarMatriz(tabla, matriz) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const input = document.getElementById(`${tabla.id}_${i}_${j}`);
      input.value = matriz[i][j];
    }
  }
}

//funcion para crear una matriz temporal del tamaño adecuado para hacer operaciones
function crearMatrizTemporal(filas, columnas) {
  const matriz = [];
  for (let i = 0; i < filas; i++) {
    const filas = [];
    for (let j = 0; j < columnas; j++) {
      filas.push(0); //inicializa la matriz con un tamaño dado asignandole los valores de 0 a cada fila y columna
    }
    matriz.push(filas);
  }
  return matriz;
}

//funcion que permita realizar operaciones entre tablas
function operacionMatricial(operacion) {
  //declaracion de varables
  const filas = document.getElementById("filas").value;
  const columnas = document.getElementById("columnas").value;
  const resultadoMatriz = document.getElementById("resultadoMatriz");
  resultadoMatriz.innerHTML = "";

  //asignar valores de las matrices a una variable
  const matrizA = getMatriz(filas, columnas, "matrizA");
  const matrizB = getMatriz(filas, columnas, "matrizB");

  let resultado; //inicializacion del resultado
  let nombreTabla; //obtener el nombre de la tabla
  let titulo; //obtener un titulo para el resultado

  switch (operacion) { //crear un resultado
    case "sumar": //operacion suma
      resultado = sumarMatrices(matrizA, matrizB);
      nombreTabla = "resultadoSuma";
      titulo = "Suma:";
      break;
    case "restar": //operacion resta
      resultado = restarMatrices(matrizA, matrizB);
      nombreTabla = "resultadoResta";
      titulo = "Resta:";
      break;
    case "multiplicar": //operacion multiplicacion
      resultado = multiplicarMatrices(matrizA, matrizB);
      nombreTabla = "resultadoMultiplicacion";
      titulo = "Multiplicacion:";
      break;
    case "transpuesta": //operacion transpuesta de A
      resultado = transponerMatriz(matrizA);
      nombreTabla = "resultadoTranspuesta";
      titulo = "Transpuesta:";
      break;
    case "inversa": //operacion inversa de A
      resultado = invertirMatriz(matrizA);
      nombreTabla = "resultadoInversa";
      titulo = "Inversa:";
      break;
    default:
      return;
  }

  const tabla = crearTabla(filas, columnas, nombreTabla); //se crea una tabla con el nombre dado en el switch
  const tituloElemento = document.createElement("h2");
  tituloElemento.textContent = titulo; //se crea un titulo con valor dado en el switch

  resultadoMatriz.appendChild(tituloElemento); //se introduce el titulo en el resultado

  if (resultado === null && operacion === "inversa") { //responder cuando la matriz no tiene inversa
    tituloElemento.textContent = "Esta matriz no tiene inversa";
    resultadoMatriz.appendChild(tituloElemento);
  } else {
    resultadoMatriz.appendChild(tabla); //introducir tabla al div
    llenarMatriz(tabla, resultado); //llenar la tabla con el resultado obtenido
  }
}

//funciones para operaciones
function sumarMatrices(a, b) { //funcion suma
  const filas = a.length;
  const columnas = a[0].length;
  const resultado = crearMatrizTemporal(filas, columnas);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      resultado[i][j] = a[i][j] + b[i][j];
    }
  }
  return resultado;
}

function restarMatrices(a, b) { //funcion resta
  const filas = a.length;
  const columnas = a[0].length;
  const resultado = crearMatrizTemporal(filas, columnas);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      resultado[i][j] = a[i][j] - b[i][j];
    }
  }
  return resultado;
}

function multiplicarMatrices(a, b) { //funcion multiplicacion
  const filas = a.length;
  const columnas = a[0].length;
  const resultado = crearMatrizTemporal(filas, columnas);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      for (let k = 0; k < columnas; k++) {
        resultado[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return resultado;
}

//metodo gauss-jordan
function invertirMatriz(matriz) {
  const n = matriz.length; // Obtenemos la dimensión de la matriz
  const matrizAumentada = new Array(n); // Creamos una nueva matriz aumentada con n filas
  for (let i = 0; i < n; i++) {
    // Iteramos por cada fila de la matriz original
    matrizAumentada[i] = matriz[i].concat(new Array(n).fill(0)); // Concatenamos una fila de ceros a la derecha de cada fila de la matriz original
    matrizAumentada[i][n + i] = 1; // Agregamos un 1 en la posición diagonal correspondiente a la fila i
  }

  for (let i = 0; i < n; i++) {
    // Iteramos por cada fila de la matriz aumentada
    const pivot = matrizAumentada[i][i]; // Obtenemos el pivote (el elemento diagonal correspondiente a la fila i)
    if (pivot === 0) {
      return null; // Si el pivote es cero, la matriz no es invertible y retornamos null
    }

    for (let j = 0; j < 2 * n; j++) {
      // Iteramos por cada columna de la matriz aumentada
      matrizAumentada[i][j] /= pivot; // Dividimos todos los elementos de la fila i por el pivote
    }

    for (let j = 0; j < n; j++) {
      // Iteramos por cada fila de la matriz aumentada, excepto la fila i
      if (j === i) continue; // Saltamos la iteración si estamos en la fila i
      const scale = matrizAumentada[j][i]; // Obtenemos el factor de escala
      for (let k = 0; k < 2 * n; k++) {
        // Iteramos por cada columna de la matriz aumentada
        matrizAumentada[j][k] -= scale * matrizAumentada[i][k]; // Restamos la fila i multiplicada por el factor de escala a la fila j
      }
    }
  }

  // Extraemos la matriz inversa de la matriz aumentada
  const matrizInversa = new Array(n);
  for (let i = 0; i < n; i++) {
    matrizInversa[i] = matrizAumentada[i].slice(n);
  }
  return matrizInversa; // Retornamos la matriz inversa
}

function transponerMatriz(matriz) { //funcion transpuesta
  const filas = matriz.length;
  const columnas = matriz[0].length;
  const matrizTranspuesta = crearMatrizTemporal(columnas, filas);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      matrizTranspuesta[j][i] = matriz[i][j];
    }
  }
  return matrizTranspuesta;
}

export {
  crearMatriz,
  crearTabla,
  operacionMatricial,
};
