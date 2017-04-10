<template>
<div>
    <div id="titlebar">
        <div style="display: flex; border-right: rgba(187, 187, 187, 0.5) 1px solid;">
            <div class="window-control-btn settings contextmenu" @click="toggleSettings"></div>
        </div>
        <div style="width: 100%; display: flex" class="draggable">
            <div id="window-title">
                <span style="vertical-align: middle"  class="mono">{{ title }}</span>
            </div>
        </div>
        <div style="display: flex">
            <div class="window-control-btn minimize" @click="minimize"></div>
            <div class="window-control-btn maximize" @click="maximizeOrRestore"></div>
            <div class="window-control-btn close" @click="close"></div>
        </div>
    </div>
    <div id="subtitlebar" class="hidden">

    </div>
    <div style="display: flex; height: 100%; width: 100%; position:relative">
        <transition name="slide" mode="out-in">
            <editor v-if="paramaters.hidden"></editor>
            <settings v-else></settings>
        </transition>
    </div>
</div>
</template>

<script>
const { remote } = require ("electron")

export default {
    name: "app",
    components: {
        settings: require ("./settings.vue"),
        editor: require ("./editor.vue"),
    },
    data() {
            return {
            paramaters: {
                hidden: true,
            },
            title: "",
        }
    },
    watch: {
        title () {
            let t = this.title.trim ()
            if (t === "") {
                document.title = "#firat"
            } else {
                document.title = `#firat - ${t}`
            }
        },
    },
    methods : {
        minimize (e) {
            let win = remote.getCurrentWindow ()
            if (!win.isMinimized ()) {
                win.minimize ()
            }
        },
        maximizeOrRestore (e) {
            let win = remote.getCurrentWindow ()
            if (win.isMaximized ()) {
                win.restore ()
                e.target.classList.add ("maximize")
                e.target.classList.remove ("restore")
            } else {
                win.maximize ()
                e.target.classList.remove ("maximize")
                e.target.classList.add ("restore")
            }
        },
        close (e) {
            remote.getCurrentWindow ().close ( )
        },
        toggleSettings (e) {
            this.paramaters.hidden = !this.paramaters.hidden
            if (this.paramaters.hidden) {
                this.title = ""
                e.target.classList.add ("settings")
                e.target.classList.remove ("arrow")
            } else {
                this.title = "Settings"
                e.target.classList.remove ("settings")
                e.target.classList.add ("arrow")
            }
        },
    },
}
</script>

<style lang="scss">
$primary-color: #c8d0d0;
$secondary-color: #d9e1e1;
$primary-text-color: #ebebeb;
$text-color: #252525;

* {
    outline: none;
    color: $text-color;
    user-select: none;
    background: none;
    border: none;
    cursor: default;
    font-family: sans-serif;
}
html.blurred {
    filter: grayscale(100%);
    opacity: .8;
}
html.hover {
    filter: none !important;
    opacity: 1 !important;
}
body {
    margin: 0;
    padding: 0;
    border: 1px $primary-color solid;
    height: calc(100vh + -2px);
    overflow: hidden;
}
.draggable {
    -webkit-app-region: drag;
}
#titlebar {
    display: flex;
    background-color: $primary-color;
    height: 30px !important;
    z-index: 199999999;
}
#subtitlebar {
    display: flex;
    background-color: $secondary-color;
    height: 50px;
    transition: all .3s;
}
#subtitlebar.hidden {
    margin-top: -50px;
    opacity: 0;
    pointer-events: none;
}
.mono {
    font-family: 'Fantasque Sans Mono'
}
#window-title {
    margin: auto;
    margin-left: 10px;
}
.window-control-btn.hover {
    background-color: rgba(#000000, .06);
}
.window-control-btn {
    position: relative;
    display: inline-block;
    float: left;
    width: 45px;
    height: 30px;
    transition: background-color .1s;
    &::after {
        content: " ";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 12px;
        transition: filter .1s, background-image .3s;
    }
}
.window-control-btn.maximize::after {
    background-image: url("../../res/maximize.svg");
}
.window-control-btn.settings::after {
    background-image: url("../../res/settings.svg");
}
.window-control-btn.arrow::after {
    background-image: url("../../res/arrow.svg");
}
.window-control-btn.restore::after {
    background-image: url("../../res/restore.svg");
}
.window-control-btn.minimize::after {
    background-image: url("../../res/minimize.svg");
}
.window-control-btn.close {
    &::after {
        background-image: url("../../res/close.svg");
    }
}
.window-control-btn.close.hover {
    background-color: #e81123;
    &::after {
        filter: invert(1);
    }
}
.slide-enter-active , .slide-leave-active {
  transition: transform .2s, opacity .2s;
}
.slide-enter{
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to{
    transform: translateX(0);
    opacity: 1;
}
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-leave {
    transform: translateX(0);
    opacity: 1;
}
</style>
