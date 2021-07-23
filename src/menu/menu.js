import { useQuestion } from '../services/question/use-question';
import { useLocalStorage } from '../services/local-storage/use-local-storage';
import { getRaces,getQuests,getItens } from '../services/requests/axios';
import { criarPersonagem } from '../personagens/personagens';

const localStorage = useLocalStorage();

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
        opcao = await useQuestion(`
        World of E-crescer

           Menu Jogador

1 - Criar Personagem
2 - Selecionar Personagem

X - Sair
        `);

        switch(opcao)
        {
            case '1': 
                await criarJogador(personagens,expansoes,races);
                localStorage.setObject('personagens',personagens);
                break;
            case '2': 
                await selecionarJogador(personagens);
                break;
            case 'X':
                break;
            default:
                console.log('Opção inválida!');
        }
        if( !(opcao==='X'))
        {
            await useQuestion('Aperte enter para continuar.');
        }
    }while(!(opcao === 'X'));

}

async function criarJogador(personagens,expansoes,races)
{
    let nome = await useQuestion(`
        World of E-crescer

       Criação de Personagem

    Digite o nome do personagem:
    `);

    console.log(`
    Escolha a raça:

0 - Cancelar Criação de Personagem
`);

    for(let i = 0; i < races.length; ++i)
    {
        console.log( races[i].id + ' - ' + races[i].raca );
    }
    let continuar = true;
    do
    {
        let idRaca = parseInt(await useQuestion(''));
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
