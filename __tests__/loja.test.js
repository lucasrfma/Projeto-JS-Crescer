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
      id: 1,
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 100000,
      equipamentos: []
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[8].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[8])))
  })

  it('Deve conseguir comprar um item do tipo DANO com sucesso', () => {
    expansoes = [0, 1, 2, 3]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 100000,
      equipamentos: [CLONELOJA[8]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[1].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[1])))
  })

  it('Deve conseguir comprar um item do tipo VIDA com sucesso', () => {
    expansoes = [0, 1, 2, 3]
    const personagem = {
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 100000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[4].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[4])))
  })

  it('Deve conseguir comprar um item do tipo EXPANSAO com sucesso', () => {
    const expansoesEPersonagemEsperados = {
      expansoes: [1],
      personagem: {
        id:1,
        nome: 'Jaina',
        nivel: 1,
        dinheiro: 300000,
        equipamentos: [CLONELOJA[8], CLONELOJA[0]]
      }
    }
    expansoes = []
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const expansoesEPersonagemAtualizados = realizarCompra(CLONELOJA[13].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    expect(expansoesEPersonagemAtualizados).toEqual(expansoesEPersonagemEsperados)
  })

  it('Deve conseguir comprar um equipamento de alguma expansão apenas se já tiver obtido a expansão', () => {
    const personagemEsperado = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 300,
      equipamentos: [CLONELOJA[12]]
    }
    expansoes = [1]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500,
      equipamentos: []
    }

    const personagemAtualizado = realizarCompra(CLONELOJA[12].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)

    expect(personagemAtualizado).toEqual(personagemEsperado)
  })

  it('Deve conseguir vender um item e receber metade do preço de volta', () => {
    expansoes = [2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarVenda(personagem.id, CLONELOJA[0].id, new Array(personagem), CLONELOJA)
    expect(personagemAtualizado.equipamentos).not.toContain(CLONELOJA[0])
  })

  it('Deve subtituir um item equipado se o item recém comprado for do mesmo tipo que o que já está sendo usado', () => {
    expansoes = [1, 2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[1].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.equipamentos).toContain(CLONELOJA[1])
    expect(personagemAtualizado.equipamentos).not.toContain(CLONELOJA[0])
  })

  it('Deve validar o nível do personagem para permitir a venda de itens com um nível mínimo necessário', () => {
    expansoes = [1, 2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8], CLONELOJA[0]]
    }
    const personagemAtualizado = realizarCompra(CLONELOJA[12].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    expect(personagemAtualizado.equipamentos).toContain(CLONELOJA[12])
  })

  it('Deve lançar execeção quando personagem tentar comprar item que já possui', () => {
    expansoes = [1, 2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 500000,
      equipamentos: [CLONELOJA[8]]
    }

    expect(() => {
      realizarCompra(CLONELOJA[8].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('O personagem já possui este item')
  })

  it('Deve lançar execeção quando personagem tentar comprar item que não possui dinheiro suficiente', () => {
    expansoes = [1, 2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 20,
      dinheiro: 1,
      equipamentos: []
    }

    expect(() => {
      realizarCompra(CLONELOJA[8].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('Personagem não possui dinheiro suficiente')
  })

  it('Deve lançar execeção quando personagem tentar comprar item que não possui nivel suficiente para usá-lo', () => {
    expansoes = [1, 2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 50000,
      equipamentos: []
    }

    expect(() => {
      realizarCompra(CLONELOJA[12].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('Personagem não possui nível suficiente para este item')
  })

  it('Deve lançar execeção quando personagem tentar comprar item que não possui nivel suficiente para usá-lo', () => {
    expansoes = [1, 2]
    const personagem = {
      id: 1,
      nome: 'Jaina',
      nivel: 1,
      dinheiro: 50000,
      equipamentos: []
    }

    expect(() => {
      realizarCompra(CLONELOJA[12].id, personagem.id, new Array(personagem), CLONELOJA, expansoes)
    }).toThrow('Personagem não possui nível suficiente para este item')
  })
})