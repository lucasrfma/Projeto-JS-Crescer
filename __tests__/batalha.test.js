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
  equipamentos: [1, 5, 9],
  nivel: 9,
  dinheiro: 0,
  vida: 13,
  vigor: 8,
  dano: 5
};

const varianForte = {
  nome: 'Varian',
  raca: 'Humano',
  equipamentos: [2, 5, 9],
  nivel: 9,
  dinheiro: 0,
  vida: 13,
  vigor: 8,
  dano: 5
};

const thrall = {
  nome: 'Thrall',
  raca: 'Orc',
  equipamentos: [1, 5, 9],
  nivel: 9,
  dinheiro: 0,
  vida: 14,
  vigor: 8,
  dano: 5
};

describe('Testes de identificação de vencedor', () => {

  it('Deve conseguir finalizar a batalha e obter um vencedor com sucesso', () => {
    const resultadoEsperado = 1;

    expect(batalhaEntrePersonagens(varianForte, thrall, itens)).toBe(resultadoEsperado);
  }),

    it('Deve conseguir declarar empate em uma batalha', () => {
      const resultadoEsperado = 0;

      expect(batalhaEntrePersonagens(varian, thrall, itens)).toBe(resultadoEsperado);
    }),

    it('Deve depender da sorte quando ambos os personagens precisarem do mesmo numero de turnos para derrotar o outro', () => {
      let resultadoMedio = 0;

      for (let i = 1; i <= 2000; ++i) {
        resultadoMedio += (batalhaEntrePersonagens(varianForte, varianForte, itens) - resultadoMedio) / i;
      }

      const resultadoEsperado = 1.5;

      expect(resultadoMedio).toBeCloseTo(resultadoEsperado, 1)
    })
});

describe('Testes de Cálculo de Atributos', () => {

  it('Deve calcular o vigor corretamente com o atributo atual + equipamentos', () => {
    const vigorEsperado = 11;

    expect(_calcularVigor(varian, itens)).toBe(vigorEsperado);
  }),

    it('Deve calcular a vida corretamente com o atributo atual + equipamentos', () => {
      const vidaEsperada = 16;

      expect(_calcularVida(varian, itens)).toBe(vidaEsperada);
    }),

    it('Deve calcular o dano corretamente com o atributo atual + equipamentos', () => {
      const danoEsperado = 8;

      expect(_calcularDanoBruto(varian, itens)).toBe(danoEsperado);
    }),

    it('Deve calcular o dano efetivo a partir do dano do atacante e vigor do defensor', () => {
      const danoEsperadoVarianVsThrall = 0;
      const danoEsperadoVarianForteVsThrall = 1;

      expect(_calcularDanoEfetivo(varian, thrall, itens)).toBe(danoEsperadoVarianVsThrall);
      expect(_calcularDanoEfetivo(varianForte, thrall, itens)).toBe(danoEsperadoVarianForteVsThrall);
    })

  // Testes obrigatórios (esperar a parte de criação de char para testar)
  it('Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos', () => {

    const personagemObtido = criarPersonagem('Varian', 5, racas);

  }),

    it('Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos', () => {

    }),

    it('Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos', () => {

    })
});