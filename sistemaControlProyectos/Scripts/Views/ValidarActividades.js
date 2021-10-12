const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	titulo: /^[a-zA-Z0-9\_\-]{4,50}$/, // Letras, numeros, guion y guion_bajo
	descripcion: /^[a-zA-ZÀ-ÿ\s]{1,240}$/, // Letras y espacios, pueden llevar acentos.
}

const campos = {
	titulo: false,
	descripcion: false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "titulo":
			validarCampo(expresiones.titulo, e.target, 'titulo');
			break;
		case "descripcion":
			validarCampo(expresiones.descripcion, e.target, 'descripcion');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {

	input.addEventListener('keyup', () => {
		console.log("hola")
	});
});
