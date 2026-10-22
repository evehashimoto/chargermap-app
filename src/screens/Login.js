import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Button, Field, TOP } from "../components/ui";

export default function Login({ onEntrar, onIrCadastro }) {
  const { t, isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = () => {
    if (!/\S+@\S+\.\S+/.test(email.trim())) return setErro("Informe um e-mail válido.");
    if (!senha) return setErro("Informe sua senha.");
    setErro("");
    onEntrar({ nome: "Motorista Flui", email: email.trim() });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: t.bg }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View pointerEvents="none" style={{ position: "absolute", top: -90, right: -70, width: 260, height: 260, borderRadius: 130, backgroundColor: t.primary, opacity: 0.16 }} />
      <View pointerEvents="none" style={{ position: "absolute", bottom: -120, left: -90, width: 300, height: 300, borderRadius: 150, backgroundColor: t.secondary, opacity: 0.2 }} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 24, paddingTop: TOP, paddingBottom: 15 }}
      >
        <View
          style={{
            alignSelf: "center",
            marginBottom: 28,
            paddingHorizontal: isDark ? 18 : 0,
            paddingVertical: isDark ? 10 : 0,
          }}
        >
          <Image
            source={isDark ? require("../../assets/logo-negative.png") : require("../../assets/logo-positive.png")}
            style={{ width: 200, height: 54, alignSelf: "center", marginBottom: 30 }}
            resizeMode="contain"
            accessibilityLabel="ChargerMap by FLUI"
          />
        </View>

        <Txt v="display" color={t.accent} style={{ marginBottom: 28 }}>
          Encontre o melhor posto de carregamento em poucos clicks!
        </Txt>

        <Field icon="mail-outline" label="E-mail" placeholder="voce@email.com" value={email} onChangeText={(v) => { setEmail(v); setErro(""); }} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        <Field icon="lock-closed-outline" label="Senha" placeholder="Senha" secure value={senha} onChangeText={(v) => { setSenha(v); setErro(""); }} />

        {erro ? (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="alert-circle" size={18} color={t.danger} />
            <Txt v="caption" color={t.danger} style={{ marginLeft: 6 }}>
              {erro}
            </Txt>
          </View>
        ) : null}

        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginBottom: 20, padding: 4 }}
          onPress={() => Alert.alert("Recuperar senha", "Em breve você poderá redefinir sua senha por e-mail.")}
          accessibilityRole="button"
        >
          <Txt v="caption" color={t.accent} style={{ fontFamily: "Poppins_600SemiBold" }}>
            Esqueci minha senha
          </Txt>
        </TouchableOpacity>

        <Button title="Entrar" onPress={entrar} />

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24 }}>
          <Txt v="caption" color={t.textMuted}>
            Novo por aqui?{" "}
          </Txt>
          <TouchableOpacity onPress={onIrCadastro} accessibilityRole="button" style={{ padding: 4 }}>
            <Txt v="caption" color={t.primary} style={{ fontFamily: "Poppins_700Bold" }}>
              Criar conta
            </Txt>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
