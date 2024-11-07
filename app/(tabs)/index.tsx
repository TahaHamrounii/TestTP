import { Image, StyleSheet, View } from 'react-native';
import Bibliotheque from '@/components/Bibliotheque';
import Details from '@/components/Details';
import AjouterModifer from '@/components/AjouterModifier';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();


export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Bibliotheque" component={Bibliotheque} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="AjouterModifier" component={AjouterModifer} />
    </Stack.Navigator>  );
}

const styles = StyleSheet.create({
});
