class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.estado = estados.moviendo;
        this.vida = 3;
        this.orientacion = orientaciones.derecha;

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Disparo
        this.cadenciaDisparo = 24;
        this.tiempoDisparo = 0;

        // Animaciones
        this.aIdleDerecha = new Animacion(imagenes.soldado_idle_derecha,
            this.ancho, this.alto, 6, 7);
        this.aIdleIzquierda = new Animacion(imagenes.soldado_idle_izquierda,
            this.ancho, this.alto, 6, 7);
        this.aCorriendoDerecha =
            new Animacion(imagenes.soldado_correr_derecha,
                this.ancho, this.alto, 6, 10);
        this.aCorriendoIzquierda = new Animacion(imagenes.soldado_correr_izquierda,
            this.ancho, this.alto, 6, 10);

        this.aDispararDerecha = new Animacion(imagenes.soldado_disparar_derecha,
            this.ancho, this.alto,1,10,this.finAnimacionDisparar.bind(this) );
// No pasar funciones del DIRECTAMNTE COMO callback
// El objeto que ejecute la función no sabrá interpretar el "this."

        this.aDispararIzquierda = new Animacion(imagenes.soldado_disparar_izquierda,
            this.ancho,this.alto,1,10,this.finAnimacionDisparar.bind(this));



        this.animacion = this.aIdleDerecha;
    }

    actualizar(){
        this.animacion.actualizar();

        // ¿Esta en el aire?
        if (this.choqueAbajo == true){
            this.enElAire = false;
        } else {
            this.enElAire = true;
        }

        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }

        switch (this.estado){
            case estados.disparando:
                if (this.orientacion == orientaciones.derecha) {
                    this.animacion = this.aDispararDerecha;
                }
                if (this.orientacion == orientaciones.izquierda) {
                    this.animacion = this.aDispararIzquierda;
                }
                break;
            case estados.moviendo:
                if ( this.vx != 0 ) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                if ( this.vx == 0){
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aIdleDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aIdleIzquierda;
                    }
                }
                break;
        }




        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }


    }

    saltar(){
        if ( !this.enElAire ) {
            this.vy = -16;
            this.enElAire = true;
        }

    }


    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoJugador(this.x, this.y);
            if ( this.orientacion == orientaciones.izquierda ){
                disparo.vx = disparo.vx*-1; //invertir
            }
            return disparo;

        } else {
            return null;
        }

    }

    finAnimacionDisparar(){
        this.estado = estados.moviendo;
    }


    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x , this.y - scrollY);
    }



}
