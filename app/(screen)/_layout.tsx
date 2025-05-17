import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TOTAL_HORIZONTAL_PADDING = 28;
const TOTAL_GAPS = 18;
const BUTTONS_PER_ROW = 4;

const buttonSize =
  (SCREEN_WIDTH - TOTAL_HORIZONTAL_PADDING - TOTAL_GAPS) / BUTTONS_PER_ROW;

const colors: {
  [key: string]: { first: string; second: string; third: string };
} = {
  green: {
    first: "#0ABF1F",
    second: "#91E399",
    third: "#D9F8DD",
  },
  blue: {
    first: "#2095E9",
    second: "#A1CCF7",
    third: "#DDF1FF",
  },
  purple: {
    first: "#8D38E3",
    second: "#C8A9F4",
    third: "#F0E1FE",
  },
  pink: {
    first: "#E3388D",
    second: "#F8A8C9",
    third: "#FEE2F0",
  },
  red: {
    first: "#E3384C",
    second: "#F8A8AE",
    third: "#FEE2E4",
  },
  orange: {
    first: "#F48D18",
    second: "#FBC498",
    third: "#FFEDD6",
  },
};

export default function TabLayout() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [display, setDisplay] = useState("");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<null | "+" | "-" | "*" | "/">(
    null
  );

  const NumberButton = ({ value }: { value: string }) => (
    <TouchableOpacity
      onPress={() => setDisplay(display + value)}
      style={[styles.button, { backgroundColor: colors[selectedColor].third }]}
    >
      <ThemedText style={styles.buttonText}>{value}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.colorsContainer}>
        <View style={styles.colorsContainer}>
          {Object.keys(colors).map((colorKey) => (
            <View
              key={colorKey}
              style={[
                styles.colorCircle,
                {
                  backgroundColor: colors[colorKey].first,
                  borderWidth: selectedColor === colorKey ? 4 : 0,
                  borderColor: "#000",
                },
              ]}
              onTouchEnd={() => setSelectedColor(colorKey)}
            />
          ))}
        </View>
      </View>

      <View style={styles.columns}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingBottom: 8,
          }}
        >
          <ThemedText
            style={
              display === "Can't divide by 0"
                ? { fontSize: 45, lineHeight: 80 * 1.2 }
                : { fontSize: 84, lineHeight: 80 * 1.2 }
            }
          >
            {display || "0"}
          </ThemedText>
          <TouchableOpacity
            style={display ? {} : { pointerEvents: "none" }}
            onPress={() => {
              if (display === "Can't divide by 0") {
                setDisplay("");
                return;
              }
              setDisplay(display.slice(0, -1));
            }}
          >
            <IconSymbol
              name={"delete.left"}
              size={40}
              weight="medium"
              color={display ? colors[selectedColor].first : "#ccc"}
            ></IconSymbol>
          </TouchableOpacity>
        </View>
        <View style={styles.columns}>
          <View style={styles.rows}>
            <TouchableOpacity
              onPress={() => {
                setDisplay("");
                setStoredValue(null);
                setOperation(null);
              }}
              style={[
                styles.button,
                { backgroundColor: colors[selectedColor].second },
              ]}
            >
              <ThemedText style={styles.buttonText}>
                <IconSymbol
                  name={"eraser.line.dashed"}
                  color={"#000"}
                  size={48}
                  weight="regular"
                />
              </ThemedText>
            </TouchableOpacity>
            <View
              style={[
                styles.button,
                { backgroundColor: colors[selectedColor].second },
              ]}
            >
              <IconSymbol
                name={"plusminus"}
                color={"#000"}
                size={32}
                weight="regular"
              />
            </View>
            <View
              style={[
                styles.button,
                { backgroundColor: colors[selectedColor].second },
              ]}
            >
              <IconSymbol
                name={"percent"}
                color={"#000"}
                size={34}
                weight="medium"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (display !== "") {
                  setOperation("/");
                  setDisplay(display + "÷");
                }
              }}
              style={[
                styles.button,
                { backgroundColor: colors[selectedColor].first },
              ]}
            >
              <IconSymbol
                name={"divide"}
                color={"#fff"}
                size={34}
                weight="regular"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rows}>
            <NumberButton value="7" />
            <NumberButton value="8" />
            <NumberButton value="9" />
            <TouchableOpacity
              onPress={() => {
                if (display !== "") {
                  setOperation("*");
                  setDisplay(display + "×");
                }
              }}
              style={[
                styles.button,
                { backgroundColor: colors[selectedColor].first },
              ]}
            >
              <IconSymbol
                name={"multiply"}
                color={"#fff"}
                size={30}
                weight="regular"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rows}>
            <NumberButton value="4" />
            <NumberButton value="5" />
            <NumberButton value="6" />
            <TouchableOpacity
              onPress={() => {
                if (display !== "") {
                  setOperation("-");
                  setDisplay(display + "-");
                }
              }}
              style={[
                styles.button,
                { backgroundColor: colors[selectedColor].first },
              ]}
            >
              <IconSymbol
                name={"minus"}
                color={"#fff"}
                size={32}
                weight="regular"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rows}>
            <View style={[styles.columns, { flex: 3 }]}>
              <View style={styles.rows}>
                <NumberButton value="1" />
                <NumberButton value="2" />
                <NumberButton value="3" />
              </View>
              <View style={styles.rows}>
                <NumberButton value="0" />
                <View
                  style={[
                    styles.button,
                    { backgroundColor: colors[selectedColor].third },
                  ]}
                >
                  <ThemedText style={styles.buttonText}>,</ThemedText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      const sanitized = display
                        .replace(/×/g, "*")
                        .replace(/÷/g, "/")
                        .replace(/[^-()\d/*+.]/g, ""); // remove any unsafe chars
                      const result = eval(sanitized);
                      if (result === Infinity) {
                        setDisplay("Can't divide by 0");
                        return;
                      }
                      setDisplay(result.toString());
                      setStoredValue(null);
                      setOperation(null);
                    } catch (error) {
                      setDisplay("Error");
                    }
                  }}
                  style={[
                    styles.button,
                    { backgroundColor: colors[selectedColor].first },
                  ]}
                >
                  <IconSymbol
                    name={"equal"}
                    color={"#fff"}
                    size={30}
                    weight="regular"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (display !== "") {
                  setOperation("+");
                  setDisplay(display + "+");
                }
              }}
              style={[
                styles.buttonTall,
                { backgroundColor: colors[selectedColor].first },
              ]}
            >
              <IconSymbol
                name={"plus"}
                color={"#fff"}
                size={36}
                weight="regular"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  colorsContainer: {
    flexDirection: "row",
    gap: 14,
    marginHorizontal: 6,
    alignSelf: "flex-end",
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 16,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  buttonTall: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  buttonText: {
    fontSize: 36,
    lineHeight: 36 * 1.2,
    color: "#000",
  },
  rows: {
    flexDirection: "row",
    gap: 6,
  },
  columns: {
    flexDirection: "column",
    gap: 6,
  },
});
