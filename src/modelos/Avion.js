class Avion extends Modelo {

    constructor(x, y) {
        super(imagenes.avion, x, y)
        this.orientacion = orientaciones.derecha;
        this.vx = 3;
        this.aIdleDerecha = new Animacion(imagenes.avion_idle_derecha,
            this.ancho, this.alto, 6, 4);
        this.aIdleIzquierda = new Animacion(imagenes.avion_idle_izquierda,
            this.ancho, this.alto, 6, 4);
        this.animacion = this.aIdleDerecha;
    }

    actualizar (){
        this.animacion.actualizar();
        if(this.x + this.ancho/2 >= 480){
            this.vx = -3;
            this.animacion = this.aIdleIzquierda;
        }
        if(this.x -this.ancho/2 <=0){
            this.vx = 3;
            this.animacion = this.aIdleDerecha;
        }
        this.x += this.vx
    }

    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x , this.y - scrollY);
    }

}
