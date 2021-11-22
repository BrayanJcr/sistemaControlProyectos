
var tabladata;
$(document).ready(function () {

    //OBTENER CARGOS
    jQuery.ajax({
        url: "/Cargo/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $("#cboRol").html("");

            $("<option>").attr({ "value": 0 }).text("-- Seleccione --").appendTo("#cboRol");
            if (data.data != null)
                $.each(data.data, function (i, item) {

                    if (item.Activo == true) {
                        $("<option>").attr({ "value": item.IDCargo }).text(item.nomCargo).appendTo("#cboRol");
                    }
                })
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

})


function buscar() {
    if ($("#cboRol").val() == 0) {
        swal("Mensaje", "Seleccione un rol", "warning")
        return;
    }
    //OBTENER PERMISOS
    jQuery.ajax({
        url: "/Permisos/Listar"+ "?IDCargo=" + $("#cboRol").val(),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $(".card-load").LoadingOverlay("hide");

            console.log(data.data);
            data = data.data;
            $("#tbpermiso tbody").html("");

            if (data != undefined) {
                $.each(data, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").append(
                            $("<input>").attr({ "type": "checkbox" }).attr({"id": "IDPermiso"}).data("IDPermiso", row.IDPermiso).prop('checked', row.Activo)
                        ),
                        $("<td>").text(row.Menu),
                        $("<td>").text(row.SubMenu),
                        $("<td>").append(
                            $("<input>").attr({ "type": "checkbox" }).attr({ "id": "IDSubMenu" }).data("IDPermiso", row.IDPermiso).prop('checked', row.Edicion)
                        )
                    ).appendTo("#tbpermiso tbody");
                })
            }
        },
        error: function (error) {
        },
        beforeSend: function () {
            $(".card-load").LoadingOverlay("show");
        },
    });
}

function Guardar() {

    if ($("#cboRol").val() == 0) {
        swal("Mensaje", "Seleccione un rol", "warning")
        return;
    }
    if ($("#tbpermiso tbody tr").length == 0) {
        swal("Mensaje", "No hay datos", "warning")
        return;
    }

    var $xml = "<DETALLE>"
    var permiso = "";
    let Edicion = [];
    var i = 0;
    $('input[id="IDSubMenu"]').each(function () {
        Edicion.push($(this).prop("checked") == true ? "1" : "0");
    });

    $('input[id="IDPermiso"]').each(function () {
        var IDPermiso = $(this).data("IDPermiso");
        var Activo = $(this).prop("checked") == true ? "1" : "0";


        permiso = permiso +
            "<PERMISO>"
            +"<IDPermiso>" + IDPermiso + "</IDPermiso>"
            + "<Activo>" + Activo + "</Activo>"
            + "<Edicion>" + Edicion[i] + "</Edicion>"
            + "</PERMISO>";
        i = i + 1;
    });
    $xml = $xml + permiso;
    $xml = $xml + "</DETALLE>"

    var request = { xml: $xml };
    console.log($xml);

    jQuery.ajax({
        url: "/Permisos/Guardar",
        type: "POST",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $(".card-load").LoadingOverlay("hide");

            if (data.resultado) {
                $("#cboRol").val(0);
                $("#tbpermiso tbody").html("");
            } else {

                swal("Mensaje", "No se pudo guardar los cambios", "warning")
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
            $(".card-load").LoadingOverlay("show");
        },
    });
}

