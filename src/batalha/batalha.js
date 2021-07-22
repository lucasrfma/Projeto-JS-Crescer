export function batalhaEntrePersonagens(personagemA, personagemB)
{
    // dano A - Vigor B
    const danoEfetivoA = calcularDanoEfetivo(personagemA,personagemB);
    // dano B - Vigor A
    const danoEfetivoB = calcularDanoEfetivo(personagemB,personagemA);

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
            const vidaTotalA = calcularVida(personagemA);
            const vidaTotalB = calcularVida(personagemB);

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

export function calcularDanoEfetivo(personagemA,personagemB)
{
    const danoBruto = calcularDanoBruto(personagemA);
    const vigor = calcularVigor(personagemB);
    
    const danoEfetivo = danoBruto - vigor;

    if(danoEfetivo < 0)
    {
        return 0;
    }
    return danoEfetivo;
}

export function calcularDanoBruto(personagem)
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

export function calcularVigor(personagem)
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

export function calcularVida(personagem)
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

