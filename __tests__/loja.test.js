import axios from 'axios'

import { realizarCompra, realizarVenda } from '../src/loja/loja'

let CLONELOJA = []

let loja
beforeAll(async () => {
    loja = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/store.json')).data
})

beforeEach(() => {
    CLONELOJA.length = loja.length
    for (let i = 0; i < loja.length; i++) {
        CLONELOJA.splice(i, 1, (Object.assign({}, loja[i])))
    }
})

describe('Testando compra de itens na loja', () => {
    it('Deve conseguir comprar um item do tipo VIGOR com sucesso', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 100000,
            expansoes: [0, 1, 2, 3],
            equipamentos: []
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[8], personagem)
        expect(personagemAtualizado.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[8])))
    })

    it('Deve conseguir comprar um item do tipo DANO com sucesso', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 100000,
            expansoes: [0, 1, 2, 3],
            equipamentos: [CLONELOJA[8]]
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[1], personagem)
        expect(personagemAtualizado.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[1])))
    })

    it('Deve conseguir comprar um item do tipo VIDA com sucesso', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 100000,
            expansoes: [0, 1, 2, 3],
            equipamentos: [CLONELOJA[8], CLONELOJA[0]]
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[4], personagem)
        expect(personagemAtualizado.equipamentos).toEqual(expect.arrayContaining(new Array(CLONELOJA[4])))
    })

    it('Deve conseguir comprar um item do tipo EXPANSAO com sucesso', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 500000,
            expansoes: [],
            equipamentos: [CLONELOJA[8], CLONELOJA[0]]
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[13], personagem)
        expect(personagemAtualizado.expansoes).toContain(CLONELOJA[13].idExpansao)
    })

    it('Deve conseguir comprar um equipamento de alguma expansão apenas se já tiver obtido a expansão', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 20,
            dinheiro: 500000,
            expansoes: [2],
            equipamentos: [CLONELOJA[8], CLONELOJA[0]]
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[20], personagem)
        expect(personagemAtualizado.expansoes).toContain(CLONELOJA[20].idExpansao)
    })

    it('Deve conseguir vender um item e receber metade do preço de volta', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 20,
            dinheiro: 500000,
            expansoes: [2],
            equipamentos: [CLONELOJA[8], CLONELOJA[0]]
        }
        const personagemAtualizado = realizarVenda(personagem, CLONELOJA[0])
        expect(personagemAtualizado.equipamentos).not.toContain(CLONELOJA[0])
    })

    it('Deve subtituir um item equipado se o item recém comprado for do mesmo tipo que o que já está sendo usado', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 20,
            dinheiro: 500000,
            expansoes: [1, 2],
            equipamentos: [CLONELOJA[8], CLONELOJA[0]]
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[1], personagem)
        expect(personagemAtualizado.equipamentos).toContain(CLONELOJA[1])
        expect(personagemAtualizado.equipamentos).not.toContain(CLONELOJA[0])
    })

    it('Deve validar o nível do personagem para permitir a venda de itens com um nível mínimo necessário', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 20,
            dinheiro: 500000,
            expansoes: [1, 2],
            equipamentos: [CLONELOJA[8], CLONELOJA[0]]
        }
        const personagemAtualizado = realizarCompra(CLONELOJA[12], personagem)
        expect(personagemAtualizado.equipamentos).toContain(CLONELOJA[12])
    })
})