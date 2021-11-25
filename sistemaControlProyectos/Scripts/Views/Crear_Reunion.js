var tabla_Reunion;

//Obtener Proyectos


function Cambiarfecha(fechaEntra) {
    var fechaString = fechaEntra.substr(6);
    var fechaActual = new Date(parseInt(fechaString));
    var mes = fechaActual.getMonth() + 1;
    var dia = fechaActual.getDate();
    var anio = fechaActual.getFullYear();
    if (dia < 10 && mes < 10) {
        var fecha = anio + "-0" + mes + "-0" + dia;
    } else {
        if (dia < 10)
            var fecha = anio + "-" + mes + "-0" + dia;
        else {
            if (mes < 10)
                var fecha = anio + "-0" + mes + "-" + dia;
            else
                var fecha = anio + "-" + mes + "-" + dia;
        }
    }

    return fecha;
}

$(document).ready(function () {
    
    
    jQuery.ajax({
        url: "/Proyectos/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#cmbProyectos").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.IDProyecto }).text(item.titProyecto).appendTo("#cmbProyectos");

                })
                $("#cmbProyectos").val($("#cmbProyectos option:first").val());
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

    tabla_Reunion = $('#tbReunion').DataTable({
        "ajax": {
            "url": "/Reunion/Listar",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDReunion", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "tipoDeReunion" },
            { "data": "fecha", "render": function (data) { return Cambiarfecha(data);}},
            { "data": "ubicacion" },
            { "data": "tema" },
            { "data": "estado" },
            { "data": "titProyecto" }
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


function abrirModal($IDReunion) {

    $("#txtIDReunion").val($IDReunion);
    if ($IDReunion != 0) {

        jQuery.ajax({
            url: "/Reunion/Obtener" + "?IDReunion=" + $IDReunion,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != null) {


                    $("#txtTipoDeReunion").val(data.tipoDeReunion);
                    $("#txtFecha").val(Cambiarfecha(data.fecha));
                    $("#txtUbicacion").val(data.ubicacion);
                    $("#txtTema").val(data.tema);
                    $("#txtEtapa").val(data.estado);
                    $("#cmbProyectos").val(data.IDProyecto);
                }

            }
        });
    } else {
        $("#txtTipoDeReunion").val("");
        $("#txtFecha").val("");
        $("#txtUbicacion").val("");
        $("#txtTema").val("");
        $("#txtEtapa").val(1);
        $("#cmbProyectos").val($("#cmbProyectos option:first").val());
    }

    $('#FormModal').modal('show');

}

function Guardar() {
    var $request = {
        objetoReunion: {
            IDReunion: parseInt($("#txtIDReunion").val()),
            tipoDeReunion: $("#txtTipoDeReunion").val(),
            fecha: $("#txtFecha").val(),
            ubicacion: $("#txtUbicacion").val(),
            tema: $("#txtTema").val(),
            estado: $("#cboEtapa").val(),
            IDProyecto: $("#cmbProyectos").val(),
            proceso: ($("#cboProceso").val()),
        }
    }
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    console.log($request.objetoReunion.fecha);
    console.log(hoy.toISOString())
    if ($request.objetoReunion.fecha != " ") {
        if (hoy.toISOString() <= $request.objetoReunion.fecha) {
            jQuery.ajax({
                url: "/Reunion/Guardar",
                type: "POST",
                data: JSON.stringify($request),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    if (data.resultado) {
                        tabla_Reunion.ajax.reload();
                        $('#FormModal').modal('hide');
                    } else {
                        alert("No se pudo guardar los cambios", "warning");
                    }
                },
                error: function (error) {
                    console.log(error)
                },
                beforeSend: function () {

                },
            });

        } else {
            alert("la fecha es menor")
        }
    } else {
        alert("El campo fecha esta vacia")
    }
    


}

function Eliminar($IDReunion) {
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
                url: "/Reunion/Eliminar" + "?IDReunion=" + $IDReunion,
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data.resultado) {
                        Swal.fire('Reunion Eliminado', '', 'success')
                        tabla_Reunion.ajax.reload();
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