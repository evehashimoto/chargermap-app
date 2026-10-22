import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image, useWindowDimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Button, sombra, TOP, TAB_BOTTOM, TAB_H } from "../components/ui";
import StationCard from "../components/StationCard";
import FiltroSheet from "../components/FiltroSheet";
import {
  REF, DARK_MAP_STYLE, FILTROS_PADRAO, idDe, distanciaKm, filtrarPostos, contarFiltros,
} from "../data";

export default function Home({ usuario, postos, carregando, fonte, favoritos, onFav, onAbrir }) {
  const { t, isDark, fs } = useTheme();
  const { width } = useWindowDimensions();
  const mapRef = useRef(null);
  const listRef = useRef(null);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState(FILTROS_PADRAO);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [selId, setSelId] = useState(null);

  const CARD_W = Math.min(width * 0.8, 340);
  const GAP = 12;
  const nFiltros = contarFiltros(filtros);

  const lista = useMemo(
    () =>
      filtrarPostos(postos, busca, filtros)
        .map((p) => ({ ...p, _dist: distanciaKm(p) }))
        .sort((a, b) => a._dist - b._dist),
    [postos, busca, filtros]
  );

  useEffect(() => {
    if (!lista.length) return setSelId(null);
    if (!lista.some((p) => idDe(p) === selId)) setSelId(idDe(lista[0]));
  }, [lista]);

  const focar = (p) => {
    const latitude = Number(p.latitude);
    const longitude = Number(p.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
    mapRef.current?.animateToRegion({ latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 450);
  };

  const aoTocarMarker = (p) => {
    setSelId(idDe(p));
    const i = lista.findIndex((x) => idDe(x) === idDe(p));
    if (i >= 0) listRef.current?.scrollToOffset({ offset: i * (CARD_W + GAP), animated: true });
    focar(p);
  };

  const aoRolar = (e) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP));
    const p = lista[i];
    if (p) {
      setSelId(idDe(p));
      focar(p);
    }
  };

  const aplicarFiltros = (f) => {
    setFiltros(f);
    setFiltroAberto(false);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const baseCarrossel = TAB_BOTTOM + TAB_H + 14;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{ latitude: REF.latitude, longitude: REF.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
        userInterfaceStyle={isDark ? "dark" : "light"}
        customMapStyle={isDark ? DARK_MAP_STYLE : undefined}
        showsCompass={false}
        toolbarEnabled={false}
        mapPadding={{ top: 0, right: 0, left: 0, bottom: 190 }}
      >
        {lista.map((p) => {
          const sel = idDe(p) === selId;
          return (
            <Marker key={idDe(p)} coordinate={{ latitude: Number(p.latitude), longitude: Number(p.longitude) }} onPress={() => aoTocarMarker(p)} anchor={{ x: 0.5, y: 1 }}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: sel ? 46 : 38,
                    height: sel ? 46 : 38,
                    borderRadius: 23,
                    backgroundColor: sel ? t.primary : t.secondary,
                    borderWidth: 3,
                    borderColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="flash" size={sel ? 22 : 18} color="#FFFFFF" />
                </View>
                <View
                  style={{
                    width: 0, height: 0, marginTop: -2,
                    borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8,
                    borderLeftColor: "transparent", borderRightColor: "transparent", borderTopColor: "#FFFFFF",
                  }}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Topo: saudação + busca + filtros */}
      <View style={{ position: "absolute", top: TOP - 8, left: 16, right: 16 }}>
        <View style={[{ backgroundColor: t.surface, borderRadius: 26, padding: 14 }, sombra(t, 1.5)]}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <Image
              source={isDark ? require("../../assets/icon-negative.png") : require("../../assets/icon-positive.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              accessibilityLabel="ChargerMap"
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Txt v="heading" numberOfLines={1}>
                Olá, {usuario?.nome || "Motorista"}!
              </Txt>
              <Txt v="caption" color={t.textMuted}>
                Encontre postos perto de você.
              </Txt>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: t.surfaceAlt,
                borderRadius: 16,
                paddingHorizontal: 12,
                minHeight: 50,
                borderWidth: 1,
                borderColor: t.border,
              }}
            >
              <Ionicons name="search-outline" size={20} color={t.textMuted} />
              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar posto ou endereço"
                placeholderTextColor={t.textMuted}
                accessibilityLabel="Buscar posto"
                returnKeyType="search"
                style={{ flex: 1, marginLeft: 8, color: t.text, fontFamily: "Poppins_400Regular", fontSize: fs(14), paddingVertical: 10 }}
              />
              {busca ? (
                <TouchableOpacity onPress={() => setBusca("")} accessibilityLabel="Limpar busca" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name="close-circle" size={20} color={t.textMuted} />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => setFiltroAberto(true)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={nFiltros ? `Filtros, ${nFiltros} ativos` : "Filtros"}
              style={{
                width: 50,
                height: 50,
                borderRadius: 16,
                marginLeft: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: nFiltros ? t.primary : t.secondary,
              }}
            >
              <Ionicons name="options-outline" size={24} color={nFiltros ? t.onPrimary : "#FFFFFF"} />
              {nFiltros ? (
                <View style={{ position: "absolute", top: -6, right: -6, minWidth: 20, height: 20, borderRadius: 10, backgroundColor: t.text, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }}>
                  <Txt v="label" color={t.bg} style={{ fontSize: 11, fontFamily: "Poppins_700Bold" }}>
                    {nFiltros}
                  </Txt>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        {fonte === "demo" ? (
          <View style={{ alignSelf: "center", flexDirection: "row", alignItems: "center", marginTop: 8, backgroundColor: t.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 }}>
            <Ionicons name="cloud-offline-outline" size={14} color={t.textMuted} style={{ marginRight: 6 }} />
            <Txt v="label" color={t.textMuted}>
              Sem conexão com o servidor: dados de demonstração
            </Txt>
          </View>
        ) : null}
      </View>

      {/* Base: postos mais próximos */}
      <View style={{ position: "absolute", left: 0, right: 0, bottom: baseCarrossel }}>
        {carregando ? (
          <View style={[{ marginHorizontal: 16, backgroundColor: t.surface, borderRadius: 22, padding: 20, flexDirection: "row", alignItems: "center" }, sombra(t)]}>
            <ActivityIndicator color={t.primary} />
            <Txt v="body" color={t.textMuted} style={{ marginLeft: 12 }}>
              Buscando postos próximos...
            </Txt>
          </View>
        ) : lista.length === 0 ? (
          <View style={[{ marginHorizontal: 16, backgroundColor: t.surface, borderRadius: 22, padding: 18 }, sombra(t)]}>
            <Txt v="heading">Nenhum posto encontrado</Txt>
            <Txt v="caption" color={t.textMuted} style={{ marginTop: 2, marginBottom: 12 }}>
              Tente outra busca ou ajuste os filtros.
            </Txt>
            <Button
              title="Limpar busca e filtros"
              variant="outline"
              onPress={() => {
                setBusca("");
                setFiltros(FILTROS_PADRAO);
              }}
            />
          </View>
        ) : (
          <>
            <Txt v="label" color={t.text} style={{ marginLeft: 22, marginBottom: 8, fontFamily: "Poppins_600SemiBold", textShadowColor: isDark ? "transparent" : "#FFFFFF", textShadowRadius: 6 }}>
              {lista.length === 1 ? "1 posto próximo" : `${lista.length} postos mais próximos`}
            </Txt>
            <FlatList
              ref={listRef}
              data={lista}
              horizontal
              keyExtractor={(p) => String(idDe(p))}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_W + GAP}
              decelerationRate="fast"
              onMomentumScrollEnd={aoRolar}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12 }}
              ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
              renderItem={({ item }) => (
                <StationCard
                  style={{ width: CARD_W }}
                  posto={item}
                  dist={item._dist}
                  selecionado={idDe(item) === selId}
                  favorito={favoritos.includes(idDe(item))}
                  onFav={() => onFav(idDe(item))}
                  onPress={() => onAbrir(item)}
                />
              )}
            />
          </>
        )}
      </View>

      <FiltroSheet visible={filtroAberto} filtros={filtros} onAplicar={aplicarFiltros} onFechar={() => setFiltroAberto(false)} />
    </View>
  );
}
