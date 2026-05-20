let usuarios = {};
let animalSeleccionado = "";

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (usuarios[user] && usuarios[user] === pass) {
        alert("Bienvenido " + user);
        mostrarCalculadora();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function register() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user && pass) {
        if (!usuarios[user]) {
            usuarios[user] = pass;
            alert("Usuario registrado con éxito.");
        } else {
            alert("El usuario ya existe.");
        }
    } else {
        alert("Debe ingresar usuario y contraseña.");
    }
}

function mostrarCalculadora() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
}

function seleccionarAnimal(animal) {
    animalSeleccionado = animal;
    document.getElementById("form-animal").classList.remove("hidden");
    document.getElementById("animal-titulo").innerText = "Cálculo para " + animal;
}

function calcular() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);
    const gastos = parseFloat(document.getElementById("gastos").value);

    if (isNaN(cantidad) || isNaN(precio) || isNaN(gastos)) {
        alert("Debe ingresar todos los valores numéricos.");
        return;
    }

    let resultado = "";

    switch (animalSeleccionado) {
        case "cerdo":
            resultado = `${cantidad} cerdos producen ${cantidad * 80} kg de carne. 
                         Gastos mensuales: $${cantidad * gastos}. 
                         Ingreso potencial: $${cantidad * 80 * precio}.`;
            break;
        case "vaca":
            resultado = `${cantidad} vacas producen ${cantidad * 20} litros de leche diarios. 
                         Gastos mensuales: $${cantidad * gastos}. 
                         Ingreso potencial: $${cantidad * 20 * precio * 30}.`;
            break;
        case "gallina":
            resultado = `${cantidad} gallinas producen ${cantidad * 25} huevos mensuales. 
                         Gastos mensuales: $${cantidad * gastos}. 
                         Ingreso potencial: $${cantidad * 25 * precio}.`;
            break;
        case "caballo":
            resultado = `${cantidad} caballos producen ${cantidad * 100} kg de carne. 
                         Gastos mensuales: $${cantidad * gastos}. 
                         Ingreso potencial: $${cantidad * 100 * precio}.`;
            break;
        case "oveja":
            resultado = `${cantidad} ovejas producen ${cantidad * 5} kg de lana mensuales. 
                         Gastos mensuales: $${cantidad * gastos}. 
                         Ingreso potencial: $${cantidad * 5 * precio}.`;
            break;
        default:
            resultado = "Animal no reconocido.";
    }

    document.getElementById("resultado").innerText = resultado;
}
