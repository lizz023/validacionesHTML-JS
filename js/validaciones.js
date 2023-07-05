export function valida(input){
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }
  
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeError(tipoInput, input);
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La contraseña debe de tener al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es (000 000 0000) 10 números"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contrener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contrener entre 10 y 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contrener entre 10 y 40 caracteres"
    }

}


const validadores = {
    nacimiento: input => validarNacimiendo(input),
}

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoInput][error])

            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje; 
}


function validarNacimiendo(input){
    const fechaUsuario = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaUsuario)){
        mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear()+18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFecha <= fechaActual;
}