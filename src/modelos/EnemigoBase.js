class EnemigoBase extends Modelo {

    constructor(imagenIni, x, y, animacionMovimiento, animacionMorir, vxInte) {
        super(imagenIni, x, y)

        this.estado = estados.moviendo;
        this.aMover = new Animacion(animacionMovimiento,
            this.ancho, this.alto, 6, 3);
        this.aMorir = new Animacion(animacionMorir,
            this.ancho,this.alto,6,8, this.finAnimacionMorir.bind(this));

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vxInteligencia = vxInte;
        this.vx = this.vxInteligencia;
        this.vy = 0;

    }

        finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    actualizar (){
        this.animacion.actualizar();

        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
        }

        if ( this.estado == estados.muriendo) {
            this.vx = 0;
        } else {
            if ( this.vx == 0){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
        }

    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }


    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }

    puedeDisparar(boo){
        return boo;
    }

}
