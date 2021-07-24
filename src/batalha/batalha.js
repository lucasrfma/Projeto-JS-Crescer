export function batalhaEntrePersonagens(personagemA, personagemB)
{
    // dano A - Vigor B
    const danoEfetivoA = _calcularDanoEfetivo(personagemA,personagemB);
    // dano B - Vigor A
    const danoEfetivoB = _calcularDanoEfetivo(personagemB,personagemA);

    if(danoEfetivoA == 0)
    {
        if(danoEfetivoB == 0)
        {
            return 0;
        }
        else
        {
            return 2;
        }
    }
    else
    {
        if(danoEfetivoB == 0)
        {
            return 1;
        }
        else
        {
            const vidaTotalA = _calcularVida(personagemA);
            const vidaTotalB = _calcularVida(personagemB);

            const rodadasParaGanharA = Math.ceil(vidaTotalB/danoEfetivoA);
            const rodadasParaGanharB = Math.ceil(vidaTotalA/danoEfetivoB);

            if( rodadasParaGanharA < rodadasParaGanharB )
            {
                return 1;
            }
            else if ( rodadasParaGanharA > rodadasParaGanharB )
            {
                return 2;
            }
            else
            {
                const moeda = Math.random();
                if( moeda < 0.5 )
                {
                    return 1;
                }
                return 2;
            }
        }
    }
}

export function _calcularDanoEfetivo(personagemA,personagemB)
{
    const danoBruto = _calcularDanoBruto(personagemA);
    const vigor = _calcularVigor(personagemB);
    
    const danoEfetivo = danoBruto - vigor;

    if(danoEfetivo < 0)
    {
        return 0;
    }
    return danoEfetivo;
}

export function _calcularDanoBruto(personagem)
{
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(personagem.equipamentos[i].tipo === 'DANO')
        {
            return  personagem.dano + personagem.equipamentos[i].aprimoramento;
        }
    }
    return personagem.dano;
}

export function _calcularVigor(personagem)
{
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(personagem.equipamentos[i].tipo === 'VIGOR')
        {
            return  personagem.vigor + personagem.equipamentos[i].aprimoramento;
        }
    }
    return personagem.vigor;
}

export function _calcularVida(personagem)
{
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(personagem.equipamentos[i].tipo === 'VIDA')
        {
            return  personagem.vida + personagem.equipamentos[i].aprimoramento;
        }
    }
    return personagem.vida;
}

