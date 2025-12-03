
export function speakText(text = "", lang = "en") {
    if (typeof window === "undefined") return;
    if (!text) return;

    const synth = window.speechSynthesis;
    if (!synth) return; // browser doesn't support it

    // Cancel any previous utterances to avoid overlap
    synth.cancel();

    // Map your short language codes to BCP-47 strings (adjust if necessary)
    const langMap = {
        en: "en-US",
        tw: "ak-GH",   // Twi doesn't have a standard in all browsers; fallback to "en-US"
        ee: "ee-GH",   // Ewe may not be available; fallback to en
        gaa: "gaa-GH", // Ga likely not supported in many browsers
    };

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langMap[lang] || langMap["en"];

    // Optional: tweak rate, pitch, volume for clarity
    utter.rate = 0.95; // 0.8 - 1.1 typical
    utter.pitch = 1;
    utter.volume = 1;

    let voices = synth.getVoices();
    const pickFemaleVoice = () => {
        voices = synth.getVoices();

        if (!voices || voices.length === 0) return; 

        // Try to find female voice matching language first
        let femaleLangVoice = voices.find(
            v =>
                v.lang.startsWith(utter.lang.split("-")[0]) &&
                /female|woman|girl|zira|susan|vaani/i.test(v.name)
        );
        if (femaleLangVoice) {
            utter.voice = femaleLangVoice;
            return;
        }

        // Otherwise choose any female voice
        let anyFemale = voices.find(v =>
            /female|woman|girl|zira|susan|vaani/i.test(v.name)
        );
        if (anyFemale) {
            utter.voice = anyFemale;
            return;
        }

        // Fallback — language match (may be male)
        let langMatch = voices.find(v =>
            v.lang.startsWith(utter.lang.split("-")[0])
        );
        if (langMatch) {
            utter.voice = langMatch;
            return;
        }

        //Final fallback — first available voice
        utter.voice = voices[0];
    };
    // Safety: some voices may not be loaded immediately; try to pick a voice
    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            pickFemaleVoice();
            synth.speak(utter);
        };
    } else {
        pickFemaleVoice();
        synth.speak(utter);
    }
}
