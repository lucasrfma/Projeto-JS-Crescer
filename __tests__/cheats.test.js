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

describe('Testando cada cheat', () => {
  it('Deve conseguir aplicar o cheat WILLIDAN e subir +20 níveis do personagem selecionado', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const personagemAtualizado = willidan(personagem)
    expect(personagemAtualizado.nivel).toBe(21)
    expect(personagemAtualizado.vida).toBe(26)
    expect(personagemAtualizado.vigor).toBe(14)
  })

  it('Deve conseguir aplicar o cheat GUSTHRALL e dar +2000 de dinheiro para o personagem selecionado', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const personagemAtualizado = gusthrall(personagem)
    expect(personagemAtualizado.dinheiro).toBe(2000)
  })

  it('Deve conseguir aplicar o cheat ANDUINNUNES e dar +20000 de dinheiro para todos os personagens', () => {
    const personagens = [{
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }, {
      nome: 'Vhrall',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }]
    const personagensAtualizados = anduinnunes(personagens)
    personagensAtualizados.forEach(personagem => {
      expect(personagem.dinheiro).toBe(20000)
    });
  })

  it('Deve conseguir aplicar o cheat JULICHKING e subir +5 níveis de todos os personagens', () => {
    const personagens = [{
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }, {
      nome: 'Vhrall',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }]
    const personagensAtualizados = julichking(personagens)
    personagensAtualizados.forEach(personagem => {
      expect(personagem.nivel).toBe(6)
      expect(personagem.vida).toBe(10)
      expect(personagem.vigor).toBe(6)
    });
  })

  it('Deve conseguir aplicar o cheat KEVINERZUL e receber o item Arco do callback infinito', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const arco = { id: 26, nome: 'Arco do callback infinito', tipo: 'DANO', aprimoramento: '2000' }
    const personagemAtualizado = kevinerzul(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(arco)
  })

  it('Deve conseguir aplicar o cheat FABYOGGSARON e receber o item Talismã do Polimorfismo', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    const personagemAtualizado = fabyoggsaron(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat PABLOTHAR e receber o item Talismã do Polimorfismo', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    const personagemAtualizado = pablothar(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat VITOREXXAR e receber o item Talismã do Polimorfismo', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const talisma = { id: 27, nome: 'Talismã do Polimorfismo', tipo: 'VIDA', aprimoramento: '2000' }
    const personagemAtualizado = vitorexxar(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat ZORZARTHAS e receber o item Talismã Indexado', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const talisma = { id: 28, nome: 'Talismã Indexado', tipo: 'VIDA', aprimoramento: '2000' }
    const personagemAtualizado = zorzarthas(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat DIANDRAKA e receber o item Talismã Indexado', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const talisma = { id: 28, nome: 'Talismã Indexado', tipo: 'VIDA', aprimoramento: '2000' }
    const personagemAtualizado = diandraka(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(talisma)
  })

  it('Deve conseguir aplicar o cheat SERGIORGRIM e receber o item Armadura de Flexbox', () => {
    const personagem = {
      nome: 'Jaina',
      raca: 'Humano',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4,
      expansoes: [1, 2, 3]
    }
    const armadura = { id: 29, nome: 'Armadura de Flexbox', tipo: 'VIGOR', aprimoramento: '2000' }
    const personagemAtualizado = sergiorgrim(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(armadura)
  })

  it('Deve conseguir receber o item caso já possua um item do mesmo tipo', () => {
    const personagem = {
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
    }
    const armadura = { id: 29, nome: 'Armadura de Flexbox', tipo: 'VIGOR', aprimoramento: '2000' }
    const personagemAtualizado = sergiorgrim(personagem)
    expect(personagemAtualizado.equipamentos[0]).toEqual(armadura)
  })
})