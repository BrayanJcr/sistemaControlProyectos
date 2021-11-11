var tabladata;
var tablaProyecto;
var tablaResponsable;


function CerrarProyecto() {
    $('#modalProyecto').modal('hide');
}

function CerrarResponsable() {
    $('#modalResponsable').modal('hide');
}


$(document).ready(function () {

    //Proyecto Tabla
    tablaProyecto = $('#tbProyectos').DataTable({
        "ajax": {
            "url": "/Proyectos/Listar",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "IDProyecto", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='proyectoSelect(" + JSON.stringify(row) + ")'><i class='fas fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "titProyecto" },
            { "data": "nombre" },
            { "data": "Ubicacion" }

        ],
        responsive: true
    });

    //Tabla Profesional
    tablaResponsable = $('#tbResponsable').DataTable({
        "ajax": {
            "url": "/Profesional/Listar",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "IDProfesional", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='profesionalSelect(" + JSON.stringify(row) + ")'><i class='fas fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "DNI" },
            { "data": "nombre" },
            { "data": "nomCargo" },
        ],
        responsive: true
    });

    tabladata = $('#tbdata').DataTable({
        "ajax": {
            "url": "/Proyectos/ListarAsignacion",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "titProyecto" },
            { "data": "nomEncarga" },
            { "data": "nomProfe" },
            { "data": "nomCargo" },
            {
                "data": "IDProfeProyecto", "render": function (data, type, row, meta) {
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

function buscarProyecto() {
    tablaProyecto.ajax.reload();
    $('#modalProyecto').modal('show');
}

function buscarResponsable() {
    tablaResponsable.ajax.reload();
    $('#modalResponsable').modal('show');
}

function proyectoSelect(json) {
    $("#txtIdProyecto").val(json.IDProyecto);
    $("#txtNombreProye").val(json.titProyecto);
    $("#txtUbicacion").val(json.Ubicacion);
    $("#txtEncargado").val(json.nombre);

    $('#modalProyecto').modal('hide');
}

function profesionalSelect(json) {
    $("#txtIdResponsable").val(json.IDProfesional);
    $("#txtDNI").val(json.DNI);
    $("#txtNombreRes").val(json.nombre);
    $("#txtCargo").val(json.nomCargo);

    $('#modalResponsable').modal('hide');
}

function asignarResponsable() {

    var camposvacios = false;

    if ($("#txtIdProyecto").val() == "0" || $("#txtIdResponsable").val() == "0")
        camposvacios = true;

    if (!camposvacios) {

        var $request = {
            objeto: {
                IDProyecto: parseInt($("#txtIdProyecto").val()),
                IDProfesional: parseInt($("#txtIdResponsable").val()),
            }
        }

        jQuery.ajax({
            url: "/Proyectos/GuardarProyectoProfes",
            type: "POST",
            data: JSON.stringify($request),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log($request);
                if (data.resultado) {
                    tabladata.ajax.reload();
                    $("#txtIdResponsable").val("0");
                    $("#txtDNI").val("");
                    $("#txtNombreRes").val("");
                    $("#txtCargo").val("");
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
        alert("Es necesario completar escojer Actividad y Responsable", "warning")
    }

}

function eliminar($IDProfProyecto) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Proyectos/EliminarProyectoProfes" + "?IDProfeProyecto=" + $IDProfProyecto,
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