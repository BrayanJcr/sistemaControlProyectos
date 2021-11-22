const input = document.querySelector('#image_uploads');
const list = document.getElementById('list');
const name = document.getElementById('name');
const size = document.getElementById('size');

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    const curFiles = input.files;

    if (curFiles.length === 0) {
        list.innerHTML = "<p>Actualmente no hay archivos seleccionados para cargar.</p>";
    } else {
        list.innerHTML = "";

        for (const file of curFiles) {
            if (file.type.match(/image.*/i)) {
                var reader = new FileReader();
                reader.addEventListener("load", (event) => {
                    list.innerHTML += `<li>
                    <p id="name">Nombre: ${file.name}</p>
                    <p id="size">Tamaño: ${returnFileSize(file.size)}</p>
                    <img id="imagenPro" src="${event.target.result}">
                    </li>`;
                });
                reader.readAsDataURL(file);
                
            } else {
                var content = `File name (${file.name}): Not a valid file type.`;
                content += " Update your selection.";

                list.innerHTML += `<li><p>${content}</p></li>`;
            }
        }
    }
}

function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

//Cambiar Fechas
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

function Cerrar() {
    $('#FormModal').modal('hide');
}

var tablaProyectos;
$(document).ready(function () {
    
    //OBTENER PROFESIONALES
    jQuery.ajax({
        url: "/Profesional/Listar",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#cboEncargado").html("");

            if (data.data != null) {
                $.each(data.data, function (i, item) {

                    $("<option>").attr({ "value": item.IDProfesional }).text(item.nombre).appendTo("#cboEncargado");

                })
                $("#cboEncargado").val($("#cboEncargado option:first").val());
            }
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });
    
    tablaProyectos = $('#tblProyectos').DataTable({

        "ajax": {
            "url": "/Proyectos/Listar",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [
            {
                "data": "IDProyecto", "render": function (data) {
                    return "<button class='btn btn-primary btn-sm' type='button' onclick='abrirModal(" + data + ")'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='Eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            },
            { "data": "titProyecto"},
            { "data": "fechaIniPro", "render": function (data) {return Cambiarfecha(data);}},
            { "data": "fechaFinPro", "render": function (data) {return Cambiarfecha(data);}},
            {
                "data": "estado", "render": function (data) {
                    if (data) {
                        return '<span class="badge bg-success">Activo</span>';
                    } else {
                        return '<span class="badge bg-danger">No Activo</span>';
                    }
                }
            },
            { "data": "Ubicacion" },
            { "data": "distrito" },
            { "data": "departamento" },
            { "data": "seguimiento" },
            { "data": "nombre" },
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

function abrirModal($IDProyectos) {
   
    $("#txtIdProyectos").val($IDProyectos);
    if ($IDProyectos != 0) {

        jQuery.ajax({
            url: "/Proyectos/Obtener" + "?IDProyecto=" + $IDProyectos,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data != null) {
                    $("#txtTitulo").val(data.titProyecto);
                    $("#txtFechaIni").val(Cambiarfecha(data.fechaIniPro));
                    $("#txtFechaFin").val(Cambiarfecha(data.fechaFinPro));
                    $("#txtDescripcion").val(data.descripcion);
                    $("#cboEstado").val(data.estado == true ? 1 : 0);
                    $("#txtUbicacion").val(data.Ubicacion);
                    $("#txtDistrito").val(data.distrito);
                    $("#txtDepartamento").val(data.departamento);
                    $("#imagenPro").attr("src", data.imagen);
                    $("#txtSeguimiento").val(data.seguimiento);
                    $("#cboEncargado").val(data.IDProfesional);
                }
            }
        });
    } else {
        $("#txtTitulo").val("");
        $("#txtFechaIni").val("");
        $("#txtFechaFin").val("");
        $("#txtDescripcion").val("");
        $("#cboEstado").val(1);
        $("#txtUbicacion").val("");
        $("#txtDistrito").val("");
        $("#txtDepartamento").val("");
        $("#image_uploads").val("");
        name.innerHTML = "";
        size.innerHTML = "";
        $("#txtSeguimiento").val("");
        $("#cboEncargado").val($("#cboEncargado option:first").val());
    }

    $('#FormModal').modal('show');
}

//Guardar Actividad
function Guardar() {

    var $request = {
        objeto: {
            IDProyecto: parseInt($("#txtIdProyectos").val()),
            titProyecto: $("#txtTitulo").val(),
            fechaIniPro: $("#txtFechaIni").val(),
            fechaFinPro: $("#txtFechaFin").val(),
            descripcion: $("#txtDescripcion").val(),
            estado: $("#cboEstado").val() == "1" ? true : false,
            Ubicacion: ($("#txtUbicacion").val()),
            distrito: ($("#txtDistrito").val()),
            departamento: ($("#txtDepartamento").val()),
            imagen: document.getElementById("imagenPro").src,
            seguimiento: ($("#txtSeguimiento").val()),
            IDProfesional: ($("#cboEncargado").val()),
        }
    }
    console.log($request);
    if ($request.objeto.titProyecto != "") {
        if ($request.objeto.fechaIniPro) {
            if ($request.objeto.fechaFinPro) {
                if ($request.objeto.fechaFinPro > $request.objeto.fechaIniPro) {
                    jQuery.ajax({
                        url: "/Proyectos/Guardar",
                        type: "POST",
                        data: JSON.stringify($request),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            console.log(data.resultado);
                            if (data.resultado) {
                                tablaProyectos.ajax.reload();
                                $("#size").text('Nombre: null');
                                $("#name").text('Tamaño: null');
                                $("#imagenPro").removeAttr('src');
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
                } else {
                    alert("La fecha de FIN debe ser mayor a la de INICIO", "warning");
                }
            } else {
                alert("Ingrese Fecha de Fin", "warning");
            }
        } else {
            alert("Ingrese Fecha de Inicio", "warning");
        }
    } else {
        alert("Ingrese Titulo", "warning");
    }

}

function Eliminar($IDProyecto) {
    if (confirm("Estas seguro de Eliminar el Registro?")) {
        jQuery.ajax({
            url: "/Proyectos/Eliminar" + "?IDProyecto=" + $IDProyecto,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.resultado) {
                    tablaProyectos.ajax.reload();
                }
            }
        });
    }
}