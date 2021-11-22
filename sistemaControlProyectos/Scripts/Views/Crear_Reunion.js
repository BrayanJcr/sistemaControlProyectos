var tabla_Reunion;
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
    tabla_Reunion = $('#tbReunion').DataTable({
        "ajax": {
            "url": "/Reunion/Listar",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [

            { "data": "tipoDeReunion" },
            { "data": "fecha" },
            { "data": "ubicacion" },
            { "data": "tema" },
            { "data": "estado" },
            { "data": "IDProyecto" },

            {
                "data": "IDReunion", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pen'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            }
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
                    $("#txtIDProyecto").val(data.IDProyecto);
                }

            }
        });
    } else {
        $("#txtTipoDeReunion").val("");
        $("#txtFecha").val("");
        $("#txtUbicacion").val("");
        $("#txtTema").val("");
        $("#txtEtapa").val(1);
        $("#txtIDProyecto").val("");
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
            IDProyecto: $("#txtIDProyecto").val(),
            proceso: ($("#cboProceso").val()),
        }
    }
    console.log($request);
    jQuery.ajax({
        url: "/Reunion/Guardar",
        type: "POST",
        data: JSON.stringify($request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
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


}

function Eliminar($IDReunion) {
    if (confirm("¿Realmente desea eliminar?")) {

        jQuery.ajax({
            url: "/Reunion/Eliminar" + "?IDReunion=" + $IDReunion,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.resultado) {
                    tabla_Reunion.ajax.reload();
                }
            }
        });


    }
}