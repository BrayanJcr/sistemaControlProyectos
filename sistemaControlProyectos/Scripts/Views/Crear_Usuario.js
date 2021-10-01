var tblUsuario
//Listar Profesionales
$(document).ready(function () {
    tblUsuario = $('#tblUsuario').DataTable({

        "ajax": {
            "url": "/Usuario/listar",
            "type": "GET",
            "dataType": "json"
        },
        "columns": [
            { "data": "DNI" },
            { "data": "nombre" },
            { "data": "apellidos" },
            { "data": "usuario" },
            { "data": "correo" },
            { "data": "profesion" },
            { "data": "telefono" },  
            {
                "data": "DNI", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Agregar Nuevo',
                attr: { class: 'btn btn-success btn-sm' },
                action: function (e, dt, node, config) {
                    abrirModal(0)
                }
            }
        ],
    });
});

function abrirModal($DNI) {
    
    if ($DNI != 0) {
        
        jQuery.ajax({
            url: "/Profesional/Obtener" + "?DNI=" + $DNI,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data)
                if (data != null) {
                    $("#txtDni").val(data.DNI);
                    $("#txtDni").val(data.nombre);


                }
            }
        });
    } else {

    }

    $('#FormModal').modal('show');

}
