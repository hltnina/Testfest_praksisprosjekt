# Fix – Brukerinnsendte issues for Testfest  
_IS-302 Praksisprosjekt høst 2025_

Dette repoet inneholder praksisprosjektet vårt i emnet **IS-302 Praksisprosjekt**, gjennomført hos  
**Tingtun AS** i samarbeid med **Testfest**. Prosjektet handler om å utvikle en løsning der testere og brukere
enkelt kan melde inn problemer eller issues de møter på nettsteder – med spesielt fokus på
**universell utforming** og **brukervennlighet**.

---

## Innhold

- [Bakgrunn og mål](#bakgrunn-og-mål)
- [Løsningsbeskrivelse](#løsningsbeskrivelse)
  - [Brukerreise](#brukerreise)
  - [Roller i løsningen](#roller-i-løsningen)
- [Teknologi og arkitektur](#teknologi-og-arkitektur)
  - [GitHub som databasesystem](#github-som-databasesystem)
- [Universell utforming og brukervennlighet](#universell-utforming-og-brukervennlighet)
- [Prosess og arbeidsform](#prosess-og-arbeidsform)
- [Læringspunkter og refleksjon](#læringspunkter-og-refleksjon)
- [Komme i gang](#komme-i-gang)

---

## Bakgrunn og mål

Som praktikanter hos **Tingtun AS** fikk vi i oppdrag å bidra inn i prosjektet **Testfest**, som tester
tilgjengelighet og brukervennlighet på ulike nettsteder. Oppgaven vår var å --->

> «Utvikle en løsning som gjør det enkelt for testere og andre brukere å melde inn problemer
med nettsteder, og som samtidig ivaretar universell utforming og god brukeropplevelse.»

I starten av semesteret hadde vi flere møter med veilederen vår, **Mikael Snaprud**, hvor vi --->
- avklarte forventninger til praksisperioden
- fikk innføring i Testfest og eksisterende nettsider
- diskuterte roller, funksjonalitet og krav til universell utforming

Vi bestemte oss for å lage en egen **Fix-side** som knytter innmeldte issues direkte til GitHub,
slik at Tingtun og andre utviklere kan jobbe videre med sakene der.

---

## Løsningsbeskrivelse

### Hovedidé

Løsningen vår består av en enkel, universelt utformet webapplikasjon --->

- **Testere/brukere** kan sende inn en sak (issue) uten å måtte logge inn
- De fyller inn blant annet --->
  1. **Beskrivelse** av problemet
  2. **Anbefalt handling** – hvordan de mener det burde fungere
  3. **E-postadresse (valgfritt)** for å kunne få bekreftelse og oppfølging
- Når skjemaet sendes inn, opprettes det automatisk en **GitHub Issue** i et definert repo
- Utviklere og ansvarlige kan deretter kommentere, merke og lukke saken direkte i GitHub

### Brukerreise

Brukerreisen gjenspeiler sidene som er vist i skjermbildene:

1. **Forside – “Velkommen til Fix!”**
   - Kort introduksjon til hva Fix er og hva brukeren kan gjøre.
   - To tydelige knapper:
     - **«Send inn issue»** – tar brukeren direkte til skjemaet.
     - **«Les mer»** – forklarer formålet med løsningen og hvordan dataen håndteres.
       
       <img width="1783" height="985" alt="velkommen:side" src="https://github.com/user-attachments/assets/1a7df118-b33a-4271-9ecd-a301391cc37c" />


2. **Skjema – “Meld inn din sak”**
   - Felt 1: **Beskrivelse*** – hva er problemet, hva prøvde du å gjøre, hva skjedde?
   - Felt 2: **Anbefalt handling** – hvordan burde det fungere?
   - Felt 3: **E-postadresse** (valgfritt, markert som ikke obligatorisk).
   - Brukeren kan:
     - gå tilbake til forsiden
     - eller **«Send inn»** for å gå videre.
       
       <img width="1774" height="967" alt="meldeinnsak" src="https://github.com/user-attachments/assets/98a52fc8-75f5-4574-8d0e-583a9956c47d" />


3. **Oppsummering – “Oppsummering”**
   - Viser en oppsummering av alle feltene, slik at brukeren kan kontrollere innholdet.
   - To knapper:
     - **«Endre skjema»** – gå tilbake og rette.
     - **«Bekreft og send inn»** – oppretter GitHub-issue.
       
       <img width="1778" height="976" alt="oppsummering" src="https://github.com/user-attachments/assets/0cd5c700-2630-4bed-bb20-911edc68d2f2" />


4. **Bekreftelse – “Takk for din innsending!”**
   - Bekreftelse på at saken er sendt inn.
   - Viser e-posten brukeren ev. oppga.
   - Knapp for å gå tilbake til Fix-forsiden.
     
     <img width="1923" height="951" alt="TakkForInnsending" src="https://github.com/user-attachments/assets/23573be7-8486-478b-aefa-cbf8fee8959d" />

     

5. **På GitHub**
   
   <img width="1918" height="957" alt="issues" src="https://github.com/user-attachments/assets/37758419-b95c-4de3-bd60-a04aed996698" />

   <img width="1904" height="941" alt="legge in kommentar" src="https://github.com/user-attachments/assets/9a281cbd-2f95-42a9-87b0-c0090517fa96" />
   
   - Det opprettes en ny issue med tittel **«Brukerinnsendt sak»**.
   - Body inneholder:
     - **Beskrivelse**
     - **Anbefalt handling**
     - **Avsender (e-post)** dersom den ble fylt inn.
   - Admin kan:
     - legge til labels (f.eks. `bug`)
     - kommentere med forslag til fix/oppskrift
     - lukke saken som **completed** når den er håndtert.
       
       <img width="1904" height="941" alt="legge in kommentar" src="https://github.com/user-attachments/assets/000366e5-b0e1-4fa7-8f26-162a72871136" />


Denne flyten gir:
- trygghet for brukeren (de ser hva som sendes inn)
- struktur og sporbarhet for utviklere (alt samles i GitHub).

### Roller i løsningen

I prosjektdagboken har vi jobbet eksplisitt med tre roller som grunnlag for designet --->

- **Tester (ingen innlogging)**  
  - Kan melde inn issues anonymt eller med e-post  
  - Kan få lenke/bekreftelse for å følge saken

- **Tjenesteeier**  
  - Skal kunne opprette fixes knyttet til egne tjenester
  - Vurdere og forbedre egen nettside basert på rapporterte issues

- **Administrator**  
  - Har full kontroll på repo og issues
  - Kan godkjenne/publisere fixes, legge til labels og håndtere statuser

I MVP-versjonen vår er fokuset først og fremst på **tester-rollen** og på at issues faktisk
blir registrert og håndterbare i GitHub. De øvrige rollene er designet og planlagt for videreutvikling.

---

## Teknologi og arkitektur

Prosjektet er bygget som en webapplikasjon med følgende hovedkomponenter --->

- **Frontend**
  - Responsivt skjema og navigasjon tilpasset desktop og mobil
  - Enkel, ren layout med fokus på lesbarhet og kontraster
  - Formularvalidering og stegvis flyt (skjema → oppsummering → bekreftelse)

- **Backend**
  - ***Github API*** (som loggført i prosjektdagboken)
  - Endepunkt som tar imot skjema-data fra frontend
  - Integrasjon mot ***GitHub API*** for å opprette issues i et valgt repository
  - Enkel feilhåndtering og tilbakemelding til frontend

### GitHub som databasesystem

I løpet av prosjektet evaluerte vi først tradisjonelle databasesystem som **MariaDB** og
**MySQL**. Senere valgte vi bevisst å bruke **GitHub Issues som vår “database”**.

**Hvorfor GitHub?**

1. **Enklere og mindre kompleks arkitektur**  
   – Vi slipper å sette opp, konfigurere og drifte en separat database.  
   – Passer godt til et praksisprosjekt med begrenset tid og scope.

2. **Alt på ett sted**  
   – Testere sender inn saker via Fix-siden.  
   – Utviklere og Tingtun-teamet jobber videre direkte i GitHub, som de allerede bruker til
     kode, issues og samarbeidsflyt.

3. **Sikkerhet og pålitelighet**  
   – GitHub håndterer lagring, backup, tilgangskontroll og historikk.  
   – Vi trenger ikke å sikre en egen databaseinstans.

4. **Samsvar med mål om brukervennlighet**  
   – Hele løsningen oppleves enklere både for oss som utviklere og for Tingtun som
     skal bruke systemet.  
   – Ved å gjenbruke verktøy som allerede er i bruk (GitHub), reduserer vi læringskurven.

**Konsekvenser av valget:**

- Hver innsendt sak representeres som **én GitHub Issue**.
- Feltene fra skjemaet mappes til:
  - tittel
  - body (strukturert tekst)
  - labels (f.eks. `bug`, `brukerinnsendt`)
- Statuser håndteres via GitHubs eget system:
  - Open / Closed
  - Labels og milestones ved behov

Dette gjør at GitHub fungerer som vår praktiske **“database” og saksbehandlerverktøy**,
selv om det ikke er en tradisjonell relasjonsdatabase.

---

## Universell utforming og brukervennlighet

Et hovedmål med prosjektet har vært å følge prinsipper for **universell utforming** og
**god UX** – både fordi det er viktig i Testfest-prosjektet, og fordi vi ønsket å trene på
å omsette teori fra studiet til praksis.

### Visuell profil og fargepalett

- Vi valgte en rolig **lys blå** bakgrunn, inspirert av dagens Testfest-side.
- Unngikk:
  - neonfarger
  - for sterke pastellfarger
  - fargekombinasjoner med dårlig kontrast
- Tekst er primært mørk på lys bakgrunn for å gi god lesbarhet.
- Vi jobbet eksplisitt med en fargepalett og tok hensyn til synshemmede og fargeblinde
  (kontrast, tydelige knapper, enkel typografi).

### Struktur og navigasjon

I loggen fra Testfest-inspirasjon og analyse av eksisterende Testfest-side identifiserte vi bl.a. --->

- problemer med lang, ustrukturert tekst
- lite tydelig navigasjon
- manglende visuell inndeling

Dette adresserte vi ved å:

- dele innhold i **tydelige seksjoner** med overskrifter
- ha en svært enkel menystruktur (f.eks. hjem / les mer / kontakt)
- bruke god luft (white space) mellom elementer
- lage klare primærknapper med tydelig tekst (f.eks. «Send inn issue»)

### Skjema og tilbakemelding

Skjemaet er bygget for å være:

- **enkelt og forutsigbart** – tre hovedfelt, tydelig markering av hva som er obligatorisk
- **trygt** – oppsummeringsside før innsending gjør at brukeren ser nøyaktig hva som sendes
- **inkluderende** – e-post er valgfritt; man kan sende inn anonymt

Vi fikk også praktisk erfaring med universell utforming under den faktiske **Testfesten**
sammen med **Blindeforbundet og NLA**, der vi observerte hvordan ulike brukere arbeidet
med nettsteder og hvilke barrierer de møtte. Dette påvirket både språk, struktur og designvalg. 

---

## Prosess og arbeidsform

Vi har hatt en systematisk arbeidsform gjennom hele semesteret, dokumentert i
**prosjektdagboken**.

Noen nøkkelpunkter:

- **Tidlig møte før sommeren** med Tingtun for forventningsavklaring og kontraktsignering.
- **Ukentlige gruppemøter** (ofte onsdager) med agenda, referat og tydelig fordeling av oppgaver.
- **Skisser og wireframes**:
  - alle i gruppen tegnet egne skisser av nettsiden
  - vi diskuterte og landet på felles struktur og farger før vi begynte å kode
- **Iterativ utvikling**:
  - først enkel gruppenettside
  - deretter fokus på Testfest/Fix-siden
  - frontend først, så backend og GitHub-integrasjon
- **Loggføring** etter hvert møte:
  - hva var hovedtema?
  - hvilke beslutninger ble tatt?
  - hvem gjør hva til neste gang?
  - viktigste læringspunkt

Denne strukturen hjalp oss med å holde oversikt, justere kurs underveis og ha god dokumentasjon til slutt.

---

## Læringspunkter og refleksjon

I oppsummeringen av praksisprosjektet trekker vi spesielt frem følgende læringspunkter. --->

- **Fra idé til konkret løsning**  
  Vi startet med mange store og ambisiøse ideer (flere roller, avansert datamodell, oversettelse,
  PWA, osv.), men måtte lære å prioritere en realistisk MVP.

- **Planlegging og rollefordeling**  
  Vi merket at mer detaljert planlegging tidlig i prosjektet – med tydelig rollefordeling og
  tidslinje – kunne spart oss for forsinkelser senere.

- **Bygge alt fra scratch**  
  Å lage både design og kode uten ferdige komponentbibliotek var krevende, men ga oss mye
  bedre forståelse for sammenhengen mellom UX-valg, universell utforming og teknisk løsning.

- **Teknologivalg i praksis**  
  Overgangen fra å tenke «tradisjonell database» til å bruke GitHub som databærebjelke
  tvang oss til å vurdere kompleksitet, sikkerhet og vedlikehold på en konkret måte.

- **Samarbeid med reell oppdragsgiver**  
  Kontakt med Tingtun og Mikael Snaprud, samt Testfest med Blindeforbundet, ga oss innsikt i
  hvordan faglige prinsipper om universell utforming faktisk ser ut i praksis.

Alt i alt har prosjektet gitt oss erfaring som vi tar med videre til både bacheloroppgave
og arbeidsliv – spesielt når det gjelder samspill mellom teknologi, mennesker og organisasjon.

## Komme i gang

- **Komme i gang**

1. Klon prosjektet:
   git clone https://github.com/hltnina/Testfest_praksisprosjekt.git

2. Installer nødvendige verktøy (hvis ikke installert fra før):
   - .NET SDK 6 eller nyere
   - Git

5. Start prosjektet lokalt:
   dotnet run

6. Åpne nettsiden i nettleseren:
   - Kopier URL-en som vises i terminalen (for eksempel https://localhost:5070)
   - Lim den inn i nettleseren og åpne siden

7. Test løsningen direkte på nettsiden:
   - Klikk “Send inn issue”
   - Fyll inn beskrivelse, anbefalt handling og evt. e-post
   - Gå videre til oppsummering
   - Bekreft og send inn

8. Sjekk om innsendingen fungerte:
   Gå til https://github.com/hltnina/Testfest_praksisprosjekt/issues
   - Du skal nå se en ny issue med innholdet du skrev inn på nettsiden.
