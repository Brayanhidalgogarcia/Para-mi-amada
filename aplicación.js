let titulo = document.title;

window.addEventListener('blur', () => {   
    titulo = document.title;
    document.title = "No te vayas, regresa :(";
});

window.addEventListener('focus', () => {   
    document.title = titulo;
});

let h1 = document.getElementById("Titulo");
let boton1 = document.getElementById("B1");

boton1.addEventListener('click', function() {  
    const contenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    contenedorBotones.style.display = "none";
    DibujarFlor(500, 100, 6, 30, 100, 200);
    h1.remove();
});

document.getElementById("B12").addEventListener('click', function() {
    const contenedorBotones = document.querySelector(".Con");
    contenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    h1.remove();
});

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, radioX, escala, rotacion, color, pasos) {
    const numero = escala;
    const incrementoAngulo = (Math.PI / pasos) * 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotacion);
    ctx.scale(1, numero);
    ctx.beginPath();

    for (let i = 0; i <= pasos; i++) {
        const anguloActual = i * incrementoAngulo;
        const radioActual = Math.sin(anguloActual) * radioX;
        const puntoX = Math.cos(anguloActual) * radioActual;
        const puntoY = Math.sin(anguloActual) * radioActual;

        if (i === 0) {
            ctx.moveTo(puntoX, puntoY);
        } else {
            ctx.lineTo(puntoX, puntoY);
        }
    }

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function DibujarFlor(x, y, numPetalos, radioXPetalo, radioYPetalo, altoTrazo) {
    // Dibuja el tallo
    const pasosTallo = 50;
    const altoTallo = altoTrazo / pasosTallo;
    let nuevaY = y;

    const DibujarTallo = () => {
        if (nuevaY < y + altoTrazo) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nuevaY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'lightgray'; // Color pastel
            ctx.stroke();
            nuevaY += altoTallo;
            setTimeout(DibujarTallo, 100);
        } else {
            // Dibuja los pétalos
            const incrementoAngulo = (Math.PI * 2) / numPetalos;
            let contadorPetalos = 0;

            function dibujarSiguientePetalo() {
                if (contadorPetalos < numPetalos) {
                    const angulo = contadorPetalos * incrementoAngulo;
                    DibujarPetalo(x, y, radioXPetalo, 2, angulo, '#ffcc80', 100); // Color pastel
                    contadorPetalos++;
                    setTimeout(dibujarSiguientePetalo, 1000);
                }
                // Dibuja el centro de la flor
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff'; // Color pastel
                ctx.fill();
            }
            dibujarSiguientePetalo();
        }
    };

    DibujarTallo();
}

function CrearVarias() {
    const numFlores = 12;
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const tamanoFlor = 130;

    for (let i = 0; i < numFlores; i++) {
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;

        DibujarFlor(x, y, 8, 30, 80, tamanoFlor);
    }
}
