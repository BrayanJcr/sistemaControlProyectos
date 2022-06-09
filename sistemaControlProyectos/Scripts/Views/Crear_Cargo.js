function Cerrar() {
    $('#FormModal').modal('hide');
}

var tablaCargo;

$(document).ready(function () {

    tablaCargo = $('#tblCargo').DataTable({

        "ajax": {
            "url": "/Cargo/Listar",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDCargo", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "nomCargo" },
            {
                "data": "Activo", "render": function (data) {
                    if (data) {
                        return '<span class="badge bg-success">Activo</span>';
                    } else {
                        return '<span class="badge bg-danger">No Activo</span>';
                    }
                }
            }
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

function abrirModal($IDCargo) {
    console.log($IDCargo);
    $("#txtIDCargo").val($IDCargo);
    if ($IDCargo != 0) {
        jQuery.ajax({
            url: "/Cargo/Obtener" + "?IDCargo=" + $IDCargo,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != null) {
                    $("#txtNombre").val(data.nomCargo);
                    $("#cboEstado").val(data.Activo == true ? 1 : 0);
                }
            }
        });
    } else {
        $("#txtNombre").val("");
        $("#cboEstado").val(1);
    }

    $('#FormModal').modal('show');
}

//Guardar Cargo
function Guardar() {
    var $request = {
        objeto: {
            IDCargo: parseInt($("#txtIDCargo").val()),
            nomCargo: $("#txtNombre").val(),
            Activo: $("#cboEstado").val() == "1" ? true : false,
        }
    }
    console.log($request);
    jQuery.ajax({
        url: "/Cargo/Guardar",
        type: "POST",
        data: JSON.stringify($request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.resultado);
            if (data.resultado) {
                tablaCargo.ajax.reload();
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

function Eliminar($IDCargo) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Cargo/Eliminar" + "?IDCargo=" + $IDCargo,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaCargo.ajax.reload();
                }
            }
        });
    }
}