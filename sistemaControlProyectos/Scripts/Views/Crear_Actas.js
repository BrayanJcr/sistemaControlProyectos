var tablaActividad;
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

    tablaActividad = $('#tblActas').DataTable({

        "ajax": {
            "url": "/Actividades/Listar",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDActividad", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "titActividad" },
            { "data": "fechaInicio"},
            { "data": "fechaFin"},
            { "data": "Descripcion" },
            {
                "data": "estado", "render": function (data) {
                    if (data) {
                        return '<span class="badge bg-success">Activo</span>';
                    } else {
                        return '<span class="badge bg-danger">No Activo</span>';
                    }
                }
            },
            { "data": "proceso" },
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