﻿var tabladata;
var tablaReunion;
var tablaResponsable;


function CerrarActividad() {
    $('#modalActividad').modal('hide');
}

function CerrarResponsable() {
    $('#modalResponsable').modal('hide');
}


$(document).ready(function () {

    //Actividad Tabla
    tablaReunion = $('#tbActividad').DataTable({
        "ajax": {
            "url": "/Reunion/Listar",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "IDReunion", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-sm btn-primary ml-2' type='button' onclick='actividadSelect(" + JSON.stringify(row) + ")'><i class='fas fa-check'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "90px"
            },
            { "data": "nombre" },
            { "data": "tema" },
            { "data": "titProyecto" }

        ],
        responsive: true
    });

    //Tabla Responsable
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
            "url": "/Actividades/ListarAsignacion",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "titActividad" },
            { "data": "creador" },
            { "data": "nombre" },
            { "data": "nomCargo" },
            {
                "data": "IDProfActividad", "render": function (data, type, row, meta) {
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
    tablaReunion.ajax.reload();
    $('#modalActividad').modal('show');
}

function buscarResponsable() {
    tablaResponsable.ajax.reload();
    $('#modalResponsable').modal('show');
}

function actividadSelect(json) {
    $("#txtIdReunion").val(json.IDReunion);
    $("#txtTema").val(json.tema);
    $("#txtCreador").val(json.nombre);
    $("#txtProyecto").val(json.titProyecto);

    $('#modalActividad').modal('hide');
}

function profesionalSelect(json) {
    $("#txtIdResponsable").val(json.IDProfesional);
    $("#txtDNI").val(json.DNI);
    $("#txtNombreRes").val(json.nombre);
    $("#txtCargo").val(json.nomCargo);

    $('#modalResponsable').modal('hide');
}

function asignarProfesional() {

    var camposvacios = false;

    if ($("#txtIDReunion").val() == "0" || $("#txtIdResponsable").val() == "0")
        camposvacios = true;

    if (!camposvacios) {

        var $request = {
            objeto: {
                IDReunion: parseInt($("#txtIdReunion").val()),
                IDProfesional: parseInt($("#txtIdResponsable").val()),
            }
        }
        jQuery.ajax({
            url: "/Reunion/GuardarProfesionalReunion?IDProfesional=" + $request.objeto.IDProfesional + "&IDReunion=" + $request.objeto.IDReunion,
            type: "POST",
            data: JSON.stringify($request),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
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

function eliminar($IDProfActividad) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Actividades/EliminarActividadResponsable" + "?IDProfActividad=" + $IDProfActividad,
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