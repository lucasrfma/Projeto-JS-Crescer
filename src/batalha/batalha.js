import { getItens } from "../services/requests/axios"

export function batalhaEntrePersonagens(personagemA, personagemB,items)
{
    // dano A - Vigor B
    const danoEfetivoA = _calcularDanoEfetivo(personagemA,personagemB,items);
    // dano B - Vigor A
    const danoEfetivoB = _calcularDanoEfetivo(personagemB,personagemA,items);

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
            const vidaTotalA = _calcularVida(personagemA,items);
            const vidaTotalB = _calcularVida(personagemB,items);

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

export function _calcularDanoEfetivo(personagemA,personagemB,items)
{
    const danoBruto = _calcularDanoBruto(personagemA,items);
    const vigor = _calcularVigor(personagemB,items);
    
    const danoEfetivo = danoBruto - vigor;

    if(danoEfetivo < 0)
    {
        return 0;
    }
    return danoEfetivo;
}

export function _calcularDanoBruto(personagem,items)
{
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(items[personagem.equipamentos[i]-1].tipo === 'DANO')
        {
            return  personagem.dano + items[personagem.equipamentos[i]-1].aprimoramento;
            
        }
    }
    return personagem.dano;
}

export function _calcularVigor(personagem,items)
{
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(items[personagem.equipamentos[i]-1].tipo === 'VIGOR')
        {
            return  personagem.vigor + items[personagem.equipamentos[i]-1].aprimoramento;
            
        }
    }
    return personagem.vigor;
}

export function _calcularVida(personagem,items)
{
    for( let i = 0; i < personagem.equipamentos.length; ++i)
    {
        if(items[personagem.equipamentos[i]-1].tipo === 'VIDA')
        {
            return  personagem.vida + items[personagem.equipamentos[i]-1].aprimoramento;
            
        }
    }
    return personagem.vida;
}

