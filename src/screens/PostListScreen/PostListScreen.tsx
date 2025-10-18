import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { usePostStore } from "../../store/postStore";
import type { BlogPost } from "../../types/BlogPost";

// Common Components
import Toolbar from "../../components/common/Toolbar";
import TwoColumnLayout from "../../components/common/layouts/TwoColumnLayout";

// PostListScreen Specific Components
import PostFilters from "./PostFilters";
import PostCardList from "./PostCardList";
import PostSearch from "./PostSearch";

export type PostFilterType = "all" | "published" | "draft";

// Mock data for demonstration with cover images
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Blog Editor",
    content:
      "This is my first blog post using the new iPad editor. Exploring all the amazing features and capabilities...",
    published: true,
    createdAt: new Date("2025-08-20"),
    updatedAt: new Date("2025-08-22"),
    coverImage:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Drawing with Apple Pencil",
    content:
      "Exploring the layered drawing capabilities and how they integrate seamlessly with text content...",
    published: false,
    createdAt: new Date("2025-08-21"),
    updatedAt: new Date("2025-08-21"),
    coverImage:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Publishing Workflow",
    content:
      "How to publish directly to your website with one-click publishing and seamless integration...",
    published: true,
    createdAt: new Date("2025-08-22"),
    updatedAt: new Date("2025-08-22"),
    coverImage:
      "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Creative Typography",
    content:
      "Exploring beautiful typography combinations and how they enhance your blog content...",
    published: false,
    createdAt: new Date("2025-08-19"),
    updatedAt: new Date("2025-08-23"),
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Visual Storytelling",
    content:
      "The power of combining visuals with text to create compelling narratives...",
    published: true,
    createdAt: new Date("2025-08-18"),
    updatedAt: new Date("2025-08-20"),
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "iPad Pro Features",
    content:
      "Making the most of iPad Pro capabilities for professional content creation...",
    published: false,
    createdAt: new Date("2025-08-17"),
    updatedAt: new Date("2025-08-19"),
    coverImage:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
  },
];

type SortOption = "title" | "date" | "published";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
const numColumns = isTablet ? 3 : 2;

interface PostCardProps {
  post: BlogPost;
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.postCardContainer, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        style={styles.postCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          {post.coverImage ? (
            <Image
              source={{ uri: post.coverImage }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>📝</Text>
            </View>
          )}

          {/* Status Badge Overlay */}
          <View style={styles.statusOverlay}>
            <View
              style={[
                styles.statusBadge,
                post.published ? styles.published : styles.draft,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  post.published ? styles.publishedText : styles.draftText,
                ]}
              >
                {post.published ? "✨" : "📝"}
              </Text>
            </View>
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {post.title}
          </Text>
          <Text style={styles.postContent} numberOfLines={3}>
            {post.content}
          </Text>
          <View style={styles.postFooter}>
            <Text style={styles.postDate}>
              {post.updatedAt.toLocaleDateString()}
            </Text>
            <View style={styles.actionDots}>
              <View style={[styles.dot, { backgroundColor: "#7C6FD4" }]} />
              <View style={[styles.dot, { backgroundColor: "#FF9B9B" }]} />
              <View style={[styles.dot, { backgroundColor: "#98D8C8" }]} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function PostListScreen() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "drafts" | "published"
  >("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [showSortModal, setShowSortModal] = useState(false);

  const handlePostPress = (post: BlogPost) => {
    console.log("Opening post:", post.title);
    // TODO: Navigate to editor screen
  };

  const handleCreateNew = () => {
    console.log("Creating new post");
    // TODO: Navigate to editor screen with new post
  };

  const sortPosts = (posts: BlogPost[]) => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "published":
          if (a.published === b.published) {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          }
          return a.published ? -1 : 1;
        default:
          return 0;
      }
    });
  };

  const filteredPosts = sortPosts(
    mockPosts.filter((post) => {
      if (activeFilter === "drafts") return !post.published;
      if (activeFilter === "published") return post.published;
      return true;
    })
  );

  const renderPost = ({ item }: { item: BlogPost }) => (
    <PostCard post={item} onPress={() => handlePostPress(item)} />
  );

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "title":
        return "Title";
      case "date":
        return "Date";
      case "published":
        return "Status";
      default:
        return "Date";
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerActions}>
          {/* Sort Dropdown */}
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowSortModal(true)}
          >
            <Text style={styles.sortButtonText}>
              Sort: {getSortLabel(sortBy)}
            </Text>
            <Text style={styles.sortArrow}>▼</Text>
          </TouchableOpacity>

          {/* Create Button */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateNew}
          >
            <Text style={styles.createButtonText}>+ New</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.tab, activeFilter === "all" && styles.activeTab]}
          onPress={() => setActiveFilter("all")}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === "all" && styles.activeTabText,
            ]}
          >
            All Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeFilter === "drafts" && styles.activeTab]}
          onPress={() => setActiveFilter("drafts")}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === "drafts" && styles.activeTabText,
            ]}
          >
            📝 Drafts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeFilter === "published" && styles.activeTab]}
          onPress={() => setActiveFilter("published")}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === "published" && styles.activeTabText,
            ]}
          >
            ✨ Published
          </Text>
        </TouchableOpacity>
      </View>

      {/* Posts Grid */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        style={styles.postsList}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      />

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.sortModal}>
            <Text style={styles.modalTitle}>Sort by</Text>

            {(["title", "date", "published"] as SortOption[]).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.sortOption,
                  sortBy === option && styles.selectedSortOption,
                ]}
                onPress={() => {
                  setSortBy(option);
                  setShowSortModal(false);
                }}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === option && styles.selectedSortOptionText,
                  ]}
                >
                  {getSortLabel(option)}
                </Text>
                {sortBy === option && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container with dreamy gradient background
  container: {
    flex: 1,
    backgroundColor: "#FAF7FF", // Fallback color
  },

  // Glass morphism header
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#5A4FCF",
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 16,
    color: "rgba(90, 79, 207, 0.7)",
    fontWeight: "400",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // Sort dropdown button
  sortButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(124, 111, 212, 0.3)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sortButtonText: {
    color: "#7C6FD4",
    fontSize: 14,
    fontWeight: "500",
  },

  sortArrow: {
    color: "#7C6FD4",
    fontSize: 12,
  },

  // Dreamy pastels create button
  createButton: {
    backgroundColor: "#7C6FD4",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#7C6FD4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  createButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  // Glass morphism filter tabs
  filterTabs: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },

  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  activeTab: {
    backgroundColor: "rgba(124, 111, 212, 0.1)",
    borderColor: "rgba(124, 111, 212, 0.3)",
  },

  tabText: {
    fontSize: 14,
    color: "rgba(90, 79, 207, 0.6)",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#7C6FD4",
    fontWeight: "600",
  },

  // Posts grid container
  postsList: {
    flex: 1,
    backgroundColor: "transparent",
  },

  postsContainer: {
    padding: 20,
  },

  row: {
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  // Magazine-style post card container
  postCardContainer: {
    margin: 8,
    width: isTablet ? (width - 80) / 3 - 16 : (width - 64) / 2 - 16,
  },

  // Glass morphism post cards - magazine style
  postCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#7C6FD4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    overflow: "hidden",
    height: 300, // Fixed height for all cards
    width: "100%",
  },

  // Cover image container
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  coverImage: {
    width: "100%",
    height: "100%",
  },

  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(124, 111, 212, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    fontSize: 48,
    opacity: 0.6,
  },

  // Status badge overlay on image
  statusOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
  },

  // Card content below image
  cardContent: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },

  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5A4FCF",
    marginBottom: 8,
    lineHeight: 20,
    height: 40, // Fixed height for 2 lines
  },

  // Dreamy status badges
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 32,
    minHeight: 32,
  },

  published: {
    backgroundColor: "rgba(152, 216, 200, 0.9)",
    borderColor: "rgba(152, 216, 200, 0.4)",
  },

  draft: {
    backgroundColor: "rgba(247, 220, 111, 0.9)",
    borderColor: "rgba(247, 220, 111, 0.4)",
  },

  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },

  publishedText: {
    color: "#FFFFFF",
  },

  draftText: {
    color: "#FFFFFF",
  },

  postContent: {
    fontSize: 12,
    color: "rgba(90, 79, 207, 0.7)",
    lineHeight: 16,
    flex: 1,
    marginBottom: 8,
  },

  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },

  postDate: {
    fontSize: 12,
    color: "rgba(90, 79, 207, 0.5)",
    fontWeight: "400",
  },

  // Decorative dots
  actionDots: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
    opacity: 0.6,
  },

  // Sort Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  sortModal: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    margin: 20,
    minWidth: 200,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#7C6FD4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5A4FCF",
    marginBottom: 16,
    textAlign: "center",
  },

  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 4,
  },

  selectedSortOption: {
    backgroundColor: "rgba(124, 111, 212, 0.1)",
  },

  sortOptionText: {
    fontSize: 16,
    color: "rgba(90, 79, 207, 0.8)",
    fontWeight: "500",
  },

  selectedSortOptionText: {
    color: "#7C6FD4",
    fontWeight: "600",
  },

  checkmark: {
    fontSize: 16,
    color: "#7C6FD4",
    fontWeight: "600",
  },
});
