
 // 为每个类别添加点击事件监听器并更新激活状态
        document.querySelectorAll('.top-categories .category').forEach(category => {
          category.addEventListener('click', function(event) {
            // 移除其他所有类别的激活状态
            document.querySelectorAll('.top-categories .category').forEach(cat => {
              cat.classList.remove('active');
            });

            // 添加激活状态到当前点击的类别
            category.classList.add('active');

            // 切换应用容器的显示
            var containerId = category.id + '-apps-container';
            toggleAppContainer(containerId);
          });
        });

        // 为Planning类别添加点击事件监听器
        document.getElementById('category-planning').addEventListener('click', function() {
          toggleAppContainer('planning-apps-container');
        });

        // 为Machining类别添加点击事件监听器
        document.getElementById('category-machining').addEventListener('click', function() {
          toggleAppContainer('machining-apps-container');
        });

        document.getElementById('category-monitoring').addEventListener('click', function() {
          toggleAppContainer('monitoring-apps-container');
        });

        document.getElementById('category-community').addEventListener('click', function() {
          toggleAppContainer('community-apps-container');
        });

        document.getElementById('category-utility').addEventListener('click', function() {
          toggleAppContainer('utility-apps-container');
        });



        // 封装切换应用容器显示的函数
        // 封装切换应用容器显示的函数
        function toggleAppContainer(containerId) {
          var container = document.getElementById(containerId);

          // 隐藏所有其他应用容器
          document.querySelectorAll('.apps-container').forEach(function(cont) {
            cont.classList.remove('active');
          });

          // 切换当前容器的active类
          container.classList.toggle('active');
        }
// 获取所有应用图标和子页面空白区域
        const appIcons = document.querySelectorAll('.app-icon');
        const categorySubpage = document.querySelector('.apps-container');

        // 自定义右键菜单元素
        const customContextMenuApp = document.createElement('div');
        const customContextMenuSubpage = document.createElement('div');

        // 为应用图标设置菜单项
        customContextMenuApp.innerHTML = `
          <button id="deleteButton">Delete</button>
          <button id="renameButton">Rename</button>
        `;
        document.body.appendChild(customContextMenuApp);

        // 为子页面空白区域设置菜单项
        customContextMenuSubpage.innerHTML = `
          <button id="addButton">Add</button>
        `;
        document.body.appendChild(customContextMenuSubpage);

        // 设置样式（可根据需要自定义）
        customContextMenuApp.classList.add('custom-context-menu');
        customContextMenuSubpage.classList.add('custom-context-menu');


        // 为整个应用容器（apps-container）添加右键点击事件监听器
        document.querySelectorAll('.apps-container').forEach(container => {
            container.addEventListener('contextmenu', function(event) {
                event.preventDefault(); // 阻止默认的上下文菜单

                // 确保点击的不是app-icon
                if (!event.target.closest('.app-icon')) {
                    // 显示添加按钮
                    document.getElementById('addButton').style.display = 'block';
                    // 隐藏删除和重命名按钮
                    document.getElementById('deleteButton').style.display = 'none';
                    document.getElementById('renameButton').style.display = 'none';
                    // 显示自定义菜单，并调整位置
                    customContextMenuSubpage.style.left = `${event.pageX}px`;
                    customContextMenuSubpage.style.top = `${event.pageY}px`;
                    customContextMenuSubpage.classList.add('visible');
                    // Store the current category ID in a data attribute
                    customContextMenuSubpage.dataset.categoryId = this.id;
                }
            });
        });


        appIcons.forEach(icon => {
            icon.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                // 显示删除和重命名按钮
                document.getElementById('deleteButton').style.display = 'block';
                document.getElementById('renameButton').style.display = 'block';
                // 隐藏添加按钮
                document.getElementById('addButton').style.display = 'none';
                // 显示自定义菜单，并调整位置
                customContextMenuApp.style.left = `${event.pageX}px`;
                customContextMenuApp.style.top = `${event.pageY}px`;
                customContextMenuApp.classList.add('active');
            });
        });

        // 子页面空白区域的右键事件
        categorySubpage.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            customContextMenuSubpage.style.left = `${event.pageX}px`;
            customContextMenuSubpage.style.top = `${event.pageY}px`;
            customContextMenuSubpage.classList.add('active');
        });




                // 显示smallModal模态框的函数
        function showAddListModal(categoryId) {
            const smallModal = document.getElementById('smallModal');
            smallModal.style.display = 'block';
            document.getElementById('current-category-name').textContent = categoryId;

            // 给smallModal中的每个应用添加点击事件
            const appIcons = smallModal.querySelectorAll('.app-icon');
            appIcons.forEach(appIconLink => {
                appIconLink.addEventListener('click', function(event) {
                    event.preventDefault(); // 阻止<a>标签的默认点击行为
                    const iconSrc = this.querySelector('img').src;
                    const iconName = this.querySelector('img').alt;
                    const iconHref = this.getAttribute('href'); // 获取当前点击的<a>标签的链接地址

                    // 将选中的应用添加到指定的类别中
                    addIconToCategory(categoryId, iconSrc, iconName, iconHref);

                    // 关闭smallModal模态框
                    smallModal.style.display = 'none';
                });
            });
        }

        // 为类别页面的空白区域绑定右键事件
        document.querySelectorAll('.apps-container').forEach(container => {
            container.addEventListener('contextmenu', function(event) {
                // Check if the blank area was clicked, not an app icon
                if (!event.target.closest('.app-icon')) {
                    event.preventDefault(); // Prevent the default context menu
                    // Display the custom context menu with the "Add" button
                    customContextMenuSubpage.style.left = `${event.pageX}px`;
                    customContextMenuSubpage.style.top = `${event.pageY}px`;
                    customContextMenuSubpage.classList.add('active');
                    // Store the current category ID in a data attribute
                    customContextMenuSubpage.dataset.categoryId = this.id;
                }
            });
        });

        // Click event for the "Add" button in the custom context menu
        document.getElementById('addButton').addEventListener('click', function() {
            // Retrieve the stored category ID from the data attribute
            const categoryId = customContextMenuSubpage.dataset.categoryId;
            // Call the function to show the modal for adding an app
            showAddListModal(categoryId);
            // Hide the custom context menu by removing the 'active' class
            customContextMenuSubpage.classList.remove('active');
            // Additionally, hide the 'addButton' explicitly
            this.style.display = 'none'; // This line hides the 'add' button explicitly
        });




        // 全局点击事件，用于隐藏自定义右键菜单
        document.addEventListener('click', () => {
            customContextMenuApp.classList.remove('active');
            customContextMenuSubpage.classList.remove('active');
        });