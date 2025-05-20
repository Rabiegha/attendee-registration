import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../../assets/colors/colors';
import {scale, isTablet} from '../../utils/responsive/dimensions';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Rechercher...',
}: SearchBarProps) => {
  // Adaptations pour tablette
  const isTabletDevice = isTablet();
  const inputHeight = isTabletDevice ? scale(55) : scale(45);
  const fontSize = isTabletDevice ? scale(16) : scale(14);
  
  return (
    <View style={[styles.container, {height: inputHeight}]}>
      <View style={styles.searchIconContainer}>
        {/* Ici, vous pouvez ajouter une icône de recherche lorsque vous l'aurez */}
      </View>
      <TextInput
        style={[styles.input, {fontSize}]}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        value={value}
        onChangeText={onChange}
      />
      {value !== '' && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChange('')}>
          {/* Ici, vous pouvez ajouter une icône de suppression lorsque vous l'aurez */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyCream,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    marginBottom: scale(15),
  },
  searchIconContainer: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    color: colors.darkGrey,
    padding: 0,
  },
  clearButton: {
    padding: scale(8),
  },
});

export default SearchBar;
