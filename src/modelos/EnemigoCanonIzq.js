class EnemigoCanonIzq extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_canon_izquierda, x, y, imagenes.enemigo_canon_izquierda_movimiento,imagenes.enemigo_canon_morir_izquierda, 0, 7, 6)
        this.cadenciaDisparo = 70;
        this.tiempoDisparo = 15;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoCañon(this.x - this.ancho*2/3, this.y, -5);
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

    tieneCanon(){
        return super.tieneCanon(true);
    }

    actualizar(){
        super.actualizar();
        if(this.tiempoDisparo > 0){
            this.tiempoDisparo  --;
        }
    }
}