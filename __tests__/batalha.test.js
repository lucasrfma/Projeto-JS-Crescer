import {batalhaEntrePersonagens,
        calcularDanoBruto,
        calcularDanoEfetivo,
        calcularVida,
        calcularVigor} from '../src/batalha/batalha'

const varian = {
    nome: 'Varian',
    raca: 'Humano',
    equipamentos: [{nome: 'Espada curta',
                    tipo: 'DANO',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0},
                    {nome: 'Talismã de vida P',
                    tipo: 'VIDA',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0},
                    {nome: 'Bracelete de vigor P',
                    tipo: 'VIGOR',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0}],
    nivel: 9,
    dinheiro: 0,
    vida: 13,
    vigor: 8,
    dano: 5
};

const varianForte = {
    nome: 'Varian',
    raca: 'Humano',
    equipamentos: [{nome: 'Espada longa',
                    tipo: 'DANO',
                    preco: 90,
                    aprimoramento: 7,
                    lvlMinimo: 0},
                    {nome: 'Talismã de vida P',
                    tipo: 'VIDA',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0},
                    {nome: 'Bracelete de vigor P',
                    tipo: 'VIGOR',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0}],
    nivel: 9,
    dinheiro: 0,
    vida: 13,
    vigor: 8,
    dano: 5
};

const thrall = {
    nome: 'Thrall',
    raca: 'Orc',
    equipamentos: [{nome: 'Espada curta',
                    tipo: 'DANO',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0},
                    {nome: 'Talismã de vida P',
                    tipo: 'VIDA',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0},
                    {nome: 'Bracelete de vigor P',
                    tipo: 'VIGOR',
                    preco: 40,
                    aprimoramento: 3,
                    lvlMinimo: 0}],
    nivel: 9,
    dinheiro: 0,
    vida: 14,
    vigor: 8,
    dano: 5
};

describe('Testes de identificação de vencedor', () => {

    it('Deve conseguir finalizar a batalha e obter um vencedor com sucesso', () => {
        const resultadoEsperado = 1;

        expect(batalhaEntrePersonagens(varianForte,thrall)).toBe(resultadoEsperado);
    }),
    
    it('Deve conseguir declarar empate em uma batalha', () => {
        const resultadoEsperado = 0;
          
        expect(batalhaEntrePersonagens(varian,thrall)).toBe(resultadoEsperado);
    }),

    it('Deve depender da sorte quando ambos os personagens precisarem do mesmo numero de turnos para derrotar o outro', () => {
        let resultadoMedio = 0;

        for(let i = 1; i <= 2000; ++i)
        {
            resultadoMedio += (batalhaEntrePersonagens(varianForte,varianForte)-resultadoMedio)/i;
        }

        const resultadoEsperado = 1.5;

        expect(resultadoMedio).toBeCloseTo(resultadoEsperado,1)
    })
});

describe('Testes de Cálculo de Atributos', () => {
    
    it('Deve calcular o vigor corretamente com o atributo atual + equipamentos', () => {
        const vigorEsperado = 11;

        expect(calcularVigor(varian)).toBe(vigorEsperado);
    }),
    
    it('Deve calcular a vida corretamente com o atributo atual + equipamentos', () => {
        const vidaEsperada = 16;
        
        expect(calcularVida(varian)).toBe(vidaEsperada);
    }),
    
    it('Deve calcular o dano corretamente com o atributo atual + equipamentos', () => {
        const danoEsperado = 8;
        
        expect(calcularDanoBruto(varian)).toBe(danoEsperado);
    }),

    it('Deve calcular o dano efetivo a partir do dano do atacante e vigor do defensor', () => {
        const danoEsperadoVarianVsThrall = 0;
        const danoEsperadoVarianForteVsThrall = 1;
        
        expect(calcularDanoEfetivo(varian,thrall)).toBe(danoEsperadoVarianVsThrall);
        expect(calcularDanoEfetivo(varianForte,thrall)).toBe(danoEsperadoVarianForteVsThrall);
    })

    // Testes obrigatórios (esperar a parte de criação de char para testar)
    // it('Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos', () => {
        
    // }),
    
    // it('Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos', () => {
        
    // }),

    // it('Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos', () => {

    // })
});