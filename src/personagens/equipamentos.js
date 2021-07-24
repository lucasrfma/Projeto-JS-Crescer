/**
 * Recebe um personagem, um id de um item, e a lista de itens.
 * 
 * Retorna um objeto com os seguintes atributos:
 *      .item -> objeto com as informações do item de mesmo tipo já equipado
 *      .index -> o índice a ser usado no array equipamentos para equipar o novo item.
 */
export function verificarSeHaItemMesmoTipoEquipadoByID(personagem,idNovoItem,items)
{
    const tipoNovoItem = _getItemByID(idNovoItem,items).tipo;
    const resultado = { index: 0 };
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(personagem.equipamentos[i].tipo === tipoNovoItem)
        {
            resultado.index = i;
            resultado.item = personagem.equipamentos[i];
            return  resultado;
        }
        resultado.index = i+1;
    }
    resultado.item = 0;
    return resultado;
}

/**
 * Recebe um personagem e um objeto Item
 * 
 * Retorna um objeto com os seguintes atributos:
 *      .item -> objeto Item igual ao item de mesmo tipo já equipado
 *      .index -> o índice a ser usado no array equipamentos para equipar o novo item.
 */
export function verificarSeHaItemMesmoTipoEquipado(personagem,novoItem)
{
    const tipoNovoItem = novoItem.tipo;
    const resultado = { index: 0 };
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(personagem.equipamentos[i].tipo === tipoNovoItem)
        {
            resultado.index = i;
            resultado.item = personagem.equipamentos[i];
            return  resultado;
        }
        resultado.index = i+1;
    }
    resultado.item = 0;
    return resultado;
}

export function equiparItemByID(personagem, idItem, index, items)
{
    const novoPersonagem = {...personagem};
    novoPersonagem.equipamentos = [...personagem.equipamentos];
    novoPersonagem.equipamentos[index] = _getItemByID(idItem,items);
    return novoPersonagem;
}

export function equiparItem(personagem,item,index)
{
    const novoPersonagem = {...personagem};
    novoPersonagem.equipamentos = [...personagem.equipamentos];
    novoPersonagem.equipamentos[index] = item;
    return novoPersonagem;
}

function _getItemByID(id,items)
{
    return items[id-1];
}