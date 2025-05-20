import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../assets/colors/colors';
import {scale, isTablet} from '../../utils/responsive/dimensions';

interface HeaderEventProps {
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBackButton?: boolean;
  title?: string;
}

const HeaderEvent = ({
  onLeftPress,
  onRightPress,
  showBackButton = false,
  title = 'Événements',
}: HeaderEventProps) => {
  // Adaptations pour tablette
  const isTabletDevice = isTablet();
  const headerHeight = isTabletDevice ? scale(90) : scale(70);
  const fontSize = isTabletDevice ? scale(22) : scale(18);
  
  return (
    <View
      style={[
        styles.container,
        {height: headerHeight},
        Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
      ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.leftButton}>
        {showBackButton && (
          <TouchableOpacity onPress={onLeftPress}>
            <Text style={{color: colors.green, fontSize: scale(16)}}>Retour</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.title, {fontSize}]}>{title}</Text>
      
      <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
        <Text style={{color: colors.green, fontSize: scale(16)}}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  androidShadow: {
    elevation: 3,
  },
  leftButton: {
    width: scale(80),
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
  },
  rightButton: {
    width: scale(80),
    alignItems: 'flex-end',
  },
});

export default HeaderEvent;
