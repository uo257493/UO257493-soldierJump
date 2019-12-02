var cache = [];

// Lista re recursos a precargar
var imagenes = {
    soldado_idle_derecha:"res/soldado_idle_derecha.png",
    soldado_idle_izquierda:"res/soldado_idle_izquierda.png",
    soldado_correr_derecha:"res/soldado_correr_derecha.png",
    soldado_correr_izquierda:"res/soldado_correr_izquierda.png",
    soldado_disparar_derecha:"res/soldado_disparo_derecha.png",
    soldado_disparar_izquierda:"res/soldado_disparo_izquierda.png",
    jugador : "res/jugador.png",
    fondo : "res/fondo.png",
    enemigo_derecha : "res/enemigo_derecha.png",
    enemigo_corazon : "res/enemigo2.png",
    enemigo_corazon_movimiento : "res/enemigo2_movimiento.png",
    enemigo_movimiento : "res/enemigo_idle_derecha.png",
    disparo_soldado : "res/bullet.png",
    disparo_enemigo : "res/disparo_enemigo.png",
    icono_puntos : "res/icono_puntos.png",
    icono_vidas : "res/icono_vidas.png",
    icono_recolectable : "res/icono_recolectable.png",
    animacion_recolectable : "res/recolectable.png",
    fondo_2 : "res/normandia.png",
    jugador_saltando_derecha : "res/jugador_saltando_derecha.png",
    jugador_saltando_izquierda : "res/jugador_saltando_izquierda.png",
    enemigo_morir : "res/enemigo_morir_derecha.png",
    enemigo2_morir : "res/enemigo2_morir.png",
    bloque_tierra : "res/plataforma.png",
    bloque_hielo : "res/bloque_hielo.png",
    bloque_metal : "res/bloque_metal.png",
    bloque_fondo_muro : "res/bloque_fondo_muro.png",
    cloud : "res/nube.png",
    pad :"res/pad.png",
    boton_disparo : "res/boton_disparo.png",
    boton_salto : "res/boton_salto.png",
    boton_pausa : "res/boton_pausa.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    mensaje_como_jugar : "res/mensaje_como_jugar.png",
    mensaje_ganar : "res/mensaje_ganar.png",
    mensaje_perder : "res/mensaje_perder.png",
    punto_salva: "res/punto_salva.png",
    avion: "res/avion.png",

};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
