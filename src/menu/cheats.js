import { uparPersonagem } from '../personagens/personagens'
import { verificaSePossuiItemDoAtributo, substituiItemMesmoTipo, procuraItemPorTipo } from '../loja/loja'
import { nenhumPersonagemSelecionado } from '../../menu/menu'
import { useLocalStorage } from '../services/local-storage/use-local-storage';

const cheats = ['anduinnunes', 'willidan', 'julichking', 'gusthrall', 'fabyoggsaron', 'kevinerzul', 'pablothar', 'vitorexxar', 'zorzarthas', 'diandraka', 'sergiorgrim', 'geffbeijos']
const globalCheats = ['anduinnunes', 'julichking', 'geffbeijos']

export function tratarCheats(input, idPersonagem, personagens, registro = 'personagens')
{
    if(verificarCheat(input))
    {
        if( verificaCheatGlobal(input) || idPersonagem != nenhumPersonagemSelecionado )
        {
            utilizarCheat(input,idPersonagem,personagens,registro);
            console.log('\nCheat ' + input + ' Ativado');
            return true;
        }
        console.log('Não é possível utilizar este comando aqui');
    }
    return false;
}

export function utilizarCheat(input,idPersonagem,personagens, registro = 'personagens')
{
    const localStorage = useLocalStorage();
    if( verificaCheatGlobal(input) )
    {
        let personagensAtualizados = utilizarCheatPersonagens(input,personagens);
        localStorage.setObject(registro,personagensAtualizados);
    }
    else
    {
        personagens[idPersonagem] = utilizarCheatPersonagem(input, personagens[idPersonagem]);
        localStorage.setObject(registro,personagens);
    }
}

export function verificarCheat(input) {
    return cheats.includes(input.toLowerCase());
}

export function verificaCheatGlobal(input){
    return globalCheats.includes(input.toLowerCase());
}

export function utilizarCheatPersonagens(input, personagens) {
    let personagensAtualizados
    if (input.toLowerCase() === 'anduinnunes') {
        personagensAtualizados = anduinnunes(personagens)
    } else if (input.toLowerCase() === 'julichking') {
        personagensAtualizados = julichking(personagens)
    } else if (input.toLowerCase() === 'geffbeijos') {
        personagensAtualizados = geffbeijos(personagens)
    }
    return personagensAtualizados
}

export function utilizarCheatPersonagem(input, personagem) {
    let personagemAtualizado
    if (input.toLowerCase() === 'willidan') {
        personagemAtualizado = willidan(personagem)
    } else if (input.toLowerCase() === 'gusthrall') {
        personagemAtualizado = gusthrall(personagem)
    } else if (input.toLowerCase() === 'kevinerzul') {
        personagemAtualizado = kevinerzul(personagem)
    } else if (input.toLowerCase() === 'fabyoggsaron') {
        personagemAtualizado = fabyoggsaron(personagem)
    } else if (input.toLowerCase() === 'pablothar') {
        personagemAtualizado = pablothar(personagem)
    } else if (input.toLowerCase() === 'vitorexxar') {
        personagemAtualizado = vitorexxar(personagem)
    } else if (input.toLowerCase() === 'zorzarthas') {
        personagemAtualizado = zorzarthas(personagem)
    } else if (input.toLowerCase() === 'diandraka') {
        personagemAtualizado = diandraka(personagem)
    } else if (input.toLowerCase() === 'sergiorgrim') {
        personagemAtualizado = sergiorgrim(personagem)
    }
    return personagemAtualizado;
}

export function willidan(personagem) {
    const personagemAtualizado = uparPersonagem(personagem, 20)
    return personagemAtualizado
}

export function gusthrall(personagem) {
    let personagemAtualizado = { ...personagem }
    personagemAtualizado.dinheiro += 2000
    return personagemAtualizado
}

export function anduinnunes(personagens) {
    const personagensAtualizados = [...personagens]
    personagensAtualizados.forEach(personagem => {
        personagem.dinheiro += 20000
    });
    return personagensAtualizados
}

export function geffbeijos(personagens) {
    const personagensAtualizados = [...personagens]
    personagensAtualizados.forEach(personagem => {
        personagem.dinheiro += 2000000
    });
    return personagensAtualizados
}

export function julichking(personagens) {
    const personagensAtualizados = [...personagens]
    for (let i = 0; i < personagensAtualizados.length; i++) {
        personagensAtualizados[i] = uparPersonagem(personagensAtualizados[i], 5)
    }
    return personagensAtualizados
}

export function kevinerzul(personagem) {
    const personagemAtualizado = { ...personagem }
    const arco = { id: 26, nome: 'Arco do callback infinito', tipo: 'DANO', aprimoramento: '2000' }
    if (verificaSePossuiItemDoAtributo(personagemAtualizado, arco.tipo)) {
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, arco.tipo), arco)
    } else {
        personagemAtualizado.equipamentos.push(arco)
    }
    return personagemAtualizado
}

function recebeTalismaPolimorfismo(personagem) {
    const personagemAtualizado = { ...personagem }
    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    if (verificaSePossuiItemDoAtributo(personagemAtualizado, talisma.tipo)) {
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, talisma.tipo), talisma)
    } else {
        personagemAtualizado.equipamentos.push(talisma)
    }
    return personagemAtualizado
}

export function fabyoggsaron(personagem) {
    const personagemAtualizado = recebeTalismaPolimorfismo(personagem)
    return personagemAtualizado
}

export function pablothar(personagem) {
    const personagemAtualizado = recebeTalismaPolimorfismo(personagem)
    return personagemAtualizado
}

export function vitorexxar(personagem) {
    const personagemAtualizado = recebeTalismaPolimorfismo(personagem)
    return personagemAtualizado
}

export function recebeTalismaIndexado(personagem) {
    const personagemAtualizado = { ...personagem }
    const talisma = { id: 28, nome: 'Talismã Indexado', tipo: 'VIDA', aprimoramento: '2000' }
    if (verificaSePossuiItemDoAtributo(personagemAtualizado, talisma.tipo)) {
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, talisma.tipo), talisma)
    } else {
        personagemAtualizado.equipamentos.push(talisma)
    }
    return personagemAtualizado
}

export function zorzarthas(personagem) {
    const personagemAtualizado = recebeTalismaIndexado(personagem)
    return personagemAtualizado
}

export function diandraka(personagem) {
    const personagemAtualizado = recebeTalismaIndexado(personagem)
    return personagemAtualizado
}

export function sergiorgrim(personagem) {
    const personagemAtualizado = { ...personagem }
    const armadura = { id: 29, nome: 'Armadura de Flexbox', tipo: 'VIGOR', aprimoramento: '2000' }
    if (verificaSePossuiItemDoAtributo(personagemAtualizado, armadura.tipo)) {
        substituiItemMesmoTipo(personagemAtualizado.equipamentos, procuraItemPorTipo(personagemAtualizado.equipamentos, armadura.tipo), armadura)
    } else {
        personagemAtualizado.equipamentos.push(armadura)
    }
    return personagemAtualizado
}