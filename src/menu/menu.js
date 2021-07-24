import { useQuestion } from '../services/question/use-question';
import { useLocalStorage } from '../services/local-storage/use-local-storage';
import { getRaces,getQuests,getItens } from '../services/requests/axios';
import { criarPersonagem, uparPersonagem } from '../personagens/personagens';
import { verificarCheat } from './cheats'
import { batalhaEntrePersonagens } from '../batalha/batalha';
import { realizarMissao, selecionarMissao } from '../missoes/missoes';

const localStorage = useLocalStorage();
const nenhumPersonagemSelecionado = -2;

async function main() {
    const races = await getRaces();
    const items = await getItens();
    const quests = await getQuests();
    if (localStorage.getObject('personagens') == null) {
        localStorage.setObject('personagens', []);
    }
    const personagens = localStorage.getObject('personagens');
    if (localStorage.getObject('expansoes') == null) {
        localStorage.setObject('expansoes', []);
    }
    const expansoes = localStorage.getObject('expansoes');

    let opcao;
    do {
        console.clear();
        opcao = (await useQuestion(`
                World of E-crescer

                   Menu Jogador

1 - Criar Personagem
2 - Selecionar Personagem

X - Sair
        `)).toUpperCase();

        switch (opcao) {
            case '1':
                await menuCriarPersonagem(personagens, expansoes, races, items, quests);
                localStorage.setObject('personagens', personagens);
                break;
            case '2':
                await selecionarPersonagem(personagens, expansoes, races, items, quests);
                break;
            case 'X':
                break;
            default:
                let cheat = verificarCheat(opcao, nenhumPersonagemSelecionado, personagens, expansoes, races, items, quests);
                if (cheat) {
                    console.log(cheat);
                    localStorage.setObject('personagens', personagens);
                    localStorage.setObject('expansoes', expansoes);
                }
                else {
                    console.log('Opção inválida!');
                }
        }
        if( opcao !== 'X')
        {
            await useQuestion('Aperte enter para continuar.');
        }
    }while(opcao !== 'X');

}

/**
 * Menu para que o usuário escolha um personagem
 * Chama a função menuPersonagem.
 */
async function selecionarPersonagem(personagens,expansoes,races,items,quests)
{
    let idPersonagem = await menuListaPersonagens(personagens,expansoes,races,items,quests);
    if(idPersonagem > 0)
    {
        await menuPersonagem(--idPersonagem,personagens,expansoes,races,items,quests);
    }
}

/**
 * Menu para que o usuário escolha um personagem
 * Retorna o número inserido pelo usuário
 */
async function menuListaPersonagens(personagens,expansoes,races,items,quests,idPSelecionado = nenhumPersonagemSelecionado)
{
    console.clear();
    if(idPSelecionado == -2)
    {
        console.log(`
                World of E-crescer
    
              Selecionar Personagem
    
0 - Cancelar escolha de personagem
        `);
        for(let i = 0; i < personagens.length; ++i)
        {
            console.log( (i + 1) + ' - ' + personagens[i].nome + ': ' + personagens[i].raca + ' lvl ' + personagens[i].nivel);
        }
    }
    else
    {
        console.log(`
                World of E-crescer
    
         Selecionar Personagem a Combater
    
0 - Cancelar escolha de personagem
        `);
        for(let i = 0; i < personagens.length; ++i)
        {
            if( i != idPSelecionado)
            {
                console.log( (i + 1) + ' - ' + personagens[i].nome + ': ' + personagens[i].raca + ' lvl ' + personagens[i].nivel);
            }
        }
    }
    do
    {
        let idPersonagem = parseInt(await useQuestion(''));

        let cheat = verificarCheat(idPersonagem, idPSelecionado, personagens, expansoes, races, items, quests);
        if (cheat) {
            console.log(cheat);
            localStorage.setObject('personagens', personagens);
            localStorage.setObject('expansoes', expansoes);
        }
        else if( idPersonagem == undefined || idPersonagem == null){
            console.log('Digite uma opção');
        }
        else if( idPersonagem !== idPersonagem || idPersonagem < 0 || idPersonagem > personagens.length || (idPersonagem-1) == idPSelecionado )
        {
            console.log('Opção inválida!');
        }
        else
        {
            return idPersonagem;
        }
    }while(true);
}

async function menuPersonagem(idPersonagem, personagens, expansoes, races, items, quests) {
    let opcao;
    do {
        console.clear();
        opcao = (await useQuestion(`
                World of E-crescer

                 Menu Personagem

  Personagem Selecionado: ${personagens[idPersonagem].nome}

1 - Batalhar
2 - Realizar Missão
3 - Loja
4 - Ver Detalhes do Personagem

X - Menu Jogador 
        `)).toUpperCase();

        switch (opcao) {
            case '1':
                await menuBatalhar(idPersonagem, personagens, expansoes, races, items, quests);
                localStorage.setObject('personagens', personagens);
                break;
            case '2':
                await menuMissao(idPersonagem, personagens, expansoes, races, items, quests);
                localStorage.setObject('personagens', personagens);
                break;
            case '3':
                await menuLoja(idPersonagem, personagens, expansoes, races, items, quests)
                localStorage.setObject('personagens', personagens);
                localStorage.setObject('expansoes', expansoes);
                break;
            case '4':
                console.log(personagens[idPersonagem]);
                break;
            case 'X':
                break;
            default:
                let cheat = verificarCheat(opcao, idPersonagem, personagens, expansoes, races, items, quests);
                if (cheat) {
                    console.log(cheat);
                    localStorage.setObject('personagens', personagens);
                    localStorage.setObject('expansoes', expansoes);
                }
                else {
                    console.log('Opção inválida!');
                }
        }
        if( opcao !== 'X' )
        {
            await useQuestion('Aperte enter para continuar.');
        }
    }while( opcao !== 'X' );
}

async function menuBatalhar(idPersonagem,personagens,expansoes,races,items,quests)
{
    let idPersonagemInimigo = await menuListaPersonagens(personagens,expansoes,races,items,quests,idPersonagem);
    if(idPersonagemInimigo > 0)
    {
        const vencedor = batalhaEntrePersonagens(personagens[idPersonagem],personagens[--idPersonagemInimigo],items);
        if(vencedor == 0)
        {
            console.log('   Depois de 30 minutos de trocação de soco sem perder a amizade, os dois foram pra casa.');
        }
        else
        {
            if( vencedor == 1)
            {
                personagens[idPersonagem] = uparPersonagem(personagens[idPersonagem],1);
                console.log(`
    Vitória de ${personagens[idPersonagem].nome}.
    Level atual: ${personagens[idPersonagem].nivel}
                `);             
}
            else
            {
                personagens[idPersonagemInimigo] = uparPersonagem(personagens[idPersonagemInimigo],1);
                console.log(`
    Vitória de ${personagens[idPersonagemInimigo].nome}.
    Level atual: ${personagens[idPersonagemInimigo].nivel}
                `);             
            }
        }
    }

}

async function menuMissao(idPersonagem, personagens, expansoes, races, items, quests) {
    console.clear();
    console.log(`
    Escolha uma missão:

0 - Cancelar
`);

    for (let i = 0; i < quests.length; ++i) {
        console.log(quests[i].id + ' - ' + quests[i].descricao);
    }
    let continuar = true;
    do {
        let idMissao = parseInt(await useQuestion(''));

        let cheat = verificarCheat(idMissao, idPersonagem, personagens, expansoes, races, items, quests);
        if (cheat) {
            console.log(cheat);
            localStorage.setObject('personagens', personagens);
            localStorage.setObject('expansoes', expansoes);
        }
        else if (idMissao == undefined) {
            console.log('Digite uma opção');
        }
        else if (idMissao !== idMissao || idMissao < 0 || idMissao > quests.length) {
            console.log('Opção inválida!');
        }
        else {
            try {
                const missao = selecionarMissao(quests, idMissao, expansoes);
                if(missao === -1){
                    console.log('Você não possui a expansão necessária para esta missão!')
                    break
                }else{
                    console.clear()
                    personagens[idPersonagem] = await realizarMissao(personagens[idPersonagem], missao)
                }
            } catch (error) {
                console.log(error.message + '\n');
            }
            continuar = false;
        }
    } while (continuar);
}

async function menuLoja(idPersonagem, personagens, expansoes, races, items, quests) {

}

/**
 * Menu que cria um personagem a partir de informações digitadas pelo usuário
 * e adiciona esse personagem ao array 'personagens' recebido como parâmetro
 */
async function menuCriarPersonagem(personagens, expansoes, races, items, quests) {
    console.clear();
    let nome = await useQuestion(`
                World of E-crescer

                Criar de Personagem

    Digite o nome do personagem:
    `);

    console.log(`
    Escolha a raça:

0 - Cancelar criação de personagem
`);

    for (let i = 0; i < races.length; ++i) {
        console.log(races[i].id + ' - ' + races[i].raca);
    }
    let continuar = true;
    do {
        let idRaca = parseInt(await useQuestion(''));

        let cheat = verificarCheat(idRaca, nenhumPersonagemSelecionado, personagens, expansoes, races, items, quests);
        if (cheat) {
            console.log(cheat);
            localStorage.setObject('personagens', personagens);
            localStorage.setObject('expansoes', expansoes);
        }
        if (idRaca == undefined) {
            console.log('Digite uma opção');
        }
        else if (idRaca == NaN || idRaca < 0 || idRaca > races.length) {
            console.log('Opção inválida!');
        }
        else {
            try {
                personagens.push(criarPersonagem(nome, idRaca, races, expansoes, personagens));
            } catch (error) {
                console.log(error.message + '\n');
            }
            continuar = false;
        }
    } while (continuar);
}

main();
