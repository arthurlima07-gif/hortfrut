// Importa a função que cria um Stack Navigator.
// O Stack Navigator permite navegar entre telas em formato de pilha.
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importa a tela que lista as escolas cadastradas.
import EscolasList from '../screens/escolas/EscolasList'

// Importa a tela de formulário para criar ou editar uma escola.
import EscolaForm from '../screens/escolas/EscolaForm'


// Cria uma instância do Stack Navigator.
const Stack = createNativeStackNavigator()


// Componente responsável pela navegação interna da área de escolas.
export default function EscolasStack() {
  return (
    // Container do Stack, onde as telas do fluxo de escolas são registradas.
    <Stack.Navigator>

      {/* Tela principal do fluxo de escolas */}
      <Stack.Screen
        name="EscolasList" // Nome da rota usado na navegação
        component={EscolasList} // Componente que será exibido nessa rota
        options={{ title: 'Escolas' }} // Título exibido no topo da tela
      />

      {/* Tela de formulário de escola */}
      <Stack.Screen
        name="EscolaForm" // Nome usado para navegar até o formulário
        component={EscolaForm} // Componente do formulário
        options={{ title: 'Form Escola' }} // Título exibido no topo da tela
      />

    </Stack.Navigator>
  )
}