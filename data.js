const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

let templatesList = localStorage.getItem('whTemplates') ? JSON.parse(localStorage.getItem('whTemplates')) : [
    {
        id: "tpl_interview",
        name: "Интервью (2 Камеры + Звук)",
        desc: "FX3, оптика, рекордер Sound Devices, петлички",
        items: [
            { id: 101, name: "Камера FX3", brand: "Sony", count: 2, packed: false, category: "camera", subcategory: "Камера", section: "" },
            { id: 102, name: "Объектив 24-70mm f2.8", brand: "Sony", count: 1, packed: false, category: "camera", subcategory: "Оптика", section: "" },
            { id: 103, name: "888 Production Mixer", brand: "Sound Devices", count: 1, packed: false, category: "sound", subcategory: "Рекордеры", section: "" }
        ]
    }
];

let warehouseItems = localStorage.getItem('whItems') ? JSON.parse(localStorage.getItem('whItems')) : [
    { id: 1, name: "Sony FX3", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Камера", section: "" },
    { id: 2, name: "24-70mm f2.8 GM II", brand: "Sony", count: 0, packed: false, category: "camera", subcategory: "Оптика", section: "" },
    { id: 3, name: "888 Production Mixer", brand: "Sound Devices", count: 0, packed: false, category: "sound", subcategory: "Рекордеры", section: "" },
    { id: 4, name: "Объектив Cooke S4/i 50mm", brand: "Cooke", count: 0, packed: false, category: "rental", subcategory: "Оптика в прокат", section: "" }
];

let shiftsList = localStorage.getItem('shiftsList') ? JSON.parse(localStorage.getItem('shiftsList')) : [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};

function saveAll() {
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    localStorage.setItem('whTemplates', JSON.stringify(templatesList));
}
