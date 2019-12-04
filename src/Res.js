var cache = [];

// Lista re recursos a precargar
var imagenes = {
    soldado_idle_derecha:"res/soldado_idle_derecha.png",
    soldado_idle_izquierda:"res/soldado_idle_izquierda.png",
    soldado_correr_derecha:"res/soldado_correr_derecha.png",
    soldado_correr_izquierda:"res/soldado_correr_izquierda.png",
    soldado_disparar_derecha:"res/soldado_disparo_derecha.png",
    soldado_disparar_izquierda:"res/soldado_disparo_izquierda.png",
    furor: "res/soldado_furor.png",
    icono_furor: "res/furor.png",
    icono_pincel: "res/pincel.png",
    jugador : "res/jugador.png",
    fondo : "res/fondo.png",
    enemigo_derecha : "res/enemigo_derecha.png",
    enemigo_canon_derecha : "res/enemigo_canon_derecha.png",
    enemigo_izquierda : "res/enemigo_izquierda.png",
    enemigo_canon_izquierda : "res/enemigo_canon_izquierda.png",
    enemigo_movimiento : "res/enemigo_idle_derecha.png",
    enemigo_canon_movimiento : "res/enemigo_canon_idle_derecha.png",
    enemigo_izquierda_movimiento : "res/enemigo_idle_izquierda.png",
    enemigo_canon_izquierda_movimiento : "res/enemigo_canon_idle_izquierda.png",
    disparo_soldado : "res/bullet.png",
    disparo_canon : "res/disparo_canon.png",
    disparo_enemigo : "res/disparo_enemigo.png",
    icono_puntos : "res/icono_puntos.png",
    icono_vidas : "res/icono_vidas.png",
    icono_recolectable : "res/icono_recolectable.png",
    animacion_recolectable : "res/recolectable.png",
    fondo_2 : "res/normandia.png",
    jugador_saltando_derecha : "res/jugador_saltando_derecha.png",
    jugador_saltando_izquierda : "res/jugador_saltando_izquierda.png",
    enemigo_morir : "res/enemigo_morir_derecha.png",
    enemigo_canon_morir : "res/enemigo_canon_morir_derecha.png",
    enemigo_morir_izquierda : "res/enemigo_morir_izquierda.png",
    enemigo_canon_morir_izquierda : "res/enemigo_canon_morir_izquierda.png",
    bloque_tierra : "res/plataforma.png",
    bloque_hielo : "res/bloque_hielo.png",
    bloque_metal : "res/bloque_metal.png",
    bloque_fondo_muro : "res/bloque_fondo_muro.png",
    bloque_pincel : "res/bloque_pincel.png",
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
    avion_derecha: "res/avion_derecha.png",
    avion_idle_derecha: "res/avion_idle_derecha.png",
    avion_idle_izquierda: "res/avion_idle_izquierda.png",

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
