import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";

import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

export default function App() {

  const [selectedStation, setSelectedStation] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [postos, setPostos] = useState([]);
  const [postoSelecionado, setPostoSelecionado] = useState(null);
  const [screen, setScreen] = useState("login");
  const [nome, setNome] = useState("");   
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "Evelin"
  });
  const [favoritos] = useState([
  {
    nome: "EcoCharge Shopping",
    endereco: "Av. Paulista, 1200"
  },
  {
    nome: "Eletro Station",
    endereco: "Rua Augusta, 500"
  }
]);

const [historico] = useState([
  {
    local: "EcoCharge Shopping",
    data: "05/06/2026"
  },
  {
    local: "Power Station",
    data: "02/06/2026"
  }
]);

const [avaliacoes] = useState([
  {
    usuario: "Carlos",
    nota: 5,
    comentario: "Posto excelente e rápido."
  },
  {
    usuario: "Marina",
    nota: 4,
    comentario: "Funcionou perfeitamente."
  }
]);

  useEffect(() => {
  fetch("https://chargermap-backend.onrender.com/postos")
    .then((response) => response.json())
    .then((data) => {
      console.log("POSTOS:", data);

      setPostos(data);

      if (data.length > 0) {
        setPostoSelecionado(data[0]);
      }
    })
    .catch((error) => {
      console.log("ERRO API:", error);
    });
}, []);

if (screen === "login") {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFF",
        padding: 30,
        justifyContent: "center"
      }}
    >

      <Image
        source={require("./assets/logo 2.png")}
        style={{
          width: 180,
          height: 100,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 50
        }}
      />

      <Text
  style={{
    fontSize: 30,
    fontWeight: "bold",
    color: "#555799",
    marginBottom: 40,
    textAlign: "left"
  }}
>
  Encontre o melhor posto de carregamento em poucos clicks!
</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#555799",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{
          borderWidth: 1,
          borderColor: "#555799",
          borderRadius: 12,
          padding: 15,
          marginBottom: 30
        }}
      />

      <Text
  style={{
    textAlign: "right",
    color: "#555799",
    marginBottom: 20
  }}
>
  Esqueci minha senha
</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#B947FA",
          padding: 18,
          borderRadius: 12
        }}
        onPress={() => {

  if (!email || !senha) {

    Alert.alert(
      "Atenção",
      "Preencha e-mail e senha."
    );

    return;
  }

  setUsuarioLogado({
    nome: "Motorista Flui",
    email
  });

  setScreen("home");

}}

      >
        <Text
  style={{
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  }}
>
  Entrar →
</Text>
      </TouchableOpacity>

    </View>
  );
}

if (screen === "cadastro") {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFF",
        padding: 30,
        justifyContent: "center"
      }}
    >

      <Image
        source={require("./assets/logo 2.png")}
        style={{
          width: 180,
          height: 100,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 50
        }}
      />

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#555799",
          marginBottom: 40
        }}
      >
        Informe os dados abaixo para criar sua conta.
      </Text>

      <TextInput
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          borderColor: "#555799",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15
        }}
      />

      <TextInput
  placeholder="CPF"
  style={{
    borderWidth: 1,
    borderColor: "#555799",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  }}
/>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#555799",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{
          borderWidth: 1,
          borderColor: "#555799",
          borderRadius: 12,
          padding: 15,
          marginBottom: 30
        }}
      />

      <TextInput
  placeholder="Confirmar senha"
  secureTextEntry
  style={{
    borderWidth: 1,
    borderColor: "#555799",
    borderRadius: 12,
    padding: 15,
    marginBottom: 30
  }}
/>

      <TouchableOpacity
        style={{
          backgroundColor: "#B947FA",
          padding: 18,
          borderRadius: 12
        }}
      
        onPress={() => {
}}

      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Criar conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

  // TELA DE FILTROS
  if (showFilters) {
    return (
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>

          <Image
            source={require("./assets/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.greeting}>
  Olá, {usuarioLogado?.nome || "Usuário"}!
</Text>

          <Text style={styles.subtitle}>
            Encontre postos perto de você.
          </Text>

        </View>

        {/* BUSCA */}
        <View style={styles.searchContainer}>

          <TextInput
            placeholder="Buscar posto..."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.filterText}>
              ✕
            </Text>
          </TouchableOpacity>

        </View>

        {/* MAPA */}
        <MapView
  style={styles.map}
  initialRegion={{
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }}
>

  {postos.map((posto) => (
    <Marker
      key={posto._id}
      coordinate={{
        latitude: posto.latitude,
        longitude: posto.longitude,
      }}
      title={posto.nome}
      description={posto.endereco}
      onPress={() => {
        setPostoSelecionado(posto);
        setSelectedStation(true);
      }}
    />
  ))}

</MapView>

        {/* CARD FILTROS */}
        <View style={styles.filterCard}>

          <Text style={styles.filterTitle}>
            Tipo de Conector
          </Text>

          <Text style={styles.checkbox}>
            ☑ CCS
          </Text>

          <Text style={styles.checkbox}>
            ☑ CHAdeMO
          </Text>

          <Text style={styles.checkbox}>
            ☑ Tipo 2
          </Text>

          <Text style={styles.filterTitle2}>
            Potência Mínima
          </Text>

          <View style={styles.fakeSlider}>
            <View style={styles.sliderDot} />
          </View>

          <View style={styles.sliderLabels}>
            <Text>50kW</Text>
            <Text>100kW</Text>
            <Text>+150kW</Text>
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyText}>
              Aplicar filtros
            </Text>
          </TouchableOpacity>

        </View>

        {/* NAVBAR */}
        <View style={styles.navbar}>

          <TouchableOpacity>
            <Text style={styles.activeNav}>
              Mapa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
  onPress={() => setScreen("favoritos")}
>
  <Text style={styles.navText}>
    Favoritos
  </Text>
</TouchableOpacity>

          <TouchableOpacity
  onPress={() => setScreen("historico")}
>
  <Text style={styles.navText}>
    Histórico
  </Text>
</TouchableOpacity>

          <TouchableOpacity
  onPress={() => alert(
    `Usuário: ${usuarioLogado?.nome}\nEmail: ${email}`
  )}
>
  <Text style={styles.navText}>
    Perfil
  </Text>
</TouchableOpacity>

        </View>

      </View>
    );
  }

  // TELA DO POSTO
  if (selectedStation) {
    return (
      <View style={styles.container}>

        <Image
          source={require("./assets/station.png")}
          style={styles.image}
        />

        {/* VOLTAR */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedStation(false)}
        >
          <Text style={styles.backText}>
            ←
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>

          <Text style={styles.title}>
            {postoSelecionado?.nome}
          </Text>

          <Text style={styles.rating}>
            ⭐⭐⭐⭐ {postoSelecionado?.avaliacao}
          </Text>

          <View style={styles.addressRow}>
            <Text style={styles.address}>
              {postoSelecionado?.endereco}
            </Text>

            <Text style={styles.distance}>
              0,9 km
            </Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {postoSelecionado?.disponibilidade}
            </Text>
          </View>

          <View style={styles.infoContainer}>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>
                Potência
              </Text>

              <Text style={styles.infoValue}>
                {postoSelecionado?.potencia}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>
                Tipo
              </Text>

              <Text style={styles.infoValue}>
                {postoSelecionado?.conector}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>
                Funcionamento
              </Text>

              <Text style={styles.infoValue}>
                24h
              </Text>
            </View>

          </View>

          <Text style={{
  fontSize: 20,
  fontWeight: "bold",
  marginTop: 25,
  color: "#555799"
}}>
  Avaliações
</Text>

<View style={{
  marginTop: 15,
  backgroundColor: "#F5F5F5",
  padding: 15,
  borderRadius: 12
}}>
  <Text>⭐⭐⭐⭐⭐ Excelente localização.</Text>
</View>

<View style={{
  marginTop: 10,
  backgroundColor: "#F5F5F5",
  padding: 15,
  borderRadius: 12
}}>
  <Text>⭐⭐⭐⭐ Carregador rápido.</Text>
</View>

          <TouchableOpacity
  style={styles.routeButton}
  onPress={() =>
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(postoSelecionado?.endereco || "")
    )
  }
>
            <Text style={styles.routeText}>
              Iniciar rota
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  if (screen === "perfil") {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 80,
        paddingHorizontal: 25
      }}
    >

      <View
        style={{
          alignItems: "center"
        }}
      >

        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#B947FA",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 42,
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            E
          </Text>
        </View>

        <Text
          style={{
            marginTop: 20,
            fontSize: 28,
            fontWeight: "bold",
            color: "#555799"
          }}
        >
          {usuarioLogado?.nome || "Motorista Flui"}
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: "#777"
          }}
        >
          {usuarioLogado?.email}
        </Text>

      </View>

      <View
        style={{
          marginTop: 40
        }}
      >

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            elevation: 3
          }}
        >
          <Text
            style={{
              color: "#777"
            }}
          >
            Postos Favoritos
          </Text>

          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#555799"
            }}
          >
            8
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            elevation: 3
          }}
        >
          <Text
            style={{
              color: "#777"
            }}
          >
            Recargas Realizadas
          </Text>

          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#555799"
            }}
          >
            24
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            elevation: 3
          }}
        >
          <Text
            style={{
              color: "#777"
            }}
          >
            Avaliações Feitas
          </Text>

          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#555799"
            }}
          >
            12
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={{
          marginTop: "auto",
          marginBottom: 20,
          backgroundColor: "#B947FA",
          height: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => setScreen("home")}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginBottom: 40,
          backgroundColor: "#dc3545",
          height: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          setScreen("login");
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          Sair
        </Text>
      </TouchableOpacity>

    </View>
  );
}

if (screen === "favoritos") {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 80,
        paddingHorizontal: 25
      }}
    >

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#555799",
          marginBottom: 30
        }}
      >
        Favoritos
      </Text>

      {favoritos.map((posto, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            elevation: 3
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#555799"
            }}
          >
            ⭐ {posto.nome}
          </Text>

          <Text
            style={{
              color: "#666",
              marginTop: 5
            }}
          >
            {posto.endereco}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={{
          marginTop: "auto",
          marginBottom: 40,
          backgroundColor: "#B947FA",
          height: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => setScreen("home")}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

if (screen === "historico") {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 80,
        paddingHorizontal: 25
      }}
    >

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#555799",
          marginBottom: 30
        }}
      >
        Histórico
      </Text>

      {historico.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            elevation: 3
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#555799"
            }}
          >
            ⚡ {item.local}
          </Text>

          <Text
            style={{
              color: "#666",
              marginTop: 5
            }}
          >
            Recarga realizada em {item.data}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={{
          marginTop: "auto",
          marginBottom: 40,
          backgroundColor: "#B947FA",
          height: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => setScreen("home")}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

if (screen === "avaliacoes") {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 80,
        paddingHorizontal: 25
      }}
    >

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#555799",
          marginBottom: 30
        }}
      >
        Avaliações
      </Text>

      {avaliacoes.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            elevation: 3
          }}
        >

          <Text
            style={{
              fontWeight: "bold",
              color: "#555799",
              fontSize: 18
            }}
          >
            {item.usuario}
          </Text>

          <Text
            style={{
              marginTop: 5,
              color: "#B947FA"
            }}
          >
            {"⭐".repeat(item.nota)}
          </Text>

          <Text
            style={{
              marginTop: 10,
              color: "#666"
            }}
          >
            {item.comentario}
          </Text>

        </View>
      ))}

      <TouchableOpacity
        style={{
          marginTop: "auto",
          marginBottom: 40,
          backgroundColor: "#B947FA",
          height: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => setScreen("home")}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

  // HOME
  if (screen === "home")
return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.greeting}>
  Olá, {usuarioLogado?.nome || "Motorista"}!
</Text>

        <Text style={styles.subtitle}>
          Encontre postos perto de você.
        </Text>

      </View>

      {/* BUSCA */}
      <View style={styles.searchContainer}>

        <TextInput
          placeholder="Buscar posto..."
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterText}>
            ⚙
          </Text>
        </TouchableOpacity>

      </View>

      {/* MAPA */}
      <MapView
  style={styles.map}
  initialRegion={{
    latitude: -23.532,
    longitude: -46.791,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
>
  {postos.map((posto) => (
    <Marker
      key={posto._id}
      coordinate={{
        latitude: posto.latitude,
        longitude: posto.longitude,
      }}
      title={posto.nome}
      description={posto.endereco}
      onPress={() => {
        setPostoSelecionado(posto);
        setSelectedStation(true);
      }}
    />
  ))}
</MapView>

      {/* NAVBAR */}
      <View style={styles.navbar}>

        <TouchableOpacity>
          <Text style={styles.activeNav}>
            Mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
  onPress={() => setScreen("favoritos")}
>
  <Text style={styles.navText}>
    Favoritos
  </Text>
</TouchableOpacity>

        <TouchableOpacity
  onPress={() => setScreen("historico")}
>
  <Text style={styles.navText}>
    Histórico
  </Text>
</TouchableOpacity>

        <TouchableOpacity
  onPress={() => setScreen("perfil")}
>
  <Text style={styles.navText}>
    Perfil
  </Text>
</TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 40,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#B947FA",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#1C1C1C",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    paddingHorizontal: 25,
  },

  input: {
    flex: 1,
    height: 58,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 3,
  },

  filterButton: {
    width: 58,
    height: 58,
    backgroundColor: "#555799",
    marginLeft: 15,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  filterText: {
    color: "#fff",
    fontSize: 25,
  },

  map: {
    width: "100%",
    height: 450,
    resizeMode: "cover",
    marginTop: 20,
  },

  navbar: {
    marginTop: 10,
    height: 90,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
  },

  activeNav: {
    color: "#B947FA",
    fontWeight: "bold",
  },

  navText: {
    color: "#555799",
  },

  image: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 30,
    color: "#555799",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#555799",
    lineHeight: 36,
  },

  rating: {
    marginTop: 15,
    color: "#B947FA",
    fontSize: 16,
  },

  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  address: {
    width: "75%",
    color: "#444",
    lineHeight: 22,
  },

  distance: {
    color: "#444",
    fontWeight: "bold",
  },

  tag: {
    marginTop: 30,
    backgroundColor: "#555799",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  tagText: {
    color: "#fff",
    fontWeight: "bold",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  infoBox: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    alignItems: "center",
  },

  infoLabel: {
    color: "#555",
  },

  infoValue: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#555799",
  },

  routeButton: {
    marginTop: "auto",
    backgroundColor: "#B947FA",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  routeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  filterCard: {
    position: "absolute",
    top: 250,
    left: 25,
    right: 25,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 30,
    elevation: 8,
  },

  filterTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555799",
    marginBottom: 20,
  },

  checkbox: {
    fontSize: 20,
    marginBottom: 15,
    color: "#333",
  },

  filterTitle2: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#555799",
  },

  fakeSlider: {
    marginTop: 25,
    height: 4,
    backgroundColor: "#B947FA",
    borderRadius: 10,
    justifyContent: "center",
  },

  sliderDot: {
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: "#B947FA",
    alignSelf: "center",
  },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  applyButton: {
    marginTop: 40,
    backgroundColor: "#B947FA",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

});