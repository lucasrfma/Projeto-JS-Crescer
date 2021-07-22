import axios from 'axios'

import { selecionarMissao, realizarMissao, receberRecompensasMissao } from '../src/missoes/missoes'

let CLONEMISSOES = []

let missoes
beforeAll(async () => {
    missoes = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/quests.json')).data
})

beforeEach(() => {
    CLONEMISSOES.length = missoes.length
    for (let i = 0; i < missoes.length; i++) {
        CLONEMISSOES.splice(i, 1, (Object.assign({}, missoes[i])))
    }
})

describe('Testando seleção de missões', () => {
    it('Deve retornar a missão selecionada pelo usuário', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 0,
            expansoes: [0, 1, 2, 3]
        }
        const missaoSelecionada = selecionarMissao(personagem, CLONEMISSOES[0])
        expect(missaoSelecionada).toEqual(CLONEMISSOES[0])
    })

    it('Deve retornar -1 caso o personagem não possua a expansão da missão', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 0,
            expansoes: [0, 1, 2]
        }
        const missaoSelecionada = selecionarMissao(personagem, CLONEMISSOES[8])
        expect(missaoSelecionada).toBe(-1)
    })
})

describe('Testando recebimento de recompensas', () => {
    it('Deve retornar o personagem com dinheiro atualizado', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 0,
            expansoes: [0, 1, 2, 3]
        }
        const missaoSelecionada = selecionarMissao(personagem, CLONEMISSOES[0])
        const personagemAtualizado = receberRecompensasMissao(personagem, missaoSelecionada)
        expect(personagemAtualizado.dinheiro).toBe(10)
    })

    it('Deve retornar o personagem com nivel atualizado', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 0,
            expansoes: [0, 1, 2, 3]
        }
        const missaoSelecionada = selecionarMissao(personagem, CLONEMISSOES[2])
        const personagemAtualizado = receberRecompensasMissao(personagem, missaoSelecionada)
        expect(personagemAtualizado.nivel).toBe(2)
    })

    it('Deve retornar o personagem com nivel e dinheiro atualizados', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 0,
            expansoes: [0, 1, 2, 3]
        }
        const missaoSelecionada = selecionarMissao(personagem, CLONEMISSOES[4])
        const personagemAtualizado = receberRecompensasMissao(personagem, missaoSelecionada)
        expect(personagemAtualizado.nivel).toBe(4)
        expect(personagemAtualizado.dinheiro).toBe(70)
    })
})

describe('Testando realização de missões', () => {
    it('Deve retornar o personagem atualizado após realizar a missão', () => {
        const personagem = {
            nome: 'Jaina',
            nivel: 1,
            dinheiro: 0,
            expansoes: [0, 1, 2, 3]
        }
        const missaoSelecionada = selecionarMissao(personagem, CLONEMISSOES[4])
        const personagemAtualizado = realizarMissao(personagem, missaoSelecionada)
        expect(personagemAtualizado).toEqual({nome: 'Jaina', nivel: 4, dinheiro: 70, expansoes: [0, 1, 2, 3]})
    })
})