import { uparPersonagem } from "../personagens/personagens";

export function selecionarMissao(missoes, idMissao, expansoes) {
    let missao
    for(let i = 0; i < missoes.length; i++){
        if(missoes[i].id === idMissao){
            missao = missoes[i]
        }
    }
    if ( missao != null && missao != undefined && missao.hasOwnProperty('idExpansao')) {
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
    
    let countdown = missao.tempoEstimado/1000;
    for( let i = 0; i < countdown ; ++i )
    {
        let reticencias = '.';
        for( let j = 0; j < i % 3; ++j)
        {
            reticencias += '.';
        }
        console.clear();
        console.log(`
            World of E-crescer

        ${mensagem}${reticencias}
            
        ${i} / ${countdown}
            
            `);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.clear();
    console.log(`
            World of E-crescer
        
        ${mensagem}...
    
        ${countdown} / ${countdown}
    
    `);
    
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

export function receberRecompensasMissao(personagem, missao) {
    let clonePersonagem = Object.assign({}, personagem)
    clonePersonagem = uparPersonagem(clonePersonagem, missao.niveisRecebidos)
    clonePersonagem.dinheiro += missao.dinheiroRecebido
    return clonePersonagem
}