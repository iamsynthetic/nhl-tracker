<template>
    <div class="thesidebar">
        <div class="uk-panel uk-panel-box">
            <ul class="uk-nav main-menu" v-for="(button, index) in buttons">
                <vk-icon :icon="button.iconname" class="uk-margin-small-center" ratio="1.5" @click="clickTextlink(button.url)"></vk-icon><br><div class="label">{{ button.iconlabel }}</div>

                <!-- <vk-icon icon="home" class="uk-margin-small-center" ratio="1.5" @click="clickTextlink('home')"></vk-icon><br><div class="label">UNREAD</div>
                <vk-icon icon="file" class="uk-margin-small-center" ratio="1.5"></vk-icon><br><div class="label">READ</div>
                <vk-icon icon="copy" class="uk-margin-small-center" ratio="1.5"></vk-icon><br><div class="label">GENRE</div>
                <vk-icon icon="search" class="uk-margin-small-center" ratio="1.5"></vk-icon><br><div class="label">DATE</div>
                <vk-icon icon="search" class="uk-margin-small-center" ratio="1.5"></vk-icon><br><div class="label">TITLE</div> -->
                
                <!-- <li class="uk-active"><a href="">Pub</a></li>
                <li><a href="">books</a></li>
                <li><a href="">character</a></li>
                <li><a href="">read</a></li>
                <li><a href="">unread</a></li> -->
            </ul>
        </div>
    </div>
</template>

<script>
import buttons from '../data/buttons.js'

export default {
    name:"Leftbar",
    data(){
        return {
            // buttons: [
            //     {
            //         iconname: 'home',
            //         iconlabel: 'UNREAD',
            //         url: 'google.com'
            //     },
            //     {
            //         iconname: 'file',
            //         iconlabel: 'READ',
            //         url: 'yahoo.com'
            //     },
            //     {
            //         iconname: 'copy',
            //         iconlabel: 'TITLE',
            //         url: 'bing.com'
            //     },
            //     {
            //         iconname: 'search',
            //         iconlabel: 'GENRE',
            //         url: 'hotmail.com'
            //     },
            //     {
            //         iconname: 'search',
            //         iconlabel: 'DATE',
            //         url: 'amazon.com'
            //     }
            // ]
            buttons
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
         clickTextlink(url){
             console.log(url);
         }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/styles.scss';

    .thesidebar{
        position:fixed;
        z-index:102;
        //width:75px;
        // margin-top:0px;
        height:calc(100vh - 60px);
        // display:block;
        // overflow:auto;
        margin-top:-30px;
        background-color:$dark;
    }

    .main-menu{
        margin-top:40px;
    }

    .label{
        font-size:10px;
        text-align:center;
        margin-bottom:40px;
    }
</style>
