function getElementByClassName(parent, target) {
    for (let i = 0; i < parent.childNodes.length; i++) {
        if (parent.childNodes[i].className === target) {
            return parent.childNodes[i];
        }
    }
}

// Acessar em todos os scripts (carregado primeiro)
let boardElementList = []; // Contém todos os objetos HTML em uma lista
let boardInformationList = []; // Contem os objetos abstratos de uma board
