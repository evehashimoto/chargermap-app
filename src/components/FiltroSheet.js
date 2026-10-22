import React, { useEffect, useState } from "react";
import { View, Modal, Pressable, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Chip, Button } from "./ui";
import { CONECTORES, POTENCIAS, FILTROS_PADRAO } from "../data";

export default function FiltroSheet({ visible, filtros, onAplicar, onFechar }) {
  const { t } = useTheme();
  const [rascunho, setRascunho] = useState(filtros);

  useEffect(() => {
    if (visible) setRascunho(filtros);
  }, [visible]);

  const alternarConector = (id) =>
    setRascunho((r) => ({
      ...r,
      conectores: r.conectores.includes(id) ? r.conectores.filter((c) => c !== id) : [...r.conectores, id],
    }));

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onFechar}>
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}
        onPress={onFechar}
        accessibilityLabel="Fechar filtros"
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: t.surface,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 22,
            paddingBottom: 36,
          }}
        >
          <View
            style={{ alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: t.border, marginBottom: 16 }}
          />
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Txt v="title" style={{ flex: 1 }}>
              Filtros
            </Txt>
            <TouchableOpacity
              onPress={onFechar}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Fechar"
            >
              <Ionicons name="close" size={26} color={t.textMuted} />
            </TouchableOpacity>
          </View>

          <Txt v="heading" color={t.accent}>
            Tipo de conector
          </Txt>
          <Txt v="caption" color={t.textMuted} style={{ marginBottom: 10 }}>
            Nenhum selecionado mostra todos.
          </Txt>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {CONECTORES.map((c) => (
              <Chip
                key={c.id}
                label={c.label}
                active={rascunho.conectores.includes(c.id)}
                onPress={() => alternarConector(c.id)}
              />
            ))}
          </View>

          <Txt v="heading" color={t.accent} style={{ marginTop: 14, marginBottom: 10 }}>
            Potência mínima
          </Txt>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {POTENCIAS.map((p) => (
              <Chip
                key={p.valor}
                label={p.label}
                active={rascunho.potenciaMin === p.valor}
                onPress={() => setRascunho((r) => ({ ...r, potenciaMin: p.valor }))}
              />
            ))}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 22 }}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Txt v="heading" color={t.accent}>
                Somente disponíveis
              </Txt>
              <Txt v="caption" color={t.textMuted}>
                Esconde postos ocupados.
              </Txt>
            </View>
            <Switch
              value={rascunho.soDisponiveis}
              onValueChange={(v) => setRascunho((r) => ({ ...r, soDisponiveis: v }))}
              trackColor={{ false: t.border, true: t.primary }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Somente postos disponíveis"
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Button
              title="Limpar"
              variant="outline"
              style={{ flex: 1, marginRight: 10 }}
              onPress={() => setRascunho(FILTROS_PADRAO)}
            />
            <Button title="Aplicar filtros" style={{ flex: 2 }} onPress={() => onAplicar(rascunho)} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
