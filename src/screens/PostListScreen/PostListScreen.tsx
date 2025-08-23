import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import BlogPost from "../../types/BlogPost";

// Mock data for demonstration
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Blog Editor",
    content: "This is my first blog post using the new iPad editor...",
    published: true,
    createdAt: new Date("2025-08-20"),
    updatedAt: new Date("2025-08-22"),
  },
  {
    id: "2",
    title: "Drawing with Apple Pencil",
    content: "Exploring the layered drawing capabilities...",
    published: false,
    createdAt: new Date("2025-08-21"),
    updatedAt: new Date("2025-08-21"),
  },
  {
    id: "3",
    title: "Publishing Workflow",
    content: "How to publish directly to your website...",
    published: true,
    createdAt: new Date("2025-08-22"),
    updatedAt: new Date("2025-08-22"),
  },
];

interface PostCardProps {
  post: BlogPost;
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
  return (
    <TouchableOpacity style={styles.postCard} onPress={onPress}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <View
          style={[
            styles.statusBadge,
            post.published ? styles.published : styles.draft,
          ]}
        >
          <Text style={styles.statusText}>
            {post.published ? "Published" : "Draft"}
          </Text>
        </View>
      </View>
      <Text style={styles.postContent} numberOfLines={2}>
        {post.content}
      </Text>
      <Text style={styles.postDate}>
        Updated: {post.updatedAt.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
};

export default function PostListScreen() {
  const handlePostPress = (post: BlogPost) => {
    console.log("Opening post:", post.title);
    // TODO: Navigate to editor screen
  };

  const handleCreateNew = () => {
    console.log("Creating new post");
    // TODO: Navigate to editor screen with new post
  };

  const renderPost = ({ item }: { item: BlogPost }) => (
    <PostCard post={item} onPress={() => handlePostPress(item)} />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Blog Posts</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateNew}>
          <Text style={styles.createButtonText}>+ New Post</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Drafts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Published</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <FlatList
        data={mockPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.postsList}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
  },
  createButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  filterTabs: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#e3f2fd",
  },
  tabText: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#1976d2",
  },
  postsList: {
    flex: 1,
  },
  postsContainer: {
    padding: 20,
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  published: {
    backgroundColor: "#d4edda",
  },
  draft: {
    backgroundColor: "#fff3cd",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  postContent: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: "#adb5bd",
  },
});
