import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { usePostStore } from '../../store/postStore';
import type { BlogPost } from '../../types/BlogPost';

// Common Components
import Toolbar from '../../components/common/Toolbar';
import TwoColumnLayout from '../../components/common/layouts/TwoColumnLayout';

// PostListScreen Specific Components
import PostFilters from './PostFilters';
import PostCardList from './PostCardList';
import PostSearch from './PostSearch';

export type PostFilterType = 'all' | 'published' | 'draft';

/**
 * PostListScreen
 * 
 * Displays all blog posts with:
 * - List of post cards with status indicators
 * - Filter by status (All, Draft, Published)
 * - Search functionality
 * - Sort options
 * - Create new post button
 */
export const PostListScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Zustand store for posts
  const { posts, addPost, deletePost, updatePost } = usePostStore();

  // Local state
  const [currentFilter, setCurrentFilter] = useState<PostFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  /**
   * Filter posts based on current filter and search query
   */
  const filteredPosts = posts.filter((post) => {
    // Filter by status
    const statusMatch =
      currentFilter === 'all' || post.published === (currentFilter === 'published');

    // Filter by search query
    const searchMatch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return statusMatch && searchMatch;
  });

  /**
   * Sort posts based on current sort option
   */
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'oldest':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  /**
   * Handle creating a new post
   */
  const handleCreateNewPost = () => {
    // TODO: Navigate to EditorScreen with new post
    console.log('Create new post');
  };

  /**
   * Handle post card press
   */
  const handlePostPress = (postId: string) => {
    // TODO: Navigate to EditorScreen with post id
    console.log(`Open post: ${postId}`);
  };

  /**
   * Handle deleting a post
   */
  const handleDeletePost = (postId: string) => {
    deletePost(postId);
  };

  /**
   * Handle toggling publish status
   */
  const handleTogglePublish = (postId: string, published: boolean) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      updatePost(postId, { ...post, published });
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <Toolbar
        onLeftButtonPress={() => {
          // TODO: Navigate to settings or app menu
        }}
        leftButtonIcon="menu"
        centerContent={
          <PostSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search posts..."
          />
        }
        rightButtons={[
          {
            icon: 'plus',
            onPress: handleCreateNewPost,
            label: 'New Post',
          },
          {
            icon: 'settings',
            onPress: () => {
              // TODO: Navigate to settings
            },
            label: 'Settings',
          },
        ]}
      />
      />

      {/* Main Content - Two Column Layout */}
      <TwoColumnLayout
        leftColumn={
          <PostFilters
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            publishedCount={posts.filter((p) => p.published).length}
            draftCount={posts.filter((p) => !p.published).length}
            totalCount={posts.length}
          />
        }
        rightColumn={
          <PostCardList
            posts={sortedPosts}
            onPostPress={handlePostPress}
            onDeletePost={handleDeletePost}
            onTogglePublish={handleTogglePublish}
            isLoading={false}
          />
        }
        leftColumnWidth={220}
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
  });

export default PostListScreen;
