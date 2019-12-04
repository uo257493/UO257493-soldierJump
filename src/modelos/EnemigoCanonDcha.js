class EnemigoCanonDcha extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_canon_derecha, x, y, imagenes.enemigo_canon_movimiento,imagenes.enemigo_canon_morir, 0, 7, 6)
        this.cadenciaDisparo = 70;
        this.tiempoDisparo = 15;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoCañon(this.x + this.ancho*8/7, this.y, 5);
            if ( this.vx <0 ){
                disparo.vx = disparo.vx*-1; //invertir
            }
            return disparo;

        } else {
            return null;
        }

    }

    puedeDisparar() {
        return super.puedeDisparar(false);
    }

    actualizar(){
        super.actualizar();
        if(this.tiempoDisparo > 0){
            this.tiempoDisparo  --;
        }
    }

    tieneCanon(){
        return super.tieneCanon(true);
    }
}