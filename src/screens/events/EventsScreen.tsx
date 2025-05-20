import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {isTablet} from '../../utils/responsive/dimensions';
import {selectCurrentUserId} from '../../redux/selectors/auth/authSelectors';
import {logoutThunk} from '../../redux/thunks/auth/logoutThunk';
import TabsNavigator from '../../navigation/EventsNavigator';
import SearchBar from '../../components/common/SearchBar';
import HeaderEvent from '../../components/layout/HeaderEvent';
import {selectEvent} from '../../redux/slices/eventsSlice';
import EventDetailPanel from '../../components/screens/EventDetailPanel';
import globalStyle from '../../assets/styles/globalStyle';

const EventsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(selectCurrentUserId);
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  
  // Déterminer si on utilise le layout tablette
  const isTabletDevice = isTablet();

  // État pour gérer l'affichage du panel de détails sur tablette
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Effet pour gérer la visibilité du panneau de détails
  useEffect(() => {
    if (selectedEvent) {
      setDetailsVisible(true);
    }
  }, [selectedEvent]);

  const handleEventSelect = (event) => {
    dispatch(selectEvent(event));
    
    if (!isTabletDevice) {
      // Sur mobile, naviguer vers l'écran de détails
      navigation.navigate('Registration', {eventId: event.id});
    }
    // Sur tablette, les détails seront affichés dans le panneau latéral
  };

  const handleLogOut = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Déconnexion',
          onPress: async () => {
            try {
              await dispatch(logoutThunk()).unwrap();
              navigation.reset({index: 0, routes: [{name: 'Connexion'}]});
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la déconnexion';
              Alert.alert('Échec de déconnexion', errorMessage);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <HeaderEvent
        onLeftPress={clearSearch}
        onRightPress={handleLogOut}
        showBackButton={false}
      />
      <View style={styles.searchContainer}>
        <SearchBar onChange={text => setSearchQuery(text)} value={searchQuery} />
      </View>

      {isTabletDevice ? (
        // Layout spécifique pour tablette (master-detail)
        <View style={styles.tabletContainer}>
          <View style={styles.tabletMasterPanel}>
            <TabsNavigator 
              searchQuery={searchQuery} 
              onEventSelect={handleEventSelect} 
            />
          </View>
          
          {detailsVisible && selectedEvent && (
            <View style={styles.tabletDetailPanel}>
              <EventDetailPanel 
                event={selectedEvent}
                onClose={() => setDetailsVisible(false)}
              />
            </View>
          )}
        </View>
      ) : (
        // Layout standard pour mobile
        <TabsNavigator 
          searchQuery={searchQuery} 
          onEventSelect={handleEventSelect} 
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
    paddingHorizontal: 20,
  },
  tabletContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  tabletMasterPanel: {
    width: '40%',
    height: '100%',
  },
  tabletDetailPanel: {
    width: '60%',
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#EFEFEF',
    padding: 20,
  },
});

export default EventsScreen;
