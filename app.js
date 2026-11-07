let currentTab = 'shifts', activeShiftId = null, activeTemplateId = null, isWarehouseEditMode = false;

function switchTab(t) {
    currentTab = t; activeShiftId = null; activeTemplateId = null; isWarehouseEditMode = false;
    document.querySelectorAll('nav .nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-' + t).classList.add('active');
    renderAll();
}

function toggleWarehouseEdit() { isWarehouseEditMode = !isWarehouseEditMode; renderAll(); }

function moveSubcategory(catKey, subName, dir) {
    const list = warehouseItems.filter(x => x.category === catKey);
    const order = getOrderedSubcategories(catKey, list), idx = order.indexOf(subName);
    if (idx === -1) return;
    const tIdx = idx + dir;
    if (tIdx < 0 || tIdx >= order.length) return;
    [order[idx], order[tIdx]] = [order[tIdx], order[idx]];
    subcatOrder[catKey] = order; saveAll(); renderAll();
}

function editWarehouseItem(id) {
    const item = warehouseItems.find(x => x.id === id); if (!item) return;
    const nName = prompt("Наименование:", item.name); if (nName === null) return;
    const nBrand = prompt("Описание:", item.brand); if (nBrand === null) return;
    const nCount = prompt("Количество на складе (штук):", String(item.count > 0 ? item.count : 1)); if (nCount === null) return;
    const nSub = prompt("Категория:", item.subcategory); if (nSub === null) return;
    const nSec = prompt("Подкатегория:", item.section || "Разное"); if (nSec === null) return;
    if (nName.trim()) item.name = nName.trim();
    item.brand = nBrand.trim() || "Без описания";
    item.count = parseInt(nCount) || 1;
    if (nSub.trim()) item.subcategory = nSub.trim();
    item.section = nSec.trim() || "Разное";
    if (item.selectedCount && item.selectedCount > item.count) item.selectedCount = item.count;
    saveAll(); renderAll();
}

function changeItemCategory(id) {
    const item = warehouseItems.find(x => x.id === id); if (!item) return;
    const cats = Object.keys(categoriesConfig), menu = cats.map((k, i) => `${i + 1}. ${categoriesConfig[k].name}`).join('\n');
    const num = parseInt(prompt(`Перенести "${item.name}" в цех (введите цифру):\n\n${menu}`));
    if (num >= 1 && num <= cats.length) {
        item.category = cats[num - 1];
        const nSub = prompt("Категория в новом цеху:", item.subcategory);
        if (nSub && nSub.trim()) item.subcategory = nSub.trim();
        saveAll(); renderAll();
    }
}

function toggleCategoryCollapse(k) { collapsedCats[k] = !collapsedCats[k]; saveAll(); renderAll(); }

function handleCategoryAdd(categoryKey) {
    const arr = (currentTab === 'inventory') ? warehouseItems : (currentTab === 'shift-detail') ? shiftsList.find(s => s.id === activeShiftId)?.items : templatesList.find(t => t.id === activeTemplateId)?.items;
    if (!arr) return;
    
    const name = prompt("Наименование:"); if (!name || !name.trim()) return;
    const brand = prompt("Описание:") || "Без описания";
    const count = parseInt(prompt("Количество (штук):", "1")) || 1;
    const subcat = prompt("Категория:", "Разное").trim() || "Разное";
    const section = prompt("Подкатегория:", "Разное").trim() || "Разное";
    
    arr.push({ id: Date.now(), name: name.trim(), brand: brand, count: count, packed: false, category: categoryKey, subcategory: subcat, section: section });
    saveAll(); renderAll();
}

function createShiftFromTemplate(tplId) {
    const tpl = templatesList.find(t => t.id === tplId); if (!tpl) return;
    const name = prompt("Название смены:"); if (!name || !name.trim()) return;
    shiftsList.push({ id: Date.now(), name: name.trim(), date: prompt("Дата смены:", new Date().toLocaleDateString('ru-RU')) || "", items: tpl.items.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false, count: i.count > 0 ? i.count : 1 })) });
    saveAll(); switchTab('shifts');
}
function saveShiftAsTemplate(shiftId, e) {
    if (e) e.stopPropagation();
    const s = shiftsList.find(x => x.id === shiftId); if (!s) return;
    const valid = s.items.filter(i => i.count > 0);
    if (!valid.length) { alert("В этой смене нет оборудования!"); return; }
    const n = prompt("Название шаблона:", `Шаблон: ${s.name}`); if (!n || !n.trim()) return;
    templatesList.push({ id: 'tpl_' + Date.now(), name: n.trim(), desc: prompt("Описание:") || "Из смены", items: valid.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false })) });
    saveAll(); switchTab('templates');
}

function createTemplateFromWarehouse() {
    const chosen = warehouseItems.filter(i => i.packed);
    if (!chosen.length) { alert("Вы не выбрали ни одного прибора галочкой на Складе!"); return; }
    const n = prompt("Название шаблона:"); if (!n || !n.trim()) return;
    templatesList.push({ id: 'tpl_' + Date.now(), name: n.trim(), desc: prompt("Описание:"), items: chosen.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false, count: i.selectedCount || 1 })) });
    warehouseItems.forEach(i => { i.packed = false; delete i.selectedCount; });
    saveAll(); renderAll();
}

function toggleItemPacked(id) {
    if (currentTab === 'inventory') {
        const i = warehouseItems.find(x => x.id === id); if (!i) return;
        if (i.packed) { i.packed = false; delete i.selectedCount; }
        else {
            const max = i.count > 0 ? i.count : 1;
            if (max > 1) {
                const ans = prompt(`Сколько взять "${i.name}"? (На складе: ${max} шт.)`, String(max));
                if (ans === null) return;
                const qty = parseInt(ans);
                if (isNaN(qty) || qty < 1 || qty > max) { alert(`Укажите число от 1 до ${max}`); return; }
                i.selectedCount = qty;
            } else { i.selectedCount = 1; }
            i.packed = true;
        }
    } else {
        const arr = shiftsList.find(s => s.id === activeShiftId)?.items;
        if (arr) { const i = arr.find(x => x.id === id); if (i) i.packed = !i.packed; }
    }
    saveAll(); renderAll();
}

function deleteGlobalItem(id, e) {
    if (e) e.stopPropagation();
    if (currentTab === 'inventory') { const it = warehouseItems.find(x => x.id === id); if (!it || !confirm(`Удалить "${it.name}" из раздела?`)) return; warehouseItems = warehouseItems.filter(x => x.id !== id); }
    else if (currentTab === 'shifts') { shiftsList = shiftsList.filter(x => x.id !== id); }
    else if (currentTab === 'templates') { templatesList = templatesList.filter(x => x.id !== id); }
    else if (currentTab === 'shift-detail') { const s = shiftsList.find(x => x.id === activeShiftId), it = s?.items.find(x => x.id === id); if (!it || !confirm(`Удалить "${it.name}" из смены?`)) return; if (s) s.items = s.items.filter(x => x.id !== id); }
    else if (currentTab === 'template-detail') { const t = templatesList.find(x => x.id === activeTemplateId), it = t?.items.find(x => x.id === id); if (!it || !confirm(`Удалить "${it.name}" из шаблона?`)) return; if (t) t.items = t.items.filter(x => x.id !== id); }
    saveAll(); renderAll();
}

function exportClioDatabase() {
    try {
        const db = { warehouse: warehouseItems, templates: templatesList, order: subcatOrder };
        const jsonStr = JSON.stringify(db);
        const encoded = btoa(encodeURIComponent(jsonStr));
        if (navigator.share) {
            navigator.share({ title: 'Clio Base Backup', text: encoded }).catch(e => console.log(e));
        } else {
            navigator.clipboard.writeText(encoded);
            alert("Код бэкапа скопирован в буфер обмена! Перешлите его в Telegram.");
        }
    } catch(e) { alert("Ошибка при экспорте: " + e.message); }
}

function importClioDatabase() {
    const code = prompt("Вставьте текстовый код бэкапа базы Clio:");
    if (!code || !code.trim()) return;
    try {
        const decodedStr = decodeURIComponent(atob(code.trim()));
        const db = JSON.parse(decodedStr);
        if (db.warehouse && Array.isArray(db.warehouse)) {
            if (confirm("Внимание! Импорт полностью заменит текущий Склад и Шаблоны. Продолжить?")) {
                warehouseItems = db.warehouse;
                if (db.templates) templatesList = db.templates;
                if (db.order) subcatOrder = db.order;
                saveAll(); isWarehouseEditMode = false; renderAll();
                alert("Техническая база Clio успешно импортирована!");
            }
        } else { alert("Неверный формат кода бэкапа."); }
    } catch(e) { alert("Ошибка импорта! Убедитесь, что скопировали код целиком."); }
}

function renderAll() {
    const t = document.getElementById("main-title"), p = document.getElementById("progress-container-block"), c = document.getElementById("main-content-area"), hr = document.getElementById("header-right-action");
    p.classList.add("hidden"); hr.innerHTML = "";
    if (currentTab === 'shifts') {
        t.innerHTML = "Смены";
        if (!shiftsList.length) { c.innerHTML = `<div class="empty-text">Список смен пуст. Сформируйте смену на Складе.</div>`; return; }
        c.innerHTML = shiftsList.map(s => `<div class="card" style="margin-top:12px;display:flex;flex-direction:column;padding:16px;box-sizing:border-box;cursor:pointer;" onclick="currentTab='shift-detail';activeShiftId=${s.id};renderAll();"><div style="font-size:17px;font-weight:600;color:#fff;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;"><span>${s.name}</span><span style="color:#71717a;font-size:14px;">▶</span></div><div style="height:1px;background:#27272a;margin-bottom:10px;width:100%;"></div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:13px;color:#a1a1aa;">📅 ${s.date}</span><span style="font-size:12px;color:#10b981;font-weight:500;">Собрано: ${s.items.reduce((a, i) => a + (i.packed ? i.count : 0), 0)}/${s.items.reduce((a, i) => a + i.count, 0)}</span></div><div style="display:flex;align-items:center;gap:12px;"><button class="subtle-delete" style="color:#3b82f6;font-size:16px;padding:6px;background:#27272a;border-radius:6px;" onclick="saveShiftAsTemplate(${s.id},event)">📋</button><button style="background:#2a1414;border:1px solid #3d1b1b;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:6px 12px;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();if(confirm('Удалить смену?')){deleteGlobalItem(${s.id},event)}">Удалить</button></div></div></div>`).join('');
    } else if (currentTab === 'inventory') {
        t.innerHTML = `<div style="display:flex;flex-direction:column;gap:4px;"><span>ТЕХНИЧЕСКАЯ БАЗА CLIO</span><span style="font-size:13px;color:#71717a;font-weight:400;text-transform:none;letter-spacing:0px;">Max equipment checklist</span></div>`;
        const gSt = isWarehouseEditMode ? "background:#d97706;color:#000;border:1px solid #f59e0b;" : "background:#1c1c1e;color:#fff;border:1px solid #27272a;";
        hr.innerHTML = `<button onclick="toggleWarehouseEdit()" style="${gSt}width:38px;height:38px;border-radius:12px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">⚙️</button>`;
        const bBtn = isWarehouseEditMode ? `<button onclick="toggleWarehouseEdit()" class="big-green-btn" style="background-color:#d97706;color:#000;">Готово</button>` : `<button onclick="checkoutToShiftFlex()" class="big-green-btn">Взять на смену!</button>`;
        c.innerHTML = buildHtml(warehouseItems) + bBtn;
    } else if (currentTab === 'templates') {
        t.innerHTML = "Шаблоны"; c.innerHTML = buildTemplatesHtml();
    } else if (currentTab === 'shift-detail') {
        const s = shiftsList.find(x => x.id === activeShiftId); if (!s) { switchTab('shifts'); return; }
        t.innerHTML = s.name; p.classList.remove("hidden");
        c.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:10px;"><button class="back-btn" onclick="switchTab('shifts')" style="background:#27272a;border:none;color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;">❮ Назад</button><button onclick="shareShiftToTelegram()" style="background:#1d4ed8;border:1px solid #1e40af;color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;">🚀 Экспорт списка</button></div>` + buildHtml(s.items);
    } else if (currentTab === 'template-detail') {
        const tpl = templatesList.find(x => x.id === activeTemplateId); if (!tpl) { switchTab('templates'); return; }
        t.innerHTML = `Пресет: ${tpl.name}`;
        c.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:10px;"><button class="back-btn" onclick="switchTab('templates')" style="background:#27272a;border:none;color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;">❮ Назад</button></div>` + buildHtml(tpl.items || []);
    }
}

renderAll();
