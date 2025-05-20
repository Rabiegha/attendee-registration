import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import colors from '../../assets/colors/colors';
import globalStyle from '../../assets/styles/globalStyle';
import {scale, isTablet} from '../../utils/responsive/dimensions';

// Nous définirons les icônes plus tard dans un fichier dédié
const Icons = {
  PasVu: require('../../assets/images/hidden.png'), // À remplacer par les vraies icônes
  Vu: require('../../assets/images/visible.png'),   // À remplacer par les vraies icônes
};

interface ConnexionComponentProps {
  userName: string;
  password: string;
  setUserName: (text: string) => void;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  isLoading: boolean;
  error: string | null;
}

const ConnexionComponent = ({
  userName,
  password,
  setUserName,
  setPassword,
  handleLogin,
  isLoading,
  error,
}: ConnexionComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Adaptation pour tablettes
  const isTabletDevice = isTablet();
  const containerWidth = isTabletDevice ? '60%' : '100%';
  const inputHeight = isTabletDevice ? scale(60) : scale(50);
  const fontSize = isTabletDevice ? scale(16) : scale(14);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {alignItems: isTabletDevice ? 'center' : 'stretch'}
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      
      <View style={[styles.formContainer, {width: containerWidth}]}>
        {/* Affichage de l'erreur le cas échéant */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <TextInput
          style={[
            globalStyle.input, 
            {height: inputHeight, fontSize: fontSize}
          ]}
          placeholder="Nom d'utilisateur"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor={colors.grey}
          autoCapitalize="none"
        />
        
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={[
              globalStyle.input, 
              styles.passwordInput,
              {height: inputHeight, fontSize: fontSize}
            ]}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={colors.grey}
          />
          <TouchableOpacity
            style={[
              styles.togglePasswordButton,
              {height: inputHeight}
            ]}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Icons.PasVu : Icons.Vu}
              style={styles.togglePasswordIcon}
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[
            styles.loginButton,
            {height: inputHeight, backgroundColor: colors.green}
          ]}
          onPress={handleLogin}
          disabled={isLoading}>
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Connexion en cours...' : 'Connexion'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: scale(20),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    alignSelf: 'center',
    maxWidth: 500,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingRight: scale(40),
  },
  togglePasswordButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  togglePasswordIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: colors.green,
  },
  loginButton: {
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
  errorContainer: {
    backgroundColor: colors.lightRed,
    padding: scale(10),
    borderRadius: scale(5),
    marginBottom: scale(15),
  },
  errorText: {
    color: colors.red,
    fontSize: scale(14),
    textAlign: 'center',
  },
});

export default ConnexionComponent;
