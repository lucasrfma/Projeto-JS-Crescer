import { getItens } from "../src/services/requests/axios";
import {batalhaEntrePersonagens,
        _calcularDanoBruto,
        _calcularDanoEfetivo,
        _calcularVida,
        _calcularVigor} from '../src/batalha/batalha';

let items;

beforeAll(async () => {
    items = await getItens();
});

const varian = {
    nome: 'Varian',
    raca: 'Humano',
    equipamentos: [1,5,9],
    nivel: 9,
    dinheiro: 0,
    vida: 13,
    vigor: 8,
    dano: 5
};

const varianForte = {
    nome: 'Varian',
    raca: 'Humano',
    equipamentos: [2,5,9],
    nivel: 9,
    dinheiro: 0,
    vida: 13,
    vigor: 8,
    dano: 5
};

const thrall = {
    nome: 'Thrall',
    raca: 'Orc',
    equipamentos: [1,5,9],
    nivel: 9,
    dinheiro: 0,
    vida: 14,
    vigor: 8,
    dano: 5
};

describe('Testes de identificação de vencedor', () => {

    it('Deve conseguir finalizar a batalha e obter um vencedor com sucesso', () => {
        const resultadoEsperado = 1;

        expect(batalhaEntrePersonagens(varianForte,thrall,items)).toBe(resultadoEsperado);
    }),
    
    it('Deve conseguir declarar empate em uma batalha', () => {
        const resultadoEsperado = 0;
          
        expect(batalhaEntrePersonagens(varian,thrall,items)).toBe(resultadoEsperado);
    }),

    it('Deve depender da sorte quando ambos os personagens precisarem do mesmo numero de turnos para derrotar o outro', () => {
        let resultadoMedio = 0;

        for(let i = 1; i <= 2000; ++i)
        {
            resultadoMedio += (batalhaEntrePersonagens(varianForte,varianForte,items)-resultadoMedio)/i;
        }

        const resultadoEsperado = 1.5;

        expect(resultadoMedio).toBeCloseTo(resultadoEsperado,1)
    })
});

describe('Testes de Cálculo de Atributos', () => {
    
    it('Deve calcular o vigor corretamente com o atributo atual + equipamentos', () => {
        const vigorEsperado = 11;

        expect(_calcularVigor(varian,items)).toBe(vigorEsperado);
    }),
    
    it('Deve calcular a vida corretamente com o atributo atual + equipamentos', () => {
        const vidaEsperada = 16;
        
        expect(_calcularVida(varian,items)).toBe(vidaEsperada);
    }),
    
    it('Deve calcular o dano corretamente com o atributo atual + equipamentos', () => {
        const danoEsperado = 8;
        
        expect(_calcularDanoBruto(varian,items)).toBe(danoEsperado);
    }),

    it('Deve calcular o dano efetivo a partir do dano do atacante e vigor do defensor', () => {
        const danoEsperadoVarianVsThrall = 0;
        const danoEsperadoVarianForteVsThrall = 1;
        
        expect(_calcularDanoEfetivo(varian,thrall,items)).toBe(danoEsperadoVarianVsThrall);
        expect(_calcularDanoEfetivo(varianForte,thrall,items)).toBe(danoEsperadoVarianForteVsThrall);
    })

    // Testes obrigatórios (esperar a parte de criação de char para testar)
    it('Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos', () => {
        
    }),
    
    it('Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos', () => {
        
    }),

    it('Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos', () => {

    })
});