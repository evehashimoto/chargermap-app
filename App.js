import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { ThemeProvider, useTheme } from "./src/theme";
import { API_URL, POSTOS_DEMO, idDe, distanciaKm } from "./src/data";
import TabBar from "./src/components/TabBar";
import PostoDetalhe from "./src/components/PostoDetalhe";
import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro";
import Home from "./src/screens/Home";
import Perfil from "./src/screens/Perfil";
import Ajustes from "./src/screens/Ajustes";

function Root() {
  const { t, isDark } = useTheme();

  const [usuario, setUsuario] = useState(null);
  const [telaAuth, setTelaAuth] = useState("login"); // login | cadastro
  const [aba, setAba] = useState("home");

  const [postos, setPostos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [fonte, setFonte] = useState("api"); // api | demo
  const [favoritos, setFavoritos] = useState([]);
  const favoritosIniciados = useRef(false);
  const [postoAberto, setPostoAberto] = useState(null);

  // Busca os postos (com tempo limite e plano B de demonstração)
  useEffect(() => {
    let vivo = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);

    fetch(API_URL, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data) => {
        if (!vivo) return;
        if (Array.isArray(data) && data.length) {
          setPostos(data);
          setFonte("api");
        } else {
          setPostos(POSTOS_DEMO);
          setFonte("demo");
        }
      })
      .catch(() => {
        if (!vivo) return;
        setPostos(POSTOS_DEMO);
        setFonte("demo");
      })
      .finally(() => {
        clearTimeout(timer);
        if (vivo) setCarregando(false);
      });

    return () => {
      vivo = false;
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  // Começa com 2 favoritos para a tela não abrir vazia na demonstração
  useEffect(() => {
    if (favoritosIniciados.current || !postos.length) return;
    favoritosIniciados.current = true;
    setFavoritos(postos.slice(0, 2).map(idDe));
  }, [postos]);

  const alternarFav = useCallback(
    (id) => setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    []
  );

  const sair = () => {
    setPostoAberto(null);
    setUsuario(null);
    setTelaAuth("login");
    setAba("home");
  };

  const statusBar = <StatusBar style={isDark ? "light" : "dark"} />;

  if (!usuario) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        {statusBar}
        {telaAuth === "login" ? (
          <Login onEntrar={setUsuario} onIrCadastro={() => setTelaAuth("cadastro")} />
        ) : (
          <Cadastro onCriar={setUsuario} onVoltar={() => setTelaAuth("login")} />
        )}
      </View>
    );
  }

  // Todas as abas ficam montadas para preservar mapa, busca e rolagem
  const visivel = (k) => ({ flex: 1, display: aba === k ? "flex" : "none" });

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {statusBar}

      <View style={visivel("home")}>
        <Home
          usuario={usuario}
          postos={postos}
          carregando={carregando}
          fonte={fonte}
          favoritos={favoritos}
          onFav={alternarFav}
          onAbrir={setPostoAberto}
        />
      </View>
      <View style={visivel("perfil")}>
        <Perfil
          usuario={usuario}
          postos={postos}
          favoritos={favoritos}
          onFav={alternarFav}
          onAbrir={setPostoAberto}
          onIrHome={() => setAba("home")}
        />
      </View>
      <View style={visivel("ajustes")}>
        <Ajustes onSair={sair} />
      </View>

      <TabBar aba={aba} onChange={setAba} />

      {postoAberto ? (
        <PostoDetalhe
          posto={postoAberto}
          dist={distanciaKm(postoAberto)}
          favorito={favoritos.includes(idDe(postoAberto))}
          onFav={() => alternarFav(idDe(postoAberto))}
          onFechar={() => setPostoAberto(null)}
        />
      ) : null}
    </View>
  );
}

export default function App() {
  const [fontesProntas] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontesProntas) return <View style={{ flex: 1, backgroundColor: "#ECECEC" }} />;

  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
