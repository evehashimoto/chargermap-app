export const API_URL = "https://chargermap-backend.onrender.com/postos";

// Ponto de referência (centro do mapa) usado para calcular as distâncias.
export const REF = { latitude: -23.539140064799508, longitude: -46.73418015901779 };

// Usado só se a API não responder (ex.: servidor "dormindo" ou sem internet).
export const POSTOS_DEMO = [
  { _id: "demo1", nome: "Estação Leopoldina", cidade: "São Paulo", endereco: "Av. Manuel Bandeira", potencia: "150 kW", conector: "CCS", disponibilidade: "Disponível", avaliacao: 4.8, latitude: -23.5380622, longitude: -46.7332983 },
  { _id: "demo2", nome: "Eletroposto Imperatriz", cidade: "São Paulo", endereco: "Av. Imperatriz Leopoldina", potencia: "50 kW", conector: "Tipo 2", disponibilidade: "Disponível", avaliacao: 4.3, latitude: -23.5425537, longitude: -46.7297710 },
  { _id: "demo3", nome: "Recarga Carlos Weber", cidade: "São Paulo", endereco: "Rua Carlos Weber", potencia: "100 kW", conector: "CHAdeMO", disponibilidade: "Indisponível", avaliacao: 4.1, latitude: -23.5333011, longitude: -46.7371197 },
  { _id: "demo4", nome: "Estação Mofarrej", cidade: "São Paulo", endereco: "Av. Mofarrej", potencia: "120 kW", conector: "CCS", disponibilidade: "Disponível", avaliacao: 4.6, latitude: -23.5472249, longitude: -46.7410390 },
  { _id: "demo5", nome: "Ponto Gastão Vidigal", cidade: "São Paulo", endereco: "Av. Gastão Vidigal", potencia: "22 kW", conector: "Tipo 2", disponibilidade: "Disponível", avaliacao: 4.2, latitude: -23.5256654, longitude: -46.7224221 },
];

export const AVALIACOES_POSTO = [
  { usuario: "Carlos", nota: 5, comentario: "Posto excelente e rápido." },
  { usuario: "Marina", nota: 4, comentario: "Funcionou perfeitamente." },
];

export const HISTORICO = [
  { id: "h1", local: "EcoCharge Shopping", data: "05/06/2026", kwh: "32,4 kWh", valor: "R$ 58,90" },
  { id: "h2", local: "Power Station", data: "02/06/2026", kwh: "27,1 kWh", valor: "R$ 44,20" },
];

export const MINHAS_AVALIACOES = [
  { id: "a1", local: "EcoCharge Shopping", nota: 5, comentario: "Carregamento rápido e fácil de achar." },
  { id: "a2", local: "Power Station", nota: 4, comentario: "Funcionou bem, mas estava bem cheio." },
];

export const CONECTORES = [
  { id: "ccs", label: "CCS", aliases: ["ccs"] },
  { id: "chademo", label: "CHAdeMO", aliases: ["chademo"] },
  { id: "tipo2", label: "Tipo 2", aliases: ["tipo2", "type2", "mennekes"] },
];

export const POTENCIAS = [
  { valor: 0, label: "Qualquer" },
  { valor: 50, label: "50 kW+" },
  { valor: 100, label: "100 kW+" },
  { valor: 150, label: "150 kW+" },
];

export const FILTROS_PADRAO = { conectores: [], potenciaMin: 0, soDisponiveis: false };

export const idDe = (p) => p?._id ?? p?.id ?? p?.nome;

export const normalizar = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function potenciaKw(p) {
  const m = String(p?.potencia ?? "").replace(",", ".").match(/\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

export function statusPosto(p) {
  const texto = String(p?.disponibilidade ?? "").trim();
  const n = normalizar(texto);
  const ok = n.includes("dispon") && !n.includes("indispon");
  return { texto, ok };
}

export function distanciaKm(p, ref = REF) {
  const lat = Number(p?.latitude);
  const lng = Number(p?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return Infinity;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(lat - ref.latitude);
  const dLng = rad(lng - ref.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(ref.latitude)) * Math.cos(rad(lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDist(km) {
  if (!Number.isFinite(km)) return "—";
  if (km < 1) return `${Math.round(km * 100) * 10} m`;
  return `${km.toFixed(1).replace(".", ",")} km`;
}

export function filtrarPostos(postos, busca, f) {
  const q = normalizar(String(busca || "").trim());
  return postos.filter((p) => {
    if (q && !normalizar(p.nome).includes(q) && !normalizar(p.endereco).includes(q)) return false;

    if (f.conectores.length) {
      const c = normalizar(p.conector).replace(/\s/g, "");
      const bate = CONECTORES.filter((x) => f.conectores.includes(x.id)).some((x) =>
        x.aliases.some((a) => c.includes(a))
      );
      if (c && !bate) return false;
    }

    if (f.potenciaMin) {
      const kw = potenciaKw(p);
      if (kw !== null && kw < f.potenciaMin) return false;
    }

    if (f.soDisponiveis && !statusPosto(p).ok) return false;
    return true;
  });
}

export const contarFiltros = (f) =>
  (f.conectores.length ? 1 : 0) + (f.potenciaMin ? 1 : 0) + (f.soDisponiveis ? 1 : 0);

export const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#1d1d22" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9a9aae" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1d1d22" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#34343f" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#14141a" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];
