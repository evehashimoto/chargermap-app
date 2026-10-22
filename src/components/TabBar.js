import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, sombra, TAB_BOTTOM, TAB_H } from "./ui";

const ABAS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "perfil", label: "Perfil", icon: "person" },
  { key: "ajustes", label: "Ajustes", icon: "settings" },
];

export default function TabBar({ aba, onChange }) {
  const { t } = useTheme();
  return (
    <View
      style={[
        {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: TAB_BOTTOM,
          height: TAB_H,
          borderRadius: 26,
          backgroundColor: t.surface,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          borderWidth: 1,
          borderColor: t.border,
        },
        sombra(t, 2),
      ]}
    >
      {ABAS.map((a) => {
        const ativa = a.key === aba;
        return (
          <TouchableOpacity
            key={a.key}
            activeOpacity={0.8}
            onPress={() => onChange(a.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            accessibilityLabel={a.label}
            style={{ flex: 1, height: TAB_H - 14, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 18,
                paddingVertical: 6,
                borderRadius: 18,
                backgroundColor: ativa ? t.primary + "26" : "transparent",
              }}
            >
              <Ionicons
                name={ativa ? a.icon : a.icon + "-outline"}
                size={22}
                color={ativa ? t.primary : t.textMuted}
              />
              <Txt
                v="label"
                color={ativa ? t.text : t.textMuted}
                style={{ fontFamily: ativa ? "Poppins_600SemiBold" : "Poppins_500Medium", marginTop: 1 }}
              >
                {a.label}
              </Txt>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
