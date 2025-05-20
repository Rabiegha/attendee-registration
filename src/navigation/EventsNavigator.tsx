import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FutureEventsScreen from '../screens/events/FutureEventsScreen';
import PastEventsScreen from '../screens/events/PastEventsScreen';
import colors from '../assets/colors/colors';
import {isTablet, scale} from '../utils/responsive/dimensions';

const Tab = createMaterialTopTabNavigator();

export default function EventsNavigator({searchQuery, onEventSelect}) {
  // Adaptations pour tablette - augmenter légèrement les tailles
  const tabletAdjustments = isTablet()
    ? {
        tabBarLabelStyle: {
          fontSize: scale(16),
          fontWeight: 'bold',
          padding: scale(8),
        },
        tabBarStyle: {
          marginHorizontal: scale(30),
          marginTop: scale(10),
        },
      }
    : {
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          marginHorizontal: 20,
        },
      };

  return (
    <Tab.Navigator
      initialRouteName="A venir"
      screenOptions={{
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.grey,
        tabBarIndicatorStyle: {
          backgroundColor: colors.green,
          height: 6,
          borderRadius: 15,
        },
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
          ...tabletAdjustments.tabBarStyle,
        },
        tabBarLabelStyle: tabletAdjustments.tabBarLabelStyle,
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen name="A venir">
        {() => (
          <FutureEventsScreen
            searchQuery={searchQuery}
            onEventSelect={onEventSelect}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Passées">
        {() => (
          <PastEventsScreen
            searchQuery={searchQuery}
            onEventSelect={onEventSelect}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
