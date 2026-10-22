import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Txt, Button, Field, TOP } from "../components/ui";

const formatarCpf = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

export default function Cadastro({ onCriar, onVoltar }) {
  const { t } = useTheme();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");

  const limpar = (set) => (v) => {
    set(v);
    setErro("");
  };

  const criar = () => {
    if (nome.trim().length < 3) return setErro("Informe seu nome completo.");
    if (cpf.replace(/\D/g, "").length !== 11) return setErro("O CPF deve ter 11 dígitos.");
    if (!/\S+@\S+\.\S+/.test(email.trim())) return setErro("Informe um e-mail válido.");
    if (senha.length < 6) return setErro("A senha deve ter pelo menos 6 caracteres.");
    if (senha !== confirmar) return setErro("As senhas não conferem.");
    onCriar({ nome: nome.trim(), email: email.trim() });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: t.bg }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View pointerEvents="none" style={{ position: "absolute", top: -100, left: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: t.primary, opacity: 0.14 }} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 24, paddingTop: TOP - 10, paddingBottom: 40 }}>
        <TouchableOpacity
          onPress={onVoltar}
          accessibilityLabel="Voltar para o login"
          style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.surface, alignItems: "center", justifyContent: "center", marginBottom: 20, borderWidth: 1, borderColor: t.border }}
        >
          <Ionicons name="arrow-back" size={22} color={t.text} />
        </TouchableOpacity>

        <Txt v="display" color={t.accent} style={{ marginBottom: 6 }}>
          Crie sua conta
        </Txt>
        <Txt v="body" color={t.textMuted} style={{ marginBottom: 24 }}>
          Informe os dados abaixo para começar.
        </Txt>

        <Field icon="person-outline" label="Nome completo" placeholder="Seu nome" value={nome} onChangeText={limpar(setNome)} autoCapitalize="words" />
        <Field icon="id-card-outline" label="CPF" placeholder="000.000.000-00" value={cpf} onChangeText={(v) => { setCpf(formatarCpf(v)); setErro(""); }} keyboardType="number-pad" />
        <Field icon="mail-outline" label="E-mail" placeholder="voce@email.com" value={email} onChangeText={limpar(setEmail)} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        <Field icon="lock-closed-outline" label="Senha" placeholder="Mínimo de 6 caracteres" secure value={senha} onChangeText={limpar(setSenha)} />
        <Field icon="lock-closed-outline" label="Confirmar senha" placeholder="Repita a senha" secure value={confirmar} onChangeText={limpar(setConfirmar)} />

        {erro ? (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <Ionicons name="alert-circle" size={18} color={t.danger} />
            <Txt v="caption" color={t.danger} style={{ marginLeft: 6, flex: 1 }}>
              {erro}
            </Txt>
          </View>
        ) : null}

        <Button title="Criar conta" icon="checkmark" onPress={criar} style={{ marginTop: 6 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
