import React from "react";
import { View, useColorScheme } from "react-native";
import { PageComponentProps } from "./types";
import { styles, getDynamicStyles } from "./Page.style";

const Page: React.FC<PageComponentProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dynamicStyles = getDynamicStyles(isDark);

  return <View style={[styles.page, dynamicStyles.page]}>{children}</View>;
};

export default Page;
