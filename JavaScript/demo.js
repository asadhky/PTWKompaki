

        // 为每个类别添加点击事件监听器并更新激活状态
        document.querySelectorAll('.top-categories .category').forEach(category => {
            category.addEventListener('click', function(event) {
                  // 移除其他所有类别的激活状态
                  document.querySelectorAll('.top-categories .category').forEach(cat => {
                    cat.classList.remove('active');
                  });

                  // 添加激活状态到当前点击的类别
                  category.classList.add('active');
                  console.log("categorierId:", category.id)
                  // 切换应用容器的显示
                  var containerId = category.id + '-apps-container';
                  console.log("containerId:", containerId); // 输出containerId的值
                  toggleAppContainer(containerId);
                  hideCustomContextMenus(); // 点击类别时隐藏菜单
                  showApps(this.id + '-apps-container'); // 确保传递正确的ID格式
            });
      });

      // 为Planning类别添加点击事件监听器
      document.getElementById('category-planning').addEventListener('click', function() {
        toggleAppContainer('category-planning-apps-container');
      });

      // 为Machining类别添加点击事件监听器
      document.getElementById('category-machining').addEventListener('click', function() {
        toggleAppContainer('category-machining-apps-container');
      });

      document.getElementById('category-monitoring').addEventListener('click', function() {
        toggleAppContainer('category-monitoring-apps-container');
      });

      document.getElementById('category-community').addEventListener('click', function() {
        toggleAppContainer('category-community-apps-container');
      });

      document.getElementById('category-utility').addEventListener('click', function() {
        toggleAppContainer('category-utility-apps-container');
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

      // 全局变量定义
      let currentCategoryId = null;

      // 获取所有应用图标和子页面空白区域
      // const appIcons = document.querySelectorAll('.app-icon');
      // const categorySubpage = document.querySelector('.apps-container');

      // 自定义右键菜单元素
      const customContextMenuApp = document.createElement('div');
      customContextMenuApp.id = 'customContextMenuApp'; // 设置元素的ID
      const customContextMenuSubpage = document.createElement('div');
      customContextMenuSubpage.id = 'customContextMenuSubpage'; // 设置元素的ID

      // 将自定义右键菜单元素添加到页面中
      document.body.appendChild(customContextMenuApp);
      document.body.appendChild(customContextMenuSubpage);

      // 为应用图标设置菜单项
      customContextMenuApp.innerHTML = `
        <button id="deleteButton">Delete</button>
        <button id="renameButton">Rename</button>
      `;

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
                  customContextMenuSubpage.style.left = `${event.pageX}px`;
                  customContextMenuSubpage.style.top = `${event.pageY}px`;
                  customContextMenuSubpage.classList.add('visible');
                  // 存储当前类别ID在数据属性中
                  customContextMenuSubpage.dataset.categoryId = this.id;
              } else {
                  // 如果是app-icon，执行相应的操作
                  const currentApp = event.target.closest('.app-icon');
                  const customContextMenu = document.getElementById('customContextMenuApp');

                  if (customContextMenu) {
                      customContextMenu.style.left = `${event.pageX}px`;
                      customContextMenu.style.top = `${event.pageY}px`;
                      customContextMenu.classList.add('visible');
                  } else {
                      console.error('customContextMenuApp element not found');
                  }

                  // 给删除按钮添加点击事件监听器
                  const deleteButton = customContextMenu.querySelector('#deleteButton');
                  deleteButton.onclick = function(event) {
                      currentApp.parentNode.removeChild(currentApp);
                      customContextMenu.classList.remove('visible');
                  };

                  // 给重命名按钮添加点击事件监听器
                  const renameButton = customContextMenu.querySelector('#renameButton');
                  renameButton.onclick = function(event) {
                      const newName = prompt("Enter the new name for the app:", "");
                      if (newName !== null && newName !== "") {
                          // 假设应用名称是紧跟在图标之后的元素，这里需要根据实际情况调整
                          const appNameElement = currentApp.querySelector('.app-label');
                          if (appNameElement) {
                              appNameElement.textContent = newName;
                          }
                      }
                      customContextMenu.classList.remove('visible');
                  };
              }
          });
      });



      // Click event for the "Add" button in the custom context menu
      document.getElementById('addButton').addEventListener('click', function() {
          hideCustomContextMenus(); // 添加这行代码来隐藏菜单
          // Retrieve the stored category ID from the data attribute
          const categoryId = customContextMenuSubpage.dataset.categoryId;
          // Call the function to show the modal for adding an app
          console.log("categoryId:", categoryId)
          if (categoryId) {
              showAddListModal(categoryId);
          }else {
              const smallModal = document.getElementById('smallModal');
              smallModal.style.display = 'block';
          }
      });

      // 显示应用图标的函数，这里需要根据实际情况实现
      function showApps(appsContainerId, categoryName) {
          // Hide all app icon containers before showing the selected one
          document.querySelectorAll('.app-icons-container').forEach(container => {
              container.classList.remove('active');
          });

          // Remove the 'selected-category' class from all category items
          document.querySelectorAll('.app-category-item').forEach(item => {
              item.classList.remove('selected-category');
          });

          // Add 'active' class to the selected app icon container
          var appsContainer = document.getElementById(appsContainerId);
          if (appsContainer) {
              appsContainer.classList.add('active');
          }

          // Add 'selected-category' class to the clicked category item
          var currentCategoryItem = document.querySelector(`[onclick*='${appsContainerId}']`);
          if (currentCategoryItem) {
              currentCategoryItem.classList.add('selected-category');
          }

          // Update the category name display
          var currentCategoryNameElement = document.getElementById('current-category-name');
          if (currentCategoryNameElement) {
              currentCategoryNameElement.textContent = categoryName;
          }
      }

      function addIconToCategory(iconSrc, iconName, iconHref) {

          if (!currentCategoryId) {
              targetContainer = document.querySelector('.fixed-bottom-bar');

              // 创建新图标的元素
              const newLink = document.createElement('a');
              newLink.href = iconHref; // 设置新图标的链接地址
              newLink.className = 'app-icon';

              const newIcon = document.createElement('img');
              newIcon.src = iconSrc;
              newIcon.alt = iconName;
              newLink.appendChild(newIcon);

              const newLabel = document.createElement('div'); // 用span而不是div，保持一致性
              newLabel.textContent = iconName;
              newLink.appendChild(newLabel);

              // 将新图标添加到目标容器中
              targetContainer.appendChild(newLink);
              handleLayoutChange();
          }else {
              const fullCategoryId = currentCategoryId.endsWith('-apps-container') ?
                         currentCategoryId :
                         currentCategoryId + '-apps-container';

              console.log("点击类别后的 currentCategoryId:", currentCategoryId);
              const categoryAppsContainer = document.getElementById(fullCategoryId);
              if (!categoryAppsContainer) {
                  console.error('Category apps container not found:', fullCategoryId);
                  return;
              }

              // 创建新图标的元素
              const newLink = document.createElement('a');
              newLink.href = iconHref; // 设置新图标的链接地址
              newLink.className = 'app-icon';

              const newIcon = document.createElement('img');
              newIcon.src = iconSrc;
              newIcon.alt = iconName;
              newLink.appendChild(newIcon);

              const newLabel = document.createElement('div');
              newLabel.className = 'app-label';
              newLabel.textContent = iconName;


              newLink.appendChild(newLabel);

              // 将新图标添加到当前类别的应用容器中
              categoryAppsContainer.appendChild(newLink);
              showModal('smallModal', false);
              handleLayoutChange();

          }


      }

      console.log("点击类别后的 currentCategoryId:", currentCategoryId);

      // add list 里图标的点击事件
      document.querySelector('.small-modal-content').addEventListener('click', function(event) {
          const icon = event.target.closest('.app-icon');
          if (icon) {
              event.preventDefault();
              // 获取图标信息
              const iconSrc = icon.querySelector('img').src;
              const iconName = icon.querySelector('img').alt;
              const iconHref = icon.getAttribute('href');

              // 隐藏模态框
              document.getElementById('smallModal').style.display = 'none';
              hideCustomContextMenus(); // 添加图标后隐藏菜单
              handleLayoutChange();
          }
      });


      // 为顶部的每个类别绑定点击事件，以便知道当前活跃的类别是什么
      document.querySelectorAll('.top-categories .category').forEach(category => {
        category.addEventListener('click', function(event) {
          // 设置当前类别的ID
          currentCategoryId = this.id + '-apps-container'; // 之前是 this.id + '-apps-container'
          console.log("点击类别后的 currentCategoryId:", currentCategoryId);
          hideCustomContextMenus(); // 点击类别时隐藏菜单
          showApps(this.id + '-apps-container'); // 确保传递正确的ID格式
        });
      });

      // 修改2: 统一上下文菜单的显示和隐藏逻辑
      function hideCustomContextMenus() {
        customContextMenuApp.classList.remove('visible');
        customContextMenuSubpage.classList.remove('visible');
      }


      // 绑定模态框中的每个应用图标的点击事件
      document.querySelectorAll('.small-modal-content .app-icon').forEach(appIconLink => {
            appIconLink.addEventListener('click', function(event) {
                  event.preventDefault(); // 阻止<a>标签的默认点击行为

                  // 获取图标信息
                  const iconSrc = this.querySelector('img').src;
                  const iconName = this.querySelector('img').alt;
                  const iconHref = this.getAttribute('href'); // 获取当前点击的<a>标签的链接地址

                  // 添加图标到当前类别
                  addIconToCategory(iconSrc, iconName, iconHref);

                  // 隐藏模态框
                  document.getElementById('smallModal').style.display = 'none';
                  hideCustomContextMenus(); // 添加图标后隐藏菜单
                  handleLayoutChange();
            });
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
                  addIconToCategory(fullCategoryId, iconSrc, iconName, iconHref);

                  // 关闭smallModal模态框
                  smallModal.style.display = 'none';
              });
          });
      }

      function addIconToBottomBar(iconSrc, iconName, iconHref) {
          const bottomBar = document.querySelector('.fixed-bottom-bar');

          // 创建新图标的元素
          const newLink = document.createElement('a');
          newLink.href = iconHref; // 设置新图标的链接地址
          newLink.className = 'icon-button';

          const newIcon = document.createElement('img');
          newIcon.src = iconSrc;
          newIcon.alt = iconName;
          newLink.appendChild(newIcon);

          const newLabel = document.createElement('span');
          newLabel.textContent = iconName;
          newLink.appendChild(newLabel);

          // 将新图标添加到底部菜单栏中
          bottomBar.appendChild(newLink);
      }

      // 为底部菜单栏添加右键点击事件监听
      document.querySelector('.fixed-bottom-bar').addEventListener('contextmenu', function(event) {
          event.preventDefault(); // 阻止默认的上下文菜单

          const target = event.target;

          // 判断点击的是否为图标按钮
          if (target.classList.contains('icon-button') || target.closest('.icon-button')) {
              const clickedIcon = target.closest('.icon-button');
              // 显示自定义菜单并调整位置到鼠标点击处
              customContextMenuApp.style.left = `${event.pageX}px`;
              customContextMenuApp.style.top = `${event.pageY}px`;
              customContextMenuApp.classList.add('visible');

              // 给删除按钮添加事件监听器
              document.getElementById('deleteButton').onclick = function() {
                  clickedIcon.remove(); // 删除点击的图标
                  customContextMenuApp.classList.remove('visible'); // 隐藏菜单
              };

              // 给重命名按钮添加事件监听器
              document.getElementById('renameButton').onclick = function() {
                  const newName = prompt('Enter the new name:');
                  if (newName) {
                      clickedIcon.querySelector('img').alt = newName; // 假设你想修改图片的 alt 属性为新名称
                      // 这里可能还需要更新显示名称的部分，这取决于你的HTML结构
                  }
                  customContextMenuApp.classList.remove('visible'); // 隐藏菜单
                  handleLayoutChange();
              };

          } else {
              // 如果点击的是空白区域，则显示添加菜单
              customContextMenuSubpage.style.left = `${event.pageX}px`;
              customContextMenuSubpage.style.top = `${event.pageY}px`;
              customContextMenuSubpage.classList.add('visible');

              // 给添加按钮添加事件监听器
              document.getElementById('addButton').onclick = function() {
                  // 实现添加图标的逻辑
                  // 这可能包括弹出一个模态框让用户选择或输入新应用的信息
                  customContextMenuSubpage.classList.remove('visible'); // 隐藏菜单
                  handleLayoutChange();
              };
          }
      });





      // 全局点击事件，用于隐藏自定义菜单
      document.addEventListener('click', function(event) {
          if (!event.target.closest('.custom-context-menu')) {
              customContextMenuApp.classList.remove('visible');
              customContextMenuSubpage.classList.remove('visible');
          }
      });



      //============================================================
      // 获取模态框元素
      var customerServiceModal = document.getElementById("customer-service-modal");
      var aiChatModal = document.getElementById("AI-chat-modal");
      var helpServiceModal = document.getElementById("help-service-modal")
      var settingModal = document.getElementById("setting-modal")
      var monitoringModal = document.getElementById("monitoring-modal")
      var searchModal = document.getElementById("search-modal")

      // 获取打开模态框的按钮元素
      var customerServiceBtn = document.getElementById("customer-service-button");
      var aiChatBtn = document.getElementById("AI-chat-button");
      var helpServiceBtn = document.getElementById("help-service-button")
      var settingBtn = document.getElementById("setting-button")
      var monitoringBtn = document.getElementById("monitoring-button")
      var searchBtn = document.getElementById("search-button")

      // 获取模态框内的所有关闭按钮元素
      var closeButtons = document.getElementsByClassName("close-button");

      // 点击按钮时打开对应的模态框
      customerServiceBtn.onclick = function() {
          customerServiceModal.style.display = "block";
      }

      aiChatBtn.onclick = function() {
          aiChatModal.style.display = "block";
      }

      settingBtn.onclick = function() {
          settingModal.style.display = "block";
      }

      monitoringBtn.onclick = function() {
          monitoringModal.style.display = "block";
      }

      helpServiceBtn.onclick = function() {
          helpServiceModal.style.display = "block";
      }

      searchBtn.onclick = function() {
          searchModal.style.display = "block";
      }

      // 为每个关闭按钮添加点击事件监听器
      for (var i = 0; i < closeButtons.length; i++) {
          closeButtons[i].onclick = function() {
              // 这里我们可以关闭这个按钮所在的模态框
              this.closest('.modal').style.display = 'none';
          }
      }

      // 点击模态框外任何地方关闭模态框
      window.onclick = function(event) {
          if (event.target == customerServiceModal) {
              customerServiceModal.style.display = "none";
          }
          if (event.target == aiChatModal) {
              aiChatModal.style.display = "none";
          }
          if (event.target == helpServiceModal) {
              helpServiceModal.style.display = "none";
          }
          if (event.target == settingModal) {
              settingModal.style.display = "none";
          }
          if (event.target == monitoringModal) {
              monitoringModal.style.display = "none";
          }
          if (event.target == searchModal) {
              searchModal.style.display = "none";
          }
      }

      document.addEventListener('DOMContentLoaded', function() {
          const aiChatModal = document.getElementById("AI-chat-modal");
          const closeButtons = document.getElementsByClassName("close-button");
          const aiChatBtn = document.getElementById("AI-chat-button");
          const sendButton = document.getElementById("send-message");
          const chatInput = document.getElementById("chat-input");
          const chatHistory = document.getElementById("chat-history");

          // 点击按钮打开 AI chat 模态框
          aiChatBtn.addEventListener('click', function() {
              aiChatModal.style.display = "block";
          });

          // 为每个关闭按钮添加点击事件监听器
          for (let i = 0; i < closeButtons.length; i++) {
              closeButtons[i].addEventListener('click', function() {
                  aiChatModal.style.display = "none";
              });
          }

          // 点击模态框外任何地方关闭模态框
          window.addEventListener('click', function(event) {
              if (event.target == aiChatModal) {
                  aiChatModal.style.display = "none";
              }
          });

          // 发送消息
          sendButton.addEventListener('click', function() {
              const question = chatInput.value;
              if (question.trim() !== '') {
                  // 将用户消息添加到聊天记录中
                  chatHistory.innerHTML += '<div><strong>You:</strong> ' + question + '</div>';
                  // 发送 AJAX 请求到后端
                  $.ajax({
                      type: 'POST',
                      contentType: 'application/json',
                      url: '/ask',
                      data: JSON.stringify({'question': question}),
                      success: function(data) {
                          // 将 ChatGPT 的回复添加到聊天记录中
                          chatHistory.innerHTML += '<div><strong>ChatGPT:</strong> ' + data.answer + '</div>'; // 确保这里使用 'data.answer'
                          // 清空输入框
                          chatInput.value = '';
                      },
                      error: function(xhr, status, error) {
                          console.error('An error occurred:', error);
                          // 将错误消息添加到聊天记录中
                          chatHistory.innerHTML += '<div><strong>Error:</strong> An error occurred while processing your request.</div>';
                      }
                  });
              }
          });
      });


