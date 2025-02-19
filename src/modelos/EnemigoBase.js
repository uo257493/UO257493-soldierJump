class EnemigoBase extends Modelo {

    constructor(imagenIni, x, y, animacionMovimiento, animacionMorir, vxInte, framesMover, framesMorir) {
        super(imagenIni, x, y)

        this.estado = estados.moviendo;
        this.aMover = new Animacion(animacionMovimiento,
            this.ancho, this.alto, 6, framesMover);
        this.aMorir = new Animacion(animacionMorir,
            this.ancho,this.alto,6,framesMorir, this.finAnimacionMorir.bind(this));

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

    tieneCanon(boo){
        return boo;
    }

    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x, this.y - scrollY);
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
