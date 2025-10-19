import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type FilterType = "all" | "published" | "draft" | "archived";

interface PostFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

/**
 * PostFilters Component
 *
 * Filter controls for posts by status and other criteria.
 * Placeholder component ready for enhancement with:
 * - Multiple filter tags
 * - Filter combinations
 * - Custom filter creation
 * - Filter presets (favorites, recent, archived)
 */
const PostFilters: React.FC<PostFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const filters: Array<{ id: FilterType; label: string; icon: string }> = [
    { id: "all", label: "All Posts", icon: "📋" },
    { id: "published", label: "Published", icon: "✨" },
    { id: "draft", label: "Drafts", icon: "📝" },
    { id: "archived", label: "Archived", icon: "📦" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.filterLabel}>Filter by:</Text>
      <View style={styles.filterGroup}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => onFilterChange(filter.id)}
          >
            <Text style={styles.filterIcon}>{filter.icon}</Text>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.background,
    },
    filterLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    filterGroup: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
    },
    filterButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterIcon: {
      fontSize: 14,
      marginRight: 4,
    },
    filterText: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.colors.text,
    },
    filterTextActive: {
      color: "#ffffff",
    },
  });

export default PostFilters;
