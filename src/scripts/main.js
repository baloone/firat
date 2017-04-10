const Vue = require ("vue").default
const App = require ("../vue/App.vue")
const { webFrame, remote } = require ("electron")
const {Menu, MenuItem, app} = remote

app.on ("browser-window-blur", _ => {
    document.documentElement.classList.add ("blurred")
    document.documentElement.classList.remove ("focused")
})
app.on ("browser-window-focus", _ => {
    document.documentElement.classList.add ("focused")
    document.documentElement.classList.remove ("blurred")
})
document.addEventListener ("mousemove", e => {
    if (e.screenX === 0 && e.screenY === 0)
        e.target.dispatchEvent ( new Event ("mouseout", e))
    else {
        e.path.slice (0, -2).forEach ( el =>{
            el.classList.add ("hover")
        })
    }
})
document.addEventListener ("mouseout", e => {
    e.path.slice (0, -2).forEach ( el =>{
        el.classList.remove ("hover")
    })
})
window.addEventListener ("contextmenu", e => {
    if (e.target.classList.contains ("contextmenu") ) {
        const menu = new Menu ()

        e.preventDefault ()
        menu.popup (remote.getCurrentWindow ())
    }
}, false)
new Vue (
    {
        el: "app",
        render: v => v (App),
    }
)
