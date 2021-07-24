export function realizarCompra(idItem, idPersonagem, personagens, loja, expansoes) {
  let personagem
  let item
  for(let i = 0; i < personagens.length; i++){
    if(personagens[i].id === idPersonagem){
      personagem = personagens[i]
    }
  }
  for(let i = 0; i < loja.length; i++){
    if(loja[i].id === idItem){
      item = loja[i]
    }
  }
  const personagemAtualizado = Object.assign({}, personagem)
  if (verificaSeJaPossui(personagem.equipamentos, item)) {
    throw new Error('O personagem já possui este item')
  } else if (item.tipo == 'EXPANSAO') {
    const expansoesAtualizado = Object.assign([], expansoes)
    expansoesAtualizado.push(item.idExpansao)
    personagemAtualizado.dinheiro -= item.preco
    return {
      expansoes: expansoesAtualizado,
      personagem: personagemAtualizado
    }
  } else if (verificaSeNecessitaExpansao(item)) {
    if (verificaSePossuiExpansao(item.idExpansao, expansoes)) {
      if (verificaSePossuiRestricaoDeNivel(item)) {
        if (verificaSePossuiNivelNecessario(personagem.nivel, item.lvlMinimo)) {
          if (verificaSePossuiDinheiro(personagem.dinheiro, item.preco)) {
            if (verificaSePossuiItemDoAtributo(personagem, item.tipo)) {
              personagemAtualizado.equipamentos = substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagem.equipamentos, item.tipo), item)
              personagemAtualizado.dinheiro -= item.preco
              return personagemAtualizado
            } else {
              personagemAtualizado.equipamentos.push(item)
              personagemAtualizado.dinheiro -= item.preco
              return personagemAtualizado
            }
          } else {
            throw new Error('Personagem não possui dinheiro suficiente')
          }
        } else {
          throw new Error('Personagem não possui nível suficiente para este item')
        }
      }
      if (verificaSePossuiDinheiro(personagem.dinheiro, item.preco)) {
        if (verificaSePossuiItemDoAtributo(personagem, item.tipo)) {
          personagemAtualizado.equipamentos = substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagem.equipamentos, item.tipo), item)
          personagemAtualizado.dinheiro -= item.preco
          return personagemAtualizado
        } else {
          personagemAtualizado.equipamentos.push(item)
          personagemAtualizado.dinheiro -= item.preco
          return personagemAtualizado
        }
      } else {
        throw new Error('Personagem não possui dinheiro suficiente')
      }
    } else {
      throw new Error('Personagem não possui expansão necessária')
    }
  } else if (verificaSePossuiDinheiro(personagem.dinheiro, item.preco)) {
    if (verificaSePossuiItemDoAtributo(personagem, item.tipo)) {
      personagemAtualizado.equipamentos = substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagem.equipamentos, item.tipo), item)
      personagemAtualizado.dinheiro -= item.preco
      return personagemAtualizado
    } else {
      personagemAtualizado.equipamentos.push(item)
      personagemAtualizado.dinheiro -= item.preco
      return personagemAtualizado
    }
  } else {
    throw new Error('Personagem não possui dinheiro suficiente')
  }
}

export function realizarVenda(idPersonagem, idItem, personagens, loja) {
  let personagem
  let item
  for(let i = 0; i < personagens.length; i++){
    if(personagens[i].id === idPersonagem){
      personagem = personagens[i]
    }
  }
  for(let i = 0; i < loja.length; i++){
    if(loja[i].id === idItem){
      item = loja[i]
    }
  }
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
  const itemProcurado = personagem.equipamentos.find(equipamento => equipamento.tipo == tipoItem)
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
  const posicaoItem = equipamentos.indexOf(item)
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