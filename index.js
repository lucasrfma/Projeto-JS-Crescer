import { useQuestion } from './src/services/question/use-question'
import { useLocalStorage } from './src/services/local-storage/use-local-storage'

const main = async () => {
  const localStorage = useLocalStorage()
  const nome = await useQuestion('Qual o seu nome?')

  localStorage.setString('nome-string', nome)
  localStorage.setObject('nome-obj', { nome })
  // localStorage.setObject('nome-array', [{nome}])

  localStorage.setObject('nome-array', [ ...localStorage.getObject('nome-array'), { nome }])
  
  console.log(localStorage.getString('nome-string'))
  console.log(localStorage.getObject('nome-obj'))
  console.log(localStorage.getObject('nome-array'))
}

main()