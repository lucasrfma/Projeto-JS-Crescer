import axios from 'axios'

const getRaces = async () => {
    const res = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/races.json');
    return res.data
}

const getQuests = async () => {
    const res = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/quests.json');
    return res.data
}

const getItens = async () => {
    const res = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/store.json');
    return res.data
}

export { getRaces, getQuests, getItens }