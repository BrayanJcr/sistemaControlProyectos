function Cerrar() {
    $('#FormModal').modal('hide');
}

var tablaRecurso;

$(document).ready(function () {

    tablaRecurso = $('#tblRecursos').DataTable({

        "ajax": {
            "url": "/Recursos/Listar",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDRecurso", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "nomRecurso" },
            { "data": "cantidadStock" },
            { "data": "costo" }
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

function abrirModal($IDRecurso) {
    console.log($IDRecurso);
    $("#txtIDRecurso").val($IDRecurso);
    if ($IDRecurso != 0) {

        jQuery.ajax({
            url: "/Recursos/Obtener" + "?IDRecurso=" + $IDRecurso,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != null) {
                    $("#txtNombre").val(data.nomRecurso);
                    $("#txtCantidad").val(data.cantidadStock);
                    $("#txtPrecio").val(data.costo);
                }
            }
        });
    } else {
        $("#txtNombre").val("");
        $("#txtCantidad").val("");
        $("#txtPrecio").val("");
    }

    $('#FormModal').modal('show');
}

//Guardar Recurso
function Guardar() {
    var $request = {
        objeto: {
            IDRecurso: parseInt($("#txtIDRecurso").val()),
            nomRecurso: $("#txtNombre").val(),
            cantidadStock: $("#txtCantidad").val(),
            costo: ($("#txtPrecio").val()),
        }
    }
    if ($request.objeto.nomRecurso != "") {
        if ($request.objeto.cantidadStock != "") {
            if ($request.objeto.costo != "") {

                console.log($request);
                jQuery.ajax({
                    url: "/Recursos/Guardar",
                    type: "POST",
                    data: JSON.stringify($request),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        console.log(data.resultado);
                        if (data.resultado) {
                            tablaRecurso.ajax.reload();
                            $('#FormModal').modal('hide');
                            swal("Mensaje", "Se guardo los cambios", "success");
                        } else {
                            swal("Mensaje", "No se pudo guardar los cambios", "error");
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    beforeSend: function () {

                    },
                });
            } else
                swal("Mensaje", "Ingrese un Precio", "warning");
        } else
            swal("Mensaje", "Ingrese una Cantidad", "warning");
    } else
        swal("Mensaje", "Ingrese un Nombre", "warning");

}

function Eliminar($IDRecurso) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Recursos/Eliminar" + "?IDRecurso=" + $IDRecurso,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaRecurso.ajax.reload();
                }
            }
        });
    }
}