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
    samenlevingscontract: "Contrato de convivencia ante notario para parejas no casadas. Regula aportes a la vivienda, cuenta conjunta, bienes, y protección ante desempleo, enfermedad o fallecimiento. No sustituye al testamento para bienes privados.",
    bsn: "Número de identificación fiscal holandés (Burgerservicenummer) — equivalente al NIE/TIN.",
    tipo_interes: "Porcentaje anual que cobra el banco por prestarte dinero. En Holanda las hipotecas suelen ser a tipo fijo por un período determinado; cuanto más largo el período, más alto suele ser el tipo.",
    cuota_mensual: "Lo que pagás al banco cada mes: incluye devolución del capital prestado (amortización) más los intereses. En Holanda se llama 'maandlast'.",
    periodo_fijo: "Años durante los cuales el tipo de interés no cambia. Al terminar ese período, el banco puede subir o bajar el tipo según el mercado. Opciones típicas: 10, 20 o 30 años.",
    taf: "TAF Verzekeringen — aseguradora holandesa especializada en seguros de vida vinculados a hipotecas (overlijdensrisicoverzekering). Ofrecen cobertura decreciente (baja junto a la deuda) o nivel fijo.",
    cuestionario_medico: "Formulario médico que pide la aseguradora para evaluar el riesgo antes de emitir el seguro de vida. Según las respuestas, pueden aceptar, cobrar más o excluir ciertas enfermedades.",
    overdrachtsbelasting: "Impuesto de transferencia holandés que se paga al comprar una propiedad. Para primeros compradores menores de 35 años que van a vivir en la casa: 0%. Para el resto: 2% del precio de compra. Se paga en la notaría el día de la firma.",
    hypotheekadviseur: "Asesor hipotecario independiente (como Edwin) que compara ofertas de distintos bancos y guía todo el proceso. En Holanda es habitual contratarlos; cobran honorarios fijos, no comisión del banco.",
    bouwkundige_keuring: "Inspección técnica del inmueble realizada por un perito (bouwkundige) antes de la compra. Evalúa el estado de la estructura, instalaciones, humedades y posibles defectos. El informe clasifica los problemas y estima el coste de las reparaciones.",
    mineral_wool: "Lana mineral (lana de roca o lana de vidrio) — material aislante que se coloca entre los perfiles metálicos de una pared de pladur. Reduce el paso del sonido entre habitaciones.",
    sit_stand: "Escritorio regulable en altura — permite trabajar de pie o sentado con el mismo mueble. Muy común en Países Bajos para el trabajo desde casa.",
    electricista: "Técnico certificado para instalaciones eléctricas. En Holanda, ciertos trabajos eléctricos deben hacerse por profesionales certificados (erkend installateur) por seguridad y para el seguro del hogar.",
    fontanero: "Técnico de fontanería (loodgieter en holandés). Necesario para mover o instalar tomas de agua, desagües, conexiones de lavaplatos o lavadora.",
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
    samenlevingscontract: "Contratto di convivenza dal notaio per coppie non sposate. Regola i contributi per la casa, il conto cointestato, i beni e la protezione in caso di disoccupazione, malattia o decesso. Non sostituisce il testamento per i beni privati.",
    bsn: "Numero di identificazione fiscale olandese (Burgerservicenummer).",
    tipo_interes: "Tasso d'interesse annuale che la banca addebita per il prestito. In Olanda i mutui sono generalmente a tasso fisso per un periodo determinato.",
    cuota_mensual: "Rata mensile del mutuo: include restituzione del capitale (ammortamento) più gli interessi. In olandese si chiama 'maandlast'.",
    periodo_fijo: "Anni in cui il tasso d'interesse non cambia. Al termine, la banca può modificarlo. Opzioni tipiche: 10, 20 o 30 anni.",
    taf: "TAF Verzekeringen — assicuratore olandese specializzato in assicurazioni vita collegate ai mutui. Offrono copertura decrescente (scende con il debito) o a importo fisso.",
    cuestionario_medico: "Questionario medico richiesto dall'assicuratore per valutare il rischio prima di emettere la polizza vita. Le risposte possono influire sul premio o sull'accettazione.",
    overdrachtsbelasting: "Imposta di trasferimento olandese pagata all'acquisto di un immobile. Per primi acquirenti under 35 che ci abiteranno: 0%. Per gli altri: 2% del prezzo. Si paga dal notaio il giorno della firma.",
    hypotheekadviseur: "Consulente ipotecario indipendente (come Edwin) che confronta le offerte delle banche e guida l'intero processo. In Olanda è comune assumerli; percepiscono onorari fissi, non commissioni dalla banca.",
    bouwkundige_keuring: "Ispezione tecnica dell'immobile effettuata da un perito prima dell'acquisto. Valuta la struttura, gli impianti, l'umidità e i difetti. Il rapporto classifica i problemi e stima i costi di riparazione.",
    mineral_wool: "Lana minerale (lana di roccia o lana di vetro) — materiale isolante posizionato tra i profili metallici di una parete in cartongesso. Riduce il passaggio del suono tra le stanze.",
    sit_stand: "Scrivania regolabile in altezza — permette di lavorare in piedi o seduti con lo stesso mobile. Molto comune nei Paesi Bassi per il lavoro da casa.",
    electricista: "Tecnico certificato per impianti elettrici. In Olanda certi lavori devono essere eseguiti da installatori certificati (erkend installateur).",
    fontanero: "Idraulico (loodgieter in olandese). Necessario per spostare o installare prese d'acqua, scarichi, connessioni di lavastoviglie o lavatrice.",
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
    samenlevingscontract: "Cohabitation agreement made before a notary for unmarried couples. Regulates contributions to the home, joint account, assets, and protection in case of unemployment, illness or death. Doesn't replace a will for private assets.",
    bsn: "Dutch tax/citizen identification number (Burgerservicenummer).",
    tipo_interes: "Annual interest rate the bank charges on your mortgage. In the Netherlands mortgages are usually at a fixed rate for a set period; the longer the period, the higher the rate tends to be.",
    cuota_mensual: "Monthly mortgage payment: includes repayment of the borrowed capital (amortisation) plus interest. In Dutch called 'maandlast'.",
    periodo_fijo: "Years during which the interest rate stays fixed. When it ends, the bank can adjust it to market rates. Typical options: 10, 20 or 30 years.",
    taf: "TAF Verzekeringen — Dutch insurer specialising in life insurance linked to mortgages (overlijdensrisicoverzekering). They offer decreasing cover (decreases with the debt) or fixed-amount cover.",
    cuestionario_medico: "Medical questionnaire the insurer requests to assess risk before issuing a life policy. Answers may affect the premium, lead to exclusions, or result in rejection.",
    overdrachtsbelasting: "Dutch property transfer tax paid when buying a home. For first-time buyers under 35 who will live there: 0%. For everyone else: 2% of the purchase price. Paid at the notary on signing day.",
    hypotheekadviseur: "Independent mortgage adviser (like Edwin) who compares offers from different banks and guides the whole process. In the Netherlands it's standard to hire one; they charge fixed fees, not bank commissions.",
    bouwkundige_keuring: "Technical building inspection carried out by a surveyor before purchase. Evaluates structure, installations, damp and defects. The report classifies problems and estimates repair costs.",
    mineral_wool: "Mineral wool (rock wool or glass wool) — insulating material placed between the metal studs of a drywall partition. Reduces sound transmission between rooms.",
    sit_stand: "Height-adjustable desk — lets you work standing or seated with the same piece of furniture. Very common in the Netherlands for home working.",
    electricista: "Certified electrician. In the Netherlands certain electrical works must be done by certified installers (erkend installateur) for safety and home insurance purposes.",
    fontanero: "Plumber (loodgieter in Dutch). Needed to move or install water points, drains, dishwasher or washing machine connections.",
  }
};

// ---- TRANSLATIONS ----
const TRANSLATIONS = {
  es: {
    subtitle: "Todo lo que hay que hacer antes, durante y después de la entrega.",
    progress: "Progreso general",
    s1title: "Papeles, contrato y notario",
    s1desc: "Contrato, cláusulas, notario, VvE y documentos legales.",
    s1sub1: "Contrato de compra",
    t_revisar_contrato: "Revisar la versión final del contrato / <span class=\"tip\" data-tip=\"koopovereenkomst\">koopovereenkomst</span>.",
    t_confirmar_fecha: "Confirmar que la fecha estimada de entrega (<span class=\"tip\" data-tip=\"overdracht\">overdracht</span>) sea alrededor del 15 de agosto de 2026.",
    t_financing_condition: "Revisar que la <span class=\"tip\" data-tip=\"financing_condition\">financing condition</span> refleje la financiación real: ~€630.000 + <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> €30.000.",
    t_clausulas: "Revisar cláusulas clave: <span class=\"tip\" data-tip=\"non_self_occupancy\">non-self-occupancy</span>, <span class=\"tip\" data-tip=\"age_clause\">age clause</span>, <span class=\"tip\" data-tip=\"asbestos_clause\">asbestos clause</span>, <span class=\"tip\" data-tip=\"foundation_waiver\">foundation waiver</span>, <span class=\"tip\" data-tip=\"eigenbewoning\">owner-occupancy</span>, <span class=\"tip\" data-tip=\"resale_restriction\">resale restriction</span>, <span class=\"tip\" data-tip=\"fire_rated_ceiling\">fire-rated ceiling</span>, <span class=\"tip\" data-tip=\"splitsingstekening\">splitsingstekening</span>.",
    t_eigenbewoning: "Confirmar condición de <span class=\"tip\" data-tip=\"eigenbewoning\">eigenbewoning</span> (ocupación propia) requerida para la hipoteca.",
    s1sub2: "Notario",
    t_source_funds: "Completar <span class=\"tip\" data-tip=\"source_of_funds\">source of funds form</span> y <span class=\"tip\" data-tip=\"pep_statement\">PEP statement</span>.",
    t_embajador: "Preguntar en privado al notario sobre el caso del tío embajador (<span class=\"tip\" data-tip=\"wwft\">WWFT</span>/<span class=\"tip\" data-tip=\"kyc\">KYC</span>).",
    t_firma_notario: "Confirmar documentos a firmar, monto a transferir y <span class=\"tip\" data-tip=\"nota_afrekening\">nota van afrekening</span> antes de la transferencia.",
    t_aktenpassage: "Confirmar fecha y hora exacta del <span class=\"tip\" data-tip=\"aktenpassage\">aktenpassage</span> (firma de escrituras en notaría).",
    t_erfpacht: "Confirmar <span class=\"tip\" data-tip=\"erfpacht\">erfpacht</span>: canon prepaid hasta 31 dic 2059 y posibles costes por cambio de uso.",
    s1sub3: "VvE y documentos legales",
    t_vve_costes: "Pedir confirmación escrita de <span class=\"tip\" data-tip=\"vve\">VvE</span> sobre costes del proyecto de sostenibilidad / <span class=\"tip\" data-tip=\"verduurzaming\">verduurzaming</span>, préstamo colectivo, <span class=\"tip\" data-tip=\"derrama\">derrama</span> y cuota mensual.",
    t_vve_reserve: "Pedir estado actualizado del <span class=\"tip\" data-tip=\"reserve_fund\">reserve fund</span> y confirmación del share del vendedor.",
    t_vve_normas: "Confirmar normas exactas de suelo acústico, permisos para obras, horarios, ruido y uso de escalera.",
    t_vve_reglement: "Pedir copia del <span class=\"tip\" data-tip=\"splitsingsreglement\">splitsingsreglement</span> y <span class=\"tip\" data-tip=\"huishoudelijk_reglement\">huishoudelijk reglement</span> completos.",
    s1sub4: "Samenlevingscontract y testamento",
    t_samenleving: "Leer y conversar la guía del <span class=\"tip\" data-tip=\"samenlevingscontract\">samenlevingscontract</span> antes de la cita con el notario: aportes a la entrada, cuenta conjunta, bienes, protección por desempleo/enfermedad/fallecimiento, y si conviene sumar testamento (testamenten) al mismo paquete.",
    guide_btn: "📖 Ver guía completa",
    s2title: "Financiero, hipoteca y seguros",
    s2desc: "Hipoteca, taxatie, bank guarantee, seguro de vida y presupuesto total.",
    s2sub1: "Hipoteca",
    t_monto_hipoteca: "Confirmar con Edwin monto objetivo: ~€630.000 + €30.000 <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> y mejores condiciones bancarias.",
    t_simulaciones: "Revisar simulaciones con y sin <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span>: <span class=\"tip\" data-tip=\"tipo_interes\">tipo de interés</span>, <span class=\"tip\" data-tip=\"cuota_mensual\">cuota mensual</span>, <span class=\"tip\" data-tip=\"periodo_fijo\">duración fija</span>.",
    t_periodo_fijo: "Decidir <span class=\"tip\" data-tip=\"periodo_fijo\">duración del período fijo</span> de la hipoteca (10, 20 o 30 años) y comparar ofertas. Al vencer, el banco puede cambiar el tipo de interés.",
    t_bouwdepot: "Confirmar qué obras cubre el <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span>: suelo, cocina, electricidad, pladur acústico, baño, mejoras energéticas.",
    t_waiver_deadline: "Confirmar fecha límite para el <span class=\"tip\" data-tip=\"waiver\">waiver</span> de la financing condition con Edwin.",
    s2sub2: "Taxatie y bank guarantee",
    t_taxatie: "Confirmar que la <span class=\"tip\" data-tip=\"taxatie\">taxatie</span> considere valor post-reforma si hay bouwdepot. Preparar lista de obras justificadas.",
    t_bank_guarantee: "Confirmar deadline, monto (10% del precio), coste y coordinación de la <span class=\"tip\" data-tip=\"bank_guarantee\">bank guarantee</span> con notario.",
    s2sub3: "Seguro de vida",
    t_seguro_vida: "Revisar oferta <span class=\"tip\" data-tip=\"taf\">TAF</span> (€300k/€400k/€500k) y decidir cobertura. Confirmar condiciones, cancelación y <span class=\"tip\" data-tip=\"cuestionario_medico\">cuestionario médico</span>.",
    s2sub4: "Presupuesto total",
    t_spreadsheet: "Crear spreadsheet compartida con todos los costos: compra, reforma, muebles y gastos recurrentes.",
    t_presupuesto_compra: "Armar presupuesto completo de compra: precio, <span class=\"tip\" data-tip=\"overdrachtsbelasting\">overdrachtsbelasting</span>, notario, <span class=\"tip\" data-tip=\"taxatie\">taxatie</span>, <span class=\"tip\" data-tip=\"hypotheekadviseur\">advisor hipotecario</span>, <span class=\"tip\" data-tip=\"bank_guarantee\">bank guarantee</span>, mudanza, renovación, muebles, buffer.",
    t_presupuesto_fases: "Armar presupuesto de obras por fases: antes de mudanza / 3 meses / 1 año / 4-5 años / largo plazo.",
    s3title: "Técnico, inspección y reparaciones",
    s3desc: "Informe técnico, reparaciones al vendedor, final inspection y seguridad básica.",
    s3sub1: "Informe técnico",
    t_informe_guardar: "Guardar <span class=\"tip\" data-tip=\"bouwkundige_keuring\">informe técnico</span> final y compartirlo con Edwin y contratistas relevantes.",
    t_informe_revision: "Revisar con Edwin si algo del informe justifica pedir reparación o compensación al vendedor.",
    s3sub2: "Reparaciones a pedir al vendedor",
    t_boiler_factura: "Pedir factura reciente de mantenimiento de <span class=\"tip\" data-tip=\"boiler\">boiler</span> antes de la transferencia.",
    t_reparaciones_ducha: "Pedir reparación de juntas/sellado y baldosa rota de ducha, o compensación de €650.",
    s3sub3: "Final inspection",
    t_final_inspection: "Revisar <span class=\"tip\" data-tip=\"boiler\">boiler</span>, calefacción, agua, electricidad, ventanas, baño, medidores, llaves. Sacar fotos y videos. Confirmar que la casa esté vacía.",
    t_medidores: "Tomar lectura exacta de medidores (<span class=\"tip\" data-tip=\"meterstanden\">meterstanden</span>: gas, luz, agua) el día de entrega y fotografiarlos.",
    s3sub4: "Ventilación mecánica",
    t_ventilacion_checkup: "Revisar el estado del sistema de <span class=\"tip\" data-tip=\"mechanische_ventilatie\">ventilación mecánica</span> (baño, toilet y cocina): filtros, flujo de aire, ruidos y fecha de último servicio.",
    t_ventilacion_manual: "Pedir al vendedor el manual y marca del sistema de ventilación mecánica.",
    s3sub5: "Seguridad básica",
    t_detectores: "Comprar e instalar detectores de humo en cada planta y <span class=\"tip\" data-tip=\"co_detector\">CO detector</span> cerca del boiler.",
    t_cerraduras: "Revisar y cambiar <span class=\"tip\" data-tip=\"cilinderslot\">cilindros de cerradura</span> si hace falta.",
    s4title: "Remodelación inicial",
    s4desc: "Suelo, cocina, baño, pintura, pared acústica y referencias de estilo.",
    s4sub1: "Estrategia general",
    t_estrategia: "Definir qué se hace antes de mudanza (suelo <span class=\"tip\" data-tip=\"beneden\">beneden</span>, cocina, pintura, seguridad) y qué puede esperar.",
    t_cronograma: "Hacer cronograma de obras con fechas y dependencias (suelo antes de pintura, cocina antes de mudanza, etc.).",
    s4sub2: "Suelo beneden (~55 m²)",
    t_suelo_medidas: "Confirmar medidas exactas de <span class=\"tip\" data-tip=\"woonkamer\">woonkamer</span>, oficina beneden y <span class=\"tip\" data-tip=\"hal\">hal</span>. Verificar si el suelo está <span class=\"tip\" data-tip=\"vlak_egaal\">vlak en egaal</span>.",
    t_suelo_vve: "Confirmar norma <span class=\"tip\" data-tip=\"vve\">VvE</span> de acústica exacta (<span class=\"tip\" data-tip=\"akoestiek_norm\">dB/ΔLlin/ΔLw</span>) y si el sistema debe aprobarse antes de instalar.",
    t_suelo_presupuestos: "Pedir presupuestos para subestructura: <span class=\"tip\" data-tip=\"fermacell\">Fermacell</span>, corcho acústico, <span class=\"tip\" data-tip=\"underlay\">underlay</span> tipo Firstfloor Goldline. Comparar altura, precio, plazo.",
    pinterest: "Referencias Pinterest:",
    t_suelo_showroom: "buscar inspiración de color y acabado de suelo (roble claro, <span class=\"tip\" data-tip=\"multiplank\">multiplank</span>, <span class=\"tip\" data-tip=\"visgraat\">visgraat</span>, tono cálido no gris)",
    t_suelo_muestras: "Pedir muestras grandes para ver con luz real en la casa. Confirmar misma partida (<span class=\"tip\" data-tip=\"batchnummer\">zelfde batchnummer</span>) para 55 m².",
    s4sub3: "Suelo de cocina",
    t_cocina_azulejo_ref: "buscar azulejos off-white, ivory, limestone look, travertine, <span class=\"tip\" data-tip=\"marmerlook\">marmerlook</span> cálido (60x60 / 60x120)",
    t_cocina_azulejo_tienda: "Ver azulejos en vivo. Confirmar mismo tono y calibre. Coordinar transición con suelo de <span class=\"tip\" data-tip=\"woonkamer\">woonkamer</span>.",
    s4sub4: "Cocina — IKEA",
    t_cocina_ref: "buscar cocinas IKEA <span class=\"tip\" data-tip=\"metod\">METOD</span> off-white/shaker, <span class=\"tip\" data-tip=\"backsplash\">backsplash</span> verde menta/sage, electrodomésticos integrados",
    t_cocina_medidas: "Subir fotos y medidas a IKEA: largo, ancho, altura, ventana, puerta <span class=\"tip\" data-tip=\"balkon\">balkon</span>, puntos de agua/gas/<span class=\"tip\" data-tip=\"ventilatie\">ventilación</span>.",
    t_ikea_cita: "<span class=\"icon-date\">◈</span> <strong>Cita IKEA online: 1 de julio.</strong> Preparar al menos 2 diseños alternativos de cocina IKEA METOD antes de la cita.",
    t_cocina_enchufes: "Planificar reubicación de enchufes y puntos de agua/desagüe según diseño de cocina. Coordinar con <span class=\"tip\" data-tip=\"electricista\">electricista</span> y <span class=\"tip\" data-tip=\"fontanero\">fontanero</span>.",
    t_cocina_electro: "Confirmar que la instalación eléctrica <span class=\"tip\" data-tip=\"single_phase\">single-phase</span> alcanza para inducción, horno, lavavajillas simultáneamente. Decidir electrodomésticos.",
    t_cocina_gas: "Coordinar instalación de gas con contratista certificado antes de montar muebles IKEA. Confirmar presión y tipo de conexión.",
    t_cocina_presupuesto: "Pedir presupuesto IKEA y de instalación. Confirmar disponibilidad, plazos y garantías.",
    s4sub5: "Baño de arriba",
    t_banio_reparaciones: "Reparar juntas/sellado ducha y baldosa rota. Mejorar ventilación. Cambiar espejo, luz y accesorios si es barato. <em>(No se renueva ahora.)</em>",
    s4sub5b: "Baño / toilet de abajo",
    t_banio_abajo: "Evaluar si pintar o empapelar el baño/toilet de abajo. Buscar referencias de estilo. Presupuestar.",
    s4sub6: "Pared acústica / Oficina 2",
    t_pared_ref: "buscar separaciones con <span class=\"tip\" data-tip=\"pladur\">pladur</span> acústico, puertas sólidas y <span class=\"tip\" data-tip=\"high_glass\">high glass / transom</span> en livingrooms",
    t_pared_vve: "Consultar <span class=\"tip\" data-tip=\"vve\">VvE</span> si se requiere permiso para pared de <span class=\"tip\" data-tip=\"pladur\">pladur</span>. Pedir presupuesto: <span class=\"tip\" data-tip=\"metal_studs\">metal studs</span> + <span class=\"tip\" data-tip=\"mineral_wool\">mineral wool</span> + doble placa.",
    s4sub7: "Pintura",
    t_pintura_ref: "buscar interiores en warm white / ivory / off-white con luz natural cálida",
    t_pintura_mateo: "Pedir presupuesto a Mateo. Confirmar si se pinta antes o después del suelo y cómo protegerlo. Decidir si se pintan también techos y marcos.",
    s5title: "Muebles, storage y santuario",
    s5desc: "Dormitorio, living, oficina, entrada y estrategia de storage.",
    s5sub1: "Dormitorio principal",
    t_dormitorio_ref: "buscar dormitorios-santuario con telas, luces cálidas, cortinas de techo, estilo quiet luxury",
    t_dormitorio_medidas: "Tomar medidas exactas del dormitorio y hacer un plano básico. El cuarto está vacío — todo por definir.",
    t_dormitorio_cama: "Planificar cama 160 cm (IKEA Mandal u otra con storage). Definir posición, cabecero, mesitas y iluminación.",
    t_dormitorio_armario: "Confirmar si el armario existente se queda o se retira. Medir espacio para <span class=\"tip\" data-tip=\"inloopkast\">inloopkast</span> (walk-in closet).",
    t_dormitorio_cortinas: "Planificar cortinas: tipo (blackout, lino, terciopelo), rieles y altura desde el techo.",
    s5sub2: "Living",
    t_living_ref: "buscar livings estilo 1920s Balanced Cozy / Quiet Luxury con proyector, plantas y alfombra azul/malva",
    t_living_layout: "Ubicar IKEA <span class=\"tip\" data-tip=\"landskrona\">LANDSKRONA</span> verde claro y alfombra azul/turquesa/malva. Definir zona proyector, lámparas y plantas.",
    s5sub3: "Oficina beneden (slaapkamer 1)",
    t_oficina_layout: "Ubicar escritorio <span class=\"tip\" data-tip=\"sit_stand\">sit-stand</span> de Filippo. Alfombra Anders en oficina. Definir storage cerrado e iluminación de trabajo.",
    t_oficina_ethernet: "Llevar cable <span class=\"tip\" data-tip=\"ethernet\">ethernet</span> a la oficina 1 (<span class=\"tip\" data-tip=\"slaapkamer\">slaapkamer</span> de abajo). Confirmar punto de entrada del router y recorrido del cable.",
    s5sub4: "Entrada / hal",
    t_entrada_ref: "buscar entradas estrechas con zapatero de madera/vintage, perchero, espejo y bandeja de llaves",
    t_entrada_zapatero: "Buscar zapatero estrecho, cálido, de madera o vintage. Medir profundidad junto al radiador.",
    s5sub5: "Balcón",
    t_balcon_storage: "<span class=\"icon-note\">▣</span> <strong>Recordatorio:</strong> Existe storage en el balcón — se puede usar para guardar cosas sin lugar definitivo (herramientas, cajas, temporada).",
    s6title: "Mudanza y transición",
    s6desc: "Marnixkade, movers, registro y administración post-mudanza.",
    s6sub1: "Marnixkade",
    t_marnixkade: "Confirmar fecha hasta la que conservamos el cuarto. Decidir si mantenerlo algunas semanas durante las obras. Planear ritual de cierre.",
    t_marnixkade_muebles: "Decidir qué muebles y cosas de Marnixkade se llevan a Zaanstraat, qué se dona y qué se vende.",
    s6sub2: "Mudanza",
    t_movers: "Pedir presupuestos de movers. Confirmar lift, escalera y permisos de estacionamiento.",
    t_caja_primera_noche: "Preparar caja de primera noche: sábanas, toallas, cargadores, medicinas, documentos, café/té, herramientas básicas, detector CO/humo.",
    t_coordinar_mudanza: "Coordinar fecha de mudanza con instalación de suelo y cocina. Empacar por zonas y etiquetar cajas.",
    s6sub3: "Registro y administración",
    t_registro: "<span class=\"icon-warn\">!</span> Registrarse en la nueva dirección en <span class=\"tip\" data-tip=\"gemeente\">gemeente</span> <strong>antes del 15 de noviembre de 2026</strong> (3 meses desde la firma del 15 ago).",
    t_cambio_direccion: "Cambiar dirección en banco, trabajo, seguros, médico/farmacia. Contratar energía, internet y agua.",
    t_digid: "Confirmar plazos para actualizar <span class=\"tip\" data-tip=\"digid\">DigiD</span> / <span class=\"tip\" data-tip=\"bsn\">BSN</span> tras el cambio de domicilio.",
    t_documentos_digitales: "Guardar todos los documentos digitales en carpeta organizada. Confirmar contactos <span class=\"tip\" data-tip=\"vve\">VvE</span>.",
    footer_sub: "Una casa, un proyecto, dos genios.",
  },
  it: {
    subtitle: "Tutto quello da fare prima, durante e dopo la consegna.",
    progress: "Progresso generale",
    s1title: "Documenti, contratto e notaio",
    s1desc: "Contratto, clausole, notaio, VvE e documenti legali.",
    s1sub1: "Contratto di acquisto",
    t_revisar_contrato: "Rivedere la versione finale del contratto / <span class=\"tip\" data-tip=\"koopovereenkomst\">koopovereenkomst</span>.",
    t_confirmar_fecha: "Confermare che la data di consegna prevista (<span class=\"tip\" data-tip=\"overdracht\">overdracht</span>) sia intorno al 15 agosto 2026.",
    t_financing_condition: "Verificare che la <span class=\"tip\" data-tip=\"financing_condition\">financing condition</span> rispecchi il finanziamento reale: ~€630.000 + <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> €30.000.",
    t_clausulas: "Rivedere le clausole chiave: <span class=\"tip\" data-tip=\"non_self_occupancy\">non-self-occupancy</span>, <span class=\"tip\" data-tip=\"age_clause\">age clause</span>, <span class=\"tip\" data-tip=\"asbestos_clause\">asbestos clause</span>, <span class=\"tip\" data-tip=\"foundation_waiver\">foundation waiver</span>, <span class=\"tip\" data-tip=\"eigenbewoning\">owner-occupancy</span>, <span class=\"tip\" data-tip=\"resale_restriction\">resale restriction</span>, <span class=\"tip\" data-tip=\"fire_rated_ceiling\">fire-rated ceiling</span>, <span class=\"tip\" data-tip=\"splitsingstekening\">splitsingstekening</span>.",
    t_eigenbewoning: "Confermare la condizione di <span class=\"tip\" data-tip=\"eigenbewoning\">eigenbewoning</span> (occupazione propria) richiesta per il mutuo.",
    s1sub2: "Notaio",
    t_source_funds: "Completare il <span class=\"tip\" data-tip=\"source_of_funds\">source of funds form</span> e la <span class=\"tip\" data-tip=\"pep_statement\">PEP statement</span>.",
    t_embajador: "Chiedere in privato al notaio del caso dello zio ambasciatore (<span class=\"tip\" data-tip=\"wwft\">WWFT</span>/<span class=\"tip\" data-tip=\"kyc\">KYC</span>).",
    t_firma_notario: "Confermare documenti da firmare, importo da trasferire e <span class=\"tip\" data-tip=\"nota_afrekening\">nota van afrekening</span> prima del passaggio.",
    t_aktenpassage: "Confermare data e ora esatta dell'<span class=\"tip\" data-tip=\"aktenpassage\">aktenpassage</span> (firma degli atti dal notaio).",
    t_erfpacht: "Confermare l'<span class=\"tip\" data-tip=\"erfpacht\">erfpacht</span>: canone prepagato fino al 31 dic 2059 e possibili costi per cambio d'uso.",
    s1sub3: "VvE e documenti legali",
    t_vve_costes: "Richiedere conferma scritta dalla <span class=\"tip\" data-tip=\"vve\">VvE</span> sui costi del progetto di sostenibilità / <span class=\"tip\" data-tip=\"verduurzaming\">verduurzaming</span>, prestito collettivo, <span class=\"tip\" data-tip=\"derrama\">deroga</span> e quota mensile.",
    t_vve_reserve: "Richiedere lo stato aggiornato del <span class=\"tip\" data-tip=\"reserve_fund\">reserve fund</span> e conferma della quota del venditore.",
    t_vve_normas: "Confermare le norme esatte per il pavimento acustico, permessi per lavori, orari, rumore e uso delle scale.",
    t_vve_reglement: "Richiedere copia dello <span class=\"tip\" data-tip=\"splitsingsreglement\">splitsingsreglement</span> e dell'<span class=\"tip\" data-tip=\"huishoudelijk_reglement\">huishoudelijk reglement</span> completi.",
    s1sub4: "Samenlevingscontract e testamento",
    t_samenleving: "Leggere e discutere la guida del <span class=\"tip\" data-tip=\"samenlevingscontract\">samenlevingscontract</span> prima dell'appuntamento dal notaio: contributi per l'acconto, conto cointestato, beni, protezione per disoccupazione/malattia/decesso, e se conviene aggiungere i testamenti allo stesso pacchetto.",
    guide_btn: "📖 Vedi la guida completa",
    s2title: "Finanze, mutuo e assicurazioni",
    s2desc: "Mutuo, taxatie, bank guarantee, assicurazione vita e budget totale.",
    s2sub1: "Mutuo",
    t_monto_hipoteca: "Confermare con Edwin l'importo obiettivo: ~€630.000 + €30.000 <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> e le migliori condizioni bancarie.",
    t_simulaciones: "Rivedere le simulazioni con e senza <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span>: <span class=\"tip\" data-tip=\"tipo_interes\">tasso d'interesse</span>, <span class=\"tip\" data-tip=\"cuota_mensual\">rata mensile</span>, <span class=\"tip\" data-tip=\"periodo_fijo\">durata fissa</span>.",
    t_periodo_fijo: "Decidere la <span class=\"tip\" data-tip=\"periodo_fijo\">durata del periodo fisso</span> del mutuo (10, 20 o 30 anni) e confrontare le offerte. Alla scadenza, la banca può cambiare il tasso d'interesse.",
    t_bouwdepot: "Confermare quali lavori copre il <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span>: pavimento, cucina, elettricità, cartongesso acustico, bagno, miglioramenti energetici.",
    t_waiver_deadline: "Confermare la scadenza per il <span class=\"tip\" data-tip=\"waiver\">waiver</span> della financing condition con Edwin.",
    s2sub2: "Taxatie e bank guarantee",
    t_taxatie: "Confermare che la <span class=\"tip\" data-tip=\"taxatie\">taxatie</span> consideri il valore post-lavori se c'è bouwdepot. Preparare lista lavori giustificativi.",
    t_bank_guarantee: "Confermare scadenza, importo (10% del prezzo), costo e coordinamento della <span class=\"tip\" data-tip=\"bank_guarantee\">bank guarantee</span> con il notaio.",
    s2sub3: "Assicurazione vita",
    t_seguro_vida: "Rivedere offerta <span class=\"tip\" data-tip=\"taf\">TAF</span> (€300k/€400k/€500k) e decidere la copertura. Confermare condizioni, recesso e <span class=\"tip\" data-tip=\"cuestionario_medico\">questionario medico</span>.",
    s2sub4: "Budget totale",
    t_spreadsheet: "Creare uno spreadsheet condiviso con tutti i costi: acquisto, ristrutturazione, mobili e spese ricorrenti.",
    t_presupuesto_compra: "Costruire budget completo di acquisto: prezzo, <span class=\"tip\" data-tip=\"overdrachtsbelasting\">overdrachtsbelasting</span>, notaio, <span class=\"tip\" data-tip=\"taxatie\">taxatie</span>, <span class=\"tip\" data-tip=\"hypotheekadviseur\">advisor ipotecario</span>, <span class=\"tip\" data-tip=\"bank_guarantee\">bank guarantee</span>, trasloco, ristrutturazione, mobili, buffer.",
    t_presupuesto_fases: "Costruire budget lavori per fasi: prima del trasloco / 3 mesi / 1 anno / 4-5 anni / lungo termine.",
    s3title: "Tecnico, ispezione e riparazioni",
    s3desc: "Rapporto tecnico, riparazioni al venditore, ispezione finale e sicurezza base.",
    s3sub1: "Rapporto tecnico",
    t_informe_guardar: "Salvare il <span class=\"tip\" data-tip=\"bouwkundige_keuring\">rapporto tecnico</span> finale e condividerlo con Edwin e i contractor rilevanti.",
    t_informe_revision: "Verificare con Edwin se qualcosa nel rapporto giustifica richiedere riparazioni o compensazione al venditore.",
    s3sub2: "Riparazioni da chiedere al venditore",
    t_boiler_factura: "Richiedere fattura recente di manutenzione della <span class=\"tip\" data-tip=\"boiler\">caldaia</span> prima del passaggio.",
    t_reparaciones_ducha: "Richiedere riparazione di fughe/sigillatura e piastrella rotta della doccia, o compensazione di €650.",
    s3sub3: "Ispezione finale",
    t_final_inspection: "Verificare <span class=\"tip\" data-tip=\"boiler\">caldaia</span>, riscaldamento, acqua, elettricità, finestre, bagno, contatori, chiavi. Scattare foto e video. Confermare che la casa sia vuota.",
    t_medidores: "Effettuare lettura esatta dei contatori (<span class=\"tip\" data-tip=\"meterstanden\">meterstanden</span>: gas, luce, acqua) il giorno della consegna e fotografarli.",
    s3sub4: "Ventilazione meccanica",
    t_ventilacion_checkup: "Verificare lo stato del sistema di <span class=\"tip\" data-tip=\"mechanische_ventilatie\">ventilazione meccanica</span> (bagno, toilet e cucina): filtri, flusso d'aria, rumori e data dell'ultima manutenzione.",
    t_ventilacion_manual: "Richiedere al venditore il manuale e la marca del sistema di ventilazione meccanica.",
    s3sub5: "Sicurezza base",
    t_detectores: "Acquistare e installare rilevatori di fumo ad ogni piano e <span class=\"tip\" data-tip=\"co_detector\">rilevatore CO</span> vicino alla caldaia.",
    t_cerraduras: "Verificare e cambiare i <span class=\"tip\" data-tip=\"cilinderslot\">cilindri delle serrature</span> se necessario.",
    s4title: "Ristrutturazione iniziale",
    s4desc: "Pavimento, cucina, bagno, pittura, parete acustica e riferimenti di stile.",
    s4sub1: "Strategia generale",
    t_estrategia: "Definire cosa fare prima del trasloco (pavimento <span class=\"tip\" data-tip=\"beneden\">beneden</span>, cucina, pittura, sicurezza) e cosa può aspettare.",
    t_cronograma: "Fare un cronoprogramma dei lavori con date e dipendenze (pavimento prima della pittura, cucina prima del trasloco, ecc.).",
    s4sub2: "Pavimento piano terra (~55 m²)",
    t_suelo_medidas: "Confermare le misure esatte di <span class=\"tip\" data-tip=\"woonkamer\">woonkamer</span>, ufficio piano terra e <span class=\"tip\" data-tip=\"hal\">hal</span>. Verificare se il pavimento è <span class=\"tip\" data-tip=\"vlak_egaal\">vlak en egaal</span>.",
    t_suelo_vve: "Confermare la norma <span class=\"tip\" data-tip=\"vve\">VvE</span> acustica esatta (<span class=\"tip\" data-tip=\"akoestiek_norm\">dB/ΔLlin/ΔLw</span>) e se il sistema va approvato prima dell'installazione.",
    t_suelo_presupuestos: "Richiedere preventivi per la sottostruttura: <span class=\"tip\" data-tip=\"fermacell\">Fermacell</span>, sughero acustico, <span class=\"tip\" data-tip=\"underlay\">underlay</span> tipo Firstfloor Goldline. Confrontare altezza, prezzo, tempi.",
    pinterest: "Riferimenti Pinterest:",
    t_suelo_showroom: "cercare ispirazione di colore e finitura pavimento (rovere chiaro, <span class=\"tip\" data-tip=\"multiplank\">multiplank</span>, <span class=\"tip\" data-tip=\"visgraat\">visgraat</span>, tono caldo non grigio)",
    t_suelo_muestras: "Richiedere campioni grandi da vedere con la luce reale in casa. Confermare stesso lotto (<span class=\"tip\" data-tip=\"batchnummer\">zelfde batchnummer</span>) per 55 m².",
    s4sub3: "Pavimento cucina",
    t_cocina_azulejo_ref: "cercare piastrelle off-white, ivory, limestone look, travertine, <span class=\"tip\" data-tip=\"marmerlook\">marmerlook</span> caldo (60x60 / 60x120)",
    t_cocina_azulejo_tienda: "Vedere le piastrelle di persona. Confermare stessa tinta e calibro. Coordinare la transizione con il pavimento del <span class=\"tip\" data-tip=\"woonkamer\">woonkamer</span>.",
    s4sub4: "Cucina — IKEA",
    t_cocina_ref: "cercare cucine IKEA <span class=\"tip\" data-tip=\"metod\">METOD</span> off-white/shaker, <span class=\"tip\" data-tip=\"backsplash\">backsplash</span> verde menta/salvia, elettrodomestici integrati",
    t_cocina_medidas: "Caricare foto e misure su IKEA: lunghezza, larghezza, altezza, finestra, porta <span class=\"tip\" data-tip=\"balkon\">balkon</span>, punti di acqua/gas/<span class=\"tip\" data-tip=\"ventilatie\">ventilazione</span>.",
    t_ikea_cita: "<span class=\"icon-date\">◈</span> <strong>Appuntamento IKEA online: 1 luglio.</strong> Preparare almeno 2 progetti alternativi di cucina IKEA METOD prima dell'appuntamento.",
    t_cocina_enchufes: "Pianificare la riallocazione di prese e punti acqua/scarico secondo il progetto della cucina. Coordinare con <span class=\"tip\" data-tip=\"electricista\">elettricista</span> e <span class=\"tip\" data-tip=\"fontanero\">idraulico</span>.",
    t_cocina_electro: "Confermare che l'impianto elettrico <span class=\"tip\" data-tip=\"single_phase\">monofase</span> regga induzione, forno e lavastoviglie simultaneamente. Scegliere gli elettrodomestici.",
    t_cocina_gas: "Coordinare l'installazione del gas con un installatore certificato prima di montare i mobili IKEA. Confermare pressione e tipo di collegamento.",
    t_cocina_presupuesto: "Richiedere preventivo IKEA e di installazione. Confermare disponibilità, tempi e garanzie.",
    s4sub5: "Bagno di sopra",
    t_banio_reparaciones: "Riparare fughe/sigillatura doccia e piastrella rotta. Migliorare ventilazione. Cambiare specchio, luce e accessori se economico. <em>(Non si rinnova ora.)</em>",
    s4sub5b: "Bagno / toilet di sotto",
    t_banio_abajo: "Valutare se dipingere o tappezzare il bagno/toilet di sotto. Cercare riferimenti di stile. Preventivare.",
    s4sub6: "Parete acustica / Ufficio 2",
    t_pared_ref: "cercare divisori con <span class=\"tip\" data-tip=\"pladur\">pladur</span> acustico, porte solide e <span class=\"tip\" data-tip=\"high_glass\">vetrate / transom</span> nei soggiorni",
    t_pared_vve: "Consultare la <span class=\"tip\" data-tip=\"vve\">VvE</span> se serve permesso per parete in <span class=\"tip\" data-tip=\"pladur\">pladur</span>. Richiedere preventivo: <span class=\"tip\" data-tip=\"metal_studs\">profili metallici</span> + <span class=\"tip\" data-tip=\"mineral_wool\">lana minerale</span> + doppia lastra.",
    s4sub7: "Pittura",
    t_pintura_ref: "cercare interni in warm white / ivory / off-white con luce naturale calda",
    t_pintura_mateo: "Richiedere preventivo a Mateo. Confermare se si dipinge prima o dopo il pavimento e come proteggerlo. Decidere se dipingere anche soffitti e telai.",
    s5title: "Mobili, storage e santuario",
    s5desc: "Camera da letto, soggiorno, ufficio, ingresso e strategia di storage.",
    s5sub1: "Camera da letto principale",
    t_dormitorio_ref: "cercare camere-santuario con tessuti, luci calde, tende a soffitto, stile quiet luxury",
    t_dormitorio_medidas: "Prendere le misure esatte della camera e fare una piantina di base. La stanza è vuota — tutto da definire.",
    t_dormitorio_cama: "Pianificare letto 160 cm (IKEA Mandal o altro con storage). Definire posizione, testiera, comodini e illuminazione.",
    t_dormitorio_armario: "Confermare se l'armadio esistente resta o viene rimosso. Misurare lo spazio per l'<span class=\"tip\" data-tip=\"inloopkast\">inloopkast</span> (walk-in closet).",
    t_dormitorio_cortinas: "Pianificare le tende: tipo (blackout, lino, velluto), binari e altezza dal soffitto.",
    s5sub2: "Soggiorno",
    t_living_ref: "cercare soggiorni stile 1920s Balanced Cozy / Quiet Luxury con proiettore, piante e tappeto azzurro/malva",
    t_living_layout: "Posizionare IKEA <span class=\"tip\" data-tip=\"landskrona\">LANDSKRONA</span> verde chiaro e tappeto azzurro/turchese/malva. Definire zona proiettore, lampade e piante.",
    s5sub3: "Ufficio piano terra (slaapkamer 1)",
    t_oficina_layout: "Posizionare scrivania <span class=\"tip\" data-tip=\"sit_stand\">sit-stand</span> di Filippo. Tappeto Anders nell'ufficio. Definire storage chiuso e illuminazione da lavoro.",
    t_oficina_ethernet: "Portare il cavo <span class=\"tip\" data-tip=\"ethernet\">ethernet</span> all'ufficio 1 (<span class=\"tip\" data-tip=\"slaapkamer\">slaapkamer</span> di sotto). Confermare il punto di ingresso del router e il percorso del cavo.",
    s5sub4: "Ingresso / hal",
    t_entrada_ref: "cercare ingressi stretti con scarpiera in legno/vintage, appendiabiti, specchio e vassoio porta chiavi",
    t_entrada_zapatero: "Cercare scarpiera stretta, calda, in legno o vintage. Misurare la profondità disponibile vicino al radiatore.",
    s5sub5: "Balcone",
    t_balcon_storage: "<span class=\"icon-note\">▣</span> <strong>Promemoria:</strong> C'è uno storage sul balcone — può essere usato per riporre oggetti senza posto fisso (attrezzi, scatole, stagionali).",
    s6title: "Trasloco e transizione",
    s6desc: "Marnixkade, trasloco, registrazione e amministrazione post-trasloco.",
    s6sub1: "Marnixkade",
    t_marnixkade: "Confermare fino a quando teniamo la stanza. Decidere se mantenerla alcune settimane durante i lavori. Pianificare rituale di chiusura.",
    t_marnixkade_muebles: "Decidere quali mobili e oggetti di Marnixkade portare a Zaanstraat, cosa donare e cosa vendere.",
    s6sub2: "Trasloco",
    t_movers: "Richiedere preventivi per il trasloco. Confermare ascensore, scala e permessi di parcheggio.",
    t_caja_primera_noche: "Preparare la scatola della prima notte: lenzuola, asciugamani, caricatori, medicine, documenti, caffè/tè, attrezzi base, rilevatore CO/fumo.",
    t_coordinar_mudanza: "Coordinare la data di trasloco con l'installazione del pavimento e della cucina. Fare i pacchi per stanza e etichettare.",
    s6sub3: "Registrazione e amministrazione",
    t_registro: "<span class=\"icon-warn\">!</span> Registrarsi al nuovo indirizzo presso il <span class=\"tip\" data-tip=\"gemeente\">gemeente</span> <strong>prima del 15 novembre 2026</strong> (3 mesi dalla firma del 15 ago).",
    t_cambio_direccion: "Cambiare indirizzo in banca, lavoro, assicurazioni, medico/farmacia. Attivare energia, internet e acqua.",
    t_digid: "Confermare le scadenze per aggiornare <span class=\"tip\" data-tip=\"digid\">DigiD</span> / <span class=\"tip\" data-tip=\"bsn\">BSN</span> dopo il cambio di residenza.",
    t_documentos_digitales: "Salvare tutti i documenti digitali in una cartella organizzata. Confermare i contatti <span class=\"tip\" data-tip=\"vve\">VvE</span>.",
    footer_sub: "Una casa, un progetto, due geni.",
  },
  en: {
    subtitle: "Everything to do before, during and after the transfer.",
    progress: "Overall progress",
    s1title: "Paperwork, contract & notary",
    s1desc: "Contract, clauses, notary, VvE and legal documents.",
    s1sub1: "Purchase agreement",
    t_revisar_contrato: "Review the final version of the contract / <span class=\"tip\" data-tip=\"koopovereenkomst\">koopovereenkomst</span>.",
    t_confirmar_fecha: "Confirm that the estimated transfer date (<span class=\"tip\" data-tip=\"overdracht\">overdracht</span>) is around 15 August 2026.",
    t_financing_condition: "Check that the <span class=\"tip\" data-tip=\"financing_condition\">financing condition</span> reflects the real financing: ~€630,000 + <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> €30,000.",
    t_clausulas: "Review key clauses: <span class=\"tip\" data-tip=\"non_self_occupancy\">non-self-occupancy</span>, <span class=\"tip\" data-tip=\"age_clause\">age clause</span>, <span class=\"tip\" data-tip=\"asbestos_clause\">asbestos clause</span>, <span class=\"tip\" data-tip=\"foundation_waiver\">foundation waiver</span>, <span class=\"tip\" data-tip=\"eigenbewoning\">owner-occupancy</span>, <span class=\"tip\" data-tip=\"resale_restriction\">resale restriction</span>, <span class=\"tip\" data-tip=\"fire_rated_ceiling\">fire-rated ceiling</span>, <span class=\"tip\" data-tip=\"splitsingstekening\">splitsingstekening</span>.",
    t_eigenbewoning: "Confirm the <span class=\"tip\" data-tip=\"eigenbewoning\">eigenbewoning</span> (owner-occupancy) condition required for the mortgage.",
    s1sub2: "Notary",
    t_source_funds: "Complete the <span class=\"tip\" data-tip=\"source_of_funds\">source of funds form</span> and <span class=\"tip\" data-tip=\"pep_statement\">PEP statement</span>.",
    t_embajador: "Ask the notary privately about the uncle ambassador case (<span class=\"tip\" data-tip=\"wwft\">WWFT</span>/<span class=\"tip\" data-tip=\"kyc\">KYC</span>).",
    t_firma_notario: "Confirm documents to sign, amount to transfer and <span class=\"tip\" data-tip=\"nota_afrekening\">nota van afrekening</span> before the transfer.",
    t_aktenpassage: "Confirm the exact date and time of the <span class=\"tip\" data-tip=\"aktenpassage\">aktenpassage</span> (deed signing at the notary).",
    t_erfpacht: "Confirm <span class=\"tip\" data-tip=\"erfpacht\">erfpacht</span>: canon prepaid until 31 Dec 2059 and possible costs for change of use.",
    s1sub3: "VvE and legal documents",
    t_vve_costes: "Request written confirmation from <span class=\"tip\" data-tip=\"vve\">VvE</span> on costs of the sustainability project / <span class=\"tip\" data-tip=\"verduurzaming\">verduurzaming</span>, collective loan, <span class=\"tip\" data-tip=\"derrama\">special levy</span> and monthly fee.",
    t_vve_reserve: "Request updated <span class=\"tip\" data-tip=\"reserve_fund\">reserve fund</span> status and confirmation of seller's share.",
    t_vve_normas: "Confirm exact rules on acoustic floors, permits for works, working hours, noise and stairwell use.",
    t_vve_reglement: "Request a copy of the full <span class=\"tip\" data-tip=\"splitsingsreglement\">splitsingsreglement</span> and <span class=\"tip\" data-tip=\"huishoudelijk_reglement\">huishoudelijk reglement</span>.",
    s1sub4: "Samenlevingscontract & will",
    t_samenleving: "Read and discuss the <span class=\"tip\" data-tip=\"samenlevingscontract\">samenlevingscontract</span> guide before the notary appointment: down payment contributions, joint account, assets, protection for unemployment/illness/death, and whether to add wills (testamenten) to the same package.",
    guide_btn: "📖 View full guide",
    s2title: "Finances, mortgage & insurance",
    s2desc: "Mortgage, taxatie, bank guarantee, life insurance and full budget.",
    s2sub1: "Mortgage",
    t_monto_hipoteca: "Confirm with Edwin the target amount: ~€630,000 + €30,000 <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> and best bank conditions.",
    t_simulaciones: "Review simulations with and without <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span>: <span class=\"tip\" data-tip=\"tipo_interes\">interest rate</span>, <span class=\"tip\" data-tip=\"cuota_mensual\">monthly payment</span>, <span class=\"tip\" data-tip=\"periodo_fijo\">fixed period</span>.",
    t_periodo_fijo: "Decide the <span class=\"tip\" data-tip=\"periodo_fijo\">fixed-rate period</span> of the mortgage (10, 20 or 30 years) and compare offers. When it ends, the bank can change the interest rate.",
    t_bouwdepot: "Confirm what works the <span class=\"tip\" data-tip=\"bouwdepot\">bouwdepot</span> covers: floor, kitchen, electrics, acoustic drywall, bathroom, energy improvements.",
    t_waiver_deadline: "Confirm the deadline for the <span class=\"tip\" data-tip=\"waiver\">waiver</span> of the financing condition with Edwin.",
    s2sub2: "Taxatie and bank guarantee",
    t_taxatie: "Confirm the <span class=\"tip\" data-tip=\"taxatie\">taxatie</span> accounts for post-renovation value if bouwdepot applies. Prepare a justified works list.",
    t_bank_guarantee: "Confirm deadline, amount (10% of price), cost and coordination of the <span class=\"tip\" data-tip=\"bank_guarantee\">bank guarantee</span> with the notary.",
    s2sub3: "Life insurance",
    t_seguro_vida: "Review the <span class=\"tip\" data-tip=\"taf\">TAF</span> offer (€300k/€400k/€500k) and decide coverage. Confirm conditions, cancellation and <span class=\"tip\" data-tip=\"cuestionario_medico\">medical questionnaire</span>.",
    s2sub4: "Full budget",
    t_spreadsheet: "Create a shared spreadsheet with all costs: purchase, renovation, furniture and recurring expenses.",
    t_presupuesto_compra: "Build full purchase budget: price, <span class=\"tip\" data-tip=\"overdrachtsbelasting\">overdrachtsbelasting</span>, notary, <span class=\"tip\" data-tip=\"taxatie\">taxatie</span>, <span class=\"tip\" data-tip=\"hypotheekadviseur\">mortgage advisor</span>, <span class=\"tip\" data-tip=\"bank_guarantee\">bank guarantee</span>, moving, renovation, furniture, buffer.",
    t_presupuesto_fases: "Build phased works budget: before moving / 3 months / 1 year / 4-5 years / long term.",
    s3title: "Technical, inspection & repairs",
    s3desc: "Technical report, repairs from seller, final inspection and basic safety.",
    s3sub1: "Technical report",
    t_informe_guardar: "Save the final <span class=\"tip\" data-tip=\"bouwkundige_keuring\">technical report</span> and share it with Edwin and relevant contractors.",
    t_informe_revision: "Review with Edwin whether anything in the report justifies requesting repairs or compensation from the seller.",
    s3sub2: "Repairs to request from seller",
    t_boiler_factura: "Request a recent <span class=\"tip\" data-tip=\"boiler\">boiler</span> maintenance invoice before the transfer.",
    t_reparaciones_ducha: "Request repair of shower grout/sealing and broken tile, or €650 compensation.",
    s3sub3: "Final inspection",
    t_final_inspection: "Check <span class=\"tip\" data-tip=\"boiler\">boiler</span>, heating, water, electricity, windows, bathroom, meters, keys. Take photos and videos. Confirm the house is empty.",
    t_medidores: "Take exact meter readings (<span class=\"tip\" data-tip=\"meterstanden\">meterstanden</span>: gas, electricity, water) on transfer day and photograph them.",
    s3sub4: "Mechanical ventilation",
    t_ventilacion_checkup: "Check the state of the <span class=\"tip\" data-tip=\"mechanische_ventilatie\">mechanical ventilation</span> system (bathroom, toilet and kitchen): filters, airflow, noises and last service date.",
    t_ventilacion_manual: "Ask the seller for the manual and brand of the mechanical ventilation system.",
    s3sub5: "Basic safety",
    t_detectores: "Buy and install smoke detectors on each floor and <span class=\"tip\" data-tip=\"co_detector\">CO detector</span> near the boiler.",
    t_cerraduras: "Check and replace <span class=\"tip\" data-tip=\"cilinderslot\">lock cylinders</span> if needed.",
    s4title: "Initial renovation",
    s4desc: "Floors, kitchen, bathroom, paint, acoustic wall and style references.",
    s4sub1: "General strategy",
    t_estrategia: "Define what to do before moving (ground floor <span class=\"tip\" data-tip=\"beneden\">beneden</span>, kitchen, paint, safety) and what can wait.",
    t_cronograma: "Make a works schedule with dates and dependencies (floor before paint, kitchen before moving, etc).",
    s4sub2: "Ground floor (~55 m²)",
    t_suelo_medidas: "Confirm exact measurements of <span class=\"tip\" data-tip=\"woonkamer\">woonkamer</span>, ground floor office and <span class=\"tip\" data-tip=\"hal\">hal</span>. Check if the floor is <span class=\"tip\" data-tip=\"vlak_egaal\">vlak en egaal</span>.",
    t_suelo_vve: "Confirm the exact <span class=\"tip\" data-tip=\"vve\">VvE</span> acoustic standard (<span class=\"tip\" data-tip=\"akoestiek_norm\">dB/ΔLlin/ΔLw</span>) and whether the system must be approved before installation.",
    t_suelo_presupuestos: "Request quotes for substructure: <span class=\"tip\" data-tip=\"fermacell\">Fermacell</span>, acoustic cork, <span class=\"tip\" data-tip=\"underlay\">underlay</span> like Firstfloor Goldline. Compare height, price, lead time.",
    pinterest: "Pinterest references:",
    t_suelo_showroom: "search for floor color and finish inspiration (light oak, <span class=\"tip\" data-tip=\"multiplank\">multiplank</span>, <span class=\"tip\" data-tip=\"visgraat\">herringbone</span>, warm non-grey tones)",
    t_suelo_muestras: "Request large samples to see under real light in the house. Confirm same batch (<span class=\"tip\" data-tip=\"batchnummer\">zelfde batchnummer</span>) for 55 m².",
    s4sub3: "Kitchen floor",
    t_cocina_azulejo_ref: "search for off-white, ivory, limestone look, travertine, warm <span class=\"tip\" data-tip=\"marmerlook\">marmerlook</span> tiles (60x60 / 60x120)",
    t_cocina_azulejo_tienda: "See tiles in person. Confirm same shade and calibre. Coordinate transition with the <span class=\"tip\" data-tip=\"woonkamer\">woonkamer</span> floor.",
    s4sub4: "Kitchen — IKEA",
    t_cocina_ref: "search for IKEA <span class=\"tip\" data-tip=\"metod\">METOD</span> off-white/shaker kitchens, sage/mint <span class=\"tip\" data-tip=\"backsplash\">backsplash</span>, integrated appliances",
    t_cocina_medidas: "Upload photos and measurements to IKEA: length, width, height, window, <span class=\"tip\" data-tip=\"balkon\">balkon</span> door, water/gas/<span class=\"tip\" data-tip=\"ventilatie\">ventilation</span> points.",
    t_ikea_cita: "<span class=\"icon-date\">◈</span> <strong>IKEA online appointment: 1 July.</strong> Prepare at least 2 alternative IKEA METOD kitchen designs before the appointment.",
    t_cocina_enchufes: "Plan relocation of sockets and water/drain points per kitchen design. Coordinate with <span class=\"tip\" data-tip=\"electricista\">electrician</span> and <span class=\"tip\" data-tip=\"fontanero\">plumber</span>.",
    t_cocina_electro: "Confirm <span class=\"tip\" data-tip=\"single_phase\">single-phase</span> electrical can handle induction, oven and dishwasher simultaneously. Choose appliances.",
    t_cocina_gas: "Coordinate gas installation with a certified contractor before assembling IKEA furniture. Confirm pressure and connection type.",
    t_cocina_presupuesto: "Request IKEA and installation quotes. Confirm availability, lead times and warranties.",
    s4sub5: "Upstairs bathroom",
    t_banio_reparaciones: "Repair shower grout/sealing and broken tile. Improve ventilation. Replace mirror, light and accessories if cheap. <em>(Not renovated now.)</em>",
    s4sub5b: "Downstairs bathroom / toilet",
    t_banio_abajo: "Assess whether to paint or wallpaper the downstairs bathroom/toilet. Look for style references. Get quotes.",
    s4sub6: "Acoustic wall / Office 2",
    t_pared_ref: "search for acoustic <span class=\"tip\" data-tip=\"pladur\">drywall</span> partitions, solid doors and <span class=\"tip\" data-tip=\"high_glass\">high glass / transom</span> in living rooms",
    t_pared_vve: "Check with <span class=\"tip\" data-tip=\"vve\">VvE</span> if a permit is needed for a <span class=\"tip\" data-tip=\"pladur\">drywall</span> partition. Request quote: <span class=\"tip\" data-tip=\"metal_studs\">metal studs</span> + <span class=\"tip\" data-tip=\"mineral_wool\">mineral wool</span> + double board.",
    s4sub7: "Paint",
    t_pintura_ref: "search for warm white / ivory / off-white interiors with warm natural light",
    t_pintura_mateo: "Request a quote from Mateo. Confirm whether to paint before or after the floor and how to protect it. Decide whether to also paint ceilings and frames.",
    s5title: "Furniture, storage & sanctuary",
    s5desc: "Bedroom, living room, office, hallway and storage strategy.",
    s5sub1: "Master bedroom",
    t_dormitorio_ref: "search for sanctuary bedrooms with fabrics, warm lights, ceiling curtains, quiet luxury style",
    t_dormitorio_medidas: "Take exact bedroom measurements and make a basic floor plan. The room is empty — everything to be defined.",
    t_dormitorio_cama: "Plan 160 cm bed (IKEA Mandal or other with storage). Define position, headboard, nightstands and lighting.",
    t_dormitorio_armario: "Confirm whether the existing wardrobe stays or is removed. Measure space for the <span class=\"tip\" data-tip=\"inloopkast\">inloopkast</span> (walk-in closet).",
    t_dormitorio_cortinas: "Plan curtains: type (blackout, linen, velvet), rails and height from ceiling.",
    s5sub2: "Living room",
    t_living_ref: "search for 1920s Balanced Cozy / Quiet Luxury living rooms with projector, plants and blue/mauve rug",
    t_living_layout: "Position IKEA <span class=\"tip\" data-tip=\"landskrona\">LANDSKRONA</span> in light green and blue/turquoise/mauve rug. Define projector zone, lamps and plants.",
    s5sub3: "Ground floor office (slaapkamer 1)",
    t_oficina_layout: "Position Filippo's <span class=\"tip\" data-tip=\"sit_stand\">sit-stand</span> desk. Anders rug in office. Define closed storage and task lighting.",
    t_oficina_ethernet: "Run <span class=\"tip\" data-tip=\"ethernet\">ethernet</span> cable to office 1 (downstairs <span class=\"tip\" data-tip=\"slaapkamer\">slaapkamer</span>). Confirm router entry point and cable route.",
    s5sub4: "Entrance / hal",
    t_entrada_ref: "search for narrow hallways with wood/vintage shoe rack, coat rack, mirror and key tray",
    t_entrada_zapatero: "Find a narrow, warm, wood or vintage shoe rack. Measure available depth next to radiator.",
    s5sub5: "Balcony",
    t_balcon_storage: "<span class=\"icon-note\">▣</span> <strong>Reminder:</strong> There's storage on the balcony — can be used for things without a permanent spot (tools, boxes, seasonal).",
    s6title: "Moving & transition",
    s6desc: "Marnixkade, movers, registration and post-move admin.",
    s6sub1: "Marnixkade",
    t_marnixkade: "Confirm how long we keep the room. Decide whether to keep it a few weeks during works. Plan closing ritual.",
    t_marnixkade_muebles: "Decide which furniture and items from Marnixkade move to Zaanstraat, what gets donated and what gets sold.",
    s6sub2: "Moving",
    t_movers: "Request moving quotes. Confirm lift access, stairwell and parking permits.",
    t_caja_primera_noche: "Pack first-night box: sheets, towels, chargers, medicine, documents, coffee/tea, basic tools, CO/smoke detector.",
    t_coordinar_mudanza: "Coordinate moving date with floor and kitchen installation. Pack by room and label boxes.",
    s6sub3: "Registration and admin",
    t_registro: "<span class=\"icon-warn\">!</span> Register at the new address with the <span class=\"tip\" data-tip=\"gemeente\">gemeente</span> <strong>before 15 November 2026</strong> (3 months from the 15 Aug signing).",
    t_cambio_direccion: "Update address at bank, work, insurance, doctor/pharmacy. Set up energy, internet and water.",
    t_digid: "Confirm deadlines to update <span class=\"tip\" data-tip=\"digid\">DigiD</span> / <span class=\"tip\" data-tip=\"bsn\">BSN</span> after the address change.",
    t_documentos_digitales: "Save all digital documents in an organised folder. Confirm <span class=\"tip\" data-tip=\"vve\">VvE</span> contact details.",
    footer_sub: "One house, one project, two genies.",
  }
};
// ---- STATE ----
let currentLang = localStorage.getItem('zaan-lang') || 'es';
let checkStates = JSON.parse(localStorage.getItem('zaan-checks') || '{}');
let ownerStates = JSON.parse(localStorage.getItem('zaan-owners') || '{}');
let activeFilters = new Set(['belen', 'filippo', 'together', 'unassigned']);

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  restoreChecks();
  restoreOwners();
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
      // Save to localStorage
      const taskId = taskItem.dataset.taskId;
      if (taskId) {
        ownerStates[taskId] = newOwner;
        localStorage.setItem('zaan-owners', JSON.stringify(ownerStates));
      }
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
      el.innerHTML = t[key];
    }
  });
  document.documentElement.lang = lang;
  if (typeof initTooltips === 'function') initTooltips();
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

// ---- OWNERS RESTORE ----
function restoreOwners() {
  document.querySelectorAll('.task-item[data-task-id]').forEach(item => {
    const taskId = item.dataset.taskId;
    if (ownerStates[taskId]) {
      const owner = ownerStates[taskId];
      item.dataset.owner = owner;
      const btn = item.querySelector('.owner-badge');
      if (btn) {
        btn.textContent = ownerEmoji(owner);
        btn.title = ownerTitle(owner);
      }
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

// ---- SAMENLEVINGSCONTRACT GUIDE MODAL ----
function openGuide(e) {
  if (e) e.stopPropagation();
  const overlay = document.getElementById('guideOverlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGuide() {
  const overlay = document.getElementById('guideOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeGuideOnOverlay(e) {
  if (e.target.id === 'guideOverlay') {
    closeGuide();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGuide();
});
