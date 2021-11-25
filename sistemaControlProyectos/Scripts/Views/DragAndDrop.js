
function start(e) {
    e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover
    e.dataTransfer.setData("Data", e.target.id); // Coje el elemento que se va a mover
    e.dataTransfer.setDragImage(e.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
    e.target.style.opacity = '0.4'; // Establece la opacidad del elemento que se va arrastrar
    

}
function end(e) {
    e.preventDefault()
    e.target.style.opacity = ''; // Restaura la opacidad del elemento   
    e.dataTransfer.clearData("Data");

}

function enter(e) {
    e.preventDefault()

    e.target.style.border = '3px dotted #555';
}
function leave(e) {
    
    e.target.style.border = '';
}
function over(e) {
    e.preventDefault();
    var id = e.target.id; // Elemento sobre el que se arrastra
    console.log(id)
    // return false para que se pueda soltar
    if (id == 'Nuevo') {
        

        return false; // Cualquier elemento se puede soltar sobre el div destino 1
    }

    if (id == 'Proceso') {

        return false; // En el cuadro2 se puede soltar cualquier elemento 
    }

    if (id == 'Terminado')

        return false;
    }
function drop(e) {
    e.preventDefault()
    var elementoArrastrado = e.dataTransfer.getData("Data"); // Elemento arrastrado
    e.target.appendChild(document.getElementById(elementoArrastrado)); // Añade el elemento arrastrado al elemento desde el que se llama a esta funcion
    e.target.style.border = '';   // Quita el borde del cuadro al que se mueve
    const x = document.getElementById(elementoArrastrado);
    var IDActividad = x.firstElementChild.id;
    var Proceso = e.target.id;
    
    
    ModificaProceso(IDActividad, Proceso)
}


function ModificaProceso($IDActividad,$Proceso) {
    var $request = {
        IDActividad: $IDActividad,
        Proceso: $Proceso,
    }
    console.log($request)
    jQuery.ajax({
        url: "/Actividades/ModificarProceso",
        type: "POST",
        data: JSON.stringify($request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data)

        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {

        },
    });
}



