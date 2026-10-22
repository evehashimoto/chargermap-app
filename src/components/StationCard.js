import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Tag, sombra } from "./ui";
import { formatDist, statusPosto } from "../data";

export default function StationCard({ posto, dist, favorito, onPress, onFav, selecionado, style }) {
  const { t } = useTheme();
  const status = statusPosto(posto);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${posto.nome}, a ${formatDist(dist)}. Abrir detalhes`}
      style={[
        {
          backgroundColor: t.surface,
          borderRadius: 22,
          padding: 14,
          borderWidth: 2,
          borderColor: selecionado ? t.primary : "transparent",
        },
        sombra(t),
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: t.primary + "22",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="flash" size={22} color={t.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Txt v="heading" numberOfLines={1}>
            {posto.nome}
          </Txt>
          <Txt v="caption" color={t.textMuted} numberOfLines={1}>
            {posto.endereco}
          </Txt>
        </View>
        {onFav ? (
          <TouchableOpacity
            onPress={onFav}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Ionicons
              name={favorito ? "heart" : "heart-outline"}
              size={24}
              color={favorito ? t.primary : t.textMuted}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
        <Tag icon="flash-outline" text={posto.potencia} />
        <Tag icon="link-outline" text={posto.conector} />
        <View style={{ flex: 1 }} />
        {Number.isFinite(dist) ? (
          <Txt v="label" color={t.accent} style={{ fontFamily: "Poppins_600SemiBold" }}>
            {formatDist(dist)}
          </Txt>
        ) : null}
      </View>

      {status.texto ? (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: status.ok ? t.success : t.textMuted,
              marginRight: 6,
            }}
          />
          <Txt v="label" color={status.ok ? t.success : t.textMuted}>
            {status.texto}
          </Txt>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
