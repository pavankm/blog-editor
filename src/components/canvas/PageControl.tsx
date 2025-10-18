import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Plus } from "lucide-react-native";
import { PageControlProps } from "./types";
import { styles, getDynamicStyles } from "./PageControl.style";

const PageControl: React.FC<PageControlProps> = ({
  currentPage,
  totalPages,
  onAddPage,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dynamicStyles = getDynamicStyles(isDark);

  return (
    <View
      style={[styles.pageControlContainer, dynamicStyles.pageControlContainer]}
    >
      <Text style={[styles.pageInfo, dynamicStyles.pageInfo]}>
        Page {currentPage} of {totalPages}
      </Text>
      <TouchableOpacity
        style={[styles.addButton, dynamicStyles.addButton]}
        onPress={onAddPage}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PageControl;
