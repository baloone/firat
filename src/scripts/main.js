const Vue = require ("vue")
const App = require ("../vue/App.vue")

new Vue (
    {
        el: "app",
        render: m => m (App),
    }
)
