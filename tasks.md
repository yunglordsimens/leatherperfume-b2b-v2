1. Применить кастомный шрифт к заголовкам

    В assets/base.css пропиши для h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 свойство font-family: 'Yeseva One', serif;. Убедись, что в theme.liquid загружен @font-face из assets.

2. Исправить иконки в Contact Us

    Найди в sections/contact-b2b.liquid все иконки, оставшиеся от React (Mail, Phone, MessageCircle, Building2, Clock). Замени их на inline SVG 20×20, stroke-width 2, цвет наследуемый.

3. Уточнить CSS в Massy Form Wrapper

    Открой sections/massy-form-wrapper.liquid. Замени все селекторы типа [class*="label"] на прямые теги внутри .massy-form-container: input, select, label, button[type="submit"]. Убедись, что поля выглядят как в React-макете (скругления, фон, фокус).

4. Восстановить Footer

    Проверь config/settings_data.json на наличие блока footer-lp или footer. Если настройки пустые — заполни их тестовыми данными: ссылки, контакты, копирайт. Можно сделать через кастомайзер.

5. Настроить теги и метаполя клиентов (админка Shopify, не Claude)

    Вручную в Shopify Admin: Settings → Custom data → Customers. Создай метаполя company_name (текст), discount_tier (текст), discount_percentage (число). Присвой тестовому клиенту тег wholesale и заполни метаполя.

6. Починить языковой переключатель

    В sections/header.liquid в блоке .header-lang__dropdown замени ссылки ?locale=en на три POST-формы form 'localization' со скрытыми input name="locale_code". Убедись, что стандартный localization-form отключён в кастомайзере.

7. Кнопка логина → Partner Login

    В sections/header.liquid измени ссылку кнопки «Log In» с /account/login на /pages/partner-login. Создай URL Redirect в Shopify Admin: /account/login → /pages/partner-login.

8. Иконки поиска и корзины

    В header.liquid замени кнопку поиска на минималистичную SVG-лупу 22×22. Замени стандартный SVG корзины на кастомный из React-макета. Обе иконки должны быть одного размера.

9. MOQ-трекер

    В sections/cart-summary-b2b.liquid добавь JavaScript, который читает сумму корзины из {{ cart.total_price }} (в центах), сравнивает с MOQ-порогом из настроек секции и обновляет ширину .moq-bar. Если MOQ достигнут — разблокирует кнопку отправки.

10. Логика «Add to Order» в каталоге

    В sections/product-grid-b2b.liquid (если уже создана) добавь JavaScript для AJAX-добавления товара в корзину через /cart/add.js. После успеха показывать мини-уведомление.

11. Создать недостающие секции (Cart Items, Cart Success, Collection Page)

    ...
    (Здесь будут промпты для создания новых секций по имеющимся макетам)

12. Проверить адаптив (брейкпоинты)

    Увеличь брейкпоинт мобильного меню с 990px до 1024px или 1100px во всех CSS-файлах.
