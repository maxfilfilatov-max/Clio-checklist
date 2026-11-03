const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

// --- СЛОЙ 1. АВТОНОМНАЯ СТАБИЛЬНАЯ ПАМЯТЬ ТЕХНИКИ ---
let warehouseItems = localStorage.getItem('whItems') ? JSON.parse(localStorage.getItem('whItems')) : [
    { id: 1, name: "Sony FX3", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Камера", section: "" },
    { id: 2, name: "24-70mm f2.8 GM II", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Оптика", section: "" },
    { id: 3, name: "888 Production Mixer", brand: "Sound Devices", count: 0, packed: false, category: "sound", subcategory: "Рекордеры", section: "" },
    { id: 4, name: "Объектив Cooke S4/i 50mm", brand: "Cooke", count: 0, packed: false, category: "rental", subcategory: "Оптика в прокат", section: "" }
];
let shiftsList = localStorage.getItem('shiftsList') ? JSON.parse(localStorage.getItem('shiftsList')) : [];
let templatesList = localStorage.getItem('whTemplates') ? JSON.parse(localStorage.getItem('whTemplates')) : [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};

// --- СЛОЙ 2. БЕЗОПАСНОЕ ПОДКЛЮЧЕНИЕ К ОБЛАКУ GOOGLE FIREBASE ---
// Вставьте ваши ключи из вкладки Config ниже. Если они пустые или с ошибкой, 
// приложение просто проигнорирует их и продолжит работать автономно!
const firebaseConfig = {
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_://firebaseapp.com",
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_://appspot.com",
    messagingSenderId: "ВАШ_SENDER_ID",
    appId: "ВАШ_APP_ID"
};

let cloudDb = null;

try {
    // Проверяем, что библиотеки Firebase загрузились и конфиг заполнен пользователем
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "ВАШ_API_KEY") {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        cloudDb = firebase.firestore();
        
        // Включаем фоновое скачивание из облака
        cloudDb.collection("appData").doc("warehouse").onSnapshot((doc) => {
            if (doc.exists() && doc.data().items) {
                warehouseItems = doc.data().items;
                localStorage.setItem('whItems', JSON.stringify(warehouseItems));
                if (typeof renderAll === "function") renderAll();
            }
        }, err => console.log(" Firestore ожидает ручной публикации правил..."));

        cloudDb.collection("appData").doc("shifts").onSnapshot((doc) => {
            if (doc.exists() && doc.data().list) {
                shiftsList = doc.data().list;
                localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
                if (typeof renderAll === "function") renderAll();
            }
        });

        cloudDb.collection("appData").doc("templates").onSnapshot((doc) => {
            if (doc.exists() && doc.data().list) {
                templatesList = doc.data().list;
                localStorage.setItem('whTemplates', JSON.stringify(templatesList));
                if (typeof renderAll === "function") renderAll();
            }
        });

        cloudDb.collection("appData").doc("collapsed").onSnapshot((doc) => {
            if (doc.exists() && doc.data().cats) {
                collapsedCats = doc.data().cats;
                localStorage.setItem('colCats', JSON.stringify(collapsedCats));
                if (typeof renderAll === "function") renderAll();
            }
        });
    }
} catch (error) {
    console.error("Firebase изолирован: работаем в автономном режиме", error);
}

// --- ЦЕНТРАЛЬНАЯ ФУНКЦИЯ СОХРАНЕНИЯ ---
function saveAll() {
    // Сначала пишем данные локально, чтобы телефон мгновенно всё запомнил
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    localStorage.setItem('whTemplates', JSON.stringify(templatesList));

    // Дублируем в облако, только если оно успешно инициализировано
    if (cloudDb) {
        cloudDb.collection("appData").doc("warehouse").set({ items: warehouseItems }).catch(e => console.log("Облако занято"));
        cloudDb.collection("appData").doc("shifts").set({ list: shiftsList }).catch(e => console.log("Облако занято"));
        cloudDb.collection("appData").doc("collapsed").set({ cats: collapsedCats }).catch(e => console.log("Облако занято"));
        cloudDb.collection("appData").doc("templates").set({ list: templatesList }).catch(e => console.log("Облако занято"));
    }
}
