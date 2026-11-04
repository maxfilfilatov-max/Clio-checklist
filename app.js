let currentTab = 'shifts', activeShiftId = null, activeTemplateId = null;

function switchTab(t) {
    currentTab = t; activeShiftId = null; activeTemplateId = null;
    document.querySelectorAll('nav .nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-' + t).classList.add('active');
    renderAll();
}

function toggleCategoryCollapse(k) { collapsedCats[k] = !collapsedCats[k]; saveAll(); renderAll(); }

function handleCategoryAdd(categoryKey) {
    const arr = (currentTab === 'inventory') ? warehouseItems : (currentTab === 'shift-detail') ? shiftsList.find(s => s.id === activeShiftId)?.items : templatesList.find(t => t.id === activeTemplateId)?.items;
    if (!arr) return;
    const name = prompt("Название прибора:"); if (!name || !name.trim()) return;
    const b = prompt("Бренд:") || "Без бренда", c = (currentTab === 'inventory') ? 0 : (parseInt(prompt("Количество (штук):", "1")) || 1);
    arr.push({ id: Date.now(), name: name.trim(), brand: b, count: c, packed: false, category: categoryKey, subcategory: prompt("Введите НАЗВАНИЕ ПОДКАТЕГОРИИ:", "Разное").trim(), section: prompt("Раздел (опционально):") || "" });
    saveAll(); renderAll();
}

function createShiftFromTemplate(tplId) {
    const tpl = templatesList.find(t => t.id === tplId); if (!tpl) return;
    const name = prompt(`Создать смену на основе "${tpl.name}". Название:`); if (!name || !name.trim()) return;
    shiftsList.push({ id: Date.now(), name: name.trim(), date: prompt("Дата смены:", new Date().toLocaleDateString('ru-RU')) || "", items: tpl.items.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false, count: i.count > 0 ? i.count : 1 })) });
    saveAll(); switchTab('shifts');
}

function saveShiftAsTemplate(shiftId, event) {
    event.stopPropagation(); const shift = shiftsList.find(s => s.id === shiftId); if (!shift) return;
    const tplName = prompt("Введите название для нового шаблона:", `Шаблон: ${shift.name}`); if (!tplName || !tplName.trim()) return;
    templatesList.push({ id: 'tpl_' + Date.now(), name: tplName.trim(), desc: prompt("Введите описание шаблона:") || "Создан из смены", items: shift.items.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false })) });
    saveAll(); switchTab('templates');
}

function createTemplateFromWarehouse() {
    const chosen = warehouseItems.filter(i => i.packed); if (chosen.length === 0) { alert("На Складе ничего не выбрано!"); return; }
    const tplName = prompt("Введите название для нового шаблона:"); if (!tplName || !tplName.trim()) return;
    templatesList.push({ id: 'tpl_' + Date.now(), name: tplName.trim(), desc: prompt("Введите описание шаблона:"), items: chosen.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false, count: i.count > 0 ? i.count : 1 })) });
    warehouseItems.forEach(i => i.packed = false); saveAll(); renderAll();
}

function toggleItemPacked(id) {
    if (currentTab === 'template-detail') return;
    const arr = (currentTab === 'inventory') ? warehouseItems : shiftsList.find(s => s.id === activeShiftId)?.items;
    if (arr) { const i = arr.find(x => x.id === id); if (i) i.packed = !i.packed; }
    saveAll(); renderAll();
}

function deleteGlobalItem(id, e) {
    if(e) e.stopPropagation();
    if (currentTab === 'inventory') warehouseItems = warehouseItems.filter(x => x.id !== id);
    if (currentTab === 'shifts') shiftsList = shiftsList.filter(x => x.id !== id);
    if (currentTab === 'templates') templatesList = templatesList.filter(x => x.id !== id);
    if (currentTab === 'shift-detail') { const s = shiftsList.find(x => x.id === activeShiftId); if (s) s.items = s.items.filter(x => x.id !== id); }
    if (currentTab === 'template-detail') { const t = templatesList.find(x => x.id === activeTemplateId); if (t) t.items = t.items.filter(x => x.id !== id); }
    saveAll(); renderAll();
}

function renderAll() {
    const t = document.getElementById("main-title"), p = document.getElementById("progress-container-block"), c = document.getElementById("main-content-area");
    p.classList.add("hidden");
    if (currentTab === 'shifts') {
        t.innerText = "Смены"; 
        if (!shiftsList.length) { c.innerHTML = `<div class="empty-text">Список смен пуст. Перейдите в Каталог Склада, отметьте приборы и нажмите кнопку снизу, чтобы оформить проект.</div>`; return; }
        
        c.innerHTML = shiftsList.map(s => `
            <div class="shift-swipe-wrapper">
                <div class="shift-card" onclick="currentTab='shift-detail';activeShiftId=${s.id};renderAll();">
                    <div class="shift-info">
                        <span class="shift-name">${s.name}</span>
                        <span class="shift-meta">📅 ${s.date} &nbsp;•&nbsp; Собрано: ${s.items.reduce((a,i)=>a+(i.packed?i.count:0),0)}/${s.items.reduce((a,i)=>a+i.count,0)}</span>
                    </div>
                    <div class="item-right-side" style="display: flex; align-items: center; gap: 14px;">
                        <button class="subtle-delete" style="color: #3b82f6; font-size: 16px; padding: 0;" onclick="saveShiftAsTemplate(${s.id}, event)">📋</button>
                        <span class="shift-arrow">▶</span>
                    </div>
                </div>
                <div class="swipe-delete-btn" onclick="event.stopPropagation(); if(confirm('Удалить проект навсегда?')){deleteGlobalItem(${s.id}, event)}">Удалить</div>
            </div>
        `).join('');
        
    } else if (currentTab === 'inventory') {
        t.innerText = "Каталог Склада"; c.innerHTML = buildHtml(warehouseItems) + `<button onclick="checkoutToShiftFlex()" class="big-green-btn">Взять на смену!</button>`;
    } else if (currentTab === 'templates') {
        t.innerText = "Шаблоны"; 
        let htmlList = templatesList.map(tpl => `<div class="shift-card" style="flex-direction:column; align-items:flex-start; gap:10px;" onclick="currentTab='template-detail';activeTemplateId='${tpl.id}';renderAll()"><div class="shift-info" style="width:100%; display:flex; justify-content:between; flex-direction:row;"><div style="display:flex; flex-direction:column; gap:4px; flex:1;"><span class="shift-name">${tpl.name}</span><span class="shift-meta">${tpl.desc}</span><span class="shift-meta" style="color:#3b82f6;">📦 Позиций: ${tpl.items ? tpl.items.length : 0}</span></div><button class="subtle-delete" onclick="event.stopPropagation(); if(confirm('Удалить шаблон?')){deleteGlobalItem('${tpl.id}',event)}">✕</button></div><button class="add-btn" style="width:auto; height:auto; border-radius:8px; padding:6px 12px; font-size:12px; background-color:#3b82f6;" onclick="event.stopPropagation(); createShiftFromTemplate('${tpl.id}')">Использовать для смены</button></div>`).join('');
        if (!templatesList.length) { htmlList = `<div class="empty-text">Шаблонов нет.</div>`; }
        c.innerHTML = htmlList + `<button onclick="createTemplateFromWarehouse()" class="big-green-btn">Сделать шаблон из выбранного на складе</button>`;
    } else if (currentTab === 'shift-detail') {
        const s = shiftsList.find(x => x.id === activeShiftId); if (!s) { switchTab('shifts'); return; }
        t.innerText = s.name; p.classList.remove("hidden"); c.innerHTML = `<button class="back-btn" onclick="switchTab('shifts')" style="margin-bottom:10px; background:#27272a; border:none; color:#fff; padding:6px 12px; border-radius:6px; cursor:pointer;">❮ К списку смен</button>` + buildHtml(s.items);
    } else if (currentTab === 'template-detail') {
        const tpl = templatesList.find(x => x.id === activeTemplateId); if (!tpl) { switchTab('templates'); return; }
        t.innerText = `Пресет: ${tpl.name}`; c.innerHTML = `<button class="back-btn" onclick="switchTab('templates')" style="margin-bottom:10px; background:#27272a; border:none; color:#fff; padding:6px 12px; border-radius:6px; cursor:pointer;">❮ К шаблонам</button>` + buildHtml(tpl.items || []);
    }
}
renderAll();
