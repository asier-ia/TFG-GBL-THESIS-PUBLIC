export type Language = "EU" | "ES" | "EN";

export type TranslationDictionary = {
  [key: string]: {
    EU: string;
    ES: string;
    EN: string;
  };
};

export const translations: TranslationDictionary = {
  header_sub: {
    EU: "EFIZIENTZIA ARTIFIZIALA | GBL BILDUMA",
    ES: "EFICIENCIA ARTIFICIAL | COLECCIÓN TFG",
    EN: "ARTIFICIAL EFFICIENCY | THESIS COLLECTION",
  },
  "hero.badge": {
    EU: "Gradu Bukaerako Lana (GBL)",
    ES: "Trabajo Fin de Grado (TFG)",
    EN: "Bachelor's Thesis (GBL/TFG)",
  },
  "hero.title1": {
    EU: "Efizientzia",
    ES: "Eficiencia",
    EN: "Artificial",
  },
  "hero.title2": {
    EU: "Artifiziala",
    ES: "Artificial",
    EN: "Efficiency",
  },
  "hero.desc": {
    EU: "Erakusketa digital honetan, nire Gradu Bukaerako Lanean garatutako Adimen Artifizialeko irtenbideak aurkezten dira, arte modernoaren galeria baten moduan.",
    ES: "En esta exposición digital se presentan las soluciones de inteligencia artificial desarrolladas en mi Trabajo Fin de Grado, al estilo de una galería de arte moderno.",
    EN: "This digital exhibition presents the artificial intelligence solutions developed in my Bachelor's thesis, designed in the style of a modern art gallery.",
  },
  "hero.btn": {
    EU: "Ibilbidea hasi",
    ES: "Comenzar el recorrido",
    EN: "Start the tour",
  },
  "hero.scroll": {
    EU: "Mugitu sartzeko",
    ES: "Desliza para entrar",
    EN: "Scroll to enter",
  },
  sala_one_tag: {
    EU: "1. Aretoa",
    ES: "Sala 1",
    EN: "Room 1",
  },
  sala_one_title: {
    EU: "LASAI — Optimizazioaren Hirukoa",
    ES: "LASAI — El Trío de la Optimización",
    EN: "LASAI — The Optimization Trio",
  },
  sala_one_desc: {
    EU: "Enpresaren barne-prozesuak automatizatzeko eta adimen artifiziala modu produktiboan ezartzeko hiru moduluz osatutako web aplikazio indartsua. Diseinu honen helburu nagusia eguneroko lan-karga arintzea eta eraginkortasuna biderkatzea da, taldeko langileei lasaitasuna eta erabaki sakonagoak hartzeko denbora emanez. Modulu bakoitza enpresa-engranajearen zutabe zehatz bat optimizatzeko diseinatuta dago.",
    ES: "Una potente aplicación web compuesta por tres módulos para automatizar los procesos internos de la empresa e implantar la IA de forma productiva. El objetivo principal de este diseño es aliviar la carga de trabajo diaria y multiplicar la eficiencia, proporcionando tranquilidad y tiempo para decisiones más profundas al equipo de trabajo. Cada módulo está diseñado para optimizar un pilar específico del engranaje empresarial.",
    EN: "A powerful web application consisting of three modules to automate internal company processes and implement AI productively. The main objective of this design is to ease the daily workload and multiply efficiency, giving the team peace of mind and time for deeper decision-making. Each module is designed to optimize a specific pillar of the business engine.",
  },
  corredor_tag: {
    EU: "Korridorea zeharkatu",
    ES: "Cruzar el corredor",
    EN: "Cross the corridor",
  },
  corredor_quote: {
    EU: "“Lehenengo erakusketa amaitu da, baina bidaia ez da hemen bukatzen. Jarraitu korridorean aurrera eta ireki atea maisulanari: guztiz independentea den aplikazio paregabea”",
    ES: "“Has terminado la primera exposición, pero el viaje no termina aquí. Continúa a través del corredor y abre la puerta del futuro: una aplicación única e independiente”",
    EN: "“You have finished the first exhibition, but the journey does not end here. Continue through the corridor and open the door to the future: a unique and independent application”",
  },
  sala_two_tag: {
    EU: "2. Aretoa",
    ES: "Sala 2",
    EN: "Room 2",
  },
  sala_two_title: {
    EU: "DENDENAI — Erakunde Autonomoa",
    ES: "DENDENAI — La Entidad Autónoma",
    EN: "DENDENAI — The Autonomous Entity",
  },
  sala_two_desc: {
    EU: "Aplikazio bakar bat, arkitektura banatua. Nire Gradu Bukaerako Laneko (GBL) proiektu gorena.",
    ES: "Una sola aplicación, arquitectura distribuida. El proyecto cumbre de mi Trabajo Fin de Grado (TFG).",
    EN: "A single application, distributed architecture. The crowning project of my Bachelor's Thesis.",
  },
  masterpiece_tag: {
    EU: "Bildumako bitxia",
    ES: "La joya de la corona",
    EN: "The crown jewel",
  },
  portal_title: {
    EU: "Ateak Zabalik",
    ES: "Puertas Abiertas",
    EN: "Open Doors",
  },
  portal_desc: {
    EU: "Hurbildu eta jarri kurtsorea atearen gainean aurrera egiteko...",
    ES: "Acércate y coloca el cursor sobre la puerta para avanzar...",
    EN: "Approach and place the cursor over the door to move forward...",
  },
  future_title: {
    EU: "Idazteko Dagoen Etorkizuna",
    ES: "Un Futuro por Escribir",
    EN: "A Future to be Written",
  },
  future_text: {
    EU: "Pauso berriak emateko prest nago nire ibilbide profesionalean. Ikusteko dago nora eramango nauen bide honek —hemen jarraituko dudan ala abentura berri bati ekingo diodan—, baina ziur nago aurretik datorrena zirraragarria izango dela.",
    ES: "Estoy listo para dar nuevos pasos en mi viaje profesional. Aún queda por ver hacia dónde me llevará este camino —ya sea continuando aquí o embarcándome en una nueva aventura—, pero estoy seguro de que lo que viene a continuación será emocionante.",
    EN: "I am ready to take new steps in my professional journey. It remains to be seen where this path will lead me —whether I will continue here or embark on a new adventure—, but I am certain that what lies ahead will be thrilling.",
  },
  plaque_tag: {
    EU: "Babeslea eta Bidelaguna",
    ES: "Patrocinador y Colaborador",
    EN: "Sponsor and Partner",
  },
  plaque_text: {
    EU: "Bihotzez eskertu nahi diot CodeSyntax taldeari GBL honen garapenean eta praktiketan nirekin izandako pazientzia amaigabea. Lehen egunetik etxean bezala sentiarazi nauzue, eta bide honetan emandako laguntza eta babesa orduezinezkoak izan dira. Zuek gabe, esperientzia hau ez litzateke berdina izango!",
    ES: "Quiero expresar mi más sincero agradecimiento al equipo de CodeSyntax por su paciencia infinita durante el desarrollo y las prácticas de este TFG. Desde el primer día me habéis hecho sentir como en casa, y la ayuda y el apoyo que me habéis brindado en este camino han sido invaluables. ¡Sin vosotros, esta experiencia no habría sido la misma!",
    EN: "I want to express my deepest gratitude to the CodeSyntax team for their infinite patience with me during the development and practices of this Thesis. Since the first day, you have made me feel at home, and the help and support you have provided along this path have been invaluable. Without you, this experience would not have been the same!",
  },
  copyright: {
    EU: "© 2026 · Asier Iglesias Alconero · Eskubide guztiak erreserbatuta",
    ES: "© 2026 · Asier Iglesias Alconero · Todos los derechos reservados",
    EN: "© 2026 · Asier Iglesias Alconero · All rights reserved",
  },

  // TECHWATCH (rostro)
  art_rostro_title: {
    EU: "TECHWATCH",
    ES: "TECHWATCH",
    EN: "TECHWATCH",
  },
  art_rostro_year: {
    EU: "Orakulua",
    ES: "El Oráculo",
    EN: "The Oracle",
  },
  art_rostro_tech: {
    EU: "Ezagutza teknologiko globalaren aurkikuntza, itzulpen eta sintesi automatizatua",
    ES: "Descubrimiento, traducción y síntesis automatizada de conocimiento tecnológico global",
    EN: "Automated discovery, translation, and synthesis of global technological knowledge",
  },
  art_rostro_desc: {
    EU: "Zure gogoko gaien inguruko albisteak automatikoki biltzen eta prestatzen dituen tresna. Informazio-iturri desberdinak erabiliz —eta berriak bilatzeko gaitasunarekin—, sistemak albisteak jaso, baloratu, itzuli eta laburpen argiak sortzen ditu. Gainera, prozesua pertsonalizagarria da: azken emaitza ikusi eta aldatu egin dezakezu bidali baino lehen.",
    ES: "Una herramienta que recopila y prepara automáticamente noticias sobre los temas de tu interés. Utilizando diferentes fuentes de información —y con la capacidad de aprender a buscar fuentes nuevas—, el sistema recibe, evalúa, traduce las noticias y genera resúmenes claros. Además, el proceso es totalmente adaptable: puedes revisar el resultado final y realizar cambios antes de enviarlo.",
    EN: "A tool that automatically gathers and prepares news tailored to your topics of interest. Using various information sources —with the ability to learn and find new ones—, the system collects, evaluates, and translates the news, generating clear summaries. Furthermore, the process is fully customizable: you can review the final result and make any necessary changes before sending.",
  },

  // ERP ANALYTICS (guitarra)
  art_guitarra_title: {
    EU: "ERP ANALYTICS",
    ES: "ERP ANALYTICS",
    EN: "ERP ANALYTICS",
  },
  art_guitarra_year: {
    EU: "Sinergista",
    ES: "El Sinergista",
    EN: "The Synergist",
  },
  art_guitarra_tech: {
    EU: "Enpresako ERP-arekin sinbiosia 'Hileroko Txostena' automatizatzeko, joerak bistaratzeko eta lantaldearen osasuna monitorizatzeko",
    ES: "Simbiosis con el ERP de la empresa para automatizar el 'Reporte Mensual', visualizar tendencias y monitorear la salud del equipo",
    EN: "Symbiosis with company's ERP to automate the 'Monthly Report', visualize trends, and monitor team health",
  },
  art_guitarra_desc: {
    EU: "Enpresako ERParekin konektatzen den modulua. 'Hileroko txostena' sortzea automatizatzen du eta insight pertsonalizatuak proposatzen ditu. Horrez gain, hileko bilakaeraren erregistro bisuala eskaintzen du eta langileen karga neurtzen du (TeamHealth) Kanban-eko ticket-etan oinarrituta.",
    ES: "Módulo que se conecta con el ERP de la empresa. Automatiza la creación del 'reporte mensual' y propone insights personalizados. Además, ofrece un registro visual de la evolución mensual y mide la carga de los empleados (TeamHealth) basándose en tickets de Kanban.",
    EN: "A module that connects to the company's ERP. It automates the generation of the 'monthly report' and proposes customized insights. Additionally, it offers a visual record of monthly progress and measures employee workload (TeamHealth) based on Kanban tickets.",
  },

  // CODEKONTUA (azul)
  art_azul_title: {
    EU: "CODEKONTUA",
    ES: "CODEKONTUA",
    EN: "CODEKONTUA",
  },
  art_azul_year: {
    EU: "Arkitekto Digitala",
    ES: "El Arquitecto Digital",
    EN: "The Digital Architect",
  },
  art_azul_tech: {
    EU: "Bezero bakoitzaren eta enpresaren beharren arabera aurrekontu pertsonalizatuak modu automatikoan sortzen dituen sistema adimenduna",
    ES: "Sistema inteligente que genera automáticamente presupuestos personalizados según las necesidades de cada cliente y empresa",
    EN: "Intelligent system that automatically generates personalized budgets based on the needs of each client and company",
  },
  art_azul_desc: {
    EU: "Proiektu berrietarako, hobekuntzetarako edota inplementazioetarako aurrekontu zehatzak diseinatzen dituen tresna. Bezero motaren eta enpresaren testuinguruaren arabera egokitzen da, prozesua bizkortuz eta eskaintza bakoitza neurrira bermatuz.",
    ES: "Una herramienta que diseña presupuestos precisos para nuevos proyectos, mejoras o implementaciones. Se adapta según el tipo de cliente y el contexto de la empresa, agilizando el proceso y garantizando que cada oferta sea a medida.",
    EN: "A tool that designs precise budgets for new projects, improvements, or implementations. It adapts according to the type of client and the company's context, speeding up the process and ensuring that each offer is tailored.",
  },

  // DENDENAI (maestra)
  art_maestra_title: {
    EU: "DENDENAI",
    ES: "DENDENAI",
    EN: "DENDENAI",
  },
  art_maestra_year: {
    EU: "Erakunde Autonomoa",
    ES: "Entidad Autónoma",
    EN: "Autonomous Entity",
  },
  art_maestra_tech: {
    EU: "Bezero anitzeko chatbot entitate aurreratua. Bere ezagutza-basea organikoki mutatuz eta eguneratuz doa, webguneko eduki berriak modu autonomoan xurgatuz",
    ES: "Entidad avanzada de chatbot multi-inquilino. Su base de conocimiento muta y se actualiza orgánicamente, absorbiendo nuevo contenido de la web de forma autónoma",
    EN: "Advanced multi-tenant chatbot entity. Its knowledge base organically mutates and updates, autonomously absorbing new website content",
  },
  art_maestra_desc: {
    EU: "Webgune desberdinetarako chatbot pertsonalizatuak modu errazean sortzeko sistema. Txatbot bakoitza zeure erara egokitu dezakezu: bere itxura eta estiloa aukeratu, eta adimen artifizialak nola erantzun edo nola ikasi behar duen erabaki. Gainera, sistema erabat autonomoa da: webgunean eduki edo albiste berri bat igotzen den bakoitzean, txat-a berak bakarrik eguneratzen da informazio horrekin.",
    ES: "Sistema para crear chatbots personalizados para diferentes sitios web de manera sencilla. Puedes adaptar cada chatbot a tu gusto: elegir su apariencia y estilo, y decidir cómo debe responder o aprender el inteligencia artificial. Además, el sistema es completamente autónomo: cuando se sube nuevo contenido o noticias al sitio web, el chat se actualiza automáticamente con esa información.",
    EN: "A system for creating customized chatbots for different websites easily. You can adapt each chatbot to your liking: choose its appearance and style, and decide how the artificial intelligence should respond or learn. Moreover, the system is completely autonomous: when new content or news is uploaded to the website, the chat updates automatically with that information.",
  },

  // MINI MAP TRANSLATIONS
  "map.title": {
    EU: "GALERIA",
    ES: "GALERÍA",
    EN: "GALLERY",
  },
  "map.hero": {
    EU: "Ataria",
    ES: "Vestíbulo",
    EN: "Lobby",
  },
  "map.sala_uno": {
    EU: "1. Aretoa: Obrak",
    ES: "Sala 1: Obras",
    EN: "Room 1: Artworks",
  },
  "map.corredor": {
    EU: "Korridorea",
    ES: "El Corredor",
    EN: "The Corridor",
  },
  "map.sala_dos": {
    EU: "2. Aretoa: Obra Nagusia",
    ES: "Sala 2: Obra Maestra",
    EN: "Room 2: Masterpiece",
  },
  "map.portal": {
    EU: "Atelier-a: 3D Ataria",
    ES: "El Atelier: Portal 3D",
    EN: "The Atelier: 3D Portal",
  },
  "sound.on": {
    EU: "SOINUA: BAI",
    ES: "SONIDO: ACTIVO",
    EN: "SOUND: ON",
  },
  "sound.off": {
    EU: "SOINUA: EZ",
    ES: "SONIDO: SILENCIO",
    EN: "SOUND: OFF",
  },
  "map.tech_hall": {
    EU: "Aurreganbera: Tresnak",
    ES: "Antecámara: Herramientas",
    EN: "Antechamber: Tools",
  },
  "tech.title": {
    EU: "TRESNA ETA TEKNOLOGIAK",
    ES: "HERRAMIENTAS Y TECNOLOGÍAS",
    EN: "TOOLS & TECHNOLOGIES",
  },
  "tech.desc": {
    EU: "Nire Gradu Bukaerako Lana (GBL) Adimen Artifizialeko irtenbideak eta ekosistema digitala garatzeko erabili ditudan puntako teknologia zutabeak.",
    ES: "El ecosistema de herramientas y tecnologías de vanguardia que sustentan y dan vida a las soluciones de IA de mi Trabajo Fin de Grado (TFG).",
    EN: "The cutting-edge ecosystem of tools and technologies that support and power the AI solutions developed in my Bachelor's Thesis.",
  },
  "intro.title": {
    EU: "ONGI ETORRI GALERIA DIGITALERA",
    ES: "BIENVENIDO A LA GALERÍA DIGITAL",
    EN: "WELCOME TO THE DIGITAL GALLERY",
  },
  "intro.p1": {
    EU: "Marko Interaktiboak: Koadroak 3D-an mugitzen dira eta klikagarriak dira; egin klik edozein obretan bere bideo-demostrazioa ikusteko.",
    ES: "Marcos Interactivos: Los cuadros se inclinan en 3D y son clicables; haz clic en cualquier obra para reproducir su vídeo demostrativo.",
    EN: "Interactive Frames: The paintings tilt in 3D and are clickable; click on any artwork to play its video demonstration.",
  },
  "intro.p2": {
    EU: "Soinu Atmosferikoa: Gomendagarria da soinu sistema piztea (goiko barrako altavoz urreztatua) esperientzia osoaz gozatzeko.",
    ES: "Sonido Atmosférico: Se recomienda activar el sonido (el altavoz dorado de la barra superior) para disfrutar de la experiencia completa.",
    EN: "Atmospheric Sound: We recommend turning on the sound (the golden speaker in the top bar) to enjoy the full museum experience.",
  },
  "intro.p3": {
    EU: "Atelier Ataria: Azken gelako 3D atea klikagarria da; sartu barnera Sortzailearen Atelier sekretua ezagutzeko.",
    ES: "El Portal del Atelier: La puerta 3D final es clicable; entra para descubrir el Atelier privado del Creador.",
    EN: "The Atelier Portal: The final 3D door is clickable; step inside to discover the Creator's private Atelier.",
  },
  "intro.btn": {
    EU: "IBILBIDEA HASI",
    ES: "COMENZAR VISITA",
    EN: "START VISIT",
  },
  // Agradecimientos Placa
  "plaque.tutor_company": {
    EU: "Enpresako tutorea: Aurtzi Odriozola",
    ES: "Tutor en la empresa: Aurtzi Odriozola",
    EN: "Company Tutor: Aurtzi Odriozola",
  },
  "plaque.uni_tag": {
    EU: "Hezkuntza Erakundea",
    ES: "Institución Educativa",
    EN: "Educational Institution",
  },
  "plaque.uni_text": {
    EU: "Nire esker onik zintzoena Mondragon Unibertsitateari nire ingeniaritza ikasketetan emandako formakuntzagatik, nire ezagutzak garatzeko eskainitako baliabide guztiengatik eta nire hazkunde akademiko zein pertsonalerako hain garrantzitsua izan den azken urte honegatik.",
    ES: "Mi más sincero agradecimiento a Mondragon Unibertsitatea por la formación académica brindada durante mis estudios de ingeniería, por todos los recursos facilitados para desarrollar mi conocimiento y por este último año que ha sido crucial para mi crecimiento académico y personal.",
    EN: "My deepest gratitude to Mondragon University for the academic education provided during my engineering studies, for all the resources provided to develop my knowledge, and for this final year which has been crucial for my academic and personal growth.",
  },
  "plaque.tutor_uni": {
    EU: "Unibertsitateko tutorea: Alain Perez",
    ES: "Tutor en la universidad: Alain Perez",
    EN: "University Tutor: Alain Perez",
  },
  "map.atelier": {
    EU: "Atelierra",
    ES: "El Atelier",
    EN: "The Atelier",
  },
  "atelier.text": {
    EU: "Mila esker bisitagatik. Nire GBL proiektua eta Adimen Artifizialeko soluzioak biltzen dituen galeria digital honen amaierara iritsi zara. Hau etapa baten amaiera besterik ez da; etorkizunak erronka eta bide berriak ekarriko ditu, eta prest nago haiei ekiteko.",
    ES: "Muchas gracias por tu visita. Has llegado al final de esta galería digital que recopila mi proyecto de TFG y soluciones de Inteligencia Artificial. Esto es solo el final de una etapa; el futuro traerá nuevos retos y caminos, y estoy preparado para emprenderlos.",
    EN: "Thank you very much for your visit. You have reached the end of this digital gallery compiling my Bachelor's thesis project and Artificial Intelligence solutions. This is just the end of one stage; the future will bring new challenges and paths, and I am ready to embark on them.",
  },
};
