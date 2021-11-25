
window.onload = function () {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    document.getElementById('txtFecha').value = ano + "-" + mes + "-" + dia;
}

//Cambiar Fechas
function Cambiarfecha(fechaEntra) {
    var fechaString = fechaEntra.substr(6);
    var fechaActual = new Date(parseInt(fechaString));
    var mes = fechaActual.getMonth() + 1;
    var dia = fechaActual.getDate();
    var anio = fechaActual.getFullYear();
    if (dia < 10 && mes < 10) {
        var fecha = anio + "-0" + mes + "-0" + dia;
    } else {
        if (dia < 10)
            var fecha = anio + "-" + mes + "-0" + dia;
        else {
            if (mes < 10)
                var fecha = anio + "-0" + mes + "-" + dia;
            else
                var fecha = anio + "-" + mes + "-" + dia;
        }
    }
    return fecha;
}

var tablaActividad;
$(document).ready(function () {

    tablaActividad = $('#tblActividad').DataTable({

        ajax: {
            url: "/Actividades/ListarEsta?estado=" + "true",
            type: "GET",
            datatype: "json"
        },

        "columns":
            [
                {
                    "data": "IDActividad", "render": function (data) {
                        return "<input id='IDActividad' type='checkbox' value='" + data + "'></input>"
                    }
                },
                { "data": "titActividad" },
                { "data": "fechaInicio", "render": function (data) { return Cambiarfecha(data); } },
                { "data": "fechaFin", "render": function (data) { return Cambiarfecha(data); } },
                { "data": "Descripcion" },
            ],
        dom: 'lfrtip',
        lengthMenu: [
            entries = 10, 50, 100,
        ],
        responsive: true
    })
})

//Guardar Actividad
function Guardar() { 

    var $xml = "<DETALLE>";
    var actividad = "";
    var estado;
    $('input[id="IDActividad"]').each(function () {
        var idActividad = $(this).val();
        estado = ($(this).prop("checked") == true ? "1" : "0"); 
        if (estado == 1) {
            actividad = actividad +
                "<ACTIVIDAD>"
                + "<IDActividad>" + idActividad + "</IDActividad>"
                + "</ACTIVIDAD>";
        }
    });

    $xml = $xml + actividad;
    $xml = $xml + "</DETALLE>"
    console.log($xml);

    var $request = {
        objeto: {
            FechaRep :  ($("#txtFecha").val()),
            Descripcion: $("#txtDescripcion").val(),
            IDProfesional: $('#txtIDUsuarioSession').val(),
        },
        xml: $xml,
    };
    console.log($request);
    if ($request.xml != "<DETALLE></DETALLE>") {
        jQuery.ajax({
            url: "/Reporte/Guardar",
            type: "POST",
            data: JSON.stringify($request),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $(".card-load").LoadingOverlay("hide");

                if (data.resultado) {
                    $("#txtDescripcion").val("Detalles.");
                    tablaActividad.ajax.reload();
                    swal("Mensaje", "Guardado con Exito", "success")
                } else {

                    swal("Mensaje", "No se pudo guardar los cambios", "error")
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {
                $(".card-load").LoadingOverlay("show");
            },
        });
    } else
       swal("Mensaje", "Seleccione una actividad", "warning");
}

//Descargar documentos

function downloadFiles(data, file_name, file_type) {
    var object = {};
    object.file = $('#format').prop("files")[0];

    var file = new Blob([data], { type: file_type });
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, file_name);
    else {
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}