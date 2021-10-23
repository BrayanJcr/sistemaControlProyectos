
var tablaArea;

$(document).ready(function () {

    //OBTENER AREA PADRE
    jQuery.ajax({
        url: "/Area/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#cboPadre").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.IDArea }).text(item.nomArea).appendTo("#cboPadre");

                })
                $("#cboPadre").val($("#cboPadre option:first").val());
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

    //OBTENER PROFESIONAL
    jQuery.ajax({
        url: "/Usuario/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#cboEncargado").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.DNI }).text(item.nombre).appendTo("#cboEncargado");

                })
                $("#cboEncargado").val($("#cboEncargado option:first").val());
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

    tablaArea = $('#tblArea').DataTable({

        "ajax": {
            "url": "/Area/ListarAreaPadre",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDArea", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "nomArea" },
            { "data": "encargado" },
            { "data": "nomPadre" }
        ],
        dom: 'Blfrtip',
        lengthMenu: [
            entries = 100, 50, 10,
        ],
        buttons: [
            {
                text: 'Agregar Nuevo',
                attr: { class: 'btn btn-success btn-sm' },
                action: function (e, dt, node, config) {
                    abrirModal(0)
                }
            }
        ],
        responsive: true
    });
})

function abrirModal($IDArea) {

    $("#txtIDArea").val($IDArea);
    if ($IDArea != 0) {

        jQuery.ajax({
            url: "/Area/Obtener" + "?IDArea=" + $IDArea,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != null) {
                    $("#txtNombre").val(data.nomArea);
                    $("#cboEncargado").val(data.encargado);
                    $("#cboPadre").val(data.IdNomAreaPadre);
                }
            }
        });
    } else {
        $("#txtNombre").val("");
        $("#cboEncargado").val($("#cboEncargado option:first").val());
        $("#cboPadre").val($("#cboPadre option:first").val());
    }

    $('#FormModal').modal('show');
}

//Guardar Actividad
function Guardar() {
    var $request = {
        objeto: {
            nomArea: $("#txtNombre").val(),
            encargado: $("#cboEncargado").text(),
            IdNomAreaPadre: ($("#cboPadre").val()),
        }
    }
    console.log($request);
    jQuery.ajax({
        url: "/Area/Guardar",
        type: "POST",
        data: JSON.stringify($request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.resultado);
            if (data.resultado) {
                tablaArea.ajax.reload();
                $('#FormModal').modal('hide');
            } else {
                alert("Mensaje No se pudo guardar los cambios", "warning");
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {

        },
    });

}

function Eliminar($IDArea) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Area/Eliminar" + "?IDArea=" + $IDArea,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaArea.ajax.reload();
                }
            }
        });
    }
}
