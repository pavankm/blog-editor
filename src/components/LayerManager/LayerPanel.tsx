import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
}

interface LayerPanelProps {
  layers?: Layer[];
  activeLayerId?: string;
  onSelectLayer?: (layerId: string) => void;
  onToggleLayerVisibility?: (layerId: string) => void;
  onDeleteLayer?: (layerId: string) => void;
  onAddLayer?: () => void;
  currentPageIndex?: number;
  onSelectPage?: (pageIndex: number) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({
  layers = [],
  activeLayerId,
  onSelectLayer,
  onToggleLayerVisibility,
  onDeleteLayer,
  onAddLayer,
  currentPageIndex = 0,
  onSelectPage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pages & Layers</Text>

      {/* Pages List */}
      <View style={styles.section}>
        <Text style={styles.label}>Pages</Text>
        <ScrollView
          style={styles.layersList}
          showsVerticalScrollIndicator={false}
        >
          {layers.map((layer, index) => (
            <TouchableOpacity
              key={layer.id}
              style={[
                styles.pageItem,
                currentPageIndex === index && styles.pageItemActive,
              ]}
              onPress={() => onSelectPage?.(index)}
            >
              <Text style={styles.pageText}>Page {index + 1}</Text>
              <TouchableOpacity
                style={styles.layerAction}
                onPress={() => onToggleLayerVisibility?.(layer.id)}
              >
                <Text style={styles.actionText}>
                  {layer.visible ? "👁️" : "🚫"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.layerAction}
                onPress={() => onDeleteLayer?.(layer.id)}
              >
                <Text style={styles.actionText}>🗑️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Add Layer Button */}
      <TouchableOpacity style={styles.addButton} onPress={onAddLayer}>
        <Text style={styles.addButtonText}>+ Add Page</Text>
      </TouchableOpacity>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.infoText}>Total Pages: {layers.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7C6FD4",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    textTransform: "uppercase",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  layersList: {
    maxHeight: 300,
    paddingHorizontal: 8,
  },
  pageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  pageItemActive: {
    backgroundColor: "#F5E6FF",
    borderColor: "#7C6FD4",
  },
  pageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  layerAction: {
    padding: 6,
  },
  actionText: {
    fontSize: 14,
  },
  addButton: {
    marginHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#7C6FD4",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  info: {
    paddingHorizontal: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  infoText: {
    fontSize: 12,
    color: "#999",
  },
});

export default LayerPanel;
