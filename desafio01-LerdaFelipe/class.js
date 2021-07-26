class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    //Retornando el nombre completo
    getFullName(){
        return this.nombre + " " + this.apellido;
    }

    //Agregando una mascota al array de strings
    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    //Retornando el array con las mascotas
    getMascotas(){
        return this.mascotas;
    }

    //Agregando un objeto a libros con su titulo y autor
    addBook(titulo, autor){
        let book = {"titulo": titulo, "autor": autor};
        this.libros.push(book);
    }

    //Retornando un array con unicamente los nombres de los libros
    getBook(){
        let arrayTitulos = [];
        for (let libro of this.libros) {
            arrayTitulos.push(libro.titulo);
        }
        return arrayTitulos;
    }
}

//Create user
let usuario1 = new Usuario("Felipe", "Lerda")
//return fullname
console.log(usuario1.getFullName());

//Add mascota
usuario1.addMascota("Dog");

usuario1.addMascota("Cat");
//return mascota
console.log(usuario1.getMascotas())

//Add book
usuario1.addBook("El señor de los anillos", "Vicente");

usuario1.addBook("Harry Potter", "Camilo");
//return title book
console.log(usuario1.getBook());