<template>
    <div class="uk-offcanvas-content thebg">
    <!-- <vk-grid gutter="small"> -->
        <!-- <app-leftbar class="uk-light theleftbar"></app-leftbar> -->
        <!-- <app-searchpage class="thesearchpage" data-uk-height-viewport="expand:true"></app-searchpage> -->
    <!-- </vk-grid> -->
    </div>
</template>

<script>

import Leftbar from './LeftBar'
import SearchPage from './SearchPage.vue'

export default {
    name:'Container',
    components: {
        'appLeftbar': Leftbar,
        'appSearchpage': SearchPage
    }
}
</script>

<style>

    .thebg{
        height:calc(100vh - 60px);
        width:calc(100vw);
        background-image: url("/static/bg.jpg");
        /* height: 100%;  */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .theleftbar{
        width:60px;
    }

    .thesearchpage{
        /* width:calc(100vw - 75px);
        margin-left:75px;*/
        width: calc(100vw - 150px);
        margin-left: 60px;
        padding-left: 38px;
    }

</style>
