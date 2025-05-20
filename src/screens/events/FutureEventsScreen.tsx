import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFutureEventsThunk} from '../../redux/thunks/event/fetchFutureEventsThunk';
import {RootState} from '../../redux/store';
import colors from '../../assets/colors/colors';
import {scale, isTablet} from '../../utils/responsive/dimensions';

interface FutureEventsScreenProps {
  searchQuery: string;
  onEventSelect: (event: any) => void;
}

const FutureEventsScreen = ({
  searchQuery,
  onEventSelect,
}: FutureEventsScreenProps) => {
  const dispatch = useDispatch();
  const {futureEvents, isLoading, error} = useSelector(
    (state: RootState) => state.events,
  );
  
  // Adaptation pour tablette - affichage en grille
  const isTabletDevice = isTablet();
  const [numColumns, setNumColumns] = useState(isTabletDevice ? 2 : 1);
  
  useEffect(() => {
    dispatch(fetchFutureEventsThunk());
  }, [dispatch]);

  // Filtrer les événements en fonction de la recherche
  const filteredEvents = futureEvents.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Formatage des dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Rendu d'un événement
  const renderEvent = ({item, index}) => {
    const itemWidth = isTabletDevice 
      ? {width: `${100 / numColumns - 3}%`} 
      : {width: '100%'};
    
    return (
      <TouchableOpacity
        style={[styles.eventCard, itemWidth]}
        onPress={() => onEventSelect(item)}>
        <View style={styles.eventContent}>
          {item.image && (
            <Image
              source={{uri: item.image}}
              style={styles.eventImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.eventInfo}>
            <Text style={styles.eventName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.eventLocation} numberOfLines={1}>
              {item.location}
            </Text>
            <Text style={styles.eventDate}>
              {formatDate(item.startDate)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>
          {searchQuery
            ? 'Aucun événement trouvé correspondant à votre recherche'
            : 'Aucun événement à venir'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        key={numColumns}
        columnWrapperStyle={isTabletDevice ? styles.columnWrapper : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    padding: scale(15),
    paddingBottom: scale(50),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(15),
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    marginBottom: scale(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: colors.greyCream,
    borderWidth: 1,
    overflow: 'hidden',
  },
  eventContent: {
    flexDirection: 'column',
  },
  eventImage: {
    width: '100%',
    height: scale(120),
    backgroundColor: colors.greyCream,
  },
  eventInfo: {
    padding: scale(12),
  },
  eventName: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: scale(4),
  },
  eventLocation: {
    fontSize: scale(14),
    color: colors.grey,
    marginBottom: scale(4),
  },
  eventDate: {
    fontSize: scale(14),
    color: colors.green,
  },
  errorText: {
    color: colors.red,
    fontSize: scale(16),
    textAlign: 'center',
  },
  emptyText: {
    color: colors.grey,
    fontSize: scale(16),
    textAlign: 'center',
  },
});

export default FutureEventsScreen;
