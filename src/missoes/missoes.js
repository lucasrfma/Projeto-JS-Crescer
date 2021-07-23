import { uparPersonagem } from "../personagens/personagens";

export function selecionarMissao(personagem, missao){
    if(missao.hasOwnProperty('idExpansao')){
        if(personagem.hasOwnProperty('expansoes')){
            if(personagem.expansoes.includes(missao.idExpansao)){
                return missao
            }else{
                return -1
            }
        }else{
            return -1
        }
    }
    return missao
}

export function realizarMissao(personagem, missao){
    let primeira = missao.descricao.substring(0, missao.descricao.indexOf(" "));
    const antiga = primeira
    primeira = primeira.substr(0, primeira.length - 1)
    primeira += 'ndo'
    const mensagem = missao.descricao.replace(antiga, primeira)
    console.log(mensagem)
    const personagemAtualizado = receberRecompensasMissao(personagem, missao)
    setTimeout(function () {
        if(missao.niveisRecebidos == 0){
            console.log('Missão concluída, você recebeu ' + missao.dinheiroRecebido + ' de ouro')
        }else if(missao.dinheiroRecebido == 0){
            console.log('Missão concluída, você recebeu ' + missao.niveisRecebidos + ' níveis')
        }else{
            console.log('Missão concluída, você recebeu ' + missao.dinheiroRecebido + ' de ouro e ' + missao.niveisRecebidos + ' níveis')
        }
    }, missao.tempoEstimado)
    return personagemAtualizado
}

export function receberRecompensasMissao(personagem, missao){
    let clonePersonagem = Object.assign({}, personagem)
    clonePersonagem = uparPersonagem(clonePersonagem, missao.niveisRecebidos)
    clonePersonagem.dinheiro += missao.dinheiroRecebido
    return clonePersonagem
}