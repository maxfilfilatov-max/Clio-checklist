const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

// =========================================================================
// !!! ЗАМЕНИТЕ ЭТОТ БЛОК НА ВАШИ КЛЮЧИ ИЗ КОНСОЛИ GOOGLE !!!
const firebaseConfig = {
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_://firebaseapp.com",
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_://appspot.com",
    messagingSenderId: "ВАШ_SENDER_ID",
    appId: "ВАШ_APP_ID"
};
// =========================================================================

// Инициализируем Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let warehouseItems = [];
let shiftsList = [];
let templatesList = [];
let collapsedCats = {};

// СИНХРОНИЗАЦИЯ С ОБЛАКОМ В РЕАЛЬНОМ ВРЕМЕНИ
db.collection("config").doc("warehouse").onSnapshot((doc) => {
    if (doc.exists()) { warehouseItems = doc.data().items || []; } 
    else { warehouseItems = []; db.collection("config").doc("warehouse").set({ items: [] }); }
    if (typeof renderAll === "function") renderAll();
});

db.collection("config").doc("shifts").onSnapshot((doc) => {
    shiftsList = doc.exists() ? doc.data().list || [] : [];
    if (typeof renderAll === "function") renderAll();
});

db.collection("config").doc("templates").onSnapshot((doc) => {
    templatesList = doc.exists() ? doc.data().list || [] : [];
    if (typeof renderAll === "function") renderAll();
});

db.collection("config").doc("collapsed").onSnapshot((doc) => {
    collapsedCats = doc.exists() ? doc.data().cats || {} : {};
    if (typeof renderAll === "function") renderAll();
});

function saveAll() {
    db.collection("config").doc("warehouse").set({ items: warehouseItems });
    db.collection("config").doc("shifts").set({ list: shiftsList });
    db.collection("config").doc("collapsed").set({ cats: collapsedCats });
    db.collection("config").doc("templates").set({ list: templatesList });
}
