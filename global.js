// Referência: https://codepen.io/dudleystorey/pen/rLAKXz

// referenciar todas as TAGs com CLASS pupil
const pupils = document.querySelectorAll('div.pupil')

// para cada pupila pegar:
//      • o centro em relação ao eixo X
//      • a parte de baixo em relação ao eixo Y
for (var i = 0; i < pupils.length; i++) {

    // variável que irá conter todas as coordenadas
    // de onde foi feito o clique
    var coordinates = pupils[i].getBoundingClientRect()

    // pegando o centro em relação ao eixo X
    pupils[i]['cX'] = coordinates.left + (coordinates.width / 2)

    // pegando a parte de baixo em relação ao eixo Y
    pupils[i]['cY'] = coordinates.bottom
}


// função responsável por focar as pupilas no cursor do mouse
function focus (event) {

    // se houver algum clique na tela
    if (event.targetTouches && event.targetTouches[0]) {

        // cancelar o evento
        event.preventDefault()

        // pegar as coordenadas X e Y do cursor
        cursorX = event.targetTouches[0].pageX
        cursorY = event.targetTouches[0].pageY
    }
    
    // ou se o usuário está só mexendo o cursor do mouse
    else {

        // pegar as coordenadas X e Y do cursor
        cursorX = event.clientX + window.pageXOffset
        cursorY = event.clientY + window.pageYOffset
    }

    // realizando os cálculos matemáticos para saber o 
    // quanto as pupilas de cada olho devem girar
    for (var i = 0; i < pupils.length; i++) {

        // calcular o ângulo em radianos
        pupils[i]['rad'] = Math.atan2(
            cursorX - pupils[i]['cX'], cursorY - pupils[i]['cY']
        )

        // passar de radianos para degrees
        pupils[i]['deg'] = (pupils[i]['rad'] * (180 / Math.PI)) * (-1)

        // aplicar a rotação
        pupils[i].style.transform = `rotate(${pupils[i]['deg'] + 180}deg)`
    }
}

// esperando que qualquer evento aconteça
window.addEventListener('mousemove', focus, {passive: false}) // mover
window.addEventListener('touchstart', focus, {passive: false}) // clicar
window.addEventListener('touchmove', focus, {passive: false}) // clicar e mover
