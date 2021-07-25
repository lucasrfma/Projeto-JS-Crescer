import racasParaTestes from '../racas-para-testes.json'
import itensParaTestes from '../itens-para-testes.json'

import { criarPersonagem, uparPersonagem } from '../src/personagens/personagens'
import {
  verificarSeHaItemMesmoTipoEquipadoByID,
  equiparItemByID
} from '../src/personagens/equipamentos'

let racas
let expansoes
let personagens
let itens

beforeAll(() => {
  racas = racasParaTestes
  itens = itensParaTestes
  expansoes = [0, 1, 2, 3, 4, 5, 6, 7]
  personagens = [{
    nome: 'Arthas',
    raca: 'Humano',
    equipamentos: [],
    nivel: 100,
    dinheiro: 0,
    vida: 800,
    vigor: 500,
    dano: 400
  }]
})

describe('testes criação personagem', () => {
  it('Deve conseguir criar um personagem de raça do tipo NORMAL com sucesso e ele deve estar no nível 1', () => {
    const personagemEsperado = {
      nome: 'Inalvejavel',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }

    const personagemObtido = criarPersonagem('Inalvejavel', 5, racas, expansoes)

    expect(personagemObtido).toEqual(personagemEsperado)
  })

  it('Deve conseguir criar um personagem de raça do tipo ALIADA com sucesso e ele deve estar no nível 10', () => {
    const personagemEsperado = {
      nome: 'Ecologista',
      raca: 'Troll Zandalari',
      equipamentos: [],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3
    }

    const personagemObtido = criarPersonagem('Ecologista', 12, racas, expansoes, personagens)

    expect(personagemObtido).toEqual(personagemEsperado)
  })

  it('Personagem recém criado não deve possuir equipamentos', () => {
    const equipamentosEsperados = []

    const personagemObtido = criarPersonagem('Elfarmador', 4, racas)

    expect(personagemObtido.equipamentos).toEqual(equipamentosEsperados)
  })

  it('Personagem recém criado não deve possuir dinheiro', () => {
    const dinheiroEsperado = 0

    const personagemObtido = criarPersonagem('Invejavel', 4, racas)

    expect(personagemObtido.dinheiro).toEqual(dinheiroEsperado)
  })

  it('Deve receber +2 de vida e +1 de vigor ao subir dois niveis', () => {
    const personagemEsperado = {
      nome: 'Inalvejavel',
      raca: 'Orc',
      equipamentos: [],
      nivel: 3,
      dinheiro: 0,
      vida: 8,
      vigor: 5,
      dano: 4
    }

    const personagem = {
      nome: 'Inalvejavel',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }

    const personagemObtido = uparPersonagem(personagem, 2)

    expect(personagemObtido).toEqual(personagemEsperado)
  })

  it('Deve conseguir criar um personagem com raça de expansão se já possuir a expansão', () => {
    const personagemEsperado = {
      nome: 'Ecologista',
      raca: 'Troll Zandalari',
      equipamentos: [],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3
    }

    const personagemObtido = criarPersonagem('Ecologista', 12, racas, expansoes, personagens)

    expect(personagemObtido).toEqual(personagemEsperado)
  })

  it('Não deve conseguir criar um personagem com raça de expansão se não possuir a expansão', () => {

    expect(() => {
      criarPersonagem('Ecologista', 12, racas, [0], personagens)
    }).toThrow('Você não possui a expansão para criar personagens dessa raça!.')
  })

  it('Deve conseguir criar um personagem com raça aliada se já possuir outro personagem com o lvl mínimo necessário', () => {
    const personagemEsperado = {
      nome: 'Ecologista',
      raca: 'Troll Zandalari',
      equipamentos: [],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3
    }

    const personagemObtido = criarPersonagem('Ecologista', 12, racas, expansoes, personagens)

    expect(personagemObtido).toEqual(personagemEsperado)
  })

  it('Não deve conseguir criar um personagem com raça aliada se não possuir outro personagem com o lvl mínimo necessário', () => {

    expect(() => { criarPersonagem('Ecologista', 12, racas, expansoes) }).toThrow('Você não possui um personagem com o nivel minimo para criar personagens dessa raça!.')
  })
}
)

describe('Testes de equipamento de itens', () => {

  it('Resultado deve ter atributo item = 0 quando não há item de mesmo tipo já equipado', () => {
    const personagemSemEquipamentos = criarPersonagem('Elfarmador', 4, racas)
    const itemEquipado = verificarSeHaItemMesmoTipoEquipadoByID(personagemSemEquipamentos, 1, itens)
    const resultadoEsperado = 0;

    expect(itemEquipado.item).toBe(resultadoEsperado);
  }),

  it('Resultado deve ter atributo index correto quando não há item de mesmo tipo já equipado', () => {
    const personagemSemEquipamentos = criarPersonagem('Elfarmador', 4, racas)

    // verificando e equipando uma arma em personagem sem equipamento
    const resultado1 = verificarSeHaItemMesmoTipoEquipadoByID(personagemSemEquipamentos, 1, itens)
    const personagemComUmaArma = equiparItemByID(personagemSemEquipamentos, 1, resultado1.index, itens);

    // verificando se personagem que só possui uma arma tem um acessorio de Vida
    const resultado2 = verificarSeHaItemMesmoTipoEquipadoByID(personagemComUmaArma, 5, itens)

    const indexEsperado1 = 0;
    const indexEsperado2 = 1;

    expect(resultado1.index).toBe(indexEsperado1);
    expect(resultado2.index).toBe(indexEsperado2);
  }),

  it('Resultado deve ter atributo item com as informações de item já equipado de mesmo tipo', () => {
    const personagemSemEquipamentos = criarPersonagem('Elfarmador', 4, racas)

    // verificando e equipando uma arma em personagem sem equipamento
    const resultado1 = verificarSeHaItemMesmoTipoEquipadoByID(personagemSemEquipamentos, 1, itens)
    const personagemComUmaArma = equiparItemByID(personagemSemEquipamentos, 1, resultado1.index, itens);

    // verificando se personagem que só possui uma arma tem uma arma
    const resultado2 = verificarSeHaItemMesmoTipoEquipadoByID(personagemComUmaArma, 2, itens)

    const armaEsperada = {
      "id": 1,
      "nome": "Espada curta",
      "tipo": "DANO",
      "preco": 40,
      "aprimoramento": 3
    }

    expect(resultado2.item).toEqual(armaEsperada);
  }),

  it('Resultado deve ter atributo index com o índice do item já equipado de mesmo tipo', () => {
    const personagemSemEquipamentos = criarPersonagem('Elfarmador', 4, racas)

    // verificando e equipando uma arma em personagem sem equipamento
    const resultado1 = verificarSeHaItemMesmoTipoEquipadoByID(personagemSemEquipamentos, 1, itens)
    const personagemComUmaArma = equiparItemByID(personagemSemEquipamentos, 1, resultado1.index, itens);

    // verificando se personagem que só possui uma arma tem uma arma
    const resultado2 = verificarSeHaItemMesmoTipoEquipadoByID(personagemComUmaArma, 2, itens)

    const indexEsperado1 = 0;
    const indexEsperado2 = 0;

    expect(resultado1.index).toBe(indexEsperado1);
    expect(resultado2.index).toBe(indexEsperado2);
  }),

  it('Deve retornar um personagem com o item corretamente adicionado', () => {
    const personagemSemEquipamentos = criarPersonagem('Elfarmador', 4, racas)
    const resultado = verificarSeHaItemMesmoTipoEquipadoByID(personagemSemEquipamentos, 1, itens)

    const personagemComUmaArma = equiparItemByID(personagemSemEquipamentos, 1, resultado.index,itens)

    const personagemEsperado = {
      nome: 'Elfarmador',
      raca: 'Goblin',
      equipamentos: [{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
      }],
      nivel: 1,
      dinheiro: 0,
      vida: 4,
      vigor: 2,
      dano: 8
    }

    expect(personagemComUmaArma).toEqual(personagemEsperado)
  })
})