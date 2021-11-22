function Cerrar() {
    $('#FormModal').modal('hide');
}

var tblUsuario
const input = document.querySelector('#fileImagen');
const list = document.getElementById('list');

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
                    <img id="imagenUser" src="${event.target.result}">
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
                    $("#imagenUser").attr("src", data.usrImagen);

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
            usrImagen: document.getElementById("imagenUser").src,
        }
    }
    console.log($request)
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
