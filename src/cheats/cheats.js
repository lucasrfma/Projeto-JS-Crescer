import { uparPersonagem } from '../personagens/personagens'
import { verificaSePossuiItemDoAtributo, substituiItemMesmoTipo, procuraItemPorTipo } from '../loja/loja'

export function willidan(personagem){
    const personagemAtualizado = uparPersonagem(personagem, 20)
    return personagemAtualizado
}

export function gusthrall(personagem){
    let  personagemAtualizado = { ...personagem }
    personagemAtualizado.dinheiro += 2000
    return personagemAtualizado
}

export function anduinnunes(personagens){
    const personagensAtualizados = [...personagens]
    personagensAtualizados.forEach(personagem => {
        personagem.dinheiro += 20000
    });
    return personagensAtualizados
}

export function julichking(personagens){
    const personagensAtualizados = [ ...personagens ]
    for(let i = 0; i < personagensAtualizados.length; i++){
        personagensAtualizados[i] = uparPersonagem(personagensAtualizados[i], 5)
    }
    return personagensAtualizados
}

export function kevinerzul(personagem){
    const personagemAtualizado = { ...personagem }
    const arco = { id: 26, nome: 'Arco do callback infinito', tipo: 'DANO', aprimoramento: '2000' }
    if(verificaSePossuiItemDoAtributo(personagemAtualizado, arco.tipo)){
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, arco.tipo), arco)
    }else{
        personagemAtualizado.equipamentos.push(arco)
    }
    return personagemAtualizado
}

function recebeTalismaPolimorfismo(personagem){
    const personagemAtualizado = { ...personagem }
    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    if(verificaSePossuiItemDoAtributo(personagemAtualizado, talisma.tipo)){
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, talisma.tipo), talisma)
    }else{
        personagemAtualizado.equipamentos.push(talisma)
    }
    return personagemAtualizado
}

export function fabyoggsaron(personagem){
    const personagemAtualizado = recebeTalismaPolimorfismo(personagem)
    return personagemAtualizado
}

export function pablothar(personagem){
    const personagemAtualizado = recebeTalismaPolimorfismo(personagem)
    return personagemAtualizado
}

export function vitorexxar(personagem){
    const personagemAtualizado = recebeTalismaPolimorfismo(personagem)
    return personagemAtualizado
}

export function recebeTalismaIndexado(personagem){
    const personagemAtualizado = { ...personagem }
    const talisma = { id: 28, nome: 'Talismã Indexado', tipo: 'VIDA', aprimoramento: '2000' }
    if(verificaSePossuiItemDoAtributo(personagemAtualizado, talisma.tipo)){
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, talisma.tipo), talisma)
    }else{
        personagemAtualizado.equipamentos.push(talisma)
    }
    return personagemAtualizado
}

export function zorzarthas(personagem){
    const personagemAtualizado = recebeTalismaIndexado(personagem)
    return personagemAtualizado
}

export function diandraka(personagem){
    const personagemAtualizado = recebeTalismaIndexado(personagem)
    return personagemAtualizado
}

export function sergiorgrim(personagem){
    const personagemAtualizado = { ...personagem }
    const armadura = { id: 29, nome: 'Armadura de Flexbox', tipo: 'VIGOR', aprimoramento: '2000' }
    if(verificaSePossuiItemDoAtributo(personagemAtualizado, armadura.tipo)){
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, armadura.tipo), armadura)
    }else{
        personagemAtualizado.equipamentos.push(armadura)
    }
    return personagemAtualizado
}