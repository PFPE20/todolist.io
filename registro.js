const usuarioNombre = document.querySelector(".usuario");
const contenedorRegistro = document.getElementById("registro");
const nombreDeUsuario = document.getElementById("registro-usuario");
const envioRegistro = document.getElementById("enviar-registro");

const usuario = JSON.parse(localStorage.getItem("usuario"));
let usuarioActual;

const obtenerNombre = () => {
    usuarioActual = nombreDeUsuario.value;

    localStorage.setItem("usuario", JSON.stringify(usuarioActual));
    verificarUsuario();
    usuarioRegistrado();

};

const usuarioRegistrado = () => {
    usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioActual) {
        usuarioNombre.innerHTML = "";
    } else {
        usuarioNombre.innerHTML = `
        <h2>Bienvenid@</h2>
        <h3>${usuarioActual}</h3>
        <button type="button" onclick="modificarUsuario()" class="editar-usuario btn">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        `;
    }
};

const verificarUsuario = () => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado) {
        contenedorRegistro.classList.add("hidden");
    } else {
        contenedorRegistro.classList.remove("hidden");
    }
};

const modificarUsuario = () => {
    usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    nombreDeUsuario.value = usuarioActual;
    envioRegistro.innerText = "Cambiar nombre";
    contenedorRegistro.classList.toggle("hidden");
}

envioRegistro.addEventListener("click", () => {
    if (nombreDeUsuario.value === "") {
        alert("Por favor ingresa tu nombre.")
    } else {
        obtenerNombre();
    }
});

verificarUsuario();
usuarioRegistrado();