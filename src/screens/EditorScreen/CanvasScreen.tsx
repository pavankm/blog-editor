import React, { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { FileText, Upload, PenTool } from "lucide-react-native";
import BottomToolbar from "../../components/toolbar/BottomToolbar";
import { BrushSize } from "../../components/toolbar/types";
import { styles, getDynamicStyles } from "./CanvasScreen.style";

import Page from "../../components/canvas/Page";
import PageControl from "../../components/canvas/PageControl";

const CanvasScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dynamicStyles = getDynamicStyles(isDark);
  const [brushSize, setBrushSize] = useState<BrushSize>("medium");
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);

  const addPage = () => {
    setPages([...pages, pages.length + 1]);
    setCurrentPage(pages.length + 1);
  };

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      <View style={[styles.topBar, dynamicStyles.topBar]}>
        <View style={styles.topLeft}>
          <View style={[styles.statusDot, dynamicStyles.statusDot]} />
          <Text style={[styles.screenTitle, dynamicStyles.screenTitle]}>
            New Composition
          </Text>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity
            style={[styles.button, dynamicStyles.secondaryButton]}
          >
            <FileText size={20} color={isDark ? "#9B8CE8" : "#7C6FD4"} />
            <Text
              style={[styles.buttonText, dynamicStyles.secondaryButtonText]}
            >
              Preview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, dynamicStyles.primaryButton]}
          >
            <Upload size={20} color="white" />
            <Text style={[styles.buttonText, dynamicStyles.primaryButtonText]}>
              Publish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.canvasArea}>
        <Page>
          <View style={styles.placeholderContainer}>
            <View
              style={[
                styles.placeholderIconContainer,
                dynamicStyles.placeholderIconContainer,
              ]}
            >
              <PenTool size={40} color={isDark ? "#9B8CE8" : "#7C6FD4"} />
            </View>
            <Text
              style={[styles.placeholderText, dynamicStyles.placeholderText]}
            >
              Begin your story
            </Text>
          </View>
        </Page>
      </View>
      <PageControl
        currentPage={currentPage}
        totalPages={pages.length}
        onAddPage={addPage}
      />
      <BottomToolbar
        selectedBrushSize={brushSize}
        onBrushSizeChange={setBrushSize}
        onClear={() => console.log("Clear")}
        onToolSelect={(tool) => console.log(tool)}
      />
    </View>
  );
};

export default CanvasScreen;
