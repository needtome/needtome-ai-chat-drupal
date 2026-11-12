(function(){'use strict';
const AIWC_I18N={"ru":{"title":"NeedToMe AI Chat","tabs":{"setup":"Мастер настройки","settings":"Настройки","channels":"Каналы","knowledge":"База знаний","usage":"Статистика"},"loading":"Загрузка…","connectTitle":"Подключить AI Worker","connectIntro":"Подключите аккаунт kra.name, чтобы настроить чат, каналы и базу знаний и смотреть статистику.","connectBenefits":["Настройте консультанта и тексты чата в мастере","Выберите каналы для ответов и получения заявок","Добавьте публичные страницы сайта в базу знаний чата"],"connect":"Подключить","reconnect":"Переподключить","connected":"Подключено к kra.name","chooseChat":"Выберите чат для этого сайта","connectThisChat":"Подключить этот чат","createNewChat":"Создать новый чат","buyExtraChatOrUpgrade":"Купить дополнительный чат или выбрать тариф выше","chatExtraPrice":"Дополнительный онлайн-чат стоит +$:price в месяц.","chatExtraPriceUnavailable":"Актуальную цену дополнительного онлайн-чата смотрите на странице оплаты.","chatSlotsFull":"В тарифе нет свободного онлайн-чата. Можно купить дополнительный чат или выбрать тариф выше.","chatOwnerAccount":"Аккаунт","chatOwnerPlatform":"Платформа","chatEnabled":"Включён","chatDisabled":"Выключен","persona":"Личность","domains":"Домены","noDomains":"не указаны","connectedToSite":"Подключён к сайту","chatConnectedOtherTab":"Уже подключён на вкладке «:name»","confirmMoveChat":"Перенести чат на эту вкладку? Вкладка «:name» будет закрыта.","linkChat":"Подключить выбранные чаты","chats":"Чаты","newChat":"Новый чат","addChat":"Добавить чат","removeChat":"Удалить чат","removeChatConfirm":"Удалить этот чат с сайта? Его настройки и данные синхронизации будут очищены.","keyOnlyState":"Этот чат подключён по публичному ключу и может синхронизировать базу знаний сайта. Подключите его к аккаунту, чтобы управлять настройками, каналами и статистикой.","stackOrder":"Порядок виджетов","stackChats":"Показывать этот чат вместе с другими чатами сайта","greetPopupSite":"Показывать всплывающее приветствие этого чата на сайте","noChats":"В аккаунте пока нет чатов.","noChatsCreate":"В вашем аккаунте AI Worker ещё нет онлайн-чата. Создайте его в :panel и выберите здесь.","connectWindow":"Окно входа открыто. Эта страница обновится, когда вы вернётесь.","demoConnect":"Демо-режим: запрос на вход не отправляется на сервер.","httpError":"kra.name не ответил, попробуйте ещё раз.","retryAfter":"Повторите попытку через :count с.","unauthorized":"Срок подключения истёк. Подключитесь снова, чтобы продолжить.","retry":"Повторить","reload":"Загрузить настройки заново","stale":"В другой вкладке настройки изменились. Загрузите текущую версию перед сохранением.","save":"Сохранить","saving":"Сохранение…","saved":"Сохранено в kra.name.","nothingChanged":"Изменений нет.","wizardHelp":"Опишите задачу обычными словами: мастер настроит консультанта, базу знаний, приветствие и быстрые вопросы. Сначала он покажет изменения; нажмите «Применить», чтобы их использовать.","wizardPlaceholder":"Опишите, каким должен быть чат…","send":"Отправить","sending":"Отправка…","you":"Вы","assistant":"AI Worker","pending":"Ожидают вашего подтверждения","apply":"Применить","discard":"Отклонить","clear":"Начать новый разговор","clearConfirm":"Начать новый разговор и очистить историю?","voiceNote":"Голосовой ввод в этом окне настроек недоступен.","translate":"Перевести пустые поля","sourceLanguage":"Перевести с языка","textsByLanguage":"Тексты на языках","greeting":"Приветствие","quickQuestions":"Быстрые вопросы","quickQuestionsHelp":"Кнопки под приветствием: посетитель может задать вопрос одним нажатием. Пустые строки не показываются.","quickQuestion":"Быстрый вопрос :count","name":"Имя в заголовке чата","titleText":"Подпись под именем","tabLabel":"Подпись на боковой вкладке","nameFallback":"Имя консультанта","titleFallback":"Роль консультанта","fallbackHelp":"Для пустого поля серым текстом показываются имя и роль консультанта.","defaultLanguage":"Язык по умолчанию","consultant":"Консультант","knowledgeMode":"На что опирается консультант","knowledgeModeHelp":"С общими знаниями консультант отвечает и на общие вопросы по теме; цены, условия и контакты он берёт из вашей базы знаний.","companyKnowledge":"Использовать информацию о компании из панели kra.name","leads":"Заявки","collectLeads":"Собирать имя, телефон или email посетителя и его вопрос","sendLeads":"Отправлять заявки","testDelivery":"Проверить доставку","savedSecret":"Сохранено — оставьте пустым, чтобы не менять","emailFallback":"Email владельца","appearance":"Внешний вид","look":"Внешний вид","theme":"Тема","scheme":"Цветовая схема","color":"Основной цвет","position":"Положение кнопки чата","launcherIcon":"Значок кнопки чата","yourImage":"Ваше изображение","uploadImage":"Загрузить своё изображение","removeImage":"Удалить своё изображение","imageHelp":"PNG, JPEG или WebP до 1 МБ; изображение будет обрезано до квадрата.","aiNotice":"Сообщать, что отвечает ИИ и его ответы могут быть неточными","greetPopup":"Показывать приветствие ИИ при открытии страницы","inChat":"В чате","rating":"Разрешить посетителям оценивать ответы","voice":"Разрешить голосовой ввод","preview":"Предпросмотр","previewNote":"Предпросмотр меняется сразу; на сайте изменения появятся после сохранения.","channelsIntro":"Эти каналы настраиваются в панели kra.name. Откройте канал там, чтобы подключить его.","connectChannel":"Подключить :name в панели kra.name","connectedChannel":"Подключён","notConnectedChannel":"Не подключён","channelError":"Есть проблема с подключением","needs":"Понадобится","knowledgeIntro":"Публичные страницы сайта помогут консультанту отвечать посетителям. Товары можно подключить отдельно.","siteExport":"Выгрузка сайта","documents":"Документы","documentsCount":":count документ|:count документа|:count документов","characters":"Символы","indexing":"Индексация","dropped":"Не проиндексировано","lastSync":"Последняя синхронизация","syncNow":"Синхронизировать сейчас","syncStarted":"Синхронизация запущена.","syncJobQueued":"Синхронизация поставлена в очередь.","syncJobRunning":"Синхронизация выполняется.","syncJobRetry":"Сервис попросил снизить частоту запросов. Повтор запланирован.","syncJobCompleted":"Синхронизация завершена.","syncJobWarning":"Синхронизация завершена с предупреждением об экспорте.","syncJobFailed":"Синхронизация не выполнена. Проверьте подключение и попробуйте ещё раз.","syncJobPages":":count страница|:count страницы|:count страниц","syncJobProducts":":count товар|:count товара|:count товаров","syncJobResult":"Синхронизировано: :pages, :products.","syncJobPartialResult":"Успели обработать частично: :pages, :products.","syncJobProgress":"Обработано шагов: :done из :total.","syncJobFailureDetail":"Ошибка: :error","syncErrorReconnect":"Подключите AI Worker заново, чтобы продолжить синхронизацию.","syncErrorForeignSite":"Этот чат принадлежит другому сайту; создайте для этого сайта отдельный чат.","syncErrorBadToken":"Подключение чата истекло или было отозвано. Подключите плагин к AI Worker заново.","syncWorking":"Синхронизация…","knowledgeStatusUnavailable":"Не удалось получить состояние базы знаний.","syncFailed":"Не удалось запустить синхронизацию. Попробуйте ещё раз.","syncPages":"Синхронизировать публичные страницы","syncProducts":"Синхронизировать товары","productsUnavailable":"Синхронизация товаров для этого сайта недоступна.","sources":"На основе чего отвечает консультант","faq":"Вопросы и ответы","faqHelp":"Точные ответы на частые вопросы: консультант использует их без изменений.","faqEdit":"Изменить","faqQuestions":":count вопрос|:count вопроса|:count вопросов","allChatsOnSite":"Все чаты вашего аккаунта AI Worker уже есть на этом сайте. Создайте ещё один в :panel, а затем добавьте его здесь.","faqClear":"Очистить","faqClose":"Закрыть","faqClearConfirm":"Удалить все вопросы и ответы? Это нельзя отменить.","faqClearPartial":"Удалено: :done. Осталось: :left. Нажмите «Очистить» ещё раз через минуту.","addQuestion":"Добавить вопрос","newQuestion":"Новый вопрос","faqFilter":"Фильтр по вопросу и ответу","faqNone":"Ничего не найдено.","faqPage":"Страница :page из :pages","faqPrevious":"Предыдущая страница","faqNext":"Следующая страница","cancel":"Отменить","addSource":"Добавить источник","sourceType":"Тип источника","page":"Страница","text":"Текст","sourceUrl":"Адрес","sourceText":"Текст, который должен знать консультант","sourceTitle":"Название (необязательно)","add":"Добавить","refresh":"Обновить","delete":"Удалить","question":"Вопрос","answer":"Ответ","usageIntro":"Использование и статистика этого чата.","period":"Период","period7d":"7 дней","period30d":"30 дней","period90d":"90 дней","periodMonth":"Этот месяц","periodCustom":"Свой диапазон","periodFrom":"С","periodTo":"По","periodUpToYear":"Не больше года.","statistics":"Статистика","tokens":"Токены ИИ","of":"из","noLimit":"без лимита","sessions":"Сеансы","messagesIn":"Сообщения посетителей","answers":"Ответы","ratedHigh":"Положительные оценки","ratedLow":"Отрицательные оценки","leadsCount":"Заявки","noData":"За этот период данных нет.","noDialogs":"За этот период диалогов нет.","byDay":"По дням","day":"День","errorFields":"Проверьте поля с ошибками.","site":"Сайт","plan":"Тариф","notAvailable":"Недоступно","moveChat":"Перенести чат","syncReady":"Готово","syncPartial":"Индексировано частично","syncQueued":"Индексация в очереди","syncError":"Ошибка индексации","uploadError":"Выберите изображение PNG, JPEG или WebP до 1 МБ.","deliveryTestDone":"Тестовое сообщение отправлено.","confirmDelete":"Удалить этот элемент из базы знаний?","langNames":{"ru":"Русский","en":"English","uk":"Українська"},"manageChannel":"Настроить :name в панели kra.name","widgetOnSiteTitle":"Чат на сайте","widgetOnSite":"Показывать чат на публичных страницах сайта","widgetOnSiteHelp":"Виджет подключает скрипт из этого плагина; выключить его можно здесь в любой момент.","widgetOnSiteNoKey":"Сначала привяжите чат: виджету нужен его публичный ключ.","widgetShownToVisitors":"Показывается посетителям","widgetHidden":"Скрыт","widgetHiddenHelp":"Посетители не видят чат. Включите его, чтобы показать.","widgetNeedsChat":"Сначала подключите рабочий чат в шаге 1.","widgetShownNotice":"Теперь чат показывается на сайте.","widgetHiddenNotice":"Чат скрыт на сайте.","savedLocal":"Сохранено на этом сайте.","adminDescription":"Настройте подключение, внешний вид и работу чата на этом сайте.","stepConnectChat":"Подключите чат","connectYourChat":"Подключите чат","connectLead":"База знаний ИИ-консультанта, а также его инструкции заполняются в панели клиента :panel:","panelLinkLabel":"панели kra.name","panelLeadLinkLabel":"kra.name","everythingConnected":"Всё подключено","stepCreateChat":"Зарегистрируйтесь и создайте онлайн-чат в :panel.","stepChooseConsultant":"Выберите консультанта и наполните базу знаний чата.","stepAllowedSitesLinked":":domain добавлен в «Разрешённые сайты» чата автоматически.","stepAllowedSitesManual":"Добавьте :domain в «Разрешённые сайты» чата (www учитывается; :wildcard разрешает все поддомены).","stepAllowedSitesPlatformLinked":":domain добавлен в разрешённые сайты чата.","stepPublicKeyLinked":"Публичный ключ чата вставлен автоматически.","stepPublicKeyChoose":"Выберите чат здесь; его публичный ключ добавится автоматически.","stepPublicKeyManual":"Скопируйте публичный ключ wk_… из карточки чата и вставьте сюда.","connectAutomatically":"Подключить автоматически","chooseChatAutomatically":"Выбрать чат автоматически","chooseChatAutomaticallyHelp":"Кликните по ссылке и в списке ваших чатов kra.name выберите нужный (если вы не авторизованы, система предложит авторизоваться).","aiWorkerConnected":"AI Worker подключён","siteChatConsultant":"Чат этого сайта: консультант :name","siteChatNamed":"Чат этого сайта: :name","changeChat":"Сменить чат","chooseChatButton":"Выбрать чат","siteChat":"Чат этого сайта","chatWithConsultant":":chat (консультант :consultant)","chooseThisChat":"Выбрать чат","chooseAnotherChat":"Выбрать другой чат","disconnectAIWorker":"Отключить AI Worker","disconnectHelp":"После отключения чат на сайте продолжит работать. Подключение к AI Worker нужно мастеру настройки, статистике, блокам настроек чата, синхронизации базы знаний и каталога.","publicChatKey":"Публичный ключ чата","saveAndCheck":"Сохранить и проверить","publicKeyHelp":"Ключ только выбирает чат и не является секретом.","connectionNotices":{"connected":"AI Worker подключён. Когда чат подключён, мастер настройки — в шаге 1.","linked":"Чат подключён: его ключ сохранён, а этот сайт добавлен в разрешённые. Включите ниже «Показывать чат на сайте». Мастер настройки — в шаге 1 ниже.","link_unsupported":"kra.name пока не умеет подключать чат автоматически. Скопируйте публичный ключ wk_… из карточки чата и вставьте его выше.","link_domains":"У этого чата уже максимум — 20 разрешённых сайтов. Удалите один в настройках чата на kra.name и подключите снова.","chat_on_other_tab":"Этот чат уже подключён на вкладке «:name».","link_failed":"kra.name не подключил этот чат. Попробуйте ещё раз или скопируйте публичный ключ wk_… из карточки чата.","state":"Ссылка подключения устарела или открыта другим пользователем. Начните подключение заново.","failed":"Подключение не завершено. Начните его заново."},"invalidPublicKey":"Проверьте формат публичного ключа чата.","publicKeyDuplicate":"Этот ключ уже используется другим чатом на этом сайте.","chatsBusy":"Сейчас уже идёт другое изменение чатов. Попробуйте ещё раз.","publicKeyRejected":"Не удалось подтвердить этот ключ. Проверьте его в панели kra.name.","publicKeyCheckUnavailable":"Не удалось связаться с kra.name для проверки ключа. Попробуйте позже.","publicKeyChecked":"Чат :name найден. Ключ сохранён.","whereToShow":"Где показывать чат","features":"Возможности","design":"Дизайн чата","designClassic":"Окно чата","designBar":"Боковая вкладка","designPanel":"Панель","designInline":"Встроенный блок","blockId":"Идентификатор блока","blockHeight":"Высота блока, px","blockHelp":"Добавьте элемент с этим идентификатором в шаблон или содержимое страницы.","schemeFromChat":"Как в настройках чата на kra.name","schemeLight":"Светлая","schemeDim":"Приглушённая","schemeDark":"Тёмная","schemeAuto":"Автоматически","advancedColors":"Дополнительные цвета","advancedColorsHelp":"Переопределите отдельные цвета окна чата. Пустые значения используют тему чата.","useSchemeColor":"Использовать цвет темы","colorHeaderBg":"Фон заголовка","colorHeaderText":"Текст заголовка","colorBg":"Фон чата","colorSurface":"Поверхности","colorText":"Основной текст","colorMuted":"Приглушённый текст","colorBorder":"Границы","colorVisitorBubble":"Облачко посетителя","colorVisitorText":"Текст посетителя","colorAiBubble":"Облачко AI Worker","colorInputBg":"Фон поля ввода","buttonOffset":"Отступы кнопки","offsetSideways":"По горизонтали, px","offsetUpDown":"По вертикали, px","offsetHelp":"Задайте отступ от края сайта: от −300 до 300 px.","pages":"Показывать чат","pagesAll":"На всех страницах","pagesOnly":"Только на выбранных страницах","pagesExcept":"На всех, кроме выбранных страниц","pageList":"Пути страниц, по одному на строку","pageListHelp":"Можно использовать * как маску. Например: /contact/ и /shop/*.","showChatTiming":"Когда загружать чат","loadImmediate":"Сразу","loadInteraction":"После действия посетителя","loadDelay":"С задержкой","seconds":"секунд","privacyUrl":"Ссылка на политику конфиденциальности","saveSettings":"Сохранить настройки","usageAndLimits":"Расход и лимиты","usageNeedsConnection":"Подключите AI Worker и выберите чат, чтобы увидеть расход и лимиты.","openKraName":"Открыть kra.name","previewDescription":"Это настоящий виджет в режиме предпросмотра. Кнопка чата появится в углу страницы; изменения видны сразу, а посетителям — после сохранения.","previewUnavailable":"Не удалось загрузить живой предпросмотр виджета из AI Worker.","previewDemoNote":"Это предпросмотр дизайна. Ответы ИИ, голос и файлы доступны после подключения чата.","previewName":"Консультант","previewInput":"Напишите сообщение…","previewGreeting":"Здравствуйте! Чем могу помочь?","openChatWindow":"Открыть окно чата","closeChatWindow":"Закрыть окно чата","chatSettings":"Настройки чата","consultantAndChatTexts":"Консультант и тексты чата","connectForWizard":"Подключите AI Worker и выберите чат, чтобы открыть мастер и настройки каналов.","wizardMcpTelegram":"Мастер настройки / MCP / Telegram","mcpTitle":"Подключение MCP","mcpDescription":"Подключите AI Worker к инструментам разработки через MCP.","mcpInstructions":"Настроить MCP в панели kra.name","telegramTitle":"Telegram","telegramDescription":"Подключите Telegram, чтобы получать заявки и сообщения в канале.","connectTelegram":"Подключить Telegram","telegramLinkUnavailable":"Не удалось получить ссылку для подключения Telegram.","telegramOpened":"Ссылка Telegram открыта в новой вкладке.","launcherNeedsConnection":"Подключите чат, чтобы выбрать значок запуска.","connectForChatSettings":"Подключите чат, чтобы настроить консультанта, тексты, базу знаний и заявки.","noChatsWizard":"В аккаунте пока нет чатов. Попросите мастер настройки ниже создать чат: он подключится к этому сайту автоматически.","keyAutoHelp":"Публичный ключ подставляется автоматически, когда чат подключён. Чтобы ввести ключ вручную, отключите AI Worker.","stepAllowedSitesAuto":":domain добавляется в «Разрешённые сайты» чата автоматически.","stepAllowedSitesPlatform":"Для платформенного чата вручную добавьте домен этого сайта в «Разрешённые сайты» в панели AI Worker.","stepPublicKeyAuto":"Публичный ключ чата подставляется автоматически.","wizardUnavailable":"Мастер настройки сейчас недоступен для этого аккаунта. Откройте панель kra.name.","chatSettingsNeedChat":"Создайте чат мастером настройки в шаге 1, чтобы настроить консультанта, тексты, базу знаний и заявки.","launcherNeedsChat":"Значок запуска можно выбрать после создания чата.","usageNeedsChat":"Расход и лимиты чата появятся после его создания.","usageNeedsLinkedChat":"Расход и лимиты доступны для чата, подключённого к аккаунту. Синхронизация базы знаний по публичному ключу работает.","setupTabs":{"wizard":"Мастер настройки","mcp":"MCP","telegram":"Telegram","expand":"Развернуть","collapse":"Свернуть"},"accentText":"Цвет текста и значков на основном цвете","accentTextFromChat":"Как в настройках чата на kra.name","accentTextAuto":"Авто","accentTextWhite":"Белый","accentTextBlack":"Чёрный","mcpHelp":{"title":"Настройка чата из ChatGPT, Claude или Codex","intro":"Чатом можно управлять не из панели kra.name, а из вашего ИИ-ассистента: подключите к нему аккаунт AI Worker по MCP и просите обычными словами.","abilitiesTitle":"Что ассистент может сделать с чатом:","abilities":["создать онлайн-чат и его консультанта: имя, роль, инструкции;","наполнить базу знаний: сайт, отдельные страницы, Google Таблицы и Документы, FAQ;","найти, чего не хватает в базе знаний, и превратить ваши короткие ответы в FAQ;","написать приветствие и быстрые вопросы, изменить внешний вид и языки чата;","подключить чат к Telegram, Messenger, Instagram, WhatsApp или VK;","показать заявки, которые посетители оставили в чате."],"approval":"Каждое изменение ассистент сначала только предлагает и показывает, что сделает; применяется оно после вашего согласия в разговоре.","exampleLabel":"Например, попросите:","exampleCreate":"Создай онлайн-чат для моего сайта %s: личность консультанта с её ролью, страницы сайта в базе знаний, приветствие и быстрые вопросы.","exampleExisting":"Настройте существующий чат %1$s (ID %2$d) для %3$s: консультанта, источники знаний и приветствие.","chatgpt":"ChatGPT — в браузере","chatgptSteps":["Откройте %s → «Добавить» → пользовательский сервер MCP.","Название — %1$s, URL-адрес сервера — %2$s, аутентификация — OAuth. «Расширенные настройки OAuth» не трогайте: ChatGPT найдёт их сам.","Отметьте «Я понимаю и хочу продолжить» и нажмите «Создать в виде плагина».","Откроется страница AI Worker: войдите в панель (паролем или через Google) и нажмите «Разрешить доступ».","Готово: выберите плагин AI Worker в чате и попросите, что нужно."],"claude":"Claude (claude.ai)","claudeSteps":["Откройте «Настройки → Коннекторы → Добавить свой коннектор» и укажите адрес %s.","Войдите в AI Worker и нажмите «Разрешить доступ»."],"local":"Claude Code или Codex","localSteps":["В %s откройте «Настройки → Интеграции», нажмите «Выпустить ключ», а затем «Скачать файлом»: в папке «Загрузки» появится файл aiworker-key.txt.","Скопируйте и отправьте вашему Codex или Claude Code:"],"installPrompt":"Установи MCP-сервер AI Worker и скил aiworker из репозитория https://github.com/needtome/aiworker-skills. API-ключ лежит в файле ~/Downloads/aiworker-key.txt: перенеси его в переменную окружения AIWORKER_API_KEY, не показывая ключ на экране, а потом удали этот файл.","copy":"Скопировать","copied":"Скопировано","installHelp":"ИИ сам сохранит ключ, подключит MCP и скил. Перезапустите Codex или Claude Code, когда он попросит.","connectByHand":"Подключить вручную","keyStorage":"Храните ключ в переменной окружения <code>AIWORKER_API_KEY</code> на вашем компьютере, а не в файле проекта.","pluginCommands":"Claude Code: плагин со скилом и сервером AI Worker","serverOnly":"или только MCP-сервер:","codexConfig":"Codex: добавьте эти строки в <code>~/.codex/config.toml</code> и перезапустите Codex.","keyWarning":"Не вставляйте ключ прямо в чат с ИИ.","panelLabel":"панели kra.name","fullInstructions":"Отключить можно в любой момент в панели: «Настройки → Интеграции». Полная инструкция со скриншотами: %s.","integrationsLabel":"интеграции на kra.name"},"telegramHelp":{"title":"Мастер настройки в вашем Telegram","intro":"%s — тот же мастер, что и на вкладке «Мастер настройки», только в вашем Telegram. Напишите или надиктуйте, что изменить в онлайн-чате, и бот это сделает: каждое изменение он показывает с кнопками «Применить» и «Отменить».","whatYouCanAsk":"Что можно попросить:","items":["изменить консультанта: имя, роль, инструкции;","добавить в базу знаний страницы, документы и FAQ, восполнить то, чего в ней не хватает;","переписать приветствие и быстрые вопросы;","показать заявки и диалоги;","подключить чат к мессенджерам."],"commands":"Команды: <code>/status</code> — что ждёт вашего одобрения, <code>/account</code>, <code>/tariff</code>, <code>/new</code> — новый разговор, <code>/help</code>.","notifications":"Этот же бот присылает уведомления: новые заявки, просьбы позвать человека, вопросы, на которые консультант не смог ответить, проблемы с каналами и ежедневную сводку.","connect":"Подключить","oneTime":"Telegram откроет бота: нажмите «Start», и ваш аккаунт AI Worker сразу подключится. Ссылка одноразовая и действует 10 минут.","signInFirst":"Войдите здесь в AI Worker, и кнопка выдаст ссылку, которая сразу подключит бота.","panelSettings":"Или в %s: «Настройки → Уведомления» → «Подключить Telegram»."},"sites":"Сайты","notSpecified":"не указаны","createChatInPanel":"Чат создаётся в панели kra.name; потом вернитесь и подключите его здесь.","right":"Справа","left":"Слева","delaySeconds":"Задержка, секунд"},"en":{"title":"NeedToMe AI Chat","tabs":{"setup":"Setup wizard","settings":"Settings","channels":"Channels","knowledge":"Knowledge","usage":"Usage"},"loading":"Loading…","connectTitle":"Connect AI Worker","connectIntro":"Connect your kra.name account to set up the chat, manage its channels and knowledge base, and see its usage.","connectBenefits":["Set up the consultant and chat texts with the wizard","Choose where to answer visitors and where to send leads","Keep the site's public pages in the chat's knowledge base"],"connect":"Connect","reconnect":"Reconnect","connected":"Connected to kra.name","chooseChat":"Choose a chat for this site","connectThisChat":"Connect this chat","createNewChat":"Create a new chat","buyExtraChatOrUpgrade":"Buy an extra chat or choose a higher plan","chatExtraPrice":"An extra website chat costs +$:price per month.","chatExtraPriceUnavailable":"See the billing page for the current price of an extra website chat.","chatSlotsFull":"Your plan has no free website chat slots. You can buy an extra chat or choose a higher plan.","chatOwnerAccount":"Account","chatOwnerPlatform":"Platform","chatEnabled":"Enabled","chatDisabled":"Disabled","persona":"Persona","domains":"Domains","noDomains":"not set","connectedToSite":"Connected to this site","chatConnectedOtherTab":"Already connected on tab “:name”","confirmMoveChat":"Move this chat to this tab? Tab “:name” will be closed.","linkChat":"Connect selected chats","chats":"Chats","newChat":"New chat","addChat":"Add chat","removeChat":"Remove chat","removeChatConfirm":"Remove this chat from the site? Its local settings and sync data will be cleared.","keyOnlyState":"This chat uses a public key and can still sync the site's knowledge. Connect it to an account to manage its settings, channels, and usage.","stackOrder":"Widget order","stackChats":"Stack this chat with the other site chats","greetPopupSite":"Show this chat's greeting popup on this site","noChats":"There are no chats in this account yet.","noChatsCreate":"Your AI Worker account has no online chat yet. Create one in the :panel, then choose it here.","connectWindow":"A new window was opened for sign-in. This page will update when you return.","demoConnect":"Demo mode: sign-in is not sent to a server.","httpError":"kra.name did not answer, try again.","retryAfter":"Try again in :count seconds.","unauthorized":"Your connection has expired. Reconnect to continue.","retry":"Try again","reload":"Reload settings","stale":"These settings changed in another window. Reload the current version before saving.","save":"Save","saving":"Saving…","saved":"Saved to kra.name.","nothingChanged":"Nothing has changed.","wizardHelp":"Ask in plain words: the wizard sets up the persona, knowledge base, greeting and quick questions. It shows proposed changes first; press Apply to use them.","wizardPlaceholder":"Describe the chat you want to set up…","send":"Send","sending":"Sending…","you":"You","assistant":"AI Worker","pending":"Changes waiting for your approval","apply":"Apply","discard":"Discard","clear":"Start a new conversation","clearConfirm":"Start a new conversation and clear this history?","voiceNote":"Voice input is not available in this admin screen.","translate":"Translate empty fields","sourceLanguage":"Translate from","textsByLanguage":"Texts by language","greeting":"Greeting","quickQuestions":"Quick questions","quickQuestionsHelp":"Buttons under the greeting; visitors can ask with one click. Empty lines are not shown.","quickQuestion":"Quick question :count","name":"Name in the chat header","titleText":"Caption under the name","tabLabel":"Side tab label","nameFallback":"Consultant's name","titleFallback":"Consultant's role","fallbackHelp":"An empty field shows the consultant's own name and role as grey placeholder text.","defaultLanguage":"Default language","consultant":"Consultant","knowledgeMode":"What the consultant answers from","knowledgeModeHelp":"With general knowledge the consultant answers general questions on the topic too; prices, terms and contacts come from your knowledge base.","companyKnowledge":"Use the company information from the kra.name panel","leads":"Leads","collectLeads":"Collect visitors' name, phone or email and what they need","sendLeads":"Send leads","testDelivery":"Test delivery","savedSecret":"Saved — leave empty to keep it","emailFallback":"Owner's email","appearance":"Appearance","look":"Look","theme":"Theme","scheme":"Colour scheme","color":"Main colour","position":"Chat button position","launcherIcon":"Chat button icon","yourImage":"Your image","uploadImage":"Upload your own","removeImage":"Remove your image","imageHelp":"PNG, JPEG or WebP up to 1 MB; it is cropped to a square.","aiNotice":"Say that an AI answers and its answers may be inaccurate","greetPopup":"Show the AI's greeting when a page opens","inChat":"In the chat","rating":"Allow visitors to rate answers","voice":"Allow voice input","preview":"Live preview","previewNote":"The preview changes at once; the site gets the changes after saving.","channelsIntro":"These channels are configured in the kra.name panel. Open a channel there to connect it.","connectChannel":"Connect :name in the kra.name panel","connectedChannel":"Connected","notConnectedChannel":"Not connected","channelError":"There is a connection issue","needs":"You will need","knowledgeIntro":"Public pages from this site can answer visitors' questions. Products are optional.","siteExport":"Site export","documents":"Documents","documentsCount":":count document|:count documents","characters":"Characters","indexing":"Indexing","dropped":"Not indexed","lastSync":"Last sync","syncNow":"Sync now","syncStarted":"Sync started.","syncJobQueued":"Sync is queued.","syncJobRunning":"Sync is running.","syncJobRetry":"The service asked to slow down. A retry is scheduled.","syncJobCompleted":"Sync completed.","syncJobWarning":"Sync completed with an export warning.","syncJobFailed":"Sync failed. Check the connection and try again.","syncJobPages":":count page|:count pages","syncJobProducts":":count product|:count products","syncJobResult":"Synced: :pages, :products.","syncJobPartialResult":"Partially processed: :pages, :products.","syncJobProgress":"Steps completed: :done of :total.","syncJobFailureDetail":"Error: :error","syncErrorReconnect":"Reconnect AI Worker to continue syncing.","syncErrorForeignSite":"This chat belongs to another site; create a separate chat for this site.","syncErrorBadToken":"The chat connection expired or was revoked. Connect the plugin to AI Worker again.","syncWorking":"Syncing…","knowledgeStatusUnavailable":"Could not load knowledge status.","syncFailed":"Could not start sync. Try again.","syncPages":"Sync public pages","syncProducts":"Sync products","productsUnavailable":"Product sync is not available for this site.","sources":"Knowledge sources","faq":"Questions and answers","faqHelp":"Exact answers to frequent questions; the consultant uses them as written.","faqEdit":"Edit","faqQuestions":":count question|:count questions","allChatsOnSite":"All chats of your AI Worker account are already on this site. Create another one in the :panel, then add it here.","faqClear":"Clear","faqClose":"Close","faqClearConfirm":"Delete all questions and answers? This cannot be undone.","faqClearPartial":"Deleted: :done. Left: :left. Press Clear again in a minute.","addQuestion":"Add a question","newQuestion":"New question","faqFilter":"Filter by question or answer","faqNone":"Nothing found.","faqPage":"Page :page of :pages","faqPrevious":"Previous page","faqNext":"Next page","cancel":"Cancel","addSource":"Add a source","sourceType":"Source type","page":"Page","text":"Text","sourceUrl":"Address","sourceText":"Text the consultant should know","sourceTitle":"Title (optional)","add":"Add","refresh":"Refresh","delete":"Delete","question":"Question","answer":"Answer","usageIntro":"Usage and statistics for this chat.","period":"Period","period7d":"7 days","period30d":"30 days","period90d":"90 days","periodMonth":"This month","periodCustom":"Custom range","periodFrom":"From","periodTo":"To","periodUpToYear":"Up to one year.","statistics":"Statistics","tokens":"AI tokens","of":"of","noLimit":"no limit","sessions":"Sessions","messagesIn":"Visitor messages","answers":"Answers","ratedHigh":"Positive ratings","ratedLow":"Negative ratings","leadsCount":"Leads","noData":"No data for this period.","noDialogs":"No dialogs in this period.","byDay":"By day","day":"Day","errorFields":"Check the highlighted fields.","site":"Site","plan":"Plan","notAvailable":"Not available","moveChat":"Move chat","syncReady":"Ready","syncPartial":"Partially indexed","syncQueued":"Indexing queued","syncError":"Indexing error","uploadError":"Choose a PNG, JPEG or WebP image up to 1 MB.","deliveryTestDone":"Test delivery sent.","confirmDelete":"Delete this item from the knowledge base?","langNames":{"ru":"Русский","en":"English","uk":"Українська"},"manageChannel":"Manage :name in the kra.name panel","widgetOnSiteTitle":"Chat on the site","widgetOnSite":"Show the chat on the site's public pages","widgetOnSiteHelp":"The widget is loaded by the script shipped with this plugin; turn it off here at any time.","widgetOnSiteNoKey":"Link a chat first: the widget needs its public key.","widgetShownToVisitors":"Shown to visitors","widgetHidden":"Hidden","widgetHiddenHelp":"Visitors do not see the chat. Turn it on to show it.","widgetNeedsChat":"Connect a working chat in step 1 first.","widgetShownNotice":"The chat is now shown on the site.","widgetHiddenNotice":"The chat is hidden from the site.","savedLocal":"Saved on this site.","adminDescription":"Set up the connection, appearance and chat behaviour for this site.","stepConnectChat":"Connect a chat","connectYourChat":"Connect your chat","connectLead":"The AI consultant's knowledge base and instructions are filled in at the :panel client panel:","panelLinkLabel":"kra.name panel","panelLeadLinkLabel":"kra.name","everythingConnected":"Everything is connected","stepCreateChat":"Sign up and create a site chat in the :panel.","stepChooseConsultant":"Choose the consultant and fill the chat's knowledge base.","stepAllowedSitesLinked":":domain was added to the chat's allowed sites automatically.","stepAllowedSitesManual":"Add :domain to the chat's allowed sites (www is included; :wildcard allows every subdomain).","stepAllowedSitesPlatformLinked":":domain is in the chat's allowed sites.","stepPublicKeyLinked":"The chat's public key was put in automatically.","stepPublicKeyChoose":"Choose a chat here; its public key will be added automatically.","stepPublicKeyManual":"Copy the public key wk_… from the chat's card and paste it here.","connectAutomatically":"Connect automatically","chooseChatAutomatically":"Choose the chat automatically","chooseChatAutomaticallyHelp":"Click the link and choose the chat you need from your kra.name chats (if you are not signed in, you will be asked to sign in).","aiWorkerConnected":"AI Worker connected","siteChatConsultant":"This site's chat: consultant :name","siteChatNamed":"This site's chat: :name","changeChat":"Change chat","chooseChatButton":"Choose the chat","siteChat":"This site's chat","chatWithConsultant":":chat (consultant :consultant)","chooseThisChat":"Choose the chat","chooseAnotherChat":"Choose another chat","disconnectAIWorker":"Disconnect AI Worker","disconnectHelp":"The chat on the site keeps working after disconnecting. The setup wizard, statistics, chat settings blocks, knowledge sync and catalog sync need the AI Worker connection.","publicChatKey":"Public chat key","saveAndCheck":"Save and check","publicKeyHelp":"The key only selects the chat; it is not a secret.","connectionNotices":{"connected":"AI Worker is connected. Once a chat is connected, the setup wizard is in step 1.","linked":"The chat is connected: its key is saved and this site is in its allowed sites. Turn on «Show the chat on this site» below. The setup wizard is in step 1 below.","link_unsupported":"kra.name cannot connect a chat automatically yet. Copy the public key wk_… from the chat's card and paste it above.","link_domains":"This chat already has the maximum of 20 allowed sites. Remove one in the chat's settings at kra.name, then connect again.","chat_on_other_tab":"This chat is already connected on tab “:name”.","link_failed":"kra.name did not connect this chat. Try again, or copy the public key wk_… from the chat's card.","state":"The connection link is outdated or was opened by another user. Start the connection again.","failed":"The connection was not completed. Start it again."},"invalidPublicKey":"Check the public chat key format.","publicKeyDuplicate":"This key is already used by another chat on this site.","chatsBusy":"Another chat change is in progress. Try again.","publicKeyRejected":"This key could not be verified. Check it in the kra.name panel.","publicKeyCheckUnavailable":"Could not reach kra.name to check the key. Try again later.","publicKeyChecked":"Chat :name found. Key saved.","whereToShow":"Where to show the chat","features":"Features","design":"Chat design","designClassic":"Chat window","designBar":"Side tab","designPanel":"Panel","designInline":"Embedded block","blockId":"Block identifier","blockHeight":"Block height, px","blockHelp":"Add an element with this identifier to the template or page content.","schemeFromChat":"Use the kra.name chat appearance settings","schemeLight":"Light","schemeDim":"Dim","schemeDark":"Dark","schemeAuto":"Automatic","advancedColors":"Advanced colours","advancedColorsHelp":"Override individual chat window colors. Empty values use the chat theme.","useSchemeColor":"Use theme color","colorHeaderBg":"Header background","colorHeaderText":"Header text","colorBg":"Chat background","colorSurface":"Surfaces","colorText":"Main text","colorMuted":"Muted text","colorBorder":"Borders","colorVisitorBubble":"Visitor bubble","colorVisitorText":"Visitor text","colorAiBubble":"AI Worker bubble","colorInputBg":"Input background","buttonOffset":"Launcher offsets","offsetSideways":"Horizontal, px","offsetUpDown":"Vertical, px","offsetHelp":"Set the distance from the site edge, from −300 to 300 px.","pages":"Show the chat","pagesAll":"On all pages","pagesOnly":"Only on selected pages","pagesExcept":"On all pages except selected pages","pageList":"Page paths, one per line","pageListHelp":"Use * as a wildcard. For example: /contact/ and /shop/*.","showChatTiming":"When to load the chat","loadImmediate":"Immediately","loadInteraction":"After visitor interaction","loadDelay":"After a delay","seconds":"seconds","privacyUrl":"Privacy policy URL","saveSettings":"Save settings","usageAndLimits":"Usage and limits","usageNeedsConnection":"Connect AI Worker and choose a chat to view usage and limits.","openKraName":"Open kra.name","previewDescription":"This is the real widget in preview mode. The launcher appears in the page corner; edits apply here immediately and reach visitors after saving.","previewUnavailable":"The live preview widget could not be loaded from AI Worker.","previewDemoNote":"This is a design preview. AI replies, voice and files need a linked chat.","previewName":"Consultant","previewInput":"Type a message…","previewGreeting":"Hello! How can I help?","openChatWindow":"Open the chat window","closeChatWindow":"Close the chat window","chatSettings":"Chat settings","consultantAndChatTexts":"Consultant and chat texts","connectForWizard":"Connect AI Worker and choose a chat to open the setup wizard and channel settings.","wizardMcpTelegram":"Setup wizard / MCP / Telegram","mcpTitle":"Connect MCP","mcpDescription":"Connect AI Worker to development tools through MCP.","mcpInstructions":"Set up MCP in the kra.name panel","telegramTitle":"Telegram","telegramDescription":"Connect Telegram to receive leads and channel messages.","connectTelegram":"Connect Telegram","telegramLinkUnavailable":"Could not get a Telegram connection link.","telegramOpened":"Telegram link opened in a new tab.","launcherNeedsConnection":"Connect a chat to choose its launcher icon.","connectForChatSettings":"Connect a chat to edit its consultant, texts, knowledge base and leads.","noChatsWizard":"There are no chats in this account yet. Ask the setup wizard below to create one: the chat is connected to this site automatically.","keyAutoHelp":"The public key is put in automatically when the chat is connected. To enter a key by hand, disconnect AI Worker.","stepAllowedSitesAuto":":domain is added to the chat's allowed sites automatically.","stepAllowedSitesPlatform":"For a platform chat, add this site's domain to Allowed Sites in the AI Worker panel manually.","stepPublicKeyAuto":"The chat's public key is put in automatically.","wizardUnavailable":"The setup wizard is not available for this account now. Open the kra.name panel.","chatSettingsNeedChat":"Create the chat with the setup wizard in step 1 to edit its consultant, texts, knowledge base and leads.","launcherNeedsChat":"The launcher icon can be chosen once the chat is created.","usageNeedsChat":"The chat's usage and limits appear once the chat is created.","usageNeedsLinkedChat":"Usage and limits are available for an account-linked chat. Site knowledge can still sync with this public key.","setupTabs":{"wizard":"Setup wizard","mcp":"MCP","telegram":"Telegram","expand":"Expand","collapse":"Collapse"},"accentText":"Text and icon colour on the main colour","accentTextFromChat":"As in the chat settings on kra.name","accentTextAuto":"Auto","accentTextWhite":"White","accentTextBlack":"Black","mcpHelp":{"title":"Set up the chat from ChatGPT, Claude or Codex","intro":"Instead of the kra.name panel, you can manage the chat from your own AI assistant: connect your AI Worker account to it over MCP and ask in plain words.","abilitiesTitle":"What the assistant can do with the chat:","abilities":["create an online chat and its consultant: name, role, instructions;","fill the knowledge base: the site, single pages, Google Sheets and Docs, FAQ;","find what the knowledge base is missing and turn your short answers into FAQ;","write the greeting and the quick questions, change the chat's look and languages;","connect the chat to Telegram, Messenger, Instagram, WhatsApp or VK;","show the requests that visitors left in the chat."],"approval":"The assistant first only proposes each change and shows what it will do; the change is applied after you agree in the conversation.","exampleLabel":"For example, ask:","exampleCreate":"Create an online chat for my site %s: a consultant persona with its role, the site's pages in the knowledge base, a greeting and quick questions.","exampleExisting":"Configure the existing chat %1$s (ID %2$d) for %3$s: its consultant, knowledge sources and greeting.","chatgpt":"ChatGPT — in the browser","chatgptSteps":["Open %s → «Add» → custom MCP server.","Name — %1$s, server URL — %2$s, authentication — OAuth. Leave «Advanced OAuth settings» as they are: ChatGPT discovers them itself.","Tick «I understand and want to continue» and create the plugin.","The AI Worker page opens: sign in to the panel (password or Google) and press «Allow access».","Done: pick the AI Worker plugin in a chat and ask what you need."],"claude":"Claude (claude.ai)","claudeSteps":["Open «Settings → Connectors → Add custom connector» and enter the address %s.","Sign in to AI Worker and press «Allow access»."],"local":"Claude Code or Codex","localSteps":["In the %s open «Settings → Integrations», press «Issue key» and then «Download as a file»: the file aiworker-key.txt appears in your Downloads folder.","Copy this and send it to your Codex or Claude Code:"],"installPrompt":"Install the AI Worker MCP server and the aiworker skill from the repository https://github.com/needtome/aiworker-skills. The API key is in the file ~/Downloads/aiworker-key.txt: move it into the environment variable AIWORKER_API_KEY without showing the key on the screen, then delete that file.","copy":"Copy","copied":"Copied","installHelp":"The AI saves the key itself and connects the MCP server and the skill. Restart Codex or Claude Code when it asks.","connectByHand":"Connect by hand","keyStorage":"Keep the key in the environment variable <code>AIWORKER_API_KEY</code> of your computer, not in a file of a project.","pluginCommands":"Claude Code: the plugin with the AI Worker skill and server","serverOnly":"or only the MCP server:","codexConfig":"Codex: add these lines to <code>~/.codex/config.toml</code> and restart Codex.","keyWarning":"Do not paste the key into the chat with the AI.","panelLabel":"kra.name panel","fullInstructions":"You can disconnect any time in the panel: «Settings → Integrations». Full instructions with screenshots: %s.","integrationsLabel":"kra.name integrations"},"telegramHelp":{"title":"The setup wizard in your Telegram","intro":"%s is the same setup wizard as on the «Setup wizard» tab, in your Telegram. Write or say what to change in the online chat, and the bot does it: it shows each change with «Apply» and «Cancel» buttons.","whatYouCanAsk":"What you can ask:","items":["change the consultant: name, role, instructions;","add pages, documents and FAQ to the knowledge base, fill what it is missing;","rewrite the greeting and the quick questions;","show the leads and the dialogs;","connect the chat to messengers."],"commands":"Commands: <code>/status</code> — what waits for your approval, <code>/account</code>, <code>/tariff</code>, <code>/new</code> — a new conversation, <code>/help</code>.","notifications":"The same bot sends you notifications: new leads, requests to talk to a person, questions the consultant could not answer, problems with channels and a daily digest.","connect":"Connect","oneTime":"Telegram opens the bot: press «Start», and your AI Worker account is connected at once. The link works once, for 10 minutes.","signInFirst":"Sign in to AI Worker here, and the button gives you a link that connects the bot at once.","panelSettings":"Or in the %s: «Settings → Notifications» → «Connect Telegram»."},"sites":"Sites","notSpecified":"not specified","createChatInPanel":"The chat is created in the kra.name panel; then come back and connect it here.","right":"Right","left":"Left","delaySeconds":"Delay, seconds"},"uk":{"title":"NeedToMe AI Chat","tabs":{"setup":"Майстер налаштування","settings":"Параметри","channels":"Канали","knowledge":"База знань","usage":"Статистика"},"loading":"Завантаження…","connectTitle":"Підключити AI Worker","connectIntro":"Підключіть обліковий запис kra.name, щоб налаштувати чат, канали й базу знань та переглядати статистику.","connectBenefits":["Налаштуйте консультанта й тексти чату в майстрі","Виберіть канали для відповідей і отримання заявок","Додайте публічні сторінки сайту до бази знань чату"],"connect":"Підключити","reconnect":"Перепідключити","connected":"Підключено до kra.name","chooseChat":"Виберіть чат для цього сайту","connectThisChat":"Підключити цей чат","createNewChat":"Створити новий чат","buyExtraChatOrUpgrade":"Купити додатковий чат або вибрати дорожчий тариф","chatExtraPrice":"Додатковий онлайн-чат коштує +$:price на місяць.","chatExtraPriceUnavailable":"Актуальну ціну додаткового онлайн-чату дивіться на сторінці оплати.","chatSlotsFull":"У тарифі немає вільного онлайн-чату. Можна купити додатковий чат або вибрати дорожчий тариф.","chatOwnerAccount":"Акаунт","chatOwnerPlatform":"Платформа","chatEnabled":"Увімкнений","chatDisabled":"Вимкнений","persona":"Особистість","domains":"Домени","noDomains":"не вказані","connectedToSite":"Підключений до сайту","chatConnectedOtherTab":"Уже підключений на вкладці «:name»","confirmMoveChat":"Перенести чат на цю вкладку? Вкладку «:name» буде закрито.","linkChat":"Підключити вибрані чати","chats":"Чати","newChat":"Новий чат","addChat":"Додати чат","removeChat":"Видалити чат","removeChatConfirm":"Видалити цей чат із сайту? Його налаштування та дані синхронізації буде очищено.","keyOnlyState":"Цей чат підключено за публічним ключем, і він може синхронізувати базу знань сайту. Підключіть його до облікового запису, щоб керувати налаштуваннями, каналами та статистикою.","stackOrder":"Порядок віджетів","stackChats":"Показувати цей чат разом з іншими чатами сайту","greetPopupSite":"Показувати спливаюче привітання цього чату на сайті","noChats":"В обліковому записі ще немає чатів.","noChatsCreate":"У вашому акаунті AI Worker ще немає онлайн-чату. Створіть його в :panel і виберіть тут.","connectWindow":"Вікно входу відкрито. Ця сторінка оновиться, коли ви повернетеся.","demoConnect":"Демо-режим: запит на вхід не надсилається на сервер.","httpError":"kra.name не відповів, спробуйте ще раз.","retryAfter":"Спробуйте ще раз за :count с.","unauthorized":"Термін підключення минув. Підключіться знову, щоб продовжити.","retry":"Повторити","reload":"Перезавантажити параметри","stale":"В іншій вкладці параметри змінилися. Завантажте поточну версію перед збереженням.","save":"Зберегти","saving":"Збереження…","saved":"Збережено в kra.name.","nothingChanged":"Немає змін.","wizardHelp":"Опишіть завдання звичайними словами: майстер налаштує консультанта, базу знань, привітання й швидкі запитання. Спершу він покаже зміни; натисніть «Застосувати», щоб їх використати.","wizardPlaceholder":"Опишіть, яким має бути чат…","send":"Надіслати","sending":"Надсилання…","you":"Ви","assistant":"AI Worker","pending":"Очікують на ваше підтвердження","apply":"Застосувати","discard":"Відхилити","clear":"Почати нову розмову","clearConfirm":"Почати нову розмову й очистити історію?","voiceNote":"Голосове введення в цьому вікні параметрів недоступне.","translate":"Перекласти порожні поля","sourceLanguage":"Перекласти з мови","textsByLanguage":"Тексти мовами","greeting":"Привітання","quickQuestions":"Швидкі запитання","quickQuestionsHelp":"Кнопки під привітанням: відвідувач може запитати одним натисканням. Порожні рядки не відображаються.","quickQuestion":"Швидке запитання :count","name":"Ім’я в заголовку чату","titleText":"Підпис під ім’ям","tabLabel":"Підпис на бічній вкладці","nameFallback":"Ім’я консультанта","titleFallback":"Роль консультанта","fallbackHelp":"У порожньому полі сірим текстом показано ім’я та роль консультанта.","defaultLanguage":"Мова за замовчуванням","consultant":"Консультант","knowledgeMode":"На що спирається консультант","knowledgeModeHelp":"Із загальними знаннями консультант також відповідає на загальні запитання за темою; ціни, умови та контакти він бере з вашої бази знань.","companyKnowledge":"Використовувати інформацію про компанію з панелі kra.name","leads":"Заявки","collectLeads":"Збирати ім’я, телефон або email відвідувача та його запит","sendLeads":"Надсилати заявки","testDelivery":"Перевірити доставку","savedSecret":"Збережено — залиште порожнім, щоб не змінювати","emailFallback":"Email власника","appearance":"Вигляд","look":"Вигляд","theme":"Тема","scheme":"Колірна схема","color":"Основний колір","position":"Розташування кнопки чату","launcherIcon":"Значок кнопки чату","yourImage":"Ваше зображення","uploadImage":"Завантажити власне зображення","removeImage":"Видалити власне зображення","imageHelp":"PNG, JPEG або WebP до 1 МБ; зображення буде обрізано до квадрата.","aiNotice":"Повідомляти, що відповідає ШІ та його відповіді можуть бути неточними","greetPopup":"Показувати привітання ШІ під час відкриття сторінки","inChat":"У чаті","rating":"Дозволити відвідувачам оцінювати відповіді","voice":"Дозволити голосове введення","preview":"Попередній перегляд","previewNote":"Попередній перегляд змінюється одразу; на сайті зміни з’являться після збереження.","channelsIntro":"Ці канали налаштовуються в панелі kra.name. Відкрийте канал там, щоб підключити його.","connectChannel":"Підключити :name у панелі kra.name","connectedChannel":"Підключено","notConnectedChannel":"Не підключено","channelError":"Є проблема з підключенням","needs":"Знадобиться","knowledgeIntro":"Публічні сторінки сайту допоможуть консультанту відповідати відвідувачам. Товари можна підключити окремо.","siteExport":"Експорт сайту","documents":"Документи","documentsCount":":count документ|:count документи|:count документів","characters":"Символи","indexing":"Індексація","dropped":"Не проіндексовано","lastSync":"Остання синхронізація","syncNow":"Синхронізувати зараз","syncStarted":"Синхронізацію запущено.","syncJobQueued":"Синхронізацію поставлено в чергу.","syncJobRunning":"Синхронізація виконується.","syncJobRetry":"Сервіс попросив зменшити частоту запитів. Повтор заплановано.","syncJobCompleted":"Синхронізацію завершено.","syncJobWarning":"Синхронізацію завершено з попередженням про експорт.","syncJobFailed":"Синхронізацію не виконано. Перевірте підключення та спробуйте ще раз.","syncJobPages":":count сторінка|:count сторінки|:count сторінок","syncJobProducts":":count товар|:count товари|:count товарів","syncJobResult":"Синхронізовано: :pages, :products.","syncJobPartialResult":"Частково оброблено: :pages, :products.","syncJobProgress":"Оброблено кроків: :done із :total.","syncJobFailureDetail":"Помилка: :error","syncErrorReconnect":"Повторно підключіть AI Worker, щоб продовжити синхронізацію.","syncErrorForeignSite":"Цей чат належить іншому сайту; створіть окремий чат для цього сайту.","syncErrorBadToken":"Підключення чату завершилося або його відкликано. Підключіть плагін до AI Worker знову.","syncWorking":"Синхронізація…","knowledgeStatusUnavailable":"Не вдалося отримати стан бази знань.","syncFailed":"Не вдалося запустити синхронізацію. Спробуйте ще раз.","syncPages":"Синхронізувати публічні сторінки","syncProducts":"Синхронізувати товари","productsUnavailable":"Синхронізація товарів для цього сайту недоступна.","sources":"На основі чого відповідає консультант","faq":"Запитання та відповіді","faqHelp":"Точні відповіді на часті запитання; консультант використовує їх без змін.","faqEdit":"Змінити","faqQuestions":":count запитання|:count запитання|:count запитань","allChatsOnSite":"Усі чати вашого акаунта AI Worker уже є на цьому сайті. Створіть ще один у :panel, а потім додайте його тут.","faqClear":"Очистити","faqClose":"Закрити","faqClearConfirm":"Видалити всі запитання й відповіді? Це не можна скасувати.","faqClearPartial":"Видалено: :done. Залишилося: :left. Натисніть «Очистити» ще раз за хвилину.","addQuestion":"Додати запитання","newQuestion":"Нове запитання","faqFilter":"Фільтр за запитанням і відповіддю","faqNone":"Нічого не знайдено.","faqPage":"Сторінка :page з :pages","faqPrevious":"Попередня сторінка","faqNext":"Наступна сторінка","cancel":"Скасувати","addSource":"Додати джерело","sourceType":"Тип джерела","page":"Сторінка","text":"Текст","sourceUrl":"Адреса","sourceText":"Текст, який має знати консультант","sourceTitle":"Назва (необов’язково)","add":"Додати","refresh":"Оновити","delete":"Видалити","question":"Запитання","answer":"Відповідь","usageIntro":"Використання та статистика цього чату.","period":"Період","period7d":"7 днів","period30d":"30 днів","period90d":"90 днів","periodMonth":"Цей місяць","periodCustom":"Власний діапазон","periodFrom":"З","periodTo":"По","periodUpToYear":"Не більше року.","statistics":"Статистика","tokens":"Токени ШІ","of":"із","noLimit":"без ліміту","sessions":"Сеанси","messagesIn":"Повідомлення відвідувачів","answers":"Відповіді","ratedHigh":"Позитивні оцінки","ratedLow":"Негативні оцінки","leadsCount":"Заявки","noData":"За цей період даних немає.","noDialogs":"За цей період діалогів немає.","byDay":"По днях","day":"День","errorFields":"Перевірте поля з помилками.","site":"Сайт","plan":"Тариф","notAvailable":"Недоступно","moveChat":"Перенести чат","syncReady":"Готово","syncPartial":"Проіндексовано частково","syncQueued":"Індексація в черзі","syncError":"Помилка індексації","uploadError":"Виберіть зображення PNG, JPEG або WebP до 1 МБ.","deliveryTestDone":"Тестове повідомлення надіслано.","confirmDelete":"Видалити цей елемент із бази знань?","langNames":{"ru":"Русский","en":"English","uk":"Українська"},"manageChannel":"Налаштувати :name у панелі kra.name","widgetOnSiteTitle":"Чат на сайті","widgetOnSite":"Показувати чат на публічних сторінках сайту","widgetOnSiteHelp":"Віджет підключає скрипт із цього плагіна; вимкнути його можна тут у будь-який момент.","widgetOnSiteNoKey":"Спочатку прив'яжіть чат: віджету потрібен його публічний ключ.","widgetShownToVisitors":"Показується відвідувачам","widgetHidden":"Прихований","widgetHiddenHelp":"Відвідувачі не бачать чат. Увімкніть його, щоб показати.","widgetNeedsChat":"Спочатку підключіть робочий чат у кроці 1.","widgetShownNotice":"Тепер чат показується на сайті.","widgetHiddenNotice":"Чат приховано на сайті.","savedLocal":"Збережено на цьому сайті.","adminDescription":"Налаштуйте підключення, вигляд і роботу чату на цьому сайті.","stepConnectChat":"Підключіть чат","connectYourChat":"Підключіть чат","connectLead":"База знань ШІ-консультанта, а також його інструкції заповнюються в панелі клієнта :panel:","panelLinkLabel":"панелі kra.name","panelLeadLinkLabel":"kra.name","everythingConnected":"Усе підключено","stepCreateChat":"Зареєструйтеся та створіть онлайн-чат у :panel.","stepChooseConsultant":"Оберіть консультанта й наповніть базу знань чату.","stepAllowedSitesLinked":":domain додано до «Дозволених сайтів» чату автоматично.","stepAllowedSitesManual":"Додайте :domain до «Дозволених сайтів» чату (www враховано; :wildcard дозволяє всі піддомени).","stepAllowedSitesPlatformLinked":":domain є серед дозволених сайтів чату.","stepPublicKeyLinked":"Публічний ключ чату вставлено автоматично.","stepPublicKeyChoose":"Виберіть чат тут; його публічний ключ додасться автоматично.","stepPublicKeyManual":"Скопіюйте публічний ключ wk_… з картки чату й вставте сюди.","connectAutomatically":"Підключити автоматично","chooseChatAutomatically":"Вибрати чат автоматично","chooseChatAutomaticallyHelp":"Клікніть на посилання та у списку ваших чатів kra.name виберіть потрібний (якщо ви не авторизовані, система запропонує авторизуватися).","aiWorkerConnected":"AI Worker підключено","siteChatConsultant":"Чат цього сайту: консультант :name","siteChatNamed":"Чат цього сайту: :name","changeChat":"Змінити чат","chooseChatButton":"Вибрати чат","siteChat":"Чат цього сайту","chatWithConsultant":":chat (консультант :consultant)","chooseThisChat":"Вибрати чат","chooseAnotherChat":"Вибрати інший чат","disconnectAIWorker":"Відключити AI Worker","disconnectHelp":"Після відключення чат на сайті продовжить працювати. Підключення до AI Worker потрібне майстру налаштування, статистиці, блокам налаштувань чату, синхронізації бази знань і каталогу.","publicChatKey":"Публічний ключ чату","saveAndCheck":"Зберегти й перевірити","publicKeyHelp":"Ключ лише обирає чат і не є секретом.","connectionNotices":{"connected":"AI Worker підключено. Коли чат підключено, майстер налаштування — у кроці 1.","linked":"Чат підключено: його ключ збережено, а цей сайт додано до дозволених. Увімкніть нижче «Показувати чат на сайті». Майстер налаштування — у кроці 1 нижче.","link_unsupported":"kra.name поки не вміє підключати чат автоматично. Скопіюйте публічний ключ wk_… з картки чату та вставте його вище.","link_domains":"Цей чат уже має максимум — 20 дозволених сайтів. Видаліть один у налаштуваннях чату на kra.name і підключіть знову.","chat_on_other_tab":"Цей чат уже підключено на вкладці «:name».","link_failed":"kra.name не підключив цей чат. Спробуйте ще раз або скопіюйте публічний ключ wk_… з картки чату.","state":"Посилання підключення застаріле або відкрите іншим користувачем. Почніть підключення знову.","failed":"Підключення не завершено. Почніть його знову."},"invalidPublicKey":"Перевірте формат публічного ключа чату.","publicKeyDuplicate":"Цей ключ уже використовує інший чат на цьому сайті.","chatsBusy":"Зараз уже триває інша зміна чатів. Спробуйте ще раз.","publicKeyRejected":"Не вдалося підтвердити цей ключ. Перевірте його в панелі kra.name.","publicKeyCheckUnavailable":"Не вдалося зв’язатися з kra.name для перевірки ключа. Спробуйте пізніше.","publicKeyChecked":"Чат :name знайдено. Ключ збережено.","whereToShow":"Де показувати чат","features":"Функції","design":"Дизайн чату","designClassic":"Вікно чату","designBar":"Бічна вкладка","designPanel":"Панель","designInline":"Вбудований блок","blockId":"Ідентифікатор блока","blockHeight":"Висота блока, px","blockHelp":"Додайте елемент із цим ідентифікатором у шаблон або вміст сторінки.","schemeFromChat":"Як у налаштуваннях чату на kra.name","schemeLight":"Світла","schemeDim":"Приглушена","schemeDark":"Темна","schemeAuto":"Автоматично","advancedColors":"Додаткові кольори","advancedColorsHelp":"Задайте окремі кольори вікна чату. Порожні значення використовують тему чату.","useSchemeColor":"Використовувати колір теми","colorHeaderBg":"Тло заголовка","colorHeaderText":"Текст заголовка","colorBg":"Тло чату","colorSurface":"Поверхні","colorText":"Основний текст","colorMuted":"Приглушений текст","colorBorder":"Межі","colorVisitorBubble":"Бульбашка відвідувача","colorVisitorText":"Текст відвідувача","colorAiBubble":"Бульбашка AI Worker","colorInputBg":"Тло поля введення","buttonOffset":"Відступи кнопки","offsetSideways":"По горизонталі, px","offsetUpDown":"По вертикалі, px","offsetHelp":"Задайте відступ від краю сайту: від −300 до 300 px.","pages":"Показувати чат","pagesAll":"На всіх сторінках","pagesOnly":"Лише на вибраних сторінках","pagesExcept":"На всіх, крім вибраних сторінок","pageList":"Шляхи сторінок, по одному на рядок","pageListHelp":"Можна використовувати * як маску. Наприклад: /contact/ і /shop/*.","showChatTiming":"Коли завантажувати чат","loadImmediate":"Одразу","loadInteraction":"Після дії відвідувача","loadDelay":"Із затримкою","seconds":"секунд","privacyUrl":"Посилання на політику конфіденційності","saveSettings":"Зберегти налаштування","usageAndLimits":"Витрати й ліміти","usageNeedsConnection":"Підключіть AI Worker і виберіть чат, щоб побачити витрати й ліміти.","openKraName":"Відкрити kra.name","previewDescription":"Це справжній віджет у режимі попереднього перегляду. Кнопка чату з’явиться в куті сторінки; зміни видно одразу, а відвідувачам — після збереження.","previewUnavailable":"Не вдалося завантажити живий попередній перегляд віджета з AI Worker.","previewDemoNote":"Це попередній перегляд дизайну. Відповіді ШІ, голос і файли доступні після підключення чату.","previewName":"Консультант","previewInput":"Напишіть повідомлення…","previewGreeting":"Вітаю! Чим можу допомогти?","openChatWindow":"Відкрити вікно чату","closeChatWindow":"Закрити вікно чату","chatSettings":"Налаштування чату","consultantAndChatTexts":"Консультант і тексти чату","connectForWizard":"Підключіть AI Worker і виберіть чат, щоб відкрити майстер і налаштування каналів.","wizardMcpTelegram":"Майстер налаштування / MCP / Telegram","mcpTitle":"Підключення MCP","mcpDescription":"Підключіть AI Worker до інструментів розробки через MCP.","mcpInstructions":"Налаштувати MCP у панелі kra.name","telegramTitle":"Telegram","telegramDescription":"Підключіть Telegram, щоб отримувати заявки й повідомлення в каналі.","connectTelegram":"Підключити Telegram","telegramLinkUnavailable":"Не вдалося отримати посилання для підключення Telegram.","telegramOpened":"Посилання Telegram відкрито в новій вкладці.","launcherNeedsConnection":"Підключіть чат, щоб вибрати значок запуску.","connectForChatSettings":"Підключіть чат, щоб налаштувати консультанта, тексти, базу знань і заявки.","noChatsWizard":"В обліковому записі ще немає чатів. Попросіть майстер налаштування нижче створити чат: він підключиться до цього сайту автоматично.","keyAutoHelp":"Публічний ключ підставляється автоматично, коли чат підключено. Щоб ввести ключ вручну, відключіть AI Worker.","stepAllowedSitesAuto":":domain додається до «Дозволених сайтів» чату автоматично.","stepAllowedSitesPlatform":"Для чату платформи вручну додайте домен цього сайту до «Дозволених сайтів» на панелі AI Worker.","stepPublicKeyAuto":"Публічний ключ чату підставляється автоматично.","wizardUnavailable":"Майстер налаштування зараз недоступний для цього облікового запису. Відкрийте панель kra.name.","chatSettingsNeedChat":"Створіть чат майстром налаштування в кроці 1, щоб налаштувати консультанта, тексти, базу знань і заявки.","launcherNeedsChat":"Значок запуску можна вибрати після створення чату.","usageNeedsChat":"Витрати й ліміти чату з'являться після його створення.","usageNeedsLinkedChat":"Витрати й ліміти доступні для чату, підключеного до облікового запису. Синхронізація бази знань за публічним ключем працює.","setupTabs":{"wizard":"Майстер налаштування","mcp":"MCP","telegram":"Telegram","expand":"Розгорнути","collapse":"Згорнути"},"accentText":"Колір тексту й значків на основному кольорі","accentTextFromChat":"Як у налаштуваннях чату на kra.name","accentTextAuto":"Авто","accentTextWhite":"Білий","accentTextBlack":"Чорний","mcpHelp":{"title":"Налаштування чату з ChatGPT, Claude або Codex","intro":"Чатом можна керувати не з панелі kra.name, а з вашого ШІ-асистента: підключіть до нього акаунт AI Worker через MCP і просіть звичайними словами.","abilitiesTitle":"Що асистент може зробити з чатом:","abilities":["створити онлайн-чат і його консультанта: ім’я, роль, інструкції;","наповнити базу знань: сайт, окремі сторінки, Google Таблиці й Документи, FAQ;","знайти, чого бракує в базі знань, і перетворити ваші короткі відповіді на FAQ;","написати привітання та швидкі питання, змінити вигляд і мови чату;","підключити чат до Telegram, Messenger, Instagram, WhatsApp або VK;","показати заявки, які відвідувачі залишили в чаті."],"approval":"Кожну зміну асистент спершу лише пропонує й показує, що зробить; застосовується вона після вашої згоди в розмові.","exampleLabel":"Наприклад, попросіть:","exampleCreate":"Створи онлайн-чат для мого сайту %s: особистість консультанта з її роллю, сторінки сайту в базі знань, привітання та швидкі запитання.","exampleExisting":"Налаштуйте наявний чат %1$s (ID %2$d) для %3$s: консультанта, джерела знань і привітання.","chatgpt":"ChatGPT — у браузері","chatgptSteps":["Відкрийте %s → «Додати» → власний сервер MCP.","Назва — %1$s, URL-адреса сервера — %2$s, автентифікація — OAuth. «Розширені налаштування OAuth» не чіпайте: ChatGPT знайде їх сам.","Позначте «Я розумію й хочу продовжити» і створіть плагін.","Відкриється сторінка AI Worker: увійдіть у панель (паролем або через Google) і натисніть «Дозволити доступ».","Готово: виберіть плагін AI Worker у чаті й попросіть, що потрібно."],"claude":"Claude (claude.ai)","claudeSteps":["Відкрийте «Налаштування → Конектори → Додати власний конектор» і вкажіть адресу %s.","Увійдіть в AI Worker і натисніть «Дозволити доступ»."],"local":"Claude Code або Codex","localSteps":["У %s відкрийте «Налаштування → Інтеграції», натисніть «Випустити ключ», а потім «Завантажити файлом»: у теці «Завантаження» з’явиться файл aiworker-key.txt.","Скопіюйте й надішліть вашому Codex або Claude Code:"],"installPrompt":"Встанови MCP-сервер AI Worker і скіл aiworker з репозиторію https://github.com/needtome/aiworker-skills. API-ключ лежить у файлі ~/Downloads/aiworker-key.txt: перенеси його у змінну оточення AIWORKER_API_KEY, не показуючи ключ на екрані, а потім видали цей файл.","copy":"Скопіювати","copied":"Скопійовано","installHelp":"ШІ сам збереже ключ, підключить MCP і скіл. Перезапустіть Codex або Claude Code, коли він попросить.","connectByHand":"Підключити вручну","keyStorage":"Зберігайте ключ у змінній оточення <code>AIWORKER_API_KEY</code> на вашому комп’ютері, а не у файлі проєкту.","pluginCommands":"Claude Code: плагін зі скілом і сервером AI Worker","serverOnly":"або лише MCP-сервер:","codexConfig":"Codex: додайте ці рядки до <code>~/.codex/config.toml</code> і перезапустіть Codex.","keyWarning":"Не вставляйте ключ просто в чат із ШІ.","panelLabel":"панелі kra.name","fullInstructions":"Відключити можна будь-коли в панелі: «Налаштування → Інтеграції». Повна інструкція зі скриншотами: %s.","integrationsLabel":"інтеграції на kra.name"},"telegramHelp":{"title":"Майстер налаштування у вашому Telegram","intro":"%s — той самий майстер, що й на вкладці «Майстер налаштування», лише у вашому Telegram. Напишіть або надиктуйте, що змінити в онлайн-чаті, і бот це зробить: кожну зміну він показує з кнопками «Застосувати» та «Скасувати».","whatYouCanAsk":"Що можна попросити:","items":["змінити консультанта: ім’я, роль, інструкції;","додати до бази знань сторінки, документи й FAQ, заповнити те, чого в ній бракує;","переписати привітання та швидкі питання;","показати заявки й діалоги;","підключити чат до месенджерів."],"commands":"Команди: <code>/status</code> — що чекає на ваше схвалення, <code>/account</code>, <code>/tariff</code>, <code>/new</code> — нова розмова, <code>/help</code>.","notifications":"Цей самий бот надсилає сповіщення: нові заявки, прохання покликати людину, питання, на які консультант не зміг відповісти, проблеми з каналами та щоденне зведення.","connect":"Підключити","oneTime":"Telegram відкриє бота: натисніть «Start», і ваш акаунт AI Worker одразу підключиться. Посилання одноразове й діє 10 хвилин.","signInFirst":"Увійдіть тут в AI Worker, і кнопка видасть посилання, яке одразу підключить бота.","panelSettings":"Або в %s: «Налаштування → Сповіщення» → «Підключити Telegram»."},"sites":"Сайти","notSpecified":"не вказані","createChatInPanel":"Чат створюється в панелі kra.name; потім поверніться й підключіть його тут.","right":"Праворуч","left":"Ліворуч","delaySeconds":"Затримка, секунд"}};
function pluralIndex(number, lang) {
  const n = Math.abs(Math.trunc(Number(number) || 0));
  if (lang === 'en') return n === 1 ? 0 : 1;
  const a = n % 10;
  const b = n % 100;
  return a === 1 && b !== 11 ? 0 : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 1 : 2;
}

function pluralChoose(number, line, shown, lang) {
  const forms = String(line || '').split('|');
  const selected = forms[pluralIndex(number, lang)] || forms[0] || '';
  return selected.replace(/:count/g, shown === undefined ? String(number) : String(shown));
}


const AIWC = (() => {
  const FAQ_PAGE = 20;
  const CHAT_LANGUAGES_MAX = 20;
  const CHAT_PERSONAS_MAX = 200;
  const SUGGESTIONS_MAX = 10;
  const CHAT_TEXT_MAX_LENGTH = 5000;
  const PROXY_QUERY_KEYS = new Set(['chat_id', 'lang', 'period', 'from', 'to', 'id', 'index', 'blocks']);
  const EXACT_CALLS = new Set([
    'GET plugin/me', 'GET plugin/chat', 'GET plugin/channels', 'GET plugin/usage', 'GET plugin/stats',
    'GET plugin/assistant', 'GET plugin/sources', 'GET plugin/faq', 'GET plugin/telegram-link',
    'PATCH plugin/chat', 'PATCH plugin/faq',
    'POST plugin/assistant/ask', 'POST plugin/assistant/apply', 'POST plugin/assistant/discard', 'POST plugin/assistant/clear',
    'POST plugin/chat/translate', 'POST plugin/chat/leads/test', 'POST plugin/sources', 'POST plugin/faq',
    'DELETE plugin/faq', 'DELETE plugin/chat/launcher-icon'
  ]);

  function clampLimit(value, cap, fallback) {
    return Math.max(1, Math.min(cap, Math.floor(Number(value)) || fallback));
  }

  function boundChatLimits(limits) {
    const caps = {
      suggestions_max: [10, 4], suggestions_chars_max: [CHAT_TEXT_MAX_LENGTH, 600],
      greeting_max: [CHAT_TEXT_MAX_LENGTH, 300], name_max: [CHAT_TEXT_MAX_LENGTH, 60],
      title_max: [CHAT_TEXT_MAX_LENGTH, 80], tab_label_max: [CHAT_TEXT_MAX_LENGTH, 60],
      chat_name_max: [CHAT_TEXT_MAX_LENGTH, 120], languages_min: [1, 1], languages_max: [CHAT_LANGUAGES_MAX, 12]
    };
    return Object.fromEntries(Object.entries(caps).map(([key, [cap, fallback]]) => [key, clampLimit(limits && limits[key], cap, fallback)]));
  }

  function normalizeChatTexts(texts) {
    if (!texts || typeof texts !== 'object' || Array.isArray(texts)) return {};
    return Object.fromEntries(Object.entries(texts).slice(0, CHAT_LANGUAGES_MAX).map(([lang, values]) => {
      const text = values && typeof values === 'object' && !Array.isArray(values) ? values : {};
      return [lang, { ...text, suggestions: Array.isArray(text.suggestions) ? text.suggestions.slice(0, SUGGESTIONS_MAX) : [] }];
    }));
  }

  function safePanelUrl(value, panelBase) {
    try {
      const url = new URL(String(value || ''));
      const base = new URL(String(panelBase || ''));
      return url.protocol === 'https:' && url.origin === base.origin && !url.username && !url.password ? url.href : '';
    } catch (_) { return ''; }
  }

  function safeWizardHref(value, panelBase) {
    try {
      const url = new URL(String(value || ''));
      if (url.protocol !== 'https:' || url.username || url.password) return '';
      if (url.origin === 'https://t.me' && url.pathname.length > 1) return url.href;
      return safePanelUrl(url.href, panelBase);
    } catch (_) { return ''; }
  }

  function normalizedHost(value) {
    try {
      const raw = String(value || '');
      const host = new URL(raw.includes('://') ? raw : `https://${raw}`).hostname.toLowerCase().replace(/\.$/, '');
      return host.replace(/^www\./, '');
    } catch (_) { return ''; }
  }

  function hostAllowedByRules(host, rules) {
    const normalized = normalizedHost(host);
    if (!normalized || !Array.isArray(rules)) return false;
    return rules.some((rule) => {
      const value = String(rule || '').trim();
      const wildcard = value.startsWith('*.');
      const base = normalizedHost(wildcard ? value.slice(2) : value);
      return base && (wildcard ? normalized === base || normalized.endsWith(`.${base}`) : normalized === base);
    });
  }

  function connectionSteps(hostState, data) {
    const host = hostState || {};
    const widget = host.widget || {};
    const key = String(widget.key || '');
    const check = widget.key_check && typeof widget.key_check === 'object' ? widget.key_check : null;
    const status = Number(check && check.status || 0);
    const steps = { account: null, consultant: null, domain: null, key: null };
    if (key && check && status > 0 && status < 500 && check.unreachable !== true) {
      if (!/^wk_[A-Za-z0-9]{24}$/.test(key) || status === 404) {
        steps.key = false;
      } else {
        steps.account = true;
        steps.key = true;
        steps.domain = status !== 403;
        if (status === 200) steps.consultant = check.setup_required !== true;
      }
    }
    if (host.connected) {
      // OAuth authenticates the account even before it contains a chat.
      if (steps.account === null) steps.account = true;
      const chats = Array.isArray(data && data.me && data.me.chats) ? data.me.chats : null;
      if (chats) {
        const linked = chats.find((chat) => String(chat && chat.id || '') === String(host.chat_id || ''));
        if (linked) {
          const persona = linked.persona && typeof linked.persona === 'object' ? linked.persona : {};
          if (steps.consultant === null) steps.consultant = !!persona.name;
          if (Array.isArray(linked.site_domains) && host.site && host.site.host) {
            steps.domain = hostAllowedByRules(host.site.host, linked.site_domains);
          }
          if (steps.key === null && /^wk_[A-Za-z0-9]{24}$/.test(key)) steps.key = true;
        }
      }
    }
    return [steps.account, steps.consultant, steps.domain, steps.key];
  }

  function connectionNoticeFromLocation(location) {
    try {
      const query = new URLSearchParams(String(location && location.search || ''));
      const allowed = new Set(['connected', 'linked', 'link_unsupported', 'link_domains', 'link_failed', 'state', 'failed']);
      const direct = query.get('aiworker_chat_notice') || query.get('aichat_notice') || query.get('aiw_notice') || query.get('connection');
      if (allowed.has(direct)) return direct;
      if (query.get('aiworker_chat_connected') === '1' || query.get('aichat_connected') === '1') return 'connected';
      const error = query.get('aiworker_chat_error') || query.get('aichat_error');
      if (error === 'state') return 'state';
      if (error) return 'failed';
    } catch (_) { }
    return '';
  }

  function linkLookup(links, panelBase) {
    const map = new Map();
    if (Array.isArray(links)) {
      links.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        const href = safeWizardHref(item.url || item.href, panelBase);
        const label = String(item.label || item.text || item.url || item.href || '');
        if (href && label) map.set(label, href);
      });
    } else if (links && typeof links === 'object') {
      Object.keys(links).forEach((label) => {
        const href = safeWizardHref(links[label], panelBase);
        if (href && label) map.set(label, href);
      });
    }
    return map;
  }

  function parseWizardText(doc, text, links, panelBase) {
    const fragment = doc.createDocumentFragment();
    const lookup = linkLookup(links, panelBase);
    const explicitPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

    function appendInline(parent, input) {
      const raw = String(input || '');
      const tokens = [];
      let cursor = 0;
      let match;
      while ((match = explicitPattern.exec(raw))) {
        if (match.index > cursor) tokens.push({ type: 'text', value: raw.slice(cursor, match.index) });
        const href = safeWizardHref(match[2], panelBase);
        tokens.push(href ? { type: 'link', value: match[1], href } : { type: 'text', value: match[0] });
        cursor = match.index + match[0].length;
      }
      explicitPattern.lastIndex = 0;
      if (cursor < raw.length) tokens.push({ type: 'text', value: raw.slice(cursor) });

      tokens.forEach((token) => {
        if (token.type === 'link') {
          const anchor = doc.createElement('a');
          anchor.href = token.href;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          anchor.textContent = token.value;
          parent.appendChild(anchor);
          return;
        }
        const value = token.value;
        const boldPattern = /\*\*([^*]+)\*\*/g;
        let offset = 0;
        let bold;
        while ((bold = boldPattern.exec(value))) {
          appendLinkedText(parent, value.slice(offset, bold.index), lookup, doc);
          const strong = doc.createElement('strong');
          strong.textContent = bold[1];
          parent.appendChild(strong);
          offset = bold.index + bold[0].length;
        }
        appendLinkedText(parent, value.slice(offset), lookup, doc);
      });
    }

    function appendLinkedText(parent, value, map, documentRef) {
      if (!value) return;
      const labels = [...map.keys()].sort((a, b) => b.length - a.length);
      let rest = value;
      while (rest) {
        let found = null;
        let foundAt = -1;
        labels.forEach((label) => {
          const at = rest.indexOf(label);
          if (at !== -1 && (foundAt === -1 || at < foundAt)) { found = label; foundAt = at; }
        });
        if (foundAt === -1) { parent.appendChild(documentRef.createTextNode(rest)); return; }
        if (foundAt) parent.appendChild(documentRef.createTextNode(rest.slice(0, foundAt)));
        const anchor = documentRef.createElement('a');
        anchor.href = map.get(found);
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.textContent = found;
        parent.appendChild(anchor);
        rest = rest.slice(foundAt + found.length);
      }
    }

    const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
    let paragraph = [];
    let list = null;
    const flushParagraph = () => {
      if (!paragraph.length) return;
      const p = doc.createElement('p');
      appendInline(p, paragraph.join(' '));
      fragment.appendChild(p);
      paragraph = [];
    };
    const flushList = () => { if (list) { fragment.appendChild(list); list = null; } };
    lines.forEach((line) => {
      const item = /^\s*[-*]\s+(.+)$/.exec(line);
      if (item) {
        flushParagraph();
        if (!list) list = doc.createElement('ul');
        const li = doc.createElement('li');
        appendInline(li, item[1]);
        list.appendChild(li);
      } else if (!line.trim()) {
        flushParagraph();
        flushList();
      } else {
        flushList();
        paragraph.push(line.trim());
      }
    });
    flushParagraph();
    flushList();
    return fragment;
  }

  const SVG_TAGS = new Set(['svg', 'g', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']);
  const SVG_ATTRS = new Set(['xmlns', 'viewBox', 'width', 'height', 'd', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'points', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'opacity', 'fill-opacity', 'stroke-opacity', 'transform']);

  function sanitizeSvg(svg, environment) {
    const source = String(svg || '').trim();
    if (!source || source.length > 50000) return '';
    const Parser = environment && environment.DOMParser || (typeof DOMParser !== 'undefined' ? DOMParser : null);
    const Serializer = environment && environment.XMLSerializer || (typeof XMLSerializer !== 'undefined' ? XMLSerializer : null);
    if (Parser && Serializer) return sanitizeSvgDom(source, Parser, Serializer);
    const tokens = source.match(/<!--[\s\S]*?-->|<\?[^>]*\?>|<[^>]+>|[^<]+/g) || [];
    if (tokens.join('') !== source) return '';
    const stack = [];
    let out = '';
    let rootSeen = false;
    for (const token of tokens) {
      if (token.startsWith('<!--') || token.startsWith('<?')) continue;
      if (!token.startsWith('<')) {
        if (token.trim()) return '';
        continue;
      }
      const closing = /^<\/([A-Za-z][A-Za-z0-9]*)\s*>$/.exec(token);
      if (closing) {
        const tag = closing[1].toLowerCase();
        if (stack.pop() !== tag) return '';
        out += `</${tag}>`;
        continue;
      }
      const open = /^<([A-Za-z][A-Za-z0-9]*)([\s\S]*?)\s*(\/?)>$/.exec(token);
      if (!open) return '';
      const tag = open[1].toLowerCase();
      if (!SVG_TAGS.has(tag) || (tag === 'svg' && rootSeen) || (!rootSeen && tag !== 'svg')) return '';
      if (tag === 'svg') rootSeen = true;
      const attrSource = open[2];
      const attrPattern = /\s+([A-Za-z][A-Za-z0-9:-]*)\s*=\s*("([^"]*)"|'([^']*)')/gy;
      const attrs = [];
      let position = 0;
      while (position < attrSource.length) {
        if (!attrSource.slice(position).trim()) break;
        attrPattern.lastIndex = position;
        const attr = attrPattern.exec(attrSource);
        if (!attr) return '';
        const name = attr[1];
        const value = attr[3] === undefined ? attr[4] : attr[3];
        if (!SVG_ATTRS.has(name) || /^on/i.test(name) || !validSvgAttribute(name, value)) return '';
        if (name === 'xmlns' && value !== 'http://www.w3.org/2000/svg') return '';
        if (name === 'd' && !/^[A-Za-z0-9.,+\-\s]*$/.test(value)) return '';
        if (name === 'points' && !/^[0-9.,+\-\s]*$/.test(value)) return '';
        if (name === 'viewBox' && !/^[0-9.,+\-\s]+$/.test(value)) return '';
        if (name === 'fill' || name === 'stroke') {
          if (!/^(none|currentColor|#[0-9a-fA-F]{3,8}|[A-Za-z]{1,24})$/.test(value)) return '';
        }
        if (name === 'transform' && !/^[A-Za-z0-9(),.\s+\-]*$/.test(value)) return '';
        attrs.push(` ${name}="${escapeAttribute(value)}"`);
        position = attrPattern.lastIndex;
      }
      const selfClosing = open[3] === '/';
      out += `<${tag}${attrs.join('')}${selfClosing ? '/>' : '>'}`;
      if (!selfClosing) stack.push(tag);
    }
    if (!rootSeen || stack.length) return '';
    return out;
  }

  function sanitizeSvgDom(source, Parser, Serializer) {
    const namespace = 'http://www.w3.org/2000/svg';
    try {
      const parsed = new Parser().parseFromString(source, 'image/svg+xml');
      const inputRoot = parsed.documentElement;
      if (!inputRoot || String(inputRoot.localName).toLowerCase() !== 'svg' || (inputRoot.namespaceURI && inputRoot.namespaceURI !== namespace) || parsed.getElementsByTagName('parsererror').length) return '';
      const output = new Parser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg"/>', 'image/svg+xml');
      const outputRoot = output.documentElement;
      const copyNode = (input, parent) => {
        [...input.childNodes].forEach((child) => {
          if (child.nodeType === 3 || child.nodeType === 4) {
            if (String(child.nodeValue || '').trim()) throw new TypeError('SVG text is not allowed');
            return;
          }
          if (child.nodeType !== 1) return;
          const tag = String(child.localName || '').toLowerCase();
          if (!SVG_TAGS.has(tag) || tag === 'svg' || (child.namespaceURI && child.namespaceURI !== namespace)) throw new TypeError('SVG tag is not allowed');
          const clean = output.createElementNS(namespace, tag);
          [...child.attributes].forEach((attribute) => {
            const name = attribute.name;
            const value = attribute.value;
            if (!SVG_ATTRS.has(name) || /^on/i.test(name) || !validSvgAttribute(name, value)) throw new TypeError('SVG attribute is not allowed');
            if (name !== 'xmlns') clean.setAttribute(name, value);
          });
          parent.appendChild(clean);
          copyNode(child, clean);
        });
      };
      [...inputRoot.attributes].forEach((attribute) => {
        const name = attribute.name;
        const value = attribute.value;
        if (!SVG_ATTRS.has(name) || /^on/i.test(name) || !validSvgAttribute(name, value)) throw new TypeError('SVG attribute is not allowed');
        if (name !== 'xmlns') outputRoot.setAttribute(name, value);
      });
      copyNode(inputRoot, outputRoot);
      return new Serializer().serializeToString(outputRoot);
    } catch (_) {
      return '';
    }
  }

  function validSvgAttribute(name, value) {
    if (/[<>\u0000-\u001f]/.test(value)) return false;
    if (name === 'xmlns') return value === 'http://www.w3.org/2000/svg';
    if (name === 'd') return /^[A-Za-z0-9.,+\-\s]*$/.test(value);
    if (name === 'points') return /^[0-9.,+\-\s]*$/.test(value);
    if (name === 'viewBox') return /^[0-9.,+\-\s]+$/.test(value);
    if (name === 'fill' || name === 'stroke') return /^(none|currentColor|#[0-9a-fA-F]{3,8}|[A-Za-z]{1,24})$/.test(value);
    if (name === 'transform') return /^[A-Za-z0-9(),.\s+\-]*$/.test(value);
    if (['width', 'height', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'stroke-width', 'opacity', 'fill-opacity', 'stroke-opacity'].includes(name)) return /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px)?$/.test(value);
    if (name === 'fill-rule' || name === 'clip-rule') return value === 'nonzero' || value === 'evenodd';
    if (name === 'stroke-linecap') return ['butt', 'round', 'square'].includes(value);
    if (name === 'stroke-linejoin') return ['miter', 'round', 'bevel'].includes(value);
    return true;
  }

  function escapeAttribute(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function svgDataUrl(svg, environment) {
    const clean = sanitizeSvg(svg, environment);
    if (!clean) return '';
    const encoder = environment && environment.TextEncoder ? new environment.TextEncoder() : (typeof TextEncoder !== 'undefined' ? new TextEncoder() : null);
    const bytes = encoder ? encoder.encode(clean) : Array.from(unescape(encodeURIComponent(clean)), (char) => char.charCodeAt(0));
    if (environment && typeof environment.btoa === 'function') {
      let binary = '';
      for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.slice(index, index + 0x8000));
      return `data:image/svg+xml;base64,${environment.btoa(binary)}`;
    }
    if (typeof btoa === 'function') {
      let binary = '';
      for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.slice(index, index + 0x8000));
      return `data:image/svg+xml;base64,${btoa(binary)}`;
    }
    if (typeof Buffer !== 'undefined') return `data:image/svg+xml;base64,${Buffer.from(clean, 'utf8').toString('base64')}`;
    return '';
  }

  function svgImage(doc, svg, environment) {
    const clean = sanitizeSvg(svg, environment);
    const Parser = environment && environment.DOMParser || (typeof DOMParser !== 'undefined' ? DOMParser : null);
    if (!clean || !Parser || typeof doc.importNode !== 'function') return null;
    try {
      const parsed = new Parser().parseFromString(clean, 'image/svg+xml');
      const root = parsed.documentElement;
      if (!root || String(root.localName).toLowerCase() !== 'svg' || parsed.getElementsByTagName('parsererror').length) return null;
      return doc.importNode(root, true);
    } catch (_) { return null; }
  }

  function makeProxyCall(method, path, query = {}, body) {
    const verb = String(method || '').toUpperCase();
    const cleanPath = String(path || '');
    if (!/^plugin(?:\/[a-z0-9-]+)*$/.test(cleanPath) || /\.\.|%|\/\/|\\/.test(cleanPath)) throw new TypeError('Proxy path is not allowed');
    let allowed = EXACT_CALLS.has(`${verb} ${cleanPath}`);
    if (/^plugin\/sources\/\d{1,10}$/.test(cleanPath)) allowed = ['PATCH', 'POST', 'DELETE'].includes(verb);
    if (/^plugin\/sources\/\d{1,10}\/refresh$/.test(cleanPath)) allowed = verb === 'POST';
    if (!allowed) throw new TypeError('Proxy method and path are not allowed');
    const cleanQuery = {};
    Object.keys(query || {}).forEach((key) => {
      if (!PROXY_QUERY_KEYS.has(key)) throw new TypeError('Proxy query key is not allowed');
      const value = query[key];
      if (value !== undefined && value !== null && value !== '') cleanQuery[key] = value;
    });
    return { method: verb, path: cleanPath, query: cleanQuery, body };
  }

  function stable(value) {
    if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
    if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
    return JSON.stringify(value);
  }

  function clone(value) {
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value == null ? {} : value));
  }

  function buildSettingsDiff(original, draft) {
    const diff = {};
    const direct = ['name', 'enabled', 'languages', 'default_lang', 'persona_id', 'leads_enabled', 'knowledge_mode', 'use_company_knowledge', 'retrieval_profile', 'answer_grounding_threshold', 'adaptive_retrieval_enabled', 'adaptive_retrieval_budget_s', 'theme', 'scheme', 'color', 'colors', 'position', 'launcher_icon', 'greet_popup', 'rating', 'ai_notice', 'voice', 'mount', 'inline_height'];
    direct.forEach((key) => {
      if (stable(original && original[key]) !== stable(draft && draft[key])) {
        diff[key] = key === 'languages' && Array.isArray(draft[key]) ? draft[key].slice(0, CHAT_LANGUAGES_MAX) : clone(draft[key]);
      }
    });
    const textDiff = {};
    const languages = [...new Set([...Object.keys((original && original.texts) || {}), ...Object.keys((draft && draft.texts) || {})])].slice(0, CHAT_LANGUAGES_MAX);
    languages.forEach((lang) => {
      const before = (original && original.texts && original.texts[lang]) || {};
      const after = (draft && draft.texts && draft.texts[lang]) || {};
      const fields = {};
      ['name', 'title', 'greeting', 'suggestions', 'tab_label'].forEach((key) => {
        if (stable(before[key]) !== stable(after[key])) {
          fields[key] = key === 'suggestions' && Array.isArray(after[key]) ? after[key].slice(0, SUGGESTIONS_MAX) : clone(after[key]);
        }
      });
      if (Object.keys(fields).length) textDiff[lang] = fields;
    });
    if (Object.keys(textDiff).length) diff.texts = textDiff;

    const beforeDelivery = (original && original.leads_delivery) || {};
    const afterDelivery = (draft && draft.leads_delivery) || {};
    const deliveryDiff = {};
    if (stable(beforeDelivery.enabled) !== stable(afterDelivery.enabled)) deliveryDiff.enabled = !!afterDelivery.enabled;
    const beforeChannels = Array.isArray(beforeDelivery.channels) ? beforeDelivery.channels : [];
    const afterChannels = Array.isArray(afterDelivery.channels) ? afterDelivery.channels : [];
    const beforeByType = new Map(beforeChannels.map((channel) => [String(channel.type), channel]));
    const channelDiff = {};
    afterChannels.forEach((channel) => {
      if (!channel) return;
      const type = String(channel.type || '');
      if (!type) return;
      const previous = beforeByType.get(type) || {};
      if (!channel.selected) {
        if (previous.selected === true) channelDiff[type] = { selected: false };
        return;
      }
      const fields = {};
      const previousFields = new Map((previous.fields || []).map((field) => [String(field.key), field]));
      (channel.fields || []).forEach((field) => {
        if (!field || !field.key) return;
        const old = previousFields.get(String(field.key)) || {};
        const value = field.value;
        if (field.type === 'secret' && String(value || '') === '') return;
        if (stable(old.value) !== stable(value)) fields[field.key] = value;
      });
      if (previous.selected !== true || Object.keys(fields).length) {
        channelDiff[type] = { selected: true };
        if (Object.keys(fields).length) channelDiff[type].fields = fields;
      }
    });
    if (Object.keys(channelDiff).length) deliveryDiff.channels = channelDiff;
    if (Object.keys(deliveryDiff).length) diff.leads_delivery = deliveryDiff;
    return diff;
  }

  function isSafeImageUrl(value) {
    try {
      const url = new URL(String(value || ''));
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
    } catch (_) { return ''; }
  }

  function resultBody(result) {
    return result && (result.body || result.data || result) || {};
  }

  function mount(root, config, dictionaries) {
    if (!root || !root.ownerDocument) throw new TypeError('mount requires a DOM element');
    const doc = root.ownerDocument;
    const win = doc.defaultView || (typeof window !== 'undefined' ? window : {});
    const locale = ['ru', 'en', 'uk'].includes(config && config.lang) ? config.lang : 'en';
    const sourceStrings = dictionaries || {};
    const texts = sourceStrings[locale] || sourceStrings.en || {};
    const en = sourceStrings.en || {};
    const t = (key) => {
      const parts = String(key).split('.');
      let value = texts;
      let fallback = en;
      for (const part of parts) { value = value && value[part]; fallback = fallback && fallback[part]; }
      return value === undefined ? (fallback === undefined ? key : fallback) : value;
    };
    const endpoint = normalizeEndpoint(config && config.endpoint, win.location && win.location.href);
    const panelBase = String(config && config.panelBase || '');
    const app = {
      root, doc, win, config: config || {}, endpoint, locale, t,
      hostState: null, data: {}, chatId: '', localChatId: '', selectedTab: 'settings',
      setupTab: 'wizard', detailsOpen: undefined, setupId: `aiwc-setup-${Math.random().toString(36).slice(2, 10)}`,
      formOriginal: null, formDraft: null, currentTextLang: locale, activeChannel: '', statsPeriod: '7d', statsFrom: '', statsTo: '',
      statsLoadedAt: 0, knowledgeStatus: null, knowledgeStatusError: '', syncStarting: false, syncPollPromise: null, syncPollJobId: '', assistantBody: null, assistantStartedAt: 0,
      assistantHardStop: 0, assistantTimer: null, pollTimer: null, pollStartedAt: 0,
      previewTimer: null, previewScript: null, previewLoaded: false, previewOptions: null, previewMountId: '', previewOpen: false, lastError: '',
      connectionNotice: connectionNoticeFromLocation(win.location), connectionNoticeText: '', connectionNoticeName: '',
      connectionExpired: false, showChatChoices: false, addingChat: false,
      fieldErrors: {}, blockErrors: {}, loading: false
    };
    if (!endpoint) {
      root.className = addClass(root.className, 'aiwc-root');
      root.replaceChildren();
      root.appendChild(makeNode(doc, 'p', 'aiwc-notice aiwc-notice-error', t('httpError')));
      return { destroy() {} };
    }
    root.className = addClass(root.className, 'aiwc-root');
    root.setAttribute('data-aiwc-version', '0.1.0');
    if ((config && config.theme === 'dark') || detectHostTheme(root, win)) root.setAttribute('data-aiwc-theme', 'dark');
    const listener = (event) => handleEvent(app, event);
    root.addEventListener('click', listener);
    root.addEventListener('input', listener);
    root.addEventListener('change', listener);
    root.addEventListener('keydown', listener);
    doc.addEventListener('visibilitychange', () => {
      if (app.assistantBody && app.assistantBody.watching) scheduleAssistantPoll(app, true);
      if (app.pollStartedAt) pollConnectState(app);
    });
    renderLoading(app);
    loadState(app).catch((error) => showFailure(app, error));
    return { destroy() { root.removeEventListener('click', listener); root.removeEventListener('input', listener); root.removeEventListener('change', listener); root.removeEventListener('keydown', listener); clearTimeout(app.assistantTimer); clearInterval(app.pollTimer); clearTimeout(app.previewTimer); } };
  }

  function normalizeEndpoint(value, currentHref) {
    try {
      const current = new URL(currentHref);
      const endpoint = new URL(String(value || ''), current);
      if (endpoint.origin !== current.origin || endpoint.username || endpoint.password) return '';
      return endpoint.href.replace(/\/$/, '');
    } catch (_) { return ''; }
  }

  function detectHostTheme(root, win) {
    const html = root.ownerDocument.documentElement;
    if (html && ((html.dataset && ['dark', 'dark-mode'].includes(html.dataset.colorScheme))
      || (html.dataset && html.dataset.bsTheme === 'dark')
      || (html.classList && (html.classList.contains('dark') || html.classList.contains('atum-dark'))))) return true;
    for (let candidate = root; candidate && candidate !== html; candidate = candidate.parentElement) {
      const classes = candidate.classList;
      if (classes && [...classes].some((name) => /(^|[-_])(dark|darkmode|dark-mode)([-_]|$)/i.test(name))) return true;
      if (candidate.dataset && (candidate.dataset.colorScheme === 'dark' || candidate.dataset.bsTheme === 'dark')) return true;
    }
    const getStyle = win && typeof win.getComputedStyle === 'function' ? (node) => win.getComputedStyle(node) : null;
    let node = root.parentElement;
    for (let depth = 0; node && depth < 5; depth++, node = node.parentElement) {
      if (!getStyle) break;
      const style = getStyle(node);
      if (style && /(^|\s)dark(\s|$)/i.test(String(style.colorScheme || ''))) return true;
      const color = style && (style.backgroundColor || style.background);
      const match = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(String(color || ''));
      if (match) {
        const luminance = (Number(match[1]) * 299 + Number(match[2]) * 587 + Number(match[3]) * 114) / 1000;
        if (luminance < 85) return true;
        if (luminance > 210) return false;
      }
    }
    return false;
  }

  function addClass(classes, name) {
    const values = new Set(String(classes || '').split(/\s+/).filter(Boolean));
    values.add(name);
    return [...values].join(' ');
  }

  function makeNode(doc, tag, className, text) {
    const element = doc.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = String(text);
    return element;
  }

  function actionButton(doc, label, action, classes) {
    const button = makeNode(doc, 'button', `aiwc-btn${classes ? ` ${classes}` : ''}`, label);
    button.type = 'button';
    button.dataset.action = action;
    return button;
  }

  // A deletion waits here until the owner answers. It opens above everything, the questions
  // popup included; Cancel has the focus, so Enter and Esc delete nothing.
  function askConfirm(app, text, label) {
    return new Promise((resolve) => {
      const dialog = makeNode(app.doc, 'dialog', 'aiwc-modal aiwc-modal-confirm');
      dialog.dataset.aiwcConfirm = '1';
      dialog.setAttribute('aria-labelledby', 'aiwc-confirm-text');
      const body = makeNode(app.doc, 'div', 'aiwc-modal-body');
      const question = makeNode(app.doc, 'p', '', text);
      question.id = 'aiwc-confirm-text';
      const actions = makeNode(app.doc, 'div', 'aiwc-modal-actions');
      let answered = false;
      const finish = (yes) => {
        if (answered) return;
        answered = true;
        dialog.close();
        dialog.remove();
        resolve(yes);
      };
      const answer = (className, caption, yes) => {
        const button = makeNode(app.doc, 'button', className, caption);
        button.type = 'button';
        button.addEventListener('click', () => finish(yes));
        actions.appendChild(button);
        return button;
      };
      const no = answer('aiwc-btn', app.t('cancel'), false);
      answer('aiwc-btn aiwc-btn-danger', label, true);
      body.append(question, actions);
      dialog.appendChild(body);
      dialog.addEventListener('close', () => finish(false)); // Esc
      app.root.appendChild(dialog);
      dialog.showModal();
      no.focus();
    });
  }

  function showStatus(app, message, tone) {
    const status = app.root.querySelector('[data-aiwc-status]');
    if (!status) return;
    status.textContent = message || '';
    status.className = `aiwc-status${tone ? ` aiwc-${tone}` : ''}`;
  }

  function showInlineNotice(app, selector, message, tone = 'success') {
    const status = app.root.querySelector(selector);
    if (!status) return;
    if (status._aiwcNoticeTimer) app.win.clearTimeout(status._aiwcNoticeTimer);
    status.textContent = message || '';
    status.className = `aiwc-notice${tone ? ` aiwc-notice-${tone}` : ''} aiwc-inline-notice`;
    status.hidden = !message;
    if (message) status._aiwcNoticeTimer = app.win.setTimeout(() => {
      status.hidden = true;
      status.textContent = '';
      status._aiwcNoticeTimer = null;
    }, 4000);
  }

  function renderLoading(app) {
    app.root.replaceChildren();
    app.root.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('loading')));
  }

  async function hostRequest(app, path, method = 'GET', body, formData = false) {
    const headers = { Accept: 'application/json' };
    const upper = String(method).toUpperCase();
    if (upper !== 'GET' || path === 'sync/status') {
      if (app.config.csrf && app.config.csrf.header && app.config.csrf.token) headers[app.config.csrf.header] = app.config.csrf.token;
      if (upper !== 'GET' && !formData) headers['Content-Type'] = 'application/json';
    }
    const options = { method: upper, credentials: 'same-origin', headers };
    let url = `${app.endpoint}/${String(path).replace(/^\//, '')}`;
    const perChat = new Set(['batch', 'api', 'icon', 'link', 'settings', 'sync', 'sync/status', 'chats/remove', 'key']);
    if (upper === 'GET' && ['state', 'sync/status'].includes(path) && app.localChatId) url += `${url.includes('?') ? '&' : '?'}chat=${encodeURIComponent(app.localChatId)}`;
    if (body !== undefined) {
      if (!formData && perChat.has(path) && app.localChatId && body && typeof body === 'object' && !Array.isArray(body)) body = { ...body, chat: app.localChatId };
      if (formData && perChat.has(path) && app.localChatId && body && typeof body.append === 'function' && !body.has('chat')) body.append('chat', app.localChatId);
      options.body = formData ? body : JSON.stringify(body);
    }
    let response;
    try { response = await app.win.fetch(url, options); }
    catch (_) { throw { status: 0, body: {}, message: app.t('httpError') }; }
    let parsed = {};
    try { parsed = await response.json(); } catch (_) {}
    if (!response.ok) throw { status: response.status, body: parsed, message: errorMessage(app, response.status, parsed) };
    return parsed;
  }

  function errorMessage(app, status, body) {
    if (status === 401) return app.t('unauthorized');
    if (body && body.error === 'invalid_chat_key') return app.t('publicKeyRejected');
    if (body && body.error === 'key_check_unavailable') return app.t('publicKeyCheckUnavailable');
    if (body && body.error === 'duplicate_key') return app.t('publicKeyDuplicate');
    if (status === 409 && body && ['registry_busy', 'busy', 'syncing'].includes(body.error)) return app.t('chatsBusy');
    if (status === 429) {
      const seconds = Number((body && body.retry_after) || 0);
      return seconds > 0 ? pluralChoose(seconds, app.t('retryAfter'), seconds, app.locale) : app.t('httpError');
    }
    if (status === 0 || status >= 500) return app.t('httpError');
    return String((body && (body.message || body.error)) || app.t('httpError'));
  }

  async function proxy(app, method, path, query = {}, body) {
    const call = makeProxyCall(method, path, query, body);
    const wrapped = await hostRequest(app, 'api', 'POST', call);
    const status = Number(wrapped.status || 200);
    const result = wrapped.body || {};
    if (status < 200 || status >= 300) throw { status, body: result, message: errorMessage(app, status, result) };
    return result;
  }

  async function batch(app, blocks, query = {}) {
    const response = await hostRequest(app, 'batch', 'POST', { blocks, query });
    return response.results || {};
  }

  function showFailure(app, error, target = null) {
    const status = Number((error && error.status) || 0);
    app.lastError = String((error && error.message) || errorMessage(app, status, error && error.body || {}) || app.t('httpError'));
    const notice = makeNode(app.doc, 'div', `aiwc-notice${status >= 400 ? ' aiwc-notice-error' : ''}`, app.lastError);
    notice.dataset.aiwcError = '1';
    notice.setAttribute('role', 'alert');
    notice.appendChild(actionButton(app.doc, app.t('retry'), 'retry', 'aiwc-btn-small'));
    const destination = target || app.root.querySelector('[data-aiwc-panel]') || app.root;
    destination.appendChild(notice);
  }

  function renderBlockErrors(app) {
    Object.keys(app.blockErrors || {}).forEach((block) => {
      const target = app.root.querySelector(`[data-aiwc-block="${cssEscape(block)}"]`);
      if (target) showFailure(app, app.blockErrors[block], target);
    });
  }

  async function loadState(app) {
    app.connectionExpired = false;
    app.blockErrors = {};
    const state = await hostRequest(app, 'state');
    app.hostState = state || {};
    app.localChatId = String(state && (state.current_chat || (state.chats && state.chats[0] && state.chats[0].id)) || app.localChatId || '');
    app.chatId = state && state.connected ? String(state.chat_id || '') : '';
    app.data = {};
    if (!state.connected) {
      app.lastError = '';
      app.formOriginal = {};
      app.formDraft = null;
      app.selectedTab = 'settings';
      renderShell(app);
      return;
    }
    if (!app.chatId) {
      app.formOriginal = {};
      app.formDraft = null;
      const accountBlocks = unlinkedAccountBlocks(state);
      const results = accountBlocks.length ? await batch(app, accountBlocks, { lang: app.locale }) : {};
      Object.keys(results).forEach((key) => {
        const result = results[key] || {};
        const status = Number(result.status || 200);
        if (status < 200 || status >= 300) {
          const body = result.body || {};
          app.blockErrors[key] = { status, body, message: errorMessage(app, status, body) };
        }
      });
      app.data.me = results.me ? resultBody(results.me) : {};
      if (app.data.me.status === 'not_connected') app.lastError = app.t('unauthorized');
      // OAuth return only refreshes account state. The owner explicitly connects one of the listed chats.
      const assistant = results.assistant || {};
      const assistantStatus = Number(assistant.status || 200);
      if (assistantStatus >= 200 && assistantStatus < 300) updateAssistant(app, resultBody(assistant));
      renderShell(app);
      return;
    }
    await loadScreen(app);
  }

  async function loadScreen(app) {
    renderLoading(app);
    const query = { chat_id: app.chatId, lang: app.locale };
    const results = await batch(app, ['me', 'chat', 'usage', 'channels', 'sources', 'faq', 'assistant'], query);
    app.data = {};
    app.blockErrors = {};
    Object.keys(results).forEach((key) => {
      const result = results[key] || {};
      const status = Number(result.status || 200);
      app.data[key] = resultBody(result);
      if (status < 200 || status >= 300) {
        const body = result.body || {};
        app.blockErrors[key] = { status, body, message: errorMessage(app, status, body) };
      }
    });
    app.assistantStartedAt = 0;
    updateAssistant(app, app.data.assistant || { messages: [], pending: [], watching: false });
    app.formOriginal = normalizeChatResponse(app.data.chat);
    app.formDraft = null;
    app.currentTextLang = app.locale;
    app.selectedTab = 'settings';
    renderShell(app);
    scheduleAssistantPoll(app, false);
  }

  function startConnectPolling(app) {
    if (app.pollTimer) return;
    app.pollStartedAt = Date.now();
    app.pollTimer = app.win.setInterval(() => pollConnectState(app), 4000);
  }

  async function pollConnectState(app) {
    if (!app.pollStartedAt || Date.now() - app.pollStartedAt > 3600000) {
      clearInterval(app.pollTimer);
      app.pollTimer = null;
      app.pollStartedAt = 0;
      return;
    }
    if (app.doc.visibilityState !== 'visible') return;
    try {
      const state = await hostRequest(app, 'state');
      if (state.connected && (state.chat_id || app.pollStartedAt)) {
        clearInterval(app.pollTimer);
        app.pollTimer = null;
        app.pollStartedAt = 0;
        app.hostState = state;
        if (!app.connectionNotice) app.connectionNotice = 'connected';
        await loadState(app);
      }
    } catch (error) {
      if (error.status === 401) { clearInterval(app.pollTimer); app.pollTimer = null; renderReconnect(app, error.message); }
    }
  }

  function renderConnect(app, reconnect = false) {
    const card = makeNode(app.doc, 'section', 'aiwc-card aiwc-connect');
    app.connectionExpired = reconnect;
    card.appendChild(makeStepTitle(app, 1, 'connectYourChat'));
    renderConnectionStep(app, card);
    const status = makeNode(app.doc, 'p', 'aiwc-status', '');
    status.dataset.aiwcStatus = '1';
    status.setAttribute('aria-live', 'polite');
    card.appendChild(status);
    app.root.replaceChildren(card);
    renderChatTabs(app, app.root);
  }

  function renderReconnect(app, message) {
    app.lastError = message || app.t('unauthorized');
    renderConnect(app, true);
  }

  async function linkSelectedChat(app) {
    const selector = app.addingChat ? 'input[name="aiwc-chat"]:checked' : 'input[name="chat_id"]:checked';
    const selected = [...app.root.querySelectorAll(selector)].map((input) => input.value).filter((value) => value && value !== 'new');
    if (!selected.length) return;
    const button = app.root.querySelector('[data-action="link-chat"]');
    if (button) button.disabled = true;
    const outcome = await linkChat(app, selected, { replaceCurrent: selector === 'input[name="chat_id"]:checked' && !!app.localChatId });
    if (outcome === null) { if (button) button.disabled = false; return; }
    if (!outcome) {
      app.showChatChoices = true;
      await loadState(app);
    }
  }

  /** Links a chat of the connected account to this site; true when linked (the screen is reloaded), false otherwise. */
  async function linkChat(app, chatIds, options = {}) {
    const ids = Array.isArray(chatIds) ? chatIds : [chatIds];
    if (!ids.length) return false;
    app.connectionNoticeText = '';
    app.connectionNoticeName = '';
    try {
      const response = await hostRequest(app, 'link', 'POST', app.addingChat ? { chat_ids: ids, new: true } : {
        chat_ids: ids, replace_current: !!app.chatId || !!options.replaceCurrent || !!options.confirmMove,
        ...(options.confirmMove ? { confirm_move: true } : {})
      });
      const results = Array.isArray(response && response.results) ? response.results : [response];
      const unchanged = results.find((result) => result && result.unchanged === true
        && String(result.local_chat || '') === String(app.localChatId || ''));
      if (unchanged) {
        app.localChatId = String(unchanged.local_chat || app.localChatId || '');
        app.chatId = String(unchanged.chat_id || app.chatId || '');
        app.connectionNotice = '';
        app.showChatChoices = false;
        app.addingChat = false;
        await loadState(app);
        return true;
      }
      const successful = results.filter((result) => Number(result.status || 0) >= 200 && Number(result.status || 0) < 300 && /^wk_[A-Za-z0-9]{24}$/.test(String(result.body && result.body.key || '')));
      if (!successful.length) {
        const result = results[0] || {};
        app.connectionNotice = connectionNoticeForLink(Number(result.status || 0), result.body || {});
        app.connectionNoticeText = String(result.body && result.body.message || '');
        app.connectionNoticeName = String(result.body && result.body.other_tab_name || '');
        return false;
      }
      if (!app.addingChat && (!!app.chatId || !!options.confirmMove)
        && String(successful[0].local_chat || '') !== String(app.localChatId || '')) {
        app.connectionNotice = 'link_failed';
        return false;
      }
      const sameBinding = !app.addingChat
        && String(successful[0].local_chat || '') === String(app.localChatId || '')
        && String(successful[0].chat_id || '') === String(app.chatId || '');
      const changed = successful[0].changed !== false && !sameBinding;
      app.localChatId = String(successful[0].local_chat || app.localChatId || '');
      app.chatId = String(successful[0].chat_id || '');
      app.connectionNotice = changed ? 'linked' : '';
    } catch (error) {
      if (error && error.body && (error.body.code === 'chat_on_other_tab' || error.body.error === 'chat_on_other_tab')
        && !options.confirmMove && !app.addingChat && ids.length === 1 && app.localChatId) {
        const known = localTabForRemoteChat(app, ids[0]);
        const name = String(error.body.other_tab_name || known && (known.name || known.chat_name || known.id) || '');
        const prompt = app.t('confirmMoveChat').replace(':name', name);
        if (await askConfirm(app, prompt, app.t('moveChat'))) {
          return linkChat(app, ids, { ...options, replaceCurrent: true, confirmMove: true });
        }
        return null;
      }
      app.connectionNotice = connectionNoticeForLink(Number(error && error.status || 0), error && error.body || {});
      app.connectionNoticeText = String(error && error.body && error.body.message || '');
      app.connectionNoticeName = String(error && error.body && error.body.other_tab_name || '');
      return false;
    }
    app.showChatChoices = false;
    app.addingChat = false;
    if (app.hostState && app.hostState.widget) delete app.hostState.widget.key_check;
    if (app.data) delete app.data.me;
    await loadState(app);
    return true;
  }

  function connectionNoticeForLink(status, body) {
    const result = body && typeof body === 'object' ? body : {};
    if (result.code === 'chat_on_other_tab' || result.error === 'chat_on_other_tab') return 'chat_on_other_tab';
    if (result.code === 'too_many_domains') return 'link_domains';
    if ((status === 404 || status === 405) && !result.code) return 'link_unsupported';
    if (status === 401) return 'failed';
    return 'link_failed';
  }

  function localTabForRemoteChat(app, remoteId) {
    const chats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
    return chats.find((chat) => Number(chat && chat.chat_id || 0) === Number(remoteId || 0)
      && String(chat && chat.id || '') !== String(app.localChatId || '')) || null;
  }

  async function saveManualKey(app, button) {
    const input = app.root.querySelector('[data-widget-key]');
    const key = String(input && input.value || '').trim();
    const adding = app.addingChat;
    if ((key || adding) && !/^wk_[A-Za-z0-9]{24}$/.test(key)) {
      setSettingsStatus(app, app.t('invalidPublicKey'), 'error');
      if (input) input.focus();
      return;
    }
    if (button) { button.disabled = true; button.textContent = app.t('saving'); }
    try {
      const response = await hostRequest(app, 'key', 'POST', adding ? { key, new: true } : { key });
      if (adding) {
        app.addingChat = false;
        app.localChatId = String(response.state.current_chat);
        await loadState(app);
        setSettingsStatus(app, app.t('savedLocal'), 'success');
        return;
      }
      if (response && response.state) app.hostState = response.state;
      else if (app.hostState) {
        app.hostState.widget = { ...(app.hostState.widget || {}), key: key || null };
        if (response && response.key_check) app.hostState.widget.key_check = response.key_check;
        else delete app.hostState.widget.key_check;
      }
      renderActiveTab(app);
      const checkedName = response && response.key_check && response.key_check.name;
      setSettingsStatus(app, checkedName ? app.t('publicKeyChecked').replace(':name', String(checkedName)) : app.t('savedLocal'), 'success');
    } catch (error) {
      if ([422, 503].includes(Number(error && error.status))) {
        setSettingsStatus(app, error.message || app.t('publicKeyRejected'), 'error');
      } else throw error;
    } finally {
      if (button) { button.disabled = false; button.textContent = app.t('saveAndCheck'); }
    }
  }

  async function openTelegramLink(app, button) {
    if (button) button.disabled = true;
    try {
      const body = await proxy(app, 'GET', 'plugin/telegram-link', { chat_id: app.chatId, lang: app.locale });
      const href = safeWizardHref(body.url || body.href, app.config.panelBase);
      if (!href) throw { status: 502, body: {}, message: app.t('telegramLinkUnavailable') };
      const opened = app.win.open(href, '_blank', 'noopener,noreferrer');
      if (opened) opened.opener = null;
      setSettingsStatus(app, app.t('telegramOpened'), 'success');
    } finally { if (button) button.disabled = false; }
  }

  function renderShell(app) {
    app.root.replaceChildren();
    const head = makeNode(app.doc, 'header', 'aiwc-head');
    const titleBox = makeNode(app.doc, 'div');
    titleBox.appendChild(makeNode(app.doc, 'h1', '', app.t('title')));
    titleBox.appendChild(makeNode(app.doc, 'p', 'aiwc-subtitle', app.t('adminDescription')));
    head.appendChild(titleBox);
    if (app.hostState && app.hostState.site && app.hostState.site.host) head.appendChild(makeNode(app.doc, 'span', 'aiwc-badge', app.hostState.site.host));
    app.root.appendChild(head);
    renderChatTabs(app, app.root);
    const tabs = makeNode(app.doc, 'nav', 'aiwc-tabs');
    tabs.setAttribute('role', 'tablist');
    ['settings', 'knowledge', ...(app.hostState && app.hostState.connected ? ['usage'] : [])].forEach((name) => {
      const tab = makeNode(app.doc, 'button', 'aiwc-tab', app.t(`tabs.${name}`));
      tab.type = 'button';
      tab.dataset.tab = name;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', app.selectedTab === name ? 'true' : 'false');
      tabs.appendChild(tab);
    });
    app.root.appendChild(tabs);
    const live = makeNode(app.doc, 'div', 'aiwc-status', '');
    live.dataset.aiwcStatus = '1';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    app.root.appendChild(live);
    const panel = makeNode(app.doc, 'main', 'aiwc-panel');
    panel.setAttribute('role', 'tabpanel');
    panel.dataset.aiwcPanel = '1';
    app.root.appendChild(panel);
    renderActiveTab(app);
  }

  function renderChatTabs(app, parent) {
    const chats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
    if (chats.length < 2) return;
    const nav = makeNode(app.doc, 'nav', 'aiwc-chat-tabs');
    nav.setAttribute('aria-label', app.t('chats'));
    nav.dataset.aiworkerChatTabs = '1';
    chats.forEach((chat) => {
      const label = String(chat.name || (chat.key ? `…${String(chat.key).slice(-8)}` : app.t('newChat')));
      const button = makeNode(app.doc, 'button', 'aiwc-chat-tab', label);
      button.type = 'button';
      button.dataset.localChat = String(chat.id);
      button.setAttribute('aria-current', String(chat.id) === app.localChatId ? 'page' : 'false');
      nav.appendChild(button);
    });
    parent.appendChild(nav);
  }

  function shouldFetchChatData(state) {
    return !(state && state.key_only);
  }

  function shouldFetchStats(state) {
    return !!(state && !state.key_only && (state.connected || Number(state.chat_id || 0) > 0));
  }

  function unlinkedAccountBlocks(state) {
    return shouldFetchChatData(state) ? ['me', 'assistant'] : [];
  }

  function renderActiveTab(app) {
    const panel = app.root.querySelector('[data-aiwc-panel]');
    if (!panel) return;
    panel.replaceChildren();
    if (app.selectedTab === 'settings') renderSettings(app, panel);
    else if (app.selectedTab === 'knowledge') renderKnowledge(app, panel);
    else renderUsage(app, panel);
    renderBlockErrors(app);
  }

  function handleEvent(app, event) {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    if (event.type === 'keydown' && target.closest('[data-wizard-input]')) {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); sendWizardAsk(app); }
      return;
    }
    if (event.type === 'click') {
      const setupTab = target.closest('[data-setup-tab]');
      if (setupTab) {
        app.setupTab = setupTab.dataset.setupTab;
        app.detailsOpen = true;
        updateSetupView(app);
        return;
      }
      const chatTab = target.closest('[data-local-chat]');
      if (chatTab) {
        if (app.selectedTab === 'settings') app.formDraft = readSettingsDraft(app);
        app.localChatId = String(chatTab.dataset.localChat || '');
        app.showChatChoices = false;
        app.addingChat = false;
        loadState(app).catch((error) => showFailure(app, error));
        return;
      }
      const tab = target.closest('[data-tab]');
      if (tab) { selectTab(app, tab.dataset.tab); return; }
      const language = target.closest('[data-language-tab]');
      if (language) { app.formDraft = readSettingsDraft(app); app.currentTextLang = language.dataset.languageTab; renderActiveTab(app); return; }
      const channelTab = target.closest('[data-channel-tab]');
      if (channelTab) { app.activeChannel = channelTab.dataset.channelTab; renderActiveTab(app); return; }
      const action = target.closest('[data-action]');
      if (action) { event.preventDefault(); dispatchAction(app, action.dataset.action, action); }
      return;
    }
    if (event.type === 'change') {
      const chatChoice = target.closest('input[name="chat_id"]');
      if (chatChoice) { updateChatPickerSelection(chatChoice.closest('.aiwc-account-chat-list')); return; }
      const widgetToggle = target.closest('[data-widget-enabled]');
      if (widgetToggle) { saveWidgetEnabled(app, widgetToggle); return; }
      const period = target.closest('[data-period]');
      if (period) { app.statsPeriod = period.value; syncStatsRange(app); loadStats(app); return; }
      const rangeDate = target.closest('[data-stats-date]');
      if (rangeDate) {
        app[rangeDate.dataset.statsDate === 'from' ? 'statsFrom' : 'statsTo'] = rangeDate.value;
        loadStats(app);
        return;
      }
      const sourceType = target.closest('[data-source-type]');
      if (sourceType) {
        const isText = sourceType.value === 'text';
        const url = app.root.querySelector('[data-source-url]');
        const text = app.root.querySelector('[data-source-text]');
        if (url) url.hidden = isText;
        if (text) text.hidden = !isText;
        return;
      }
      const file = target.closest('[data-icon-file]');
      if (file && file.files && file.files[0]) { uploadIcon(app, file.files[0]); return; }
      const field = target.closest('[data-field], [data-suggestion], [data-delivery-selected], [data-delivery-field], [data-leads-enabled], [data-delivery-enabled]');
      if (field) { refreshConditionalFields(app); refreshLauncherIconForeground(app); schedulePreview(app); }
      const widgetField = target.closest('[data-widget-field]');
      if (widgetField) {
        if (widgetField.type === 'color') widgetField.dataset.emptyColor = '0';
        refreshConditionalFields(app);
        refreshLauncherIconForeground(app);
        schedulePreview(app);
      }
      if (field) app.formDraft = readSettingsDraft(app);
      return;
    }
    if (event.type === 'input') {
      const faqFilter = target.closest('[data-faq-filter]');
      if (faqFilter) {
        app.faqView.query = faqFilter.value;
        app.faqView.page = 1;
        applyFaqView(app, faqFilter.closest('[data-aiwc-block="faq"]'));
        return;
      }
      if (target.closest('[data-field], [data-widget-field], [data-suggestion], [data-delivery-field]')) {
        const error = app.root.querySelector(`[data-error-for="${cssEscape(target.dataset.field || '')}"]`);
        if (error) { error.textContent = ''; error.hidden = true; }
        app.formDraft = readSettingsDraft(app);
        refreshLauncherIconForeground(app);
        schedulePreview(app);
      }
    }
  }

  function selectTab(app, name) {
    if (!['settings', 'knowledge', 'usage'].includes(name)) return;
    if (app.selectedTab === 'settings') app.formDraft = readSettingsDraft(app);
    app.selectedTab = name;
    app.root.querySelectorAll('[data-tab]').forEach((button) => button.setAttribute('aria-selected', button.dataset.tab === name ? 'true' : 'false'));
    renderActiveTab(app);
    if (name === 'knowledge') loadKnowledgeStatus(app);
    if (name === 'usage') loadStats(app);
  }

  async function saveWidgetEnabled(app, input) {
    input.disabled = true;
    try {
      const response = await hostRequest(app, 'settings', 'POST', { widget: { enabled: !!input.checked } });
      if (response && response.state) app.hostState = response.state;
      else if (app.hostState) app.hostState.widget = { ...(app.hostState.widget || {}), enabled: !!input.checked };
      updateWidgetVisibilityCard(app, input);
      showInlineNotice(app, '[data-widget-status]', app.t(input.checked ? 'widgetShownNotice' : 'widgetHiddenNotice'));
    } catch (error) {
      input.checked = !input.checked;
      updateWidgetVisibilityCard(app, input);
      showFailure(app, error);
    } finally { input.disabled = false; }
  }

  function renderSetup(app, panel) {
    const card = makeNode(app.doc, 'section', 'aiwc-card');
    card.dataset.aiwcBlock = 'assistant';
    card.appendChild(makeNode(app.doc, 'h2', '', app.t('tabs.setup')));
    card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('wizardHelp')));
    const log = makeNode(app.doc, 'div', 'aiwc-wizard-log');
    log.dataset.wizardLog = '1';
    log.setAttribute('aria-live', 'polite');
    renderWizardMessages(app, log);
    card.appendChild(log);
    renderPending(app, card);
    const input = app.doc.createElement('textarea');
    input.rows = 3;
    input.maxLength = 4000;
    input.dataset.wizardInput = '1';
    input.placeholder = app.t('wizardPlaceholder');
    input.setAttribute('aria-label', app.t('wizardPlaceholder'));
    card.appendChild(input);
    const actions = makeNode(app.doc, 'div', 'aiwc-actions');
    actions.appendChild(actionButton(app.doc, app.t('send'), 'wizard-send', 'aiwc-btn-primary'));
    actions.appendChild(actionButton(app.doc, app.t('clear'), 'wizard-clear', 'aiwc-btn-link'));
    card.appendChild(actions);
    card.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('voiceNote')));
    panel.appendChild(card);
  }

  function renderWizardMessages(app, log) {
    log.replaceChildren();
    const messages = Array.isArray(app.assistantBody && app.assistantBody.messages) ? app.assistantBody.messages : [];
    messages.forEach((message) => {
      const role = message && message.role === 'user' ? 'user' : 'assistant';
      const bubble = makeNode(app.doc, 'article', `aiwc-message aiwc-message-${role}`);
      bubble.appendChild(makeNode(app.doc, 'small', '', app.t(role === 'user' ? 'you' : 'assistant')));
      bubble.appendChild(parseWizardText(app.doc, message && message.text, role === 'assistant' ? message.links : null, app.config.panelBase));
      log.appendChild(bubble);
    });
    if (!messages.length) log.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('loading')));
    log.scrollTop = log.scrollHeight;
  }

  function renderPending(app, parent) {
    const pending = Array.isArray(app.assistantBody && app.assistantBody.pending) ? app.assistantBody.pending : [];
    if (!pending.length) return;
    const box = makeNode(app.doc, 'div', 'aiwc-pending');
    box.appendChild(makeNode(app.doc, 'strong', '', app.t('pending')));
    const list = makeNode(app.doc, 'ul');
    pending.forEach((item) => list.appendChild(makeNode(app.doc, 'li', '', typeof item === 'string' ? item : String(item && item.summary || ''))));
    box.appendChild(list);
    box.appendChild(actionButton(app.doc, app.t('apply'), 'wizard-apply', 'aiwc-btn-primary'));
    box.appendChild(actionButton(app.doc, app.t('discard'), 'wizard-discard', ''));
    parent.appendChild(box);
  }

  async function sendWizardAsk(app) {
    const input = app.root.querySelector('[data-wizard-input]');
    const text = String(input && input.value || '').trim();
    if (!text) { if (input) input.focus(); return; }
    const button = app.root.querySelector('[data-action="wizard-send"]');
    if (button) { button.disabled = true; button.textContent = app.t('sending'); }
    app.assistantStartedAt = Date.now();
    app.assistantHardStop = app.assistantStartedAt + 15 * 60 * 1000;
    try {
      const body = await proxy(app, 'POST', 'plugin/assistant/ask', { chat_id: app.chatId, lang: app.locale }, app.chatId ? { text, chat_id: app.chatId } : { text });
      updateAssistant(app, body);
      if (input) input.value = '';
      renderActiveTab(app);
    } catch (error) { showFailure(app, error); }
    finally {
      if (button) { button.disabled = false; button.textContent = app.t('send'); }
    }
  }

  async function wizardAction(app, operation) {
    if (operation === 'clear' && !app.win.confirm(app.t('clearConfirm'))) return;
    const path = `plugin/assistant/${operation}`;
    const body = await proxy(app, 'POST', path, { chat_id: app.chatId, lang: app.locale }, app.chatId ? { chat_id: app.chatId } : {});
    updateAssistant(app, body);
    // the wizard may have just created the account's chat: reload, so it is linked to this site
    if (operation === 'apply' && !app.chatId) { await loadState(app); return; }
    renderActiveTab(app);
  }

  function updateAssistant(app, body) {
    app.assistantBody = body || { messages: [], pending: [], watching: false };
    if (!app.assistantStartedAt) app.assistantStartedAt = Date.now();
    const serverStop = Date.parse(app.assistantBody.watch_until || '');
    const localStop = app.assistantStartedAt + 15 * 60 * 1000;
    app.assistantHardStop = serverStop && Number.isFinite(serverStop) ? Math.min(localStop, serverStop) : localStop;
    scheduleAssistantPoll(app, false);
  }

  function scheduleAssistantPoll(app, immediate) {
    clearTimeout(app.assistantTimer);
    app.assistantTimer = null;
    if (!app.assistantBody || !app.assistantBody.watching) return;
    if (!app.assistantStartedAt) app.assistantStartedAt = Date.now();
    if (!app.assistantHardStop) app.assistantHardStop = app.assistantStartedAt + 15 * 60 * 1000;
    if (Date.now() >= app.assistantHardStop || app.doc.visibilityState !== 'visible') return;
    const seconds = Math.max(1, Number(app.assistantBody.poll_after) || 8);
    app.assistantTimer = app.win.setTimeout(() => pollAssistant(app), immediate ? 0 : Math.min(seconds * 1000, app.assistantHardStop - Date.now()));
  }

  async function pollAssistant(app) {
    if (app.doc.visibilityState !== 'visible' || Date.now() >= app.assistantHardStop) return;
    try {
      const body = await proxy(app, 'GET', 'plugin/assistant', { chat_id: app.chatId, lang: app.locale });
      updateAssistant(app, body);
      if (app.selectedTab === 'settings' && app.root.querySelector('[data-wizard-log]')) renderActiveTab(app);
    } catch (error) {
      if (error.status === 401) showFailure(app, error);
      else scheduleAssistantPoll(app, false);
    }
  }

  function renderChannels(app, panel) {
    const card = makeNode(app.doc, 'section', 'aiwc-card');
    card.dataset.aiwcBlock = 'channels';
    card.appendChild(makeNode(app.doc, 'h2', '', app.t('tabs.channels')));
    card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('channelsIntro')));
    const body = app.data.channels || {};
    const list = Array.isArray(body.channels) ? body.channels : (Array.isArray(body) ? body : Object.keys(body).filter((key) => typeof body[key] === 'object').map((key) => ({ type: key, ...body[key] })));
    if (!list.length) card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('notAvailable')));
    const tabs = makeNode(app.doc, 'div', 'aiwc-channel-tabs');
    if (!app.activeChannel && list.length) app.activeChannel = String(list[0].type || list[0].key || '');
    list.forEach((channel) => {
      const key = String(channel.type || channel.key || '');
      const tab = makeNode(app.doc, 'button', 'aiwc-channel-tab');
      tab.type = 'button';
      tab.dataset.channelTab = key;
      tab.setAttribute('aria-pressed', key === app.activeChannel ? 'true' : 'false');
      tab.appendChild(app.doc.createTextNode(String(channel.label || channel.name || key)));
      const dot = makeNode(app.doc, 'i', 'aiwc-dot');
      if (channel.connected || channel.status === 'connected') dot.classList.add('is-connected');
      if (channel.error || channel.status === 'error') dot.classList.add('is-error');
      dot.setAttribute('aria-hidden', 'true');
      tab.appendChild(dot);
      tabs.appendChild(tab);
    });
    card.appendChild(tabs);
    const selected = list.find((channel) => String(channel.type || channel.key || '') === app.activeChannel);
    if (selected) {
      const box = makeNode(app.doc, 'section', 'aiwc-channel-panel');
      box.appendChild(makeNode(app.doc, 'h3', '', selected.label || selected.name || app.activeChannel));
      const connected = selected.connected || selected.status === 'connected';
      box.appendChild(makeNode(app.doc, 'p', connected ? 'aiwc-badge aiwc-badge-good' : 'aiwc-badge', app.t(connected ? 'connectedChannel' : (selected.error ? 'channelError' : 'notConnectedChannel'))));
      if (connected && (selected.username || selected.link)) {
        const who = makeNode(app.doc, 'p', 'aiwc-muted', String(selected.username ? '@' + String(selected.username).replace(/^@/, '') : ''));
        const publicLink = /^https:\/\/(t\.me|m\.me|wa\.me|(www\.)?instagram\.com|vk\.com)\/[^\s]*$/.test(String(selected.link || '')) ? String(selected.link) : '';
        if (publicLink) { if (who.textContent) who.appendChild(app.doc.createTextNode(' · ')); who.appendChild(externalLink(app.doc, publicLink, publicLink.replace(/^https:\/\//, ''), '')); }
        box.appendChild(who);
      }
      if (selected.needs && !connected && (!Array.isArray(selected.needs) || selected.needs.length)) {
        box.appendChild(makeNode(app.doc, 'strong', '', app.t('needs')));
        appendValueList(app.doc, box, selected.needs);
      }
      if (selected.error && typeof selected.error === 'string') box.appendChild(makeNode(app.doc, 'p', 'aiwc-notice aiwc-notice-error', selected.error));
      const connectUrl = safePanelUrl(selected.connect_url || selected.panel_url, app.config.panelBase);
      if (connectUrl) box.appendChild(externalLink(app.doc, connectUrl, app.t(connected ? 'manageChannel' : 'connectChannel').replace(':name', String(selected.label || selected.name || app.activeChannel)), 'aiwc-btn'));
      card.appendChild(box);
    }
    panel.appendChild(card);
  }

  function appendValueList(doc, parent, value) {
    const items = Array.isArray(value) ? value : [value];
    const list = makeNode(doc, 'ul');
    items.forEach((item) => list.appendChild(makeNode(doc, 'li', '', typeof item === 'object' ? item.label || item.name || JSON.stringify(item) : item)));
    parent.appendChild(list);
  }

  function externalLink(doc, href, label, className) {
    const link = makeNode(doc, 'a', className || '', label);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  function formatDateTime(app, value) {
    if (!value) return '';
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return String(value);
    try { return date.toLocaleString(app.locale, { dateStyle: 'medium', timeStyle: 'short' }); } catch (error) { return date.toISOString(); }
  }

  async function loadKnowledgeStatus(app) {
    try {
      const status = await hostRequest(app, 'sync/status');
      app.knowledgeStatus = status;
      app.knowledgeStatusError = knowledgeStatusError(status, app.t);
      if (app.selectedTab === 'knowledge') renderActiveTab(app);
      const job = status.sync_job || {};
      if (syncJobIsActive(job) && job.id) startSyncJobPoll(app, String(job.id));
    } catch (error) {
      app.knowledgeStatusError = error.message || app.t('knowledgeStatusUnavailable');
      if (app.selectedTab === 'knowledge') renderActiveTab(app);
      showFailure(app, error, app.root.querySelector('[data-sync-status]'));
    }
  }

  function syncJobIsActive(job) {
    return !!job && ['queued', 'running', 'retry_scheduled'].includes(String(job.status || ''));
  }

  function syncPollDelay(attempt) {
    return [3000, 6000, 10000][Math.min(2, Math.max(0, Number(attempt) || 0))];
  }

  function knowledgeStatusError(status, translate = (key) => key) {
    if (!status || status.status_pending) return '';
    for (const result of [status.knowledge, status.products]) {
      const code = Number(result && result.status);
      if (result && Number.isFinite(code) && (code < 200 || code >= 300)) {
        const body = result.body || {};
        const errorCode = body.code || body.error || '';
        if (errorCode) {
          const friendly = syncJobError(errorCode, translate);
          if (friendly !== String(errorCode)) return friendly;
        }
        return String(body.message || errorCode || translate('knowledgeStatusUnavailable'));
      }
    }
    return '';
  }

  function knowledgeIndexingLabel(indexing, translate = (key) => key) {
    const state = String(indexing && indexing.state || '');
    if (state === 'error' || indexing && indexing.error) return translate('syncError');
    if (state === 'ready' || (!state && indexing && indexing.ready)) return translate('syncReady');
    if (state === 'partial') return translate('syncPartial');
    return translate('syncQueued');
  }

  function syncJobSummary(job, translate = (key) => key, locale = 'en') {
    const result = job && (job.result || job.summary);
    if (!result || !Number.isFinite(Number(result.pages)) || !Number.isFinite(Number(result.products))) return '';
    const pages = Number(result.pages);
    const products = Number(result.products);
    const pagesText = pluralChoose(pages, translate('syncJobPages'), pages, locale);
    const productsText = pluralChoose(products, translate('syncJobProducts'), products, locale);
    return translate('syncJobResult').replace(':pages', pagesText).replace(':products', productsText);
  }

  function syncJobPartialSummary(job, translate = (key) => key, locale = 'en') {
    if (!job || job.status !== 'failed') return '';
    const progress = job.progress;
    if (!progress || !Number.isFinite(Number(progress.pages_processed)) || !Number.isFinite(Number(progress.products_processed))
      || !Number.isFinite(Number(progress.pages_target)) || !Number.isFinite(Number(progress.products_target))) return '';
    const pages = Number(progress.pages_processed);
    const products = Number(progress.products_processed);
    const partial = (pages > 0 && pages < Number(progress.pages_target)) || (products > 0 && products < Number(progress.products_target));
    if (!partial) return '';
    const pagesText = pluralChoose(pages, translate('syncJobPages'), pages, locale);
    const productsText = pluralChoose(products, translate('syncJobProducts'), products, locale);
    return translate('syncJobPartialResult').replace(':pages', pagesText).replace(':products', productsText);
  }

  function syncJobError(error, translate = (key) => key) {
    const code = String(error || '');
    const keys = { reconnect: 'syncErrorReconnect', platform_chat_foreign_site: 'syncErrorForeignSite', bad_token: 'syncErrorBadToken' };
    return keys[code] ? translate(keys[code]) : code;
  }

  function syncJobProgress(job, translate = (key) => key) {
    const progress = job && job.progress;
    if (!progress || !Number.isFinite(Number(progress.step)) || !Number.isFinite(Number(progress.total))) return '';
    return translate('syncJobProgress').replace(':done', String(progress.step)).replace(':total', String(progress.total));
  }

  function renderKnowledge(app, panel) {
    const card = makeNode(app.doc, 'section', 'aiwc-card');
    card.appendChild(makeNode(app.doc, 'h2', '', app.t('tabs.knowledge')));
    card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('knowledgeIntro')));
    const syncCard = makeNode(app.doc, 'section', 'aiwc-card');
    syncCard.dataset.syncStatus = '1';
    syncCard.appendChild(makeNode(app.doc, 'h3', '', app.t('siteExport')));
    const sync = app.hostState && app.hostState.sync || {};
    const pages = sync.pages || {};
    const products = sync.products || {};
    addCheckRow(app, syncCard, app.t('syncPages'), !!pages.enabled, 'sync-pages');
    const productsRow = addCheckRow(app, syncCard, app.t('syncProducts'), !!products.enabled, 'sync-products');
    if (!products.available) {
      const input = productsRow.querySelector('input');
      input.disabled = true;
      productsRow.appendChild(makeNode(app.doc, 'span', 'aiwc-help', app.t('productsUnavailable')));
    }
    const status = app.knowledgeStatus || {};
    const statusError = app.knowledgeStatusError || knowledgeStatusError(status, app.t);
    const indexing = {};
    if (statusError) {
      syncCard.appendChild(makeNode(app.doc, 'p', 'aiwc-notice aiwc-notice-error', statusError));
    } else if (!status.status_pending) {
      const kv = makeNode(app.doc, 'div', 'aiwc-kv');
      const sourceStatus = status.site || status.status || status;
      const docs = Number(sourceStatus.docs || sourceStatus.documents || 0);
      const chars = Number(sourceStatus.chars || sourceStatus.characters || 0);
      addKv(app, kv, 'documents', pluralChoose(docs, app.t('documentsCount'), docs, app.locale));
      addKv(app, kv, 'characters', chars.toLocaleString(app.locale));
      Object.assign(indexing, sourceStatus.indexing || {});
      addKv(app, kv, 'indexing', knowledgeIndexingLabel(indexing, app.t));
      addKv(app, kv, 'lastSync', formatDateTime(app, sourceStatus.last_sync_at || sync.last_run) || app.t('notAvailable'));
      syncCard.appendChild(kv);
    }
    const syncJob = status.sync_job || {};
    const jobLabels = { queued: 'syncJobQueued', running: 'syncJobRunning', retry_scheduled: 'syncJobRetry',
      completed: 'syncJobCompleted', completed_with_warnings: 'syncJobWarning', failed: 'syncJobFailed' };
    if (syncJob.status) {
      const active = syncJobIsActive(syncJob) || app.syncStarting;
      const displayStatus = syncJob.status === 'running' || (syncJob.status === 'queued' && syncJob.progress && typeof syncJob.progress === 'object')
        ? 'running' : syncJob.status;
      const jobNote = makeNode(app.doc, 'p', active ? 'aiwc-notice' : (syncJob.status === 'failed' ? 'aiwc-notice aiwc-notice-error' : 'aiwc-notice'), app.t(jobLabels[displayStatus] || 'syncJobQueued'));
      jobNote.dataset.syncJobStatus = syncJob.status;
      const progress = syncJob.status === 'failed' ? '' : syncJobProgress(syncJob, app.t);
      const summary = syncJob.status === 'failed' ? syncJobPartialSummary(syncJob, app.t, app.locale) : syncJobSummary(syncJob, app.t, app.locale);
      if (progress) jobNote.appendChild(app.doc.createTextNode(` ${progress}`));
      if (summary) jobNote.appendChild(app.doc.createTextNode(` ${summary}`));
      if (syncJob.status === 'failed' && syncJob.error) jobNote.appendChild(app.doc.createTextNode(` ${app.t('syncJobFailureDetail').replace(':error', syncJobError(syncJob.error, app.t))}`));
      syncCard.appendChild(jobNote);
    }
    if (indexing.dropped_message) syncCard.appendChild(makeNode(app.doc, 'p', 'aiwc-notice', indexing.dropped_message));
    const syncActions = makeNode(app.doc, 'div', 'aiwc-actions');
    const syncButton = actionButton(app.doc, app.t(syncJobIsActive(syncJob) || app.syncStarting ? 'syncWorking' : 'syncNow'), 'sync-now', 'aiwc-btn-primary');
    if (syncJobIsActive(syncJob) || app.syncStarting) {
      syncButton.disabled = true;
      syncButton.setAttribute('aria-busy', 'true');
      syncButton.appendChild(makeNode(app.doc, 'span', 'aiwc-spinner'));
    }
    syncActions.appendChild(syncButton);
    syncActions.appendChild(actionButton(app.doc, app.t('save'), 'sync-settings'));
    syncCard.appendChild(syncActions);
    const saveNotice = makeNode(app.doc, 'div', 'aiwc-notice aiwc-notice-success aiwc-inline-notice', '');
    saveNotice.dataset.syncSettingsStatus = '1';
    saveNotice.hidden = true;
    saveNotice.setAttribute('role', 'status');
    saveNotice.setAttribute('aria-live', 'polite');
    syncCard.appendChild(saveNotice);
    panel.appendChild(card);
    panel.appendChild(syncCard);
    renderSources(app, panel);
    renderFaq(app, panel);
  }

  function addKv(app, parent, key, value) {
    const cell = makeNode(app.doc, 'div');
    cell.appendChild(makeNode(app.doc, 'span', '', app.t(key)));
    cell.appendChild(makeNode(app.doc, 'strong', '', value));
    parent.appendChild(cell);
  }

  function addCheckRow(app, parent, label, checked, key) {
    const row = makeNode(app.doc, 'label', 'aiwc-check');
    const input = app.doc.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    input.dataset.syncSetting = key;
    row.appendChild(input);
    row.appendChild(makeNode(app.doc, 'span', '', label));
    parent.appendChild(row);
    return row;
  }

  function renderSources(app, panel) {
    const card = makeNode(app.doc, 'section', 'aiwc-card');
    card.dataset.aiwcBlock = 'sources';
    card.appendChild(makeNode(app.doc, 'h2', '', app.t('sources')));
    const body = app.data.sources || {};
    const all = Array.isArray(body.sources) ? body.sources : Array.isArray(body.items) ? body.items : [];
    // Questions and answers always come first; the row is there even before the first question, to add it.
    const faqLoaded = !!app.data.faq && !(app.blockErrors && app.blockErrors.faq);
    const faqCount = faqItems(app.data.faq).length;
    const faqRows = all.filter((source) => source.type === 'faq');
    if (!faqRows.length && faqLoaded) faqRows.push({ type: 'faq', title: app.t('faq') });
    const sources = [...faqRows, ...all.filter((source) => source.type !== 'faq')];
    const list = makeNode(app.doc, 'ul', 'aiwc-list');
    sources.forEach((source) => {
      const item = makeNode(app.doc, 'li', 'aiwc-item');
      const title = makeNode(app.doc, 'strong', '', source.title || source.name || source.url || source.type_label || `#${source.id}`);
      item.appendChild(title);
      if (source.type === 'faq' && faqLoaded) title.after(makeNode(app.doc, 'span', 'aiwc-muted aiwc-source-count', pluralChoose(faqCount, app.t('faqQuestions'), faqCount, app.locale)));
      if (source.url && isSafeImageUrl(source.url)) item.appendChild(externalLink(app.doc, source.url, source.url, 'aiwc-help'));
      // An emptied list is no error, whatever kra.name says about a source without text.
      if (source.error && !(source.type === 'faq' && faqLoaded && !faqCount)) item.appendChild(makeNode(app.doc, 'p', 'aiwc-error', source.error));
      const actions = makeNode(app.doc, 'div', 'aiwc-item-actions');
      if (['site', 'page', 'gdoc', 'gsheet', 'url'].includes(source.type)) actions.appendChild(actionButton(app.doc, app.t('refresh'), 'source-refresh', 'aiwc-btn-small'));
      actions.lastChild && (actions.lastChild.dataset.id = String(source.id || ''));
      if (source.type !== 'faq') {
        const del = actionButton(app.doc, app.t('delete'), 'source-delete', 'aiwc-btn-small aiwc-btn-danger');
        del.dataset.id = String(source.id || '');
        actions.appendChild(del);
      } else if (faqLoaded) {
        actions.appendChild(actionButton(app.doc, app.t('faqEdit'), 'faq-open', 'aiwc-btn-small'));
        if (faqCount) actions.appendChild(actionButton(app.doc, app.t('faqClear'), 'faq-clear', 'aiwc-btn-small aiwc-btn-danger'));
      }
      item.appendChild(actions);
      list.appendChild(item);
    });
    card.appendChild(list);
    if (app.blockErrors && app.blockErrors.faq) showFailure(app, app.blockErrors.faq, card);
    const form = makeNode(app.doc, 'div', 'aiwc-fields');
    form.appendChild(makeNode(app.doc, 'h3', '', app.t('addSource')));
    const type = app.doc.createElement('select');
    type.dataset.sourceType = '1';
    [['url', app.t('page')], ['text', app.t('text')]].forEach(([value, label]) => appendOption(app.doc, type, value, label));
    form.appendChild(wrapLabel(app.doc, app.t('sourceType'), type));
    const url = app.doc.createElement('input');
    url.type = 'url';
    url.dataset.sourceUrl = '1';
    form.appendChild(wrapLabel(app.doc, app.t('sourceUrl'), url));
    const text = app.doc.createElement('textarea');
    text.rows = 4;
    text.dataset.sourceText = '1';
    text.hidden = true;
    form.appendChild(wrapLabel(app.doc, app.t('sourceText'), text));
    const title = app.doc.createElement('input');
    title.type = 'text';
    title.dataset.sourceTitle = '1';
    form.appendChild(wrapLabel(app.doc, app.t('sourceTitle'), title));
    const add = actionButton(app.doc, app.t('add'), 'source-add', 'aiwc-btn-primary');
    form.appendChild(add);
    card.appendChild(form);
    panel.appendChild(card);
  }

  function renderFaq(app, panel) {
    if (!app.data.faq || (app.blockErrors && app.blockErrors.faq)) return;
    const dialog = app.doc.createElement('dialog');
    dialog.className = 'aiwc-modal';
    dialog.dataset.faqDialog = '1';
    const head = makeNode(app.doc, 'div', 'aiwc-modal-head');
    head.appendChild(makeNode(app.doc, 'h2', '', app.t('faq')));
    const close = actionButton(app.doc, '×', 'faq-close', 'aiwc-modal-close');
    close.setAttribute('aria-label', app.t('faqClose'));
    head.appendChild(close);
    dialog.appendChild(head);
    const card = makeNode(app.doc, 'div', 'aiwc-modal-body');
    card.dataset.aiwcBlock = 'faq';
    card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('faqHelp')));
    const items = faqItems(app.data.faq);
    // kra.name returns every question at once, and the block is rebuilt after each save: the view outlives it.
    if (!app.faqView || app.faqView.chat !== app.chatId) app.faqView = { chat: app.chatId, query: '', page: 1, open: false, top: 0, saved: false };
    const view = app.faqView;
    dialog.addEventListener('close', () => { view.open = false; });
    const notice = makeNode(app.doc, 'div');
    notice.dataset.faqNotice = '1';
    if (view.saved) {
      view.saved = false;
      notice.appendChild(makeNode(app.doc, 'p', 'aiwc-notice', app.t('saved')));
    }
    card.appendChild(notice);
    const top = makeNode(app.doc, 'div', 'aiwc-faq-tools');
    top.dataset.faqTools = 'top';
    top.appendChild(actionButton(app.doc, app.t('addQuestion'), 'faq-add', 'aiwc-btn-small'));
    const filter = app.doc.createElement('input');
    filter.type = 'search';
    filter.value = app.faqView.query;
    filter.placeholder = app.t('faqFilter');
    filter.setAttribute('aria-label', app.t('faqFilter'));
    filter.dataset.faqFilter = '1';
    top.appendChild(filter);
    const count = makeNode(app.doc, 'span', 'aiwc-muted');
    count.dataset.faqCount = '1';
    top.appendChild(count);
    card.appendChild(top);
    const form = renderFaqRow(app, { id: '', question: '', answer: '' });
    form.hidden = true;
    form.dataset.faqForm = '1';
    card.appendChild(form);
    const list = makeNode(app.doc, 'div', 'aiwc-fields');
    list.dataset.faqList = '1';
    items.forEach((item) => list.appendChild(renderFaqRow(app, item)));
    card.appendChild(list);
    const none = makeNode(app.doc, 'p', 'aiwc-muted', app.t('faqNone'));
    none.dataset.faqNone = '1';
    none.hidden = true;
    card.appendChild(none);
    const bottom = makeNode(app.doc, 'div', 'aiwc-faq-tools');
    bottom.dataset.faqTools = 'bottom';
    bottom.appendChild(actionButton(app.doc, app.t('addQuestion'), 'faq-add', 'aiwc-btn-small'));
    const pager = makeNode(app.doc, 'span', 'aiwc-faq-pager');
    pager.dataset.faqPager = '1';
    [['-1', '‹', 'faqPrevious'], ['', '', ''], ['1', '›', 'faqNext']].forEach(([step, text, label]) => {
      if (!step) { const page = makeNode(app.doc, 'span'); page.dataset.faqPage = '1'; pager.appendChild(page); return; }
      const button = actionButton(app.doc, text, 'faq-page', 'aiwc-btn-small');
      button.dataset.step = step;
      button.setAttribute('aria-label', app.t(label));
      pager.appendChild(button);
    });
    bottom.appendChild(pager);
    card.appendChild(bottom);
    dialog.appendChild(card);
    panel.appendChild(dialog);
    applyFaqView(app, card);
    // A save rebuilds the block: the window comes back where it was.
    if (view.open) { dialog.showModal(); dialog.scrollTop = view.top; }
  }

  function faqItems(body) {
    const data = body || {};
    return Array.isArray(data.faq) ? data.faq : Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];
  }

  // kra.name has no «delete all»: one by one, stopping at its limit of 30 changes a minute.
  async function faqClear(app, button) {
    if (!await askConfirm(app, app.t('faqClearConfirm'), button.textContent)) return;
    const query = { chat_id: app.chatId, lang: app.locale };
    const items = faqItems(await proxy(app, 'GET', 'plugin/faq', query));
    let done = 0;
    try {
      for (const item of items) {
        await proxy(app, 'DELETE', 'plugin/faq', { ...query, id: String(item.id) });
        done++;
      }
    } catch (error) {
      if (!done) throw error;
      await refreshKnowledgeLists(app);
      showStatus(app, app.t('faqClearPartial').replace(':done', String(done)).replace(':left', String(items.length - done)), 'error');
      return;
    }
    await refreshKnowledgeLists(app);
  }

  function renderFaqRow(app, item) {
    const row = makeNode(app.doc, 'div', 'aiwc-item aiwc-faq-row');
    row.dataset.faqId = String(item.id || '');
    if (!item.id) row.appendChild(makeNode(app.doc, 'h3', 'aiwc-subsection-title', app.t('newQuestion')));
    const question = app.doc.createElement('input'); question.type = 'text'; question.value = item.question || ''; question.dataset.faqQuestion = '1';
    const answer = app.doc.createElement('textarea'); answer.rows = 5; answer.value = item.answer || ''; answer.dataset.faqAnswer = '1';
    const questionLabel = wrapLabel(app.doc, app.t('question'), question);
    questionLabel.classList.add('aiwc-faq-question');
    const answerLabel = wrapLabel(app.doc, app.t('answer'), answer);
    answerLabel.classList.add('aiwc-faq-answer');
    row.appendChild(questionLabel);
    row.appendChild(answerLabel);
    const actions = makeNode(app.doc, 'div', 'aiwc-actions');
    const save = actionButton(app.doc, app.t(item.id ? 'save' : 'add'), 'faq-save', item.id ? 'aiwc-btn-small' : 'aiwc-btn-small aiwc-btn-primary');
    save.dataset.id = String(item.id || '');
    actions.appendChild(save);
    if (item.id) {
      const del = actionButton(app.doc, app.t('delete'), 'faq-delete', 'aiwc-btn-small aiwc-btn-danger');
      del.dataset.id = String(item.id);
      actions.appendChild(del);
    } else {
      actions.appendChild(actionButton(app.doc, app.t('cancel'), 'faq-cancel', 'aiwc-btn-small'));
    }
    row.appendChild(actions);
    return row;
  }

  // Rows stay in the page and are only hidden, so an unsaved edit survives filtering and paging.
  function applyFaqView(app, card) {
    const view = app.faqView;
    const rows = [...card.querySelector('[data-faq-list]').children];
    const query = view.query.trim().toLocaleLowerCase();
    const found = rows.filter((row) => !query || `${row.querySelector('[data-faq-question]').value}\n${row.querySelector('[data-faq-answer]').value}`.toLocaleLowerCase().includes(query));
    const pages = Math.max(1, Math.ceil(found.length / FAQ_PAGE));
    view.page = Math.min(Math.max(1, view.page), pages);
    const visible = new Set(found.slice((view.page - 1) * FAQ_PAGE, view.page * FAQ_PAGE));
    rows.forEach((row) => { row.hidden = !visible.has(row); });
    card.querySelector('[data-faq-none]').hidden = !rows.length || found.length > 0;
    card.querySelector('[data-faq-count]').textContent = rows.length ? `${query ? `${found.length} / ` : ''}${rows.length}` : '';
    const pager = card.querySelector('[data-faq-pager]');
    pager.hidden = pages < 2;
    card.querySelector('[data-faq-page]').textContent = app.t('faqPage').replace(':pages', String(pages)).replace(':page', String(view.page));
    pager.querySelector('[data-step="-1"]').disabled = view.page < 2;
    pager.querySelector('[data-step="1"]').disabled = view.page >= pages;
  }

  function faqControl(app, action, button) {
    const dialog = app.root.querySelector('[data-faq-dialog]');
    if (action === 'faq-open') {
      app.faqView.open = true;
      dialog.showModal();
      return;
    }
    if (action === 'faq-close') {
      dialog.close();
      return;
    }
    const card = button.closest('[data-aiwc-block="faq"]');
    const form = card.querySelector('[data-faq-form]');
    if (action === 'faq-add') {
      // The form opens where the button was pressed, so it is in view on a long list.
      const tools = button.closest('[data-faq-tools]');
      tools.parentNode.insertBefore(form, tools.dataset.faqTools === 'top' ? tools.nextSibling : tools);
      form.hidden = false;
      form.querySelector('[data-faq-question]').focus();
    } else if (action === 'faq-cancel') {
      form.hidden = true;
    } else {
      app.faqView.page += Number(button.dataset.step);
      applyFaqView(app, card);
      card.scrollIntoView({ block: 'start' });
    }
  }

  function renderUsage(app, panel) {
    const card = makeNode(app.doc, 'section', 'aiwc-card');
    card.dataset.aiwcBlock = 'usage';
    card.appendChild(makeNode(app.doc, 'h2', '', app.t('tabs.usage')));
    card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('usageIntro')));
    const usage = app.statsBody || currentUsage(app);
    const meterList = makeNode(app.doc, 'div');
    meterList.dataset.usageMeters = '1';
    renderUsageMeters(app, meterList, usage);
    card.appendChild(meterList);
    if (app.hostState && app.hostState.key_only) {
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('usageNeedsLinkedChat')));
    }
    const stats = makeNode(app.doc, 'section', 'aiwc-card');
    const top = makeNode(app.doc, 'div', 'aiwc-topline aiwc-stats-top');
    top.appendChild(makeNode(app.doc, 'h2', '', app.t('statistics')));
    const period = app.doc.createElement('select');
    period.dataset.period = '1';
    [['7d', 'period7d'], ['30d', 'period30d'], ['90d', 'period90d'], ['month', 'periodMonth'], ['custom', 'periodCustom']].forEach(([value, key]) => appendOption(app.doc, period, value, app.t(key)));
    period.value = app.statsPeriod;
    top.appendChild(renderStatsRange(app));
    top.appendChild(wrapLabel(app.doc, app.t('period'), period));
    stats.appendChild(top);
    const result = makeNode(app.doc, 'div');
    result.dataset.statsResult = '1';
    result.dataset.aiwcBlock = 'usage';
    result.setAttribute('aria-live', 'polite');
    if (app.statsBody) renderStatsTable(app, result, app.statsBody);
    else result.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('loading')));
    stats.appendChild(result);
    panel.appendChild(card);
    panel.appendChild(stats);
  }

  function renderMeter(app, meter, fallbackLabel) {
    const used = Number(meter.used) || 0;
    const limit = Number(meter.limit) || 0;
    const percent = Number.isFinite(Number(meter.percent)) ? Number(meter.percent) : (limit > 0 ? used / limit * 100 : null);
    const box = makeNode(app.doc, 'div', `aiwc-meter${percent >= 100 ? ' is-bad' : percent >= 80 ? ' is-warn' : ''}`);
    const label = String(meter.label || fallbackLabel || meter.key || '');
    const value = meter.text || (limit > 0 ? `${used.toLocaleString(app.locale)} ${app.t('of')} ${limit.toLocaleString(app.locale)}` : `${used.toLocaleString(app.locale)} · ${app.t('noLimit')}`);
    const head = makeNode(app.doc, 'div', 'aiwc-meter-head');
    head.appendChild(makeNode(app.doc, 'span', '', label));
    head.appendChild(makeNode(app.doc, 'strong', '', value));
    box.appendChild(head);
    if (percent !== null && Number.isFinite(percent)) {
      const bar = makeNode(app.doc, 'div', 'aiwc-meter-bar');
      const width = Math.round(Math.max(0, Math.min(100, percent)) / 5) * 5;
      const fill = makeNode(app.doc, 'span', `aiwc-meter-fill aiwc-meter-fill-${width}`);
      bar.appendChild(fill);
      box.appendChild(bar);
    }
    if (meter.hint) box.appendChild(makeNode(app.doc, 'p', 'aiwc-help', String(meter.hint)));
    if (meter.cta && safePanelUrl(meter.cta_url, app.config.panelBase)) box.appendChild(externalLink(app.doc, safePanelUrl(meter.cta_url, app.config.panelBase), meter.cta, 'aiwc-help'));
    return box;
  }

  function usageMeters(usage) {
    if (Array.isArray(usage && usage.rows) && usage.rows.length) {
      let rows = usage.rows.filter((row) => row && typeof row === 'object');
      if (rows.some((row) => row.key === 'free_tokens')) rows = rows.filter((row) => row.key !== 'tokens');
      return rows;
    }
    return [usage && usage.tokens, ...(Array.isArray(usage && usage.meters) ? usage.meters : [])].filter(Boolean);
  }

  function renderUsageMeters(app, target, usage) {
    target.replaceChildren();
    const meters = usageMeters(usage);
    meters.forEach((meter) => target.appendChild(renderMeter(app, meter, meter.label || meter.key || app.t('tokens'))));
    if (!meters.length) target.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('notAvailable')));
  }

  function localDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  // kra.name keeps daily totals and answers any range up to a year through from and to.
  function statsQuery(app, now = new Date()) {
    if (app.statsPeriod === '90d') {
      const from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 89);
      return { from: localDate(from), to: localDate(now) };
    }
    if (app.statsPeriod !== 'custom') return { period: app.statsPeriod };
    const { statsFrom: from, statsTo: to } = app;
    return from && to && from <= to ? { from, to } : null;
  }

  function renderStatsRange(app) {
    const range = makeNode(app.doc, 'div', 'aiwc-stats-range');
    range.dataset.statsRange = '1';
    range.hidden = app.statsPeriod !== 'custom';
    const today = localDate(new Date());
    [['from', 'periodFrom', app.statsFrom], ['to', 'periodTo', app.statsTo]].forEach(([name, label, value]) => {
      const input = app.doc.createElement('input');
      input.type = 'date';
      input.max = today;
      input.value = value;
      input.dataset.statsDate = name;
      range.appendChild(wrapLabel(app.doc, app.t(label), input));
    });
    range.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('periodUpToYear')));
    return range;
  }

  function syncStatsRange(app) {
    const range = app.root.querySelector('[data-stats-range]');
    if (range) range.hidden = app.statsPeriod !== 'custom';
  }

  async function loadStats(app) {
    if (app.selectedTab !== 'usage') return;
    const result = app.root.querySelector('[data-stats-result]');
    if (!shouldFetchStats(app.hostState)) {
      if (result) {
        const message = app.hostState && app.hostState.key_only ? 'usageNeedsLinkedChat' : 'usageNeedsChat';
        result.replaceChildren(makeNode(app.doc, 'p', 'aiwc-muted', app.t(message)));
      }
      return;
    }
    try {
      const query = statsQuery(app);
      if (!query) return; // a range waits for both dates; the earlier one may be typed second
      const request = app.statsRequest = (app.statsRequest || 0) + 1;
      const body = await proxy(app, 'GET', 'plugin/stats', { chat_id: app.chatId, lang: app.locale, ...query });
      if (request !== app.statsRequest) return;
      app.statsBody = body;
      if (result) renderStatsTable(app, result, body);
      const meterList = app.root.querySelector('[data-usage-meters]');
      if (meterList) renderUsageMeters(app, meterList, usageMeters(body).length ? body : currentUsage(app));
    } catch (error) { showFailure(app, error, result); }
  }

  function renderStatsTable(app, target, body) {
    target.replaceChildren();
    const chats = Array.isArray(body.chats) ? body.chats : [];
    const totals = { sessions: 0, messages_in: 0, answers: 0, leads: 0, rated_high: 0, rated_low: 0, voice: 0 };
    chats.forEach((chat) => {
      const row = chat.totals || {};
      totals.sessions += Number(row.sessions || row.dialogs || 0);
      totals.messages_in += Number(row.messages_in || 0);
      totals.answers += Number(row.answers || row.messages_out || 0);
      totals.leads += Number(row.leads || 0);
      totals.rated_high += Number(row.rated_high || 0);
      totals.rated_low += Number(row.rated_low || 0);
      totals.voice += Number(row.voice || 0);
    });
    const cards = makeNode(app.doc, 'div', 'aiwc-stats-cards');
    [['sessions', totals.sessions], ['messagesIn', totals.messages_in], ['answers', totals.answers], ['leadsCount', totals.leads], ['ratedHigh', totals.rated_high], ['ratedLow', totals.rated_low]].forEach(([label, value]) => {
      const item = makeNode(app.doc, 'div', 'aiwc-stat');
      item.appendChild(makeNode(app.doc, 'strong', '', Number(value).toLocaleString(app.locale)));
      item.appendChild(makeNode(app.doc, 'span', 'aiwc-muted', app.t(label)));
      cards.appendChild(item);
    });
    if (totals.voice) {
      const item = makeNode(app.doc, 'div', 'aiwc-stat');
      item.appendChild(makeNode(app.doc, 'strong', '', Number(totals.voice).toLocaleString(app.locale)));
      item.appendChild(makeNode(app.doc, 'span', 'aiwc-muted', app.t('voice')));
      cards.appendChild(item);
    }
    target.appendChild(cards);
    if (!chats.length) {
      target.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('noDialogs')));
      return;
    }
    const byDay = new Map();
    chats.forEach((chat) => {
      (Array.isArray(chat.daily) ? chat.daily : []).forEach((source) => {
        const date = String(source && (source.date || source.day) || '').slice(0, 10);
        if (!date) return;
        const row = byDay.get(date) || { date, sessions: 0, messages_in: 0, answers: 0, leads: 0, rated_high: 0, rated_low: 0 };
        row.sessions += Number(source.sessions || source.dialogs || 0);
        row.messages_in += Number(source.messages_in || 0);
        row.answers += Number(source.answers || source.messages_out || 0);
        row.leads += Number(source.leads || 0);
        row.rated_high += Number(source.rated_high || 0);
        row.rated_low += Number(source.rated_low || 0);
        byDay.set(date, row);
      });
    });
    const days = [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date));
    if (!days.length || !days.some((day) => day.sessions || day.messages_in || day.leads)) {
      target.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('noDialogs')));
      return;
    }
    target.appendChild(makeNode(app.doc, 'h3', 'aiwc-subsection-title', app.t('byDay')));
    target.appendChild(renderStatsChart(app, days));
    const dailyWrap = makeNode(app.doc, 'div', 'aiwc-table-wrap');
    const daily = makeNode(app.doc, 'table');
    const dailyHead = makeNode(app.doc, 'thead');
    const dailyHeader = makeNode(app.doc, 'tr');
    [app.t('day'), app.t('sessions'), app.t('messagesIn'), app.t('answers'), app.t('leadsCount'), app.t('ratedHigh'), app.t('ratedLow')].forEach((label) => dailyHeader.appendChild(makeNode(app.doc, 'th', '', label)));
    dailyHead.appendChild(dailyHeader);
    daily.appendChild(dailyHead);
    const dailyBody = makeNode(app.doc, 'tbody');
    days.slice().reverse().forEach((day) => {
      const row = makeNode(app.doc, 'tr');
      [day.date, day.sessions, day.messages_in, day.answers, day.leads, day.rated_high, day.rated_low].forEach((value) => row.appendChild(makeNode(app.doc, 'td', '', value)));
      dailyBody.appendChild(row);
    });
    daily.appendChild(dailyBody);
    dailyWrap.appendChild(daily);
    target.appendChild(dailyWrap);
    const tableWrap = makeNode(app.doc, 'div', 'aiwc-table-wrap');
    const table = makeNode(app.doc, 'table');
    const head = makeNode(app.doc, 'thead');
    const headerRow = makeNode(app.doc, 'tr');
    [app.t('site'), app.t('sessions'), app.t('messagesIn'), app.t('answers'), app.t('leadsCount')].forEach((label) => headerRow.appendChild(makeNode(app.doc, 'th', '', label)));
    head.appendChild(headerRow);
    table.appendChild(head);
    const bodyNode = makeNode(app.doc, 'tbody');
    chats.forEach((chat) => {
      const row = chat.totals || {};
      const tr = makeNode(app.doc, 'tr');
      [chat.name || `#${chat.id}`, row.sessions || row.dialogs || 0, row.messages_in || 0, row.answers || row.messages_out || 0, row.leads || 0].forEach((value) => tr.appendChild(makeNode(app.doc, 'td', '', value)));
      bodyNode.appendChild(tr);
    });
    table.appendChild(bodyNode);
    tableWrap.appendChild(table);
    target.appendChild(tableWrap);
  }

  function renderStatsChart(app, days) {
    const svg = app.doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const width = 600, height = 160, pad = 20, slots = Math.max(1, days.length);
    const max = Math.max(1, ...days.map((day) => Math.max(day.sessions, day.leads)));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('class', 'aiwc-stats-chart');
    svg.setAttribute('role', 'img');
    const slot = (width - pad) / slots;
    const barWidth = Math.max(2, slot * 0.38);
    days.forEach((day, index) => {
      [['sessions', day.sessions, '#4f46e5', 0], ['leadsCount', day.leads, '#00a32a', 1]].forEach(([key, value, color, offset]) => {
        const barHeight = (height - pad) * value / max;
        const rect = app.doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(pad + index * slot + offset * barWidth));
        rect.setAttribute('y', String(height - pad - barHeight));
        rect.setAttribute('width', String(barWidth - 1));
        rect.setAttribute('height', String(barHeight));
        rect.setAttribute('fill', color);
        const title = app.doc.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${day.date} — ${app.t(key)}: ${value}`;
        rect.appendChild(title);
        svg.appendChild(rect);
      });
      if (slots <= 10 || index % Math.ceil(slots / 8) === 0) {
        const label = app.doc.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', String(pad + index * slot));
        label.setAttribute('y', String(height - 4));
        label.setAttribute('font-size', '10');
        label.textContent = day.date.slice(5);
        svg.appendChild(label);
      }
    });
    const wrap = makeNode(app.doc, 'div', 'aiwc-stats-chart-wrap');
    wrap.appendChild(svg);
    return wrap;
  }

  function normalizeChatResponse(body) {
    const source = body && body.chat && typeof body.chat === 'object' ? body.chat : (body || {});
    const chat = clone(source);
    if (Array.isArray(chat.languages)) chat.languages = chat.languages.slice(0, CHAT_LANGUAGES_MAX).map(String);
    chat.texts = normalizeChatTexts(chat.texts);
    chat.leads_delivery = clone((body && body.leads_delivery) || source.leads_delivery || {});
    return chat;
  }

  function renderSettings(app, panel) {
    const chat = app.formDraft || app.formOriginal || {};
    const body = app.data.chat || {};
    const limits = boundChatLimits(body.limits);
    const langs = Array.isArray(chat.languages) && chat.languages.length ? chat.languages.slice(0, CHAT_LANGUAGES_MAX).map(String) : [app.locale];
    if (!langs.includes(app.currentTextLang)) app.currentTextLang = langs[0];
    const grid = makeNode(app.doc, 'div', 'aiwc-grid');
    const main = makeNode(app.doc, 'div', 'aiwc-main');
    const connect = makeNode(app.doc, 'section', 'aiwc-card aiwc-step-card');
    connect.dataset.aiwcBlock = 'me';
    connect.appendChild(makeStepTitle(app, 1, 'connectYourChat'));
    renderConnectionStep(app, connect);
    main.appendChild(connect);

    const details = makeNode(app.doc, 'section', 'aiwc-more-options');
    details.dataset.aiwcBlock = 'assistant';
    const keyOnly = !!(app.hostState && app.hostState.key_only);
    const connectedNoChat = !!(app.hostState && app.hostState.connected) && !app.chatId && !keyOnly;
    const wizard = app.data.me && app.data.me.wizard || {};
    const wizardAvailable = wizard.available !== false;
    details.open = app.detailsOpen === undefined ? connectedNoChat && wizardAvailable : !!app.detailsOpen;
    app.detailsOpen = details.open;
    const setupHead = makeNode(app.doc, 'div', 'aiwc-setup-head');
    const setupTabs = makeNode(app.doc, 'nav', 'aiwc-setup-tabs');
    setupTabs.setAttribute('role', 'tablist');
    setupTabs.setAttribute('aria-label', app.t('wizardMcpTelegram'));
    const setupItems = [
      ['wizard', app.t('setupTabs.wizard')], ['mcp', app.t('setupTabs.mcp')], ['telegram', app.t('setupTabs.telegram')]
    ];
    setupItems.forEach(([name, label]) => {
      const tab = makeNode(app.doc, 'button', 'aiwc-tab', label);
      tab.type = 'button';
      tab.dataset.setupTab = name;
      tab.id = `${app.setupId}-tab-${name}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `${app.setupId}-panel-${name}`);
      tab.setAttribute('aria-selected', app.setupTab === name ? 'true' : 'false');
      tab.tabIndex = app.setupTab === name ? 0 : -1;
      setupTabs.appendChild(tab);
    });
    setupHead.appendChild(setupTabs);
    const toggle = actionButton(app.doc, app.t(details.open ? 'setupTabs.collapse' : 'setupTabs.expand'), 'setup-toggle', 'aiwc-btn-link');
    toggle.dataset.setupToggle = '1';
    toggle.setAttribute('aria-controls', `${app.setupId}-content`);
    toggle.setAttribute('aria-expanded', details.open ? 'true' : 'false');
    setupHead.appendChild(toggle);
    details.appendChild(setupHead);
    const setupContent = makeNode(app.doc, 'div', 'aiwc-setup-content');
    setupContent.id = `${app.setupId}-content`;
    setupContent.dataset.setupContent = '1';
    setupContent.hidden = !details.open;
    const wizardPanel = makeSetupPanel(app, 'wizard');
    const mcpPanel = makeSetupPanel(app, 'mcp');
    const telegramPanel = makeSetupPanel(app, 'telegram');
    if (app.chatId) {
      renderSetup(app, wizardPanel);
      renderChannels(app, wizardPanel);
    } else if (keyOnly) {
      wizardPanel.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('keyOnlyState')));
    } else if (connectedNoChat && wizardAvailable) {
      renderSetup(app, wizardPanel);
    } else if (connectedNoChat) {
      wizardPanel.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', typeof wizard.blocked === 'string' && wizard.blocked ? wizard.blocked : app.t('wizardUnavailable')));
    } else {
      wizardPanel.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('connectForWizard')));
    }
    renderMcpTelegramHelp(app, mcpPanel, telegramPanel);
    [wizardPanel, mcpPanel, telegramPanel].forEach((tabPanel) => {
      tabPanel.hidden = tabPanel.dataset.setupPanel !== app.setupTab;
      setupContent.appendChild(tabPanel);
    });
    details.appendChild(setupContent);
    main.appendChild(details);
    const appearance = makeNode(app.doc, 'section', 'aiwc-card aiwc-step-card');
    appearance.appendChild(makeStepTitle(app, 2, 'look'));
    renderLocalAppearanceSettings(app, appearance);
    main.appendChild(appearance);

    const pages = makeNode(app.doc, 'section', 'aiwc-card aiwc-step-card');
    pages.appendChild(makeStepTitle(app, 3, 'whereToShow'));
    renderPageSettings(app, pages);
    main.appendChild(pages);

    const features = makeNode(app.doc, 'section', 'aiwc-card aiwc-step-card');
    features.appendChild(makeStepTitle(app, 4, 'features'));
    renderFeatureSettings(app, features, chat);
    main.appendChild(features);

    const card = makeNode(app.doc, 'section', 'aiwc-card aiwc-chat-options aiwc-step-card');
    card.dataset.aiwcBlock = 'chat';
    card.appendChild(makeStepTitle(app, 5, 'consultantAndChatTexts'));
    if (app.chatId) {
    const identity = makeRow(app, card, app.t('consultant'));
    // consultants have their own cap (review of d5d9ec70: the 20-language cap hid consultants past the 20th); the assigned one
    // always stays in the list
    const allPersonas = Array.isArray(body.personas) ? body.personas : [];
    const personas = allPersonas.slice(0, CHAT_PERSONAS_MAX);
    const assigned = allPersonas.find((persona) => String(persona.id) === String(chat.persona_id || ''));
    if (assigned && !personas.includes(assigned)) personas.push(assigned);
    if (personas.length > 1) {
      const select = app.doc.createElement('select');
      select.dataset.field = 'persona_id';
      personas.forEach((persona) => appendOption(app.doc, select, persona.id, persona.name || String(persona.id)));
      select.value = String(chat.persona_id || '');
      identity.appendChild(wrapLabel(app.doc, app.t('consultant'), select));
    } else if (personas.length === 1) {
      const hidden = app.doc.createElement('input');
      hidden.type = 'hidden'; hidden.dataset.field = 'persona_id'; hidden.value = String(chat.persona_id || personas[0].id || '');
      identity.appendChild(hidden);
      identity.appendChild(makeNode(app.doc, 'p', '', personas[0].name || ''));
    }

    const textRow = makeRow(app, card, app.t('textsByLanguage'));
    const controls = makeNode(app.doc, 'div', 'aiwc-fields');
    const tabList = makeNode(app.doc, 'div', 'aiwc-language-tabs');
    tabList.setAttribute('role', 'tablist');
    langs.forEach((lang) => {
      const tab = makeNode(app.doc, 'button', 'aiwc-chip', languageName(app, lang));
      tab.type = 'button';
      tab.dataset.languageTab = lang;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', app.currentTextLang === lang ? 'true' : 'false');
      tabList.appendChild(tab);
    });
    controls.appendChild(tabList);
    const translateLine = makeNode(app.doc, 'div', 'aiwc-inline');
    translateLine.appendChild(makeNode(app.doc, 'span', 'aiwc-muted', app.t('sourceLanguage')));
    const sourceLang = app.doc.createElement('select'); sourceLang.dataset.translateSource = '1';
    langs.forEach((lang) => appendOption(app.doc, sourceLang, lang, languageName(app, lang)));
    sourceLang.value = langs.includes(chat.default_lang) ? chat.default_lang : langs[0];
    translateLine.appendChild(sourceLang);
    translateLine.appendChild(actionButton(app.doc, app.t('translate'), 'translate', 'aiwc-btn-small'));
    if (langs.length < 2) translateLine.hidden = true;
    controls.appendChild(translateLine);
    const textValues = chat.texts && chat.texts[app.currentTextLang] || {};
    const textPanel = makeNode(app.doc, 'div', 'aiwc-fields');
    textPanel.dataset.textPanel = app.currentTextLang;
    addTextField(app, textPanel, 'greeting', textValues.greeting || '', '', 'textarea');
    textPanel.appendChild(makeNode(app.doc, 'div', 'aiwc-label', app.t('quickQuestions')));
    textPanel.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('quickQuestionsHelp')));
    const suggestions = Array.isArray(textValues.suggestions) ? textValues.suggestions.slice(0, SUGGESTIONS_MAX) : [];
    const maxSuggestions = limits.suggestions_max;
    for (let index = 0; index < maxSuggestions; index++) {
      const input = app.doc.createElement('input');
      input.type = 'text';
      input.value = suggestions[index] || '';
      input.dataset.suggestion = app.currentTextLang;
      input.dataset.index = String(index);
      input.setAttribute('aria-label', app.t('quickQuestion').replace(':count', String(index + 1)));
      textPanel.appendChild(input);
    }
    appendFieldError(app, textPanel, `texts.${app.currentTextLang}.suggestions`);
    addTextField(app, textPanel, 'name', textValues.name || '', textValues.name_fallback || app.t('nameFallback'));
    addTextField(app, textPanel, 'title', textValues.title || '', textValues.title_fallback || app.t('titleFallback'));
    addTextField(app, textPanel, 'tab_label', textValues.tab_label || '', textValues.name_fallback || app.t('nameFallback'));
    textPanel.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('fallbackHelp')));
    controls.appendChild(textPanel);
    if (langs.length > 1) {
      const defaultLang = app.doc.createElement('select');
      defaultLang.dataset.field = 'default_lang';
      langs.forEach((lang) => appendOption(app.doc, defaultLang, lang, languageName(app, lang)));
      defaultLang.value = chat.default_lang || langs[0];
      controls.appendChild(wrapLabel(app.doc, app.t('defaultLanguage'), defaultLang));
    }
    textRow.appendChild(controls);

    renderKnowledgeSettings(app, card, body, chat);
    renderLeadsSettings(app, card, body, chat);
    } else {
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t(app.hostState && app.hostState.connected ? 'chatSettingsNeedChat' : 'connectForChatSettings')));
    }
    main.appendChild(card);
    grid.appendChild(main);

    const side = makeNode(app.doc, 'aside', 'aiwc-side');
    renderWidgetVisibility(app, side);
    const saveCard = makeNode(app.doc, 'section', 'aiwc-card aiwc-save-card');
    saveCard.appendChild(makeNode(app.doc, 'h2', '', app.t('saveSettings')));
    saveCard.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('previewNote')));
    const status = makeNode(app.doc, 'span', 'aiwc-status', '');
    status.dataset.settingsStatus = '1';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    saveCard.appendChild(status);
    const reload = actionButton(app.doc, app.t('reload'), 'settings-reload', 'aiwc-btn-small');
    reload.hidden = !app.fieldErrors.stale;
    saveCard.appendChild(reload);
    saveCard.appendChild(actionButton(app.doc, app.t('save'), 'settings-save', 'aiwc-btn-primary'));
    side.appendChild(saveCard);

    const usageCard = makeNode(app.doc, 'section', 'aiwc-card aiwc-usage-summary');
    usageCard.appendChild(makeNode(app.doc, 'h2', '', app.t('usageAndLimits')));
    renderUsageSummary(app, usageCard);
    side.appendChild(usageCard);

    const previewCard = makeNode(app.doc, 'section', 'aiwc-card');
    previewCard.appendChild(makeNode(app.doc, 'h2', '', app.t('preview')));
    previewCard.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('previewDescription')));
    const mount = makeNode(app.doc, 'div', 'aiwc-preview-mount');
    mount.dataset.previewMount = '1';
    previewCard.appendChild(mount);
    const previewError = makeNode(app.doc, 'p', 'aiwc-notice aiwc-notice-error', app.t('previewUnavailable'));
    previewError.dataset.previewError = '1';
    previewError.hidden = true;
    previewCard.appendChild(previewError);
    const open = actionButton(app.doc, app.t(app.previewOpen ? 'closeChatWindow' : 'openChatWindow'), 'preview-toggle', 'aiwc-btn');
    open.classList.add('aiwc-preview-open');
    open.setAttribute('aria-expanded', app.previewOpen ? 'true' : 'false');
    open.dataset.previewWindowToggle = '1';
    previewCard.appendChild(open);
    side.appendChild(previewCard);
    grid.appendChild(side);
    panel.appendChild(grid);
    refreshConditionalFields(app);
    schedulePreview(app, true);
  }

  function makeStepTitle(app, number, key) {
    const heading = makeNode(app.doc, 'h2', 'aiwc-step-title');
    heading.appendChild(makeNode(app.doc, 'span', 'aiwc-num', number));
    heading.appendChild(app.doc.createTextNode(app.t(key)));
    return heading;
  }

  function renderConnectionStep(app, card) {
    const host = app.hostState || {};
    const widget = host.widget || {};
    const connected = !!host.connected && !app.connectionExpired;
    const chats = Array.isArray(app.data.me && app.data.me.chats) ? app.data.me.chats : [];
    const linked = chats.find((item) => String(item && item.id || '') === String(app.chatId || '')) || null;
    const chat = app.data.chat && (app.data.chat.chat || app.data.chat) || {};
    const persona = (app.data.chat && app.data.chat.personas || []).find((item) => String(item.id) === String(chat.persona_id)) || {};
    const linkedPersona = linked && linked.persona && typeof linked.persona === 'object' ? linked.persona : {};
    const account = app.data.me && app.data.me.account || host.account || {};
    const accountName = String(account.email_masked || account.name || '');
    const linkedMode = connected && !!app.chatId && !!widget.key;
    renderConnectionNotice(app, card);
    if (app.addingChat) { renderAddingChat(app, card, connected); return; }
    renderConnectionChecklist(app, card);
    if (connected) renderAccountLine(app, card, accountName, String(account.plan_name || ''));
    if (connected && app.data.me && app.data.me.status !== 'not_connected') {
      renderChatPickerState(app, card, chats, linkedMode, linked, linkedPersona, persona, chat, widget);
    }
    if (connected) card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted aiwc-disconnect-help', app.t('disconnectHelp')));
    renderLocalChatControls(app, card);

    if (host.key_only || (widget.key && Number(host.chat_id || 0) < 1)) {
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-notice aiwc-notice-warning aiwc-key-only', app.t('keyOnlyState')));
      renderManualKey(app, card, widget.key || '');
    }

    if (!connected) renderConnectionMethods(app, card, widget.key || '');
    if (widget.key_check && widget.key_check.name && !linkedMode) {
      card.appendChild(makeNode(app.doc, 'h3', 'aiwc-linked-chat', app.t('siteChatConsultant').replace(':name', String(widget.key_check.name))));
    }
    if (app.lastError) card.appendChild(makeNode(app.doc, 'p', 'aiwc-notice aiwc-notice-error', app.lastError));
  }

  function renderConnectionNotice(app, parent) {
    const code = app.connectionNotice;
    if (!code) return;
    const tone = code === 'connected' || code === 'linked' ? 'success' : code === 'link_unsupported' ? 'warning' : 'error';
    const text = app.connectionNoticeText || app.t(`connectionNotices.${code}`).replace(':name', app.connectionNoticeName || '');
    const notice = makeNode(app.doc, 'p', `aiwc-notice aiwc-notice-${tone} aiwc-connection-notice`, text);
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    parent.appendChild(notice);
  }

  function renderConnectionChecklist(app, parent) {
    const lead = makeNode(app.doc, 'p', 'aiwc-connect-lead');
    appendLinkToken(app, lead, app.t('connectLead'), ':panel', app.t('panelLeadLinkLabel'));
    parent.appendChild(lead);
    const widget = app.hostState && app.hostState.widget || {};
    const connected = !!(app.hostState && app.hostState.connected && !app.connectionExpired);
    const linkedMode = connected && !!app.chatId && !!widget.key;
    const domain = String(app.hostState && app.hostState.site && app.hostState.site.host || '');
    const bareDomain = domain.replace(/^www\./i, '');
    const wildcard = bareDomain ? `*.${bareDomain}` : '';
    const linkedChat = linkedMode && Array.isArray(app.data.me && app.data.me.chats)
      ? app.data.me.chats.find((chat) => String(chat && chat.id || '') === String(app.chatId)) : null;
    const platformChat = !!linkedChat && linkedChat.owner === 'platform';
    const steps = connectionSteps(app.hostState, app.data);
    const text = [
      app.t('stepCreateChat'),
      app.t('stepChooseConsultant'),
      app.t(linkedMode ? (platformChat ? (steps[2] === true ? 'stepAllowedSitesPlatformLinked' : 'stepAllowedSitesPlatform') : 'stepAllowedSitesLinked') : connected ? 'stepAllowedSitesAuto' : 'stepAllowedSitesManual'),
      app.t(linkedMode ? 'stepPublicKeyLinked' : connected ? 'stepPublicKeyAuto' : 'stepPublicKeyManual')
    ];
    const panelHref = safePanelUrl(app.config.panelBase, app.config.panelBase) || 'https://kra.name/app/panel';
    const allDone = steps.every((value) => value === true);
    const list = makeNode(app.doc, 'ol', 'aiwc-checklist');
    text.forEach((value, index) => {
      const row = makeNode(app.doc, 'li', steps[index] === true ? 'is-done' : steps[index] === false ? 'is-missing' : '');
      if (index === 0) appendLinkToken(app, row, value, ':panel', app.t('panelLinkLabel'), panelHref);
      else row.textContent = value.replace(':domain', domain).replace(':wildcard', wildcard);
      list.appendChild(row);
    });
    if (allDone) {
      const details = makeNode(app.doc, 'details', 'aiwc-steps-done');
      details.appendChild(makeNode(app.doc, 'summary', '', app.t('everythingConnected')));
      details.appendChild(list);
      parent.appendChild(details);
    } else parent.appendChild(list);
  }

  function appendLinkToken(app, parent, text, token, label, href) {
    const value = String(text || '');
    const position = value.indexOf(token);
    const linkHref = href || (safePanelUrl(app.config.panelBase, app.config.panelBase) || 'https://kra.name/app/panel');
    if (position < 0) { parent.textContent = value; return; }
    if (position > 0) parent.appendChild(app.doc.createTextNode(value.slice(0, position)));
    parent.appendChild(externalLink(app.doc, linkHref, label));
    parent.appendChild(app.doc.createTextNode(value.slice(position + token.length)));
  }

  function renderConnectionMethods(app, parent, key) {
    const methods = makeNode(app.doc, 'div', 'aiwc-connect-methods');
    const automatic = makeNode(app.doc, 'section', 'aiwc-connect-method');
    automatic.appendChild(makeNode(app.doc, 'h3', '', app.t('connectAutomatically')));
    automatic.appendChild(actionButton(app.doc, app.t('chooseChatAutomatically'), 'connect', 'aiwc-btn-primary'));
    automatic.appendChild(makeNode(app.doc, 'p', '', app.t('chooseChatAutomaticallyHelp')));
    const manual = makeNode(app.doc, 'section', 'aiwc-connect-method');
    renderManualKey(app, manual, key);
    methods.appendChild(automatic);
    methods.appendChild(manual);
    parent.appendChild(methods);
  }

  function renderAccountLine(app, parent, accountName, planName) {
    const line = makeNode(app.doc, 'div', 'aiwc-connection-line');
    line.appendChild(makeNode(app.doc, 'span', 'aiwc-badge aiwc-badge-good', app.t('aiWorkerConnected')));
    const meta = [accountName, planName].filter(Boolean).join(' · ');
    if (meta) line.appendChild(makeNode(app.doc, 'span', 'aiwc-muted', meta));
    line.appendChild(actionButton(app.doc, app.t('disconnectAIWorker'), 'disconnect', 'aiwc-btn-small aiwc-btn-danger'));
    parent.appendChild(line);
  }

  function renderWidgetVisibility(app, parent) {
    const widget = app.hostState && app.hostState.widget || {};
    const card = makeNode(app.doc, 'section', 'aiwc-card aiwc-widget-card');
    card.dataset.widgetCard = '1';
    const header = makeNode(app.doc, 'div', 'aiwc-widget-card-head');
    header.appendChild(makeNode(app.doc, 'h2', '', app.t('widgetOnSiteTitle')));
    const state = makeNode(app.doc, 'span', 'aiwc-badge', '');
    state.dataset.widgetState = '1';
    header.appendChild(state);
    card.appendChild(header);
    const label = makeNode(app.doc, 'label', 'aiwc-toggle aiwc-widget-toggle');
    const toggle = app.doc.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = !!widget.enabled;
    toggle.disabled = !app.chatId || !widget.key;
    toggle.dataset.widgetEnabled = '1';
    label.appendChild(toggle);
    label.appendChild(makeNode(app.doc, 'span', 'aiwc-toggle-ui', ''));
    const text = makeNode(app.doc, 'span');
    text.appendChild(makeNode(app.doc, 'strong', '', app.t('widgetOnSite')));
    label.appendChild(text);
    card.appendChild(label);
    const help = makeNode(app.doc, 'p', 'aiwc-help', '');
    help.dataset.widgetHelp = '1';
    card.appendChild(help);
    const notice = makeNode(app.doc, 'div', 'aiwc-notice aiwc-notice-success aiwc-inline-notice', '');
    notice.dataset.widgetStatus = '1';
    notice.hidden = true;
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    card.appendChild(notice);
    parent.appendChild(card);
    updateWidgetVisibilityCard(app, toggle);
  }

  function updateWidgetVisibilityCard(app, input) {
    const card = input.closest('[data-widget-card]');
    if (!card) return;
    const widget = app.hostState && app.hostState.widget || {};
    const linked = !!app.chatId && !!widget.key;
    const visible = linked && !!input.checked;
    card.classList.toggle('aiwc-widget-card-hidden', !visible);
    card.dataset.widgetVisible = visible ? '1' : '0';
    const state = card.querySelector('[data-widget-state]');
    if (state) {
      state.textContent = app.t(visible ? 'widgetShownToVisitors' : 'widgetHidden');
      state.className = `aiwc-badge ${visible ? 'aiwc-badge-good' : 'aiwc-widget-state-hidden'}`;
    }
    const help = card.querySelector('[data-widget-help]');
    if (help) help.textContent = app.t(linked ? (visible ? 'widgetOnSiteHelp' : 'widgetHiddenHelp') : 'widgetNeedsChat');
  }

  function renderManualKey(app, parent, current) {
    const box = makeNode(app.doc, 'div', 'aiwc-manual-key');
    box.appendChild(wrapLabel(app.doc, app.t('publicChatKey'), (() => {
      const input = app.doc.createElement('input');
      input.type = 'text'; input.value = String(current || ''); input.autocomplete = 'off'; input.spellcheck = false;
      input.pattern = 'wk_[A-Za-z0-9]{24}'; input.placeholder = 'wk_…'; input.dataset.widgetKey = '1';
      return input;
    })()));
    box.appendChild(actionButton(app.doc, app.t('saveAndCheck'), 'manual-key-save', 'aiwc-btn-small'));
    box.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('publicKeyHelp')));
    parent.appendChild(box);
  }

  function renderLocalChatControls(app, parent) {
    const chats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
    const controls = makeNode(app.doc, 'div', 'aiwc-local-chat-controls');
    controls.appendChild(actionButton(app.doc, app.t('addChat'), 'chat-add', 'aiwc-btn-small'));
    if (app.localChatId && chats.some((chat) => String(chat.id) === app.localChatId)) {
      const remove = actionButton(app.doc, app.t('removeChat'), 'chat-remove', 'aiwc-btn-small aiwc-btn-danger');
      controls.appendChild(remove);
    }
    parent.appendChild(controls);
  }

  // A new chat exists only on the page: the server stores it once a chat is chosen or its key is saved.
  function renderAddingChat(app, card, connected) {
    const chats = Array.isArray(app.data.me && app.data.me.chats) ? app.data.me.chats : [];
    const localChats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
    const free = chats.filter((chat) => !localChats.some((local) => Number(local.chat_id || 0) === Number(chat.id || 0)));
    card.appendChild(makeNode(app.doc, 'h3', 'aiwc-linked-chat', app.t('newChat')));
    if (connected && free.length) renderChatChoices(app, card, false, free);
    else if (connected && chats.length) {
      const all = makeNode(app.doc, 'p', 'aiwc-no-chats-offer');
      appendLinkToken(app, all, app.t('allChatsOnSite'), ':panel', app.t('panelLinkLabel'), safePanelUrl(app.config.panelBase, app.config.panelBase) || 'https://kra.name/app/panel');
      card.appendChild(all);
    }
    if (connected && app.data.me) renderCreateChatAction(app, card);
    renderManualKey(app, card, '');
    const controls = makeNode(app.doc, 'div', 'aiwc-local-chat-controls');
    controls.appendChild(actionButton(app.doc, app.t('cancel'), 'chat-add-cancel', 'aiwc-btn-small'));
    card.appendChild(controls);
  }

  function renderAccountChats(app, parent, chats) {
    const slots = app.data.me && app.data.me.chat_slots && typeof app.data.me.chat_slots === 'object' ? app.data.me.chat_slots : {};
    const localChats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
    const unavailable = slots.can_create === false;
    const panel = safePanelUrl(app.config.panelBase, app.config.panelBase);
    const createHref = panel ? safePanelUrl(`${panel.replace(/\/$/, '')}/chat?new=1`, app.config.panelBase) : '';
    const buyHref = safePanelUrl(slots.buy_url, app.config.panelBase)
      || (unavailable && panel ? safePanelUrl(`${panel.replace(/\/$/, '')}/billing?add_chat=1`, app.config.panelBase) : '');
    const checkedChatId = chats.some((chat) => String(chat.id || '') === String(app.chatId || ''))
      ? String(app.chatId || '')
      : (chats.length === 1 ? String(chats[0].id || '') : (chats.length === 0 ? 'new' : ''));
    const picker = makeNode(app.doc, 'div', 'aiwc-chat-picker');
    picker.dataset.currentChatId = String(app.chatId || '');
    picker.appendChild(makeNode(app.doc, 'h3', 'aiwc-linked-chat', app.t('chooseChat')));
    const list = makeNode(app.doc, 'div', 'aiwc-account-chat-list');
    list.setAttribute('role', 'radiogroup');
    list.setAttribute('aria-label', app.t('chooseChat'));
    chats.forEach((chat) => {
      const id = String(chat.id || '');
      const name = String(chat.chat_name || chat.name || `#${id}`);
      const row = makeNode(app.doc, 'label', 'aiwc-account-chat');
      if (id && id === String(app.chatId || '')) row.classList.add('is-connected');
      const otherTab = localChats.find((local) => Number(local.chat_id || 0) === Number(id || 0)
        && String(local.id || '') !== String(app.localChatId || ''));
      const select = app.doc.createElement('input');
      select.type = 'radio'; select.name = 'chat_id'; select.value = id;
      select.checked = id === checkedChatId;
      select.setAttribute('aria-label', name);
      row.appendChild(select);
      const details = makeNode(app.doc, 'div', 'aiwc-account-chat-details');
      const title = makeNode(app.doc, 'div', 'aiwc-account-chat-title');
      title.appendChild(makeNode(app.doc, 'strong', '', name));
      if (id === String(app.chatId || '')) title.appendChild(makeNode(app.doc, 'span', 'aiwc-badge aiwc-badge-good', app.t('connectedToSite')));
      if (otherTab) {
        const otherName = String(otherTab.name || otherTab.chat_name || otherTab.id || '');
        title.appendChild(makeNode(app.doc, 'span', 'aiwc-badge', app.t('chatConnectedOtherTab').replace(':name', otherName)));
      }
      title.appendChild(makeNode(app.doc, 'span', `aiwc-badge ${chat.enabled ? 'aiwc-badge-good' : ''}`, app.t(chat.enabled ? 'chatEnabled' : 'chatDisabled')));
      title.appendChild(makeNode(app.doc, 'span', 'aiwc-badge aiwc-owner-badge', app.t(chat.owner === 'platform' ? 'chatOwnerPlatform' : 'chatOwnerAccount')));
      details.appendChild(title);
      const personaName = String(chat.persona && chat.persona.name || '');
      details.appendChild(makeNode(app.doc, 'p', 'aiwc-account-chat-meta', `${app.t('consultant')}: ${personaName || app.t('notSpecified')}`));
      const domains = Array.isArray(chat.site_domains) ? chat.site_domains.filter((domain) => typeof domain === 'string' && domain !== '') : [];
      details.appendChild(makeNode(app.doc, 'p', 'aiwc-account-chat-meta', `${app.t('sites')}: ${domains.length ? domains.join(', ') : app.t('notSpecified')}`));
      row.appendChild(details);
      list.appendChild(row);
    });

    const createRow = makeNode(app.doc, 'label', 'aiwc-account-chat aiwc-create-chat-option');
    const createRadio = app.doc.createElement('input');
    createRadio.type = 'radio'; createRadio.name = 'chat_id'; createRadio.value = 'new';
    createRadio.checked = checkedChatId === 'new';
    createRadio.setAttribute('aria-label', app.t('createNewChat'));
    createRow.appendChild(createRadio);
    const createDetails = makeNode(app.doc, 'div', 'aiwc-account-chat-details');
    const createTitle = makeNode(app.doc, 'div', 'aiwc-account-chat-title');
    createTitle.appendChild(makeNode(app.doc, 'strong', '', app.t('createNewChat')));
    createDetails.appendChild(createTitle);
    const noFreeSlot = slots.needs_extra_chat === true || slots.available === 0;
    if (unavailable || noFreeSlot) {
      const fallbackReason = noFreeSlot ? app.t('chatSlotsFull') : '';
      const reason = typeof slots.reason === 'string' && slots.reason ? slots.reason : fallbackReason;
      if (reason) createDetails.appendChild(makeNode(app.doc, 'p', `aiwc-account-chat-meta ${unavailable ? 'aiwc-chat-create-error' : 'aiwc-chat-create-note'}`, reason));
      const price = slots.extra_chat_price_usd;
      const hasPrice = typeof price === 'number' && Number.isFinite(price);
      const priceText = hasPrice ? price.toLocaleString(app.locale || 'en', { maximumFractionDigits: 2 }) : '';
      createDetails.appendChild(makeNode(app.doc, 'p', 'aiwc-account-chat-meta', hasPrice
        ? app.t('chatExtraPrice').replace(':price', priceText)
        : app.t('chatExtraPriceUnavailable')));
    }
    if (!unavailable) createDetails.appendChild(makeNode(app.doc, 'p', 'aiwc-account-chat-meta', app.t('createChatInPanel')));
    createRow.appendChild(createDetails);
    list.appendChild(createRow);
    picker.appendChild(list);

    const actions = makeNode(app.doc, 'div', 'aiwc-chat-pick-actions');
    const connect = actionButton(app.doc, app.t('connectThisChat'), 'link-chat', 'aiwc-btn-primary');
    connect.dataset.chatPickConnect = '1';
    connect.dataset.connectLabel = app.t('connectThisChat');
    connect.dataset.reconnectLabel = app.t('reconnect');
    actions.appendChild(connect);
    const createAction = createHref ? externalLink(app.doc, createHref, app.t('createNewChat'), 'aiwc-btn aiwc-btn-primary') : null;
    if (createAction) { createAction.dataset.chatPickCreate = '1'; createAction.dataset.createAllowed = unavailable ? '0' : '1'; actions.appendChild(createAction); }
    const buyAction = unavailable && buyHref ? externalLink(app.doc, buyHref, app.t('buyExtraChatOrUpgrade'), 'aiwc-btn aiwc-btn-primary') : null;
    if (buyAction) { buyAction.dataset.chatPickBuy = '1'; actions.appendChild(buyAction); }
    // opened from the connected-chat block: «Cancel» returns to it unchanged, as in WordPress
    if (app.showChatChoices) actions.appendChild(actionButton(app.doc, app.t('cancel'), 'hide-chat-choices', 'aiwc-btn-link'));
    picker.appendChild(actions);
    parent.appendChild(picker);
    updateChatPickerSelection(list);
  }

  function updateChatPickerSelection(list) {
    if (!list) return;
    const selected = list.querySelector('input[name="chat_id"]:checked');
    list.querySelectorAll('.aiwc-account-chat').forEach((row) => {
      row.classList.toggle('is-selected', !!selected && row.querySelector('input[name="chat_id"]') === selected);
    });
    const picker = list.closest('.aiwc-chat-picker');
    const connect = picker && picker.querySelector('[data-chat-pick-connect]');
    const create = picker && picker.querySelector('[data-chat-pick-create]');
    const buy = picker && picker.querySelector('[data-chat-pick-buy]');
    const isNew = !!selected && selected.value === 'new';
    if (connect) {
      connect.disabled = !selected || isNew;
      connect.hidden = isNew;
      const picker = connect.closest('.aiwc-chat-picker');
      connect.textContent = selected && selected.value === String(picker && picker.dataset.currentChatId || '') && selected.value
        ? connect.dataset.reconnectLabel
        : connect.dataset.connectLabel;
    }
    if (create) create.hidden = !isNew || create.dataset.createAllowed === '0';
    if (buy) buy.hidden = !isNew;
  }

  function renderChatPickerState(app, parent, chats, linkedMode, linked, linkedPersona, persona, chat, widget) {
    const state = makeNode(app.doc, 'div', 'aiwc-chat-picker-state');
    if (linkedMode && !app.showChatChoices) {
      const consultant = String(linkedPersona.name || persona.name || app.data.chat && app.data.chat.name || widget.key_check && widget.key_check.name || '');
      const chatName = String(linked && (linked.chat_name || linked.name) || chat.chat_name || chat.name || '');
      const heading = consultant
        ? app.t('siteChatConsultant').replace(':name', consultant)
        : chatName ? app.t('siteChatNamed').replace(':name', chatName) : app.t('siteChat');
      const line = makeNode(app.doc, 'div', 'aiwc-chat-select-line');
      line.appendChild(makeNode(app.doc, 'strong', 'aiwc-linked-chat', heading));
      line.appendChild(actionButton(app.doc, app.t('changeChat'), 'show-chat-choices', 'aiwc-btn aiwc-btn-small'));
      state.appendChild(line);
    } else if (!widget.key || app.showChatChoices) {
      if (app.showChatChoices) {
        renderAccountChats(app, state, chats);
        if (widget.key) state.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('keyAutoHelp')));
      } else {
        const line = makeNode(app.doc, 'div', 'aiwc-chat-select-line');
        line.appendChild(actionButton(app.doc, app.t('chooseChatButton'), 'show-chat-choices', 'aiwc-btn aiwc-btn-small'));
        state.appendChild(line);
      }
    }
    parent.appendChild(state);
  }

  function renderCreateChatAction(app, parent) {
    const slots = app.data.me && app.data.me.chat_slots && typeof app.data.me.chat_slots === 'object' ? app.data.me.chat_slots : {};
    const box = makeNode(app.doc, 'section', 'aiwc-create-chat');
    const unavailable = slots.can_create === false;
    // needs_extra_chat: no free plan slot, but a paid account may still create a chat billed as an extra one (no buy button then)
    const noFreeSlot = slots.needs_extra_chat === true || slots.available === 0;
    if (unavailable || noFreeSlot) {
      const notice = slots.reason || (noFreeSlot ? app.t('chatSlotsFull') : '');
      if (notice) box.appendChild(makeNode(app.doc, 'p', 'aiwc-notice aiwc-notice-warning', String(notice)));
      const price = slots.extra_chat_price_usd;
      const hasPrice = typeof price === 'number' && Number.isFinite(price);
      const priceText = hasPrice ? price.toLocaleString(app.locale || 'ru', { maximumFractionDigits: 2 }) : '';
      box.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', hasPrice ? app.t('chatExtraPrice').replace(':price', priceText) : app.t('chatExtraPriceUnavailable')));
      const billingHref = safePanelUrl(slots.buy_url, app.config.panelBase);
      if (billingHref && unavailable) box.appendChild(externalLink(app.doc, billingHref, app.t('buyExtraChatOrUpgrade'), 'aiwc-btn aiwc-btn-primary'));
      if (unavailable) return parent.appendChild(box);
    }
    const panel = safePanelUrl(app.config.panelBase, app.config.panelBase);
    const createHref = panel ? safePanelUrl(`${panel.replace(/\/$/, '')}/chat?new=1`, app.config.panelBase) : '';
    if (createHref) {
      box.appendChild(externalLink(app.doc, createHref, app.t('createNewChat'), 'aiwc-btn aiwc-btn-primary'));
      box.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('createChatInPanel')));
    }
    parent.appendChild(box);
  }

  function renderChatChoices(app, parent, hidden = false, offered = null) {
    const chats = offered || (Array.isArray(app.data.me && app.data.me.chats) ? app.data.me.chats : []);
    const box = makeNode(app.doc, 'div', 'aiwc-chat-picker');
    box.id = 'aiwc-chat-choices';
    box.classList.add('aiwc-chat-choice-panel');
    box.hidden = hidden && !app.showChatChoices;
    box.appendChild(makeNode(app.doc, 'h3', '', app.t(chats.length ? 'chooseThisChat' : 'noChats')));
    chats.forEach((chat) => {
      const row = makeNode(app.doc, 'label', 'aiwc-chat-option');
      const checkbox = app.doc.createElement('input');
      checkbox.type = 'checkbox'; checkbox.name = 'aiwc-chat'; checkbox.value = String(chat.id || '');
      const localChats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
      checkbox.checked = offered ? offered.length === 1 : localChats.some((local) => Number(local.chat_id || 0) === Number(chat.id || 0));
      row.appendChild(checkbox);
      const personaName = String(chat.persona && chat.persona.name || '');
      const chatName = String(chat.chat_name || chat.name || '');
      const genericName = /^(?:chat|чаты?|чатик)\s*\d+$/i.test(chatName.trim());
      const label = chats.length === 1 && personaName ? personaName :
        chatName && personaName && !genericName ? app.t('chatWithConsultant').replace(':chat', chatName).replace(':consultant', personaName) :
          !genericName && chatName ? chatName : personaName || `#${chat.id}`;
      row.appendChild(makeNode(app.doc, 'strong', '', label));
      if (chat.persona && chat.persona.name && personaName !== label) row.appendChild(makeNode(app.doc, 'span', 'aiwc-muted', chat.persona.name));
      box.appendChild(row);
    });
    if (chats.length) box.appendChild(actionButton(app.doc, app.t('linkChat'), 'link-chat', 'aiwc-btn-primary'));
    parent.appendChild(box);
  }

  function renderLocalAppearanceSettings(app, card) {
    const widget = app.hostState && app.hostState.widget || {};
    const fields = makeNode(app.doc, 'div', 'aiwc-fields');
    addSelectField(app, fields, app.t('design'), 'theme', [
      { value: 'classic', label: app.t('designClassic') }, { value: 'bar', label: app.t('designBar') },
      { value: 'panel', label: app.t('designPanel') }, { value: 'inline', label: app.t('designInline') }
    ], widget.theme || 'classic', 'widget');
    const inline = makeNode(app.doc, 'div', 'aiwc-inline-options');
    inline.dataset.inlineOptions = '1';
    const mount = app.doc.createElement('input'); mount.type = 'text'; mount.value = String(widget.mount || 'aiworker-chat'); mount.pattern = '[.]?[A-Za-z][A-Za-z0-9_-]{0,63}'; mount.dataset.widgetField = 'mount';
    inline.appendChild(wrapLabel(app.doc, app.t('blockId'), mount));
    const height = app.doc.createElement('input'); height.type = 'number'; height.min = '320'; height.max = '1200'; height.value = String(widget.height || 560); height.dataset.widgetField = 'height';
    inline.appendChild(wrapLabel(app.doc, app.t('blockHeight'), height));
    inline.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('blockHelp')));
    fields.appendChild(inline);
    const color = app.doc.createElement('input'); color.type = 'color'; color.value = /^#[0-9a-fA-F]{6}$/.test(widget.color || '') ? widget.color : '#4f46e5'; color.dataset.widgetField = 'color';
    fields.appendChild(wrapLabel(app.doc, app.t('color'), color));
    addSelectField(app, fields, app.t('accentText'), 'colors.accent_text', [
      { value: '', label: app.t('accentTextFromChat') }, { value: 'auto', label: app.t('accentTextAuto') },
      { value: 'light', label: app.t('accentTextWhite') }, { value: 'dark', label: app.t('accentTextBlack') }
    ], widget.colors && widget.colors.accent_text || '', 'widget');
    addSelectField(app, fields, app.t('scheme'), [
      { value: '', label: app.t('schemeFromChat') }, { value: 'light', label: app.t('schemeLight') },
      { value: 'dim', label: app.t('schemeDim') }, { value: 'dark', label: app.t('schemeDark') },
      { value: 'auto', label: app.t('schemeAuto') }
    ], widget.scheme || '', 'widget');
    const colors = makeNode(app.doc, 'details', 'aiwc-colors');
    if (widget.colors && Object.keys(widget.colors).length) colors.open = true;
    colors.appendChild(makeNode(app.doc, 'summary', '', app.t('advancedColors')));
    colors.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('advancedColorsHelp')));
    const colorGrid = makeNode(app.doc, 'div', 'aiwc-colors-grid');
    const colorFields = [
      ['header_bg', 'colorHeaderBg'], ['header_text', 'colorHeaderText'], ['bg', 'colorBg'], ['surface', 'colorSurface'],
      ['text', 'colorText'], ['muted', 'colorMuted'], ['border', 'colorBorder'], ['visitor_bubble', 'colorVisitorBubble'],
      ['visitor_text', 'colorVisitorText'], ['ai_bubble', 'colorAiBubble'], ['input_bg', 'colorInputBg']
    ];
    colorFields.forEach(([name, key]) => {
      const input = app.doc.createElement('input'); input.type = 'color'; input.dataset.widgetField = `colors.${name}`;
      input.value = /^#[0-9a-fA-F]{6}$/.test(widget.colors && widget.colors[name] || '') ? widget.colors[name] : '#ffffff';
      input.dataset.emptyColor = widget.colors && widget.colors[name] ? '0' : '1';
      const field = makeNode(app.doc, 'div', 'aiwc-color-setting');
      field.appendChild(wrapLabel(app.doc, app.t(key), input));
      const reset = actionButton(app.doc, app.t('useSchemeColor'), 'color-reset', 'aiwc-btn-link');
      reset.dataset.colorReset = name;
      field.appendChild(reset);
      colorGrid.appendChild(field);
    });
    colors.appendChild(colorGrid);
    fields.appendChild(colors);
    addSelectField(app, fields, app.t('position'), 'position', [
      { value: 'right', label: app.t('right') }, { value: 'left', label: app.t('left') }
    ], widget.position || 'right', 'widget');
    const offsets = makeNode(app.doc, 'div', 'aiwc-offset');
    [['siteOffsetX', 'offsetSideways'], ['siteOffsetY', 'offsetUpDown']].forEach(([field, label]) => {
      const input = app.doc.createElement('input'); input.type = 'number'; input.min = '-300'; input.max = '300'; input.step = '1';
      input.value = String(widget[field] || ''); input.dataset.widgetField = field;
      offsets.appendChild(wrapLabel(app.doc, app.t(label), input));
    });
    fields.appendChild(wrapLabel(app.doc, app.t('buttonOffset'), offsets));
    fields.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('offsetHelp')));
    const localChats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
    if (localChats.length > 1) {
      const stackOrder = app.doc.createElement('input');
      stackOrder.type = 'number'; stackOrder.min = '0'; stackOrder.max = '100';
      stackOrder.value = String(widget.stack_order || 0); stackOrder.dataset.widgetField = 'stack_order';
      fields.appendChild(wrapLabel(app.doc, app.t('stackOrder'), stackOrder));
      addWidgetCheck(app, fields, app.t('stackChats'), 'stack', widget.stack !== false);
      addWidgetCheck(app, fields, app.t('greetPopupSite'), 'greet_popup', !!widget.greet_popup);
    }
    if (app.chatId) {
      const chat = app.formDraft || app.formOriginal || {};
      const launcherIconUrl = isSafeImageUrl(chat.launcher_icon_url) || '';
      addRadioOptions(app, fields, app.t('launcherIcon'), 'launcher_icon', optionList(app.data.chat || {}, 'launcher_icons'), chat.launcher_icon || 'chat');
      addCustomIcon(app, fields, launcherIconUrl, chat.launcher_icon === 'custom');
      const fileLabel = makeNode(app.doc, 'label', 'aiwc-btn aiwc-btn-small');
      fileLabel.appendChild(app.doc.createTextNode(app.t('uploadImage')));
      const file = app.doc.createElement('input'); file.type = 'file'; file.accept = 'image/png,image/jpeg,image/webp'; file.hidden = true; file.dataset.iconFile = '1';
      fileLabel.appendChild(file); fields.appendChild(fileLabel);
      fields.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('imageHelp')));
      const removeIcon = actionButton(app.doc, app.t('removeImage'), 'icon-delete', 'aiwc-btn-link');
      removeIcon.hidden = !launcherIconUrl;
      fields.appendChild(removeIcon);
    } else fields.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t(app.hostState && app.hostState.connected ? 'launcherNeedsChat' : 'launcherNeedsConnection')));
    card.appendChild(fields);
  }

  function renderPageSettings(app, card) {
    const widget = app.hostState && app.hostState.widget || {};
    addSelectField(app, card, app.t('pages'), 'pages_mode', [
      { value: 'all', label: app.t('pagesAll') }, { value: 'only', label: app.t('pagesOnly') }, { value: 'except', label: app.t('pagesExcept') }
    ], widget.pages_mode || 'all', 'widget');
    const pageRules = makeNode(app.doc, 'div', 'aiwc-page-rules');
    pageRules.dataset.pageRules = '1';
    const textarea = app.doc.createElement('textarea'); textarea.rows = 5; textarea.value = String(widget.pages || ''); textarea.placeholder = '/\n/contacts/\n/shop/*'; textarea.dataset.widgetField = 'pages';
    pageRules.appendChild(wrapLabel(app.doc, app.t('pageList'), textarea));
    pageRules.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('pageListHelp')));
    card.appendChild(pageRules);
    const loadControls = makeNode(app.doc, 'div', 'aiwc-load-setting');
    loadControls.dataset.loadSetting = '1';
    addSelectField(app, loadControls, app.t('showChatTiming'), 'load', [
      { value: 'immediate', label: app.t('loadImmediate') }, { value: 'interaction', label: app.t('loadInteraction') }, { value: 'delay', label: app.t('loadDelay') }
    ], widget.load || 'interaction', 'widget');
    const delay = app.doc.createElement('input');
    delay.type = 'number'; delay.min = '1'; delay.max = '120'; delay.step = '1';
    delay.value = String(widget.delay || 5); delay.dataset.widgetField = 'delay';
    const delayField = wrapLabel(app.doc, app.t('delaySeconds'), delay);
    delayField.classList.add('aiwc-delay-field');
    delayField.dataset.delayField = '1';
    loadControls.appendChild(delayField);
    card.appendChild(loadControls);
  }

  function renderFeatureSettings(app, card, chat) {
    const widget = app.hostState && app.hostState.widget || {};
    addWidgetCheck(app, card, app.t('voice'), 'voice', widget.voice !== false);
    addWidgetCheck(app, card, app.t('rating'), 'rating', widget.rating !== false);
    if (widget.privacy_url) {
      const privacy = app.doc.createElement('input'); privacy.type = 'url'; privacy.value = String(widget.privacy_url); privacy.dataset.widgetField = 'privacy_url';
      card.appendChild(wrapLabel(app.doc, app.t('privacyUrl'), privacy));
    }
    if (app.chatId) {
      const inChat = makeRow(app, card, app.t('inChat'));
      addCheck(app, inChat, app.t('aiNotice'), 'ai_notice', chat.ai_notice !== false, '');
      const localChats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
      if (localChats.length < 2) addCheck(app, inChat, app.t('greetPopup'), 'greet_popup', chat.greet_popup, '');
    }
  }

  function addWidgetCheck(app, parent, label, field, checked) {
    const wrap = makeNode(app.doc, 'label', 'aiwc-check');
    const input = app.doc.createElement('input'); input.type = 'checkbox'; input.checked = !!checked; input.dataset.widgetField = field;
    wrap.appendChild(input); wrap.appendChild(makeNode(app.doc, 'span', '', label)); parent.appendChild(wrap);
    return input;
  }

  function renderUsageSummary(app, card) {
    const usage = currentUsage(app);
    const meters = usageMeters(usage);
    const accountTokens = app.data.me && app.data.me.wizard && app.data.me.wizard.tokens;
    if (app.hostState && app.hostState.key_only) {
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('usageNeedsLinkedChat')));
    } else if (app.hostState && app.hostState.connected && !app.chatId) {
      if (accountTokens && typeof accountTokens === 'object') card.appendChild(renderMeter(app, accountTokens, accountTokens.label || app.t('tokens')));
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('usageNeedsChat')));
    } else if (!app.hostState || !app.hostState.connected || !app.chatId) {
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('usageNeedsConnection')));
    } else if (!meters.length) {
      card.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('notAvailable')));
    } else {
      meters.forEach((meter) => card.appendChild(renderMeter(app, meter, meter.label || meter.key || app.t('tokens'))));
    }
    const link = safePanelUrl(usage.url, app.config.panelBase)
      || safePanelUrl(`${String(app.config.panelBase || '').replace(/\/$/, '')}/billing`, app.config.panelBase);
    if (link) card.appendChild(externalLink(app.doc, link, app.t('openKraName'), 'aiwc-help'));
  }

  function currentUsage(app) {
    const chatUsage = app.data && app.data.usage || {};
    if (usageMeters(chatUsage).length) return chatUsage;
    const stats = app.statsBody || {};
    if (usageMeters(stats).length) return stats;
    const accountTokens = app.data && app.data.me && app.data.me.wizard && app.data.me.wizard.tokens;
    return accountTokens ? { tokens: accountTokens } : chatUsage;
  }

  function makeSetupPanel(app, name) {
    const panel = makeNode(app.doc, 'div', 'aiwc-setup-panel');
    panel.id = `${app.setupId}-panel-${name}`;
    panel.dataset.setupPanel = name;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${app.setupId}-tab-${name}`);
    return panel;
  }

  function appendTemplate(parent, template, replacements) {
    const values = Array.isArray(replacements) ? replacements : [replacements];
    const pattern = /%(?:(\d+)\$)?[sd]/g;
    const source = String(template || '');
    let cursor = 0;
    let sequential = 0;
    let match;
    while ((match = pattern.exec(source))) {
      if (match.index > cursor) parent.appendChild(parent.ownerDocument.createTextNode(source.slice(cursor, match.index)));
      const index = match[1] ? Number(match[1]) - 1 : sequential++;
      const value = values[index];
      if (value && typeof value === 'object' && value.nodeType) parent.appendChild(value);
      else parent.appendChild(parent.ownerDocument.createTextNode(String(value == null ? '' : value)));
      cursor = match.index + match[0].length;
    }
    if (cursor < source.length) parent.appendChild(parent.ownerDocument.createTextNode(source.slice(cursor)));
  }

  function textWithoutCodeTags(value) {
    return String(value || '').replace(/<\/?code>/g, '');
  }

  function renderCopyArea(app, parent, value, rows = 3) {
    const field = app.doc.createElement('textarea');
    field.rows = rows;
    field.readOnly = true;
    field.value = String(value || '');
    field.className = 'aiwc-mcp-prompt';
    parent.appendChild(field);
    const button = actionButton(app.doc, app.t('mcpHelp.copy'), 'mcp-copy', 'aiwc-btn-small');
    parent.appendChild(button);
    return field;
  }

  function renderMcpTelegramHelp(app, mcpPanel, telegramPanel) {
    const help = makeNode(app.doc, 'section', 'aiwc-card aiwc-mcp-help');
    help.appendChild(makeNode(app.doc, 'h2', '', app.t('mcpHelp.title')));
    help.appendChild(makeNode(app.doc, 'p', 'aiwc-muted', app.t('mcpHelp.intro')));
    help.appendChild(makeNode(app.doc, 'p', '', app.t('mcpHelp.abilitiesTitle')));
    const abilities = makeNode(app.doc, 'ul', 'aiwc-mcp-list');
    app.t('mcpHelp.abilities').forEach((item) => abilities.appendChild(makeNode(app.doc, 'li', '', item)));
    help.appendChild(abilities);
    help.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('mcpHelp.approval')));

    const host = String(app.hostState && app.hostState.site && app.hostState.site.host || '');
    const example = makeNode(app.doc, 'p', 'aiwc-mcp-example');
    example.appendChild(app.doc.createTextNode(`${app.t('mcpHelp.exampleLabel')} `));
    const quote = makeNode(app.doc, 'q');
    const selected = app.chatId && Array.isArray(app.data.me && app.data.me.chats)
      ? app.data.me.chats.find((chat) => String(chat && chat.id || '') === String(app.chatId)) : null;
    if (selected) {
      const chatData = app.data.chat && app.data.chat.chat || {};
      appendTemplate(quote, app.t('mcpHelp.exampleExisting'), [String(selected.chat_name || selected.name || chatData.name || `#${app.chatId}`), String(app.chatId), host]);
    } else {
      appendTemplate(quote, app.t('mcpHelp.exampleCreate'), [host]);
    }
    example.appendChild(quote);
    help.appendChild(example);

    const serverUrl = 'https://kra.name/app/api/mcp';
    const methods = makeNode(app.doc, 'div', 'aiwc-mcp-methods');
    const chatgpt = app.doc.createElement('details');
    chatgpt.className = 'aiwc-mcp-method';
    chatgpt.open = true;
    chatgpt.appendChild(makeNode(app.doc, 'summary', '', app.t('mcpHelp.chatgpt')));
    const chatgptSteps = makeNode(app.doc, 'ol', 'aiwc-mcp-steps');
    const chatgptFirst = makeNode(app.doc, 'li');
    appendTemplate(chatgptFirst, app.t('mcpHelp.chatgptSteps.0'), [externalLink(app.doc, 'https://chatgpt.com/plugins', 'chatgpt.com/plugins')]);
    chatgptSteps.appendChild(chatgptFirst);
    const chatgptSecond = makeNode(app.doc, 'li');
    appendTemplate(chatgptSecond, app.t('mcpHelp.chatgptSteps.1'), [makeNode(app.doc, 'code', '', 'AI Worker'), makeNode(app.doc, 'code', '', serverUrl)]);
    chatgptSteps.appendChild(chatgptSecond);
    app.t('mcpHelp.chatgptSteps').slice(2).forEach((item) => chatgptSteps.appendChild(makeNode(app.doc, 'li', '', item)));
    chatgpt.appendChild(chatgptSteps);
    methods.appendChild(chatgpt);

    const claude = app.doc.createElement('details');
    claude.className = 'aiwc-mcp-method';
    claude.appendChild(makeNode(app.doc, 'summary', '', app.t('mcpHelp.claude')));
    const claudeSteps = makeNode(app.doc, 'ol', 'aiwc-mcp-steps');
    const claudeFirst = makeNode(app.doc, 'li');
    appendTemplate(claudeFirst, app.t('mcpHelp.claudeSteps.0'), [makeNode(app.doc, 'code', '', serverUrl)]);
    claudeSteps.appendChild(claudeFirst);
    claudeSteps.appendChild(makeNode(app.doc, 'li', '', app.t('mcpHelp.claudeSteps.1')));
    claude.appendChild(claudeSteps);
    methods.appendChild(claude);

    const local = app.doc.createElement('details');
    local.className = 'aiwc-mcp-method';
    local.appendChild(makeNode(app.doc, 'summary', '', app.t('mcpHelp.local')));
    const localSteps = makeNode(app.doc, 'ol', 'aiwc-mcp-steps');
    const panelLink = externalLink(app.doc, 'https://kra.name/app/panel', app.t('mcpHelp.panelLabel'));
    const localStep = makeNode(app.doc, 'li');
    appendTemplate(localStep, app.t('mcpHelp.localSteps.0'), [panelLink]);
    localSteps.appendChild(localStep);
    const installItem = makeNode(app.doc, 'li');
    installItem.appendChild(app.doc.createTextNode(app.t('mcpHelp.localSteps.1')));
    renderCopyArea(app, installItem, app.t('mcpHelp.installPrompt'), 5);
    localSteps.appendChild(installItem);
    local.appendChild(localSteps);
    local.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('mcpHelp.installHelp')));
    const manual = app.doc.createElement('details');
    manual.className = 'aiwc-mcp-manual';
    manual.appendChild(makeNode(app.doc, 'summary', '', app.t('mcpHelp.connectByHand')));
    manual.appendChild(makeNode(app.doc, 'p', '', textWithoutCodeTags(app.t('mcpHelp.keyStorage'))));
    manual.appendChild(makeNode(app.doc, 'p', '', app.t('mcpHelp.pluginCommands')));
    renderCopyArea(app, manual, '/plugin marketplace add needtome/aiworker-skills\n/plugin install aiworker@aiworker-skills\n/reload-plugins');
    manual.appendChild(makeNode(app.doc, 'p', '', app.t('mcpHelp.serverOnly')));
    renderCopyArea(app, manual, `claude mcp add --transport http aiworker ${serverUrl} --header "Authorization: Bearer $AIWORKER_API_KEY"`, 2);
    manual.appendChild(makeNode(app.doc, 'p', '', textWithoutCodeTags(app.t('mcpHelp.codexConfig'))));
    renderCopyArea(app, manual, `[mcp_servers.aiworker]\nurl = "${serverUrl}"\nbearer_token_env_var = "AIWORKER_API_KEY"`);
    manual.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('mcpHelp.keyWarning')));
    local.appendChild(manual);
    methods.appendChild(local);
    help.appendChild(methods);

    const integrations = 'https://kra.name' + (app.locale === 'ru' ? '/ru' : app.locale === 'uk' ? '/ua' : '') + '/integrations/';
    const fullInstructions = makeNode(app.doc, 'p', 'aiwc-help');
    const integrationLink = externalLink(app.doc, integrations, app.t('mcpHelp.integrationsLabel'));
    appendTemplate(fullInstructions, app.t('mcpHelp.fullInstructions'), [integrationLink]);
    help.appendChild(fullInstructions);
    mcpPanel.appendChild(help);

    const telegram = makeNode(app.doc, 'section', 'aiwc-card aiwc-telegram-help');
    telegram.appendChild(makeNode(app.doc, 'h2', '', app.t('telegramHelp.title')));
    const intro = makeNode(app.doc, 'p', 'aiwc-muted');
    appendTemplate(intro, app.t('telegramHelp.intro'), [externalLink(app.doc, 'https://t.me/KraNameBot', '@KraNameBot')]);
    telegram.appendChild(intro);
    telegram.appendChild(makeNode(app.doc, 'p', '', app.t('telegramHelp.whatYouCanAsk')));
    const telegramItems = makeNode(app.doc, 'ul', 'aiwc-mcp-list');
    app.t('telegramHelp.items').forEach((item) => telegramItems.appendChild(makeNode(app.doc, 'li', '', item)));
    telegram.appendChild(telegramItems);
    telegram.appendChild(makeNode(app.doc, 'p', '', textWithoutCodeTags(app.t('telegramHelp.commands'))));
    telegram.appendChild(makeNode(app.doc, 'p', '', app.t('telegramHelp.notifications')));
    if (app.hostState && app.hostState.connected) {
      telegram.appendChild(actionButton(app.doc, app.t('connectTelegram'), 'telegram-link', 'aiwc-btn-small'));
      telegram.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('telegramHelp.oneTime')));
    } else {
      telegram.appendChild(makeNode(app.doc, 'p', '', app.t('telegramHelp.signInFirst')));
    }
    const panelSettings = makeNode(app.doc, 'p', 'aiwc-help');
    const panelSettingsUrl = 'https://kra.name/app/panel/settings?tab=notifications';
    appendTemplate(panelSettings, app.t('telegramHelp.panelSettings'), [externalLink(app.doc, panelSettingsUrl, app.t('mcpHelp.panelLabel'))]);
    telegram.appendChild(panelSettings);
    telegramPanel.appendChild(telegram);
  }

  function updateSetupView(app) {
    app.root.querySelectorAll('[data-setup-tab]').forEach((tab) => {
      const selected = tab.dataset.setupTab === app.setupTab;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    });
    app.root.querySelectorAll('[data-setup-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.setupPanel !== app.setupTab;
    });
    const content = app.root.querySelector('[data-setup-content]');
    const toggle = app.root.querySelector('[data-setup-toggle]');
    if (content) content.hidden = !app.detailsOpen;
    if (toggle) {
      toggle.textContent = app.t(app.detailsOpen ? 'setupTabs.collapse' : 'setupTabs.expand');
      toggle.setAttribute('aria-expanded', app.detailsOpen ? 'true' : 'false');
    }
  }

  async function copyMcpPrompt(app, button) {
    const field = button && button.previousElementSibling;
    if (!field || field.tagName !== 'TEXTAREA') return;
    const value = field.value;
    let copied = false;
    try {
      if (app.win.isSecureContext && app.win.navigator.clipboard && typeof app.win.navigator.clipboard.writeText === 'function') {
        await app.win.navigator.clipboard.writeText(value);
        copied = true;
      }
    } catch (_) { }
    if (!copied) {
      field.focus();
      field.select();
      try { app.doc.execCommand('copy'); } catch (_) { }
    }
    button.textContent = app.t('mcpHelp.copied');
    app.win.setTimeout(() => { if (button.isConnected) button.textContent = app.t('mcpHelp.copy'); }, 1800);
  }

  function languageName(app, lang) {
    const names = app.t('langNames') || {};
    return names[lang] || String(lang).toUpperCase();
  }

  function makeRow(app, card, label) {
    const row = makeNode(app.doc, 'div', 'aiwc-row');
    row.appendChild(makeNode(app.doc, 'div', 'aiwc-row-label', label));
    const content = makeNode(app.doc, 'div', 'aiwc-fields');
    row.appendChild(content);
    card.appendChild(row);
    return content;
  }

  function wrapLabel(doc, text, control) {
    const label = makeNode(doc, 'label', 'aiwc-label');
    label.appendChild(makeNode(doc, 'span', '', text));
    label.appendChild(control);
    return label;
  }

  function addTextField(app, parent, field, value, placeholder, controlType) {
    const control = controlType === 'textarea' ? app.doc.createElement('textarea') : app.doc.createElement('input');
    if (controlType === 'textarea') control.rows = 3;
    else control.type = 'text';
    control.value = String(value || '');
    control.dataset.field = `texts.${app.currentTextLang}.${field}`;
    if (placeholder) control.placeholder = String(placeholder);
    const maxKey = field === 'greeting' ? 'greeting_max' : field === 'name' ? 'name_max' : field === 'title' ? 'title_max' : field === 'tab_label' ? 'tab_label_max' : '';
    const limit = maxKey && boundChatLimits(app.data.chat && app.data.chat.limits)[maxKey];
    const defaultLimit = field === 'greeting' ? 300 : field === 'name' ? 60 : field === 'title' ? 80 : 60;
    control.maxLength = clampLimit(limit, CHAT_TEXT_MAX_LENGTH, defaultLimit);
    const fieldName = field === 'greeting' ? app.t('greeting') : field === 'name' ? app.t('name') : field === 'title' ? app.t('titleText') : app.t('tabLabel');
    const label = wrapLabel(app.doc, fieldName, control);
    appendFieldError(app, label, control.dataset.field);
    parent.appendChild(label);
  }

  function appendFieldError(app, parent, key) {
    const error = makeNode(app.doc, 'span', 'aiwc-error', app.fieldErrors[key] || '');
    error.dataset.errorFor = key;
    error.hidden = !app.fieldErrors[key];
    parent.appendChild(error);
  }

  function optionList(body, key) {
    const options = body && body.options && body.options[key];
    return Array.isArray(options) ? options : [];
  }

  function addSelectField(app, parent, label, field, options, current, scope = 'chat') {
    if (!options.length) return null;
    const select = app.doc.createElement('select');
    if (scope === 'widget') select.dataset.widgetField = field;
    else select.dataset.field = field;
    options.forEach((option) => appendOption(app.doc, select, option.value, option.label || option.name || option.value));
    select.value = String(current == null ? '' : current);
    const wrapped = wrapLabel(app.doc, label, select);
    appendFieldError(app, wrapped, field);
    parent.appendChild(wrapped);
    return select;
  }

  function appendOption(doc, select, value, label) {
    const option = makeNode(doc, 'option', '', label);
    option.value = String(value == null ? '' : value);
    select.appendChild(option);
  }

  function addCheck(app, parent, label, field, checked, dataKey) {
    const wrap = makeNode(app.doc, 'label', 'aiwc-check');
    const input = app.doc.createElement('input');
    input.type = 'checkbox';
    input.checked = !!checked;
    if (field) input.dataset.field = field;
    if (dataKey) input.dataset[dataKey] = '1';
    wrap.appendChild(input);
    wrap.appendChild(makeNode(app.doc, 'span', '', label));
    if (field) appendFieldError(app, wrap, field);
    parent.appendChild(wrap);
    return input;
  }

  function renderKnowledgeSettings(app, card, body, chat) {
    const row = makeRow(app, card, app.t('knowledgeMode'));
    const options = optionList(body, 'knowledge_mode');
    if (options.length) {
      const group = makeNode(app.doc, 'div', 'aiwc-fields');
      options.forEach((option) => {
        const label = makeNode(app.doc, 'label', 'aiwc-check');
        const input = app.doc.createElement('input'); input.type = 'radio'; input.name = 'aiwc-knowledge-mode'; input.value = String(option.value); input.dataset.field = 'knowledge_mode'; input.checked = String(chat.knowledge_mode || '') === input.value;
        label.appendChild(input); label.appendChild(makeNode(app.doc, 'span', '', option.label || option.value)); group.appendChild(label);
      });
      row.appendChild(group);
    }
    row.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('knowledgeModeHelp')));
    addCheck(app, row, app.t('companyKnowledge'), 'use_company_knowledge', chat.use_company_knowledge, '');
  }

  function renderLeadsSettings(app, card, body, chat) {
    const row = makeRow(app, card, app.t('leads'));
    addCheck(app, row, app.t('collectLeads'), 'leads_enabled', chat.leads_enabled, 'leadsEnabled');
    const delivery = chat.leads_delivery || body.leads_delivery || {};
    if (!delivery || !Array.isArray(delivery.channels)) return;
    const box = makeNode(app.doc, 'section', 'aiwc-channel-panel');
    box.dataset.deliveryPanel = '1';
    const current = makeNode(app.doc, 'div', 'aiwc-help', delivery.current || delivery.fallback || '');
    box.appendChild(addCheck(app, box, app.t('sendLeads'), 'leads_delivery.enabled', delivery.enabled, 'deliveryEnabled'));
    if (current.textContent) box.appendChild(current);
    const chips = makeNode(app.doc, 'div', 'aiwc-chip-row');
    delivery.channels.forEach((channel) => {
      const label = makeNode(app.doc, 'label', 'aiwc-check');
      const input = app.doc.createElement('input'); input.type = 'checkbox'; input.checked = !!channel.selected; input.dataset.deliverySelected = String(channel.type || '');
      label.appendChild(input); label.appendChild(makeNode(app.doc, 'span', '', channel.label || channel.type));
      appendFieldError(app, label, `leads_delivery.${channel.type}.selected`);
      chips.appendChild(label);
    });
    box.appendChild(chips);
    delivery.channels.forEach((channel) => {
      const type = String(channel.type || '');
      const fieldsBox = makeNode(app.doc, 'div', 'aiwc-fields');
      fieldsBox.dataset.deliveryChannel = type;
      fieldsBox.hidden = !channel.selected;
      (Array.isArray(channel.fields) ? channel.fields : []).forEach((field) => {
        const key = String(field.key || '');
        if (!key) return;
        const inputType = String(field.type || 'text');
        const options = Array.isArray(field.options) ? field.options : [];
        let control;
        if (inputType === 'select' && options.length > 1) {
          control = app.doc.createElement('select');
          options.forEach((option) => appendOption(app.doc, control, option.value, option.label || option.value));
          control.value = String(field.value || '');
        } else if (inputType === 'select' && options.length <= 1) {
          control = app.doc.createElement('input'); control.type = 'hidden'; control.value = String(field.value || (options[0] && options[0].value) || '');
        } else {
          control = app.doc.createElement('input');
          control.type = inputType === 'secret' ? 'password' : inputType === 'email' ? 'email' : inputType === 'url' ? 'url' : 'text';
          control.value = inputType === 'secret' ? '' : String(field.value || '');
          control.autocomplete = inputType === 'secret' ? 'new-password' : 'off';
          if (inputType === 'secret' && field.set) control.placeholder = app.t('savedSecret');
          else if (field.placeholder) control.placeholder = String(field.placeholder);
          else if (inputType === 'email' && delivery.owner_email) control.placeholder = String(delivery.owner_email);
        }
        control.dataset.deliveryField = key;
        control.dataset.deliveryType = inputType;
        const wrapped = wrapLabel(app.doc, field.label || key, control);
        if (field.hint) wrapped.appendChild(makeNode(app.doc, 'span', 'aiwc-help', field.hint));
        appendFieldError(app, wrapped, `leads_delivery.${type}.${key}`);
        fieldsBox.appendChild(wrapped);
      });
      const connect = safePanelUrl(channel.connect_url, app.config.panelBase);
      // the delivery channel's own state; `connected` was undeclared here (ReferenceError «connected is not defined» on
      // drupal.kra.name right after «Connect this chat», 10.11.2026)
      const connected = Boolean(channel.connected || channel.status === 'connected');
      if (connect) fieldsBox.appendChild(externalLink(app.doc, connect, app.t(connected ? 'manageChannel' : 'connectChannel').replace(':name', String(channel.label || type)), 'aiwc-btn aiwc-btn-small'));
      box.appendChild(fieldsBox);
    });
    box.appendChild(actionButton(app.doc, app.t('testDelivery'), 'test-delivery', 'aiwc-btn-small'));
    const result = makeNode(app.doc, 'span', 'aiwc-help', ''); result.dataset.deliveryResult = '1'; result.setAttribute('role', 'status'); result.setAttribute('aria-live', 'polite'); box.appendChild(result);
    row.appendChild(box);
  }

  function addRadioOptions(app, parent, label, field, options, current) {
    if (!options.length) return;
    const section = makeNode(app.doc, 'div', 'aiwc-fields');
    section.appendChild(makeNode(app.doc, 'strong', '', label));
    const list = makeNode(app.doc, 'div', 'aiwc-icon-list');
    options.forEach((option, index) => {
      const value = String(option.value || '');
      const choice = makeNode(app.doc, 'label', 'aiwc-icon-choice');
      choice.title = String(option.label || value);
      const input = app.doc.createElement('input'); input.type = 'radio'; input.name = `aiwc-${field}`; input.value = value; input.dataset.field = field; input.checked = value === String(current || (index === 0 ? value : ''));
      const face = makeNode(app.doc, 'span', 'aiwc-icon-face');
      const svg = svgImage(app.doc, option.svg || '', app.win);
      if (svg) face.appendChild(svg);
      else face.textContent = String(option.label || value).slice(0, 1);
      choice.appendChild(input); choice.appendChild(face); choice.appendChild(makeNode(app.doc, 'span', '', option.label || value));
      list.appendChild(choice);
    });
    section.appendChild(list);
    parent.appendChild(section);
    if (field === 'launcher_icon') refreshLauncherIconForeground(app, parent);
  }

  function contrastForeground(color) {
    const match = /^#([0-9a-f]{6})$/i.exec(String(color || ''));
    if (!match) return '#fff';
    const hex = match[1];
    const channel = (offset) => {
      let value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
      return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
    return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? '#000' : '#fff';
  }

  function refreshLauncherIconForeground(app, scope = app.root) {
    const colorInput = scope.querySelector('[data-widget-field="color"]');
    const accentInput = scope.querySelector('[data-widget-field="colors.accent_text"]');
    const widget = app.hostState && app.hostState.widget || {};
    const color = String(colorInput && colorInput.value || widget.color || '#4f46e5');
    let mode = String(accentInput && accentInput.value || '');
    if (!mode) {
      const remoteChat = app.data && app.data.chat && (app.data.chat.chat || app.data.chat) || {};
      const remoteMode = remoteChat.colors && remoteChat.colors.accent_text || remoteChat.accent_text;
      mode = ['auto', 'light', 'dark'].includes(remoteMode) ? remoteMode : 'auto';
    }
    const foreground = mode === 'light' ? '#fff' : mode === 'dark' ? '#000' : contrastForeground(color);
    const background = /^#[0-9a-f]{6}$/i.test(color) ? color : '#4f46e5';
    scope.querySelectorAll('.aiwc-icon-face').forEach((face) => {
      face.style.setProperty('--aiwc-icon-accent', background);
      face.style.setProperty('--aiwc-icon-accent-fg', foreground);
    });
  }

  function addCustomIcon(app, parent, url, checked) {
    const label = makeNode(app.doc, 'label', 'aiwc-icon-choice');
    label.dataset.customIcon = '1';
    label.hidden = !url;
    label.title = app.t('yourImage');
    const input = app.doc.createElement('input'); input.type = 'radio'; input.name = 'aiwc-launcher_icon'; input.value = 'custom'; input.dataset.field = 'launcher_icon'; input.checked = !!checked; input.dataset.iconUrl = url;
    const face = makeNode(app.doc, 'span', 'aiwc-icon-face');
    if (url) { const image = app.doc.createElement('img'); image.src = url; image.alt = ''; face.appendChild(image); }
    label.appendChild(input); label.appendChild(face); label.appendChild(makeNode(app.doc, 'span', '', app.t('yourImage')));
    const list = parent.querySelector('.aiwc-icon-list');
    if (list) list.appendChild(label);
  }

  function refreshConditionalFields(app) {
    const leads = app.root.querySelector('[data-leads-enabled]');
    const deliveryPanel = app.root.querySelector('[data-delivery-panel]');
    if (deliveryPanel) deliveryPanel.hidden = !leads || !leads.checked;
    app.root.querySelectorAll('[data-delivery-channel]').forEach((box) => {
      const check = [...app.root.querySelectorAll('[data-delivery-selected]')].find((input) => input.dataset.deliverySelected === box.dataset.deliveryChannel);
      box.hidden = !check || !check.checked;
    });
    const pageMode = app.root.querySelector('[data-widget-field="pages_mode"]');
    const pageRules = app.root.querySelector('[data-page-rules]');
    if (pageRules) pageRules.hidden = !pageMode || pageMode.value === 'all';
    const load = app.root.querySelector('[data-widget-field="load"]');
    const delayField = app.root.querySelector('[data-delay-field]');
    if (delayField) delayField.hidden = !load || load.value !== 'delay';
    const theme = app.root.querySelector('[data-widget-field="theme"]');
    const inlineOptions = app.root.querySelector('[data-inline-options]');
    if (inlineOptions) inlineOptions.hidden = !theme || theme.value !== 'inline';
  }

  function readSettingsDraft(app) {
    const draft = clone(app.formDraft || app.formOriginal || {});
    const radios = new Map();
    app.root.querySelectorAll('[data-field]').forEach((control) => {
      const path = control.dataset.field;
      if (!path) return;
      if (control.type === 'radio') {
        if (!control.checked) return;
        radios.set(path, control.value);
        setPath(draft, path, control.value);
      } else if (control.type === 'checkbox') setPath(draft, path, !!control.checked);
      else if (control.type !== 'hidden' || control.dataset.field) setPath(draft, path, control.value);
    });
    const textLanguages = new Set([...app.root.querySelectorAll('[data-suggestion]')].map((input) => input.dataset.suggestion).slice(0, CHAT_LANGUAGES_MAX));
    textLanguages.forEach((lang) => {
      const suggestions = [...app.root.querySelectorAll('[data-suggestion]')]
        .filter((input) => input.dataset.suggestion === lang)
        .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index))
        .map((input) => input.value.trim()).filter(Boolean).slice(0, SUGGESTIONS_MAX);
      setPath(draft, `texts.${lang}.suggestions`, suggestions);
    });
    if (draft.leads_delivery && Array.isArray(draft.leads_delivery.channels)) {
      const deliveryEnabled = app.root.querySelector('[data-delivery-enabled]');
      draft.leads_delivery.enabled = !!(deliveryEnabled && deliveryEnabled.checked);
      draft.leads_delivery.channels = draft.leads_delivery.channels.map((channel) => {
        const selected = [...app.root.querySelectorAll('[data-delivery-selected]')].find((input) => input.dataset.deliverySelected === String(channel.type));
        const copy = clone(channel);
        copy.selected = !!(selected && selected.checked);
        copy.fields = (copy.fields || []).map((field) => {
          const input = [...app.root.querySelectorAll('[data-delivery-field]')].find((node) => {
            const channelBox = node.closest('[data-delivery-channel]');
            return node.dataset.deliveryField === String(field.key) && channelBox && channelBox.dataset.deliveryChannel === String(channel.type);
          });
          if (input && (input.dataset.deliveryType !== 'secret' || input.value !== '')) field.value = input.value;
          return field;
        });
        return copy;
      });
    }
    return draft;
  }

  function readWidgetDraft(app) {
    const draft = clone((app.hostState && app.hostState.widget) || {});
    app.root.querySelectorAll('[data-widget-field]').forEach((control) => {
      const path = control.dataset.widgetField;
      if (!path) return;
      if (control.dataset.emptyColor === '1' && control.type === 'color') { unsetPath(draft, path); return; }
      if (path === 'colors.accent_text' && control.value === '') { unsetPath(draft, path); return; }
      const value = control.type === 'checkbox' ? !!control.checked : control.value;
      setPath(draft, path, value);
    });
    return draft;
  }

  function buildWidgetDiff(original, draft) {
    const diff = {};
    ['theme', 'mount', 'height', 'color', 'position', 'load', 'delay', 'scheme', 'siteOffsetX', 'siteOffsetY', 'pages_mode', 'pages', 'voice', 'rating', 'privacy_url', 'stack_order', 'stack', 'greet_popup'].forEach((key) => {
      if (stable(original && original[key]) !== stable(draft && draft[key])) diff[key] = clone(draft[key]);
    });
    const beforeColors = original && original.colors || {};
    const afterColors = draft && draft.colors || {};
    const colorDiff = {};
    new Set([...Object.keys(beforeColors), ...Object.keys(afterColors)]).forEach((key) => {
      if (stable(beforeColors[key]) !== stable(afterColors[key])) colorDiff[key] = Object.prototype.hasOwnProperty.call(afterColors, key) ? afterColors[key] : null;
    });
    if (Object.keys(colorDiff).length) diff.colors = colorDiff;
    return diff;
  }

  function setPath(object, path, value) {
    const keys = String(path).split('.');
    let cursor = object;
    keys.slice(0, -1).forEach((key) => { if (!cursor[key] || typeof cursor[key] !== 'object') cursor[key] = {}; cursor = cursor[key]; });
    cursor[keys[keys.length - 1]] = value;
  }

  function unsetPath(object, path) {
    const keys = String(path).split('.');
    let cursor = object;
    for (const key of keys.slice(0, -1)) {
      if (!cursor[key] || typeof cursor[key] !== 'object') return;
      cursor = cursor[key];
    }
    delete cursor[keys[keys.length - 1]];
    if (keys.length > 1 && Object.keys(cursor).length === 0) unsetPath(object, keys.slice(0, -1).join('.'));
  }

  async function saveSettings(app, button) {
    const original = app.formOriginal || {};
    const draft = readSettingsDraft(app);
    app.formDraft = draft;
    const diff = buildSettingsDiff(original, draft);
    const widgetOriginal = clone((app.hostState && app.hostState.widget) || {});
    const widgetDraft = readWidgetDraft(app);
    const widgetDiff = buildWidgetDiff(widgetOriginal, widgetDraft);
    if (!Object.keys(diff).length && !Object.keys(widgetDiff).length) { setSettingsStatus(app, app.t('nothingChanged')); return; }
    if (button) { button.disabled = true; button.textContent = app.t('saving'); }
    try {
      if (app.chatId && Object.keys(diff).length) {
        const response = await proxy(app, 'PATCH', 'plugin/chat', { chat_id: app.chatId, lang: app.locale }, { ...diff, updated_at: app.data.chat && app.data.chat.updated_at });
        app.data.chat = response;
        app.formOriginal = normalizeChatResponse(response);
      }
      if (Object.keys(widgetDiff).length) {
        const response = await hostRequest(app, 'settings', 'POST', { widget: widgetDiff });
        if (response && response.state) app.hostState = response.state;
        else if (app.hostState) app.hostState.widget = { ...widgetOriginal, ...widgetDraft };
      }
      app.formDraft = clone(app.formOriginal);
      app.fieldErrors = {};
      renderActiveTab(app);
      setSettingsStatus(app, app.t('saved'), 'success');
    } catch (error) {
      if (error.status === 409) {
        app.fieldErrors.stale = true;
        setSettingsStatus(app, app.t('stale'), 'error');
        const reload = app.root.querySelector('[data-action="settings-reload"]');
        if (reload) reload.hidden = false;
      } else if (error.status === 422) {
        app.fieldErrors = normalizeFieldErrors(error.body && error.body.errors);
        renderActiveTab(app);
        renderErrors(app);
        setSettingsStatus(app, app.t('errorFields'), 'error');
      } else throw error;
    } finally {
      if (button) { button.disabled = false; button.textContent = app.t('save'); }
    }
  }

  function normalizeFieldErrors(errors) {
    const result = {};
    if (!errors || typeof errors !== 'object') return result;
    Object.keys(errors).forEach((sourceKey) => {
      const key = sourceKey.replace(/^chat\./, '').replace(/^leads_delivery\.channels\./, 'leads_delivery.');
      result[key] = Array.isArray(errors[sourceKey]) ? errors[sourceKey].join(' ') : String(errors[sourceKey]);
    });
    return result;
  }

  function renderErrors(app) {
    Object.keys(app.fieldErrors).forEach((key) => {
      if (key === 'stale') return;
      const node = [...app.root.querySelectorAll('[data-error-for]')].find((item) => item.dataset.errorFor === key);
      if (node) { node.textContent = app.fieldErrors[key]; node.hidden = false; }
    });
  }

  function setSettingsStatus(app, message, tone) {
    const status = app.root.querySelector('[data-settings-status]');
    if (status) { status.textContent = message || ''; status.className = `aiwc-status${tone ? ` aiwc-${tone}` : ''}`; }
  }

  async function translateEmptyFields(app, button) {
    const sourceControl = app.root.querySelector('[data-translate-source]');
    const source = (sourceControl && sourceControl.value) || app.formOriginal.default_lang || app.locale;
    if (button) button.disabled = true;
    try {
      const response = await proxy(app, 'POST', 'plugin/chat/translate', { chat_id: app.chatId, lang: app.locale }, { source_language: source });
      const translations = response.translations || {};
      const draft = readSettingsDraft(app);
      Object.keys(translations).slice(0, CHAT_LANGUAGES_MAX).forEach((lang) => {
        const values = translations[lang] || {};
        ['name', 'title', 'tab_label', 'greeting'].forEach((field) => {
          const control = [...app.root.querySelectorAll('[data-field]')].find((node) => node.dataset.field === `texts.${lang}.${field}`);
          const current = draft.texts && draft.texts[lang] && draft.texts[lang][field];
          if (!current && values[field]) {
            setPath(draft, `texts.${lang}.${field}`, values[field]);
            if (control && !control.value) control.value = values[field];
          }
        });
        if (Array.isArray(values.suggestions)) {
          const controls = [...app.root.querySelectorAll('[data-suggestion]')].filter((node) => node.dataset.suggestion === lang);
          const current = (draft.texts && draft.texts[lang] && draft.texts[lang].suggestions) || [];
          const merged = [...current];
          values.suggestions.slice(0, SUGGESTIONS_MAX).forEach((value, index) => {
            if (!merged[index]) merged[index] = value;
            if (controls[index] && !controls[index].value) controls[index].value = value;
          });
          setPath(draft, `texts.${lang}.suggestions`, merged.filter(Boolean).slice(0, SUGGESTIONS_MAX));
        }
      });
      app.formDraft = draft;
      setSettingsStatus(app, app.t('saved'));
      schedulePreview(app);
    } finally { if (button) button.disabled = false; }
  }

  async function testDelivery(app, button) {
    if (button) button.disabled = true;
    try {
      const result = await proxy(app, 'POST', 'plugin/chat/leads/test', { chat_id: app.chatId, lang: app.locale }, {});
      const status = app.root.querySelector('[data-delivery-result]');
      if (status) status.textContent = result.message || app.t('deliveryTestDone');
    } finally { if (button) button.disabled = false; }
  }

  async function uploadIcon(app, file) {
    const allowedType = ['image/png', 'image/jpeg', 'image/webp'].includes(file.type);
    if (!allowedType || file.size > 1024 * 1024) { showFailure(app, { status: 422, body: { message: app.t('uploadError') }, message: app.t('uploadError') }); return; }
    const data = new FormData(); data.append('file', file, file.name);
    try {
      const response = await hostRequest(app, 'icon', 'POST', data, true);
      app.formOriginal.launcher_icon = 'custom';
      app.formOriginal.launcher_icon_url = isSafeImageUrl(response.launcher_icon_url) || '';
      if (app.formDraft) { app.formDraft.launcher_icon = 'custom'; app.formDraft.launcher_icon_url = app.formOriginal.launcher_icon_url; }
      app.data.chat.launcher_icon = 'custom';
      app.data.chat.launcher_icon_url = app.formOriginal.launcher_icon_url;
      const customChoice = app.root.querySelector('[data-custom-icon]');
      if (customChoice) {
        customChoice.hidden = false;
        customChoice.querySelector('input').checked = true;
        customChoice.querySelector('input').dataset.iconUrl = app.formOriginal.launcher_icon_url;
        const image = customChoice.querySelector('img'); if (image) image.src = app.formOriginal.launcher_icon_url;
      } else renderActiveTab(app);
      schedulePreview(app);
      setSettingsStatus(app, response.message || app.t('saved'), 'success');
    } catch (error) { showFailure(app, error); }
  }

  async function deleteIcon(app) {
    const response = await proxy(app, 'DELETE', 'plugin/chat/launcher-icon', { chat_id: app.chatId, lang: app.locale });
    app.formOriginal.launcher_icon = response.launcher_icon || 'chat';
    app.formOriginal.launcher_icon_url = '';
    if (app.formDraft) { app.formDraft.launcher_icon = app.formOriginal.launcher_icon; app.formDraft.launcher_icon_url = ''; }
    app.data.chat.launcher_icon = app.formOriginal.launcher_icon;
    app.data.chat.launcher_icon_url = null;
    renderActiveTab(app);
    setSettingsStatus(app, app.t('saved'), 'success');
  }

  function schedulePreview(app, immediate) {
    clearTimeout(app.previewTimer);
    app.previewTimer = app.win.setTimeout(() => renderPreview(app), immediate ? 0 : 300);
  }

  function renderPreview(app) {
    const mount = app.root.querySelector('[data-preview-mount]');
    if (!mount) return;
    const draft = readSettingsDraft(app);
    const local = readWidgetDraft(app);
    const lang = app.currentTextLang;
    const text = draft.texts && draft.texts[lang] || {};
    const persona = (app.data.chat && app.data.chat.personas || []).find((item) => String(item.id) === String(draft.persona_id)) || {};
    const options = {
      theme: local.theme || 'classic', scheme: local.scheme || draft.scheme || '', color: local.color || '#4f46e5',
      position: local.position || 'right', load: local.load || 'interaction', delay: local.delay || 5,
      voice: local.voice !== false, rating: local.rating !== false,
      aiNotice: draft.ai_notice !== false, greet: app.chatId ? !!draft.greet_popup : true, lang, name: text.name || text.name_fallback || persona.name || '',
      title: text.title || text.title_fallback || persona.title || '', avatar: isSafeImageUrl(persona.avatar) || '',
      greeting: text.greeting || '', suggestions: Array.isArray(text.suggestions) ? text.suggestions : [],
      tabLabel: text.tab_label || text.name || text.name_fallback || persona.name || '',
      launcherIcon: draft.launcher_icon || 'chat', launcherIconUrl: isSafeImageUrl(draft.launcher_icon_url || app.formOriginal.launcher_icon_url) || '',
      height: draft.inline_height || 560, colors: { ...(draft.colors || {}), ...(local.colors || {}) },
      offsetX: local.siteOffsetX || '0', offsetY: local.siteOffsetY || '0'
    };
    const previewToggle = app.root.querySelector('[data-preview-window-toggle]');
    if (previewToggle) {
      previewToggle.hidden = options.theme === 'inline';
      previewToggle.setAttribute('aria-expanded', options.theme === 'inline' || app.previewOpen ? 'true' : 'false');
    }
    mount.hidden = options.theme !== 'inline';
    if (!app.previewMountId) app.previewMountId = `aiwc-preview-${Math.random().toString(36).slice(2, 10)}`;
    mount.id = app.previewMountId;
    mount.dataset.theme = options.theme;
    mount.replaceChildren();
    const base = safeWidgetBase(app.config.widgetBase);
    const error = app.root.querySelector('[data-preview-error]');
    if (!base) {
      if (error) error.hidden = false;
      return;
    }
    if (error) error.hidden = true;

    const iconMap = {};
    optionList(app.data.chat || {}, 'launcher_icons').forEach((icon) => {
      const value = String(icon && icon.value || '');
      const svg = sanitizeSvg(icon && icon.svg || '', app.win);
      if (/^[a-z]{3,12}$/.test(value) && svg) iconMap[value] = svg;
    });
    options.icons = iconMap;
    app.previewOptions = options;
    if (!app.previewScript) {
      const script = app.doc.createElement('script');
      script.async = true;
      const scriptAttributes = {
        ...(app.chatId && app.data.chat && app.data.chat.preview_marker
          ? { 'data-key': String(app.hostState && app.hostState.widget && app.hostState.widget.key || ''), 'data-preview': String(app.data.chat.preview_marker) }
          : (!app.chatId ? { 'data-demo': '1', 'data-preview': '1', 'data-demo-note': app.t('previewDemoNote') } : {})),
        'data-base': base,
        'data-name': options.name || app.t('previewName'), 'data-title': options.title || app.t('consultant'),
        'data-avatar': options.avatar, 'data-tab-label': options.tabLabel, 'data-lang': options.lang,
        'data-mount': app.previewMountId, 'data-height': String(options.height),
        'data-theme': options.theme, 'data-scheme': options.scheme || 'light', 'data-color': options.color,
        'data-position': options.position, 'data-load': options.load, 'data-delay': String(options.delay),
        'data-offset-x': String(options.offsetX), 'data-offset-y': String(options.offsetY),
        'data-voice': options.voice ? '1' : '0', 'data-rating': options.rating ? '1' : '0',
        'data-ai-notice': options.aiNotice ? '1' : '0', 'data-greet': options.greet ? '1' : '0',
        'data-colors': Object.keys(options.colors || {}).filter((name) => String(options.colors[name] || '') !== '').map((name) => `${name}:${options.colors[name]}`).join(';'),
        'data-greeting': JSON.stringify(options.greeting ? { [options.lang]: options.greeting } : {}),
        'data-suggestions': JSON.stringify(options.suggestions || []),
        'data-launcher-icons': JSON.stringify(iconMap), 'data-launcher-icon': options.launcherIcon || 'chat',
        'data-launcher-icon-url': options.launcherIconUrl || ''
      };
      Object.keys(scriptAttributes).forEach((name) => script.setAttribute(name, String(scriptAttributes[name])));
      const nonceSource = app.doc.querySelector('script[nonce]');
      const nonce = nonceSource && (nonceSource.nonce || nonceSource.getAttribute('nonce'));
      if (nonce) script.setAttribute('nonce', nonce);
      script.addEventListener('load', () => {
        app.previewLoaded = true;
        dispatchPreviewOptions(app);
        if (app.previewOpen) app.win.dispatchEvent(new app.win.Event('aiworker:open'));
      });
      script.addEventListener('error', () => { if (error) error.hidden = false; });
      script.src = trustedWidgetScriptUrl(app, previewWidgetUrl(base, Date.now()), base);
      app.previewScript = script;
      (app.doc.head || app.doc.body).appendChild(script);
    } else if (app.previewLoaded) {
      dispatchPreviewOptions(app);
    }
  }

  function dispatchPreviewOptions(app) {
    if (!app.previewOptions || !app.previewLoaded || typeof app.win.CustomEvent !== 'function') return;
    app.win.dispatchEvent(new app.win.CustomEvent('aiworker-preview-options', { detail: app.previewOptions }));
  }

  function togglePreview(app) {
    app.previewOpen = !app.previewOpen;
    const widget = app.doc.querySelector('.aiw-win:not(.aiw-inline)');
    if (app.previewOpen) {
      app.win.dispatchEvent(new app.win.Event('aiworker:open'));
    } else {
      const close = widget && widget.querySelector('.aiw-close');
      if (close) close.click();
    }
    const button = app.root.querySelector('[data-preview-window-toggle]');
    if (button) {
      button.textContent = app.t(app.previewOpen ? 'closeChatWindow' : 'openChatWindow');
      button.setAttribute('aria-expanded', app.previewOpen ? 'true' : 'false');
    }
  }

  function safeWidgetBase(value) {
    try {
      const url = new URL(String(value || ''));
      const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
      if ((url.protocol !== 'https:' && !(url.protocol === 'http:' && local)) || url.username || url.password || url.search || url.hash) return '';
      return url.href.replace(/\/$/, '');
    } catch (_) { return ''; }
  }

  function previewWidgetUrl(base, timestamp) {
    const safeBase = safeWidgetBase(base);
    return safeBase ? `${safeBase}/widget.js?v=${encodeURIComponent(String(timestamp))}` : '';
  }

  function trustedWidgetScriptUrl(app, value, base) {
    const trustedTypes = app.win.trustedTypes;
    if (!trustedTypes || typeof trustedTypes.createPolicy !== 'function') return value;
    if (!app.previewPolicy) {
      app.previewPolicy = trustedTypes.createPolicy('aiworker-chat-loader', {
        createScriptURL(candidate) {
          const url = new URL(String(candidate));
          const allowed = new URL(`${base}/`);
          if (url.protocol !== allowed.protocol || url.origin !== allowed.origin || !url.href.startsWith(allowed.href)) throw new TypeError('Unexpected widget preview URL');
          return url.href;
        }
      });
    }
    return app.previewPolicy.createScriptURL(value);
  }

  async function syncNow(app) {
    const currentJob = app.knowledgeStatus && app.knowledgeStatus.sync_job || {};
    if (app.syncStarting || syncJobIsActive(currentJob)) return;
    app.syncStarting = true;
    if (app.selectedTab === 'knowledge') renderActiveTab(app);
    try {
      const response = await hostRequest(app, 'sync', 'POST', { scope: 'all' });
      if (response.job_id) {
        const job = { id: String(response.job_id), status: response.job_status || 'queued', progress: null, result: null };
        app.knowledgeStatus = { ...(app.knowledgeStatus || {}), status_pending: true, sync_job: job };
        app.knowledgeStatusError = '';
        showStatus(app, app.t(job.status === 'running' ? 'syncJobRunning' : 'syncJobQueued'), 'success');
        if (app.selectedTab === 'knowledge') renderActiveTab(app);
        startSyncJobPoll(app, job.id);
      } else {
        app.syncStarting = false;
        showStatus(app, response.message || app.t('syncStarted'), 'success');
        await loadKnowledgeStatus(app);
      }
    } catch (error) {
      app.syncStarting = false;
      showFailure(app, error);
      if (app.selectedTab === 'knowledge') renderActiveTab(app);
    }
  }

  function startSyncJobPoll(app, jobId) {
    if (app.syncPollPromise && app.syncPollJobId === jobId) return app.syncPollPromise;
    app.syncPollJobId = jobId;
    app.syncStarting = true;
    app.syncPollPromise = pollSyncJob(app, jobId).finally(() => {
      app.syncPollPromise = null;
      app.syncPollJobId = '';
    });
    return app.syncPollPromise;
  }

  async function pollSyncJob(app, jobId) {
    let attempt = 0;
    while (true) {
      await new Promise((resolve) => app.win.setTimeout(resolve, syncPollDelay(attempt)));
      let status;
      try {
        status = await hostRequest(app, 'sync/status');
      } catch (error) {
        app.knowledgeStatusError = error.message || app.t('knowledgeStatusUnavailable');
        if (app.selectedTab === 'knowledge') renderActiveTab(app);
        showFailure(app, error, app.root.querySelector('[data-sync-status]'));
        attempt++;
        continue;
      }
      attempt++;
      app.knowledgeStatus = status;
      app.knowledgeStatusError = knowledgeStatusError(status, app.t);
      const job = status.sync_job || {};
      if (job.id && String(job.id) !== jobId) jobId = String(job.id);
      if (app.selectedTab === 'knowledge') renderActiveTab(app);
      if (['completed', 'completed_with_warnings', 'failed'].includes(job.status)) {
        const label = { completed: 'syncJobCompleted', completed_with_warnings: 'syncJobWarning', failed: 'syncJobFailed' }[job.status];
        const summary = job.status === 'failed' ? syncJobPartialSummary(job, app.t, app.locale) : syncJobSummary(job, app.t, app.locale);
        const detail = job.status === 'failed' && job.error ? ` ${app.t('syncJobFailureDetail').replace(':error', syncJobError(job.error, app.t))}` : '';
        app.syncStarting = false;
        if (app.selectedTab === 'knowledge') renderActiveTab(app);
        showStatus(app, [app.t(label), summary].filter(Boolean).join(' ')+detail, job.status === 'failed' ? 'error' : 'success');
        return;
      }
    }
  }

  async function saveSyncSettings(app) {
    const pagesControl = app.root.querySelector('[data-sync-setting="sync-pages"]');
    const productsControl = app.root.querySelector('[data-sync-setting="sync-products"]');
    const pagesEnabled = !!(pagesControl && pagesControl.checked);
    const productsEnabled = !!(productsControl && productsControl.checked);
    const sync = app.hostState && app.hostState.sync || {};
    const response = await hostRequest(app, 'settings', 'POST', {
      sync: {
        pages: { enabled: pagesEnabled, sources: sync.pages && sync.pages.sources || [] },
        products: { enabled: productsEnabled }
      }
    });
    if (response.state) app.hostState = response.state;
    else if (app.hostState) app.hostState.sync = { ...sync, pages: { ...(sync.pages || {}), enabled: pagesEnabled }, products: { ...(sync.products || {}), enabled: productsEnabled } };
    showInlineNotice(app, '[data-sync-settings-status]', app.t('savedLocal'));
  }

  async function refreshKnowledgeLists(app) {
    const results = await batch(app, ['sources', 'faq'], { chat_id: app.chatId, lang: app.locale });
    app.data.sources = resultBody(results.sources);
    app.data.faq = resultBody(results.faq);
    if (app.selectedTab === 'knowledge') renderActiveTab(app);
  }

  async function sourceAdd(app, button) {
    const typeControl = app.root.querySelector('[data-source-type]');
    const urlControl = app.root.querySelector('[data-source-url]');
    const textControl = app.root.querySelector('[data-source-text]');
    const titleControl = app.root.querySelector('[data-source-title]');
    const type = typeControl ? typeControl.value : 'url';
    const url = urlControl ? urlControl.value : '';
    const text = textControl ? textControl.value : '';
    const title = titleControl ? titleControl.value : '';
    if (button) button.disabled = true;
    try {
      await proxy(app, 'POST', 'plugin/sources', { chat_id: app.chatId, lang: app.locale }, { type, url, text, title });
      await refreshKnowledgeLists(app);
    } finally { if (button) button.disabled = false; }
  }

  async function sourceAction(app, action, button) {
    const id = String(button.dataset.id || '');
    if (!/^\d{1,10}$/.test(id)) return;
    if (action === 'source-delete' && !await askConfirm(app, app.t('confirmDelete'), button.textContent)) return;
    const query = { chat_id: app.chatId, lang: app.locale, id };
    if (action === 'source-delete') await proxy(app, 'DELETE', `plugin/sources/${id}`, query);
    else await proxy(app, 'POST', `plugin/sources/${id}/refresh`, query, {});
    await refreshKnowledgeLists(app);
  }

  async function faqAction(app, action, button) {
    const dialog = button.closest('[data-faq-dialog]');
    if (action === 'faq-delete' && !await askConfirm(app, app.t('confirmDelete'), button.textContent)) return;
    try {
      await faqWrite(app, action, button);
    } catch (error) {
      const notice = dialog.querySelector('[data-faq-notice]');
      notice.replaceChildren();
      showFailure(app, error, notice);
      return;
    }
    app.faqView.top = dialog.scrollTop;
    app.faqView.saved = true;
    await refreshKnowledgeLists(app);
  }

  async function faqWrite(app, action, button) {
    const row = button.closest('[data-faq-id]') || button.parentElement;
    const id = String(button.dataset.id || row.dataset.faqId || '');
    if (action === 'faq-delete') {
      await proxy(app, 'DELETE', 'plugin/faq', { chat_id: app.chatId, lang: app.locale, id });
    } else {
      const questionControl = row.querySelector('[data-faq-question]');
      const answerControl = row.querySelector('[data-faq-answer]');
      const question = questionControl ? questionControl.value : '';
      const answer = answerControl ? answerControl.value : '';
      const method = id ? 'PATCH' : 'POST';
      await proxy(app, method, 'plugin/faq', { chat_id: app.chatId, lang: app.locale, ...(id ? { id } : {}) }, { ...(id ? { id } : {}), question, answer });
    }
  }

  async function dispatchAction(app, action, button) {
    try {
      if (action === 'setup-toggle') {
        app.detailsOpen = !app.detailsOpen;
        updateSetupView(app);
      } else if (action === 'mcp-copy') {
        await copyMcpPrompt(app, button);
      } else if (action === 'connect') {
        if (app.config.demo) { showStatus(app, app.t('demoConnect')); return; }
        app.connectionNotice = '';
        app.connectionExpired = false;
        const url = new URL(`${app.endpoint}/connect`, app.win.location.href);
        const opened = app.win.open(url.href, '_blank', 'noopener,noreferrer');
        if (opened) opened.opener = null;
        showStatus(app, app.t('connectWindow'));
        startConnectPolling(app);
      } else if (action === 'retry') {
        await loadState(app);
      } else if (action === 'link-chat') {
        await linkSelectedChat(app);
      } else if (action === 'connect-chat') {
        const chatId = String(button.dataset.chatId || '');
        if (chatId) {
          button.disabled = true;
          if (!await linkChat(app, [chatId])) button.disabled = false;
        }
      } else if (action === 'chat-add') {
        const chats = Array.isArray(app.hostState && app.hostState.chats) ? app.hostState.chats : [];
        const empty = chats.find((chat) => !chat.key);
        if (empty) {
          // an empty chat left by an older version is the place for the new one
          app.showChatChoices = true;
          if (String(empty.id) !== app.localChatId) { app.localChatId = String(empty.id); await loadState(app); }
          const choices = app.root.querySelector('#aiwc-chat-choices');
          if (choices) choices.hidden = false;
          return;
        }
        app.formDraft = readSettingsDraft(app);
        app.addingChat = true;
        renderActiveTab(app);
        if (!app.root.querySelector('#aiwc-chat-choices')) app.root.querySelector('[data-widget-key]').focus();
      } else if (action === 'chat-add-cancel') {
        app.formDraft = readSettingsDraft(app);
        app.addingChat = false;
        app.connectionNotice = '';
        renderActiveTab(app);
      } else if (action === 'chat-remove') {
        if (!await askConfirm(app, app.t('removeChatConfirm'), button.textContent)) return;
        const response = await hostRequest(app, 'chats/remove', 'POST', {});
        app.localChatId = String(response.chats && response.chats[0] || '');
        app.showChatChoices = false;
        await loadState(app);
      } else if (action === 'disconnect') {
        await hostRequest(app, 'disconnect', 'POST', {});
        app.lastError = '';
        app.connectionNotice = '';
        app.showChatChoices = false;
        await loadState(app);
      } else if (action === 'hide-chat-choices') {
        app.formDraft = readSettingsDraft(app);
        app.showChatChoices = false;
        renderActiveTab(app);
      } else if (action === 'show-chat-choices') {
        app.showChatChoices = true;
        const state = button.closest('.aiwc-chat-picker-state');
        if (state) {
          const host = app.hostState || {};
          const widget = host.widget || {};
          const chats = Array.isArray(app.data.me && app.data.me.chats) ? app.data.me.chats : [];
          state.replaceChildren();
          renderAccountChats(app, state, chats);
          if (widget.key) state.appendChild(makeNode(app.doc, 'p', 'aiwc-help', app.t('keyAutoHelp')));
        }
      } else if (action === 'manual-key-save') {
        await saveManualKey(app, button);
      } else if (action === 'color-reset') {
        const name = String(button.dataset.colorReset || '');
        const color = app.root.querySelector(`[data-widget-field="colors.${cssEscape(name)}"]`);
        if (color) { color.value = '#ffffff'; color.dataset.emptyColor = '1'; schedulePreview(app); }
      } else if (action === 'telegram-link') {
        await openTelegramLink(app, button);
      } else if (action === 'preview-toggle') {
        togglePreview(app);
      } else if (action === 'wizard-send') {
        await sendWizardAsk(app);
      } else if (action === 'wizard-apply' || action === 'wizard-discard' || action === 'wizard-clear') {
        await wizardAction(app, action.slice(7));
      } else if (action === 'settings-save') {
        await saveSettings(app, button);
      } else if (action === 'settings-reload') {
        app.fieldErrors = {};
        await loadState(app);
      } else if (action === 'translate') {
        await translateEmptyFields(app, button);
      } else if (action === 'test-delivery') {
        await testDelivery(app, button);
      } else if (action === 'icon-delete') {
        await deleteIcon(app, button);
      } else if (action === 'sync-now') {
        await syncNow(app, button);
      } else if (action === 'sync-settings') {
        await saveSyncSettings(app);
      } else if (action === 'source-add') {
        await sourceAdd(app, button);
      } else if (action === 'source-refresh' || action === 'source-delete') {
        await sourceAction(app, action, button);
      } else if (action === 'faq-save' || action === 'faq-delete') {
        await faqAction(app, action, button);
      } else if (action === 'faq-clear') {
        await faqClear(app, button);
      } else if (['faq-open', 'faq-close', 'faq-add', 'faq-cancel', 'faq-page'].includes(action)) {
        faqControl(app, action, button);
      }
    } catch (error) {
      showFailure(app, error);
    }
  }

  function cssEscape(value) {
    return String(value).replace(/[^a-zA-Z0-9_-]/g, (char) => `\\${char}`);
  }

  return {
    mount, safePanelUrl, safeWizardHref, parseWizardText, sanitizeSvg, svgDataUrl, svgImage,
    connectionSteps, connectionNoticeFromLocation, connectionNoticeForLink, shouldFetchChatData, unlinkedAccountBlocks,
    makeProxyCall, buildSettingsDiff, buildWidgetDiff, clampLimit, boundChatLimits, normalizeChatResponse, usageMeters, previewWidgetUrl, pluralIndex, pluralChoose,
    shouldFetchStats, showFailure, syncJobIsActive, syncPollDelay, knowledgeStatusError, syncJobSummary, syncJobPartialSummary, syncJobError, syncJobProgress
  };
})();

{ AIWC };

window.AIWorkerChatAdmin={mount:function(el,config){return AIWC.mount(el,config,AIWC_I18N)},version:"0.1.0"};
})();
