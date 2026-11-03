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
  apiKey: "AIzaSyAMIU7xHsQ8y7fyzEVT9Ygi3YLrwy-7ZLU",
  authDomain: "clio-checklist-db.firebaseapp.com",
  projectId: "clio-checklist-db",
  storageBucket: "clio-checklist-db.firebasestorage.app",
  messagingSenderId: "991994065530",
  appId: "1:991994065530:web:127676cfb94bbe85aa41c3"
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
