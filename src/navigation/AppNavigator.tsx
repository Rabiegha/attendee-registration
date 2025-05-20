import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import ConnexionScreen from '../screens/auth/ConnexionScreen';
import EventsScreen from '../screens/events/EventsScreen';
import RegistrationScreen from '../screens/registration/RegistrationScreen';
import {RootState} from '../redux/store';
import {getDeviceType} from '../utils/responsive/dimensions';

// Type pour notre stack de navigation
export type RootStackParamList = {
  Connexion: undefined;
  Events: undefined;
  EventDetails: {eventId: string};
  Registration: {eventId: string};
  AttendeeList: {eventId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  
  // Détecter le type d'appareil (téléphone/tablette)
  const deviceType = getDeviceType();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Ajuster les animations selon le type d'appareil
        animation: deviceType === 'tablet' ? 'fade' : 'default',
        // Ajouter un peu de marge pour les tablettes
        contentStyle: deviceType === 'tablet' 
          ? {paddingHorizontal: 0} 
          : undefined,
      }}>
      {!isAuthenticated ? (
        // Routes d'authentification
        <Stack.Screen
          name="Connexion"
          component={ConnexionScreen}
          options={{
            title: 'Connexion',
            // Désactiver la possibilité de revenir en arrière
            gestureEnabled: false,
          }}
        />
      ) : (
        // Routes authentifiées
        <>
          <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{
              title: 'Événements',
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: 'Inscription',
              // Animation différente pour les tablettes
              animation: deviceType === 'tablet' ? 'fade' : 'slide_from_right',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
