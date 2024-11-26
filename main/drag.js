// --- Receba o drag and drop

// Faz um elemento ser arrastável
function makeDragable(element) {
    console.log(element)

    let x_offset = 0, y_offset = 0;
    let original_rect;
    
    element.onmousedown = startDragging;

    function startDragging(e) {
        e.preventDefault();

        original_rect = element.getBoundingClientRect();
        
        x_offset = e.clientX - original_rect.left;
        y_offset = e.clientY - original_rect.top;

        element.style.top = (e.clientY - y_offset) + "px";
        element.style.left = (e.clientX - x_offset) + "px";
        element.style.zIndex = "999";

        // Pra poder mexer na posição dele como eu quiserr
        element.style.position = "absolute";
        
        console.log(original_rect)

        // Quando o botao do mouse sobe 
        document.onmouseup = stopDragging;
        // Chama sempre que o cursor muda de lugar
        document.onmousemove = dragUpdate;
    }

    function dragUpdate(e) {
        e.preventDefault();
        // atualiza posicao do nengue
        element.style.top = (e.clientY - y_offset) + "px";
        element.style.left = (e.clientX - x_offset) + "px";

    }

    function stopDragging(e) {
        const board_list = document.getElementById("wrapper");

        // TODO de duas uma: devolve ele da onde veio, ou bota ele na lista que ele caiu (consigo fazer isso usando achando o offsetTop left height e width, facinho de fazer aabb)

        // reusando codigo copiando assim, nao faça isso
        function getElementClassName(parent, target) {
            for (let i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className === target) {
                    return parent.childNodes[i];
                }
            }
        }

        var collider  = getCollision(e.clientX, e.clientY, board_list.children);
        if ((collider != null)) {// NÂO sendo arrastado pra lugar nenhum
            getElementClassName(collider, "task_list").appendChild(element);
        }
        // stop moving when mouse button is released:
        element.style.position = "static";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}