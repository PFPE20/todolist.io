const nuevaTareaBtn = document.getElementById("agg-nueva-tarea");
const cerrarBtn = document.getElementById("cerrar-cambios");
const cancelarBtn = document.getElementById("cancelar-cambios");
const descartarBtn = document.getElementById("desc-cambios");
const enviarBtn = document.getElementById("enviar-Btn");
const formulario = document.getElementById("form-principal");
const titulo = document.getElementById("titulo");
const fecha = document.getElementById("fecha");
const descripcion = document.getElementById("descripcion");
const confirmCambios = document.getElementById("cambios");
const tareaContainer = document.getElementById("tarea-container");


const datosArr = JSON.parse(localStorage.getItem("todo")) || [];
let tareaActual = {};

// Funciones

const AggEditNuevaTarea = () => {
    const datosArrInd = datosArr.findIndex((i) => i.id === tareaActual.id);
    const nuevaTarea = {
        id: `${titulo.value.toLowerCase().split(" ").join("-")}`,
        titulo: titulo.value,
        fecha: fecha.value,
        descripcion: descripcion.value
    };

    if (datosArrInd === -1) {
        datosArr.unshift(nuevaTarea);
    } else {
        datosArr[datosArrInd] = nuevaTarea;
    }

    localStorage.setItem("todo", JSON.stringify(datosArr));
    contenedorTareas();
    reiniciar();
};


const contenedorTareas = () => {
    tareaContainer.innerHTML = "";
    datosArr.forEach(({id, titulo, fecha, descripcion}) => {
        tareaContainer.innerHTML += `
        <div class="tarea-actual" id="${id}">
        <p><strong>Tarea:</strong> ${titulo}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <button onclick="editarTareaActual(this)" class="btn-dinamico primero-de-clase btn" type="button">Editar</button>
        <button onclick="eliminarTareaActual(this)" class="btn-dinamico segundo-de-clase btn" type="button">Eliminar</button>
        </div>
        `;
    });
};

const editarTareaActual = (e) => {
    const datosArrInd = datosArr.findIndex((i) => i.id === e.parentElement.id);
    
    tareaActual = datosArr[datosArrInd];
    
    titulo.value = tareaActual.titulo;
    fecha.value = tareaActual.fecha;
    descripcion.value = tareaActual.descripcion;
    enviarBtn.innerText = "Editar tarea";
    
    formulario.classList.toggle("hidden");
}

const eliminarTareaActual = (e) => {
    const datosArrInd = datosArr.findIndex((i) => i.id === e.parentElement.id);
    e.parentElement.remove();
    datosArr.splice(datosArrInd, 1);
    localStorage.setItem("todo", JSON.stringify(datosArr));
};

const reiniciar = () => {
    titulo.value = "";
    fecha.value = "";
    descripcion.value = "";
    formulario.classList.toggle("hidden");
    enviarBtn.innerText = "Agregar tarea";
};

// Iniciacion de botones y formulario
nuevaTareaBtn.addEventListener("click", () => {
    formulario.classList.toggle("hidden");
});

cerrarBtn.addEventListener("click", () => {
    const valInput = titulo.value || fecha.value || descripcion.value;
    const valInputAct = titulo.value !== tareaActual.titulo || fecha.value !== tareaActual.fecha || descripcion.value !== tareaActual.descripcion;
    if (valInput && valInputAct) {
        confirmCambios.showModal();
    } else {
        reiniciar();
    }
});

cancelarBtn.addEventListener("click", () => {
    confirmCambios.close();
});

descartarBtn.addEventListener("click", () => {
    confirmCambios.close();
    reiniciar();
});

enviarBtn.addEventListener("click", (e) => {
    const valInput = titulo.value || fecha.value || descripcion.value;
    if (!valInput) {
        alert("Debes agregar una tarea.");
        e.preventDefault();
        return;
    }
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    AggEditNuevaTarea();
});


contenedorTareas();
