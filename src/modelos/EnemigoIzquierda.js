class EnemigoIzquierda extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_izquierda, x, y, imagenes.enemigo_izquierda_movimiento,imagenes.enemigo_morir_izquierda, 0)
        this.cadenciaDisparo = 70;
        this.tiempoDisparo = 15;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoEnemigo(this.x, this.y, -7);
            if ( this.vx <0 ){
                disparo.vx = disparo.vx*-1; //invertir
            }
            return disparo;

        } else {
            return null;
        }

    }

    puedeDisparar() {
        return super.puedeDisparar(true);
    }

    actualizar(){
        super.actualizar();
        if(this.tiempoDisparo > 0){
            this.tiempoDisparo  --;
        }
    }
}