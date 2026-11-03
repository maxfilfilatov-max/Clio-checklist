const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

// =========================================================================
// !!! ОБЯЗАТЕЛЬНО ЗАМЕНИТЕ ЭТОТ БЛОК НА ВАШИ ЖИВЫЕ КЛЮЧИ ИЗ ВКЛАДКИ CONFIG !!!
const firebaseConfig = {
  apiKey: "AIzaSyAMIU7xHsQ8y7fyzEVT9Ygi3YLrwy-7ZLU",
  authDomain: "clio-checklist-db.firebaseapp.com",
  projectId: "clio-checklist-db",
  storageBucket: "clio-checklist-db.firebasestorage.app",
  messagingSenderId: "991994065530",
  appId: "1:991994065530:web:127676cfb94bbe85aa41c3"
};
// =========================================================================

// Инициализация Firebase в строгом режиме совместимости
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Локальный резервный слой (чтобы экран никогда не пропадал)
let warehouseItems = localStorage.getItem('whItems') ? JSON.parse(localStorage.getItem('whItems')) : [];
let shiftsList = localStorage.getItem('shiftsList') ? JSON.parse(localStorage.getItem('shiftsList')) : [];
let templatesList = localStorage.getItem('whTemplates') ? JSON.parse(localStorage.getItem('whTemplates')) : [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};

// Автоматическое наполнение базой, если всё абсолютно пусто
if (warehouseItems.length === 0) {
    warehouseItems = [
        { id: 1, name: "Sony FX3", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Камера", section: "" },
        { id: 2, name: "24-70mm f2.8 GM II", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Оптика", section: "" },
        { id: 3, name: "888 Production Mixer", brand: "Sound Devices", count: 0, packed: false, category: "sound", subcategory: "Рекордеры", section: "" },
        { id: 4, name: "Объектив Cooke S4/i 50mm", brand: "Cooke", count: 0, packed: false, category: "rental", subcategory: "Оптика в прокат", section: "" }
    ];
}

// СИНХРОНИЗАЦИЯ С ОБЛАКОМ GOOGLE FIREBASE В РЕАЛЬНОМ ВРЕМЕНИ
db.collection("appData").doc("warehouse").onSnapshot((doc) => {
    if (doc.exists() && doc.data().items) {
        warehouseItems = doc.data().items;
        localStorage.setItem('whItems', JSON.stringify(warehouseItems));
        if (typeof renderAll === "function") renderAll();
    }
}, err => console.log("Фоновое ожидание склада..."));

db.collection("appData").doc("shifts").onSnapshot((doc) => {
    if (doc.exists() && doc.data().list) {
        shiftsList = doc.data().list;
        localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
        if (typeof renderAll === "function") renderAll();
    }
}, err => console.log("Фоновое ожидание смен..."));

db.collection("appData").doc("templates").onSnapshot((doc) => {
    if (doc.exists() && doc.data().list) {
        templatesList = doc.data().list;
        localStorage.setItem('whTemplates', JSON.stringify(templatesList));
        if (typeof renderAll === "function") renderAll();
    }
}, err => console.log("Фоновое ожидание шаблонов..."));

db.collection("appData").doc("collapsed").onSnapshot((doc) => {
    if (doc.exists() && doc.data().cats) {
        collapsedCats = doc.data().cats;
        localStorage.setItem('colCats', JSON.stringify(collapsedCats));
        if (typeof renderAll === "function") renderAll();
    }
}, err => console.log("Фоновое ожидание категорий..."));

// ЦЕНТРАЛЬНАЯ ФУНКЦИЯ КУРЬЕРА: Жестко пишет и в память телефона, и заливает в облако Google
function saveAll() {
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    localStorage.setItem('whTemplates', JSON.stringify(templatesList));

    // Отправка пакетов в Firestore по прямой зафиксированной коллекции "appData"
    db.collection("appData").doc("warehouse").set({ items: warehouseItems }).catch(e => console.error(e));
    db.collection("appData").doc("shifts").set({ list: shiftsList }).catch(e => console.error(e));
    db.collection("appData").doc("collapsed").set({ cats: collapsedCats }).catch(e => console.error(e));
    db.collection("appData").doc("templates").set({ list: templatesList }).catch(e => console.error(e));
}
