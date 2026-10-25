// Smartowo (smartowo.pl) — alert „brak ruchu rano”
// Opis i instrukcja: https://smartowo.pl/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/
// Urządzenie: Shelly z Bluetooth (np. 1PM Mini Gen4, 2PM) + Shelly BLU Motion (czujnik).
// Skrypt uruchom na TYM Shelly, z którym czujnik jest sparowany w aplikacji.
// Wersja 1.2 — 2026-10-25
//  - jeśli czujnik jest sparowany z tym Shelly (Urządzenia Bluetooth / BTHome), ruch czytany jest
//    z komponentu czujnika, a nie z surowych pakietów (działa też przy włączonym szyfrowaniu).
//  - BEZ parowania BLU_MAC MUSI być wpisany — puste pole = tryb wyszukiwania, ruch nie jest
//    zapisywany i alert przychodzi codziennie.
// Wersja 1.1 — 2026-10-24
//  - pakiet „koniec ruchu” (ruch=0) też liczy się jako ruch (gdy zgubiony został pakiet ruch=1),
//  - stan przełącznika śledzony na bieżąco (także ręczne przełączenia w aplikacji),
//  - kontrola z ruchem zawsze wyłącza przełącznik,
//  - diagnostyka: godzina ostatniego ruchu i ostatniego pakietu z czujnika (konsola + KVS).
//
// Jak działa:
//  - nasłuchuje pakietów Bluetooth (BTHome) z czujnika BLU Motion,
//  - zapamiętuje godzinę ostatniego ruchu (także po restarcie — pamięć KVS),
//  - o CHECK_TIME sprawdza, czy od WINDOW_START był ruch,
//  - jeśli nie było — włącza przełącznik wirtualny „Brak ruchu rano” (ON),
//    a scena w aplikacji Shelly wysyła rodzinie powiadomienie,
//  - gdy później pojawi się ruch — wyłącza przełącznik (OFF) i kasuje alert.
//
// WAŻNE (aplikacja Shelly): żeby przełącznik był widoczny w warunkach scen, dodaj go
// do grupy komponentów wirtualnych i wyeksportuj tę grupę jako urządzenie.

let CONFIG = {
  BLU_MAC: "",              // MAC czujnika BLU Motion, małe litery, np. "7c:c6:b6:aa:bb:cc".
                            // Puste = skrypt wypisuje w konsoli wszystkie czujniki BLU w zasięgu.
  WINDOW_START: "06:00",    // od której godziny liczymy poranny ruch
  CHECK_TIME: "10:00",      // o której sprawdzamy (format GG:MM)
  NAME: "Mama",             // nazwa w treści powiadomienia
  VIRTUAL_NAME: "Brak ruchu rano", // nazwa przełącznika wirtualnego — skrypt sam go utworzy,
                                   // jeśli jeszcze nie istnieje (ON = alert, OFF = wszystko OK)
  MOTION_END_COUNTS: false, // true = pakiet „koniec ruchu” (ruch=0) też liczy się jako ruch.
                            // NIE włączaj dla BLU Motion ZB — wysyła okresowe pakiety ruch=0 bez
                            // ruchu i alert nigdy by nie zadziałał (sprawdzone 2026-10-25).
  NTFY_TOPIC: "",           // opcjonalnie: temat w aplikacji ntfy — puste = nie wysyłaj
  DEBUG: true               // wypisuj komunikaty w konsoli skryptu
};

let lastMotion = 0;   // unixtime ostatniego ruchu
let lastMotionTxt = "-";  // ta sama chwila jako GG:MM (do diagnostyki)
let lastPacket = 0;   // unixtime ostatniego pakietu z czujnika (dowolnego)
let lastPacketTxt = "-";
let lastSaved = 0;    // kiedy ostatnio zapisano do KVS (oszczędzamy pamięć flash)
let lastPid = -1;     // id ostatniego pakietu (czujnik powtarza każdy pakiet kilka razy)
let lastCheckTs = 0;  // kiedy ostatnio wykonano kontrolę
let alertActive = false;
let seen = {};        // tryb wyszukiwania MAC
let motionKey = "";   // komponent czujnika ruchu sparowanego z tym Shelly, np. "bthomesensor:201"
let deviceKey = "";   // komponent samego czujnika, np. "bthomedevice:200"
let encryptedLogged = false;

function log(msg) {
  if (CONFIG.DEBUG) print("[senior] " + msg);
}

// "GG:MM" -> minuty od północy
function toMinutes(hhmm) {
  return ((hhmm.at(0) - 48) * 10 + (hhmm.at(1) - 48)) * 60 +
         (hhmm.at(3) - 48) * 10 + (hhmm.at(4) - 48);
}

function sys() {
  return Shelly.getComponentStatus("sys");
}

let virtualId = -1;   // id przełącznika wirtualnego (Boolean), ustalane przy starcie

function setVirtual(value) {
  if (virtualId < 0) {
    log("Przełącznik wirtualny jeszcze niegotowy — pomijam ustawienie na " + value);
    return;
  }
  Shelly.call("Boolean.Set", { id: virtualId, value: value }, function (res, errCode, errMsg) {
    if (errCode !== 0) log("Błąd ustawienia przełącznika: " + errMsg);
    else log("Przełącznik „" + CONFIG.VIRTUAL_NAME + "” = " + (value ? "ON" : "OFF"));
  });
}

// Ustawia widok „przełącznik” — bez tego aplikacja może nie pokazywać komponentu w scenach
function showAsToggle() {
  Shelly.call("Boolean.SetConfig",
    { id: virtualId, config: { name: CONFIG.VIRTUAL_NAME, meta: { ui: { view: "toggle" } } } },
    function (res, errCode, errMsg) {
      if (errCode !== 0) log("Nie udało się ustawić widoku przełącznika: " + errMsg);
    });
}

// Szuka przełącznika wirtualnego o nazwie VIRTUAL_NAME; jeśli go nie ma — tworzy nowy.
// Po restarcie odczytuje jego stan, żeby nie zgubić aktywnego alertu.
function setupVirtual() {
  Shelly.call("Shelly.GetComponents", { dynamic_only: true, include: ["config", "status"] },
    function (res, errCode, errMsg) {
      if (errCode !== 0) {
        log("Nie mogę odczytać komponentów: " + errMsg);
        return;
      }
      let list = res.components || [];
      findMotionSensor(list);
      for (let i = 0; i < list.length; i++) {
        let c = list[i];
        if (c.key.slice(0, 8) === "boolean:" && c.config && c.config.name === CONFIG.VIRTUAL_NAME) {
          virtualId = c.config.id;
          alertActive = c.status && c.status.value === true;
          log("Znaleziony przełącznik „" + CONFIG.VIRTUAL_NAME + "” (boolean:" + virtualId +
              "), stan: " + (alertActive ? "ON" : "OFF"));
          showAsToggle();
          return;
        }
      }
      Shelly.call("Virtual.Add", { type: "boolean", config: { name: CONFIG.VIRTUAL_NAME } },
        function (r, e, m) {
          if (e !== 0) {
            log("Nie udało się utworzyć przełącznika: " + m);
            return;
          }
          virtualId = r.id;
          log("Utworzono przełącznik „" + CONFIG.VIRTUAL_NAME + "” (boolean:" + virtualId + ")");
          showAsToggle();
          setVirtual(false);
        });
    });
}

// Szuka czujnika ruchu sparowanego z tym Shelly (komponent bthomesensor, obiekt 0x21 = ruch)
function findMotionSensor(list) {
  for (let i = 0; i < list.length; i++) {
    let c = list[i];
    if (c.key.slice(0, 13) !== "bthomesensor:" || !c.config || c.config.obj_id !== 0x21) continue;
    if (CONFIG.BLU_MAC !== "" && c.config.addr !== CONFIG.BLU_MAC) continue;
    motionKey = c.key;
    for (let k = 0; k < list.length; k++) {
      let d = list[k];
      if (d.key.slice(0, 13) === "bthomedevice:" && d.config && d.config.addr === c.config.addr) deviceKey = d.key;
    }
    log("Czujnik sparowany z tym Shelly: " + motionKey + " (" + c.config.addr + ") — ruch czytany z komponentu.");
    return;
  }
  log("Brak sparowanego czujnika ruchu — ruch czytany z surowych pakietów Bluetooth.");
  if (CONFIG.BLU_MAC === "") log("Tryb wyszukiwania — poruszaj ręką przed czujnikiem i skopiuj jego MAC do BLU_MAC.");
}

function notify(msg) {
  log("POWIADOMIENIE: " + msg);
  if (CONFIG.NTFY_TOPIC === "") return;
  Shelly.call(
    "HTTP.POST",
    { url: "https://ntfy.sh/" + CONFIG.NTFY_TOPIC, body: msg, timeout: 10 },
    function (res, errCode, errMsg) {
      if (errCode !== 0) log("Błąd wysyłki ntfy: " + errMsg);
    }
  );
}

// Rozmiar obiektu BTHome (w bajtach) — tylko typy wysyłane przez czujniki Shelly BLU
function objSize(id) {
  if (id === 0x05) return 3;                                              // natężenie światła
  if (id === 0x02 || id === 0x03 || id === 0x3f || id === 0x45) return 2; // temp., wilgotność, obrót
  if (id === 0x00 || id === 0x01 || id === 0x1a || id === 0x20 ||
      id === 0x21 || id === 0x2d || id === 0x2e || id === 0x3a) return 1;
  return 0;
}

// Dekoduje BTHome v2 — zwraca { pid, battery, motion } albo null
function parseBTHome(data) {
  if (typeof data !== "string" || data.length < 2) return null;
  if (data.at(0) & 0x01) {
    if (!encryptedLogged) {
      encryptedLogged = true;
      print("[senior] Czujnik wysyła ZASZYFROWANE dane — sparuj go z tym Shelly albo wyłącz szyfrowanie.");
    }
    return null;
  }
  let out = { pid: -1, battery: -1, motion: -1 };
  let i = 1;
  while (i < data.length) {
    let id = data.at(i);
    let size = objSize(id);
    if (size === 0) break; // nieznany typ — kończymy
    let v = 0;
    for (let k = 0; k < size; k++) v = v | (data.at(i + 1 + k) << (8 * k));
    if (id === 0x00) out.pid = v;
    if (id === 0x01) out.battery = v;
    if (id === 0x21) out.motion = v;
    i = i + 1 + size;
  }
  return out;
}

function onMotion(ts, time) {
  lastMotion = ts;
  lastMotionTxt = time;
  if (ts - lastSaved > 300) {
    lastSaved = ts;
    Shelly.call("KVS.Set", { key: "sm_last_motion", value: JSON.stringify({ ts: ts, time: time }) });
  }
  if (alertActive) {
    alertActive = false;
    setVirtual(false);
    notify(CONFIG.NAME + ": ruch wykryty o " + time + " — wszystko OK.");
  }
}

function onScan(event, res) {
  if (event !== BLE.Scanner.SCAN_RESULT) return;
  if (!res || !res.service_data || res.service_data["fcd2"] === undefined) return;

  if (CONFIG.BLU_MAC === "") {
    if (motionKey !== "") return;   // czujnik sparowany — MAC niepotrzebny
    if (!seen[res.addr]) {
      seen[res.addr] = true;
      print("[senior] Znaleziony czujnik BLU: " + res.addr + " (sygnał " + res.rssi + " dBm)");
    }
    return;
  }
  if (res.addr !== CONFIG.BLU_MAC) return;
  if (motionKey !== "") return;   // czujnik sparowany — ruch przychodzi przez komponent

  let p = parseBTHome(res.service_data["fcd2"]);
  if (p === null || p.pid === lastPid) return;
  lastPid = p.pid;
  let s = sys();
  if (!s.unixtime) return;
  lastPacket = s.unixtime;
  lastPacketTxt = s.time;
  log("Pakiet " + s.time + ": ruch=" + p.motion + ", bateria=" + p.battery +
      "%, sygnał " + res.rssi + " dBm");

  // ruch=1 — początek ruchu; ruch=0 — koniec ruchu, czyli chwilę wcześniej ktoś się ruszał
  // (ważne, gdy pakiet ruch=1 nie dotarł)
  if (p.motion === 1 || (p.motion === 0 && CONFIG.MOTION_END_COUNTS)) onMotion(s.unixtime, s.time);
}

function check() {
  let s = sys();
  if (!s.unixtime || !s.time) return;          // brak synchronizacji czasu
  if (s.time !== CONFIG.CHECK_TIME) return;
  if (s.unixtime - lastCheckTs < 3600) return; // jedna kontrola na dzień
  lastCheckTs = s.unixtime;

  let windowStart = s.unixtime - (toMinutes(s.time) - toMinutes(CONFIG.WINDOW_START)) * 60 - 59;
  let diag = "ostatni ruch: " + lastMotionTxt + " (unixtime " + lastMotion + "), ostatni pakiet: " +
             lastPacketTxt + ", przełącznik: " + (alertActive ? "ON" : "OFF");
  log("Kontrola " + CONFIG.CHECK_TIME + " — " + diag);
  Shelly.call("KVS.Set", { key: "sm_last_check", value: s.time + " | " + diag });

  if (lastMotion >= windowStart) {
    log("Kontrola " + CONFIG.CHECK_TIME + ": ruch był — OK.");
    if (alertActive) {             // np. przełącznik został ręcznie włączony w aplikacji
      alertActive = false;
      setVirtual(false);
    }
    return;
  }
  alertActive = true;
  setVirtual(true);
  let why = lastPacket >= windowStart ? "" :
            " Uwaga: od " + CONFIG.WINDOW_START + " brak jakichkolwiek sygnałów z czujnika (bateria/zasięg?).";
  notify(CONFIG.NAME + ": brak ruchu od " + CONFIG.WINDOW_START +
         " (kontrola " + CONFIG.CHECK_TIME + "). Warto zadzwonić." + why);
}

function onSensorStatus(ev) {
  let s = sys();
  if (!s.unixtime) return;
  lastPacket = s.unixtime;
  lastPacketTxt = s.time;
  if (ev.component !== motionKey) return;
  let st = Shelly.getComponentStatus(motionKey);
  let moving = st && (st.value === true || st.value === 1);
  let ended = ev.delta && (ev.delta.value === false || ev.delta.value === 0);
  log("Czujnik " + s.time + ": ruch=" + (st ? st.value : "?"));
  if (moving || (ended && CONFIG.MOTION_END_COUNTS)) onMotion(s.unixtime, s.time);
}

// Śledzi stan przełącznika (także zmiany ręczne w aplikacji) i sparowanego czujnika
Shelly.addStatusHandler(function (ev) {
  if (motionKey !== "" && (ev.component === motionKey || ev.component === deviceKey)) {
    onSensorStatus(ev);
    return;
  }
  if (virtualId < 0 || ev.component !== "boolean:" + virtualId) return;
  if (ev.delta && typeof ev.delta.value === "boolean") alertActive = ev.delta.value;
});

// --- start ---
setupVirtual();

Shelly.call("KVS.Get", { key: "sm_last_motion" }, function (res) {
  if (res && res.value) {
    let v = JSON.parse(res.value);
    if (typeof v === "number") {   // zapis z wersji 1.0
      lastMotion = v;
    } else {
      lastMotion = v.ts;
      lastMotionTxt = v.time;
    }
    lastSaved = lastMotion;
    log("Ostatni ruch z pamięci: " + lastMotionTxt + " (unixtime " + lastMotion + ")");
  }
});

if (!BLE.Scanner.isRunning()) {
  BLE.Scanner.Start({ duration_ms: BLE.Scanner.INFINITE_SCAN, active: false });
}
BLE.Scanner.Subscribe(onScan);
Timer.set(20000, true, check);

let s0 = sys();
log("Start. Czas: " + (s0.time ? s0.time : "BRAK SYNCHRONIZACJI") +
    ", kontrola o " + CONFIG.CHECK_TIME + ", okno od " + CONFIG.WINDOW_START + ".");