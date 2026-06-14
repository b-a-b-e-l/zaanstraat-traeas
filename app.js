/* =========================================
   ZAANSTRAAT 314 · TAREAS — app.js
   - Toggle sections
   - Progress tracking (saved to localStorage)
   - Language switcher (ES / IT / EN)
   - Owner assignment + filters
   - Tooltips (hover on technical terms)
   - Countdown widget to 15 Aug 2026
   ========================================= */

// ---- TOOLTIP DEFINITIONS ----
const TOOLTIPS = {
  es: {
    koopovereenkomst: "Contrato de compraventa — el documento legal que formaliza la compra entre vendedor y comprador.",
    overdracht: "Transferencia — el momento en que la propiedad cambia oficialmente de manos en la notaría.",
    financing_condition: "Condición de financiación — cláusula que permite cancelar la compra si no se obtiene la hipoteca.",
    bouwdepot: "Depósito de obras — cuenta separada de la hipoteca reservada exclusivamente para financiar reformas.",
    non_self_occupancy: "Cláusula de no residencia propia — el vendedor declara que no vive en la propiedad.",
    age_clause: "Cláusula de antigüedad — limita la responsabilidad del vendedor por defectos en inmuebles viejos.",
    asbestos_clause: "Cláusula de amianto — el comprador acepta el riesgo de posible presencia de asbesto.",
    foundation_waiver: "Renuncia de garantía de cimientos — el comprador no puede reclamar por problemas estructurales.",
    resale_restriction: "Restricción de reventa — puede impedir vender el piso por debajo de un precio o a ciertos compradores.",
    fire_rated_ceiling: "Techo con resistencia al fuego — exigencia de construcción que puede limitar obras en el techo.",
    splitsingstekening: "Plano de división — documento que muestra exactamente qué parte del edificio corresponde a cada propietario.",
    eigenbewoning: "Ocupación propia — condición de que el propietario vive en la casa, necesaria para ciertos beneficios hipotecarios.",
    source_of_funds: "Origen de los fondos — declaración obligatoria sobre de dónde proviene el dinero de la compra.",
    pep_statement: "Declaración de persona políticamente expuesta — formulario antilavado de dinero.",
    wwft: "Ley holandesa de prevención de blanqueo de capitales y financiación del terrorismo.",
    kyc: "Know Your Customer — proceso de verificación de identidad exigido por las entidades financieras y notarías.",
    nota_afrekening: "Liquidación final — documento del notario con el resumen exacto de lo que se transfiere el día de la firma.",
    aktenpassage: "Firma de escrituras — el acto en la notaría donde se firma la transferencia oficial de la propiedad.",
    erfpacht: "Derecho de superficie — no eres dueño del suelo, solo del edificio; pagas un canon anual al propietario del suelo.",
    vve: "Vereniging van Eigenaren — comunidad de propietarios del edificio; gestiona el mantenimiento y toma decisiones colectivas.",
    verduurzaming: "Sostenibilización — proyecto de mejora energética del edificio (aislamiento, paneles solares, etc.).",
    derrama: "Cuota extraordinaria — pago único que la VvE puede exigir para obras mayores no cubiertas por el fondo de reserva.",
    reserve_fund: "Fondo de reserva — dinero acumulado por la VvE para mantenimiento y reparaciones futuras del edificio.",
    splitsingsreglement: "Reglamento de división — reglas legales sobre el uso de las partes comunes y privadas del edificio.",
    huishoudelijk_reglement: "Reglamento interno — normas de convivencia: ruido, obras, mascotas, basura, etc.",
    taxatie: "Tasación — valoración oficial del inmueble realizada por un perito, requerida para la hipoteca.",
    bank_guarantee: "Aval bancario — garantía emitida por el banco que cubre el 10% del precio si no se puede completar la compra.",
    waiver: "Renuncia a condición — documento que confirma que se levanta la condición de financiación y la compra sigue adelante.",
    boiler: "Caldera de gas — sistema de calefacción central y agua caliente, muy común en los Países Bajos.",
    meterstanden: "Lecturas de medidores — los valores exactos de gas, electricidad y agua en el momento de la entrega.",
    mechanische_ventilatie: "Ventilación mecánica — sistema que extrae aire viciado de baño, toilet y cocina de forma automática.",
    co_detector: "Detector de monóxido de carbono — alarma obligatoria cerca de la caldera que detecta este gas inodoro y letal.",
    cilinderslot: "Cilindro de cerradura — la parte reemplazable de la cerradura; cambiarlos garantiza que nadie más tenga copia de la llave.",
    beneden: "Planta baja / piso de abajo.",
    woonkamer: "Salón / sala de estar.",
    hal: "Recibidor / entrada.",
    vlak_egaal: "Plano y nivelado — condición del suelo existente para instalar suelo flotante sin necesidad de nivelar.",
    akoestiek_norm: "Norma acústica — nivel de aislamiento al impacto medido en decibelios, exigido por la VvE para suelos flotantes.",
    fermacell: "Panel de construcción en seco de fibra de yeso; muy usado como subestructura para suelos con aislamiento acústico.",
    underlay: "Capa amortiguadora bajo el suelo flotante que absorbe el ruido de impacto.",
    multiplank: "Tarima de varios tablones por plancha, efecto más rústico/natural que las lamas estrechas.",
    visgraat: "Patrón espiga / herringbone — colocación diagonal del suelo en forma de V.",
    batchnummer: "Número de lote de producción — debe ser el mismo para todo el suelo para garantizar color e tono uniformes.",
    marmerlook: "Imitación de mármol — cerámica con veteado de mármol, calidad y precio menores al mármol real.",
    metod: "Sistema de cocina modular de IKEA, el más completo y personalizable del catálogo.",
    backsplash: "Revestimiento de pared detrás de la encimera, protege contra salpicaduras.",
    balkon: "Balcón.",
    ventilatie: "Ventilación.",
    single_phase: "Monofásico — tipo de instalación eléctrica estándar en viviendas; tiene limitaciones de potencia total.",
    pladur: "Pladur / cartón-yeso — panel de yeso y cartón para construir tabiques ligeros, paredes y falsos techos.",
    metal_studs: "Perfiles metálicos — estructura de acero galvanizado sobre la que se atornillan las placas de pladur.",
    high_glass: "Cristal fijo o puerta acristalada en la parte superior de una pared, que deja pasar la luz sin perder privacidad.",
    inloopkast: "Walk-in closet — armario vestidor sin puertas en el que se puede entrar.",
    slaapkamer: "Dormitorio.",
    ethernet: "Cable de red de datos de alta velocidad — más estable que el WiFi para trabajar desde casa.",
    landskrona: "Sofá de IKEA con tapicería de tela, estilo clásico actualizado.",
    gemeente: "Ayuntamiento / municipio — donde hay que registrarse al cambiar de domicilio en los Países Bajos.",
    digid: "Identidad digital holandesa — login único para todos los servicios del gobierno online.",
    bsn: "Número de identificación fiscal holandés (Burgerservicenummer) — equivalente al NIE/TIN.",
  },
  it: {
    koopovereenkomst: "Contratto di compravendita — il documento legale che formalizza l'acquisto tra venditore e acquirente.",
    overdracht: "Trasferimento — il momento in cui la proprietà cambia ufficialmente di mano presso il notaio.",
    financing_condition: "Condizione di finanziamento — clausola che permette di annullare l'acquisto se il mutuo non viene ottenuto.",
    bouwdepot: "Deposito lavori — conto separato dal mutuo riservato esclusivamente al finanziamento delle ristrutturazioni.",
    non_self_occupancy: "Clausola di non residenza — il venditore dichiara di non abitare nell'immobile.",
    age_clause: "Clausola di vecchiaia — limita la responsabilità del venditore per difetti in immobili di vecchia costruzione.",
    asbestos_clause: "Clausola amianto — l'acquirente accetta il rischio di eventuale presenza di amianto.",
    foundation_waiver: "Rinuncia alla garanzia delle fondamenta — l'acquirente non può rivalersi per problemi strutturali.",
    resale_restriction: "Restrizione alla rivendita — può impedire di vendere sotto un certo prezzo o a certi acquirenti.",
    fire_rated_ceiling: "Soffitto resistente al fuoco — requisito costruttivo che limita alcune opere.",
    splitsingstekening: "Planimetria di divisione — documento che indica esattamente quale parte dell'edificio appartiene a ciascun proprietario.",
    eigenbewoning: "Residenza principale — condizione necessaria per certi benefici fiscali del mutuo.",
    source_of_funds: "Origine dei fondi — dichiarazione obbligatoria sulla provenienza del denaro dell'acquisto.",
    pep_statement: "Dichiarazione persona politicamente esposta — modulo antiriciclaggio.",
    wwft: "Legge olandese contro il riciclaggio di denaro e il finanziamento del terrorismo.",
    kyc: "Know Your Customer — procedura di verifica identità richiesta da banche e notai.",
    nota_afrekening: "Liquidazione finale — documento del notaio con il riepilogo esatto del trasferimento.",
    aktenpassage: "Firma degli atti — l'atto dal notaio in cui si firma il trasferimento ufficiale della proprietà.",
    erfpacht: "Diritto di superficie — non si è proprietari del terreno, solo dell'edificio; si paga un canone annuo.",
    vve: "Vereiniging van Eigenaren — condominio; gestisce la manutenzione e le decisioni collettive.",
    verduurzaming: "Efficientamento energetico — progetto di miglioramento energetico dell'edificio.",
    derrama: "Quota straordinaria — pagamento unico che il condominio può richiedere per lavori straordinari.",
    reserve_fund: "Fondo di riserva — denaro accumulato dal condominio per manutenzioni future.",
    splitsingsreglement: "Regolamento di divisione — norme legali sull'uso delle parti comuni e private.",
    huishoudelijk_reglement: "Regolamento interno — norme di convivenza: rumore, lavori, animali, rifiuti.",
    taxatie: "Perizia — valutazione ufficiale dell'immobile richiesta per il mutuo.",
    bank_guarantee: "Garanzia bancaria — garanzia emessa dalla banca che copre il 10% del prezzo.",
    waiver: "Rinuncia alla condizione — documento che conferma che la condizione di finanziamento viene rimossa.",
    boiler: "Caldaia a gas — sistema di riscaldamento centrale e acqua calda, molto comune in Olanda.",
    meterstanden: "Letture dei contatori — i valori esatti di gas, elettricità e acqua al momento della consegna.",
    mechanische_ventilatie: "Ventilazione meccanica — sistema che estrae l'aria viziata dal bagno, toilet e cucina.",
    co_detector: "Rilevatore di monossido di carbonio — allarme vicino alla caldaia, obbligatorio per sicurezza.",
    cilinderslot: "Cilindro della serratura — la parte sostituibile; cambiarla garantisce che nessun altro abbia copia delle chiavi.",
    beneden: "Piano terra / piano inferiore.",
    woonkamer: "Soggiorno.",
    hal: "Ingresso / corridoio.",
    vlak_egaal: "Piano e livellato — condizione del pavimento esistente per installare pavimento flottante.",
    akoestiek_norm: "Norma acustica — livello di isolamento all'impatto in decibel, richiesto dal condominio.",
    fermacell: "Pannello in fibra di gesso usato come sottostruttura per pavimenti con isolamento acustico.",
    underlay: "Strato ammortizzante sotto il pavimento flottante che assorbe il rumore da impatto.",
    multiplank: "Listoni multipli per asse, effetto più rustico/naturale.",
    visgraat: "Pattern spina di pesce — posa diagonale del pavimento a forma di V.",
    batchnummer: "Numero di lotto — deve essere lo stesso per tutto il pavimento per garantire colore uniforme.",
    marmerlook: "Imitazione marmo — ceramica con venature di marmo.",
    metod: "Sistema cucina modulare di IKEA, il più completo del catalogo.",
    backsplash: "Rivestimento della parete dietro il piano cottura, protegge dagli schizzi.",
    balkon: "Balcone.",
    ventilatie: "Ventilazione.",
    single_phase: "Monofase — tipo di impianto elettrico standard nelle abitazioni.",
    pladur: "Cartongesso — pannello di gesso e cartone per costruire pareti leggere.",
    metal_studs: "Profili metallici — struttura in acciaio su cui si avvitano i pannelli di cartongesso.",
    high_glass: "Vetro fisso o porta vetrata nella parte superiore di una parete.",
    inloopkast: "Cabina armadio — guardaroba in cui si può entrare.",
    slaapkamer: "Camera da letto.",
    ethernet: "Cavo di rete ad alta velocità — più stabile del WiFi per lavorare da casa.",
    landskrona: "Divano IKEA con rivestimento in tessuto.",
    gemeente: "Comune — dove bisogna registrarsi quando si cambia indirizzo in Olanda.",
    digid: "Identità digitale olandese — accesso unico per tutti i servizi governativi online.",
    bsn: "Numero di identificazione fiscale olandese (Burgerservicenummer).",
  },
  en: {
    koopovereenkomst: "Purchase agreement — the legal document that formalises the sale between seller and buyer.",
    overdracht: "Transfer — the moment the property officially changes hands at the notary.",
    financing_condition: "Financing condition — clause allowing the purchase to be cancelled if the mortgage is not obtained.",
    bouwdepot: "Construction deposit — a separate mortgage account reserved exclusively for financing renovation works.",
    non_self_occupancy: "Non-self-occupancy clause — the seller declares they do not live in the property.",
    age_clause: "Age clause — limits the seller's liability for defects in older properties.",
    asbestos_clause: "Asbestos clause — the buyer accepts the risk of potential asbestos presence.",
    foundation_waiver: "Foundation waiver — the buyer cannot claim for structural problems.",
    resale_restriction: "Resale restriction — may prevent selling below a certain price or to certain buyers.",
    fire_rated_ceiling: "Fire-rated ceiling — building requirement that may limit works on the ceiling.",
    splitsingstekening: "Division drawing — document showing exactly which part of the building belongs to each owner.",
    eigenbewoning: "Owner-occupancy — condition of living in the property, required for certain mortgage benefits.",
    source_of_funds: "Source of funds — mandatory declaration of where the purchase money comes from.",
    pep_statement: "Politically Exposed Person statement — anti-money laundering form.",
    wwft: "Dutch anti-money laundering and counter-terrorism financing law.",
    kyc: "Know Your Customer — identity verification process required by banks and notaries.",
    nota_afrekening: "Final settlement — notary document with the exact summary of what is transferred on signing day.",
    aktenpassage: "Deed signing — the act at the notary where the official transfer of property is signed.",
    erfpacht: "Ground lease / leasehold — you own the building but not the land; you pay an annual ground rent.",
    vve: "Owners' Association (Vereniging van Eigenaren) — the building's homeowners association; manages maintenance and collective decisions.",
    verduurzaming: "Sustainability project — energy improvement of the building (insulation, solar panels, etc.).",
    derrama: "Special levy — one-off payment the VvE can demand for major works not covered by the reserve fund.",
    reserve_fund: "Reserve fund — money accumulated by the VvE for future building maintenance and repairs.",
    splitsingsreglement: "Split regulations — legal rules on the use of common and private parts of the building.",
    huishoudelijk_reglement: "House rules — coexistence norms: noise, works, pets, waste, etc.",
    taxatie: "Appraisal / valuation — official property valuation by a certified appraiser, required for the mortgage.",
    bank_guarantee: "Bank guarantee — guarantee issued by the bank covering 10% of the price if the purchase cannot be completed.",
    waiver: "Condition waiver — document confirming the financing condition is lifted and the purchase proceeds.",
    boiler: "Gas boiler — central heating and hot water system, very common in the Netherlands.",
    meterstanden: "Meter readings — the exact gas, electricity and water readings at the moment of handover.",
    mechanische_ventilatie: "Mechanical ventilation — system that automatically extracts stale air from bathroom, toilet and kitchen.",
    co_detector: "Carbon monoxide detector — mandatory alarm near the boiler that detects this odourless, lethal gas.",
    cilinderslot: "Lock cylinder — the replaceable part of the lock; changing it ensures no one else has a copy of the key.",
    beneden: "Ground floor / downstairs.",
    woonkamer: "Living room.",
    hal: "Hallway / entrance.",
    vlak_egaal: "Flat and level — condition of the existing floor to install floating flooring without levelling.",
    akoestiek_norm: "Acoustic standard — impact insulation level in decibels, required by the VvE for floating floors.",
    fermacell: "Fibre-gypsum board used as a substructure for floors with acoustic insulation.",
    underlay: "Cushioning layer under floating flooring that absorbs impact noise.",
    multiplank: "Multi-plank boards — effect more rustic/natural than narrow strips.",
    visgraat: "Herringbone pattern — diagonal floor laying in a V shape.",
    batchnummer: "Production lot number — must be the same for all flooring to ensure uniform colour and tone.",
    marmerlook: "Marble look — ceramic tile with marble veining, lower quality and price than real marble.",
    metod: "IKEA's most complete and customisable modular kitchen system.",
    backsplash: "Wall cladding behind the countertop, protects against splashes.",
    balkon: "Balcony.",
    ventilatie: "Ventilation.",
    single_phase: "Single-phase — standard residential electrical installation; has total power limitations.",
    pladur: "Drywall / plasterboard — gypsum and cardboard panel for building light partitions and walls.",
    metal_studs: "Metal profiles — galvanised steel frame onto which drywall boards are screwed.",
    high_glass: "Fixed glass or glazed door in the upper part of a wall, letting in light without losing privacy.",
    inloopkast: "Walk-in closet — open wardrobe room you can walk into.",
    slaapkamer: "Bedroom.",
    ethernet: "High-speed data cable — more stable than WiFi for working from home.",
    landskrona: "IKEA sofa with fabric upholstery.",
    gemeente: "Municipality — where you register when changing address in the Netherlands.",
    digid: "Dutch digital identity — single login for all government online services.",
    bsn: "Dutch tax/citizen identification number (Burgerservicenummer).",
  }
};

// ---- TRANSLATIONS ----
const TRANSLATIONS = {
  es: {
    subtitle: "Todo lo que hay que hacer antes, durante y después de la entrega.",
    progress: "Progreso general",
    footer_sub: "Una casa, un proyecto, dos genios.",
    pinterest: "Referencias Pinterest:",
    s1title: "Papeles, contrato y notario",
    s1desc: "Contrato, cláusulas, notario, VvE y documentos legales.",
    s1sub1: "Contrato de compra",
    s1sub2: "Notario",
    s1sub3: "VvE y documentos legales",
    s2title: "Financiero, hipoteca y seguros",
    s2desc: "Hipoteca, taxatie, bank guarantee, seguro de vida y presupuesto total.",
    s2sub1: "Hipoteca",
    s2sub2: "Taxatie y bank guarantee",
    s2sub3: "Seguro de vida",
    s2sub4: "Presupuesto total",
    s3title: "Técnico, inspección y reparaciones",
    s3desc: "Informe técnico, reparaciones al vendedor, final inspection y seguridad básica.",
    s3sub1: "Informe técnico",
    s3sub2: "Reparaciones a pedir al vendedor",
    s3sub3: "Final inspection",
    s3sub4: "Ventilación mecánica",
    s3sub5: "Seguridad básica",
    s4sub4: "Cocina — IKEA",
    s4sub5: "Baño de arriba",
    s4sub5b: "Baño / toilet de abajo",
    s5sub3: "Oficina beneden (slaapkamer 1)",
    s5sub5: "Balcón",
    s4title: "Remodelación inicial",
    s4desc: "Suelo, cocina, baño, pintura, pared acústica y referencias de estilo.",
    s4sub1: "Estrategia general",
    s4sub2: "Suelo beneden (~55 m²)",
    s4sub3: "Suelo de cocina",
    s4sub4: "Cocina",
    s4sub5: "Baño actual",
    s4sub6: "Pared acústica / Oficina 2",
    s4sub7: "Pintura",
    s5title: "Muebles, storage y santuario",
    s5desc: "Dormitorio, living, oficina, entrada y estrategia de storage.",
    s5sub1: "Dormitorio principal",
    s5sub2: "Living",
    s5sub3: "Oficina beneden",
    s5sub4: "Entrada / hal",
    s6title: "Mudanza y transición",
    s6desc: "Marnixkade, movers, registro y administración post-mudanza.",
    s6sub1: "Marnixkade",
    s6sub2: "Mudanza",
    s6sub3: "Registro y administración",
    t_revisar_contrato: "Revisar la versión final del contrato / koopovereenkomst.",
    t_confirmar_fecha: "Confirmar que la fecha estimada de entrega sea alrededor del 15 de agosto de 2026.",
    t_financing_condition: "Revisar que la financing condition refleje la financiación real: ~€630.000 + bouwdepot €30.000.",
    t_clausulas: "Revisar cláusulas clave: non-self-occupancy, age clause, asbestos, foundation waiver, owner-occupancy, resale restriction, fire-rated ceiling, splitsingstekening.",
    t_source_funds: "Completar source of funds form y PEP statement.",
    t_embajador: "Preguntar en privado al notario sobre el caso del tío embajador (WWFT/KYC).",
    t_firma_notario: "Confirmar documentos a firmar, monto a transferir y nota van afrekening antes de la transferencia.",
    t_erfpacht: "Confirmar erfpacht: canon prepaid hasta 31 dic 2059 y posibles costes por cambio de uso.",
    t_vve_costes: "Pedir confirmación escrita de VvE sobre costes del proyecto de sostenibilidad / verduurzaming, préstamo colectivo, derrama y cuota mensual.",
    t_vve_reserve: "Pedir estado actualizado del reserve fund y confirmación del share del vendedor.",
    t_vve_normas: "Confirmar normas exactas de suelo acústico, permisos para obras, horarios, ruido y uso de escalera.",
    t_monto_hipoteca: "Confirmar con Edwin monto objetivo: ~€630.000 + €30.000 bouwdepot y mejores condiciones bancarias.",
    t_simulaciones: "Revisar simulaciones con y sin bouwdepot: tipo de interés, cuota mensual, duración fija.",
    t_bouwdepot: "Confirmar qué obras cubre el bouwdepot: suelo, cocina, electricidad, pladur acústico, baño, mejoras energéticas.",
    t_taxatie: "Confirmar que la taxatie considere valor post-reforma si hay bouwdepot. Preparar lista de obras justificadas.",
    t_bank_guarantee: "Confirmar deadline, monto (10% del precio), coste y coordinación de la bank guarantee con notario.",
    t_seguro_vida: "Revisar oferta TAF (€300k/€400k/€500k) y decidir cobertura. Confirmar condiciones, cancelación y cuestionario médico.",
    t_presupuesto_compra: "Armar presupuesto completo de compra: precio, notario, taxatie, advisor, bank guarantee, mudanza, renovación, muebles, buffer.",
    t_presupuesto_fases: "Armar presupuesto de obras por fases: antes de mudanza / 3 meses / 1 año / 4-5 años / largo plazo.",
    t_informe_guardar: "Guardar informe técnico final y compartirlo con Edwin y contratistas relevantes.",
    t_informe_revision: "Revisar con Edwin si algo del informe justifica pedir reparación o compensación al vendedor.",
    t_boiler_factura: "Pedir factura reciente de mantenimiento de boiler antes de la transferencia.",
    t_reparaciones_ducha: "Pedir reparación de juntas/sellado y baldosa rota de ducha, o compensación de €650.",
    t_final_inspection: "Revisar boiler, calefacción, agua, electricidad, ventanas, baño, medidores, llaves. Sacar fotos y videos. Confirmar que la casa esté vacía.",
    t_detectores: "Comprar e instalar detectores de humo en cada planta y CO detector cerca del boiler.",
    t_cerraduras: "Revisar y cambiar cilindros de cerraduras si hace falta.",
    t_estrategia: "Definir qué se hace antes de mudanza (suelo beneden, cocina, pintura, seguridad) y qué puede esperar.",
    t_suelo_medidas: "Confirmar medidas exactas de woonkamer, oficina beneden y hal. Verificar si el suelo está vlak en egaal.",
    t_suelo_vve: "Confirmar norma VvE de acústica exacta (dB/ΔLlin/ΔLw) y si el sistema debe aprobarse antes de instalar.",
    t_suelo_presupuestos: "Pedir presupuestos para subestructura: Fermacell, corcho acústico, underlay tipo Firstfloor Goldline. Comparar altura, precio, plazo.",
    t_suelo_showroom: "buscar inspiración de color y acabado de suelo (roble claro, multiplank, visgraat, tono cálido no gris)",
    t_suelo_muestras: "Pedir muestras grandes para ver con luz real en la casa. Confirmar misma partida (zelfde batchnummer) para 55 m².",
    t_cocina_azulejo_ref: "buscar azulejos off-white, ivory, limestone look, travertine, marmerlook cálido (60x60 / 60x120)",
    t_cocina_azulejo_tienda: "Ver azulejos en vivo. Confirmar mismo tono y calibre. Coordinar transición con suelo de woonkamer.",
    t_cocina_ref: "buscar cocinas IKEA METOD off-white/shaker, backsplash verde menta/sage, electrodomésticos integrados",
    t_cocina_medidas: "Subir fotos y medidas: largo, ancho, altura, ventana, puerta balcón, agua/gas/ventilación. Diseñar cocina IKEA METOD.",
    t_cocina_electro: "Confirmar que la instalación eléctrica single-phase alcanza para inducción, horno, lavavajillas. Decidir electrodomésticos.",
    t_cocina_presupuesto: "Pedir presupuesto IKEA y de instalación. Confirmar disponibilidad, plazos y garantías.",
    t_banio_reparaciones: "Reparar juntas/sellado ducha y baldosa rota. Mejorar ventilación. Cambiar espejo, luz y accesorios si es barato.",
    t_pared_ref: "buscar separaciones con pladur acústico, puertas sólidas y high glass / transom en livingrooms",
    t_pared_vve: "Consultar VvE si se requiere permiso para pared de pladur. Pedir presupuesto: metal studs + mineral wool + doble placa.",
    t_pintura_ref: "buscar interiores en warm white / ivory / off-white con luz natural cálida",
    t_pintura_mateo: "Pedir presupuesto a Mateo. Confirmar si se pinta antes o después del suelo y cómo protegerlo.",
    t_dormitorio_ref: "buscar dormitorios-santuario con telas, luces cálidas, cortinas de techo, estilo quiet luxury",
    t_dormitorio_cama: "Planificar cama 160 cm (IKEA Mandal u otra con storage). Medir y diseñar walk-in closet.",
    t_living_ref: "buscar livings estilo 1920s Balanced Cozy / Quiet Luxury con proyector, plantas y alfombra azul/malva",
    t_living_layout: "Ubicar IKEA LANDSKRONA verde claro y alfombra azul/turquesa/malva. Definir zona proyector, lámparas y plantas.",
    t_oficina_layout: "Ubicar escritorio sit-stand de Filippo. Alfombra Anders en oficina. Definir storage cerrado e iluminación de trabajo.",
    t_entrada_ref: "buscar entradas estrechas con zapatero de madera/vintage, perchero, espejo y bandeja de llaves",
    t_entrada_zapatero: "Buscar zapatero estrecho, cálido, de madera o vintage. Medir profundidad junto al radiador.",
    t_marnixkade: "Confirmar fecha hasta la que conservamos el cuarto. Decidir si mantenerlo algunas semanas durante las obras. Planear ritual de cierre.",
    t_movers: "Pedir presupuestos de movers. Confirmar lift, escalera y permisos de estacionamiento.",
    t_caja_primera_noche: "Preparar caja de primera noche: sábanas, toallas, cargadores, medicinas, documentos, café/té, herramientas básicas, detector CO/humo.",
    t_coordinar_mudanza: "Coordinar fecha de mudanza con instalación de suelo y cocina. Empacar por zonas y etiquetar cajas.",
    t_registro: "Registrarse en la nueva dirección en gemeente dentro del plazo contractual.",
    t_cambio_direccion: "Cambiar dirección en banco, trabajo, seguros, médico/farmacia. Contratar energía, internet y agua.",
    t_documentos_digitales: "Guardar todos los documentos digitales en carpeta organizada. Confirmar contactos VvE.",
  },
  it: {
    subtitle: "Tutto quello da fare prima, durante e dopo la consegna.",
    progress: "Progresso generale",
    footer_sub: "Una casa, un progetto, due geni.",
    pinterest: "Riferimenti Pinterest:",
    s1title: "Documenti, contratto e notaio",
    s1desc: "Contratto, clausole, notaio, VvE e documenti legali.",
    s1sub1: "Contratto di acquisto",
    s1sub2: "Notaio",
    s1sub3: "VvE e documenti legali",
    s2title: "Finanze, mutuo e assicurazioni",
    s2desc: "Mutuo, taxatie, bank guarantee, assicurazione vita e budget totale.",
    s2sub1: "Mutuo",
    s2sub2: "Taxatie e bank guarantee",
    s2sub3: "Assicurazione vita",
    s2sub4: "Budget totale",
    s3title: "Tecnico, ispezione e riparazioni",
    s3desc: "Rapporto tecnico, riparazioni al venditore, ispezione finale e sicurezza base.",
    s3sub1: "Rapporto tecnico",
    s3sub2: "Riparazioni da chiedere al venditore",
    s3sub3: "Ispezione finale",
    s3sub4: "Ventilazione meccanica",
    s3sub5: "Sicurezza base",
    s4sub4: "Cucina — IKEA",
    s4sub5: "Bagno di sopra",
    s4sub5b: "Bagno / toilet di sotto",
    s5sub3: "Ufficio piano terra (slaapkamer 1)",
    s5sub5: "Balcone",
    s4title: "Ristrutturazione iniziale",
    s4desc: "Pavimento, cucina, bagno, pittura, parete acustica e riferimenti di stile.",
    s4sub1: "Strategia generale",
    s4sub2: "Pavimento piano terra (~55 m²)",
    s4sub3: "Pavimento cucina",
    s4sub4: "Cucina",
    s4sub5: "Bagno attuale",
    s4sub6: "Parete acustica / Ufficio 2",
    s4sub7: "Pittura",
    s5title: "Mobili, storage e santuario",
    s5desc: "Camera da letto, soggiorno, ufficio, ingresso e strategia di storage.",
    s5sub1: "Camera da letto principale",
    s5sub2: "Soggiorno",
    s5sub3: "Ufficio piano terra",
    s5sub4: "Ingresso / hal",
    s6title: "Trasloco e transizione",
    s6desc: "Marnixkade, trasloco, registrazione e amministrazione post-trasloco.",
    s6sub1: "Marnixkade",
    s6sub2: "Trasloco",
    s6sub3: "Registrazione e amministrazione",
    t_revisar_contrato: "Rivedere la versione finale del contratto / koopovereenkomst.",
    t_confirmar_fecha: "Confermare che la data di consegna prevista sia intorno al 15 agosto 2026.",
    t_financing_condition: "Verificare che la financing condition rispecchi il finanziamento reale: ~€630.000 + bouwdepot €30.000.",
    t_clausulas: "Rivedere le clausole chiave: non-self-occupancy, age clause, asbestos, foundation waiver, owner-occupancy, resale restriction, fire-rated ceiling, splitsingstekening.",
    t_source_funds: "Completare il source of funds form e la PEP statement.",
    t_embajador: "Chiedere in privato al notaio del caso dello zio ambasciatore (WWFT/KYC).",
    t_firma_notario: "Confermare documenti da firmare, importo da trasferire e nota van afrekening prima del passaggio.",
    t_erfpacht: "Confermare erfpacht: canone prepagato fino al 31 dic 2059 e possibili costi per cambio d'uso.",
    t_vve_costes: "Richiedere conferma scritta dalla VvE sui costi del progetto di sostenibilità, prestito collettivo, deroga e quota mensile.",
    t_vve_reserve: "Richiedere lo stato aggiornato del fondo riserva e conferma della quota del venditore.",
    t_vve_normas: "Confermare le norme esatte per il pavimento acustico, permessi per lavori, orari, rumore e uso delle scale.",
    t_monto_hipoteca: "Confermare con Edwin l'importo obiettivo: ~€630.000 + €30.000 bouwdepot e le migliori condizioni bancarie.",
    t_simulaciones: "Rivedere le simulazioni con e senza bouwdepot: tasso d'interesse, rata mensile, durata fissa.",
    t_bouwdepot: "Confermare cosa copre il bouwdepot: pavimento, cucina, elettricità, cartongesso acustico, bagno, miglioramenti energetici.",
    t_taxatie: "Confermare che la taxatie consideri il valore post-lavori se c'è bouwdepot. Preparare lista lavori giustificativi.",
    t_bank_guarantee: "Confermare scadenza, importo (10% del prezzo), costo e coordinamento della bank guarantee con il notaio.",
    t_seguro_vida: "Rivedere offerta TAF (€300k/€400k/€500k) e decidere la copertura. Confermare condizioni, recesso e questionario medico.",
    t_presupuesto_compra: "Costruire budget completo di acquisto: prezzo, notaio, taxatie, advisor, bank guarantee, trasloco, ristrutturazione, mobili, buffer.",
    t_presupuesto_fases: "Costruire budget lavori per fasi: prima del trasloco / 3 mesi / 1 anno / 4-5 anni / lungo termine.",
    t_informe_guardar: "Salvare il rapporto tecnico finale e condividerlo con Edwin e i contractor rilevanti.",
    t_informe_revision: "Verificare con Edwin se qualcosa nel rapporto giustifica richiedere riparazioni o compensazione al venditore.",
    t_boiler_factura: "Richiedere fattura recente di manutenzione della caldaia prima del passaggio.",
    t_reparaciones_ducha: "Richiedere riparazione di fughe/sigillatura e piastrella rotta della doccia, o compensazione di €650.",
    t_final_inspection: "Verificare caldaia, riscaldamento, acqua, elettricità, finestre, bagno, contatori, chiavi. Scattare foto e video. Confermare che la casa sia vuota.",
    t_detectores: "Acquistare e installare rilevatori di fumo ad ogni piano e rilevatore CO vicino alla caldaia.",
    t_cerraduras: "Verificare e cambiare le serrature se necessario.",
    t_estrategia: "Definire cosa fare prima del trasloco (pavimento, cucina, pittura, sicurezza) e cosa può aspettare.",
    t_suelo_medidas: "Confermare le misure esatte di woonkamer, ufficio piano terra e ingresso. Verificare se il pavimento è vlak en egaal.",
    t_suelo_vve: "Confermare la norma VvE acustica esatta (dB/ΔLlin/ΔLw) e se il sistema va approvato prima dell'installazione.",
    t_suelo_presupuestos: "Richiedere preventivi per la sottostruttura: Fermacell, sughero acustico, underlay tipo Firstfloor Goldline. Confrontare altezza, prezzo, tempi.",
    t_suelo_showroom: "cercare ispirazione di colore e finitura pavimento (rovere chiaro, multiplank, visgraat, tono caldo non grigio)",
    t_suelo_muestras: "Richiedere campioni grandi da vedere con la luce reale in casa. Confermare stesso lotto (zelfde batchnummer) per 55 m².",
    t_cocina_azulejo_ref: "cercare piastrelle off-white, ivory, limestone look, travertine, marmerlook caldo (60x60 / 60x120)",
    t_cocina_azulejo_tienda: "Vedere le piastrelle di persona. Confermare stessa tinta e calibro. Coordinare la transizione con il pavimento del soggiorno.",
    t_cocina_ref: "cercare cucine IKEA METOD off-white/shaker, backsplash verde menta/salvia, elettrodomestici integrati",
    t_cocina_medidas: "Caricare foto e misure: lunghezza, larghezza, altezza, finestra, porta balcone, acqua/gas/ventilazione. Progettare cucina IKEA METOD.",
    t_cocina_electro: "Confermare che l'impianto elettrico monofase regge induzione, forno e lavastoviglie. Scegliere gli elettrodomestici.",
    t_cocina_presupuesto: "Richiedere preventivo IKEA e di installazione. Confermare disponibilità, tempi e garanzie.",
    t_banio_reparaciones: "Riparare fughe/sigillatura doccia e piastrella rotta. Migliorare ventilazione. Cambiare specchio, luce e accessori se economico.",
    t_pared_ref: "cercare divisori con cartongesso acustico, porte solide e vetrate / transom nei soggiorni",
    t_pared_vve: "Consultare la VvE se serve permesso per parete in cartongesso. Richiedere preventivo: profili metallici + lana minerale + doppia lastra.",
    t_pintura_ref: "cercare interni in warm white / ivory / off-white con luce naturale calda",
    t_pintura_mateo: "Richiedere preventivo a Mateo. Confermare se si dipinge prima o dopo il pavimento e come proteggerlo.",
    t_dormitorio_ref: "cercare camere-santuario con tessuti, luci calde, tende a soffitto, stile quiet luxury",
    t_dormitorio_cama: "Pianificare letto 160 cm (IKEA Mandal o altro con storage). Misurare e progettare walk-in closet.",
    t_living_ref: "cercare soggiorni stile 1920s Balanced Cozy / Quiet Luxury con proiettore, piante e tappeto azzurro/malva",
    t_living_layout: "Posizionare IKEA LANDSKRONA verde chiaro e tappeto azzurro/turchese/malva. Definire zona proiettore, lampade e piante.",
    t_oficina_layout: "Posizionare scrivania sit-stand di Filippo. Tappeto Anders nell'ufficio. Definire storage chiuso e illuminazione da lavoro.",
    t_entrada_ref: "cercare ingressi stretti con scarpiera in legno/vintage, appendiabiti, specchio e vassoio porta chiavi",
    t_entrada_zapatero: "Cercare scarpiera stretta, calda, in legno o vintage. Misurare la profondità disponibile vicino al radiatore.",
    t_marnixkade: "Confermare fino a quando teniamo la stanza. Decidere se mantenerla alcune settimane durante i lavori. Pianificare rituale di chiusura.",
    t_movers: "Richiedere preventivi per il trasloco. Confermare ascensore, scala e permessi di parcheggio.",
    t_caja_primera_noche: "Preparare la scatola della prima notte: lenzuola, asciugamani, caricatori, medicine, documenti, caffè/tè, attrezzi base, rilevatore CO/fumo.",
    t_coordinar_mudanza: "Coordinare la data di trasloco con l'installazione del pavimento e della cucina. Fare i pacchi per stanza e etichettare.",
    t_registro: "Registrarsi al nuovo indirizzo presso il gemeente entro il termine contrattuale.",
    t_cambio_direccion: "Cambiare indirizzo in banca, lavoro, assicurazioni, medico/farmacia. Attivare energia, internet e acqua.",
    t_documentos_digitales: "Salvare tutti i documenti digitali in una cartella organizzata. Confermare i contatti VvE.",
  },
  en: {
    subtitle: "Everything to do before, during and after the transfer.",
    progress: "Overall progress",
    footer_sub: "One house, one project, two genies.",
    pinterest: "Pinterest references:",
    s1title: "Paperwork, contract & notary",
    s1desc: "Contract, clauses, notary, VvE and legal documents.",
    s1sub1: "Purchase agreement",
    s1sub2: "Notary",
    s1sub3: "VvE and legal documents",
    s2title: "Finances, mortgage & insurance",
    s2desc: "Mortgage, taxatie, bank guarantee, life insurance and full budget.",
    s2sub1: "Mortgage",
    s2sub2: "Taxatie and bank guarantee",
    s2sub3: "Life insurance",
    s2sub4: "Full budget",
    s3title: "Technical, inspection & repairs",
    s3desc: "Technical report, repairs from seller, final inspection and basic safety.",
    s3sub1: "Technical report",
    s3sub2: "Repairs to request from seller",
    s3sub3: "Final inspection",
    s3sub4: "Mechanical ventilation",
    s3sub5: "Basic safety",
    s4sub4: "Kitchen — IKEA",
    s4sub5: "Upstairs bathroom",
    s4sub5b: "Downstairs bathroom / toilet",
    s5sub3: "Ground floor office (slaapkamer 1)",
    s5sub5: "Balcony",
    s4title: "Initial renovation",
    s4desc: "Floors, kitchen, bathroom, paint, acoustic wall and style references.",
    s4sub1: "General strategy",
    s4sub2: "Ground floor (~55 m²)",
    s4sub3: "Kitchen floor",
    s4sub4: "Kitchen",
    s4sub5: "Current bathroom",
    s4sub6: "Acoustic wall / Office 2",
    s4sub7: "Paint",
    s5title: "Furniture, storage & sanctuary",
    s5desc: "Bedroom, living room, office, hallway and storage strategy.",
    s5sub1: "Master bedroom",
    s5sub2: "Living room",
    s5sub3: "Ground floor office",
    s5sub4: "Entrance / hal",
    s6title: "Moving & transition",
    s6desc: "Marnixkade, movers, registration and post-move admin.",
    s6sub1: "Marnixkade",
    s6sub2: "Moving",
    s6sub3: "Registration and admin",
    t_revisar_contrato: "Review the final version of the purchase agreement / koopovereenkomst.",
    t_confirmar_fecha: "Confirm that the estimated transfer date is around 15 August 2026.",
    t_financing_condition: "Check that the financing condition reflects the real financing: ~€630,000 + bouwdepot €30,000.",
    t_clausulas: "Review key clauses: non-self-occupancy, age clause, asbestos, foundation waiver, owner-occupancy, resale restriction, fire-rated ceiling, splitsingstekening.",
    t_source_funds: "Complete the source of funds form and PEP statement.",
    t_embajador: "Ask the notary privately about the uncle ambassador case (WWFT/KYC).",
    t_firma_notario: "Confirm documents to sign, amount to transfer and nota van afrekening before the transfer.",
    t_erfpacht: "Confirm erfpacht: canon prepaid until 31 Dec 2059 and possible costs for change of use.",
    t_vve_costes: "Request written confirmation from VvE on costs of the sustainability project, collective loan, special levy and monthly fee.",
    t_vve_reserve: "Request updated reserve fund status and confirmation of seller's share.",
    t_vve_normas: "Confirm exact VvE rules on acoustic floors, permits for works, working hours, noise and stairwell use.",
    t_monto_hipoteca: "Confirm with Edwin the target amount: ~€630,000 + €30,000 bouwdepot and best bank conditions.",
    t_simulaciones: "Review simulations with and without bouwdepot: interest rate, monthly payment, fixed period.",
    t_bouwdepot: "Confirm what works bouwdepot covers: floor, kitchen, electrics, acoustic drywall, bathroom, energy improvements.",
    t_taxatie: "Confirm taxatie accounts for post-renovation value if bouwdepot applies. Prepare justified works list.",
    t_bank_guarantee: "Confirm deadline, amount (10% of price), cost and coordination of bank guarantee with notary.",
    t_seguro_vida: "Review TAF offer (€300k/€400k/€500k) and decide coverage. Confirm conditions, cancellation and medical questionnaire.",
    t_presupuesto_compra: "Build full purchase budget: price, notary, taxatie, advisor, bank guarantee, moving, renovation, furniture, buffer.",
    t_presupuesto_fases: "Build phased works budget: before moving / 3 months / 1 year / 4-5 years / long term.",
    t_informe_guardar: "Save final technical report and share with Edwin and relevant contractors.",
    t_informe_revision: "Review with Edwin whether anything in the report justifies requesting repairs or compensation from the seller.",
    t_boiler_factura: "Request recent boiler maintenance invoice before the transfer.",
    t_reparaciones_ducha: "Request repair of shower grout/sealing and broken tile, or €650 compensation.",
    t_final_inspection: "Check boiler, heating, water, electricity, windows, bathroom, meters, keys. Take photos and videos. Confirm house is empty.",
    t_detectores: "Buy and install smoke detectors on each floor and CO detector near the boiler.",
    t_cerraduras: "Check and replace lock cylinders if needed.",
    t_estrategia: "Define what to do before moving (ground floor, kitchen, paint, safety) and what can wait.",
    t_suelo_medidas: "Confirm exact measurements of woonkamer, ground floor office and hallway. Check if floor is vlak en egaal.",
    t_suelo_vve: "Confirm exact VvE acoustic standard (dB/ΔLlin/ΔLw) and whether the system must be approved before installation.",
    t_suelo_presupuestos: "Request quotes for substructure: Fermacell, acoustic cork, underlay like Firstfloor Goldline. Compare height, price, lead time.",
    t_suelo_showroom: "search for floor color and finish inspiration (light oak, multiplank, herringbone, warm non-grey tones)",
    t_suelo_muestras: "Request large samples to see under real light in the house. Confirm same batch (zelfde batchnummer) for 55 m².",
    t_cocina_azulejo_ref: "search for off-white, ivory, limestone look, travertine, warm marble-look tiles (60x60 / 60x120)",
    t_cocina_azulejo_tienda: "See tiles in person. Confirm same shade and calibre. Coordinate transition with living room floor.",
    t_cocina_ref: "search for IKEA METOD off-white/shaker kitchens, sage/mint backsplash, integrated appliances",
    t_cocina_medidas: "Upload photos and measurements: length, width, height, window, balcony door, water/gas/ventilation. Design IKEA METOD kitchen.",
    t_cocina_electro: "Confirm single-phase electrical can handle induction, oven and dishwasher simultaneously. Choose appliances.",
    t_cocina_presupuesto: "Request IKEA and installation quotes. Confirm availability, lead times and warranties.",
    t_banio_reparaciones: "Repair shower grout/sealing and broken tile. Improve ventilation. Replace mirror, light and accessories if cheap.",
    t_pared_ref: "search for acoustic drywall partitions, solid doors and high glass / transom in living rooms",
    t_pared_vve: "Check with VvE if permit is needed for drywall partition. Request quote: metal studs + mineral wool + double board.",
    t_pintura_ref: "search for warm white / ivory / off-white interiors with warm natural light",
    t_pintura_mateo: "Request quote from Mateo. Confirm whether to paint before or after floor and how to protect it.",
    t_dormitorio_ref: "search for sanctuary bedrooms with fabrics, warm lights, ceiling curtains, quiet luxury style",
    t_dormitorio_cama: "Plan 160 cm bed (IKEA Mandal or other with storage). Measure and design walk-in closet.",
    t_living_ref: "search for 1920s Balanced Cozy / Quiet Luxury living rooms with projector, plants and blue/mauve rug",
    t_living_layout: "Position IKEA LANDSKRONA in light green and blue/turquoise/mauve rug. Define projector zone, lamps and plants.",
    t_oficina_layout: "Position Filippo's sit-stand desk. Anders rug in office. Define closed storage and task lighting.",
    t_entrada_ref: "search for narrow hallways with wood/vintage shoe rack, coat rack, mirror and key tray",
    t_entrada_zapatero: "Find a narrow, warm, wood or vintage shoe rack. Measure available depth next to radiator.",
    t_marnixkade: "Confirm how long we keep the room. Decide whether to keep it a few weeks during works. Plan closing ritual.",
    t_movers: "Request moving quotes. Confirm lift access, stairwell and parking permits.",
    t_caja_primera_noche: "Pack first-night box: sheets, towels, chargers, medicine, documents, coffee/tea, basic tools, CO/smoke detector.",
    t_coordinar_mudanza: "Coordinate moving date with floor and kitchen installation. Pack by room and label boxes.",
    t_registro: "Register at new address with the gemeente within the contractual deadline.",
    t_cambio_direccion: "Update address at bank, work, insurance, doctor/pharmacy. Set up energy, internet and water.",
    t_documentos_digitales: "Save all digital documents in an organised folder. Confirm VvE contact details.",
  }
};

// ---- STATE ----
let currentLang = localStorage.getItem('zaan-lang') || 'es';
let checkStates = JSON.parse(localStorage.getItem('zaan-checks') || '{}');
let ownerOverrides = {};  // always start fresh — no saved owner assignments
let activeFilters = new Set(['belen', 'filippo', 'together', 'unassigned']);

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  restoreChecks();
  updateAllProgress();
  setActiveLangBtn(currentLang);
  applyFilters();
  initCountdown();
  initTooltips();

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      currentLang = lang;
      localStorage.setItem('zaan-lang', lang);
      applyLanguage(lang);
      setActiveLangBtn(lang);
    });
  });

  // Checkboxes
  document.querySelectorAll('.task-check').forEach((cb, idx) => {
    cb.addEventListener('change', () => {
      checkStates[idx] = cb.checked;
      localStorage.setItem('zaan-checks', JSON.stringify(checkStates));
      updateAllProgress();
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      if (activeFilters.has(f)) {
        if (activeFilters.size > 1) {
          activeFilters.delete(f);
          btn.classList.remove('active');
        }
      } else {
        activeFilters.add(f);
        btn.classList.add('active');
      }
      applyFilters();
    });
  });

  // Owner badge dropdowns
  document.addEventListener('click', (e) => {
    const badge = e.target.closest('.owner-badge');
    const dropOpt = e.target.closest('.drop-opt');
    const wrap = e.target.closest('.owner-wrap');

    if (dropOpt) {
      const newOwner = dropOpt.dataset.ownerVal;
      const taskItem = dropOpt.closest('.task-item');
      taskItem.dataset.owner = newOwner;
      const btn = taskItem.querySelector('.owner-badge');
      btn.textContent = ownerEmoji(newOwner);
      btn.title = ownerTitle(newOwner);
      dropOpt.closest('.owner-wrap').classList.remove('open');
      applyFilters();
      return;
    }

    if (badge) {
      const thisWrap = badge.closest('.owner-wrap');
      document.querySelectorAll('.owner-wrap.open').forEach(w => {
        if (w !== thisWrap) w.classList.remove('open');
      });
      thisWrap.classList.toggle('open');
      return;
    }

    if (!wrap) {
      document.querySelectorAll('.owner-wrap.open').forEach(w => w.classList.remove('open'));
    }
  });

  // Copy button
  document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
});

function ownerEmoji(owner) {
  if (owner === 'belen') return '🧞‍♀️';
  if (owner === 'filippo') return '🧞';
  if (owner === 'together') return '💕';
  return '✪';
}

function ownerTitle(owner) {
  if (owner === 'belen') return 'Belén';
  if (owner === 'filippo') return 'Filippo';
  if (owner === 'together') return 'Juntos';
  return 'Sin asignar';
}

// ---- FILTERS ----
function applyFilters() {
  document.querySelectorAll('.task-item').forEach(item => {
    const owner = item.dataset.owner;
    item.style.display = activeFilters.has(owner) ? '' : 'none';
  });
  updateAllProgress();
}

// ---- COUNTDOWN ----
function initCountdown() {
  const target = new Date('2026-08-15T00:00:00');
  const start = new Date('2026-01-01T00:00:00');

  function update() {
    const now = new Date();
    const totalDays = Math.round((target - start) / 86400000);
    const remaining = Math.ceil((target - now) / 86400000);
    const elapsed = totalDays - remaining;
    const pct = Math.min(100, Math.max(0, Math.round((elapsed / totalDays) * 100)));

    document.getElementById('cdDays').textContent = remaining > 0 ? remaining : 0;
    document.getElementById('cdBar').style.width = pct + '%';
  }

  update();
  setInterval(update, 60000);
}

// ---- TOOLTIPS ----
function initTooltips() {
  const popup = document.getElementById('tipPopup');
  let hideTimer;

  document.querySelectorAll('.tip').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      clearTimeout(hideTimer);
      const key = el.dataset.tip;
      const tips = TOOLTIPS[currentLang] || TOOLTIPS['es'];
      const text = tips[key];
      if (!text) return;
      popup.textContent = text;
      popup.classList.add('visible');
      positionPopup(e);
    });

    el.addEventListener('mousemove', positionPopup);

    el.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => popup.classList.remove('visible'), 120);
    });
  });

  function positionPopup(e) {
    const x = e.clientX + 14;
    const y = e.clientY + 14;
    const pw = popup.offsetWidth || 240;
    const ph = popup.offsetHeight || 60;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    popup.style.left = (x + pw > vw - 8 ? x - pw - 20 : x) + 'px';
    popup.style.top  = (y + ph > vh - 8 ? y - ph - 20 : y) + 'px';
  }
}


// ---- COPY TO CLIPBOARD ----
function copyToClipboard() {
  const sections = document.querySelectorAll('.task-section');
  const lines = ['🏠 *Zaanstraat 314 · Tareas*', ''];

  sections.forEach(section => {
    const visibleTasks = Array.from(section.querySelectorAll('.task-item'))
      .filter(item => item.style.display !== 'none');

    if (visibleTasks.length === 0) return;

    const title = section.querySelector('.section-title').textContent.trim();
    const num = section.querySelector('.section-num')?.textContent.trim() || '';
    lines.push(`*${num} ${title}*`);

    visibleTasks.forEach(item => {
      const checked = item.querySelector('.task-check').checked;
      const text = item.querySelector('.task-text').textContent.trim();
      const owner = item.dataset.owner;
      const emoji = ownerEmoji(owner);
      const mark = checked ? '[x]' : '[ ]';
      lines.push(`${mark} ${emoji} ${text}`);
    });

    lines.push('');
  });

  const text = lines.join('\n').trim();

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copiar';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copiar';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ---- TOGGLE SECTION ----
function toggleSection(id) {
  const list = document.getElementById('list-' + id);
  const chev = document.getElementById('chev-' + id);
  const isOpen = list.classList.contains('open');

  if (isOpen) {
    list.classList.remove('open');
    chev.classList.remove('open');
  } else {
    list.classList.add('open');
    chev.classList.add('open');
  }
}

// ---- LANGUAGE ----
function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });
  document.documentElement.lang = lang;
}

function setActiveLangBtn(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ---- CHECKBOXES RESTORE ----
function restoreChecks() {
  document.querySelectorAll('.task-check').forEach((cb, idx) => {
    if (checkStates[idx]) {
      cb.checked = true;
    }
  });
}

// ---- PROGRESS ----
function updateAllProgress() {
  const sections = ['papeles', 'financiero', 'tecnico', 'remodelacion', 'muebles', 'mudanza'];
  let totalDone = 0;
  let totalAll = 0;

  sections.forEach(sectionId => {
    const boxes = document.querySelectorAll(`.task-check[data-section="${sectionId}"]`);
    const done = Array.from(boxes).filter(cb => cb.checked).length;
    const all = boxes.length;
    totalDone += done;
    totalAll += all;

    const pct = all > 0 ? Math.round((done / all) * 100) : 0;
    const bar = document.getElementById('bar-' + sectionId);
    const label = document.getElementById('pct-' + sectionId);
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
  });

  const globalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
  const globalBar = document.getElementById('globalBar');
  const globalLabel = document.getElementById('globalPct');
  if (globalBar) globalBar.style.width = globalPct + '%';
  if (globalLabel) globalLabel.textContent = globalPct + '%';
}
