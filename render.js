let warehouseSearchQuery = "";

function buildHtml(arr) {
    let pk = 0, tot = 0, html = ""; const isInv = (currentTab === 'inventory');
    const isTplDetail = (currentTab === 'template-detail');

    if (isInv) {
        html += `<div style="margin-top:12px;margin-bottom:16px;box-sizing:border-box;"><input type="text" id="warehouse-search" placeholder="🔍 Поиск прибора или бренда..." value="${warehouseSearchQuery}" oninput="handleWarehouseSearch(event)" style="width:100%;padding:12px 16px;background-color:#1c1c1e;border:1px solid #27272a;border-radius:12px;color:#ffffff;font-size:15px;outline:none;box-sizing:border-box;-webkit-appearance:none;"></div>`;
    }

    Object.keys(categoriesConfig).forEach(k => {
        const inf = categoriesConfig[k]; let list = arr.filter(x => x.category === k);
        if (!isInv && list.length === 0) return;

        if (isInv && warehouseSearchQuery.trim() !== "") {
            const q = warehouseSearchQuery.toLowerCase().trim();
            list = list.filter(item => item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q) || item.subcategory.toLowerCase().includes(q));
            if (list.length === 0) return;
        }

        let cPk = 0, cTot = 0, inner = "";
        list.forEach(i => { cTot += i.count; tot += i.count; if (i.packed) { cPk += i.count; pk += i.count; } });
        const isRental = k === 'rental';

        [...new Set(list.map(x => x.subcategory))].forEach(sub => {
            const subL = list.filter(x => x.subcategory === sub); if (!subL.length) return;
            const subStyle = isRental ? 'style="color:#f59e0b;border-bottom:2px solid #5f3e0e;"' : '';
            if (sub !== "none") inner += `<div class="subcategory-title" ${subStyle}>${sub}</div>`;
            
            [...new Set(subL.map(x => x.section))].forEach(sec => {
                const secL = subL.filter(x => x.section === sec); if (!secL.length) return;
                const secStyle = isRental ? 'style="background-color:#3a2512;color:#f59e0b;"' : '';
                if (sec !== "") inner += `<div class="section-title" ${secStyle}>• ${sec}</div>`;
                
                secL.forEach(i => {
                    const isTpl = isTplDetail;
                    let rHtml = `<span class="count-tag">x${i.count > 0 ? i.count : 1}</span><button class="subtle-delete" onclick="deleteGlobalItem(${i.id},event)">✕</button>`;
                    let chkClass = i.packed ? 'checked' : 'unchecked';
                    if (isRental) chkClass = i.packed ? 'checked-rental' : 'unchecked-rental';

                    inner += `<div class="item-row" onclick="toggleItemPacked(${i.id})"><div class="item-left"><div class="checkbox ${isTpl ? 'hidden' : chkClass}">${i.packed ? '✓' : ''}</div><div class="item-info" style="${isTpl ? 'padding-left:5px;':''}"><p class="item-name ${currentTab==='shift-detail'&&i.packed ? 'packed-text' : 'active-item'}">${i.name}</p><p class="item-brand">${i.brand}</p></div></div><div class="item-right-side">${rHtml}</div></div>`;
                });
            });
        });
        if (isInv && !list.length) inner = `<div style="padding:15px;color:#71717a;text-align:center;">Ничего не найдено</div>`;
        const headerCounter = isInv ? `${list.filter(x => x.packed).length}/${list.length}` : `${cPk}/${cTot}`;
        const inlineAddBtn = isInv ? `<button style="background:#27272a;border:none;color:#fff;border-radius:4px;width:22px;height:22px;font-weight:bold;cursor:pointer;margin-left:8px;display:inline-flex;align-items:center;justify-content:center;" onclick="event.stopPropagation();handleCategoryAdd('${k}')">+</button>` : "";
        const cardClass = isRental ? 'card card-rental marker-rental' : `card marker-${k}`;
        const counterClass = isRental ? 'card-counter text-rental' : 'card-counter';

        let headerRightHtml = `<span class="${counterClass}">${headerCounter}</span>${inlineAddBtn}`;
        if (isTplDetail) headerRightHtml = "";

        html += `<div class="${cardClass}"><div class="card-header" onclick="toggleCategoryCollapse('${k}')"><div class="card-title" style="${isRental?'color:#f59e0b;':''}"><span>${inf.icon}</span> ${inf.name}</div><div style="display:flex;align-items:center;">${headerRightHtml}<span style="color:#71717a;font-size:10px;margin-left:8px;">${collapsedCats[k]?'▶':'▼'}</span></div></div><div class="item-list ${collapsedCats[k]?'hidden':''}">${inner}</div></div>`;
    });
    if (currentTab === 'shift-detail') {
        const pct = tot > 0 ? Math.round((pk / tot) * 100) : 0;
        document.getElementById("progress-count").innerText = `Собрано: ${pk} / ${tot}`;
        document.getElementById("progress-percent").innerText = pct + "%"; document.getElementById("progress-fill").style.width = pct + "%";
    }
    return html;
}

function handleWarehouseSearch(event) { warehouseSearchQuery = event.target.value; renderAll(); const input = document.getElementById("warehouse-search"); if (input) { input.focus(); } }

function checkoutToShiftFlex() {
    const chosen = warehouseItems.filter(i => i.packed); if (!chosen.length) { alert("Вы не выбрали ни одного прибора галочкой!"); return; }
    const name = prompt("Введите название новой смены:"); if (!name || !name.trim()) return;
    shiftsList.push({ id: Date.now(), name: name.trim(), date: prompt("Дата смены:", new Date().toLocaleDateString('ru-RU')) || "", items: chosen.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false, count: i.count > 0 ? i.count : 1 })) });
    warehouseItems.forEach(i => i.packed = false); warehouseSearchQuery = ""; saveAll(); switchTab('shifts');
}

function buildTemplatesHtml() {
    let htmlList = templatesList.map(tpl => `<div class="card" style="margin-top:12px;display:flex;flex-direction:column;padding:16px;box-sizing:border-box;cursor:pointer;" onclick="currentTab='template-detail';activeTemplateId='${tpl.id}';renderAll()"><div style="font-size:17px;font-weight:600;color:#ffffff;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;"><span>${tpl.name}</span><span style="color:#71717a;font-size:14px;">▶</span></div><div style="height:1px;background-color:#27272a;margin-bottom:10px;width:100%;"></div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:13px;color:#a1a1aa;">${tpl.desc || "Без описания"}</span><span style="font-size:12px;color:#3b82f6;font-weight:500;">📦 Позиций: ${tpl.items ? tpl.items.length : 0}</span></div><div style="display:flex;align-items:center;gap:12px;"><button class="add-btn" style="width:auto;height:auto;border-radius:6px;padding:6px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;background-color:#16a34a;border:1px solid #15803d;color:#fff;" onclick="event.stopPropagation();createShiftFromTemplate('${tpl.id}')">Создать смену</button><button style="background:#2a1414;border:1px solid #3d1b1b;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:6px 12px;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();if(confirm('Удалить шаблон?')){deleteGlobalItem('${tpl.id}',event)}">Удалить</button></div></div></div>`).join('');
    if (!templatesList.length) htmlList = `<div class="empty-text">Шаблонов нет.</div>`;
    return htmlList + `<button onclick="createTemplateFromWarehouse()" class="big-green-btn">Сделать шаблон из выбранного на складе</button>`;
}

function shareShiftToTelegram() {
    const s = shiftsList.find(x => x.id === activeShiftId); if (!s) return;
    let text = `🎬 СМЕНА: ${s.name.toUpperCase()}\n📅 Дата: ${s.date}\n📊 Сборы: ${s.items.filter(i=>i.packed).length}/${s.items.length}\n\n`;
    Object.keys(categoriesConfig).forEach(k => {
        const inf = categoriesConfig[k]; const list = s.items.filter(i => i.category === k); if (list.length === 0) return;
        text += `${inf.icon} ${inf.name.toUpperCase()}:\n`;
        list.forEach(i => { const status = i.packed ? "🟢" : "🔴"; text += `  ${status} ${i.brand} ${i.name} x${i.count}\n`; });
        text += `\n`;
    });
    
    // ИСПРАВЛЕНО: Чистый текст подписи без единого смайлика
    text += `Max&Clio equipment checklist\nУдачной смены!`;
    
    if (navigator.share) { navigator.share({ title: s.name, text: text }).catch(err => console.log(err)); } 
    else { navigator.clipboard.writeText(text); alert("Скопировано в буфер! Вставьте в Telegram."); }
}
