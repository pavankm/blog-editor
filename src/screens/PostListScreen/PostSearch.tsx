import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface PostSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

/**
 * PostSearch Component
 *
 * Search bar for filtering posts by title and content.
 * Placeholder component ready for enhancement with:
 * - Advanced search filters
 * - Search history
 * - Autocomplete suggestions
 */
const PostSearch: React.FC<PostSearchProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search posts...",
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      paddingHorizontal: 12,
      height: 40,
    },
    searchIcon: {
      fontSize: 16,
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
    },
    clearButton: {
      padding: 4,
    },
    clearIcon: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
  });

export default PostSearch;
