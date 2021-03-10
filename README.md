![](https://cdn.ome.lt/ztAQkeYbxnk2jh4BQJFYhK77Fi4=/1200x630/smart/extras/conteudos/world-of-warcraft_32cZI3g.jpg)
# TCC - World of E-crescer

## Introdução

Um rpg de console com diferentes expansões onde você pode criar personagens de diferentes raças, batalhar entres eles e fazer missões para ganhar experiências e dinheiro para fortalecer seu personagem.

## Exemplo de Menus

### Menu de Jogador:

1 - Criar Personagem
2 - Selecionar Personagem
3 - Sair

### Menu do personagem selecionado:

1 - Batalhar
2 - Realizar Missões
3 - Loja
4 - Sair

## Requisitos

### 1 - Criação de personagem:

O jogador poderá criar vários personagens para testar diferentes combinações, o personagem será constituído das seguintes informações:

```jsx
{
  nome,
  raca,
  equipamentos,
  nivel,
  dinheiro,
  vida,
  vigor,
  dano
}
```

- O personagem de raça normal iniciará no nível um, de raça aliada iniciará no nível 10
- A cada dois aumentos de nível o personagem recebe 2 de bônus de vida e 1 de vigor.
- O personagem começa sem equipamentos e sem dinheiro
- O vigor, vida e dano inicial são calculados com base no vigor, vida e dano da raça escolhida
- O vigor diminui o dano que o personagem recebe.

> Como vão funcionar as raças?

Vocês vão obter as raças a partir de uma chamada GET na url [https://gustavobuttenbender.github.io/gus.github/woe/races.json.](https://gustavobuttenbender.github.io/gus.github/woe/races.json) Eu só posso utilizar as raças que estão disponíveis para a expansão que eu tiver comprado(REQ4). As raças podem ser de 2 tipos, normal ou aliada.

Exemplo de objeto de raça normal:

```jsx
{
    id: 1
	raca: "Elfo Sangrento",
	danoBase: 4,
	vidaBase: 5,
	vigorBase: 1,
	tipo: 'NORMAL'
  idExpansao: 1 //pode ou não ter esse atributo
{,
{
    id: 2
	raca: "Orc",
	danoBase: 3,
	vidaBase: 3,
	vigorBase: 3,
	tipo: 'NORMAL'
{
```

Exemplo de objeto de raça aliada:

```jsx
{
    id: 1
	raca: "Filho da noite",
	danoBase: 4,
	vidaBase: 5,
	vigorBase: 1,
	tipo: 'ALIADA',
    lvlMinimoParaObter: 23
    idExpansao: 6 //pode ou não ter esse atributo
{
```

- raças que possuirem um id de expansão no objeto significam que você precisa ter comprado a expansão(REQ4) para liberar a devida raça
- raças do tipo ALIADA só podem ser obtidas depois que algum personagem do usuário já está em determinado nível

## 2 - Batalha entre personagens

A batalha será 1x1, vence quem deixar a vida do outro em zero primeiro. A cada vitória o personagem vencedor sobe um nível. (50% de chance para começar a batalha)

Exemplo:

Personagem A: 20 vida total (equipamentos + bonus de raça) / 10 vigor total (equipamentos + bonus de raça) / 6 da dano (equipamentos + bonus de raça)

Personagem B: 15 vida total (equipamentos + bonus de raça) / 4 vigor total (equipamentos + bonus de raça) / 16 da dano (equipamentos + bonus de raça)

Rodada 1: Personagem A começa atacando.

Output: Personagem A - 20 vida / 10 vigor / 6 dano | Personagem B - 13 vida / 4 vigor /  16 dano

Rodada 2: Personagem B ataca.

Output: Personagem A - 14 vida / 10 vigor / 6 dano | Personagem B - 13 vida / 4 vigor /  16 dano

Rodada 3: Personagem A ataca.

Output: Personagem A - 14 vida / 10 vigor / 6 dano | Personagem B - 11 vida / 4 vigor /  16 dano

Rodada 4: Personagem B ataca.

Output: Personagem A - 8 vida / 10 vigor / 6 dano | Personagem B - 11 vida / 4 vigor /  16 dano

E assim por diante.

Consideração: no caso dos dois lutadores tenham vigor mais alto que o dano do seu inimigo, a aplicação deve declarar empate.

## 3 - Missões

Vocês vão obter as missões a partir de uma chamada GET na url [https://gustavobuttenbender.github.io/gus.github/woe/quests.json](https://gustavobuttenbender.github.io/gus.github/woe/quests.json).As missões irão levar um tempo(em ms) para serem executadas, a missão pode ter dar níveis e dinheiro.

Exemplo de objeto de missão:

```jsx
{
	descricao: 'Matar um dragão',
	tempoEstimado: 40000000000,
	niveisRecebidos: 20,
	dinheiroRecebido: 100000,
{,
{
	descricao: 'Limpar a casa do Asa da morte',
	tempoEstimado: 4000000000,
	niveisRecebidos: 0,
	dinheiroRecebido: 1000000000,
	idExpansao: 3 // pode ou não existir esse atributo
{
```

- As missões também podem estar vinculadas a uma expansão específica e só podem serem feitas se o jogador tiver comprado a expansão(REQ4).

## 4 - Loja

Vocês vão obter os itens a venda na loja a partir de uma chamada GET na url [https://gustavobuttenbender.github.io/gus.github/woe/store.json.](https://gustavobuttenbender.github.io/gus.github/woe/store.json) Esses itens podem ser equipamentos que irão fortalecer os atributos do personagem, como vigor, dano e vida, como uma expansão, que irá habilitar mais coisas no jogo.

Exemplos de objetos de item da loja:

```jsx
{
	nome: 'Espada curta',
	tipo: 'DANO',
	preço: 20,
	aprimoramento: '2',
	lvlMinimo: 0,
{,
{
	nome: 'Glaives do Illidan',
	tipo: 'DANO',
	preço: 200,
	aprimoramento: '20',
	lvlMinimo: 10,
    idExpansao: 1 // pode ou não existir esse atributo
{,
{
	nome: 'Burning Crusade',
	idExpansao: 1
	tipo: 'EXPANSAO',
	preço: 200000,
}
```

- Os itens podem pedir um nível mínimo de personagem para serem comprados.
- Itens do tipo DANO, VIGOR, VIDA equipados aumentam os devidos atributos do personagem.
- Itens do tipo EXPANSAO habilitam novas raças, missões e equipamentos no jogo.
- Itens de equipamentos que possuírem o atributo idExpansao significam que o personagem só poderá te-lo se já tiver comprado a expansão na loja.
- Itens de expansão sempre terão o idExpansao, esse será o id que você usará pra ver se pode habilitar o item. Exemplo, se eu possuo a expansão de id 1 (Burning Crusade) eu poderei comprar o item Glaives do Illidan, que foi adicionado nesta expansão.
- A partir do momento que uma expansão for comprada ela é habilitada pra todos personagens e não pode aparecer na lista novamente pra ser comprada.
- Se o personagem já possui o item ele não pode aparecer mais na lista pra ser comprado.
- Cada personagem só pode ter um equipamento por atributo.
- Deve ser possível vender itens ao mercador, o jogador que tomar essa decisão deverá escolher um item do seu inventário para vender, e terá como retorno da venda metade do dinheiro que pagou no item.

## 5 - Cheats

Durante qualquer momento onde o jogador tiver realizando algum input de dado no jogo ele poderá realizar um cheat. Esse cheat é um texto pré-definido que irá habilitar certas recompensas para o personagem. Caso o usuário tenha inputado algum comando de cheat, a aplicação deve aplicar o cheat e continuar de onde parou.

Cheats definidos:

- WILLIDAN: +20 níveis pro personagem selecionado
- GUSTHRALL: +2000 de dinheiro pro personagem selecionado
- ANDUINNUNES: +20000 de dinheiro para todos personagens
- JULICHKING: + 5 níveis para todos personagens
- KEVINERZUL: O personagem recebe o seguinte item:

```jsx
{
	nome: 'Arco do callback infinito',
	tipo: 'DANO',
	aprimoramento: '2000',
{
```

- FABYOGGSARON: O personagem recebe o seguinte item:
- PABLOTHAR:  O personagem recebe o seguinte item:
- VITOREXXAR: O personagem recebe o seguinte item:

```jsx
{
	nome: 'Talismã do Polimorfismo',
	tipo: 'VIDA',
	aprimoramento: '2000',
{
```

- ZORZARTHAS: O personagem recebe o seguinte item:
- DIANDRAKA: O personagem recebe o seguinte item:

```jsx
{
	nome: 'Talismã Indexado',
	tipo: 'VIDA',
	aprimoramento: '2000',
{
```

- SERGIORGRIM: O personagem recebe o seguinte item

```jsx
{
	nome: 'Armadura de Flexbox',
	tipo: 'VIGOR',
	aprimoramento: '2000',
{
```

Bom trabalho!
