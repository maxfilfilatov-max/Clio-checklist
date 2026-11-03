const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

// =========================================================================
// !!! ОБЯЗАТЕЛЬНО ЗАПОЛНИТЕ ЭТОТ БЛОК ВАШИМИ ДАННЫМИ ИЗ КОНСОЛИ !!!
const firebaseConfig = {
  apiKey: "AIzaSyAMIU7xHsQ8y7fyzEVT9Ygi3YLrwy-7ZLU",
  authDomain: "clio-checklist-db.firebaseapp.com",
  databaseURL: "https://clio-checklist-db-default-rtdb.firebaseio.com",
  projectId: "clio-checklist-db",
  storageBucket: "clio-checklist-db.firebasestorage.app",
  messagingSenderId: "991994065530",
  appId: "1:991994065530:web:127676cfb94bbe85aa41c3"
};
    databaseURL: "https://clio-checklist-db-default-rtdb.firebaseio.com/" // Вставьте скопированную ссылку сюда!
};
// =========================================================================

// Инициализация базы данных Realtime
let rtdb = null;
try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    rtdb = firebase.database();
} catch (e) { console.error("Ошибка сети Google:", e); }

// Мгновенная локальная загрузка (чтобы экран телефона никогда не был белым)
let warehouseItems = localStorage.getItem('whItems') ? JSON.parse(localStorage.getItem('whItems')) : [
    { id: 1, name: "Sony FX3", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Камера", section: "" },
    { id: 2, name: "24-70mm f2.8 GM II", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Оптика", section: "" },
    { id: 3, name: "888 Production Mixer", brand: "Sound Devices", count: 0, packed: false, category: "sound", subcategory: "Рекордеры", section: "" },
    { id: 4, name: "Объектив Cooke S4/i 50mm", brand: "Cooke", count: 0, packed: false, category: "rental", subcategory: "Оптика в прокат", section: "" }
];
let shiftsList = localStorage.getItem('shiftsList') ? JSON.parse(localStorage.getItem('shiftsList')) : [];
let templatesList = localStorage.getItem('whTemplates') ? JSON.parse(localStorage.getItem('whTemplates')) : [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};

// ПОДКЛЮЧЕНИЕ ОБЛАЧНОГО ОБМЕНА ДАННЫМИ
if (rtdb) {
    rtdb.ref("warehouse").on("value", (snapshot) => {
        if (snapshot.exists()) { warehouseItems = snapshot.val(); localStorage.setItem('whItems', JSON.stringify(warehouseItems)); if (typeof renderAll === "function") renderAll(); }
    });
    rtdb.ref("shifts").on("value", (snapshot) => {
        if (snapshot.exists()) { shiftsList = snapshot.val(); localStorage.setItem('shiftsList', JSON.stringify(shiftsList)); if (typeof renderAll === "function") renderAll(); }
    });
    rtdb.ref("templates").on("value", (snapshot) => {
        if (snapshot.exists()) { templatesList = snapshot.val(); localStorage.setItem('whTemplates', JSON.stringify(templatesList)); if (typeof renderAll === "function") renderAll(); }
    });
    rtdb.ref("collapsed").on("value", (snapshot) => {
        if (snapshot.exists()) { collapsedCats = snapshot.val(); localStorage.setItem('colCats', JSON.stringify(collapsedCats)); if (typeof renderAll === "function") renderAll(); }
    });
}

// Функция сохранения: пишет в телефон и мгновенно транслирует в Realtime Database
function saveAll() {
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    localStorage.setItem('whTemplates', JSON.stringify(templatesList));

    if (rtdb) {
        rtdb.ref("warehouse").set(warehouseItems);
        rtdb.ref("shifts").set(shiftsList);
        rtdb.ref("collapsed").set(collapsedCats);
        rtdb.ref("templates").set(templatesList);
    }
}
