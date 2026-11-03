// НАСТРОЙКА СВЯЗИ С ОБЛАКОМ: Вставьте сюда свои ключи из консоли Google Firebase!
const firebaseConfig = {

  apiKey: "AIzaSyAMIU7xHsQ8y7fyzEVT9Ygi3YLrwy-7ZLU",

  authDomain: "clio-checklist-db.firebaseapp.com",

  projectId: "clio-checklist-db",

  storageBucket: "clio-checklist-db.firebasestorage.app",

  messagingSenderId: "991994065530",

  appId: "1:991994065530:web:127676cfb94bbe85aa41c3"

};



// Инициализируем Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

// Списки данных теперь будут загружаться из облака. Изначально они пустые.
let templatesList = [];
let warehouseItems = [];
let shiftsList = [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};

// Эта функция теперь сохраняет всё напрямую в центральную базу данных Google
function saveAll() {
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    
    // Перезаписываем документы в облакеFirestore
    db.collection("app_data").doc("warehouse").set({ items: warehouseItems });
    db.collection("app_data").doc("shifts").set({ list: shiftsList });
    db.collection("app_data").doc("templates").set({ list: templatesList });
}
