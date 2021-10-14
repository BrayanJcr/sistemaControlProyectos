
var tablaArea;

$(document).ready(function () {

    //OBTENER PROYECTOS
    jQuery.ajax({
        url: "/Proyectos/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#cboProyecto").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.IDProyecto }).text(item.titProyecto).appendTo("#cboProyecto");

                })
                $("#cboProyecto").val($("#cboProyecto option:first").val());
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
            "url": "/Area/Listar",
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
            { "data": "titActividad" }
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
                    $("#txtTitulo").val(data.titActividad);
                    $("#cboProyecto").val(data.IDProyecto);
                    $("#cboProyecto").val(data.IDProyecto);
                }
            }
        });
    } else {
        $("#txtTitulo").val("");
        $("#cboProyecto").val($("#cboProyecto option:first").val());
        $("#cboProyecto").val($("#cboProyecto option:first").val());
    }

    $('#FormModal').modal('show');
}

//Guardar Actividad
function Guardar() {
    var $request = {
        objeto: {
            IDArea: parseInt($("#txtIdActividad").val()),
            titActividad: $("#txtTitulo").val(),
            IDProyecto: ($("#cboProyecto").val()),
            IDProyecto: ($("#cboProyecto").val()),
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
                tablaActividad.ajax.reload();
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

function Eliminar($IDActividad) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Actividades/Eliminar" + "?IDActividad=" + $IDActividad,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaActividad.ajax.reload();
                }
            }
        });
    }
}
