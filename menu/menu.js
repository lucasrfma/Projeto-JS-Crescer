import { useQuestion } from '../src/services/question/use-question';
import { useLocalStorage } from '../src/services/local-storage/use-local-storage';
import { getRaces,getQuests,getItens } from '../src/services/requests/axios';
import { criarPersonagem, uparPersonagem } from '../src/personagens/personagens';
import { tratarCheats } from '../src/menu/cheats'
import { batalhaEntrePersonagens } from '../src/batalha/batalha';
import { realizarMissao, selecionarMissao } from '../src/missoes/missoes';
import { realizarVenda } from '../src/loja/loja';
import { realizarCompraComConfirmacao } from './loja-com-confirmacao';

const localStorage = useLocalStorage();
export const nenhumPersonagemSelecionado = -2;

async function main() {
    const races = await getRaces();
    const items = await getItens();
    const quests = await getQuests();
    if (localStorage.getObject('personagens') == null) {
        localStorage.setObject('personagens', []);
    }
    if (localStorage.getObject('expansoes') == null) {
        localStorage.setObject('expansoes', []);
    }
    
    let opcao;
    do {
        let personagens = localStorage.getObject('personagens');
        let expansoes = localStorage.getObject('expansoes');
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
                if( !tratarCheats(opcao, nenhumPersonagemSelecionado, personagens) )
                {
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
    personagens = localStorage.getObject('personagens');
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
    do
    {
        console.clear();
        if(idPSelecionado == nenhumPersonagemSelecionado)
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
        let idPersonagem = await useQuestion('');
        
        if( tratarCheats(idPersonagem, idPSelecionado, personagens) )
        {
            personagens = localStorage.getObject('personagens');
        }
        else
        {
            idPersonagem = parseInt(idPersonagem);
        
            if( idPersonagem == undefined || idPersonagem == null){
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
        }
        personagens = localStorage.getObject('personagens');
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
                await menuLoja(idPersonagem, personagens, expansoes, races, items, quests);
                localStorage.setObject('personagens', personagens);
                expansoes = localStorage.getObject('expansoes');
                break;
            case '4':
                console.log(personagens[idPersonagem]);
                break;
            case 'X':
                break;
            default:
                if( !tratarCheats(opcao, idPersonagem, personagens) )
                {
                    console.log('Opção inválida!');
                }
        }
        if( opcao !== 'X' )
        {
            await useQuestion('Aperte enter para continuar.');
        }
        personagens = localStorage.getObject('personagens');
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
        let idMissao = await useQuestion('');

        if( !tratarCheats(idMissao, idPersonagem, personagens) )
        {
            idMissao = parseInt(idMissao)
            if (idMissao == undefined) {
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
        }
        personagens = localStorage.getObject('personagens');
    } while (continuar);
}

async function menuLoja(idPersonagem, personagens, expansoes, races, itens, quests) {
    do{
        console.clear();
        console.log(`
                World of E-crescer
    
                       Loja

Personagem Selecionado: ${personagens[idPersonagem].nome} 
Dinheiro do personagem: ${personagens[idPersonagem].dinheiro}
1 - Comprar item
2 - Vender item

0 - Sair da Loja
    `);
        let opcao = await useQuestion('');

        if( !tratarCheats(opcao, idPersonagem, personagens) )
        {
            opcao = parseInt(opcao)
            switch(opcao){
                case 1:
                    await menuComprarItem(personagens,expansoes,races,itens,quests,idPersonagem)
                    break
                case 2:
                    await menuVenderItem(personagens,races,itens,quests,idPersonagem)
                    break
                case 0:
                    return
                default:
                    console.log('Opção inválida!')
            }
        }
        personagens = localStorage.getObject('personagens');
    }while(true);
}

async function menuComprarItem(personagens,expansoes,races,itens,quests,idPersonagem)
{
    do{
        console.clear();
        console.log(`
            Selecionar item para comprar

Personagem Selecionado: ${personagens[idPersonagem].nome}
Dinheiro do personagem: ${personagens[idPersonagem].dinheiro}
0 - Voltar para a loja
    `)
        const itensSemItensJaEquipados = itens.filter((item) => {
            if(item.tipo === 'EXPANSAO') return true
            const itemEquipadoIgual = personagens[idPersonagem].equipamentos.reduce((acc, equipamento) => {
                if (acc) return true
                if (equipamento.id === item.id) return true
                return false
            }, false)
            if(itemEquipadoIgual === false) return true
            return false
        })
        const itensSemExpansoesJaAdquiridas = itensSemItensJaEquipados.filter((item) => {
            return (item.tipo !== 'EXPANSAO' || (item.tipo === 'EXPANSAO' && !expansoes.includes(item.idExpansao)))
        })
        itensSemExpansoesJaAdquiridas.forEach((item, index) => {
            if(item.tipo === 'EXPANSAO'){
                console.log((index + 1) + '-' + item.nome + ': EXPANSAO numero da expansao: ' + 
                item.idExpansao + ' preco: ' + item.preco)
            }else{
                if(item.lvlMinimo && item.idExpansao){
                    console.log((index + 1) + '-' + item.nome + ': ' + item.tipo + ' valor do bonus: ' + 
                    item.aprimoramento + ' preco: ' + item.preco + ' lvl minimo necessario: ' + 
                    item.lvlMinimo + ' expansao necessaria: ' + item.idExpansao)
                }else if(item.lvlMinimo){
                    console.log((index + 1) + '-' + item.nome + ': ' + item.tipo + ' valor do bonus: ' + 
                    item.aprimoramento + ' preco: ' + item.preco + ' lvl minimo necessario: ' + 
                    item.lvlMinimo)
                }else if(item.idExpansao){
                    console.log((index + 1) + '-' + item.nome + ': ' + item.tipo + ' valor do bonus: ' + 
                    item.aprimoramento + ' preco: ' + item.preco + ' expansao necessaria: ' + item.idExpansao)
                }
                else{
                    console.log((index + 1) + '-' + item.nome + ': ' + item.tipo + ' valor do bonus: ' + 
                    item.aprimoramento + ' preco: ' + item.preco)
                }
            }
        })
        console.log('Digite uma opção: ');
        let opcao = await useQuestion('')

        if( !tratarCheats(opcao, idPersonagem, personagens) )
        {
            opcao = parseInt(opcao)
            if(opcao === 0){
                return
            }
            else if( opcao !== opcao || opcao < 0 || opcao > itensSemExpansoesJaAdquiridas.length ){
                console.log('Opção inválida!');
            }else{
                try{
                    const compraRealizada = await realizarCompraComConfirmacao(itensSemExpansoesJaAdquiridas[opcao - 1].id, 
                        idPersonagem, personagens, itens, expansoes)
                    if(compraRealizada.expansoes){
                        localStorage.setObject('expansoes', compraRealizada.expansoes)
                        expansoes = localStorage.getObject('expansoes')
                    }
                    personagens[idPersonagem] = compraRealizada.personagem
                    localStorage.setObject('personagens', personagens)
                    console.log('Compra realizada com sucesso! Aperte enter para continuar')
                    await useQuestion('')
                }catch (error){
                    console.log(error.message + '\nAperte enter para continuar')
                    await useQuestion('')
                }
            }
        }
        personagens = localStorage.getObject('personagens');
    }while(true);
}

async function menuVenderItem(personagens,races,itens,quests,idPersonagem)
{
    do{
        console.clear();
        console.log(`
            Selecionar item para vender

Personagem Selecionado: ${personagens[idPersonagem].nome}
Dinheiro do personagem: ${personagens[idPersonagem].dinheiro}
0 - Voltar para a loja
    `);
        if(personagens[idPersonagem].equipamentos.length === 0) {
            console.log('Nenhum item equipado nesse personagem.')
        }else{
            personagens[idPersonagem].equipamentos.forEach((item, index) => {
                console.log((index + 1) + '-' + item.nome + ': ' + item.tipo + ' valor do bonus: ' + 
                item.aprimoramento + ' preco: ' + item.preco)
            })
        }
        console.log('\nDigite uma opção: ');
        let opcao = await useQuestion('')

        if( !tratarCheats(opcao, idPersonagem, personagens) )
        {
            opcao = parseInt(opcao)
            if(opcao === 0){
                return
            }
            else if( opcao !== opcao || opcao < 0 || opcao > personagens[idPersonagem].equipamentos.length )
            {
                console.log('Opção inválida!');
            }
            else
            {
                const personagemAtualizado = realizarVenda(idPersonagem, 
                    personagens[idPersonagem].equipamentos[opcao - 1].id, personagens, itens);
                personagens[idPersonagem] = personagemAtualizado;
                localStorage.setObject('personagens', personagens);
            }
        }
        personagens = localStorage.getObject('personagens');
    }while(true);
}

export async function menuConfirmarCompra(item,infoItemMesmoTipoAnterior,idPersonagem,personagens) 
{
    let opcao;
    do
    {
        console.clear();
        opcao = (await useQuestion(`
                World of E-crescer
                       
                      AVISO

    Ao comprar o item:

    ${item.nome}
    ${item.tipo}
    ${item.aprimoramento}
    
    Você perderá o item:
    
    ${infoItemMesmoTipoAnterior.item.nome}
    ${infoItemMesmoTipoAnterior.item.tipo}
    ${infoItemMesmoTipoAnterior.item.aprimoramento}

    Confirma a compra? (s/n)
        `)).toUpperCase();
        if( tratarCheats(opcao, idPersonagem, personagens) )
        {
            return false;
        }
        else
        {
            switch (opcao) {
                case 'N':
                    return false;
                case 'S':
                    return true;
            }
        }
    }while(true);
    
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
        let idRaca = await useQuestion('');

        if( !tratarCheats(idRaca, nenhumPersonagemSelecionado, personagens) )
        {
            idRaca = parseInt(idRaca)
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
        }
        personagens = localStorage.getObject('personagens');
    } while (continuar);
}

main();
