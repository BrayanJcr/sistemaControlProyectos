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
                "data": "IDProfesional", "render": function (data) {
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
                if (data != null) {
                    $("#cboUsuario").val(data.proceso);
                    $("#cboCargo").val(data.proceso);

                    

                }
            }
        });
    } else {
        $("#cboUsuario").val($("#cboUsuario option:first").val());
        $("#cboCargo").val("#cboCargo option:first");
    }

    $('#FormModal').modal('show');

}
function Guardar() {
        var $request = {
            objeto: {
                DNI: $("#cboUsuario").val(),
                IDCargo: ($("#cboCargo").val())
            }
        }
    console.log($request)
        jQuery.ajax({
            url: "/Profesional/Guardar",
            type: "POST",
            data: JSON.stringify($request),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaProfesional.ajax.reload()
                    $('#FormModal').modal('hide');
                } else {
                    swal("Mensaje", "No se pudo guardar los cambios", "warning")
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {

            }
        });
}

function Eliminar($DNI) {
    Swal.fire({
        title: 'Estas seguro de Eliminar el Registro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Su archivo ha sido eliminado.',
                'success'
            )
            jQuery.ajax({
                url: "/Profesional/Eliminar" + "?IDProfesional=" + $DNI,
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.resultado) {
                        Swal.fire('Reunion Eliminado', '', 'success')
                        tablaProfesional.ajax.reload();
                    } else {
                        swal("Mensaje", "No se pudo eliminar la reunion", "warning");
                    }
                },
                error: function (error) {
                    console.log(error);
                },
                beforeSend: function () {

                }
            });
        }
    })
    
            

}


