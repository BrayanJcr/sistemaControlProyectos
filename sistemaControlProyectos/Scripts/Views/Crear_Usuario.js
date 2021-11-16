function Cerrar() {
    $('#FormModal').modal('hide');
}

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
            {
                "data": "DNI", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "DNI" },
            { "data": "nombre" },
            { "data": "apellidos" },
            { "data": "correo" },
            { "data": "profesion" },
            { "data": "telefono" },  
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
    $("#txtDni").val($DNI)
    if ($DNI != "") {
        
        jQuery.ajax({
            url: "/Usuario/Obtener" + "?DNI=" + $DNI,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data)
                if (data != null) {
                    $("#txtDni").val(data.DNI);
                    $("#txtNombre").val(data.nombre);
                    $("#txtApellidos").val(data.apellidos);
                    $("#txtPassword").val(data.contraseña);
                    $("#txtFirmaDigital").val(data.firma);
                    $("#txtProfesion").val(data.profesion);
                    $("#txtCorreo").val(data.correo);
                    $("#txtTelefono").val(data.telefono);
                    $("#fileImagen").val(data.usrImagen);

                }
            }
        });
    } else {
        $("#txtDni").val("");
        $("#txtNombre").val("");
        $("#txtApellidos").val("");
        $("#txtPassword").val("");
        $("#txtFirmaDigital").val("");
        $("#txtProfesion").val("");
        $("#txtCorreo").val("");
        $("#txtTelefono").val("");
        $("#fileImagen").val("");
    }

    $('#FormModal').modal('show');

}
function guardar() {

    var $request = {
        objeto: {
            DNI: parseInt($("#txtDni").val()),
            nombre: ($("#txtNombre").val()),
            apellidos: ($("#txtApellidos").val()),
            contraseña: ($("#txtPassword").val()),
            firma: ($("#txtFirmaDigital").val()),
            profesion: ($("#txtProfesion").val()),
            telefono: ($("#txtTelefono").val()),
            correo: ($("#txtCorreo").val()),
            usrImagen: ($("#fileImagen").val()),
        }
    }

    jQuery.ajax({
        url: "/Usuario/Guardar",
        type: "POST",
        data: JSON.stringify($request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data)
            if (data.resultado) {
                tblUsuario.ajax.reload();
                $('#FormModal').modal('hide');
            } else {
                swal("Mensaje", "No se pudo guardar los cambios", "warning")

            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {

        },
    });
}

function Eliminar($DNI) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Usuario/Eliminar" + "?DNI=" + $DNI,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tblUsuario.ajax.reload();
                }
            }
        });
    }
}
