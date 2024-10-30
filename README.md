# Angelica Adolfsson (anad2400) 

### Moment 5 i kursen DT084G, Introduktion till programmering i JavaScript

### Hostad Länk: [Moment 5](https://studenter.miun.se/~anad2400/dt084g/moment5/idex.html)
___

#### Steg 1 – Planera!!!

    - Skissa på papper/grafiskt verktyg
    - Läs dok. för Sveriges Radio API & laborera med den 
    - Skapa en lista över alla de delar som kräver implementation i JavaScript
    - Vilken typ av funktionalitet behövs för de olika delarna i din sammanställning.
    - Testa alla de funktioner och anrop som du måste kunna genomföra med ett verktyg 
    (functional tests, integration tests, regression tests) (T.ex. Postman, RestClient i Firefox eller Advanced Rest Client i Chrome.)

___
**Obligatorisk (1p):** 

    Huvudmeny

        - Visar kanaler (mainnavlist - unordered list för huvudmenyn)
        - Info om kanal vid "mouse over" (title attribut)
        - Välj antal kanaler som ska visas

    Tablåer
        - Klick på kanal = programtablå för dagen
            - Start = aktuell klockslag
            - Slut = midnatt
        - Utläsning av tablå utskrivet i lämpligt format
            - Förslag:
                Title
                Undertitle
                Start & Slut tid
                Beskrivning av programet
        
**Valfri (0-2p):**

    Antal kanaler (1p)
        - Val av antal kanaler (numrows - antal-väljare returnerar heltal 1-200)
        - med ändring av värdet ska menyn uppdateras med vald antal
    Radio-Spelar (1p)
        - Spelar upp live-ström av vald kanal
        - Kanalen ska kunna väljas från drop down meny (playchannel - select-element för radiokanaler) 
            - Ska kunna välja mellan alla kanaler
        - Vid klick på play knappen bredvid (playbutton - knapp för att starta uppspelning) ska sändningen spelas upp
        - Längst ner på sidan finns radioplayer element = tomt div-element lämplig att använda för radio-spelar

**Egna funktioner exempel (0-3p):**

    Skapa information utläst från webbtjänsten som skrivs ut på startsidan (något mer än enbart statisk text)
        - Vilka program som spelas just nu

    Finns extra info för vardera kanal som kan användas t.ex:
        - Grafik-filer
        - Färgkoder

#### Steg 2 - Skapa programkod

#### Steg 3 - Testakörning
    - Fungerar funktionen
    - Kan någonting förändras för att förenkla användandet

#### Steg 4 - Publicera & Redovisa
    - Spela in video-presentation (ca 5 min) där du redovisar uppgiften
        - Gå igenom funktionalitiet
        - Visa hur du löst delarna
        - Vilka slutsatser du dragit av uppgiften t.ex:
            - Vad du lärt dig
            - Vad som gått bra/mindre bra
            - Om du skulle göra något annorlunda
    - Ska vara "screencast"
    - Använd verktyg/program för att spela in skärm & mik
        - [OBS Studio](https://obsproject.com/sv)
        - [Free online screen recorder](https://www.apowersoft.com/free-online-screen-recorder) (körs i webbläsaren)
        - Xbox Game Bar - [guide](https://www.microsoft.com/en-us/windows/learning-center/how-to-record-screen-windows-11)
    - Publicera på någon videotjänst (youtube, vimeo, egen webbsida)
        - **Notis:** du kan sätta videon som ”olistad”, då kan endast personer som har
    tillgång till länken se videon.

#### Inlämning
- Länk till publicerad webbplats (testkörning)
- Länk till video-presentation
- Länk till Github Classroom-repo