function GuardarProyectoActual($IDProfesional, $DNI, $IDCargo, IDArea,$IDProyectoActual) {
    var $request = {
        IDProfesional: $IDProfesional,
        DNI: $DNI,
        IDCargo: $IDCargo,
        IDArea: IDArea,
        IDProyectoActual: $IDProyectoActual,

    }
    console.log($request)
    jQuery.ajax({
        url: "/Profesional/Guardar",
        type: "POST",
        data: JSON.stringify($request),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data)

        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {

        },
    });
    window.location = "/Home/Index";
}
