import { useQuestion } from '../services/question/use-question';
import { useLocalStorage } from '../services/local-storage/use-local-storage';
import { getRaces,getQuests,getItens } from '../services/requests/axios';
import { criarPersonagem } from '../personagens/personagens';

const localStorage = useLocalStorage();
const nenhumPersonagemSelecionado = -1;

async function main()
{
    const races = await getRaces();
    const items = await getItens();
    const quests = await getQuests();
    if( localStorage.getObject('personagens') == null )
    {
        localStorage.setObject('personagens',[]);
    }
    const personagens = localStorage.getObject('personagens');
    if( localStorage.getObject('expansoes') == null )
    {
        localStorage.setObject('expansoes',[]);
    }
    const expansoes = localStorage.getObject('expansoes');

    let opcao;
    do
    {
        console.clear();
        opcao = (await useQuestion(`
                World of E-crescer

                   Menu Jogador

1 - Criar Personagem
2 - Selecionar Personagem

X - Sair
        `)).toUpperCase();

        switch(opcao)
        {
            case '1': 
                await menuCriarPersonagem(personagens,expansoes,races);
                localStorage.setObject('personagens',personagens);
                break;
                case '2': 
                await selecionarPersonagem(personagens,expansoes,races,items,quests);
                break;
                case 'X':
                    break;
                default:
                    let cheat = verificarCheat(opcao,nenhumPersonagemSelecionado,personagens,expansoes,races,items,quests);
                    if( cheat )
                    {
                        console.log(cheat);
                        localStorage.setObject('personagens',personagens);
                        localStorage.setObject('expansoes',expansoes);
                    }
                else{
                    console.log('Opção inválida!');
                }
        }
        if( !(opcao==='X'))
        {
            await useQuestion('Aperte enter para continuar.');
        }
    }while(!(opcao === 'X'));

}

/**
 * Menu para que o usuário escolha um personagem
 * Chama a função menuPersonagem.
 */
async function selecionarPersonagem(personagens,expansoes,races,items,quests)
{
    console.clear();
    console.log(`
    World of E-crescer
    
    Selecionar Personagem
    
    Escolha uma opção:
    
    0 - Cancelar escolha de personagem
    `);
    
    for(let i = 0; i < personagens.length; ++i)
    {
        console.log( (i + 1) + ' - ' + personagens[i].nome);
    }
    let continuar = true;
    do
    {
        let idPersonagem = parseInt(await useQuestion(''));

        let cheat = verificarCheat(idPersonagem,nenhumPersonagemSelecionado,personagens,expansoes,races,items,quests);
        if( cheat )
        {
            console.log(cheat);
            localStorage.setObject('personagens',personagens);
            localStorage.setObject('expansoes',expansoes);
        }
        else if( idPersonagem == undefined){
            console.log('Digite uma opção');
        }
        else if( idPersonagem == NaN || idPersonagem < 0 || idPersonagem > personagens.length)
        {
            console.log('Opção inválida!');
        }
        else
        {
            await menuPersonagem(idPersonagem-1,personagens,expansoes,races,items,quests);
            continuar = false;
        }
    }while(continuar);
}

async function menuPersonagem(idPersonagem,personagens,expansoes,items,quests)
{
    let opcao;
    do
    {
        console.clear();
        opcao = (await useQuestion(`
                World of E-crescer

                   Menu Personagem

1 - Batalhar
2 - Realizar Missão
3 - Loja

X - Menu Jogador 
        `)).toUpperCase();

        switch(opcao)
        {
            case '1': 
                await menuBatalhar(idPersonagem,personagens,items);
                localStorage.setObject('personagens',personagens);
                break;
            case '2': 
                await menuMissao(idPersonagem,personagens,expansoes,items,quests);
                localStorage.setObject('personagens',personagens);
                break;
            case '3':
                await menuLoja(idPersonagem,personagens,expansoes,items,quests)
                localStorage.setObject('personagens',personagens);
                localStorage.setObject('expansoes',expansoes);
                break;
            case 'X':
                break;
            default:
                let cheat = verificarCheat(opcao,idPersonagem,personagens,expansoes,races,items,quests);
                if( cheat )
                {
                    console.log(cheat);
                    localStorage.setObject('personagens',personagens);
                    localStorage.setObject('expansoes',expansoes);
                }
                else{
                    console.log('Opção inválida!');
                }
        }
        if( !(opcao==='X'))
        {
            await useQuestion('Aperte enter para continuar.');
        }
    }while(!(opcao === 'X'));
}

/**
 * Menu que cria um personagem a partir de informações digitadas pelo usuário
 * e adiciona esse personagem ao array 'personagens' recebido como parâmetro
 */
async function menuCriarPersonagem(personagens,expansoes,races)
{
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

    for(let i = 0; i < races.length; ++i)
    {
        console.log( races[i].id + ' - ' + races[i].raca );
    }
    let continuar = true;
    do
    {
        let idRaca = parseInt(await useQuestion(''));

        let cheat = verificarCheat(idRaca,nenhumPersonagemSelecionado,personagens,expansoes,races,items,quests);
        if( cheat )
        {
            console.log(cheat);
            localStorage.setObject('personagens',personagens);
            localStorage.setObject('expansoes',expansoes);
        }
        if( idRaca == undefined){
            console.log('Digite uma opção');
        }
        else if( idRaca == NaN || idRaca < 0 || idRaca > races.length)
        {
            console.log('Opção inválida!');
        }
        else
        {
            try {
                personagens.push(criarPersonagem(nome,idRaca,races,expansoes,personagens));
            } catch (error) {
                console.log(error.message + '\n');
            }
            continuar = false;
        }
    }while(continuar);
}

main();
