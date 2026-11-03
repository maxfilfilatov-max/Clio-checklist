function buildHtml(arr) {
    let pk = 0, tot = 0, html = ""; const isInv = currentTab === 'inventory';
    Object.keys(categoriesConfig).forEach(k => {
        const inf = categoriesConfig[k], list = arr.filter(x => x.category === k);
        if (!isInv && list.length === 0) return;

        let cPk = 0, cTot = 0, inner = "";
        list.forEach(i => { cTot += i.count; tot += i.count; if (i.packed) { cPk += i.count; pk += i.count; } });
        const isRental = k === 'rental';

        [...new Set(list.map(x => x.subcategory))].forEach(sub => {
            const subL = list.filter(x => x.subcategory === sub); if (!subL.length) return;
            const subStyle = isRental ? 'style="color:#f59e0b; border-bottom:2px solid #5f3e0e;"' : '';
            if (sub !== "none") inner += `<div class="subcategory-title" ${subStyle}>${sub}</div>`;
            
            [...new Set(subL.map(x => x.section))].forEach(sec => {
                const secL = subL.filter(x => x.section === sec); if (!secL.length) return;
                const secStyle = isRental ? 'style="background-color:#3a2512; color:#f59e0b;"' : '';
                if (sec !== "") inner += `<div class="section-title" ${secStyle}>• ${sec}</div>`;
                
                secL.forEach(i => {
                    const isTpl = currentTab === 'template-detail';
                    let rHtml = `<span class="count-tag">x${i.count > 0 ? i.count : 1}</span><button class="subtle-delete" onclick="deleteGlobalItem(${i.id},event)">✕</button>`;
                    let chkClass = i.packed ? 'checked' : 'unchecked';
                    if (isRental) chkClass = i.packed ? 'checked-rental' : 'unchecked-rental';

                    inner += `<div class="item-row" onclick="toggleItemPacked(${i.id})"><div class="item-left"><div class="checkbox ${isTpl ? 'hidden' : chkClass}">${i.packed ? '✓' : ''}</div><div class="item-info" style="${isTpl ? 'padding-left:5px;':''}"><p class="item-name ${currentTab==='shift-detail'&&i.packed ? 'packed-text' : 'active-item'}">${i.name}</p><p class="item-brand">${i.brand}</p></div></div><div class="item-right-side">${rHtml}</div></div>`;
                });
            });
        });
        if (isInv && !list.length) inner = `<div style="padding:15px;color:#71717a;text-align:center;">Пусто</div>`;
        const headerCounter = isInv ? `${list.filter(x => x.packed).length}/${list.length}` : `${cPk}/${cTot}`;
        const inlineAddBtn = `<button style="background:#27272a; border:none; color:#fff; border-radius:4px; width:22px; height:22px; font-weight:bold; cursor:pointer; margin-left:8px; display:inline-flex; align-items:center; justify-content:center;" onclick="event.stopPropagation(); handleCategoryAdd('${k}')">+</button>`;
        const cardClass = isRental ? 'card card-rental marker-rental' : `card marker-${k}`;
        const counterClass = isRental ? 'card-counter text-rental' : 'card-counter';

        html += `<div class="${cardClass}"><div class="card-header" onclick="toggleCategoryCollapse('${k}')"><div class="card-title"><span>${inf.icon}</span> ${inf.name}</div><div style="display:flex; align-items:center;"><span class="${counterClass}">${headerCounter}</span>${inlineAddBtn}<span style="color:#71717a;font-size:10px;margin-left:8px;">${collapsedCats[k]?'▶':'▼'}</span></div></div><div class="item-list ${collapsedCats[k]?'hidden':''}">${inner}</div></div>`;
    });
    if (currentTab === 'shift-detail') {
        const pct = tot > 0 ? Math.round((pk / tot) * 100) : 0;
        document.getElementById("progress-count").innerText = `Собрано: ${pk} / ${tot}`;
        document.getElementById("progress-percent").innerText = pct + "%"; document.getElementById("progress-fill").style.width = pct + "%";
    }
    return html;
}
function checkoutToShiftFlex() {
    const chosen = warehouseItems.filter(i => i.packed); if (!chosen.length) { alert("Вы не выбрали ни одного прибора галочкой!"); return; }
    const name = prompt("Введите название новой смены:"); if (!name || !name.trim()) return;
    shiftsList.push({ id: Date.now(), name: name.trim(), date: prompt("Дата смены:", new Date().toLocaleDateString('ru-RU')) || "", items: chosen.map(i => ({ ...i, id: Date.now() + Math.random(), packed: false, count: i.count > 0 ? i.count : 1 })) });
    warehouseItems.forEach(i => i.packed = false); saveAll(); switchTab('shifts');
}
