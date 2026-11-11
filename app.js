function toggleSectionAll(catKey, subName, secName) {
    const arr = (currentTab === 'inventory') ? warehouseItems : (currentTab === 'shift-detail') ? shiftsList.find(s => s.id === activeShiftId)?.items : null;
    if (!arr) return;
    const targets = arr.filter(x => x.category === catKey && x.subcategory === subName && (x.section || "Разное") === secName);
    if (!targets.length) return;
    const allPacked = targets.every(x => x.packed);
    targets.forEach(i => {
        if (allPacked) {
            i.packed = false;
            delete i.selectedCount;
        } else {
            i.packed = true;
            if (currentTab === 'inventory') i.selectedCount = i.count > 0 ? i.count : 1;
        }
    });
    saveAll(); renderAll();
}
