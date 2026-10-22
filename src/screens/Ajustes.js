import React from "react";
import { View, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, OPCOES_ESCALA } from "../theme";
import { Txt, Button, Card, Chip, Segmented, TOP, TAB_SPACE } from "../components/ui";

function Secao({ titulo, icone, children }) {
  const { t } = useTheme();
  return (
    <View style={{ marginBottom: 22 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginLeft: 4 }}>
        <Ionicons name={icone} size={16} color={t.accent} />
        <Txt v="label" color={t.accent} style={{ marginLeft: 6, letterSpacing: 0.8, textTransform: "uppercase", fontFamily: "Poppins_600SemiBold" }}>
          {titulo}
        </Txt>
      </View>
      <Card>{children}</Card>
    </View>
  );
}

export default function Ajustes({ onSair }) {
  const { t, modo, setModo, escala, setEscala, altoContraste, setAltoContraste, fs } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: TOP, paddingBottom: TAB_SPACE + 10 }} showsVerticalScrollIndicator={false}>
      <Txt v="display" style={{ marginBottom: 4 }}>
        Ajustes
      </Txt>
      <Txt v="body" color={t.textMuted} style={{ marginBottom: 24 }}>
        Deixe o ChargerMap do seu jeito.
      </Txt>

      <Secao titulo="Aparência" icone="color-palette-outline">
        <Txt v="bodyBold">Tema</Txt>
        <Txt v="caption" color={t.textMuted} style={{ marginBottom: 12 }}>
          No automático, o app segue o tema do seu celular.
        </Txt>
        <Segmented
          value={modo}
          onChange={setModo}
          options={[
            { key: "claro", label: "Claro", icon: "sunny-outline" },
            { key: "escuro", label: "Escuro", icon: "moon-outline" },
            { key: "sistema", label: "Automático", icon: "phone-portrait-outline" },
          ]}
        />
      </Secao>

      <Secao titulo="Acessibilidade" icone="accessibility-outline">
        <Txt v="bodyBold">Tamanho do texto</Txt>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {OPCOES_ESCALA.map((o) => (
            <Chip key={o.key} label={o.label} active={escala === o.key} onPress={() => setEscala(o.key)} />
          ))}
        </View>
        <View style={{ backgroundColor: t.surfaceAlt, borderRadius: 14, padding: 12, marginTop: 4 }}>
          <Txt v="label" color={t.textMuted}>
            Prévia
          </Txt>
          <Txt v="heading">EcoCharge Shopping</Txt>
          <Txt v="caption" color={t.textMuted}>
            150 kW · CCS · a 850 m
          </Txt>
        </View>

        <View style={{ height: 1, backgroundColor: t.border, marginVertical: 16 }} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Txt v="bodyBold">Alto contraste</Txt>
            <Txt v="caption" color={t.textMuted}>
              Cores mais fortes e bordas marcadas para facilitar a leitura.
            </Txt>
          </View>
          <Switch
            value={altoContraste}
            onValueChange={setAltoContraste}
            trackColor={{ false: t.border, true: t.primary }}
            thumbColor="#FFFFFF"
            accessibilityLabel="Alto contraste"
          />
        </View>
      </Secao>

      <Secao titulo="Sobre" icone="information-circle-outline">
        <Txt v="bodyBold">ChargerMap by FLUI</Txt>
        <Txt v="caption" color={t.textMuted}>
          Versão 1.0.0 · Projeto FIAP, Charge Platform Challenge
        </Txt>
      </Secao>

      <Secao titulo="Conta" icone="person-circle-outline">
        <Button title="Sair da conta" icon="log-out-outline" variant="danger" onPress={onSair} />
      </Secao>
    </ScrollView>
  );
}
