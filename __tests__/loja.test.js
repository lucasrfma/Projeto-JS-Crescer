import itensParaTestes from '../itens-para-testes.json'

import { realizarCompra, realizarVenda } from '../src/loja/loja'

let CLONELOJA = []

let loja
let expansoes
beforeAll(() => {
  loja = itensParaTestes
})

beforeEach(() => {
  CLONELOJA = loja.map((item) => {
    return Object.assign({}, item)
  })
})

describe('Testando compra de itens na loja', () => {
  it('Deve conseguir comprar um item do tipo VIGOR com sucesso', () => {
    expansoes = [0, 1, 2, 3]
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 100000,
      equipamentos: []
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[8].id, 0, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.personagem.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[8])))
  })

  it('Deve conseguir comprar um item do tipo DANO com sucesso', () => {
    expansoes = [0, 1, 2, 3]
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 100000,
      equipamentos: [CLONELOJA[8]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[1].id, 0, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.personagem.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[1])))
  })

  it('Deve conseguir comprar um item do tipo VIDA com sucesso', () => {
    expansoes = [0, 1, 2, 3]
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 100000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[4].id, 0, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.personagem.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[4])))
  })

  it('Deve conseguir comprar um item do tipo EXPANSAO com sucesso', () => {
    const expansoesEPersonagemEsperados = {
      expansoes: [1],
      personagem: {
        nome: 'Jaina',
        nivel: 1,
        dinheiro: 300000,
        equipamentos: [CLONELOJA[8], CLONELOJA[0]]
      }
    }
    expansoes = []
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const expansoesEPersonagemAtualizados = realizarCompra(CLONELOJA[13].id, 0, new Array(personagem), CLONELOJA, expansoes)
    expect(expansoesEPersonagemAtualizados).toEqual(expansoesEPersonagemEsperados)
  })

  it('Deve conseguir comprar um equipamento de alguma expans??o apenas se j?? tiver obtido a expans??o', () => {
    const personagemEsperado = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 300,
      equipamentos: [CLONELOJA[12]]
    }
    expansoes = [1]
    const personagem = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500,
      equipamentos: []
    }

    const personagemAtualizado = realizarCompra(CLONELOJA[12].id, 0, new Array(personagem), CLONELOJA, expansoes)

    expect(personagemAtualizado.personagem).toEqual(personagemEsperado)
  })

  it('Deve conseguir vender um item e receber metade do pre??o de volta', () => {
    expansoes = [2]
    const personagem = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarVenda(0, CLONELOJA[0].id, new Array(personagem), CLONELOJA)
    expect(personagemAtualizado.equipamentos).not.toContain(CLONELOJA[0])
  })

  it('Deve subtituir um item equipado se o item rec??m comprado for do mesmo tipo que o que j?? est?? sendo usado', () => {
    expansoes = [1, 2]
    const personagem = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[1].id, 0, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.personagem.equipamentos).toContain(CLONELOJA[1])
    expect(personagemAtualizado.personagem.equipamentos).not.toContain(CLONELOJA[0])
  })

  it('Deve validar o n??vel do personagem para permitir a venda de itens com um n??vel m??nimo necess??rio', () => {
    expansoes = [1, 2]
    const personagem = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[12].id, 0, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.personagem.equipamentos).toContain(CLONELOJA[12])
  })

  it('Deve lan??ar exece????o quando personagem tentar comprar item que j?? possui', () => {
    expansoes = [1, 2]
    const personagem = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8]]
    }

    expect(() => {
      realizarCompra(CLONELOJA[8].id, 0, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('O personagem j?? possui este item')
  })

  it('Deve lan??ar exece????o quando personagem tentar comprar item que n??o possui dinheiro suficiente', () => {
    expansoes = [1, 2]
    const personagem = {
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 1,
      equipamentos: []
    }

    expect(() => {
      realizarCompra(CLONELOJA[8].id, 0, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('Personagem n??o possui dinheiro suficiente')
  })

  it('Deve lan??ar exece????o quando personagem tentar comprar item que n??o possui nivel suficiente para us??-lo', () => {
    expansoes = [1, 2]
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 50000,
      equipamentos: []
    }

    expect(() => {
      realizarCompra(CLONELOJA[12].id, 0, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('Personagem n??o possui n??vel suficiente para este item')
  })

  it('Deve lan??ar exece????o quando personagem tentar comprar item que n??o possui nivel suficiente para us??-lo', () => {
    expansoes = [1, 2]
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 50000,
      equipamentos: []
    }

    expect(() => {
      realizarCompra(CLONELOJA[12].id, 0, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('Personagem n??o possui n??vel suficiente para este item')
  })
})