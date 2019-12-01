class Recolectable extends Modelo {

    constructor(x, y) {
        super(imagenes.icono_recolectable, x, y);
       this.animacion = new Animacion(imagenes.animacion_recolectable,
           this.ancho, this.alto, 3, 8)
    }

    actualizar(){
        this.animacion.actualizar();
        console.log("actualizada");
    }

    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x , this.y - scrollY);
    }
}
