import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";

export const TOP = Platform.OS === "ios" ? 58 : (StatusBar.currentHeight || 24) + 14;
export const TAB_BOTTOM = Platform.OS === "ios" ? 26 : 20;
export const TAB_H = 66;
export const TAB_SPACE = TAB_BOTTOM + TAB_H + 24;

export const sombra = (t, nivel = 1) =>
  Platform.select({
    ios: {
      shadowColor: t.shadow,
      shadowOpacity: t.mode === "dark" ? 0.45 : 0.14 * nivel,
      shadowRadius: 8 * nivel + 4,
      shadowOffset: { width: 0, height: 4 * nivel },
    },
    android: { elevation: 2 + 3 * nivel },
  });

const VARIANTES = {
  display: { size: 28, font: "Poppins_700Bold" },
  title: { size: 22, font: "Poppins_700Bold" },
  heading: { size: 16, font: "Poppins_600SemiBold" },
  body: { size: 15, font: "Poppins_400Regular" },
  bodyBold: { size: 15, font: "Poppins_600SemiBold" },
  caption: { size: 13, font: "Poppins_400Regular" },
  label: { size: 12, font: "Poppins_500Medium" },
};

export function Txt({ v = "body", color, style, children, ...rest }) {
  const { t, fs } = useTheme();
  const spec = VARIANTES[v];
  return (
    <Text
      {...rest}
      style={[{ fontFamily: spec.font, fontSize: fs(spec.size), color: color || t.text }, style]}
    >
      {children}
    </Text>
  );
}

export function Button({ title, onPress, icon, variant = "primary", style, disabled }) {
  const { t, fs } = useTheme();
  const cfg = {
    primary: { bg: t.primary, fg: t.onPrimary, border: null },
    secondary: { bg: t.secondary, fg: "#FFFFFF", border: null },
    outline: { bg: "transparent", fg: t.text, border: t.border },
    danger: { bg: "transparent", fg: t.danger, border: t.danger },
  }[variant];
  const glow =
    variant === "primary"
      ? Platform.select({
          ios: { shadowColor: t.primary, shadowOpacity: 0.4, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
          android: { elevation: 6 },
        })
      : null;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          minHeight: 54,
          borderRadius: 16,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cfg.bg,
          borderWidth: cfg.border ? 1.5 : 0,
          borderColor: cfg.border || "transparent",
          opacity: disabled ? 0.5 : 1,
        },
        glow,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={20} color={cfg.fg} style={{ marginRight: 8 }} /> : null}
      <Txt v="bodyBold" color={cfg.fg} style={{ fontSize: fs(16) }}>
        {title}
      </Txt>
    </TouchableOpacity>
  );
}

export function Field({ icon, label, secure, style, ...props }) {
  const { t, fs } = useTheme();
  const [mostrar, setMostrar] = useState(false);
  const [foco, setFoco] = useState(false);
  return (
    <View style={[{ marginBottom: 14 }, style]}>
      {label ? (
        <Txt v="label" color={t.textMuted} style={{ marginBottom: 6, marginLeft: 4 }}>
          {label}
        </Txt>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: t.surface,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: foco ? t.primary : t.border,
          paddingHorizontal: 14,
          minHeight: 54,
        }}
      >
        {icon ? (
          <Ionicons name={icon} size={20} color={foco ? t.primary : t.textMuted} style={{ marginRight: 10 }} />
        ) : null}
        <TextInput
          {...props}
          accessibilityLabel={label || props.placeholder}
          secureTextEntry={secure && !mostrar}
          onFocus={() => setFoco(true)}
          onBlur={() => setFoco(false)}
          placeholderTextColor={t.textMuted}
          style={{ flex: 1, color: t.text, fontFamily: "Poppins_400Regular", fontSize: fs(15), paddingVertical: 12 }}
        />
        {secure ? (
          <TouchableOpacity
            onPress={() => setMostrar(!mostrar)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={mostrar ? "Ocultar senha" : "Mostrar senha"}
          >
            <Ionicons name={mostrar ? "eye-off-outline" : "eye-outline"} size={20} color={t.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export function Card({ children, style }) {
  const { t } = useTheme();
  return (
    <View style={[{ backgroundColor: t.surface, borderRadius: 22, padding: 16 }, sombra(t), style]}>
      {children}
    </View>
  );
}

export function Chip({ label, active, onPress, icon }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: active ? t.primary : t.surfaceAlt,
        borderWidth: 1.5,
        borderColor: active ? t.primary : t.border,
      }}
    >
      {icon ? (
        <Ionicons name={icon} size={16} color={active ? t.onPrimary : t.textMuted} style={{ marginRight: 6 }} />
      ) : null}
      <Txt v="label" color={active ? t.onPrimary : t.text} style={{ fontFamily: "Poppins_600SemiBold" }}>
        {label}
      </Txt>
    </TouchableOpacity>
  );
}

export function Tag({ icon, text }) {
  const { t } = useTheme();
  if (!text) return null;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: t.surfaceAlt,
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 10,
        marginRight: 6,
      }}
    >
      {icon ? <Ionicons name={icon} size={13} color={t.accent} style={{ marginRight: 4 }} /> : null}
      <Txt v="label" color={t.text}>
        {text}
      </Txt>
    </View>
  );
}

export function Segmented({ options, value, onChange }) {
  const { t } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: t.surfaceAlt,
        borderRadius: 16,
        padding: 4,
        borderWidth: 1,
        borderColor: t.border,
      }}
    >
      {options.map((o) => {
        const ativo = o.key === value;
        return (
          <TouchableOpacity
            key={o.key}
            activeOpacity={0.85}
            onPress={() => onChange(o.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: ativo ? t.primary : "transparent",
            }}
          >
            {o.icon ? (
              <Ionicons name={o.icon} size={18} color={ativo ? t.onPrimary : t.textMuted} style={{ marginBottom: 2 }} />
            ) : null}
            <Txt
              v="label"
              color={ativo ? t.onPrimary : t.text}
              numberOfLines={1}
              style={{ fontFamily: ativo ? "Poppins_600SemiBold" : "Poppins_500Medium" }}
            >
              {o.label}
            </Txt>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function Avatar({ nome, size = 88 }) {
  const { t } = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: t.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#FFFFFF",
      }}
    >
      <Text style={{ color: t.onPrimary, fontFamily: "Poppins_700Bold", fontSize: size * 0.42 }}>
        {(nome || "?").trim().charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

export function Stars({ nota, size = 14 }) {
  const n = Math.max(0, Math.min(5, parseFloat(String(nota).replace(",", ".")) || 0));
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={n >= i ? "star" : n >= i - 0.5 ? "star-half" : "star-outline"}
          size={size}
          color="#F5B301"
          style={{ marginRight: 1 }}
        />
      ))}
    </View>
  );
}

export function EmptyState({ icon, titulo, texto, acao }) {
  const { t } = useTheme();
  return (
    <View style={{ alignItems: "center", paddingVertical: 36, paddingHorizontal: 20 }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: t.primary + "22",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Ionicons name={icon} size={32} color={t.primary} />
      </View>
      <Txt v="heading" style={{ textAlign: "center" }}>
        {titulo}
      </Txt>
      <Txt v="caption" color={t.textMuted} style={{ textAlign: "center", marginTop: 4, marginBottom: acao ? 16 : 0 }}>
        {texto}
      </Txt>
      {acao}
    </View>
  );
}
