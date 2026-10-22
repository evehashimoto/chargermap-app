import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Button, Card, Avatar, Segmented, Stars, EmptyState, sombra, TOP, TAB_SPACE } from "../components/ui";
import StationCard from "../components/StationCard";
import { HISTORICO, MINHAS_AVALIACOES, idDe, distanciaKm } from "../data";

function Stat({ valor, rotulo, icone }) {
  const { t } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Ionicons name={icone} size={18} color={t.primary} />
      <Txt v="title" style={{ marginTop: 2 }}>
        {valor}
      </Txt>
      <Txt v="label" color={t.textMuted}>
        {rotulo}
      </Txt>
    </View>
  );
}

export default function Perfil({ usuario, postos, favoritos, onFav, onAbrir, onIrHome }) {
  const { t } = useTheme();
  const [secao, setSecao] = useState("favoritos");
  const favs = postos.filter((p) => favoritos.includes(idDe(p)));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingBottom: TAB_SPACE + 10 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: t.secondary,
          paddingTop: TOP,
          paddingBottom: 56,
          alignItems: "center",
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
        }}
      >
        <Avatar nome={usuario?.nome} />
        <Txt v="title" color="#FFFFFF" style={{ marginTop: 12 }}>
          {usuario?.nome}
        </Txt>
        <Txt v="caption" color="#E4E4F7">
          {usuario?.email}
        </Txt>
      </View>

      <Card style={{ marginTop: -34, marginHorizontal: 20, flexDirection: "row", paddingVertical: 16 }}>
        <Stat valor={favs.length} rotulo="Favoritos" icone="heart" />
        <View style={{ width: 1, backgroundColor: t.border }} />
        <Stat valor={HISTORICO.length} rotulo="Recargas" icone="flash" />
        <View style={{ width: 1, backgroundColor: t.border }} />
        <Stat valor={MINHAS_AVALIACOES.length} rotulo="Avaliações" icone="star" />
      </Card>

      <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
        <Segmented
          value={secao}
          onChange={setSecao}
          options={[
            { key: "favoritos", label: "Favoritos", icon: "heart-outline" },
            { key: "historico", label: "Histórico", icon: "time-outline" },
            { key: "avaliacoes", label: "Avaliações", icon: "star-outline" },
          ]}
        />

        <View style={{ marginTop: 16 }}>
          {secao === "favoritos" &&
            (favs.length === 0 ? (
              <EmptyState
                icon="heart-outline"
                titulo="Nenhum favorito ainda"
                texto="Toque no coração de um posto para encontrá-lo rápido aqui."
                acao={<Button title="Explorar mapa" icon="map-outline" onPress={onIrHome} />}
              />
            ) : (
              favs.map((p) => (
                <StationCard
                  key={idDe(p)}
                  style={{ marginBottom: 12 }}
                  posto={p}
                  dist={distanciaKm(p)}
                  favorito
                  onFav={() => onFav(idDe(p))}
                  onPress={() => onAbrir(p)}
                />
              ))
            ))}

          {secao === "historico" &&
            HISTORICO.map((h) => (
              <Card key={h.id} style={{ marginBottom: 12, flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: t.primary + "22", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Ionicons name="flash" size={22} color={t.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Txt v="heading" numberOfLines={1}>
                    {h.local}
                  </Txt>
                  <Txt v="caption" color={t.textMuted}>
                    Recarga em {h.data}
                  </Txt>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Txt v="bodyBold">{h.valor}</Txt>
                  <Txt v="label" color={t.textMuted}>
                    {h.kwh}
                  </Txt>
                </View>
              </Card>
            ))}

          {secao === "avaliacoes" &&
            MINHAS_AVALIACOES.map((a) => (
              <Card key={a.id} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                  <Txt v="heading" style={{ flex: 1 }} numberOfLines={1}>
                    {a.local}
                  </Txt>
                  <Stars nota={a.nota} />
                </View>
                <Txt v="caption" color={t.textMuted}>
                  {a.comentario}
                </Txt>
              </Card>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
