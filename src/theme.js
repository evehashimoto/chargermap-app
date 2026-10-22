import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

// AsyncStorage é opcional: sem ele tudo funciona, só não salva as preferências.
let storage = null;
try {
  storage = require("@react-native-async-storage/async-storage").default;
} catch (e) {
  storage = null;
}

const CHAVE = "@chargermap/ajustes";

// ---------- Design system ----------
const claro = {
  mode: "light",
  bg: "#ECECEC",
  surface: "#FFFFFF",
  surfaceAlt: "#F4F4F9",
  text: "#1C1C1C",
  textMuted: "#5F6070",
  primary: "#B947FA",
  onPrimary: "#FFFFFF",
  secondary: "#555799",
  accent: "#555799", // versão do secundário segura para texto
  border: "#DCDCE8",
  danger: "#D6334A",
  success: "#1E9E62",
  shadow: "#555799",
};

const escuro = {
  mode: "dark",
  bg: "#1C1C1C",
  surface: "#27272C",
  surfaceAlt: "#313139",
  text: "#F4F4F8",
  textMuted: "#A6A7B8",
  primary: "#B947FA",
  onPrimary: "#FFFFFF",
  secondary: "#555799",
  accent: "#A9ABF0", // #555799 sozinho tem pouco contraste sobre #1C1C1C
  border: "#3B3B47",
  danger: "#FF6B7F",
  success: "#4CD08C",
  shadow: "#000000",
};

const altoContrasteClaro = {
  primary: "#7A12C0",
  accent: "#2E3070",
  text: "#000000",
  textMuted: "#33343F",
  border: "#1C1C1C",
  bg: "#F4F4F4",
  surfaceAlt: "#E8E8F0",
};

const altoContrasteEscuro = {
  primary: "#D08AFF",
  onPrimary: "#000000",
  accent: "#C9CBFF",
  text: "#FFFFFF",
  textMuted: "#D4D4E0",
  border: "#9A9AAE",
  surfaceAlt: "#3A3A44",
};

const ESCALAS = { p: 0.9, m: 1, g: 1.15, gg: 1.3 };
export const OPCOES_ESCALA = [
  { key: "p", label: "Pequeno" },
  { key: "m", label: "Padrão" },
  { key: "g", label: "Grande" },
  { key: "gg", label: "Extra" },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const sistema = useColorScheme();
  const [modo, setModo] = useState("claro"); // claro | escuro | sistema
  const [escala, setEscala] = useState("m");
  const [altoContraste, setAltoContraste] = useState(false);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!storage) {
      setCarregado(true);
      return;
    }
    storage
      .getItem(CHAVE)
      .then((raw) => {
        if (!raw) return;
        try {
          const s = JSON.parse(raw);
          if (["claro", "escuro", "sistema"].includes(s.modo)) setModo(s.modo);
          if (ESCALAS[s.escala]) setEscala(s.escala);
          if (typeof s.altoContraste === "boolean") setAltoContraste(s.altoContraste);
        } catch (e) {}
      })
      .catch(() => {})
      .finally(() => setCarregado(true));
  }, []);

  useEffect(() => {
    if (!carregado || !storage) return;
    storage.setItem(CHAVE, JSON.stringify({ modo, escala, altoContraste })).catch(() => {});
  }, [carregado, modo, escala, altoContraste]);

  const isDark = modo === "escuro" || (modo === "sistema" && sistema === "dark");

  const t = useMemo(() => {
    const base = isDark ? escuro : claro;
    if (!altoContraste) return base;
    return { ...base, ...(isDark ? altoContrasteEscuro : altoContrasteClaro) };
  }, [isDark, altoContraste]);

  const fs = useCallback((n) => Math.round(n * ESCALAS[escala]), [escala]);

  const value = useMemo(
    () => ({ t, isDark, modo, setModo, escala, setEscala, altoContraste, setAltoContraste, fs }),
    [t, isDark, modo, escala, altoContraste, fs]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
