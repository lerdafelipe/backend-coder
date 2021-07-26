function User(nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
    this.getFullName = function(){
        console.log(this.nombre + " " + this.apellido);
    }
    this.addMascota = function(mascota){
        this.mascotas.push(mascota);
    }
    this.getMascota = function(){
        console.log(this.mascotas);
    }
    this.addBook = function(titulo, autor){
        let book = {"titulo": titulo, "autor": autor};
        this.libros.push(book);
    }
    this.getBook = function(){
        let arrayTitulos = [];
        for (let libro of this.libros) {
        arrayTitulos.push(libro.titulo);
    }
    console.log(arrayTitulos);
    }
}


//Creando un nuevo usuario
let User1 = new User("Claudio", "Cesar");
//Obteniendo el nombre completo
User1.getFullName();
//agregando mascotas
User1.addMascota("Rabbit");
User1.addMascota("tiger");
//obteniendo mascotas
User1.getMascota();
//agregando libros
User1.addBook("Caperucita Roja", "Clemente");
User1.addBook("El brujito de Gulubú", "Maria Elena Walsh");
//Obteniendo libros
User1.getBook();