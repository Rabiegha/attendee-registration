import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUserId} from '../../redux/selectors/auth/authSelectors';
import colors from '../../assets/colors/colors';
import {scale, isTablet} from '../../utils/responsive/dimensions';
import HeaderEvent from '../../components/layout/HeaderEvent';
import globalStyle from '../../assets/styles/globalStyle';
import {registerAttendee} from '../../services/registrationService';

interface RegistrationType {
  id: string;
  name: string;
}

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);
  const {eventId} = route.params || {};
  const selectedEvent = useSelector(state => 
    state.events.futureEvents.find(event => event.id === eventId) || 
    state.events.pastEvents.find(event => event.id === eventId)
  );

  // États du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [notes, setNotes] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Types d'inscription disponibles (à remplacer par des données réelles)
  const registrationTypes: RegistrationType[] = [
    {id: 'attendee', name: 'Participant'},
    {id: 'vip', name: 'VIP'},
    {id: 'speaker', name: 'Intervenant'},
    {id: 'staff', name: 'Staff'},
  ];

  // Détection de tablette
  const isTabletDevice = isTablet();
  
  // Styles adaptés pour tablette
  const inputWidth = isTabletDevice ? '48%' : '100%';
  const fontSize = isTabletDevice ? scale(16) : scale(14);

  // Gestion de la navigation
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Vérification de la validité du formulaire
  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      registrationType !== ''
    );
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert(
        'Formulaire incomplet',
        'Veuillez remplir tous les champs obligatoires (*).',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData = {
        eventId,
        firstName,
        lastName,
        email,
        phone,
        company,
        position,
        registrationType,
        notes,
        userId,
      };

      const response = await registerAttendee(registrationData);

      if (response && response.status) {
        Alert.alert(
          'Inscription réussie',
          'Le participant a été inscrit avec succès.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      } else {
        throw new Error(response?.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
      );
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <HeaderEvent
        title="Inscrire un participant"
        showBackButton={true}
        onLeftPress={handleGoBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          isTabletDevice && styles.tabletContentContainer,
        ]}>
        {selectedEvent && (
          <View style={styles.eventInfoContainer}>
            <Text style={[styles.eventName, {fontSize: fontSize + 4}]}>
              {selectedEvent.name}
            </Text>
            <Text style={[styles.eventLocation, {fontSize}]}>
              {selectedEvent.location}
            </Text>
          </View>
        )}

        <Text style={[styles.formTitle, {fontSize: fontSize + 2}]}>
          Informations du participant
        </Text>

        <View style={[styles.formContainer, isTabletDevice && styles.tabletFormContainer]}>
          {/* Nom et prénom sur la même ligne sur tablette */}
          <View style={isTabletDevice ? styles.rowContainer : null}>
            <View style={{width: inputWidth}}>
              <Text style={[styles.inputLabel, {fontSize}]}>Prénom *</Text>
              <TextInput
                style={[globalStyle.input, {fontSize}]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Prénom"
                placeholderTextColor={colors.grey}
              />
            </View>
            
            <View style={{width: inputWidth}}>
              <Text style={[styles.inputLabel, {fontSize}]}>Nom *</Text>
              <TextInput
                style={[globalStyle.input, {fontSize}]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Nom"
                placeholderTextColor={colors.grey}
              />
            </View>
          </View>

          <Text style={[styles.inputLabel, {fontSize}]}>Email *</Text>
          <TextInput
            style={[globalStyle.input, {fontSize}]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.grey}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Téléphone et entreprise sur la même ligne sur tablette */}
          <View style={isTabletDevice ? styles.rowContainer : null}>
            <View style={{width: inputWidth}}>
              <Text style={[styles.inputLabel, {fontSize}]}>Téléphone</Text>
              <TextInput
                style={[globalStyle.input, {fontSize}]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Téléphone"
                placeholderTextColor={colors.grey}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={{width: inputWidth}}>
              <Text style={[styles.inputLabel, {fontSize}]}>Entreprise</Text>
              <TextInput
                style={[globalStyle.input, {fontSize}]}
                value={company}
                onChangeText={setCompany}
                placeholder="Entreprise"
                placeholderTextColor={colors.grey}
              />
            </View>
          </View>

          <Text style={[styles.inputLabel, {fontSize}]}>Poste</Text>
          <TextInput
            style={[globalStyle.input, {fontSize}]}
            value={position}
            onChangeText={setPosition}
            placeholder="Poste/Fonction"
            placeholderTextColor={colors.grey}
          />

          <Text style={[styles.inputLabel, {fontSize}]}>Type d'inscription *</Text>
          <View style={styles.typeContainer}>
            {registrationTypes.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  registrationType === type.id && styles.typeButtonSelected,
                ]}
                onPress={() => setRegistrationType(type.id)}>
                <Text
                  style={[
                    styles.typeButtonText,
                    registrationType === type.id && styles.typeButtonTextSelected,
                    {fontSize},
                  ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.inputLabel, {fontSize}]}>Notes</Text>
          <TextInput
            style={[globalStyle.input, styles.notesInput, {fontSize}]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes supplémentaires"
            placeholderTextColor={colors.grey}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              !isFormValid() && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid() || isSubmitting}>
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Inscription en cours...' : 'Inscrire le participant'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 90 : 70,
  },
  contentContainer: {
    padding: scale(20),
    paddingBottom: scale(50),
  },
  tabletContentContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  eventInfoContainer: {
    marginBottom: scale(20),
    padding: scale(15),
    backgroundColor: colors.lighterGreen,
    borderRadius: scale(10),
  },
  eventName: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: scale(5),
  },
  eventLocation: {
    color: colors.grey,
  },
  formTitle: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: scale(15),
  },
  formContainer: {
    marginBottom: scale(20),
  },
  tabletFormContainer: {
    paddingHorizontal: scale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: scale(5),
    marginTop: scale(10),
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: scale(5),
    marginBottom: scale(15),
  },
  typeButton: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: scale(20),
    paddingVertical: scale(8),
    paddingHorizontal: scale(15),
    marginRight: scale(10),
    marginBottom: scale(10),
  },
  typeButtonSelected: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  typeButtonText: {
    color: colors.grey,
  },
  typeButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notesInput: {
    height: scale(100),
    paddingTop: scale(10),
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: scale(10),
    paddingVertical: scale(15),
    alignItems: 'center',
    marginTop: scale(20),
  },
  submitButtonDisabled: {
    backgroundColor: colors.lightGrey,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});

export default RegistrationScreen;
