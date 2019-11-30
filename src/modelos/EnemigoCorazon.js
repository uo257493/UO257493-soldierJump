class EnemigoCorazon extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_corazon, x, y, imagenes.enemigo_corazon_movimiento, imagenes.enemigo2_morir, -3)
        this.cadenciaDisparo = 200;
        this.tiempoDisparo = 0;
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