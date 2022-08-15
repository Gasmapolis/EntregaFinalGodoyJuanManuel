class Carrito {
    constructor(id) {
        this.id = id;
        this.producto = [];
    }

    calcularTotal() {
        let total = 0;
        for (let i = 0; i < this.producto.length; i++) {
            total = total + this.producto[i].precio;
        }
        return total;
    }
}
let carrito = new Carrito(1);

let listaProductos = [];
let catalogo = [];

function cargarData(data){
    data.forEach((prod) =>{
        catalogo.push(prod)
    } )
}

function cargarLista(data){
    data.forEach((prod) =>{
        listaProductos.push(prod)
    } )
}



const cardsDiv = document.querySelector("#catalogo");
function crearCatalogo(){
    catalogo.forEach((producto) => {
        cardsDiv.innerHTML += `    
        <div class=" tarjeta card m-4 col-6 col-md-3 col-sm-4 p-4" style="width:13rem;">
            <img src="./images/${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio}</p>
                <a class="btn btn-primary botonCompra" id="${producto.id}">COMPRAR</a>
            </div>
        </div>
        `;
        renovarStorage()
    });
    botonCompra()
}



function botonCompra(){
    const botones = document.querySelectorAll(".botonCompra");
    const arrayDeBotones = Array.from(botones);
    arrayDeBotones.forEach((boton) => {
    
    boton.addEventListener("click", (e) => {
        const productoSeleccionado = catalogo.find(
            (producto) => producto.id == e.target.id
        );
        const enCarrito = carrito.producto.find((producto) => producto.id == e.target.id)
        const revisarCarrito = carrito.producto.some((producto) => producto.id == e.target.id)
        Toastify({

            gravity: "bottom",
            position: "right", 
            text: `${productoSeleccionado.nombre} a sido agregado al carrito`,
            
            duration: 1500
            
            }).showToast();

        revisarCarrito ? sumar(enCarrito) && actualizarCarrito(carrito) : carrito.producto.push(productoSeleccionado) && sumar(productoSeleccionado)
        limpiarCarrito();
        actualizarCarrito(carrito);
        total();
    });
});
}
// BOTON VACIAR CARRITO DENTRO DEL MODAL //


function vaciarCarrito(){
    carrito.producto.forEach((producto) => {
        producto.cantidad = 0
    })
    listaProductos.forEach((producto) => {
        producto.cantidad = 0
    })
    carrito.producto.length = 0;
}

function totales(){
    let totalTotal = 0 
    carrito.producto.forEach((producto)=> {
        const total = producto.precio * producto.cantidad
        totalTotal += total
        
    })
        return totalTotal
}



function actualizarCarrito(carrito) {
    const divCarrito = document.querySelector("#carrito-contenedor");
    carrito.producto.forEach((producto) => {
        divCarrito.innerHTML += `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td><button id="${producto.id}" class="botonSumar btn btn-success"><i id="${producto.id}" class="fa-solid fa-plus"></i></button></td>
        <td class="text-center"><span>${producto.cantidad}</span></td>        
        <td><button id="${producto.id}" class="botonRestar btn btn-danger"><i id="${producto.id}" class="fa-solid fa-minus"></i></button></td>
        <td>${totalProducto(producto.precio,producto.cantidad)}</td>        
        <td class=""><button id="${producto.id}" class="botonBorrar btn btn-danger"><i  id="${producto.id}" class="fa-regular fa-trash-can"></i></button></td>`;
    });
    function cantidad(){
        let cantidad = 0
        const carritos = carrito.producto.forEach((prod) => {
            cantidad += prod.cantidad
        })
        return cantidad
    }
    const cantidadCarrito = document.getElementById('cantidadCarrito')
    cantidadCarrito.innerHTML = `${cantidad()}`

    const botonSumar = document.querySelectorAll(".botonSumar");
    const arrayDeBotonSumar = Array.from(botonSumar);
    arrayDeBotonSumar.find((boton) => {
        boton.addEventListener("click", (e) => {
            const item = carrito.producto.find((producto) => producto.id == e.target.id);
            const revisarCarrito = carrito.producto.some((producto) => producto.id == e.target.id)

            revisarCarrito ? sumar(item) && actualizarCarrito(carrito) : console.log(item)

            limpiarCarrito();
            actualizarCarrito(carrito);
            total();
        })   
    })

    const botonBorrar = document.querySelectorAll(".botonBorrar");
    const arrayDeBotonBorrar = Array.from(botonBorrar);
    arrayDeBotonBorrar.find((boton) => {
        boton.addEventListener("click", (e) => {
            const item = carrito.producto.find((producto) => producto.id == e.target.id);
            item.cantidad = 0
            eliminar(item)
            limpiarCarrito()
            actualizarCarrito(carrito)
            total()
        })
    })

    const botonRestar = document.querySelectorAll(".botonRestar");
    const arrayDeBotonRestar = Array.from(botonRestar);
    arrayDeBotonRestar.find((boton) => {
        boton.addEventListener("click", (e) => {
            const item = carrito.producto.find((producto) => producto.id == e.target.id);
            const revisarCarrito = carrito.producto.some((producto) => producto.id == e.target.id)
            revisarCarrito ? restar(item) && actualizarCarrito(carrito) : eliminar(item)
            item.cantidad == 0 ? eliminar(item) : console.log(carrito)


            console.log(item);

            limpiarCarrito();
            actualizarCarrito(carrito);
            total();
        });
    });

    const botonPago = document.getElementById ('botonPago')
    botonPago.innerHTML = `<a><button type="button" id="botonPagando" class="btn btn-primary"><img class="carritoButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAB7ElEQVRoge2ZyysFURzHP+OZyIKUkJSVkg3KwkKRLK4tO89sbWxQFkpSCvkrZGVrgYXHxpIsZSEL2c31flyLcy7jNu7cM6e5c+J86jTdM7/f6ftpXnfuBYvFYrFYLL4MAgdAEkgZNpLAPpAIklg2IGyuY+k3iUEDwqkO3yNzYEAw1bGXDu94RFygws/QYFygEn6KpOLJoo0DUBB3CovFYlHC3n5N48+IFOVY5wSXZCXy0/bfHRHjbwR/5ohYkTzxLEcgJoq8A1tAB1AuR4ece/Op75M1X8T92noHrAFNWSQbgRXgOqP3xQSRDWAAKMkikIkDdAGrco0nE0RqFAQyqZVr3JlwjdRr9DbIrREidRq9aZFLr0hSY0EdWjV62+X2wityqrGgDr0avf1ye+KdTBDPxX4PlIaQqEY8V16AqsydSzHJDIUQmZG9u78VJBC/qbp5FDlWlCgCrmTvsGJvJJQBN4hA3Qp9k7LnitxfRSJnGhHqDCjOob4auJU94xHmUqYUOEcEWwiodYBtWXsEFEYbTZ1O4BXxzTfb32qzCAkXaM5DrlCkTzEX6PHZP4UQ/QBG85grFJsImQdgRM45wDxCIgXMxRNNDQdY5/u2vAXseD4vxhctHGPAI98Cj8BErIk0aEM8KA+BlqDiT3a8sbDnNGpzAAAAAElFTkSuQmCC"></button></a>
                        <a><button type="button" id="vaciar-carrito" class="btn btn-danger"><img class="carritoButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAFr0lEQVR4nO2cS2wWVRTHf4BCq6VV5BH6FETd4AMNRqIQXDQQG9GViTFWFyauXJgAmshKlro0UaMb4wJro8YICppGfFKjK6z4LgqCFtpoK4qNtp+Lc67ffNP52rnznub+kpth7txz58y/5z5nPsDhcDgcDofD4ZhJO9APTAAVYBL4GXgf2AOsy8+14tMOjCHC1Uv/Ai8DbTn5WGj6EZHeRARqA/Zr3pfA88Bfej4K3J6Pm8XFNFtvdHVo3m96vhp4jWrzvjNLB4vOOCJMuyfPCPi7r+xezf8TuDoT70rAq4go+xER24EDmtcfUP4FvXYkofs3I38wWzrUNneuQvo2/8AxRvDo24SM0BVgW8x7NyN/iGGgy8KuS22OUBAR24A+pDmPI5E329TlEUTA12Pc04hn/mBhRTTiGbvCiGjDKmAaEfvCCPZe8YaBQcKJ6BVv0PPvUop4DHH+Bks7v3hddfL8eMUzggXllYZ9iOP3W9p1UBtF5qFbqBWx02PTSbBQzdRGb5TBKDceRxx/KoJtB/C92n8OXKr53kj8CVhjWbZU7ECcPxTR3t/8WjTfH4lBkecvYzOCR2JBCnWuQZyfAk4DZzSNajoLjHjOR/V83FNHF/Ce1jUIbNfrLcBB4GYtN4hMmSZ8144DtyERWDoWUF0G2qR3gEZPPXNFYq6RZ0gjAgE+ATYB9wHfACuA5ZpWalruSasQMd5F1tPntZ5O4DDBkQgzo/I4sBU4odcbkKWlifTJpB/0gqQrVL5ABFwGfBbSZgki5mKqAp5ABDmMCHSQqogwu3iNwBtAt+ceE8zsPs4g3cpZaruUUWRtPytpCTikx/UWNpPAqYT9+AU4SrUFNGu6MqT9eeQZhusVSKsJb0UGgUEkEqMStwn7uYTa7mMF0n14u5OVQCuyVferHjNnGdKhnwMWRqyj3jzPDBhpzv0e1LpeiVlPLE6pE2sj2HYyu3iVgGtJivii1vNwjDpi87Y6cZelXZSJdL0yUaczpu7rI9onwpPqxB4Lm07gB2aPrh9JdynXRnXXfZGlbaL0qiN9IcsnsZlgIjHOZsI9anfAwiYVNqgjx0KWD4qcMNEUFIn1IjkMz6jdYxY2qdAA/KOpIaRNETZUh9T2Fku7VPgKcWaDhY1/Sz9sP+aNxCiRBzL9mkLedy+xtE2FPuRhei3tjIi2g4ARMYp4IDOGCrIICEVaSznDEHA3dks6kDXrNmRQOGlhdxLZxhrXOmy5VY8fhjVIW8Cjerw2gu0E0USwEdzPFj1+EKOORFmLNImkNwnSoInqoLc0Z1/+x7u5elnOvsxFN+LnpzZGURf6YfHOA237wazZrMfQ/R+kLyDI5irANRncKw6m/3MCRmAxsBFpMR/ZGDoBhY3ARciHo2M2hlkKuJ70dsDjEqn5QjYCjiJb40uByzO4XxQiDSBZcgjpX3b48j+m1umsz0FWO+eQr8qsP5bPIgKhfj84jQib1znAQ8DFyPyvsBP+BxDH9+XtiI9u5HVqBbgjZ19m5UbEyaG5CmZAE3AT8ByybKsAz+bqUQgakR/l2H4vk3aaQt7dZNWVxeJr8hesgjTZYeRXBbm+dbPF/PLp3rwdSZIsQ7cMKxJrnIAlYh3ShOt9+OOYg4XIjL9CtBc+hSTLJjxNeTZXQ5P1/Gfe9YN5CXhdxvedN2xC+sDT5PzlU1lZBHyHiPhEzr6Ulu3IGnQaeAnZaCjEdyhlohf5Aj7vdbE/lYorgKeBb6ludOadSslmxPm/gZ3IzwpWA7s0r0L1nUVYtqRQZ2F5C3mgnQHXdus1289tzQfuSdZZWEaQBzI/aPG++GnVayMFqDOQIuzENvrOg178+MvkUWdhGUAeblfAtUf12kAB6iwsPVQ7/N1IE2tFHtS8MespQJ2FxvzXUUFpb4HqLDQ9SLP6Q9MA8aMkjTodDofD4XA45gP/AfxKqxnPuZtUAAAAAElFTkSuQmCC"></button></a>`
    const pagar = document.getElementById('botonPagando')
    pagar.addEventListener("click", (e) => {
        (async () => {

            /* inputOptions can be an object or Promise */
            const inputOptions = new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  '0.85': 'Efectivo (Descuento del 15%)',
                  '1': 'Transferencia',
                  '1.15': 'Tarjeta de Credito(Recargo del 15%)'
                })
              }, 1000)
            })
            
            const { value: pago } = await Swal.fire({
              title: 'Seleccione su metodo de Pago',
              customClass: {input:'row'},
              input: 'radio',
              inputOptions: inputOptions,
              inputValidator: (value) => {
                if (!value) {
                  return 'Selecciona una opcion por favor!'
                }
              }
            })
            
            if (pago) {
              Swal.fire(`Su Monto final a Pagar es de: $${totales() * pago}`, '' ,'success')
              vaciarCarrito()
            limpiarCarrito();
            actualizarCarrito(carrito)
            total();
            renovarStorage();
             }
             
            })()
            // Swal.fire('MUCHAS GRACIAS POR SU COMPRA')
    })
    const botonVaciar = document.getElementById("vaciar-carrito");
    botonVaciar.addEventListener("click", () => {
    Swal.fire({
        icon: 'warning',
        title: 'ESTAS SEGURO DE VACIAR CARRITO?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'VACIAR',
        denyButtonText: `NO GRACIAS`,
        }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito()
            limpiarCarrito();
            actualizarCarrito(carrito)
            total();
            renovarStorage();
        Swal.fire('CARRITO VACIO', '', 'success')
        } else if (result.isDenied) {
        Swal.fire('Accion cancelada', '', 'info')
        }
    })

});
    renovarStorage()
}


function eliminar(item){
    const indice = carrito.producto.indexOf(item);
    carrito.producto.splice(indice, 1);
}
function sumar(item){
    item.cantidad += 1
    return
}
function restar(item){
    item.cantidad -= 1
    return
}
function totalProducto(a,b){
    let valor = a*b
    return valor
}

function limpiarCarrito() {
    const divCarrito = document.querySelector("#carrito-contenedor");
    divCarrito.innerHTML = "";
    renovarStorage();
}

function total() {
    const precioTotal = document.getElementById(`precioTotal`);
    precioTotal.innerHTML = `
    Precio Total: $<span>${totales()}</span>`;
}

function botonPago(){
    const botonPago = document.getElementById ('botonPago')
    botonPago.innerHTML = `<a><button type="button" id="botonPagando" class="btn btn-primary">Save changes</button></a>`
    const pagar = document.getElementById('botonPagando')
    pagar.addEventListener("click", (e) => {

    })
    
}

function renovarStorage() {
    localStorage.removeItem("carrito");

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

window.addEventListener("DOMContentLoaded", (e) => {

    const storage = JSON.parse(localStorage.getItem("carrito"));
    
    storage == null ? renovarStorage() : storage.producto.forEach((producto) => {
        carrito.producto.push(producto);
    });
    console.log(carrito)
    actualizarCarrito(carrito);
    total();
    obtenerJson()
    
});

async function obtenerJson() {
    try{
    const res = await fetch("https://62e82eb4249bb1284eaaac42.mockapi.io/Productos");
    const data = await res.json()
    const permiso = (carrito.producto.length == 0) ? true : false
    permiso ? cargarLista(data) : console.log("otra lista")
    
    cargarData(data)
    
}catch(error){
    console.log(error)
}

crearCatalogo()
}