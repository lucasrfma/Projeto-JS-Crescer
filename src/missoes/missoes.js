import { uparPersonagem } from "../personagens/personagens";

export function selecionarMissao(missoes, idMissao, expansoes) {
    let missao
    for(let i = 0; i < missoes.length; i++){
        if(missoes[i].id === idMissao){
            missao = missoes[i]
        }
    }
    if (missao.hasOwnProperty('idExpansao')) {
        if (expansoes.includes(missao.idExpansao)) {
            return missao
        } else {
            return -1
        }
    }
    return missao
}

export async function realizarMissao(personagem, missao) {
    
    let primeira = missao.descricao.substring(0, missao.descricao.indexOf(" "));
    const antiga = primeira
    primeira = primeira.substr(0, primeira.length - 1)
    primeira += 'ndo'
    const mensagem = missao.descricao.replace(antiga, primeira)
    console.log(mensagem)
    
    await waitForCompletion(missao.tempoEstimado);
    // await new Promise(resolve => setTimeout(resolve, missao.tempoEstimado));
    
    const personagemAtualizado = receberRecompensasMissao(personagem, missao)

    if (missao.niveisRecebidos == 0) {
        console.log('Missão concluída, você recebeu ' + missao.dinheiroRecebido + ' de ouro')
    } else if (missao.dinheiroRecebido == 0) {
        console.log('Missão concluída, você recebeu ' + missao.niveisRecebidos + ' níveis')
    } else {
        console.log('Missão concluída, você recebeu ' + missao.dinheiroRecebido + ' de ouro e ' + missao.niveisRecebidos + ' níveis')
    }

    return personagemAtualizado
}

async function waitForCompletion(ms)
{
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


export function receberRecompensasMissao(personagem, missao) {
    let clonePersonagem = Object.assign({}, personagem)
    clonePersonagem = uparPersonagem(clonePersonagem, missao.niveisRecebidos)
    clonePersonagem.dinheiro += missao.dinheiroRecebido
    return clonePersonagem
}