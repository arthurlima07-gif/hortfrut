// Importa o NavigationContainer.
// Ele é obrigatório para que o React Navigation funcione.
// Esse componente envolve toda a navegação do aplicativo.
import { NavigationContainer } from '@react-navigation/native'

// Importa o DrawerNavigator, que contém o menu lateral do app.
import DrawerNavigator from './DrawerNavigator'


// Componente principal de navegação da aplicação.
export default function AppNavigator() {
  return (
    // O NavigationContainer gerencia o estado da navegação.
    // Sem ele, as rotas, telas e menus não funcionam corretamente.
    <NavigationContainer>

      {/* Renderiza o navegador principal do app */}
      <DrawerNavigator />

    </NavigationContainer>
  )
}