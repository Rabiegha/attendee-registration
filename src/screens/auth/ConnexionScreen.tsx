import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ConnexionComponent from '../../components/screens/ConnexionComponent';
import {loginThunk} from '../../redux/thunks/auth/loginThunk';
import {resetAuthError} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store';
import {scale, isTablet} from '../../utils/responsive/dimensions';

const ConnexionScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  // Style adapté pour tablettes - utilisation d'un layout centré
  const containerStyle = isTablet() 
    ? [styles.container, styles.tabletContainer] 
    : styles.container;

  const handleLogin = () => {
    if (userName.trim() === '' || password.trim() === '') {
      // Gérer les champs vides
      return;
    }

    dispatch(loginThunk({
      userName,
      password
    }));
  };

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        <ConnexionComponent
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
          handleLogin={handleLogin}
          isLoading={isLoading}
          error={error}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabletContainer: {
    paddingHorizontal: scale(50), // Marges supplémentaires sur tablette
    justifyContent: 'center', // Centrage vertical sur tablette
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ConnexionScreen;
