const rentalUrlsByName = {
    "Panasonic S5": "https://delight.rent",
    "Panasonic S5II": "https://delight.rent",
    "Panasonic S5IIX": "https://delight.rent",
    "Sony FX3": "https://delight.rent",
    "Sony FX30": "https://delight.rent",
    "Blackmagic 6K EF": "https://delight.rent",
    "DJI Osmo Pocket 4P": "https://delight.rent",
    "Объектив Laowa 24mm F14 Cine": "https://delight.rent",
    "Адаптер PL-E": "https://delight.rent",
    "Адаптер Sigma MC-21 EF-L": "https://delight.rent",
    "Комплект VND фильтров для DJI Osmo Pocket 4P": "https://delight.rent",
    "Клетка для Sony FX3/FX30": "https://delight.rent",
    "Сетевой адаптер NP-FZ100": "https://delight.rent",
    "HDMI кабель 5м": "https://delight.rent",
    "Монитор FeelWorld LUT 11S": "https://delight.rent",
    "Монитор Liliput A11": "https://delight.rent",
    "Монитор Liliput BM150": "https://delight.rent",
    "Суфлер Desview Telepromter": "https://delight.rent",
    "Amaran Halo 600X": "https://delight.rent",
    "Amaran 300C": "https://delight.rent",
    "Aputure Accent B7C": "https://delight.rent",
    "Spotlight": "https://delight.rent",
    "Фрост рама разборная 122x122": "https://delight.rent",
    "Фрост рама разборная 100x100": "https://delight.rent",
    "Складная рама Avenger 8x8": "https://delight.rent",
    "Текстиль Silk 1/4 8x8": "https://delight.rent",
    "Текстиль 1/2 8x8": "https://delight.rent",
    "Флаг Avenger 60x90cm": "https://delight.rent",
    "C-Stand 40”": "https://delight.rent",
    "Стойка Avenger A100": "https://delight.rent",
    "Стойка Avenger Overhead": "https://delight.rent",
    "Junior Boom Avenger D650": "https://delight.rent",
    "Сэндбэг": "https://delight.rent",
    "Тележка": "https://delight.rent",
    "Интеркомы": "https://delight.rent",
    "Дым-машина": "https://delight.rent",
    "Удлинитель 50м": "https://delight.rent",
    "SmallRig NP-F970": "https://delight.rent"
};

if (typeof warehouseItems !== 'undefined') {
    warehouseItems.forEach(item => {
        if (item.category === 'rental') {
            const cleanName = item.name.trim();
            if (rentalUrlsByName[cleanName] && (!item.url || item.url.trim().length <= 25)) {
                item.url = rentalUrlsByName[cleanName];
            }
            if (cleanName === "Panasonic S5") item.name = "Panasonic S5II";
            if (cleanName === "Фрост рама разборная 122x122") item.name = "Фрост рама разборная 100x100";
        }
    });
    if (typeof saveAll === 'function') saveAll();
}
