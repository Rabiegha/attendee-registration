import {StyleSheet} from 'react-native';
import colors from '../colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles adaptés pour responsive design (téléphone et tablette)
const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: wp('5%'), // Padding responsive
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  // Styles pour les écrans d'authentification
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: '#fff',
    // Layout spécifique tablette - centrer le formulaire avec une largeur maximale
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  // Input styles
  input: {
    height: hp('6%'),
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp('2%'),
    paddingHorizontal: wp('3%'),
    fontSize: wp('4%'),
    backgroundColor: '#fff',
    width: '100%',
  },
  // Button styles
  button: {
    height: hp('6%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  // Text styles adaptés différentes tailles d'écran
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  normalText: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
  },
  // Styles pour les cartes d'événement
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    borderColor: colors.greyCream,
    borderWidth: 1,
  },
  // Layout pour les listes sur tablette (multi-colonnes)
  tabletGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tabletGridItem: {
    width: '48%', // Pour 2 colonnes sur tablette
  },
  // Pour le pattern master-detail sur tablette
  tabletMasterDetailContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tabletMasterPanel: {
    width: '35%',
    borderRightWidth: 1,
    borderRightColor: colors.lightGrey,
  },
  tabletDetailPanel: {
    width: '65%',
  },
});

export default globalStyle;
