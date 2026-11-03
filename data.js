const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

// =========================================================================
// !!! ОБЯЗАТЕЛЬНО ЗАМЕНИТЕ ЭТОТ БЛОК НА ВАШИ КЛЮЧИ ИЗ ВКЛАДКИ CONFIG !!!
const firebaseConfig = {
  apiKey: "AIzaSyAMIU7xHsQ8y7fyzEVT9Ygi3YLrwy-7ZLU",
  authDomain: "clio-checklist-db.firebaseapp.com",
  projectId: "clio-checklist-db",
  storageBucket: "clio-checklist-db.firebasestorage.app",
  messagingSenderId: "991994065530",
  appId: "1:991994065530:web:127676cfb94bbe85aa41c3"
};
// =========================================================================

// Безопасная инициализация Firebase
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.firestore();
} catch (e) {
    console.error("Ошибка Firebase:", e);
}

// РЕЗЕРВНЫЙ СЛОЙ: База мгновенно берет данные из памяти телефона, экран никогда не будет пустым!
let warehouseItems = localStorage.getItem('whItems') ? JSON.parse(localStorage.getItem('whItems')) : [
    { id: 1, name: "Sony FX3", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Камера", section: "" },
    { id: 2, name: "24-70mm f2.8 GM II", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Оптика", section: "" },
    { id: 3, name: "888 Production Mixer", brand: "Sound Devices", count: 0, packed: false, category: "sound", subcategory: "Рекордеры", section: "" },
    { id: 4, name: "Объектив Cooke S4/i 50mm", brand: "Cooke", count: 0, packed: false, category: "rental", subcategory: "Оптика в прокат", section: "" }
];
let shiftsList = localStorage.getItem('shiftsList') ? JSON.parse(localStorage.getItem('shiftsList')) : [];
let templatesList = localStorage.getItem('whTemplates') ? JSON.parse(localStorage.getItem('whTemplates')) : [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};

// ОБЛАЧНЫЙ СЛОЙ: Фоновое скачивание из Google Firestore (если оно доступно)
if (window.db) {
    db.collection("config").doc("warehouse").onSnapshot((doc) => {
        if (doc.exists()) { warehouseItems = doc.data().items || []; localStorage.setItem('whItems', JSON.stringify(warehouseItems)); if (typeof renderAll === "function") renderAll(); }
    }, err => console.log("Склад пока в офлайне"));

    db.collection("config").doc("shifts").onSnapshot((doc) => {
        if (doc.exists()) { shiftsList = doc.data().list || []; localStorage.setItem('shiftsList', JSON.stringify(shiftsList)); if (typeof renderAll === "function") renderAll(); }
    }, err => console.log("Смены пока в офлайне"));

    db.collection("config").doc("templates").onSnapshot((doc) => {
        if (doc.exists()) { templatesList = doc.data().list || []; localStorage.setItem('whTemplates', JSON.stringify(templatesList)); if (typeof renderAll === "function") renderAll(); }
    }, err => console.log("Шаблоны пока в офлайне"));

    db.collection("config").doc("collapsed").onSnapshot((doc) => {
        if (doc.exists()) { collapsedCats = doc.data().cats || {}; localStorage.setItem('colCats', JSON.stringify(collapsedCats)); if (typeof renderAll === "function") renderAll(); }
    }, err => console.log("Категории пока в офлайне"));
}

// Функция сохранения: пишет и в память телефона, и дублирует на сервер Google
function saveAll() {
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    localStorage.setItem('whTemplates', JSON.stringify(templatesList));

    if (window.db) {
        db.collection("config").doc("warehouse").set({ items: warehouseItems }).catch(e => console.log("Ошибка отправки склада"));
        db.collection("config").doc("shifts").set({ list: shiftsList }).catch(e => console.log("Ошибка отправки смен"));
        db.collection("config").doc("collapsed").set({ cats: collapsedCats }).catch(e => console.log("Ошибка отправки категорий"));
        db.collection("config").doc("templates").set({ list: templatesList }).catch(e => console.log("Ошибка отправки шаблонов"));
    }
}
