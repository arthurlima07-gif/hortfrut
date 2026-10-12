// Importa a função que cria um Drawer Navigator.
// O Drawer Navigator permite criar um menu lateral no aplicativo.
import { createDrawerNavigator } from '@react-navigation/drawer'

// Importa a pilha de telas relacionadas às escolas.
import TiposStack from './TiposStack'

// Importa a pilha de telas relacionadas aos alunos.
import ProdutosStack from './ProdutosStack'


// Cria uma instância do Drawer Navigator.
// Esse objeto será usado para registrar as opções do menu lateral.
const Drawer = createDrawerNavigator()


// Componente responsável por configurar o menu lateral da aplicação.
export default function DrawerNavigator() {
  return (
    // Container do Drawer, onde ficam as opções do menu lateral.
    <Drawer.Navigator>

      {/* Opção do menu que abre o fluxo de telas de escolas */}
      <Drawer.Screen name="Tipos" component={TiposStack} />

      {/* Opção do menu que abre o fluxo de telas de alunos */}
      <Drawer.Screen name="Produtos" component={ProdutosStack} />

    </Drawer.Navigator>
  )
}
