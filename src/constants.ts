import { Property } from "./types";

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Residencia Moderna en Las Lomas',
    shortDescription: 'Lujosa casa con acabados de mármol y alberca privada.',
    description: 'Esta impresionante propiedad cuenta con 4 recámaras, cada una con baño propio, amplia sala de estar con doble altura, cocina gourmet equipada y un jardín espectacular con alberca climatizada. Ubicada en la zona más exclusiva de la ciudad.',
    price: '$2,500,000 USD',
    location: 'Las Lomas, CDMX',
    image: 'https://picsum.photos/seed/house1/800/600',
    type: 'casa',
    beds: 4,
    baths: 4.5,
    sqft: 450
  },
  {
    id: '2',
    title: 'Penthouse Vista Panorámica',
    shortDescription: 'Departamento de lujo en el corazón financiero.',
    description: 'Penthouse de dos niveles con vistas inigualables a la ciudad. Cuenta con terraza privada de 100m2, acabados de lujo, seguridad 24/7 y amenidades de clase mundial como gimnasio y spa.',
    price: '$1,200,000 USD',
    location: 'Polanco, CDMX',
    image: 'https://picsum.photos/seed/apt1/800/600',
    type: 'departamento',
    beds: 3,
    baths: 3,
    sqft: 280
  },
  {
    id: '3',
    title: 'Local Comercial Prime',
    shortDescription: 'Ubicación estratégica en avenida de alto flujo.',
    description: 'Local comercial de 150m2 ideal para franquicias o boutiques de lujo. Gran visibilidad y estacionamiento para clientes.',
    price: '$850,000 USD',
    location: 'Santa Fe, CDMX',
    image: 'https://picsum.photos/seed/comm1/800/600',
    type: 'local',
    sqft: 150
  },
  {
    id: '4',
    title: 'Terreno para Desarrollo',
    shortDescription: 'Terreno plano ideal para edificio de departamentos.',
    description: 'Excelente oportunidad de inversión. Terreno de 1000m2 con uso de suelo habitacional mixto. Todos los servicios disponibles.',
    price: '$3,000,000 USD',
    location: 'Condesa, CDMX',
    image: 'https://picsum.photos/seed/land1/800/600',
    type: 'terreno',
    sqft: 1000
  }
];

export const COLORS = {
  navy: '#1B3A6B',
  gold: '#C9A84C',
  goldLight: '#D4AF37',
  white: '#FFFFFF',
  bg: '#F8F9FA'
};

export const SOFIA_SYSTEM_PROMPT = `Eres Sofia, la asesora virtual experta de "Inmobiliaria Premium".
Tu objetivo es calificar a los leads de forma cálida, profesional y natural.

REGLAS CRÍTICAS:
1. Habla siempre en español.
2. NUNCA hagas más de una pregunta a la vez.
3. Si el usuario es vago, repregunta amablemente.
4. Si se sale del tema, redirígelo suavemente a la calificación.
5. NO menciones que eres una IA a menos que te pregunten directamente.

FLUJO DE PREGUNTAS (Hazlas de forma conversacional, no como interrogatorio):
- Bienvenida cálida.
- ¿Qué tipo de operación busca? (compra, renta, inversión)
- ¿Qué tipo de inmueble le interesa? (casa, departamento, local, terreno)
- ¿En qué zona o colonia tiene interés?
- ¿Cuál es su presupuesto aproximado?
- ¿Necesita financiamiento o crédito hipotecario?
- ¿Para cuándo planea concretar la operación? (inmediato, 1-3 meses, más de 3 meses)
- Nombre completo y WhatsApp para agendar.

AL FINALIZAR:
Haz un resumen de lo que entendiste.
Luego, debes incluir exactamente este bloque de datos al final de tu respuesta final para que el sistema lo procese (no lo menciones como "bloque de datos", solo inclúyelo):
[DATA_SUMMARY: {
  "operation": "...",
  "propertyType": "...",
  "zone": "...",
  "budget": "...",
  "financing": "...",
  "timeline": "...",
  "name": "...",
  "whatsapp": "...",
  "classification": "HOT|WARM|COLD"
}]

GUÍA DE CLASIFICACIÓN:
- 🔥 HOT: Decisión inmediata, presupuesto definido, sin necesidad de crédito.
- 🌤️ WARM: Plazo 1-3 meses o necesita crédito pero intención clara.
- ❄️ COLD: Más de 3 meses, presupuesto indefinido o solo explorando.`;
