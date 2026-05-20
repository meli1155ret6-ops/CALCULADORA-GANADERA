let animalSeleccionado = "";

// ==========================
// CARGAR DATOS AL INICIAR
// ==========================
window.onload = function () {

    const usuarioActivo =
        localStorage.getItem("usuarioActivo");

    if (usuarioActivo) {
        mostrarCalculadora();
    }

    cargarHistorial();
};

// ==========================
// REGISTRO
// ==========================
function register() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Debe llenar todos los campos.");
        return;
    }

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[username]) {
        alert("Ese usuario ya existe.");
        return;
    }

    usuarios[username] = password;

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert("Usuario registrado correctamente.");
}

// ==========================
// LOGIN
// ==========================
function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || {};

    if (
        usuarios[username] &&
        usuarios[username] === password
    ) {

        localStorage.setItem(
            "usuarioActivo",
            username
        );

        alert("Bienvenido " + username);

        mostrarCalculadora();

    } else {

        alert("Usuario o contraseña incorrectos.");
    }
}

// ==========================
// LOGOUT
// ==========================
function logout() {

    localStorage.removeItem("usuarioActivo");

    location.reload();
}

// ==========================
// MOSTRAR APP
// ==========================
function mostrarCalculadora() {

    document
        .getElementById("login-screen")
        .classList.add("hidden");

    document
        .getElementById("main-screen")
        .classList.remove("hidden");
}

// ==========================
// SELECCIONAR ANIMAL
// ==========================
function seleccionarAnimal(animal) {

    animalSeleccionado = animal;

    document
        .getElementById("form-animal")
        .classList.remove("hidden");

    document
        .getElementById("animal-titulo")
        .innerText =
        "Datos para " +
        animal.toUpperCase();
}

// ==========================
// CALCULAR
// ==========================
function calcular() {

    const cantidad =
        parseInt(document.getElementById("cantidad").value);

    const peso =
        parseFloat(document.getElementById("peso").value);

    const precio =
        parseFloat(document.getElementById("precio").value);

    const gastos =
        parseFloat(document.getElementById("gastos").value);

    const alimento =
        parseFloat(document.getElementById("alimento").value);

    const hectareas =
        parseFloat(document.getElementById("hectareas").value);

    if (
        isNaN(cantidad) ||
        isNaN(precio) ||
        isNaN(gastos) ||
        isNaN(alimento) ||
        isNaN(hectareas)
    ) {
        alert("Complete todos los campos.");
        return;
    }

    let produccion = 0;
    let descripcion = "";

    switch (animalSeleccionado) {

        case "cerdo":
            produccion = cantidad * peso;
            descripcion = "kg de carne";
            break;

        case "vaca":
            produccion = cantidad * 20 * 30;
            descripcion = "litros de leche al mes";
            break;

        case "gallina":
            produccion = cantidad * 25;
            descripcion = "huevos al mes";
            break;

        case "caballo":
            produccion = cantidad * peso;
            descripcion = "kg estimados";
            break;

        case "oveja":
            produccion = cantidad * 5;
            descripcion = "kg de lana";
            break;

        default:
            alert("Seleccione un animal.");
            return;
    }

    const ingresos =
        produccion * precio;

    const gastosTotales =
        cantidad * gastos;

    const ganancia =
        ingresos - gastosTotales;

    const alimentoMensual =
        cantidad * alimento * 30;

    const cargaAnimal =
        (cantidad / hectareas)
        .toFixed(2);

    const resultadoHTML = `
        <h2>Resultado del cálculo</h2>

        <p><strong>Animal:</strong>
        ${animalSeleccionado.toUpperCase()}</p>

        <p><strong>Cantidad:</strong>
        ${cantidad}</p>

        <p><strong>Producción:</strong>
        ${produccion.toFixed(2)}
        ${descripcion}</p>

        <p><strong>Ingresos:</strong>
        $${ingresos.toLocaleString()}</p>

        <p><strong>Gastos:</strong>
        $${gastosTotales.toLocaleString()}</p>

        <p><strong>Ganancia neta:</strong>
        $${ganancia.toLocaleString()}</p>

        <p><strong>Alimento mensual:</strong>
        ${alimentoMensual.toFixed(2)} kg</p>

        <p><strong>Carga animal:</strong>
        ${cargaAnimal}
        animales/hectárea</p>
    `;

    const resultado =
        document.getElementById("resultado");

    resultado.innerHTML =
        resultadoHTML;

    resultado.classList.remove("hidden");

    guardarHistorial(resultadoHTML);
}

// ==========================
// GUARDAR HISTORIAL
// ==========================
function guardarHistorial(calculo) {

    let historial =
        JSON.parse(
            localStorage.getItem("historial")
        ) || [];

    historial.unshift(calculo);

    localStorage.setItem(
        "historial",
        JSON.stringify(historial)
    );

    cargarHistorial();
}

// ==========================
// CARGAR HISTORIAL
// ==========================
function cargarHistorial() {

    const lista =
        document.getElementById("historial-lista");

    if (!lista) return;

    let historial =
        JSON.parse(
            localStorage.getItem("historial")
        ) || [];

    lista.innerHTML = "";

    historial.forEach(item => {

        lista.innerHTML += `
            <div class="historial-item">
                ${item}
            </div>
        `;
    });
}