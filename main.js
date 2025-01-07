// Denna fil ska innehålla din lösning till uppgiften (moment 5).
"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
//document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
//document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

//Start av applikation
window.onload = init;

let mainnavlistEl = document.getElementById("mainnavlist");
let infoEl = document.getElementById("info");

function init() {
    getChannelInfo();
}

//Hämta data från webbtjänst
function getChannelInfo() {
    const url = "https://api.sr.se/api/v2/channels?format=json";
    
    //Anropa webbtjänst
    fetch(url)
    .then(Response => Response.json())
    .then(data => LoadNav(data.channels))
    .catch(error => console.log(error))
}

/*
    Variables i need:
        Channels: 
            tagline
            id
            name

        Programs:
            title
            underTitle
            startTime & endTime (in relationship to current time)
            description
*/

function LoadNav(channels){
    //go through & write down each channel name 
    channels.forEach(channels => {

        //Variablerna jag behöver
        let tagline = (channels.tagline);
        let name = (channels.name);
        let channelid = (channels.id);

        let channelName = document.createElement("ul");
        let newChannelText = document.createTextNode(name);
        channelName.appendChild(newChannelText);
        
        //Mouse over item on list to show description
        let TagEl = document.createElement("p");
        let TagText = document.createTextNode(tagline);
        TagEl.appendChild(TagText);

        //Ändrar title attribute
        channelName.title = tagline;

        mainnavlistEl.appendChild(channelName);

        // Event listener som lagrar kanal ID och öppnar program info
        channelName.addEventListener("click", () => openInfo(channelid));
    });
}

// Funktion som visar vilken kanal id som klickades på och anropar funktionen som öppnar programen som matchar
function openInfo(selectedId) {
    console.log("selected Channel ID:", selectedId);
    
    ChannelPrograms(selectedId);
}

// async funktion för att kunna hämta urlen fler gånger om man klickar på olika kanaler
// funktionen hämtar urlen med IDet som hämtades och kollar så att det inte blir någon error
// till slut kallar funktionen till program schema funktionen
async function ChannelPrograms(selectedId) {
    try {
        const url = `https://api.sr.se/api/v2/scheduledepisodes?size=100&format=json&channelid=${selectedId}`;
        const response = await fetch (url);
        if (!response.ok){
            throw new Error (`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();

        Programs(data.schedule);
    }
    catch (error){
        console.error("error fetching programs:", error);
    }
}

//funktion som formaterar och visar programmen för kanalen som klickades på
function Programs(schedule) {

    // Tar bort existerande data lagrad i program info så man kan klicka på flera kanaler
    infoEl.innerHTML="";

    // Hämtar ut nu tiden
    let currentTime = new Date();

    // Filtrar programmen och visar bara de som är på nu eller senare i dagen
    let filterSchedule = schedule.filter(schedule => {
        
        // Hämtar tiden för programmen och ändrar format
        let startTime = new Date(parseInt(schedule.starttimeutc.match(/\/Date\((\d+)\)\//)[1]));
        let endTime = new Date(parseInt(schedule.endtimeutc.match(/\/Date\((\d+)\)\//)[1]));

        return startTime >= currentTime || (startTime <= currentTime && endTime > currentTime);
    })

    // Loopar genom programen och visar deras info
    filterSchedule.forEach(schedule =>{

        let title = (schedule.title);
        let underTitle = (schedule.subtitle);
        let description = (schedule.description);
        let startTime = timeFormat(schedule.starttimeutc);
        let endTime = timeFormat(schedule.endtimeutc);

            /* Format vi vill ha:
            <article>
                <h3>Titel</h3>
                <h4>Undertitel</h4>
                <h5>Starttid - Sluttid</h5>
                <p>Beskrivning</p>
            </article> */

        //Artikel
        let newArticleEl = document.createElement("article");

        //Titel 
        let newTitleEl = document.createElement("h3");
        let newTitleText = document.createTextNode(title);
        newTitleEl.appendChild(newTitleText);

        //Start- & sluttid 
        let newChannelTimeEl = document.createElement("h5");
        let newChannelTimeText = document.createTextNode(`${startTime} - ${endTime}`);
        newChannelTimeEl.appendChild(newChannelTimeText);

        //Program beskrivning
        let newDescriptionEl = document.createElement("p");
        let newDescriptionText = document.createTextNode(description);
        newDescriptionEl.appendChild(newDescriptionText);

        //Slå ihop i rätt ordning 
        newArticleEl.appendChild(newTitleEl);
        //Undertitel om det finns
        if (underTitle){
            let newUnderTitleEl = document.createElement("h4");
            let newUnderTitleText = document.createTextNode(underTitle);
            newUnderTitleEl.appendChild(newUnderTitleText);
            newArticleEl.appendChild(newUnderTitleEl);
        }
        newArticleEl.appendChild(newChannelTimeEl);
        newArticleEl.appendChild(newDescriptionEl);

        infoEl.appendChild(newArticleEl);
    });
}

/* 
    Funktion som ändrar tiden från:
        /Date(0000000000000)/   (.NET)
    till önskad format "hh:mm"
*/
function timeFormat(dateString) {

    // Hämtar tiden från api i millisekunder
        /* 
            "\" = "To prevent a character from being interpreted as a format specifier, 
            you can precede it with a backslash (\). This signifies that the following 
            character is a character literal that should be included unchanged."
            https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings#Literals
        */
    const time = dateString.match(/\/Date\((\d+)\)\//)[1];
    const date = new Date(parseInt(time));

    // Ändra formatet till hh:mm även om det inte finns två siffror (padding med en 0:a)
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    // Returnera tiden
    return `${hours}:${minutes}`;
}