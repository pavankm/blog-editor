# 🎨 UI Generation Guide for GitHub Copilot

This guide provides comprehensive design specifications for generating UI elements in the blog editor app using the **Dreamy Pastels** design philosophy.

## 📋 Quick Reference

### Primary Framework
- **React Native** with **TypeScript**
- **Expo SDK 53+**
- Target platform: **iPad** (optimized for Apple Pencil)

### Design Philosophy
"A playful yet minimal design language that balances whimsy with focus, creating interfaces that feel like drawing on clouds."

---

## 🎨 Color Palette

### Light Mode Colors
```typescript
const lightColors = {
  primary: '#7C6FD4',      // Soft Purple
  secondary: '#FF9B9B',    // Coral Pink  
  accent: '#98D8C8',       // Mint Green
  skyBlue: '#87CEEB',      // Sky Blue
  softYellow: '#F7DC6F',   // Soft Yellow
  plum: '#DDA0DD',         // Plum
  
  background: 'linear-gradient(135deg, #FAF7FF 0%, #F0F8FF 100%)',
  surface: 'rgba(255, 255, 255, 0.9)',
  surfaceHover: 'rgba(255, 255, 255, 0.95)',
  
  text: '#5A4FCF',
  textSecondary: 'rgba(90, 79, 207, 0.7)',
  border: 'rgba(255, 255, 255, 0.3)',
};
```

### Dark Mode Colors
```typescript
const darkColors = {
  primary: '#9B8CE8',      // Brightened Soft Purple
  secondary: '#FFB3B3',    // Brightened Coral Pink
  accent: '#A8E6D7',       // Brightened Mint Green
  skyBlue: '#A3D8F0',      // Brightened Sky Blue
  softYellow: '#F9E79F',   // Brightened Soft Yellow
  plum: '#E6B3E6',         // Brightened Plum
  
  background: 'linear-gradient(135deg, #1A1B2E 0%, #16213E 100%)',
  surface: 'rgba(30, 32, 52, 0.6)',
  surfaceHover: 'rgba(30, 32, 52, 0.8)',
  
  text: '#B8B5FF',
  textSecondary: 'rgba(184, 181, 255, 0.7)',
  border: 'rgba(184, 181, 255, 0.1)',
};
```

---

## 🏗️ Core Design Elements

### 1. Border Radius
- **Small elements**: `1.5rem` (24px)
- **Medium elements**: `2rem` (32px)
- **Large containers**: `3rem` (48px)
- **Circular elements**: `50%`

### 2. Glass Morphism
```css
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
```

### 3. Spacing Scale
- **xs**: `0.5rem` (8px)
- **sm**: `1rem` (16px)  
- **md**: `1.5rem` (24px)
- **lg**: `2rem` (32px)
- **xl**: `3rem` (48px)
- **2xl**: `4rem` (64px)

### 4. Typography Scale
```typescript
const typography = {
  heroTitle: { fontSize: 48, fontWeight: '700' },
  largeTitle: { fontSize: 32, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: '600' },
  headline: { fontSize: 20, fontWeight: '500' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 14, fontWeight: '400', opacity: 0.7 },
  small: { fontSize: 12, fontWeight: '400', opacity: 0.6 },
};
```

---

## 🎯 Component Specifications

### Buttons

#### Primary Button
```jsx
<TouchableOpacity 
  style={{
    backgroundColor: '#7C6FD4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C6FD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  }}
  activeOpacity={0.8}
>
  <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
    Button Text
  </Text>
</TouchableOpacity>
```

#### Ghost Button
```jsx
<TouchableOpacity 
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(124, 111, 212, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  activeOpacity={0.8}
>
  <Text style={{ color: '#7C6FD4', fontSize: 16, fontWeight: '500' }}>
    Button Text
  </Text>
</TouchableOpacity>
```

### Cards/Containers

#### Glass Card
```jsx
<View style={{
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 32,
  padding: 24,
  marginVertical: 8,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
  shadowColor: '#7C6FD4',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 16,
  elevation: 4,
}}>
  {/* Card content */}
</View>
```

#### Hero Section
```jsx
<View style={{
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 48,
  padding: 48,
  marginBottom: 32,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <Text style={{
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    // Gradient text would need react-native-linear-gradient
    color: '#7C6FD4',
  }}>
    Hero Title
  </Text>
  <Text style={{
    fontSize: 20,
    opacity: 0.8,
    textAlign: 'center',
    maxWidth: 600,
    color: '#5A4FCF',
  }}>
    Hero description text
  </Text>
</View>
```

### Drawing Tools

#### Tool Palette Button
```jsx
<TouchableOpacity 
  style={{
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: isSelected ? '#7C6FD4' : 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: isSelected ? '#7C6FD4' : 'rgba(255, 255, 255, 0.3)',
    shadowColor: isSelected ? '#7C6FD4' : '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isSelected ? 0.3 : 0.1,
    shadowRadius: 8,
  }}
  activeOpacity={0.8}
>
  <Icon 
    name="pen" 
    size={24} 
    color={isSelected ? 'white' : '#7C6FD4'} 
  />
</TouchableOpacity>
```

#### Color Picker Circle
```jsx
<TouchableOpacity 
  style={{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color,
    marginHorizontal: 6,
    borderWidth: isSelected ? 3 : 1,
    borderColor: isSelected ? '#7C6FD4' : 'rgba(255, 255, 255, 0.8)',
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  }}
  activeOpacity={0.8}
/>
```

### Form Elements

#### Text Input
```jsx
<TextInput
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#5A4FCF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#7C6FD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  }}
  placeholder="Enter text..."
  placeholderTextColor="rgba(90, 79, 207, 0.5)"
/>
```

#### Slider
```jsx
<Slider
  style={{ width: 200, height: 40 }}
  minimumValue={1}
  maximumValue={20}
  minimumTrackTintColor="#7C6FD4"
  maximumTrackTintColor="rgba(124, 111, 212, 0.3)"
  thumbStyle={{
    backgroundColor: '#7C6FD4',
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#7C6FD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  }}
/>
```

### Navigation

#### Tab Bar Item
```jsx
<TouchableOpacity 
  style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: isActive ? 'rgba(124, 111, 212, 0.1)' : 'transparent',
    borderRadius: 20,
    marginHorizontal: 4,
  }}
  activeOpacity={0.8}
>
  <Icon 
    name={iconName} 
    size={24} 
    color={isActive ? '#7C6FD4' : 'rgba(90, 79, 207, 0.6)'} 
  />
  <Text style={{
    fontSize: 12,
    color: isActive ? '#7C6FD4' : 'rgba(90, 79, 207, 0.6)',
    marginTop: 4,
    fontWeight: isActive ? '600' : '400',
  }}>
    {label}
  </Text>
</TouchableOpacity>
```

#### Header
```jsx
<View style={{
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  paddingTop: statusBarHeight,
  paddingHorizontal: 20,
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}}>
  <TouchableOpacity 
    style={{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(124, 111, 212, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon name="arrow-left" size={20} color="#7C6FD4" />
  </TouchableOpacity>
  
  <Text style={{
    fontSize: 20,
    fontWeight: '600',
    color: '#5A4FCF',
  }}>
    Screen Title
  </Text>
  
  <TouchableOpacity 
    style={{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(124, 111, 212, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon name="more-vertical" size={20} color="#7C6FD4" />
  </TouchableOpacity>
</View>
```

---

## ✨ Animation Guidelines

### Hover/Press Effects
```typescript
const animatedValue = new Animated.Value(1);

const handlePressIn = () => {
  Animated.spring(animatedValue, {
    toValue: 0.95,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.spring(animatedValue, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};
```

### Entrance Animations
```typescript
const fadeAnim = new Animated.Value(0);
const slideAnim = new Animated.Value(50);

useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start();
}, []);
```

---

## 🌙 Dark Mode Implementation

### Theme Context
```typescript
interface Theme {
  colors: typeof lightColors | typeof darkColors;
  isDark: boolean;
}

const ThemeContext = createContext<Theme | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### Dynamic Styling
```jsx
const { colors, isDark } = useTheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 32,
  },
  text: {
    color: colors.text,
  },
});
```

---

## 🎨 Color Usage Guidelines

### When to Use Each Color
- **Primary (#7C6FD4)**: Main actions, selected states, primary navigation
- **Secondary (#FF9B9B)**: Secondary actions, warning states, highlights  
- **Accent (#98D8C8)**: Success states, positive feedback, accent elements
- **Sky Blue (#87CEEB)**: Information, neutral states, calm elements
- **Soft Yellow (#F7DC6F)**: Caution, pending states, warm highlights
- **Plum (#DDA0DD)**: Special features, premium elements, creative tools

### Accessibility Considerations
- Ensure minimum 4.5:1 contrast ratio for text
- Use color + icon/text for important states
- Test with color blindness simulators
- Provide dark mode alternatives

---

## 📱 iPad-Specific Considerations

### Safe Areas
```jsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();

const styles = StyleSheet.create({
  container: {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  },
});
```

### Touch Targets
- Minimum 44px × 44px for touch targets
- Extra padding around small elements
- Consider Apple Pencil precision vs finger touch

### Layout Breakpoints
```typescript
const { width } = Dimensions.get('window');

const isTablet = width >= 768;
const isLargeTablet = width >= 1024;

const getColumns = () => {
  if (isLargeTablet) return 3;
  if (isTablet) return 2;
  return 1;
};
```

---

## 🎪 Implementation Tips

### ✅ Best Practices
1. **Consistent Border Radius**: Use the defined scale consistently
2. **Layer Transparency**: Build depth with multiple transparent layers
3. **Generous Spacing**: Use ample whitespace for breathability  
4. **Smooth Transitions**: All animations should feel natural (300ms duration)
5. **Color Harmony**: Stick to the defined palette for consistency

### ❌ Avoid
1. **Sharp Corners**: Everything should feel soft and rounded
2. **Harsh Shadows**: Use colored shadows that match the element
3. **Busy Layouts**: Maintain clean, uncluttered interfaces
4. **Jarring Animations**: Keep transitions subtle and purposeful
5. **Poor Contrast**: Always prioritize readability

---

## 📚 Example Component Requests

When asking GitHub Copilot to generate components, use phrases like:

> "Create a dreamy pastels floating action button with glass morphism effect and soft purple primary color"

> "Generate an iPad-optimized tool palette with rounded buttons, gentle shadows, and mint green accent color"

> "Build a glass morphism card container with coral pink highlights and generous padding for blog post preview"

> "Create a drawing canvas overlay with translucent white background and soft rounded corners"

---

This guide ensures all generated UI elements maintain the dreamy pastels aesthetic while providing practical, implementable code for your blog editor app.
