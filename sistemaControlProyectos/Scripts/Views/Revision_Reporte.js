window.onload = function () {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    var diaFin = dia + 1;
    document.getElementById('txtFechInic').value = ano + "-" + mes + "-" + dia;
    document.getElementById('txtFechFin').value = ano + "-" + mes + "-" + diaFin;
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

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}


function buscar() { 
    var tablaReporte;

    $("#tblReporte").dataTable().fnDestroy();

    var estado = $("#txtEstado").val();
    console.log(estado);

    tablaReporte = $('#tblReporte').DataTable({

        "ajax": {
            "url": "/Reporte/Listar?Estado=" + estado,
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDReport", "render": function (data) {
                    return "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "nombre" },
            { "data": "FechaRep", "render": function (data) { return Cambiarfecha(data); } },
            {
                "data": "Estado", "render": function (data) {
                    if (data == "Rechazado") {
                        return '<span class="badge bg-danger">Rechazado</span>';
                    } else {
                        if (data == "Aceptado") {
                            return '<span class="badge bg-success">Aceptado</span>';
                        }
                        else {
                            return '<span class="badge bg-warning">Pendiente</span>';
                        }
                    }
                }
            },
            {
                "data": "IDReport", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm ml-2' type='button' onclick='Detalle(" + data + ")'><i class='fa fa-info-circle'></i>  Revisar</button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
        ],
        dom: 'Blfrtip',
        lengthMenu: [
            entries = 100, 50, 10,
        ],
        responsive: true
    });
}
