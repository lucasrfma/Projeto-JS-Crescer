import { equiparItem, verificarSeHaItemMesmoTipoEquipado } from "../personagens/equipamentos"
import { menuConfirmarCompra } from '../../menu/menu'

export function verificaProblemasNaCompra(personagem,item,expansoes)
{
  if (verificaSeJaPossui(personagem.equipamentos, item)) {
    throw new Error('O personagem já possui este item')
  }
  
  if( verificaSeNecessitaExpansao(item) && 
      !verificaSePossuiExpansao(item.idExpansao, expansoes) ) 
  {
    throw new Error('Personagem não possui expansão necessária');
  }
  
  if( verificaSePossuiRestricaoDeNivel(item) && 
      !verificaSePossuiNivelNecessario(personagem.nivel, item.lvlMinimo)) 
  {
    throw new Error('Personagem não possui nível suficiente para este item');
  }
  
  if( !verificaSePossuiDinheiro(personagem.dinheiro, item.preco) )
  {
    throw new Error('Personagem não possui dinheiro suficiente');
  }
}

// export async function realizarCompraComConfirmacao(idItem, idPersonagem, personagens, loja, expansoes) {
//   const personagem = personagens[idPersonagem]
//   const item = loja.find((item) => {
//     return item.id === idItem
//   })

//   const personagemAtualizado = Object.assign({}, personagem)
//   if (item.tipo == 'EXPANSAO') {
//     const expansoesAtualizado = Object.assign([], expansoes)
//     if(!verificaSePossuiDinheiro(personagem.dinheiro, item.preco)){
//       throw new Error('Personagem não possui dinheiro suficiente')
//     }
//     expansoesAtualizado.push(item.idExpansao)
//     personagemAtualizado.dinheiro -= item.preco
//     return {
//       expansoes: expansoesAtualizado,
//       personagem: personagemAtualizado
//     }
//   }

//   verificaProblemasNaCompra(personagem,item,expansoes);

//   const infoItemMesmoTipoAnterior = verificarSeHaItemMesmoTipoEquipado(personagem,item);
//   if( infoItemMesmoTipoAnterior.item )
//   {
//     if( !(await menuConfirmarCompra(item, infoItemMesmoTipoAnterior,idPersonagem,personagens)) )
//     {
//       throw new Error('Compra cancelada!');
//     }
//   }
  
//   const personagemComNovoItem = comprarItem( personagem, item, infoItemMesmoTipoAnterior.index);
//   return {
//     personagem: personagemComNovoItem
//   };
// }

export function realizarCompra(idItem, idPersonagem, personagens, loja, expansoes) {
  const personagem = personagens[idPersonagem]
  const item = loja.find((item) => {
    return item.id === idItem
  })

  const personagemAtualizado = Object.assign({}, personagem)
  if (item.tipo == 'EXPANSAO') {
    const expansoesAtualizado = Object.assign([], expansoes)
    if(!verificaSePossuiDinheiro(personagem.dinheiro, item.preco)){
      throw new Error('Personagem não possui dinheiro suficiente')
    }
    expansoesAtualizado.push(item.idExpansao)
    personagemAtualizado.dinheiro -= item.preco
    return {
      expansoes: expansoesAtualizado,
      personagem: personagemAtualizado
    }
  }
  
  verificaProblemasNaCompra(personagem,item,expansoes);

  const infoItemMesmoTipoAnterior = verificarSeHaItemMesmoTipoEquipado(personagem,item);
  const personagemComNovoItem = comprarItem( personagem, item, infoItemMesmoTipoAnterior.index);
  return {
    personagem: personagemComNovoItem
  };
}

export function comprarItem(personagem,item,index)
{
  const novoPersonagem = equiparItem(personagem,item,index);
  novoPersonagem.dinheiro -= item.preco;
  return novoPersonagem;
}

export function realizarVenda(idPersonagem, idItem, personagens, loja) {
  const personagem = personagens[idPersonagem]
  const item = loja.find((item) => {
    return item.id === idItem
  })

  const personagemAtualizado = Object.assign({}, personagem)
  vendeItem(personagemAtualizado.equipamentos, item)
  personagemAtualizado.dinheiro += item.preco * 0.5
  return personagemAtualizado
}

export function verificaSeJaPossui(equipamentos, item) {
  if (equipamentos.includes(item)) {
    return true
  }
  return false
}

export function verificaSeNecessitaExpansao(item) {
  if (item.hasOwnProperty('idExpansao')) {
    return true
  }
  return false
}

export function verificaSePossuiExpansao(itemExpansao, expansoes) {
  if (expansoes.includes(itemExpansao)) {
    return true
  }
  return false
}

export function verificaSePossuiItemDoAtributo(personagem, tipoItem) {
  const itemProcurado = personagem.equipamentos.find(equipamento => equipamento.tipo === tipoItem)
  if (itemProcurado != undefined) {
    return true
  }
  return false
}

export function verificaSePossuiRestricaoDeNivel(item) {
  if (item.hasOwnProperty('lvlMinimo')) {
    return true
  }
  return false
}

export function verificaSePossuiNivelNecessario(nivelPersonagem, nivelItem) {
  if (nivelPersonagem >= nivelItem) {
    return true
  }
  return false
}

export function procuraItemPorTipo(equipamentos, tipo) {
  const itemProcurado = equipamentos.find(equipamento => equipamento.tipo == tipo)
  return itemProcurado
}

export function vendeItem(equipamentos, item) {
  const posicaoItem = equipamentos.map((equipamento) => {
    return equipamento.id
  }).indexOf(item.id)
  equipamentos.splice(posicaoItem, 1)
}

export function substituiItemMesmoTipo(equipamentos, itemAtual, novoItem) {
  const posicaoItemAtual = equipamentos.indexOf(itemAtual)
  equipamentos.splice(posicaoItemAtual, 1, novoItem)
  return equipamentos
}

export function verificaSePossuiDinheiro(carteira, valorItem) {
  if (carteira >= valorItem) {
    return true
  }
  return false
}