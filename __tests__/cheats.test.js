import {
  willidan,
  gusthrall,
  anduinnunes,
  julichking,
  kevinerzul,
  fabyoggsaron,
  pablothar,
  vitorexxar,
  zorzarthas,
  diandraka,
  sergiorgrim
} from '../src/menu/cheats'
import { tratarCheats}  from '../src/menu/cheats'
import { useLocalStorage } from '../src/services/local-storage/use-local-storage'

const localStorage = useLocalStorage();
const registro = 'personagensTest';
let personagensTest;

beforeEach( () => {
  personagensTest = [{
    nome: 'Jaina',
    raca: 'Humano',
    equipamentos: [],
    nivel: 1,
    dinheiro: 0,
    vida: 6,
    vigor: 4,
    dano: 4,
    expansoes: [1, 2, 3]
  }];
  localStorage.setObject(registro,personagensTest);
})

describe('Testando cada cheat', () => {
  it('Deve conseguir aplicar o cheat WILLIDAN e subir +20 níveis do personagem selecionado', () => {
    tratarCheats('WILLIDAN', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    expect(personagemAtualizado.nivel).toBe(21);
    expect(personagemAtualizado.vida).toBe(26);
    expect(personagemAtualizado.vigor).toBe(14);
  })

  it('Deve conseguir aplicar o cheat GUSTHRALL e dar +2000 de dinheiro para o personagem selecionado', () => {
    tratarCheats('GUSTHRALL', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    expect(personagemAtualizado.dinheiro).toBe(2000)
  })

  it('Deve conseguir aplicar o cheat ANDUINNUNES e dar +20000 de dinheiro para todos os personagens', () => {
    tratarCheats('ANDUINNUNES', 0, personagensTest,registro);
    const personagensAtualizados = localStorage.getObject(registro);
    
    personagensAtualizados.forEach(personagem => {
      expect(personagem.dinheiro).toBe(20000)
    });
  })

  it('Deve conseguir aplicar o cheat JULICHKING e subir +5 níveis de todos os personagens', () => {
    tratarCheats('JULICHKING', 0, personagensTest,registro);
    const personagensAtualizados = localStorage.getObject(registro);

    personagensAtualizados.forEach(personagem => {
      expect(personagem.nivel).toBe(6)
      expect(personagem.vida).toBe(10)
      expect(personagem.vigor).toBe(6)
    });
  })

  it('Deve conseguir aplicar o cheat KEVINERZUL e receber o item Arco do callback infinito', () => {
    tratarCheats('KEVINERZUL', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const arco = { id: 26, nome: 'Arco do callback infinito', tipo: 'DANO', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(arco)
  })

  it('Deve conseguir aplicar o cheat FABYOGGSARON e receber o item Talismã do Polimorfismo', () => {
    tratarCheats('FABYOGGSARON', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat PABLOTHAR e receber o item Talismã do Polimorfismo', () => {
    tratarCheats('PABLOTHAR', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];
    
    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat VITOREXXAR e receber o item Talismã do Polimorfismo', () => {
    tratarCheats('VITOREXXAR', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat ZORZARTHAS e receber o item Talismã Indexado', () => {
    tratarCheats('ZORZARTHAS', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const talisma = { id: 28, nome: 'Talismã Indexado', tipo: 'VIDA', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat DIANDRAKA e receber o item Talismã Indexado', () => {
    tratarCheats('DIANDRAKA', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const talisma = { id: 28, nome: 'Talismã Indexado', tipo: 'VIDA', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat SERGIORGRIM e receber o item Armadura de Flexbox', () => {
    tratarCheats('SERGIORGRIM', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const armadura = { id: 29, nome: 'Armadura de Flexbox', tipo: 'VIGOR', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(armadura)
  })

  it('Deve conseguir receber o item caso já possua um item do mesmo tipo', () => {
    personagensTest = [{
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [{
        "id": 10,
        "nome": "Bracelete de vigor M",
        "tipo": "VIGOR",
        "preco": 90,
        "aprimoramento": 7
      }],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }];
    localStorage.setObject(registro,personagensTest);

    tratarCheats('SERGIORGRIM', 0, personagensTest,registro);
    personagensTest = localStorage.getObject(registro);
    
    const personagemAtualizado = personagensTest[0];

    const armadura = { id: 29, nome: 'Armadura de Flexbox', tipo: 'VIGOR', aprimoramento: '2000' }
    expect(personagemAtualizado.equipamentos[0]).toEqual(armadura)
  })
})