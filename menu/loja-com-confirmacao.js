import { verificaSePossuiDinheiro, verificaProblemasNaCompra, comprarItem } from '../src/loja/loja'
import { verificarSeHaItemMesmoTipoEquipado } from '../src/personagens/equipamentos'
import { menuConfirmarCompra } from './menu'

export async function realizarCompraComConfirmacao(idItem, idPersonagem, personagens, loja, expansoes) {
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
    if( infoItemMesmoTipoAnterior.item )
    {
      if( !(await menuConfirmarCompra(item, infoItemMesmoTipoAnterior,idPersonagem,personagens)) )
      {
        throw new Error('Compra cancelada!');
      }
    }
    
    const personagemComNovoItem = comprarItem( personagem, item, infoItemMesmoTipoAnterior.index);
    return {
      personagem: personagemComNovoItem
    };
  }