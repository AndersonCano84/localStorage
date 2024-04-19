//Declaración de variables
/*  let informacion = [
    {
        nombre: "Juan",
        profesion: "Programador",
        salario: 6000000
    },
   
    {
        nombre:"María",
        profesion: "Diseñadora",
        salario: 4000000  
    },

    {
        nombre: "Pedro",
        profesion: "Contador",
        salario: 5500000
    }
 ]; */

 //mostrar información en el navegador
// let datos = JSON.parse(localStorage.getItem("info"));
//  let info = [];
//  if(datos != null){
//     info = datos;
//  }

//  info.forEach((d,i)=>{
//     document.write(
//              `Id: ${i+1}`
//              `Nombre: ${d.nombre}` <br>
//              `Profesión: ${d.profesion}` <br>
//              `Salario: ${d.salario}` `
//              <hr>`
//              );
//  });
    
     
// //Guardar información en localStorage
// localStorage.setItem("info",JSON.stringify(informacion));
// alert("Datos guardados con éxito");

// let datos = JSON.parse(localStorage.getItem("info"));

// document.write(
//     `Nombre: ${datos.nombre}` <br>
//     `Profesión: ${datos.profesion}` <br>
//     `Salario: ${datos.salario}` 
//     );

// //borrar datos guardados en localStorage
// localStorage.removeItem("informacion");

// Declaración de variables
let nombrePro = document.querySelector(".nombre-producto");
let precioPro = document.querySelector(".precio-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let imagenPro = document.querySelector(".imagen-producto");
let botonGuardar = document.querySelector(".btn-guardar");
let btnActualizar = document.querySelector(".btn-actualizar");
let d = document;
let buscador = d.querySelector(".buscar-producto");
let tabla = d.querySelector(".table > tbody");


botonGuardar.addEventListener('click', function(){
    //alert(nombrePro.value);
    let datos = obtenerProductos();
    if(datos!=null){
        guardarDatos(datos);
    }
    borrarTabla();
    mostrarDatos();
});

//función para obtener todos los datos del formulario
function obtenerProductos(){

    if(nombrePro.value == "" || precioPro.value == "" ||
    presentacionPro.value == "" || imagenPro.value == ""){
        alert("Todos los campos son obligatorios");
    }else{
        let producto = {
            nombre: nombrePro.value,
            precio: precioPro.value,
            presentacion: presentacionPro.value,
            imagen: imagenPro.value
        }
        nombrePro.value="";
        precioPro.value="";
        presentacionPro.value="";
        imagenPro.value="";
    
        return producto;
    }
}

let listaPedidos = "Pedidos";
//Función que se encarga de guardar los datos en el localStorage
function guardarDatos(datos){
    let pedidos = [];
    if(localStorage.getItem(listaPedidos)===null){
        pedidos.push(datos)
    }else{
        let pedidosPrevios =  JSON.parse(localStorage.getItem(listaPedidos));
        if(pedidosPrevios!=null){
            pedidos = pedidosPrevios;
            pedidos.push(datos)
        }
    }
    localStorage.setItem(listaPedidos,JSON.stringify(pedidos));
    alert("Producto guardado con éxito");
}

//Función para extraer los datos guardados en el localStorage
function mostrarDatos(){
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listaPedidos));
    if(pedidosPrevios!=null){
        pedidos = pedidosPrevios;
    } 
    //mostrar los datos en la tabla
    pedidos.forEach((p, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${p.nombre}</td>
            <td> ${p.precio}</td>
            <td> ${p.presentacion}</td>
            <td><img src="${p.imagen}" width="20%" /></td>
            <td>
                <span class="btn-editar btn" onclick="actualizarPedido(${i})">✏️</span>
            </td>
            <td>
            <span class="btn-eliminar btn" onclick="eliminarPedido(${i})">❌</span>
            </td>
        `;
        tabla.appendChild(fila);        
    });
}

//Función para eliminar un pedido de la tabla
function eliminarPedido(posicion){
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listaPedidos));
    if(pedidosPrevios!=null){
        pedidos = pedidosPrevios;
    } 
    //Confirmar pedido a eliminar
    let confirmar = confirm("¿Deseas eliminar este producto "
                             +pedidos[posicion].nombre+"?");

    if (confirmar){
        let p = pedidos.splice(posicion,1);
        alert("Producto eliminado correctamente.");
        //Guardar los datos que quedaron en el localStorage
        localStorage.setItem(listaPedidos,JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }

}   

//Función actualizar producto en el localStorage
function actualizarPedido(posicion){
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listaPedidos));
    if(pedidosPrevios!=null){
        pedidos = pedidosPrevios;
    }
   
    // Pasar los datos al formulario para editar
    nombrePro.value = pedidos[posicion].nombre;
    precioPro.value = pedidos[posicion].precio;
    presentacionPro.value= pedidos[posicion].presentacion;
    imagenPro.value = pedidos[posicion].imagen;
     //Seleccionar el botón actualizar
     btnActualizar.classList.remove("d-none");
     botonGuardar.classList.add("d-none");
    
    //Agregar evento al botón de actualizar
    btnActualizar.addEventListener('click',function(){
        pedidos[posicion].nombre = nombrePro.value;
        pedidos[posicion].precio = precioPro.value;
        pedidos[posicion].presentacion = presentacionPro.value;
        pedidos[posicion].imagen = imagenPro.value;    

        nombrePro.value="";
        precioPro.value="";
        presentacionPro.value="";
        imagenPro.value="";

        btnActualizar.classList.toggle("d-none");
        botonGuardar.classList.toggle("d-none");

        //Guardar los datos editados en localStorage
        localStorage.setItem(listaPedidos,JSON.stringify(pedidos));
        alert("Los datos del producto fueron actualizados con éxito"); 

        borrarTabla();
        mostrarDatos();
        
    }); 
    
}

buscador.addEventListener("keyup", function() {
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listaPedidos));
    if(pedidosPrevios!=null){
        pedidos = pedidosPrevios;
    } 
    //mostrar los datos en la tabla
    borrarTabla();
    const texto = (buscador.value).toLowerCase();
    let i = 0;
    for(let producto of pedidos){
        let nombreP = (producto.nombre).toLowerCase();
        if(nombreP.indexOf(texto) !==-1){
            let fila = d.createElement("tr");
            fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${producto.nombre}</td>
            <td> ${producto.precio}</td>
            <td> ${producto.presentacion}</td>
            <td><img src="${producto.imagen}" width="20%" /></td>
            <td>
                <span class="btn-editar btn" onclick="actualizarPedido(${i})">✏️</span>
            </td>
            <td>
            <span class="btn-eliminar btn" onclick="eliminarPedido(${i})">❌</span>
            </td>
        `;
            tabla.appendChild(fila); 
            i++;   
        }
    }
    
});

    
//Quitar los datos de la tabla
function borrarTabla(){
    let filas = d.querySelectorAll(".table tbody tr");
    filas.forEach((f)=>{
        f.remove();
    });
}


//Mostrar datos del localStorage al recargar la página
d.addEventListener('DOMContentLoaded', function () {
    borrarTabla();
    mostrarDatos();
});
