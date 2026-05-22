import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

export default function App() {

  const [selectedStation, setSelectedStation] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
            Olá, Usuário!
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
        <Image
          source={require("./assets/map.png")}
          style={styles.map}
        />

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

          <TouchableOpacity>
            <Text style={styles.navText}>
              Favoritos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.navText}>
              Histórico
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
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
            Estação de Recarga - Nações Unidas
          </Text>

          <Text style={styles.rating}>
            ⭐⭐⭐⭐⭐ 4,3 (6 avaliações)
          </Text>

          <View style={styles.addressRow}>
            <Text style={styles.address}>
              Av. das Nações Unidas, 648 -
              Bonfim, Osasco - SP
            </Text>

            <Text style={styles.distance}>
              0,9 km
            </Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>
              2 Pontos de Recarga
            </Text>
          </View>

          <View style={styles.infoContainer}>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>
                Potência
              </Text>

              <Text style={styles.infoValue}>
                140kW
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>
                Tipo
              </Text>

              <Text style={styles.infoValue}>
                CCS
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

          <TouchableOpacity style={styles.routeButton}>
            <Text style={styles.routeText}>
              Iniciar rota
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  // HOME
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.greeting}>
          Olá, Usuário!
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
      <TouchableOpacity
        onPress={() => setSelectedStation(true)}
      >
        <Image
          source={require("./assets/map.png")}
          style={styles.map}
        />
      </TouchableOpacity>

      {/* NAVBAR */}
      <View style={styles.navbar}>

        <TouchableOpacity>
          <Text style={styles.activeNav}>
            Mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navText}>
            Favoritos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navText}>
            Histórico
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
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