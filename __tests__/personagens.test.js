import { getRaces } from "../src/services/requests/axios"
import { criarPersonagem, uparPersonagem } from '../personagens'

let racas
let expansoes
let personagens

beforeAll(async () => {
  racas = await getRaces()
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
      nivel: 2,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }

    const personagemObtido = uparPersonagem(personagem)

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