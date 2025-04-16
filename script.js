const tasks = [
    { question: "Bitte, wasch dir vor ___ Essen die Hände.", answer: "dem" },
    { question: "Nach ___ Prüfung machen wir eine kleine Party.", answer: "der" },
    { question: "Bei___ Frühstück lese ich gern Zeitung.", answer: "Beim" },
    { question: "Vor ___ Prüfung möchte ich alles gut lernen.", answer: "der" },
    { question: "Vor ___ Party muss ich noch zum Friseur.", answer: "der" },
    { question: "Bei ___ Hausaufgaben höre ich immer Musik.", answer: "den" },
    { question: "Bitte stör mich nicht bei___ Telefonieren.", answer: "beim" },
    { question: "Vergiss nicht: nach ___ Essen Zähne putzen!", answer: "dem" },
    { question: "Mama, darf ich spielen? - Erst nach ___ Hausaufgaben.", answer: "den" },
    { question: "Wir sehen bei___ Essen immer fern.", answer: "beim" },
    { question: "Bei___ Joggen sollten Sie nicht zu viel sprechen.", answer: "beim" },
    { question: "Vor ___ Reise müssen wir noch einkaufen.", answer: "der" },
    { question: "Nach ___ Arbeit gehe ich noch einkaufen.", answer: "der" },
    { question: "Nach ___ Essen trinkt er einen Kaffee.", answer: "dem" },
    { question: "Darf man bei___ Autofahren telefonieren?", answer: "beim" },
    { question: "Nach ___ Fest räumen wir alle zusammen auf.", answer: "dem" },
    { question: "Nach ___ Sport können Sie hier duschen.", answer: "dem" },
    { question: "Bei ___ Arbeit dürfen Sie nicht rauchen.", answer: "der" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);