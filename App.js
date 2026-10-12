// Import necessário para habilitar gestos no React Navigation (ex: Drawer, swipe).
// Deve ser o primeiro import do app.
import 'react-native-gesture-handler'

// Importa o componente principal de navegação do projeto.
import AppNavigator from './src/navigation/AppNavigator'

// Componente raiz da aplicação.
export default function App() {

  // Renderiza o AppNavigator, que contém todas as telas e rotas.
  return <AppNavigator />
}