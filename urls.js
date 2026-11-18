const rentalUrlsMap = {
    97: "https://delight.rent",
    98: "https://delight.rent",
    99: "https://delight.rent",
    100: "https://delight.rent",
    101: "https://delight.rent",
    102: "https://delight.rent",
    103: "https://delight.rent",
    104: "https://delight.rent",
    105: "https://delight.rent",
    106: "https://delight.rent",
    107: "https://delight.rent",
    108: "https://delight.rent",
    109: "https://delight.rent",
    110: "https://delight.rent",
    111: "https://delight.rent",
    112: "https://delight.rent",
    113: "https://delight.rent",
    114: "https://delight.rent",
    115: "https://delight.rent",
    116: "https://delight.rent",
    117: "https://delight.rent",
    118: "https://delight.rent",
    119: "https://delight.rent",
    120: "https://delight.rent",
    121: "https://delight.rent",
    122: "https://delight.rent",
    123: "https://delight.rent",
    124: "https://delight.rent",
    125: "https://delight.rent",
    126: "https://delight.rent",
    127: "https://delight.rent",
    128: "https://delight.rent",
    129: "https://delight.rent",
    130: "https://delight.rent",
    131: "https://delight.rent",
    132: "https://delight.rent"
};

if (typeof warehouseItems !== 'undefined') {
    warehouseItems.forEach(item => {
        if (item.id === 97 && item.name === "Panasonic S5") item.name = "Panasonic S5II";
        if (item.id === 118) item.name = "Фрост рама разборная 100x100";
        if (rentalUrlsMap[item.id] && (!item.url || item.url === "https://delight.rent")) {
            item.url = rentalUrlsMap[item.id];
        }
    });
    if (typeof saveAll === 'function') saveAll();
}
