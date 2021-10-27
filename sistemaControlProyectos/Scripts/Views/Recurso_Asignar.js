var tabladata;
var tablaActividad;
var tablaRecurso;

function CerrarActividad() {
    $('#modalActividad').modal('hide');
}
function CerrarRecurso() {
    $('#modalRecurso').modal('hide');
}
function CerrarCantidad() {
    $('#modalCantidad').modal('hide');
}

$(document).ready(function () {

    //Actividad Tabla
    tablaActividad = $('#tbActividad').DataTable({
        "ajax": {
            "url": "/Actividades/Listar",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "IDActividad", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='actividadSelect(" + JSON.stringify(row) + ")'><i class='fas fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "titActividad" },
            { "data": "Descripcion" },
            { "data": "proceso" }

        ],
        responsive: true
    });

    //Tabla Recurso
    tablaRecurso = $('#tbRecurso').DataTable({
        "ajax": {
            "url": "/Recursos/Listar",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "IDRecurso", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='recursoSelect(" + JSON.stringify(row) + ")'><i class='fas fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "nomRecurso" },
            { "data": "cantidadStock" },
            { "data": "costo" },
        ],
        responsive: true
    });

    tabladata = $('#tbdata').DataTable({
        "ajax": {
            "url": "/Actividades/ListarAsignacionRecurso",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "titActividad" },
            { "data": "creador" },
            { "data": "nomRecurso" },
            { "data": "costo" },
            { "data": "cantidad" },
            {
                "data": "idRecursoActividad", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }

        ],
        responsive: true
    });

})

function buscarActividad() {
    tablaActividad.ajax.reload();
    $('#modalActividad').modal('show');
}

function buscarRecurso() {
    tablaRecurso.ajax.reload();
    $('#modalRecurso').modal('show');
}

function actividadSelect(json) {
    $("#txtIdActividad").val(json.IDActividad);
    $("#txtNombreActi").val(json.titActividad);
    $("#txtCreador").val(json.creador);
    $("#txtProceso").val(json.proceso);

    $('#modalActividad').modal('hide');
}

function recursoSelect(json) {
    $("#txtIdRecurso").val(json.IDRecurso);
    $("#txtNombreRec").val(json.nomRecurso);
    $("#txtStock").val(json.cantidadStock);
    $("#txtCosto").val(json.costo);

    $('#modalRecurso').modal('hide');
}

function asignarCantidad() {
    var camposvacios = false;
    if ($("#txtIdActividad").val() == "0" || $("#txtIdRecurso").val() == "0")
        camposvacios = true;
    if (!camposvacios) {
        $('#modalCantidad').modal('show');
    } else {
        alert("Es necesario completar escojer Actividad y Responsable", "warning")
    }
}

function asignarRecurso() {
    
    if ($("#txtCantidad").val() != "") {
        if ($("#txtCantidad").val() <= $("#txtStock").val()) {
            $('#modalCantidad').modal('hide');

            //JQuery Guardar Recurso_Actividad
            var $requestRe = {
                objeto: {
                    IDRecurso: parseInt($("#txtIdRecurso").val()),
                    nomRecurso: $("#txtNombreRec").val(),
                    cantidadStock: $("#txtStock").val() - $("#txtCantidad").val(),
                    costo: ($("#txtCosto").val()),
                }
            }
            console.log($requestRe);

            jQuery.ajax({
                url: "/Recursos/Guardar",
                type: "POST",
                data: JSON.stringify($requestRe),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data.resultado);
                },
                error: function (error) {
                    console.log(error)
                },
                beforeSend: function () {

                },
            });

            //JQuery Guardar Recurso_Actividad
            var $request = {
                objeto: {
                    IDActividad: parseInt($("#txtIdActividad").val()),
                    IDRecurso: parseInt($("#txtIdRecurso").val()),
                    cantidad: parseInt($("#txtCantidad").val()),
                }
            }

            jQuery.ajax({
                url: "/Actividades/GuardarActividadRecurso",
                type: "POST",
                data: JSON.stringify($request),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log($request);
                    console.log(data);
                    if (data.resultado) {
                        tabladata.ajax.reload();
                        $("#txtIdRecurso").val("0");
                        $("#txtNombreRec").val("");
                        $("#txtStock").val("");
                        $("#txtCosto").val("");
                    } else {
                        alert("No se pudo registrar la asignación", "warning")
                    }
                },
                error: function (error) {
                    console.log(error)
                },
                beforeSend: function () {

                },
            });

        } else {
            alert("La cantidad debe de ser menor al stock", "warning")
        }
    } else {
        alert("Ingrese una cantidad", "warning")
    }
}

function eliminar($IDRecActividad) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Actividades/EliminarActividadRecurso" + "?IDRecActividad=" + $IDRecActividad,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.resultado) {
                    tabladata.ajax.reload();
                } else {
                    alert("No se pudo eliminar la asignación?", "warning")
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {

            },
        });
    }
}