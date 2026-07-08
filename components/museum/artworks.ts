import { asset } from "@/lib/asset-path"

export type Artwork = {
  id: string
  number: string
  title: string
  year: string
  technique: string
  /** The real artwork illustration image path */
  image: string
  /** Path to the mp4 video demo file */
  video: string
  /** The programmatic frame variation style */
  frameType: "gallery" | "ash" | "floating" | "monumental"
  description: string
}

export const salaUno: Artwork[] = [
  {
    id: "rostro",
    number: "I",
    title: "TECHWATCH",
    year: "Orakulua",
    technique: "Ezagutza teknologiko globalaren aurkikuntza, itzulpen eta sintesi automatizatua",
    image: asset("/artworks/obra-1.png"),
    video: asset("/videos/M1_Techwatch.mp4"),
    frameType: "gallery",
    description:
      "Mundu mailako albiste teknologikoak bilatzen dituen modulua. Iturri ezberdinetako informazioa jaso, ebaluatu, itzuli eta albiste onenekin laburpenak egiten ditu.",
  },
  {
    id: "guitarra",
    number: "II",
    title: "ERP ANALYTICS",
    year: "Sinergista",
    technique: "Odoo ERP-arekin sinbiosia 'Hileroko Txostena' automatizatzeko, joerak bistaratzeko eta lantaldearen osasuna monitorizatzeko",
    image: asset("/artworks/obra-2.png"),
    video: asset("/videos/M2_ERP.mp4"),
    frameType: "ash",
    description:
      "Enpresako Odoo ERParekin konektatzen den modulua. 'Hileroko txostena' sortzea automatizatzen du eta insight pertsonalizatuak proposatzen ditu. Horrez gain, hileko bilakaeraren erregistro bisuala eskaintzen du eta langileen karga neurtzen du (TeamHealth) Kanban-eko ticket-etan oinarrituta.",
  },
  {
    id: "azul",
    number: "III",
    title: "CODEKONTUA",
    year: "Arkitekto Digitala",
    technique: "Proiektuen hobekuntzak eta inplementazio berriak aurrekontatzeko sistema adimenduna",
    image: asset("/artworks/obra-3.png"),
    video: asset("/videos/M3_CodeKontua.mp4"),
    frameType: "floating",
    description:
      "Proiektu existitzen diren hobekuntzetarako, inplementazio berrietarako edota bezero berrientzako aurrekontuak sortzen laguntzen duen sistema.",
  },
]

export const obraMaestra: Artwork = {
  id: "maestra",
  number: "★",
  title: "DENDENAI",
  year: "Erakunde Autonomoa",
  technique: "Bezero anitzeko chatbot entitate aurreratua. Bere ezagutza-basea organikoki mutatuz eta eguneratuz doa, webguneko eduki berriak modu autonomoan xurgatuz",
  image: asset("/artworks/obra-maestra.png"),
  video: asset("/videos/DendenAI.mp4"),
  frameType: "monumental",
  description:
    "Aplikazio multi-tenant bat da (bezero anitzentzako sortua). Webgune bakoitzerako chatbot pertsonalizatu bat sortzean datza; gainera, modu autonomoan eguneratzen da webgunean albiste edo eduki berriak igotzen badira.",
}
