import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { usePostStore } from "../../store/PostContext";
import type BlogPost from "../../types/BlogPost";

// Common Components
import TwoColumnLayout from "../../components/common/layouts/TwoColumnLayout";
import PostSearch from "./PostSearch";

export type PostFilterType = "all" | "published" | "draft";

// Mock posts with tags
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Modern Note-Taking App",
    content:
      "A comprehensive guide to building a feature-rich note-taking application with pen support and infinite scrolling.",
    published: true,
    createdAt: new Date("2025-03-14"),
    updatedAt: new Date("2025-03-15"),
    tags: ["Technology", "Tutorial", "JavaScript"],
  },
  {
    id: "2",
    title: "Design Principles for iPad Apps",
    content:
      "Exploring the key design principles that make iPad applications feel native and intuitive to users.",
    published: false,
    createdAt: new Date("2025-03-09"),
    updatedAt: new Date("2025-03-13"),
    tags: ["Design", "iOS", "UX"],
  },
  {
    id: "3",
    title: "Introduction to Hugo Static Site Generator",
    content:
      "Learn how to set up and configure Hugo for your blog, including themes, content management, and deployment.",
    published: true,
    createdAt: new Date("2025-03-07"),
    updatedAt: new Date("2025-03-07"),
    tags: ["Hugo", "Web Development", "Tutorial"],
  },
];

interface PostCardProps {
  post: BlogPost & { tags?: string[] };
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity style={styles.postCard} onPress={onPress}>
      {/* Post Header with Title and Status */}
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <View
          style={[
            styles.statusBadge,
            post.published ? styles.statusPublished : styles.statusDraft,
          ]}
        >
          <Text
            style={[
              styles.statusBadgeText,
              post.published
                ? styles.statusPublishedText
                : styles.statusDraftText,
            ]}
          >
            {post.published ? "● Published" : "● Draft"}
          </Text>
        </View>
      </View>

      {/* Post Excerpt */}
      <Text style={styles.postExcerpt} numberOfLines={2}>
        {post.content}
      </Text>

      {/* Date Info */}
      <View style={styles.dateInfo}>
        <Text style={styles.dateIcon}>📅</Text>
        <Text style={styles.dateText}>{formatDate(post.createdAt)}</Text>
        <Text style={styles.dateSeparator}>•</Text>
        <Text style={styles.dateText}>
          Modified {formatDate(post.updatedAt)}
        </Text>
      </View>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const PostListScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [activeStatus, setActiveStatus] = useState<PostFilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePostPress = (post: BlogPost) => {
    console.log("Opening post:", post.title);
    // TODO: Navigate to editor screen
  };

  const handleNewPost = () => {
    console.log("Creating new post");
    // TODO: Navigate to editor with new post
  };

  // Filter posts
  const filteredPosts = mockPosts.filter((post) => {
    // Status filter
    if (activeStatus === "published" && !post.published) return false;
    if (activeStatus === "draft" && post.published) return false;

    // Search filter
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const postCounts = {
    all: mockPosts.length,
    published: mockPosts.filter((p) => p.published).length,
    draft: mockPosts.filter((p) => !p.published).length,
  };

  const categories = [
    { name: "Technology", count: 5 },
    { name: "Design", count: 4 },
    { name: "Tutorial", count: 3 },
  ];

  // Left Sidebar
  const leftColumn = (
    <ScrollView style={styles.sidebar} showsVerticalScrollIndicator={false}>
      {/* Status Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>STATUS</Text>

        <TouchableOpacity
          style={[
            styles.filterItem,
            activeStatus === "all" && styles.filterItemActive,
          ]}
          onPress={() => setActiveStatus("all")}
        >
          <View style={styles.filterItemContent}>
            <Text
              style={[
                styles.filterItemText,
                activeStatus === "all" && styles.filterItemTextActive,
              ]}
            >
              All Posts
            </Text>
            <View
              style={[
                styles.filterItemBadge,
                activeStatus === "all" && styles.filterItemBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterItemBadgeText,
                  activeStatus === "all" && styles.filterItemBadgeTextActive,
                ]}
              >
                {postCounts.all}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            activeStatus === "published" && styles.filterItemActive,
          ]}
          onPress={() => setActiveStatus("published")}
        >
          <View style={styles.filterItemContent}>
            <Text
              style={[
                styles.filterItemText,
                activeStatus === "published" && styles.filterItemTextActive,
              ]}
            >
              Published
            </Text>
            <View
              style={[
                styles.filterItemBadge,
                activeStatus === "published" && styles.filterItemBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterItemBadgeText,
                  activeStatus === "published" &&
                    styles.filterItemBadgeTextActive,
                ]}
              >
                {postCounts.published}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            activeStatus === "draft" && styles.filterItemActive,
          ]}
          onPress={() => setActiveStatus("draft")}
        >
          <View style={styles.filterItemContent}>
            <Text
              style={[
                styles.filterItemText,
                activeStatus === "draft" && styles.filterItemTextActive,
              ]}
            >
              Drafts
            </Text>
            <View
              style={[
                styles.filterItemBadge,
                activeStatus === "draft" && styles.filterItemBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterItemBadgeText,
                  activeStatus === "draft" && styles.filterItemBadgeTextActive,
                ]}
              >
                {postCounts.draft}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <View style={[styles.sectionContainer, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>CATEGORIES</Text>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.filterItem,
              selectedCategory === category.name && styles.filterItemActive,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )
            }
          >
            <View style={styles.filterItemContent}>
              <Text
                style={[
                  styles.filterItemText,
                  selectedCategory === category.name &&
                    styles.filterItemTextActive,
                ]}
              >
                {category.name}
              </Text>
              <View
                style={[
                  styles.filterItemBadge,
                  selectedCategory === category.name &&
                    styles.filterItemBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterItemBadgeText,
                    selectedCategory === category.name &&
                      styles.filterItemBadgeTextActive,
                  ]}
                >
                  {category.count}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  // Right Content Column
  const rightColumn = (
    <View style={styles.mainContent}>
      {/* Title and Sort Row */}
      <View style={styles.headerRow}>
        <Text style={styles.mainTitle}>All Posts</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort by: Most Recent ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => (
          <PostCard
            post={{ ...item, tags: item.tags || [] } as any}
            onPress={() => handlePostPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Full Width Header */}
      <View style={styles.topBar}>
        <View style={styles.topRow}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <PostSearch
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </View>

          {/* New Post Button */}
          <TouchableOpacity
            style={styles.newPostButton}
            onPress={handleNewPost}
          >
            <Text style={styles.newPostButtonText}>+ New Post</Text>
          </TouchableOpacity>

          {/* More Options */}
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TwoColumnLayout
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        leftColumnWidth={280}
      />
    </SafeAreaView>
  );
};

export default PostListScreen;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    sidebar: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      borderRightWidth: 1,
      borderRightColor: theme.colors.border || "#e0e0e0",
    },
    sectionContainer: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      ...theme.typography.labelMedium,
      color: theme.colors.textSecondary || "#999",
      textTransform: "uppercase",
      marginBottom: theme.spacing.sm,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
    filterItem: {
      paddingVertical: theme.spacing.sm / 2,
      paddingHorizontal: theme.spacing.md,
      marginVertical: 2,
      borderRadius: theme.radius.md,
      backgroundColor: "transparent",
    },
    filterItemActive: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
    },
    filterItemContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    filterItemText: {
      ...theme.typography.bodyLarge,
      color: theme.colors.text,
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    filterItemTextActive: {
      ...theme.typography.bodyLarge,
      fontWeight: "600",
      color: theme.colors.textOnPrimary || "#ffffff",
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    filterItemBadge: {
      backgroundColor: theme.colors.border || "#e0e0e0",
      paddingVertical: 3,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radius.lg,
      minWidth: 24,
      alignItems: "center",
    },
    filterItemBadgeActive: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    filterItemBadgeText: {
      ...theme.typography.labelSmall,
      color: theme.colors.text,
      fontWeight: "600",
    },
    filterItemBadgeTextActive: {
      color: theme.colors.textOnPrimary || "#ffffff",
    },
    mainContent: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topBar: {
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    searchContainer: {
      flex: 1,
      marginHorizontal: theme.spacing.md,
    },
    moreButton: {
      padding: theme.spacing.sm,
      marginLeft: theme.spacing.md,
    },
    moreIcon: {
      fontSize: 18,
      color: theme.colors.text,
      transform: [{ rotate: "90deg" }],
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    mainTitle: {
      ...theme.typography.titleMedium,
      color: theme.colors.primary,
    },
    newPostButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.pill,
      marginHorizontal: theme.spacing.md,
    },
    newPostButtonText: {
      color: theme.colors.textOnPrimary || "#ffffff",
      ...theme.typography.bodyLarge,
      fontWeight: "600",
    },
    sortRow: {
      alignItems: "flex-end",
      paddingHorizontal: theme.spacing.lg,
    },
    sortButton: {
      paddingVertical: 4,
      paddingHorizontal: theme.spacing.sm,
    },
    sortButtonText: {
      ...theme.typography.bodyMedium,
      color: theme.colors.textSecondary,
      fontWeight: "500",
    },
    postsList: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
    postCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadow.sm,
    },
    postHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: theme.spacing.sm,
    },
    postTitle: {
      ...theme.typography.titleMedium,
      color: theme.colors.primary,
      flex: 1,
      marginRight: theme.spacing.md,
    },
    statusBadge: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: theme.radius.lg,
      backgroundColor: "#f0f0f0",
    },
    statusPublished: {
      backgroundColor: theme.colors.successLight,
    },
    statusDraft: {
      backgroundColor: theme.colors.warningLight,
    },
    statusBadgeText: {
      ...theme.typography.labelSmall,
      color: "#666",
      fontWeight: "600",
    },
    statusPublishedText: {
      color: theme.colors.success,
    },
    statusDraftText: {
      color: theme.colors.warning,
    },
    postExcerpt: {
      ...theme.typography.bodyMedium,
      color: theme.colors.textSecondary,
      marginBottom: 10,
    },
    dateInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
      gap: 6,
    },
    dateIcon: {
      ...theme.typography.bodySmall,
    },
    dateText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    dateSeparator: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    tag: {
      backgroundColor: theme.colors.primary + "15",
      paddingVertical: 4,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radius.lg,
    },
    tagText: {
      ...theme.typography.labelSmall,
      color: theme.colors.primary,
    },
  });
