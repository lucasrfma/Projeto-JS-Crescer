export function verificarSeHaItemMesmoTipoEquipado(personagem,idNovoItem,items)
{
    const tipoNovoItem = items[idNovoItem-1].tipo;
    const resultado = { index: 0 };
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        let itemEquipado = items[personagem.equipamentos[i]-1];
        if(itemEquipado.tipo === tipoNovoItem)
        {
            resultado.index = i;
            resultado.item = itemEquipado;
            return  resultado;
        }
        resultado.index = i+1;
    }
    resultado.item = 0;
    return resultado;
}

export function equiparItem(personagem, idItem, index)
{
    const novoPersonagem = {...personagem};
    novoPersonagem.equipamentos = [...personagem.equipamentos];
    novoPersonagem.equipamentos[index] = idItem;
    return novoPersonagem;
}
