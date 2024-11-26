// A colisao mais simples da sua vida

// retorna o primeiro e somente o primeiro objeto que o vetor tive dentro
function getCollision(posX, posY, objects) { // como ser typado faz falta 
    for (var i = 0; i<objects.length; i++) {
        var rect = objects[i].getBoundingClientRect();
        // do canto inferior direito (em teoria??)
        var cX = rect.left+rect.width;
        var cY = rect.top+rect.height;

        if ((posX > rect.left) && (posX < cX) && (posY > rect.top) && (posY < cY)) {
            return objects[i];
        }
    }
}