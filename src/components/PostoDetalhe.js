import React from "react";
import { View, Modal, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Button, Card, Stars, sombra, TOP } from "./ui";
import { AVALIACOES_POSTO, formatDist, statusPosto } from "../data";

function InfoBox({ icon, label, value }) {
  const { t } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: t.surface, borderRadius: 18, padding: 12, alignItems: "center", marginHorizontal: 4 }}>
      <Ionicons name={icon} size={20} color={t.primary} />
      <Txt v="label" color={t.textMuted} style={{ marginTop: 4 }}>
        {label}
      </Txt>
      <Txt v="bodyBold" numberOfLines={1} style={{ marginTop: 2 }}>
        {value || "—"}
      </Txt>
    </View>
  );
}

function BotaoCircular({ icon, onPress, label, cor }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={label}
      activeOpacity={0.85}
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: t.surface,
          alignItems: "center",
          justifyContent: "center",
        },
        sombra(t),
      ]}
    >
      <Ionicons name={icon} size={22} color={cor || t.text} />
    </TouchableOpacity>
  );
}

export default function PostoDetalhe({ posto, dist, favorito, onFav, onFechar }) {
  const { t } = useTheme();
  if (!posto) return null;
  const status = statusPosto(posto);

  const iniciarRota = () => {
    const tem = Number.isFinite(Number(posto.latitude)) && Number.isFinite(Number(posto.longitude));
    const destino = tem ? `${posto.latitude},${posto.longitude}` : encodeURIComponent(posto.endereco || posto.nome || "");
    Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=" + destino);
  };

  return (
    <Modal visible animationType="slide" onRequestClose={onFechar}>
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
          <View>
            <Image source={require("../../assets/station.png")} style={{ width: "100%", height: 270 }} resizeMode="cover" />
            <View
              style={{
                position: "absolute",
                top: TOP - 8,
                left: 16,
                right: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <BotaoCircular icon="arrow-back" label="Voltar" onPress={onFechar} />
              <BotaoCircular
                icon={favorito ? "heart" : "heart-outline"}
                label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                onPress={onFav}
                cor={favorito ? t.primary : t.text}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: -30,
              backgroundColor: t.bg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingHorizontal: 20,
              paddingTop: 24,
            }}
          >
            <Txt v="title">{posto.nome}</Txt>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
              <Stars nota={posto.avaliacao} size={16} />
              <Txt v="bodyBold" style={{ marginLeft: 8 }}>
                {posto.avaliacao != null ? String(posto.avaliacao).replace(".", ",") : "Novo"}
              </Txt>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
              <Ionicons name="location-outline" size={18} color={t.accent} />
              <Txt v="caption" color={t.textMuted} style={{ flex: 1, marginLeft: 6 }}>
                {posto.endereco}
              </Txt>
              {Number.isFinite(dist) ? (
                <Txt v="label" color={t.accent} style={{ fontFamily: "Poppins_600SemiBold" }}>
                  {formatDist(dist)}
                </Txt>
              ) : null}
            </View>

            {status.texto ? (
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  backgroundColor: (status.ok ? t.success : t.textMuted) + "22",
                }}
              >
                <View
                  style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: status.ok ? t.success : t.textMuted, marginRight: 6 }}
                />
                <Txt v="label" color={status.ok ? t.success : t.textMuted} style={{ fontFamily: "Poppins_600SemiBold" }}>
                  {status.texto}
                </Txt>
              </View>
            ) : null}

            <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: -4 }}>
              <InfoBox icon="flash-outline" label="Potência" value={posto.potencia} />
              <InfoBox icon="link-outline" label="Conector" value={posto.conector} />
              <InfoBox icon="time-outline" label="Horário" value="24h" />
            </View>

            <Txt v="heading" style={{ marginTop: 26, marginBottom: 10 }}>
              Avaliações
            </Txt>
            {AVALIACOES_POSTO.map((a) => (
              <Card key={a.usuario} style={{ marginBottom: 10, padding: 14 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <Txt v="bodyBold" style={{ flex: 1 }}>
                    {a.usuario}
                  </Txt>
                  <Stars nota={a.nota} size={13} />
                </View>
                <Txt v="caption" color={t.textMuted}>
                  {a.comentario}
                </Txt>
              </Card>
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: 16,
            paddingBottom: 30,
            backgroundColor: t.bg,
            borderTopWidth: 1,
            borderTopColor: t.border,
          }}
        >
          <Button title="Iniciar rota" icon="navigate" onPress={iniciarRota} />
        </View>
      </View>
    </Modal>
  );
}
