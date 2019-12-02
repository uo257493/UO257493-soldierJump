class Avion extends Modelo {

    constructor(x, y) {
        super(imagenes.avion, x, y)
        this.vx = 3;
    }

    actualizar (){
        if(this.x + this.ancho/2 >= 480)
            this.vx = -3;
        if(this.x -this.ancho/2 <=0)
            this.vx = 3;
        this.x += this.vx
    }

}
