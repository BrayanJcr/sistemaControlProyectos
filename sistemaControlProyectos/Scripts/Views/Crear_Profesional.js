var tablaProfesional

function Cerrar() {
    $('#FormModal').modal('hide');
}

//Listar Profesionales
$(document).ready(function () {
    //Obtener Usuario
    jQuery.ajax({
        url: "/Usuario/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.data);
            $("#cboUsuario").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.DNI }).text(item.nombre + " " + item.apellidos).appendTo("#cboUsuario");

                })
                $("#cboUsuario").val($("#cboUsuario option:first").val());
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

    //Obtener Cargo
    jQuery.ajax({
        url: "/Cargo/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#cboCargo").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.IDCargo }).text(item.nomCargo).appendTo("#cboCargo");

                })
                $("#cboCargo").val($("#cboCargo option:first").val());
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

    tablaProfesional = $('#tblProfesional').DataTable({
        
        "ajax": {
            "url": "/Profesional/listar",
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
            { "data": "profesion" },
            { "data": "telefono" },
            { "data": "correo" },
            { "data": "nomCargo" },
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
    $("#txtDni").val($DNI);   
    if ($DNI != 0) {
        
        jQuery.ajax({    
            url: "/Profesional/Obtener" + "?DNI=" + $DNI,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data.profesion)
                if (data != null) {
                    
                    

                }
            }
        });
    } else {
       
    }

    $('#FormModal').modal('show');

}

function guardar() {
        var $request = {
            objeto: {
                DNI: parseInt($("#txtDni").val()),
                nombre: ($("#txtNombre").val()),
                apellidos: ($("#txtApellidos").val()),
                usuario: ($("#txUsuario").val()),
                contraseña: ($("#txtPassword").val()),
                firma: ($("#txtFirmaDigital").val()),
                profesion: ($("#txtProfesion").val()),
                telefono: ($("#txtTelefono").val()),
                correo: ($("#txtCorreo").val()),
                IDCargo: ($("#cboCargo").val()),
                IDArea: ($("#cboArea").val()),
                usrImagen: ($("#fileImagen").val()),
                IDReporte: ($("#fileReporte").val())
            }
        }

        jQuery.ajax({
            url: "/Profesional/Guardar",
            type: "POST",
            data: JSON.stringify($request),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data)
                if (data.resultado) {
                    tablaProfesional.ajax.reload();
                    $('#FormModal').modal('hide');
                } else {

                    alert("No se pudo guardar los cambios");
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
            url: "/Profesional/Eliminar" + "?DNI=" + $DNI,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaProfesional.ajax.reload();
                }
            }
        });
    }
}


