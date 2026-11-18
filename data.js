const categoriesConfig = {
    camera: { name: "Камера", icon: "🎥" },
    sound: { name: "Звук", icon: "🔊" },
    support: { name: "Вспомогательное оборудование", icon: "⚙️" },
    light: { name: "Свет", icon: "💡" },
    grip: { name: "Стойки, Грип", icon: "🛠️" },
    rental: { name: "Арендное оборудование", icon: "🛒" }
};

const defaultClioWarehouse = [
{"id":1,"name":"Panasonic GH6","brand":"Мощь Микры!","count":1,"packed":false,"category":"camera","subcategory":"Камеры","section":"Разное"},
{"id":2,"name":"DZO Vespid Prime","brand":"Комплект оптики","count":8,"packed":false,"category":"camera","subcategory":"Оптика","section":"Объективы"},
{"id":3,"name":"Адаптер Metabones PL-MFT","brand":"Устанавливаем кинооптику на Микуру!","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Оптические адаптеры"},
{"id":4,"name":"Адаптер DZO PL-L","brand":"Проверяем наличие!","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Оптические адаптеры"},
{"id":5,"name":"Адаптер DZO PL-E","brand":"Устанавливаем кинооптику на Sony","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Оптические адаптеры"},
{"id":6,"name":"Адаптер DZO PL-RF","brand":"Устанавливаем кинооптику на Canon/RED","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Оптические адаптеры"},
{"id":7,"name":"Переменный ND K&F","brand":"ND+CPL 77mm","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Светофильтры"},
{"id":8,"name":"Переменный ND Benro","brand":"82mm(Стас)","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Светофильтры"},
{"id":9,"name":"Mist фильтр 1/2","brand":"77mm","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Светофильтры"},
{"id":10,"name":"Soft фильтр","brand":"77mm","count":1,"packed":false,"category":"camera","subcategory":"Оптика","section":"Светофильтры"},
{"id":11,"name":"Обвес для GH6","brand":"Комплект в кейсе","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Обвес","bundle":"Клетка Tilta, Базовая площадка с держателем суппортов (Макс), Суппорта Smallrig x2, Площадка питания Tilta NP-F, Поддержка объектива Smallrig x1, Компендиум Tilta, Верхняя ручка Tilta, Держатель SSD Tilta, Фиксатор HDMI Tilta, Magic arm SmallRig"},
{"id":12,"name":"Базовая площадка с держателем суппортов","brand":"Стас","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Обвес"},
{"id":13,"name":"Суппорта Smallrig","brand":"30см","count":2,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Обвес"},
{"id":14,"name":"Поддержка объектива Smallrig","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Обвес"},
{"id":15,"name":"Верхняя ручка для камеры","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Обвес"},
{"id":16,"name":"Magic arm Smallrig","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Обвес"},
{"id":23,"name":"Накамерный монитор Portkeys 5”","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Накамерные мониторы"},
{"id":24,"name":"Накамерный монитор Viltrox 7”","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Накамерные мониторы"},
{"id":25,"name":"SSD Samsung T7 Shield 1TB","brand":"Без описания","count":3,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Носители информации"},
{"id":26,"name":"Карта памяти CFexpress SanDisk 128GB","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Носители информации"},
{"id":27,"name":"Карта памяти Samsung 512GB","brand":"microSD с адаптером","count":3,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Носители информации"},
{"id":28,"name":"Карта памяти SD SanDisk 256GB","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Носители информации"},
{"id":29,"name":"Карта памяти SD Netac 128GB","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Носители информации"},
{"id":30,"name":"Карта памяти SD Kingston 128GB","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Носители информации"},
{"id":31,"name":"HDMI кабель Smallrig","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Коммутационное оборудование"},
{"id":32,"name":"HDMI кабель Tilta","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Коммутационное оборудование"},
{"id":33,"name":"HDMI кабель 30см","brand":"Без описания","count":2,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Коммутационное оборудование"},
{"id":34,"name":"Адаптер питания BLK22","brand":"Без описания","count":1,"packed":false,"category":"camera","subcategory":"Оборудование для камеры","section":"Питание"},
{"id":35,"name":"Штатив Vinten","brand":"Без описания","count":1,"packed":false,"category":"support","subcategory":"Штативы","section":"Разное"},
{"id":36,"name":"Штатив Benro","brand":"Без описания","count":1,"packed":false,"category":"support","subcategory":"Штативы","section":"Разное"},
{"id":37,"name":"Сендеры Hollyland","brand":"Mars 400s Pro","count":1,"packed":false,"category":"support","subcategory":"Видеооборудование","section":"Передача видеосигнала"},
{"id":38,"name":"Моторизированный слайдер","brand":"TopRig S60","count":1,"packed":false,"category":"support","subcategory":"Операторское оборудование","section":"Разное"},
{"id":39,"name":"Рация","brand":"Без описания","count":2,"packed":false,"category":"support","subcategory":"Операторское оборудование","section":"Связь"},
{"id":40,"name":"Rode Wireless Pro","brand":"Радиосистема","count":1,"packed":false,"category":"sound","subcategory":"Микрофоны","section":"Беспроводные микрофоны"},
{"id":41,"name":"Rode Videomic","brand":"Пушка","count":1,"packed":false,"category":"sound","subcategory":"Микрофоны","section":"Накамерные микрофоны"},
{"id":42,"name":"Rode Videomicro","brand":"Пушка","count":1,"packed":false,"category":"sound","subcategory":"Микрофоны","section":"Накамерные микрофоны"},
{"id":43,"name":"Hollyland Lark M2","brand":"Радиосистема","count":1,"packed":false,"category":"sound","subcategory":"Микрофоны","section":"Беспроводные микрофоны"},
{"id":44,"name":"DJI Mic mini*","brand":"Радиосистема","count":1,"packed":false,"category":"sound","subcategory":"Микрофоны","section":"Беспроводные микрофоны"},
{"id":45,"name":"Петличный микрофон Aputure","brand":"Проводная петля","count":1,"packed":false,"category":"sound","subcategory":"Микрофоны","section":"Проводные микрофоны"},
{"id":46,"name":"Удлинитель аудиокабеля 3.5","brand":"Без описания","count":2,"packed":false,"category":"sound","subcategory":"Аудиокабели","section":"Разное"},
{"id":47,"name":"Кабель Jack 3.5-RCA","brand":"Без описания","count":1,"packed":false,"category":"sound","subcategory":"Аудиокабели","section":"Разное"},
{"id":48,"name":"Кабель Jack 3.5-6.3","brand":"Без описания","count":1,"packed":false,"category":"sound","subcategory":"Аудиокабели","section":"Разное"},
{"id":49,"name":"Кабель XLR папа-мама","brand":"Без описания","count":1,"packed":false,"category":"sound","subcategory":"Аудиокабели","section":"Разное"},
{"id":50,"name":"Наушники","brand":"Для мониторинга звука","count":1,"packed":false,"category":"sound","subcategory":"Наушники","section":"Разное"},
{"id":51,"name":"HDMI кабель 50см","brand":"Без описания","count":1,"packed":false,"category":"support","subcategory":"Коммутационное оборудование","section":"Видеокабели"},
{"id":52,"name":"HDMI кабель 150см","brand":"Без описания","count":2,"packed":false,"category":"support","subcategory":"Коммутационное оборудование","section":"Видеокабели"},
{"id":53,"name":"Кабель Type-c Type-c","brand":"Без описания","count":4,"packed":false,"category":"support","subcategory":"Коммутационное оборудование","section":"USB кабели"},
{"id":54,"name":"Удлинитель","brand":"Катушка 10м","count":3,"packed":false,"category":"support","subcategory":"Коммутационное оборудование","section":"Удлинители"},
{"id":55,"name":"SmallRig NP-F970","brand":"Без описания","count":2,"packed":false,"category":"support","subcategory":"Питание","section":"NP-F аккумуляторы"},
{"id":56,"name":"NP-F970","brand":"Без описания","count":2,"packed":false,"category":"support","subcategory":"Питание","section":"NP-F аккумуляторы"},
{"id":57,"name":"NP-F750","brand":"Без описания","count":1,"packed":false,"category":"support","subcategory":"Питание","section":"NP-F аккумуляторы"},
{"id":58,"name":"Viltrox NP-F550","brand":"Без описания","count":1,"packed":false,"category":"support","subcategory":"Питание","section":"NP-F аккумуляторы"},
{"id":59,"name":"Адаптер питания 140w","brand":"Для пайпов","count":2,"packed":false,"category":"support","subcategory":"Питание","section":"Адаптеры питания"},
{"id":60,"name":"Панель Aputure Nova 300*","brand":"RGB","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":61,"name":"Nanlite 300W","brand":"RGB","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":62,"name":"Liyadi 330W","brand":"BiColor","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":63,"name":"Nanlite 175W","brand":"BiColor","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":64,"name":"Ковер Soonwell FB22*","brand":"BiColor","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":65,"name":"Pipe Ulanzi 120W*","brand":"BiColor","count":2,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":66,"name":"Came-TV 55W*","brand":"Линзовые приборы","count":3,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":67,"name":"Панель Amaran P60X","brand":"BiColor","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":68,"name":"Zhiyun 60X","brand":"BiColor","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":69,"name":"Трубки Ambitful","brand":"RGB","count":2,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":70,"name":"Трубка Nanlite","brand":"RGB","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":71,"name":"Youngnuo","brand":"RGB","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светодиодные приборы"},
{"id":72,"name":"Arri 1KW","brand":"3200K","count":3,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Галогеновые приборы"},
{"id":73,"name":"Ace 650W","brand":"3200K","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Галогеновые приборы"},
{"id":74,"name":"Sachtler 300W","brand":"3200K","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Галогеновые приборы"},
{"id":75,"name":"Софтбокс Amaran 120","brand":"120cm","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки"},
{"id":76,"name":"Софтбокс Smallrig 90","brand":"90cm","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки"},
{"id":77,"name":"Софтбокс Zhiyun 60X","brand":"Только для Zhiyun 60","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки"},
{"id":78,"name":"Софтбокс Amaran P60X","brand":"Только для Amaran P60X","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки"},
{"id":79,"name":"Линза Френеля","brand":"байонет Bowens","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки"},
{"id":80,"name":"Spotlight","brand":"Проекционная насадка байонет Bowens","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки"},
{"id":81,"name":"Рама 1x1","brand":"Разборная рама (100х100cm)","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Рамы и ткани"},
{"id":82,"name":"Рама 120x90","brand":"Разборная,с отражающей и черной тканью","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Рамы и ткани"},
{"id":83,"name":"Большой отражатель","brand":"5в1","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Отражение"},
{"id":84,"name":"Пенопласт","brand":"Без описания","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Отражение"},
{"id":85,"name":"Ткань негативная","brand":"Без описания","count":1,"packed":false,"category":"light","subcategory":"Осветительное оборудование","section":"Флаги и негатив"},
{"id":86,"name":"C-Stand 40”","brand":"+Extension","count":2,"packed":false,"category":"grip","subcategory":"Стойки","section":"Разное"},
{"id":87,"name":"Стойка GB Titan 240","brand":"Без описания","count":4,"packed":false,"category":"grip","subcategory":"Стойки","section":"Разное"},
{"id":88,"name":"Средняя стойка FE2800*","brand":"Без описания","count":1,"packed":false,"category":"grip","subcategory":"Стойки","section":"Разное"},
{"id":89,"name":"Маленькие стойки","brand":"От Came-TV","count":3,"packed":false,"category":"grip","subcategory":"Стойки","section":"Разное"},
{"id":90,"name":"Напольная «лягушка» телескопическая","brand":"Должна быть с пальцем!","count":1,"packed":false,"category":"grip","subcategory":"Стойки","section":"Разное"},
{"id":91,"name":"Напольная «лягушка»","brand":"Должна быть с пальцем!","count":1,"packed":false,"category":"grip","subcategory":"Стойки","section":"Разное"},
{"id":92,"name":"Mini boom Avenger D600*","brand":"Без описания","count":2,"packed":false,"category":"grip","subcategory":"Грип","section":"Журавли и держатели"},
{"id":93,"name":"Крепление с пальцем под трубу","brand":"Без описания","count":2,"packed":false,"category":"grip","subcategory":"Грип","section":"Крепления и зажимы"},
{"id":94,"name":"Прищепки","brand":"Без описания","count":6,"packed":false,"category":"grip","subcategory":"Грип","section":"Крепления и зажимы"},
{"id":95,"name":"Поворотный адаптер для света","brand":"Должен быть с пальцем!","count":2,"packed":false,"category":"grip","subcategory":"Грип","section":"Адаптеры и переходники"},
{"id":96,"name":"Сэндбэг","brand":"Без описания","count":5,"packed":false,"category":"grip","subcategory":"Грип","section":"Утяжелители и балласт"},
{"id":97,"name":"Panasonic S5II","brand":"Всегда проверять!","count":1,"packed":false,"category":"rental","subcategory":"Камеры","section":"Разное","url":"/rent/kamery-panasonic/kamera_panasonic_lumix_dc_s5_ii_body/"},
{"id":98,"name":"Panasonic S5IIX","brand":"Всегда проверять!","count":1,"packed":false,"category":"rental","subcategory":"Камеры","section":"Разное","url":"/rent/fotoapparaty-panasonic/kamera_panasonic_lumix_dc_s5_ii_x_body_l_mount/"},
{"id":99,"name":"Sony FX3","brand":"Всегда проверять!","count":2,"packed":false,"category":"rental","subcategory":"Камеры","section":"Разное","url":"/rent/videokamery-sony/kamera-sony-fx3-cinema-line/"},
{"id":100,"name":"Sony FX30","brand":"Всегда проверять!","count":2,"packed":false,"category":"rental","subcategory":"Камеры","section":"Разное","url":"/rent/videokamery-sony/kamera_sony_ilme_fx30_body/"},
{"id":101,"name":"Blackmagic 6K EF","brand":"Всегда проверять!","count":3,"packed":false,"category":"rental","subcategory":"Камеры","section":"Разное","url":"/rent/kamery-blackmagic-design/kamera-blackmagic-pocket-cinema-camera-6k-ef/"},
{"id":102,"name":"DJI Osmo Pocket 4P","brand":"Combo,всегда проверять!","count":1,"packed":false,"category":"rental","subcategory":"Камеры","section":"Разное","url":"/rent/ekstrim-kamery-dji/kamera_dji_osmo_pocket_4p_vlog_combo/"},
{"id":103,"name":"Объектив Laowa 24mm F14 Cine","brand":"Всегда проверять!","count":1,"packed":false,"category":"rental","subcategory":"Оптика","section":"Объективы","url":"/rent/obektivy-ef-i-rf-mount-dlya-canon/obektiv-laowa-24mm-f-14-2x-macro-probe-ef-cine-bayonet-ef/"},
{"id":104,"name":"Адаптер PL-E","brand":"Устанавливаем кинооптику на Sony","count":1,"packed":false,"category":"rental","subcategory":"Оптика","section":"Оптические адаптеры","url":"/rent/adaptery-na-sony-a-e-fz/adapter-pl-pro-to-e/"},
{"id":105,"name":"Адаптер Sigma MC-21 EF-L","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Оптика","section":"Оптические адаптеры","url":"/rent/adaptery-l/perekhodnik-sigma-mc-21-canon-ef-l/"},
{"id":106,"name":"Комплект VND фильтров для DJI Osmo Pocket 4P","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Оптика","section":"Светофильтры","url":"/rent/peremennye-nd-filtry-neytralno-serye/filtry_vnd_i_cpl_komplekt_filtrov_smallrig_dlya_dji_osmo_pocket_4p_/"},
{"id":107,"name":"Клетка для Sony FX3/FX30","brand":"Без описания","count":2,"packed":false,"category":"rental","subcategory":"Оборудование для камеры","section":"Обвес","url":"/rent/kletki-dlya-kamer-sony/kamera_sony_ilme_fx3_body/"},
{"id":108,"name":"Сетевой адаптер NP-FZ100","brand":"Для Sony FX3","count":2,"packed":false,"category":"rental","subcategory":"Оборудование для камеры","section":"Питание","url":"/rent/zaryadnye-ustroystva-i-setevye-adaptery-dlya-akkumulyatorov-sony/setevoy-adapter-pitaniya-np-fz100-dlya-kamer-sony-a7-iii-a7r-iii-a9/"},
{"id":109,"name":"HDMI кабель 5м","brand":"Без описания","count":2,"packed":false,"category":"rental","subcategory":"Коммутационное оборудование","section":"Видеокабели","url":"/rent/kabeli-hdmi/kabel-hdmi-hdmi-dlina-5-m/"},
{"id":110,"name":"Монитор FeelWorld LUT 11S","brand":"10.1”,4K,без мультикама","count":1,"packed":false,"category":"rental","subcategory":"Видеооборудование","section":"Просмотровые мониторы","url":"/rent/rezhisserskie-monitory-zhk/rezhissyerskiy_monitor_feelworld_lut11s_razmer_10_1_4k/"},
{"id":111,"name":"Монитор Liliput A11","brand":"10.1”,без мультикама","count":1,"packed":false,"category":"rental","subcategory":"Видеооборудование","section":"Просмотровые мониторы","url":"/rent/nakamernye-monitory/nakamernyy-monitor-lilliput-a11-sdi-hdmi-in-out-10-1/"},
{"id":112,"name":"Монитор Liliput BM150","brand":"15.6”,4K,есть мультикам на 4 камеры","count":1,"packed":false,"category":"rental","subcategory":"Видеооборудование","section":"Просмотровые мониторы","url":"/rent/rezhisserskie-monitory-zhk/rezhisserskiy-monitor-lilliput-bm150-4k-ips-razmer-15-6-/"},
{"id":113,"name":"Суфлер Desview Telepromter","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Видеооборудование","section":"Суфлеры","url":"/rent/telesuflery/telesufler_smallrig_3646_multifunctional_teleprompter_desview_t12s/"},
{"id":114,"name":"Amaran Halo 600X","brand":"BiColor,отдельно нужен рефлектор","count":2,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Светодиодные приборы","url":"/rent/svetodiodnye-led-osvetitelnye-pribory-aputure/svetodiodnyy_osvetitelnyy_pribor_aputure_amaran_halo_600x_2700_6500k/"},
{"id":115,"name":"Amaran 300C","brand":"RGB","count":2,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Светодиодные приборы","url":"/rent/svetodiodnye-led-osvetitelnye-pribory-aputure/svetodiodnyy_osvetitelnyy_pribor_aputure_amaran_300c_2500_7500k/"},
{"id":116,"name":"Aputure Accent B7C","brand":"RGB","count":2,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Светодиодные приборы","url":"/rent/svetodiodnye-led-osvetitelnye-pribory-aputure/lampa-aputure-accent-b7c-7w-rgb/"},
{"id":117,"name":"Spotlight","brand":"Проекционная насадка байонет Bowens","count":1,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Светоформирующие насадки","url":"/rent/modifikatory/modifikator_sveta_aputure_spotlight_se_36_lens_kit_15_gobo_masok/"},
{"id":118,"name":"Фрост рама разборная 100x100","brand":"Без описания","count":2,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Рамы и ткани","url":"/rent/flagi-i-frost-ramy/frost-rama-razmer-100kh100-sm/"},
{"id":119,"name":"Складная рама Avenger 8x8","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Рамы и ткани","url":"/rent/flagi-i-frost-ramy/rama-skladnaya-avenger-h2508-razmer-8-kh-8-futov-244-kh-244-sm/"},
{"id":120,"name":"Текстиль Silk 1/4 8x8","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Рамы и ткани","url":"/rent/polotna-dlya-frost-ram/tekstil-dlya-ramy-8x8-silk-1-4/"},
{"id":121,"name":"Текстиль 1/2 8x8","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Рамы и ткани","url":"/rent/polotna-dlya-frost-ram/tekstil-dlya-ramy-8x8-prosvetnyy-1-2-sdl/"},
{"id":122,"name":"Флаг Avenger 60x90cm","brand":"24x36”","count":2,"packed":false,"category":"rental","subcategory":"Осветительное оборудование","section":"Флаги и негатив","url":"/rent/flagi-i-frost-ramy/flag-avenger-i750b-24x36-solid-black-flag-razmer-60x90-sm-tsvet-chernyy/"},
{"id":123,"name":"C-Stand 40”","brand":"+Extension","count":4,"packed":false,"category":"rental","subcategory":"Стойки","section":"Разное","url":"/rent/stoyki/stoyka-avenger-a2033l-kit-tip-c-stand-40-vysota-134-328-sm-nagruzka-do-10-kg/"},
{"id":124,"name":"Стойка Avenger A100","brand":"Без описания","count":4,"packed":false,"category":"rental","subcategory":"Стойки","section":"Разное","url":"/rent/stoyki/stoyka-avenger-combo-stand-a100/"},
{"id":125,"name":"Стойка Avenger Overhead","brand":"С колесами","count":2,"packed":false,"category":"rental","subcategory":"Стойки","section":"Разное","url":"/rent/stoyki/stoyka-avenger-a3042cs-overhead-stand-42-vysota-140-420-sm-nagruzka-do-40-kg/"},
{"id":126,"name":"Junior Boom Avenger D650","brand":"Без описания","count":2,"packed":false,"category":"rental","subcategory":"Грип","section":"Журавли и держатели","url":"/rent/zhuravli/zhuravl_avenger_d650_junior_boom_arm/"},
{"id":127,"name":"Сэндбэг","brand":"Без описания","count":5,"packed":false,"category":"rental","subcategory":"Грип","section":"Утяжелители и балласт","url":"/rent/stoyki-i-krepleniya-grip/sandbag-meshok-s-peskom/"},
{"id":128,"name":"Тележка","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Вспомогательное оборудование","section":"Тележки и маглайнеры","url":"/rent/telezhki/telezhka-skladnaya-magna-cart-flatform-truck-ff-s/"},
{"id":129,"name":"Интеркомы","brand":"Hollyland/Accsoon/Synco","count":1,"packed":false,"category":"rental","subcategory":"Операторское оборудование","section":"Связь","url":"/rent/ratsii-i-operatorskaya-svyaz/besprovodnoy_interkom_hollyland_solidcom_se_6s_na_6_abonentov/"},
{"id":130,"name":"Дым-машина","brand":"Без описания","count":1,"packed":false,"category":"rental","subcategory":"Вспомогательное оборудование","section":"Эффекты","url":"/rent/dym-mashiny/dym-mashina-involight-fm1500-1500-vt-vybros-dyma-do-10-m-obem-baka-2-5-l/"},
{"id":131,"name":"Удлинитель 50м","brand":"Катушка","count":2,"packed":false,"category":"rental","subcategory":"Коммутационное оборудование","section":"Удлинители","url":"/rent/setevye-katushki/setevaya-katushka-dlina-50-m-4-rozetki/"},
{"id":132,"name":"SmallRig NP-F970","brand":"Без описания","count":2,"packed":false,"category":"rental","subcategory":"Питание","section":"NP-F аккумуляторы","url":"/rent/akkumulyatory-dlya-videotekhniki-sony/akkumulyator_smallrig_np_f970/"}
];

const CLIO_DB_VER = "2026_11_18_v10";
let templatesList = localStorage.getItem('whTemplates') ? JSON.parse(localStorage.getItem('whTemplates')) : [];
let warehouseItems = [];
if (localStorage.getItem('clioDbVer') === CLIO_DB_VER && localStorage.getItem('whItems')) {
    warehouseItems = JSON.parse(localStorage.getItem('whItems'));
} else {
    warehouseItems = defaultClioWarehouse;
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('clioDbVer', CLIO_DB_VER);
    localStorage.removeItem('subcatOrder');
}

let shiftsList = localStorage.getItem('shiftsList') ? JSON.parse(localStorage.getItem('shiftsList')) : [];
let collapsedCats = localStorage.getItem('colCats') ? JSON.parse(localStorage.getItem('colCats')) : {};
let subcatOrder = localStorage.getItem('subcatOrder') ? JSON.parse(localStorage.getItem('subcatOrder')) : {};
let collapsedGroups = localStorage.getItem('colGroups') ? JSON.parse(localStorage.getItem('colGroups')) : {};

function saveAll() {
    localStorage.setItem('whItems', JSON.stringify(warehouseItems));
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList));
    localStorage.setItem('colCats', JSON.stringify(collapsedCats));
    localStorage.setItem('whTemplates', JSON.stringify(templatesList));
    localStorage.setItem('subcatOrder', JSON.stringify(subcatOrder));
    localStorage.setItem('colGroups', JSON.stringify(collapsedGroups));
}
