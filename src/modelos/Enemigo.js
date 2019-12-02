class Enemigo extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_derecha, x, y, imagenes.enemigo_movimiento,imagenes.enemigo_morir, 0)

    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoEnemigo(this.x, this.y);
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