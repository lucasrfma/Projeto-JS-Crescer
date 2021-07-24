import racasParaTestes from '../racas-para-testes.json'
import itensParaTestes from '../itens-para-testes.json'
import { criarPersonagem } from '../src/personagens/personagens';
import {
  batalhaEntrePersonagens,
  _calcularDanoBruto,
  _calcularDanoEfetivo,
  _calcularVida,
  _calcularVigor
} from '../src/batalha/batalha';

let itens;
let racas;

beforeAll(() => {
  itens = itensParaTestes
  racas = racasParaTestes
});

const varian = {
  nome: 'Varian',
  raca: 'Humano',
  equipamentos: [{
    "id": 1,
    "nome": "Espada curta",
    "tipo": "DANO",
    "preco": 40,
    "aprimoramento": 3
  }, {
    "id": 5,
    "nome": "Talismã de vida P",
    "tipo": "VIDA",
    "preco": 40,
    "aprimoramento": 3
  }, {
    "id": 9,
    "nome": "Bracelete de vigor P",
    "tipo": "VIGOR",
    "preco": 40,
    "aprimoramento": 3
  }],
  nivel: 9,
  dinheiro: 0,
  vida: 13,
  vigor: 8,
  dano: 5
};

const varianForte = {
  nome: 'Varian',
  raca: 'Humano',
  equipamentos: [{
    "id": 2,
    "nome": "Espada longa",
    "tipo": "DANO",
    "preco": 90,
    "aprimoramento": 7
  }, {
    "id": 5,
    "nome": "Talismã de vida P",
    "tipo": "VIDA",
    "preco": 40,
    "aprimoramento": 3
  }, {
    "id": 9,
    "nome": "Bracelete de vigor P",
    "tipo": "VIGOR",
    "preco": 40,
    "aprimoramento": 3
  }],
  nivel: 9,
  dinheiro: 0,
  vida: 13,
  vigor: 8,
  dano: 5
};

const thrall = {
  nome: 'Thrall',
  raca: 'Orc',
  equipamentos: [{
    "id": 1,
    "nome": "Espada curta",
    "tipo": "DANO",
    "preco": 40,
    "aprimoramento": 3
  }, {
    "id": 5,
    "nome": "Talismã de vida P",
    "tipo": "VIDA",
    "preco": 40,
    "aprimoramento": 3
  }, {
    "id": 9,
    "nome": "Bracelete de vigor P",
    "tipo": "VIGOR",
    "preco": 40,
    "aprimoramento": 3
  }],
  nivel: 9,
  dinheiro: 0,
  vida: 14,
  vigor: 8,
  dano: 5
};

describe('Testes de identificação de vencedor', () => {

  it('Deve conseguir finalizar a batalha e obter um vencedor com sucesso', () => {
    const resultadoEsperado = 1;

    expect(batalhaEntrePersonagens(varianForte, thrall)).toBe(resultadoEsperado);
  }),

    it('Deve conseguir declarar empate em uma batalha', () => {
      const resultadoEsperado = 0;

      expect(batalhaEntrePersonagens(varian, thrall)).toBe(resultadoEsperado);
    }),

    it('Deve depender da sorte quando ambos os personagens precisarem do mesmo numero de turnos para derrotar o outro', () => {
      let resultadoMedio = 0;

      for (let i = 1; i <= 2000; ++i) {
        resultadoMedio += (batalhaEntrePersonagens(varianForte, varianForte) - resultadoMedio) / i;
      }

      const resultadoEsperado = 1.5;

      expect(resultadoMedio).toBeCloseTo(resultadoEsperado, 1)
    })
});

describe('Testes de Cálculo de Atributos', () => {

  it('Deve calcular o vigor corretamente com o atributo atual + equipamentos', () => {
    const vigorEsperado = 11;

    expect(_calcularVigor(varian)).toBe(vigorEsperado);
  }),

    it('Deve calcular a vida corretamente com o atributo atual + equipamentos', () => {
      const vidaEsperada = 16;

      expect(_calcularVida(varian)).toBe(vidaEsperada);
    }),

    it('Deve calcular o dano corretamente com o atributo atual + equipamentos', () => {
      const danoEsperado = 8;

      expect(_calcularDanoBruto(varian)).toBe(danoEsperado);
    }),

    it('Deve calcular o dano efetivo a partir do dano do atacante e vigor do defensor', () => {
      const danoEsperadoVarianVsThrall = 0;
      const danoEsperadoVarianForteVsThrall = 1;

      expect(_calcularDanoEfetivo(varian, thrall)).toBe(danoEsperadoVarianVsThrall);
      expect(_calcularDanoEfetivo(varianForte, thrall)).toBe(danoEsperadoVarianForteVsThrall);
    })

  // Testes obrigatórios (esperar a parte de criação de char para testar)
  it('Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos', () => {

    // vigor base humano = 4
    const personagemObtido = criarPersonagem('Varian', 2, racas);
    // +3 vigor equipamento = 7 vigor
    personagemObtido.equipamentos.push(itens[8]);
    const vigorEsperado = 7;

    expect(_calcularVigor(personagemObtido)).toBe(vigorEsperado);
    
  }),
  
  it('Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos', () => {
    // vida base humano = 5
    const personagemObtido = criarPersonagem('Varian', 2, racas);
    // +3 vida equipamento = 8 vida
    personagemObtido.equipamentos.push(itens[4]);
    const vidaEsperada = 8;
  
    expect(_calcularVida(personagemObtido)).toBe(vidaEsperada);
  }),
  
  it('Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos', () => {
    // dano base humano = 5
    const personagemObtido = criarPersonagem('Varian', 2, racas);
    // +3 dano equipamento = 8 dano
    personagemObtido.equipamentos.push(itens[0]);
    const danoEsperado = 8;
  
    expect(_calcularDanoBruto(personagemObtido)).toBe(danoEsperado);  
    })
});