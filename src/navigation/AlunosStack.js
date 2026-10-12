// Importa a função que cria um Stack Navigator.
// O Stack Navigator permite navegar entre telas em formato de pilha,
// onde uma tela "empilha" sobre a outra (ex: lista → formulário → detalhes).
import { createNativeStackNavigator } from "@react-navigation/native-stack"


// Importa a tela que lista os alunos cadastrados.
import AlunosList from "../screens/alunos/AlunosList"

// Importa a tela de formulário para criar ou editar um aluno.
import AlunoForm from "../screens/alunos/AlunoForm"


// Cria uma instância do Stack Navigator.
// Esse objeto será usado para definir as telas e a navegação entre elas.
const Stack = createNativeStackNavigator()


// Componente que define a navegação interna da área de alunos.
export default function AlunosStack() {
  return (

    // Container do Stack, responsável por gerenciar as telas e a navegação.
    <Stack.Navigator>

      {/* Define a primeira tela do fluxo (por padrão é a inicial) */}
      <Stack.Screen
        name="AlunosList" // Nome da rota usado na navegação
        component={AlunosList} // Componente que será exibido
        options={{ title: "Alunos" }} // Título exibido no topo da tela
      />

      {/* Segunda tela do fluxo */}
      <Stack.Screen
        name="AlunoForm" // Nome usado para navegar até o formulário
        component={AlunoForm} // Componente do formulário
        options={{ title: "Aluno Form" }} // Título da tela no header
      />

    </Stack.Navigator>
  )
}