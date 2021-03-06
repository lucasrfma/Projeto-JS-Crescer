import missoesParaTestes from '../missoes-para-testes.json'

import { selecionarMissao, realizarMissao, receberRecompensasMissao } from '../src/missoes/missoes'

let CLONEMISSOES = []

let missoes
beforeAll(() => {
  missoes = missoesParaTestes
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
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 1, expansoes)
    expect(missaoSelecionada).toEqual(CLONEMISSOES[0])
  })

  it('Deve retornar -1 caso o personagem não possua a expansão da missão', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 9, expansoes)
    expect(missaoSelecionada).toBe(-1)
  })
})

describe('Testando recebimento de recompensas', () => {
  it('Deve retornar o personagem com dinheiro atualizado', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 1, expansoes)
    const personagemAtualizado = receberRecompensasMissao(personagem, missaoSelecionada)
    expect(personagemAtualizado.dinheiro).toBe(10)
  })

  it('Deve retornar o personagem com nivel atualizado', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 3, expansoes)
    const personagemAtualizado = receberRecompensasMissao(personagem, missaoSelecionada)
    expect(personagemAtualizado.nivel).toBe(2)
  })

  it('Deve retornar o personagem com nivel e dinheiro atualizados', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 5, expansoes)
    const personagemAtualizado = receberRecompensasMissao(personagem, missaoSelecionada)
    expect(personagemAtualizado.nivel).toBe(4)
    expect(personagemAtualizado.dinheiro).toBe(70)
  })
})

describe('Testando realização de missões', () => {
  it('Deve retornar o personagem atualizado após realizar a missão', async () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 5, expansoes)
    const personagemAtualizado = await realizarMissao(personagem, missaoSelecionada)
    expect(personagemAtualizado).toEqual({ nome: 'Jaina', raca: 'Humano', equipamentos: [], nivel: 4, dinheiro: 70, vida: 8, vigor: 5, dano: 4 })
  })

  it('Deve conseguir concluir uma missão corretamente e receber seus prêmios', async () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 7, expansoes)
    const personagemAtualizado = await realizarMissao(personagem, missaoSelecionada)
    const personagemEsperado = { nome: 'Jaina', raca: 'Humano', equipamentos: [], nivel: 9, dinheiro: 170, vida: 14, vigor: 8, dano: 4 }
    expect(personagemAtualizado).toEqual(personagemEsperado)
  })

  it('Deve conseguir concluir uma missão de expansão corretamente e receber seus prêmios se já possuir a expansão', async () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
    }
    const expansoes = [1, 2, 3]
    const missaoSelecionada = selecionarMissao(CLONEMISSOES, 11, expansoes)
    const personagemAtualizado = await realizarMissao(personagem, missaoSelecionada)
    const personagemEsperado = { nome: 'Jaina', raca: 'Humano', equipamentos: [], nivel: 2, dinheiro: 100, vida: 6, vigor: 4, dano: 4 }
    expect(personagemAtualizado).toEqual(personagemEsperado)
  })
})