let warehouseSearchQuery="";
function getOrderedSubcategories(k,l){const r=[...new Set(l.map(x=>x.subcategory))],s=subcatOrder[k]||[],o=s.filter(x=>r.includes(x));r.forEach(x=>{if(!o.includes(x))o.push(x);});subcatOrder[k]=o;return o;}
function buildHtml(arr){
    let pk=0,tot=0,html="";const isInv=currentTab==='inventory',isTpl=currentTab==='template-detail',isEdit=isInv&&isWarehouseEditMode;
    if(isInv){
        if(isEdit)html+=`<div style="background:#2a1c10;border:1px solid #d97706;color:#f59e0b;padding:10px 14px;border-radius:12px;margin-top:12px;font-size:13px;font-weight:600;text-align:center;">⚙️ Режим правки: двигайте разделы, меняйте цеха или удаляйте позиции</div>`;
        html+=`<div style="margin:12px 0 16px;box-sizing:border-box;"><input type="text" id="warehouse-search" placeholder="🔍 Поиск по наименованию или описанию..." value="${warehouseSearchQuery}" oninput="handleWarehouseSearch(event)" style="width:100%;padding:12px 16px;background:#1c1c1e;border:1px solid #27272a;border-radius:12px;color:#fff;font-size:15px;outline:none;box-sizing:border-box;-webkit-appearance:none;"></div>`;
    }
    Object.keys(categoriesConfig).forEach(k=>{
        const inf=categoriesConfig[k];let list=arr.filter(x=>x.category===k);
        if(!isInv&&!list.length)return;
        if(isInv&&warehouseSearchQuery.trim()!==""){const q=warehouseSearchQuery.toLowerCase().trim();list=list.filter(i=>i.name.toLowerCase().includes(q)||i.brand.toLowerCase().includes(q)||i.subcategory.toLowerCase().includes(q));if(!list.length)return;}
        let cPk=0,cTot=0,inner="";list.forEach(i=>{cTot+=i.count;tot+=i.count;if(i.packed){cPk+=i.count;pk+=i.count;}});
        const isR=k==='rental',oSubs=getOrderedSubcategories(k,list);
        oSubs.forEach((sub,idx)=>{
            const subL=list.filter(x=>x.subcategory===sub);if(!subL.length)return;
            const sSt=isR?'style="color:#f59e0b;border-bottom:2px solid #5f3e0e;display:flex;justify-content:space-between;align-items:center;"':'style="display:flex;justify-content:space-between;align-items:center;"';
            let sCtrl="";
            if(isEdit){
                const uB=idx>0?`<button onclick="event.stopPropagation();moveSubcategory('${k}','${sub}',-1)" style="background:#3f3f46;border:none;color:#fff;border-radius:4px;padding:2px 7px;font-size:11px;cursor:pointer;">▲</button>`:`<span style="width:24px;display:inline-block;"></span>`;
                const dB=idx<oSubs.length-1?`<button onclick="event.stopPropagation();moveSubcategory('${k}','${sub}',1)" style="background:#3f3f46;border:none;color:#fff;border-radius:4px;padding:2px 7px;font-size:11px;cursor:pointer;">▼</button>`:`<span style="width:24px;display:inline-block;"></span>`;
                sCtrl=`<div style="display:flex;gap:4px;">${uB}${dB}</div>`;
            }
            if(sub!=="none")inner+=`<div class="subcategory-title" ${sSt}><span>${sub}</span>${sCtrl}</div>`;
            [...new Set(subL.map(x=>x.section))].forEach(sec=>{
                const secL=subL.filter(x=>x.section===sec);if(!secL.length)return;
                if(sec!=="")inner+=`<div class="section-title" ${isR?'style="background:#3a2512;color:#f59e0b;"':''}>• ${sec}</div>`;
                secL.forEach(i=>{
                    let rH=`<span class="count-tag">x${i.count>0?i.count:1}</span>`;
                    if(isEdit)rH=`<button onclick="event.stopPropagation();changeItemCategory(${i.id})" style="background:#27272a;border:1px solid #3f3f46;color:#60a5fa;border-radius:6px;padding:5px 8px;font-size:11px;font-weight:600;cursor:pointer;">Цех ⇄</button><button onclick="event.stopPropagation();deleteGlobalItem(${i.id},event)" style="background:#2a1414;border:1px solid #3d1b1b;color:#ef4444;border-radius:6px;padding:5px 9px;font-size:12px;font-weight:700;cursor:pointer;">✕</button>`;
                    else if(!isInv)rH+=`<button class="subtle-delete" onclick="deleteGlobalItem(${i.id},event)">✕</button>`;
                    let cCl=i.packed?'checked':'unchecked';if(isR)cCl=i.packed?'checked-rental':'unchecked-rental';
                    const hC=isTpl||isEdit;
                    inner+=`<div class="item-row" onclick="if(!isWarehouseEditMode)toggleItemPacked(${i.id})"><div class="item-left"><div class="checkbox ${hC?'hidden':cCl}">${i.packed?'✓':''}</div><div class="item-info" style="${hC?'padding-left:2px;':''}"><p class="item-name ${currentTab==='shift-detail'&&i.packed?'packed-text':'active-item'}">${i.name}</p><p class="item-brand">${i.brand}</p></div></div><div class="item-right-side">${rH}</div></div>`;
                });
            });
        });
        if(isInv&&!list.length)inner=`<div style="padding:15px;color:#71717a;text-align:center;">Пусто</div>`;
        const hCnt=isInv?`${list.filter(x=>x.packed).length}/${list.length}`:`${cPk}/${cTot}`;
        const addB=isInv?`<button style="background:#27272a;border:none;color:#fff;border-radius:4px;width:22px;height:22px;font-weight:bold;cursor:pointer;margin-left:8px;display:inline-flex;align-items:center;justify-content:center;" onclick="event.stopPropagation();handleCategoryAdd('${k}')">+</button>`:"";
        const hR=isTpl?"":`<span class="${isR?'card-counter text-rental':'card-counter'}">${hCnt}</span>${addB}`;
        html+=`<div class="${isR?'card card-rental marker-rental':'card marker-'+k}"><div class="card-header" onclick="toggleCategoryCollapse('${k}')"><div class="card-title" style="${isR?'color:#f59e0b;':''}"><span>${inf.icon}</span> ${inf.name}</div><div style="display:flex;align-items:center;">${hR}<span style="color:#71717a;font-size:10px;margin-left:8px;">${collapsedCats[k]?'▶':'▼'}</span></div></div><div class="item-list ${collapsedCats[k]?'hidden':''}">${inner}</div></div>`;
    });
    if(currentTab==='shift-detail'){const pct=tot>0?Math.round((pk/tot)*100):0;document.getElementById("progress-count").innerText=`Собрано: ${pk} / ${tot}`;document.getElementById("progress-percent").innerText=pct+"%";document.getElementById("progress-fill").style.width=pct+"%";}
    return html;
}
function handleWarehouseSearch(e){warehouseSearchQuery=e.target.value;renderAll();const i=document.getElementById("warehouse-search");if(i)i.focus();}
function checkoutToShiftFlex(){const ch=warehouseItems.filter(i=>i.packed);if(!ch.length){alert("Вы не выбрали ни одного прибора галочкой!");return;}const n=prompt("Введите название новой смены:");if(!n||!n.trim())return;shiftsList.push({id:Date.now(),name:n.trim(),date:prompt("Дата смены:",new Date().toLocaleDateString('ru-RU'))||"",items:ch.map(i=>({...i,id:Date.now()+Math.random(),packed:false,count:i.count>0?i.count:1}))});warehouseItems.forEach(i=>i.packed=false);warehouseSearchQuery="";saveAll();switchTab('shifts');}
function buildTemplatesHtml(){let h=templatesList.map(t=>`<div class="card" style="margin-top:12px;display:flex;flex-direction:column;padding:16px;box-sizing:border-box;cursor:pointer;" onclick="currentTab='template-detail';activeTemplateId='${t.id}';renderAll()"><div style="font-size:17px;font-weight:600;color:#fff;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;"><span>${t.name}</span><span style="color:#71717a;font-size:14px;">▶</span></div><div style="height:1px;background:#27272a;margin-bottom:10px;width:100%;"></div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:13px;color:#a1a1aa;">${t.desc||"Без описания"}</span><span style="font-size:12px;color:#3b82f6;font-weight:500;">📦 Позиций: ${t.items?t.items.length:0}</span></div><div style="display:flex;align-items:center;gap:12px;"><button class="add-btn" style="width:auto;height:auto;border-radius:6px;padding:6px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;background:#16a34a;border:1px solid #15803d;color:#fff;" onclick="event.stopPropagation();createShiftFromTemplate('${t.id}')">Создать смену</button><button style="background:#2a1414;border:1px solid #3d1b1b;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:6px 12px;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();if(confirm('Удалить шаблон?')){deleteGlobalItem('${t.id}',event)}">Удалить</button></div></div></div>`).join('');if(!templatesList.length)h=`<div class="empty-text">Шаблонов нет.</div>`;return h+`<button onclick="createTemplateFromWarehouse()" class="big-green-btn">Сделать шаблон из выбранного на складе</button>`;}
function shareShiftToTelegram(){const s=shiftsList.find(x=>x.id===activeShiftId);if(!s)return;let t=`🎬 СМЕНА: ${s.name.toUpperCase()}\n📅 Дата: ${s.date}\n📊 Сборы: ${s.items.filter(i=>i.packed).length}/${s.items.length}\n\n`;Object.keys(categoriesConfig).forEach(k=>{const inf=categoriesConfig[k],l=s.items.filter(i=>i.category===k);if(!l.length)return;t+=`${inf.icon} ${inf.name.toUpperCase()}:\n`;l.forEach(i=>{t+=`  ${i.packed?"🟢":"🔴"} ${i.name} (${i.brand}) x${i.count}\n`;});t+=`\n`;});t+=`Max&Clio equipment checklist\nУдачной смены!`;if(navigator.share)navigator.share({title:s.name,text:t}).catch(e=>console.log(e));else{navigator.clipboard.writeText(t);alert("Скопировано в буфер! Вставьте в Telegram.");}}
