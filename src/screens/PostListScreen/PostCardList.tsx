import React from "react";
import { View, StyleSheet, FlatList, ViewToken } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import type BlogPost from "../../types/BlogPost";

interface PostCardProps {
  post: BlogPost;
  onPress: (post: BlogPost) => void;
}

interface PostCardListProps {
  posts: BlogPost[];
  onPostPress: (post: BlogPost) => void;
  numColumns?: number;
  renderCard: (props: PostCardProps) => React.ReactNode;
}

/**
 * PostCardList Component
 *
 * Reusable list/grid component for displaying post cards.
 * Placeholder component ready for enhancement with:
 * - Virtual scrolling for performance
 * - Animated list transitions
 * - Pull-to-refresh
 * - Infinite scroll pagination
 * - Swipe actions (edit, delete)
 */
const PostCardList: React.FC<PostCardListProps> = ({
  posts,
  onPostPress,
  numColumns = 2,
  renderCard,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      // Placeholder for analytics or lazy loading logic
      // TODO: Track which cards are visible
    },
    []
  );

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) =>
          (renderCard({
            post: item,
            onPress: onPostPress,
          }) as React.ReactElement) || null
        }
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        scrollEnabled={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    columnWrapper: {
      justifyContent: "space-between",
      gap: 12,
    },
  });

export default PostCardList;
