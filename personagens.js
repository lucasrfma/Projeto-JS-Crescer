export const criarPersonagem = (nome, idRaca, racas, expansoes = [0], personagens = []) => {
  const infoRaca = racas.find((raca) => {
    return raca.id === idRaca
  })

  const { raca, tipo, vidaBase, vigorBase, danoBase, idExpansao, lvlMinimoParaObter } = infoRaca

  if (tipo === 'ALIADA') {
    if (!expansoes.includes(idExpansao)) {
      throw new Error('Você não possui a expansão para criar personagens dessa raça!.')
    }

    const possuiNivelMinimo = personagens.reduce((acc, personagem) => {
      if (acc) return true
      if (personagem.nivel >= lvlMinimoParaObter) {
        return true
      }
      return false
    }, false)

    if (!possuiNivelMinimo) {
      throw new Error('Você não possui um personagem com o nivel minimo para criar personagens dessa raça!.')
    }
  }

  const personagem = {
    nome: nome,
    raca: raca,
    equipamentos: [],
    nivel: (tipo === 'NORMAL') ? 1 : 10,
    dinheiro: 0,
    vida: (tipo === 'NORMAL') ? vidaBase : (vidaBase + 8),
    vigor: (tipo === 'NORMAL') ? vigorBase : (vigorBase + 4),
    dano: danoBase
  }

  return personagem
}

export const uparPersonagem = (personagem) => {
  const novoNivel = (personagem.nivel + 1)

  if (novoNivel % 2 == 1) {
    return {
      ...personagem,
      nivel: novoNivel,
      vida: (personagem.vida + 2),
      vigor: (personagem.vigor + 1)
    }
  }

  return {
    ...personagem,
    nivel: novoNivel
  }
}