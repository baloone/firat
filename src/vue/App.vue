<template>
    <div id="titlebar">
        <div style="display: flex">
            <div class="window-control-btn settings" v-on:click="toggleSettings"></div>
        </div>
        <div style="width: 100%; display: flex" class="draggable"></div>
        <div style="display: flex">
            <div class="window-control-btn minimize" v-on:click="minimize"></div>
            <div class="window-control-btn maximize" v-on:click="maximizeOrRestore"></div>
            <div class="window-control-btn close" v-on:click="close"></div>
        </div>
    </div>
    <editor hidden="{{settings.hidden ? '' : 'hidden'}}"></editor>
    <settings hidden="{{settings.hidden ? 'hidden' : ''}}" id="settings"></settings>
</template>

<script>

export default {
    name: "app",
    components: {
        editor: require ("./settings.vue"),
        editor: require ("./editor.vue"),
    },
    data: _ => { return {
        settings: {
            hidden: true,
        },
    }},
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
            this.settings.hidden = !this.settings.hidden
            if (this.settings.hidden) {
                e.target.classList.add ("settings")
                e.target.classList.remove ("arrow")
            } else {
                e.target.classList.remove ("settings")
                e.target.classList.add ("arrow")
            }
        },
    },
}
</script>

<style lang="scss">
$primary-color: #258ccd;
$primary-text-color: #ebebeb;
$text-color: #252525;

* {
    outline: none;
    color: $text-color;
    user-select: none;
    background: none;
    border: none;
    cursor: default;
}
body {
    margin: 0;
    padding: 0;
    border: 1px $primary-color solid;
}
.draggable {
    -webkit-app-region: drag;
}
#titlebar {
    display: flex;
    background-color: $primary-color;
    height: 30px !important;
}
.window-control-btn {
    position: relative;
    display: inline-block;
    float: left;
    width: 45px;
    height: 30px;
    transition: background-color .1s;
    &:hover {
        background-color: rgba(#bbbbbb, 0.5);
    }
}
.window-control-btn::after {
    content: " ";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 15px;
    transition: filter .1s, background-image .3s;
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
    &:hover {
        background-color: #c11a1a;
        &::after {
            filter: invert(1);
        }
    }
}
</style>
