import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import {
  PenTool,
  FileText,
  Upload,
  Check,
  Edit3,
  Github,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function BlogAppNative() {
  const [screen, setScreen] = useState("canvas");

  const posts = [
    { title: "Stillness in Motion", date: "2025-10-15", status: "published" },
    { title: "Cherry Blossoms at Dawn", date: "2025-10-12", status: "draft" },
    { title: "The Art of Tea", date: "2025-10-10", status: "published" },
  ];

  return (
    <View style={styles.blogApp}>
      {/* Minimal Top Border */}
      <LinearGradient
        colors={["#fffbeb", "#ffe4e6", "#fffbeb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBorder}
      />

      {/* Screen Selector */}
      <BlurView intensity={20} style={styles.screenSelector}>
        <View style={styles.screenSelectorContent}>
          <TouchableOpacity
            onPress={() => setScreen("canvas")}
            style={[
              styles.screenButton,
              screen === "canvas" && styles.activeScreenButton,
            ]}
          >
            <Text
              style={[
                styles.screenButtonText,
                screen === "canvas" && styles.activeScreenButtonText,
              ]}
            >
              書く
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreen("preview")}
            style={[
              styles.screenButton,
              screen === "preview" && styles.activeScreenButton,
            ]}
          >
            <Text
              style={[
                styles.screenButtonText,
                screen === "preview" && styles.activeScreenButtonText,
              ]}
            >
              Preview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreen("posts")}
            style={[
              styles.screenButton,
              screen === "posts" && styles.activeScreenButton,
            ]}
          >
            <Text
              style={[
                styles.screenButtonText,
                screen === "posts" && styles.activeScreenButtonText,
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreen("settings")}
            style={[
              styles.screenButton,
              screen === "settings" && styles.activeScreenButton,
            ]}
          >
            <Text
              style={[
                styles.screenButtonText,
                screen === "settings" && styles.activeScreenButtonText,
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Canvas Screen */}
      {screen === "canvas" && (
        <View style={styles.screen}>
          {/* Minimal Top Bar */}
          <BlurView intensity={20} style={styles.topBar}>
            <View style={styles.topBarContent}>
              <View style={styles.topBarLeft}>
                <View
                  style={[styles.statusDot, { backgroundColor: "#fecaca" }]}
                ></View>
                <Text style={styles.screenTitle}>New Composition</Text>
              </View>

              <View style={styles.topBarRight}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                >
                  <FileText size={16} color="#57534e" />
                  <Text style={styles.buttonTextSecondary}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                  <Upload size={16} color="#fafaf9" />
                  <Text style={styles.buttonTextPrimary}>Publish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>

          {/* Canvas Area */}
          <View style={styles.canvasArea}>
            <View style={styles.canvas}>
              <View style={styles.canvasPlaceholder}>
                <View style={styles.canvasPlaceholderContent}>
                  <LinearGradient
                    colors={["#ffe4e6", "#fffbeb"]}
                    style={styles.placeholderIconContainer}
                  >
                    <PenTool size={32} color="#57534e" strokeWidth={1.5} />
                  </LinearGradient>
                  <Text style={styles.placeholderText}>Begin your story</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Minimalist Toolbar */}
          <BlurView intensity={20} style={styles.bottomToolbar}>
            <View style={styles.toolbarContent}>
              <View style={styles.toolbarLeft}>
                <TouchableOpacity style={styles.toolButton}>
                  <Edit3 size={20} color="white" strokeWidth={1.5} />
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <View style={styles.brushOptions}>
                  <Text style={styles.brushLabel}>Brush</Text>
                  <View style={styles.brushSizes}>
                    <TouchableOpacity
                      style={[styles.brushSizeButton, styles.selectedBrush]}
                    >
                      <View
                        style={[styles.brushDot, { width: 4, height: 4 }]}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.brushSizeButton, styles.unselectedBrush]}
                    >
                      <View
                        style={[styles.brushDot, { width: 6, height: 6 }]}
                      ></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.brushSizeButton, styles.unselectedBrush]}
                    >
                      <View
                        style={[styles.brushDot, { width: 10, height: 10 }]}
                      ></View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      )}

      {/* Preview Screen */}
      {screen === "preview" && (
        <ScrollView style={styles.screen}>
          <BlurView intensity={20} style={styles.topBar}>
            <View style={styles.topBarContent}>
              <Text style={styles.screenTitle}>Refine & Publish</Text>
              <View style={styles.topBarRight}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                >
                  <Text style={styles.buttonTextSecondary}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                  <Upload size={16} color="#fafaf9" />
                  <Text style={styles.buttonTextPrimary}>Publish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>

          <View style={styles.contentArea}>
            <View style={styles.content}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View
                    style={[styles.statusDot, { backgroundColor: "#fecaca" }]}
                  ></View>
                  <Text style={styles.cardTitle}>Details</Text>
                </View>
                <View>
                  <Text style={styles.formLabel}>Title</Text>
                  <TextInput
                    placeholder="Enter your title..."
                    style={styles.formInput}
                    placeholderTextColor="#d6d3d1"
                  />
                </View>
                <View style={styles.grid2Col}>
                  <View>
                    <Text style={styles.formLabel}>Date</Text>
                    <TextInput style={styles.formInput} />
                  </View>
                  <View>
                    <Text style={styles.formLabel}>Category</Text>
                    <TextInput
                      placeholder="Reflection, Journey..."
                      style={styles.formInput}
                      placeholderTextColor="#d6d3d1"
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.formLabel}>Tags</Text>
                  <TextInput
                    placeholder="peace, nature, mindfulness"
                    style={styles.formInput}
                    placeholderTextColor="#d6d3d1"
                  />
                </View>
              </View>

              <View style={styles.card}>
                <View
                  style={[
                    styles.cardHeader,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={[styles.statusDot, { backgroundColor: "#fde047" }]}
                    ></View>
                    <Text style={styles.cardTitle}>Content</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.rescanButton}>Re-scan</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.textarea}
                  placeholder="Your words will appear here..."
                  defaultValue={
                    "# The Path of Stillness\n\nIn the quiet morning, before the world awakens, there exists a moment of pure presence.\n\n## Finding Peace\n\nThe gentle rustle of leaves carries wisdom that words cannot express. In simplicity, we find depth."
                  }
                  multiline={true}
                  placeholderTextColor="#d6d3d1"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Posts List */}
      {screen === "posts" && (
        <View style={styles.screen}>
          <BlurView intensity={20} style={styles.topBar}>
            <View style={styles.topBarContent}>
              <Text style={styles.screenTitle}>Archive</Text>
              <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                <PenTool size={16} color="#fafaf9" />
                <Text style={styles.buttonTextPrimary}>New</Text>
              </TouchableOpacity>
            </View>
          </BlurView>

          <ScrollView style={styles.contentArea}>
            <View style={styles.postList}>
              {posts.map((post, idx) => (
                <View key={idx} style={styles.postItem}>
                  <View style={styles.postItemContent}>
                    <View style={styles.postDetails}>
                      <View style={styles.postTitleContainer}>
                        <View
                          style={[
                            styles.postStatusDot,
                            post.status === "published"
                              ? styles.publishedDot
                              : styles.draftDot,
                          ]}
                        ></View>
                        <Text style={styles.postTitle}>{post.title}</Text>
                      </View>
                      <Text style={styles.postDate}>{post.date}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                      <Edit3 size={16} color="#78716c" strokeWidth={1.5} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Settings */}
      {screen === "settings" && (
        <ScrollView style={styles.screen}>
          <BlurView intensity={20} style={styles.topBar}>
            <View style={styles.topBarContent}>
              <Text style={styles.screenTitle}>Configuration</Text>
            </View>
          </BlurView>

          <View style={styles.contentArea}>
            <View style={styles.settingsContent}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Github size={20} color="#44403c" strokeWidth={1.5} />
                  <Text style={styles.cardTitle}>GitHub</Text>
                </View>
                <View>
                  <Text style={styles.formLabel}>Repository</Text>
                  <TextInput
                    placeholder="username/repository"
                    style={styles.formInput}
                    placeholderTextColor="#d6d3d1"
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Access Token</Text>
                  <TextInput
                    placeholder="ghp_xxxxxxxxxxxx"
                    secureTextEntry
                    style={styles.formInput}
                    placeholderTextColor="#d6d3d1"
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Posts Path</Text>
                  <TextInput
                    placeholder="_posts"
                    style={styles.formInput}
                    placeholderTextColor="#d6d3d1"
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonPrimary,
                    styles.verifyButton,
                  ]}
                >
                  <Check size={16} color="#fafaf9" />
                  <Text style={styles.buttonTextPrimary}>
                    Verify Connection
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View
                    style={[styles.statusDot, { backgroundColor: "#fecaca" }]}
                  ></View>
                  <Text style={styles.cardTitle}>Recognition</Text>
                </View>
                <View>
                  <View style={styles.toggleGroup}>
                    <View>
                      <Text style={styles.toggleLabel}>Detect headers</Text>
                      <Text style={styles.toggleDescription}>
                        Convert large text to markdown headings
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#292524" }}
                      thumbColor={"#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      value={true}
                    />
                  </View>
                  <View style={[styles.toggleGroup, { borderBottomWidth: 0 }]}>
                    <View>
                      <Text style={styles.toggleLabel}>Detect lists</Text>
                      <Text style={styles.toggleDescription}>
                        Transform bullets to markdown format
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#292524" }}
                      thumbColor={"#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      value={true}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.card, styles.aboutCard]}>
                <LinearGradient
                  colors={["#ffe4e6", "#fffbeb"]}
                  style={styles.aboutIconContainer}
                >
                  <PenTool size={24} color="#57534e" strokeWidth={1.5} />
                </LinearGradient>
                <Text style={styles.appName}>静寂 - Seijaku</Text>
                <Text style={styles.appVersion}>Version 1.0</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blogApp: {
    flex: 1,
    backgroundColor: "#f5f5f4",
  },
  topBorder: {
    height: 4,
  },
  screenSelector: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 228, 226, 0.5)",
  },
  screenSelectorContent: {
    flexDirection: "row",
    gap: 12,
    maxWidth: 1280,
    marginHorizontal: "auto",
  },
  screenButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: "rgba(245, 245, 244, 0.5)",
  },
  activeScreenButton: {
    backgroundColor: "#292524",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  screenButtonText: {
    fontWeight: "300",
    fontSize: 14,
    letterSpacing: 0.5,
    color: "#57534e",
  },
  activeScreenButtonText: {
    color: "#fafaf9",
  },
  screen: {
    flex: 1,
  },
  topBar: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 228, 226, 0.5)",
  },
  topBarContent: {
    maxWidth: 1536,
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#44403c",
    letterSpacing: 0.5,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: "rgba(245, 245, 244, 0.5)",
  },
  buttonTextSecondary: {
    color: "#57534e",
    fontWeight: "300",
    fontSize: 14,
  },
  buttonPrimary: {
    backgroundColor: "#292524",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonTextPrimary: {
    color: "#fafaf9",
    fontWeight: "300",
    fontSize: 14,
  },
  canvasArea: {
    flex: 1,
    padding: 32,
  },
  canvas: {
    flex: 1,
    maxWidth: 1280,
    marginHorizontal: "auto",
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(229, 228, 226, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
    position: "relative",
  },
  canvasPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  canvasPlaceholderContent: {
    alignItems: "center",
  },
  placeholderIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  placeholderText: {
    color: "#a8a29e",
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  bottomToolbar: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(229, 228, 226, 0.5)",
  },
  toolbarContent: {
    maxWidth: 1536,
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toolbarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  toolButton: {
    width: 48,
    height: 48,
    backgroundColor: "#292524",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  divider: {
    height: 32,
    width: 1,
    backgroundColor: "#e5e4e2",
  },
  brushOptions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brushLabel: {
    fontSize: 14,
    color: "#78716c",
    fontWeight: "300",
  },
  brushSizes: {
    flexDirection: "row",
    gap: 8,
  },
  brushSizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBrush: {
    borderWidth: 2,
    borderColor: "#292524",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unselectedBrush: {
    borderWidth: 1,
    borderColor: "#d6d3d1",
  },
  brushDot: {
    backgroundColor: "#292524",
    borderRadius: 9999,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(245, 245, 244, 0.5)",
    borderRadius: 9999,
  },
  clearButtonText: {
    color: "#57534e",
    fontWeight: "300",
    fontSize: 14,
  },
  contentArea: {
    flex: 1,
    padding: 32,
  },
  content: {
    maxWidth: 1024,
    marginHorizontal: "auto",
    gap: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(229, 228, 226, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#44403c",
    letterSpacing: 0.5,
  },
  formLabel: {
    fontSize: 14,
    color: "#78716c",
    fontWeight: "300",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  formInput: {
    width: "100%",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e4e2",
    fontWeight: "300",
    color: "#292524",
    marginBottom: 20,
  },
  grid2Col: {
    flexDirection: "row",
    gap: 24,
  },
  textarea: {
    height: 384,
    fontWeight: "300",
    color: "#44403c",
    lineHeight: 24,
    textAlignVertical: "top",
  },
  rescanButton: {
    fontSize: 14,
    color: "#78716c",
    fontWeight: "300",
  },
  postList: {
    maxWidth: 1024,
    marginHorizontal: "auto",
    gap: 16,
  },
  postItem: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(229, 228, 226, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  postItemContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  postDetails: {
    flex: 1,
  },
  postTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  postStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  publishedDot: {
    backgroundColor: "#86efac",
  },
  draftDot: {
    backgroundColor: "#fde047",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#292524",
    letterSpacing: 0.5,
  },
  postDate: {
    fontSize: 14,
    color: "#a8a29e",
    fontWeight: "300",
    marginLeft: 20,
  },
  editButton: {
    padding: 8,
    borderRadius: 9999,
  },
  settingsContent: {
    maxWidth: 1024,
    marginHorizontal: "auto",
    gap: 24,
  },
  verifyButton: {
    width: "100%",
    marginTop: 24,
    justifyContent: "center",
  },
  toggleGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f4",
  },
  toggleLabel: {
    fontWeight: "300",
    color: "#44403c",
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: "#a8a29e",
    fontWeight: "300",
  },
  aboutCard: {
    alignItems: "center",
  },
  aboutIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    color: "#57534e",
    fontWeight: "300",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  appVersion: {
    color: "#a8a29e",
    fontWeight: "300",
    fontSize: 12,
    marginTop: 4,
  },
});
