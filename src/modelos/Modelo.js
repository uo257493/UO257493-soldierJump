class Modelo {

    constructor(imagenRuta, x, y) {
        this.imagen = cache[imagenRuta];
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    estaEnPantalla (){
        if ( (this.x - gameLayer.scrollX) - this.ancho/2 <= 480 &&
            (this.x - gameLayer.scrollX) + this.ancho/2 >= 0 &&
            this.y - this.alto/2 <= 320 &&
            this.y + this.alto/2 >= 0 ){
            return true;
        }
        return false;
    }



    dibujar (scrollY){
        scrollY = scrollY || 0;
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 ,
            this.y - this.imagen.height/2 - scrollY);
    }



    colisiona (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;

        }
        return colisiona;
    }

    saltaSobre (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 <= modelo.y - modelo.alto/2
            && ( modelo.y - modelo.alto/2 )-(this.y + this.alto/2) <= this.alto/2){

            colisiona = true;

        }
        return colisiona;
    }

    tieneEncima(modelo){
        if(modelo.y+modelo.alto/2 == this.y - this.alto/2 &&  modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2){
            return true;

        }

        return false;
    }


}
