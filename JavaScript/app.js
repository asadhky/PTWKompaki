// app.js
new Vue({
  el: '#app',
  data: {
    categories: [
            { id: 'planning', name: 'Planning' },
            { id: 'machining', name: 'Machining' },
            // 其他类别...
        ],
    currentCategory: null,
    apps: {
      planning: [
          { href: '/simulation', img: 'static/pc.jpg', label: 'PC operation' },
          { href: '/connection', img: 'static/tool-manager.jpg', label: 'Tool manager' },

      ],
      machining: [
        // machining类别的应用...
      ],
      monitoring: [
        // monitoring类别的应用...
      ],
      community: [
        // community类别的应用...
      ],
      utility: [
        // utility类别的应用...
      ]
    }
  },
  computed: {
        selectedApps() {
            return this.currentCategory ? this.apps[this.currentCategory] : [];
        }
    },
  methods: {
    selectCategory(categoryId) {
      this.currentCategory = categoryId;
    }
  }
});
