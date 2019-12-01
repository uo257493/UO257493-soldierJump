class GameLayer extends Layer {

    constructor() {
        super();
        this.puntoSalva = new Object();
        this.puntoSalva.x = 0;
        this.puntoSalva.y = 0;
        this.puntoSalva.activo = false;

        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(1);

        this.botonSalto = new Boton(imagenes.boton_salto,480*0.9,320*0.55);
        this.botonDisparo = new Boton(imagenes.boton_disparo,480*0.75,320*0.83);
        this.pad = new Pad(480*0.14,320*0.8);

        this.ps = null;
        this.scrollY = 0;
        this.bloques = [];
        this.bloquesHielo = [];
        this.recolectables = [];

        this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);

        this.enemigos = [];


        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);
        this.fondoPuntosRecolectables =
            new Fondo(imagenes.icono_recolectable, 480*0.75,320*0.05);


        this.disparosJugador = []
        this.disparosEnemigo = []
        this.puntos = new Texto(0,480*0.9,320*0.07 );
        this.puntosRecolectables = new Texto(0,480*0.8,320*0.07 );
        this.cargarMapa("res/"+nivelActual+".txt");

        if(this.puntoSalva.activo){
            this.jugador.x = this.puntoSalva.x;
            this.jugador.y = this.puntoSalva.y;
        }
    }

    actualizar (){
        this.espacio.actualizar();




        if ( this.copa.colisiona(this.jugador)){
            nivelActual++;
            this.puntoSalva.activo = false;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.iniciar();
        }



        // Jugador se cae del mapa visible, o se sale por los laterales
        if ( this.jugador.x < 0 || this.jugador.x > this.anchoMapa || this.scrollY + 320 < this.jugador.y + this.jugador.alto/2){
            this.iniciar();
        }

        // Eliminar disparos sin velocidad
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }

        for (var i=0; i < this.enemigos.length; i++){
            if(this.enemigos[i] != null && this.enemigos[i].puedeDisparar() && this.enemigos[i].estado != estados.muriendo){
                var nDisparo = this.enemigos[i].disparar();
                if(nDisparo != null) {
                    this.espacio.agregarCuerpoDinamico(nDisparo);
                    this.disparosEnemigo.push(nDisparo);
                }
            }
        }

        // Eliminar disparos sin velocidad
        for (var i=0; i < this.disparosEnemigo.length; i++){
            if ( this.disparosEnemigo[i] != null &&
                this.disparosEnemigo[i].vx == 0){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigo[i]);
                this.disparosEnemigo.splice(i, 1);
            }
        }


        // elementos fuera
        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);

                this.enemigos.splice(j, 1);
                j = j-1;
            }
        }


        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosEnemigo.length; i++){
            if ( this.disparosEnemigo[i] != null &&
                !this.disparosEnemigo[i].estaEnPantalla()){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigo[i]);

                this.disparosEnemigo.splice(i, 1);
                i=i-1;
            }
        }







        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for (var i=0; i < this.recolectables.length; i++){
            this.recolectables[i].actualizar();
        }
        for (var i=0; i < this.disparosEnemigo.length; i++) {
            if(this.disparosEnemigo[i] != null)
                this.disparosEnemigo[i].actualizar();

        }

        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if(this.jugador.colisiona(this.enemigos[i]) && !this.enemigos[i].puedeDisparar())
                this.iniciar();
            if ( this.jugador.colisiona(this.enemigos[i]) &&
                (!this.jugador.saltaSobre(this.enemigos[i])&& this.enemigos[i].puedeDisparar())){
                this.iniciar();
            }

        }

        // colisiones con el punto de salva
        if(this.ps != null){
            if(this.jugador.colisiona(this.ps)){
                this.puntoSalva.activo = true;
                this.puntoSalva.x = this.ps.x;
                this.puntoSalva.y = this.ps.y;
                this.espacio.eliminarCuerpoDinamico(this.ps);
                this.ps = null

            }
        }


        // colisiones derretir hielo
        for (var i=0; i < this.bloquesHielo.length; i++){

            if(this.bloquesHielo[i].tieneEncima(this.jugador) && !this.bloquesHielo[i].pisado){
                this.bloquesHielo[i].pisado = true;
            }
            if(this.bloquesHielo[i].pisado){
                this.bloquesHielo[i].vida --;
            }

            if(this.bloquesHielo[i].vida <= 0){
                this.espacio.eliminarCuerpoEstatico(this.bloquesHielo[i]);
                this.bloquesHielo.splice(i, 1);
                i--;
            }
        }


        // colisiones con recolectables
        for (var i=0; i < this.recolectables.length; i++){
            if ( this.jugador.colisiona(this.recolectables[i])){
                this.espacio.eliminarCuerpoDinamico(this.recolectables[i]);
                this.recolectables.splice(i, 1);
                i--;
                this.puntosRecolectables.valor ++;
            }
        }

        // colisiones , Salto del jugador sobre enemigos que pueden disparar
        for (var j=0; j < this.enemigos.length; j++){
            if (this.enemigos[j] != null &&
                this.enemigos[j].estado != estados.muriendo &&
                this.jugador.saltaSobre(this.enemigos[j]) && this.enemigos[j].puedeDisparar()) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);

                this.enemigos.splice(j, 1);
                j = j-1;

                this.puntos.valor++;

            }
        }



        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.enemigos[j].estado != estados.muriendo &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i-1;
                    this.enemigos[j].impactado();

                    this.puntos.valor++;
                }
            }
        }



        // colisiones , disparoEnemigo - Jugador
        for (var i=0; i < this.disparosEnemigo.length; i++){
            if (this.disparosEnemigo[i] != null &&
                this.disparosEnemigo[i].colisiona(this.jugador)) {

                this.iniciar();
            }

        }




    }

    calcularScroll(){
        // limite abajo
       /* if ( this.jugador.y > 320 * 0.3) {
            this.scrollY = this.jugador.y - 320 * 0.3;

        }*/

        if ( this.jugador.y < this.altoMapa - 320 * 0.3 ) {
            if (this.jugador.y - this.scrollY < 320 * 0.3)
                this.scrollY = this.jugador.y - 320 * 0.3;

        }

    }


    dibujar (){
        this.calcularScroll();

        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollY);
        }
        for (var i=0; i < this.bloquesHielo.length; i++){
            this.bloquesHielo[i].dibujar(this.scrollY);
        }

        for (var i=0; i < this.recolectables.length; i++){
            this.recolectables[i].dibujar(this.scrollY);
        }

        this.copa.dibujar(this.scrollY);
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollY);
        }
        for (var i=0; i < this.disparosEnemigo.length; i++) {
            if(this.disparosEnemigo[i] != null)
                this.disparosEnemigo[i].dibujar(this.scrollY);
        }

        if(this.ps != null)
            this.ps.dibujar(this.scrollY);

        this.jugador.dibujar(this.scrollY);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollY);
        }


        // HUD
        this.fondoPuntos.dibujar();
        this.fondoPuntosRecolectables.dibujar();
        this.puntos.dibujar();
        this.puntosRecolectables.dibujar();

        if ( !this.pausa && entrada == entradas.pulsaciones) {
            this.botonDisparo.dibujar();
            this.botonSalto.dibujar();
            this.pad.dibujar();
        }

    }


    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);

            }


        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.saltar();

        } else if ( controles.moverY < 0 ){


        } else {

        }

    }


    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            this.altoMapa = (lineas.length-1) * 32;
            this.scrollY = this.altoMapa *0.6;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];

                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "C":
                this.copa = new Bloque(imagenes.copa, x,y);
                this.copa.y = this.copa.y - this.copa.alto/2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.copa);
                break;

            case "E":
                var enemigo = new Enemigo(x,y);

                enemigo.y = enemigo.y - enemigo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "K":
                var enemigoC = new EnemigoCorazon(x,y);

                enemigoC.y = enemigoC.y - enemigoC.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigoC);
                this.espacio.agregarCuerpoDinamico(enemigoC);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "R":
                var recolectable = new Recolectable(x,y);
                recolectable.y = recolectable.y - recolectable.alto/2;
                // modificación para empezar a contar desde el suelo
                this.recolectables.push(recolectable);
                this.espacio.agregarCuerpoDinamico(recolectable);
                break;
            case "W":
                var bloque = new BloqueHielo(imagenes.bloque_hielo, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloquesHielo.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "A":
                var pus = new PuntoSalva(imagenes.punto_salva, x,y);
                pus.y = pus.y - pus.alto/2;
                this.ps = pus;
                this.espacio.agregarCuerpoDinamico(this.ps);
                break;
        }
    }

    calcularPulsaciones(pulsaciones){
        // Suponemos botones no estan pulsados
        this.botonDisparo.pulsado = false;
        this.botonSalto.pulsado = false;

        // suponemos que el pad está sin tocar
        controles.moverX = 0;



        for(var i=0; i < pulsaciones.length; i++){
            if (this.pad.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                var orientacionX = this.pad.obtenerOrientacionX(pulsaciones[i].x);
                if ( orientacionX > 20) { // de 0 a 20 no contabilizamos
                    controles.moverX = 1;
                }
                if ( orientacionX < -20) { // de -20 a 0 no contabilizamos
                    controles.moverX = -1;
                }
            }


            if (this.botonDisparo.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonDisparo.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.disparo = true;
                }
            }

            if (this.botonSalto.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonSalto.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }

        }

        // No pulsado - Boton Disparo
        if ( !this.botonDisparo.pulsado ){
            controles.disparo = false;
        }

        // No pulsado - Boton Salto
        if ( !this.botonSalto.pulsado ){
            controles.moverY = 0;
        }
    }


}
