import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import {scale, isTablet} from '../../utils/responsive/dimensions';

interface EventDetailPanelProps {
  event: {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
    image?: string;
    attendeeCount?: number;
  };
  onClose: () => void;
}

const EventDetailPanel = ({event, onClose}: EventDetailPanelProps) => {
  const navigation = useNavigation();
  
  // Formatage des dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };
  
  // Adaptation pour tablette
  const isTabletDevice = isTablet();
  const fontSize = {
    title: isTabletDevice ? scale(22) : scale(18),
    subtitle: isTabletDevice ? scale(18) : scale(16),
    text: isTabletDevice ? scale(16) : scale(14),
  };

  // Gestion du bouton d'inscription
  const handleRegister = () => {
    navigation.navigate('Registration', {eventId: event.id});
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.title, {fontSize: fontSize.title}]}>{event.name}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{color: colors.grey, fontSize: scale(16)}}>Fermer</Text>
        </TouchableOpacity>
      </View>
      
      {event.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: event.image}}
            style={styles.eventImage}
            resizeMode="cover"
          />
        </View>
      )}
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, {fontSize: fontSize.text}]}>Lieu:</Text>
          <Text style={[styles.detailValue, {fontSize: fontSize.text}]}>{event.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, {fontSize: fontSize.text}]}>Date de début:</Text>
          <Text style={[styles.detailValue, {fontSize: fontSize.text}]}>{formatDate(event.startDate)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, {fontSize: fontSize.text}]}>Date de fin:</Text>
          <Text style={[styles.detailValue, {fontSize: fontSize.text}]}>{formatDate(event.endDate)}</Text>
        </View>
        
        {event.attendeeCount !== undefined && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {fontSize: fontSize.text}]}>Participants:</Text>
            <Text style={[styles.detailValue, {fontSize: fontSize.text}]}>{event.attendeeCount}</Text>
          </View>
        )}
      </View>
      
      {event.description && (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.sectionTitle, {fontSize: fontSize.subtitle}]}>Description</Text>
          <Text style={[styles.description, {fontSize: fontSize.text}]}>{event.description}</Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Inscrire un participant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  title: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    flex: 1,
  },
  closeButton: {
    padding: scale(5),
  },
  imageContainer: {
    marginBottom: scale(20),
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: scale(200),
  },
  detailsContainer: {
    marginBottom: scale(20),
    backgroundColor: colors.greyCream,
    borderRadius: scale(10),
    padding: scale(15),
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: scale(10),
  },
  detailLabel: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    width: '40%',
  },
  detailValue: {
    color: colors.darkGrey,
    flex: 1,
  },
  descriptionContainer: {
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: scale(10),
  },
  description: {
    color: colors.darkGrey,
    lineHeight: scale(22),
  },
  registerButton: {
    backgroundColor: colors.green,
    borderRadius: scale(10),
    padding: scale(15),
    alignItems: 'center',
    marginBottom: scale(30),
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});

export default EventDetailPanel;
