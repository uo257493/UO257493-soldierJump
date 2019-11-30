class Enemigo extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo, x, y, imagenes.enemigo_movimiento,imagenes.enemigo_morir, -1)

    }
    puedeDisparar() {
        return super.puedeDisparar(false);
    }
}