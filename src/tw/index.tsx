import { Link as RouterLink } from 'expo-router';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { withUniwind } from 'uniwind';

// Los componentes de react-native ya soportan className nativamente en Uniwind
// Solo envolvemos el Link de expo-router que es un componente de terceros
const LinkComponent = withUniwind(RouterLink);

export const Link = Object.assign(LinkComponent, {
  Trigger: RouterLink.Trigger,
  Menu: RouterLink.Menu,
  MenuAction: RouterLink.MenuAction,
  Preview: RouterLink.Preview,
});

// Re-exportar componentes nativos (ya soportan className en Uniwind)
export {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
};
