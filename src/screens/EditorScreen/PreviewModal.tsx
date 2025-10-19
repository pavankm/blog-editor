import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

interface PreviewModalProps {
  post?: any;
  layers?: any[];
  isVisible: boolean;
  onClose: () => void;
  onExport?: (format: "pdf" | "image" | "text") => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  post,
  layers,
  isVisible,
  onClose,
  onExport,
}) => {
  const handleExport = (format: "pdf" | "image" | "text") => {
    onExport?.(format);
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Preview & Export</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Preview Area */}
          <ScrollView style={styles.previewArea}>
            <View style={styles.previewContent}>
              <Text style={styles.previewText}>📄 Preview</Text>
              <Text style={styles.previewSubtext}>
                Post: {post?.title || "Untitled"}
              </Text>
              <Text style={styles.previewSubtext}>
                Layers: {layers?.length || 0}
              </Text>
            </View>
          </ScrollView>

          {/* Export Options */}
          <View style={styles.exportOptions}>
            <Text style={styles.exportTitle}>Export As:</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => handleExport("pdf")}
              >
                <Text style={styles.exportButtonText}>📕 PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => handleExport("image")}
              >
                <Text style={styles.exportButtonText}>🖼️ Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => handleExport("text")}
              >
                <Text style={styles.exportButtonText}>📝 Text</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7C6FD4",
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: "#7C6FD4",
  },
  previewArea: {
    maxHeight: 300,
    paddingHorizontal: 20,
  },
  previewContent: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginVertical: 16,
  },
  previewText: {
    fontSize: 32,
    marginBottom: 8,
  },
  previewSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  exportOptions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  exportTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C6FD4",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  exportButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#F5E6FF",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#7C6FD4",
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C6FD4",
  },
  closeModalButton: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: "#7C6FD4",
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default PreviewModal;
