<template>
    <div class="uk-offcanvas-content thebg">
        <app-searchpage class="thesearchpage" data-uk-height-viewport="expand:true"></app-searchpage>
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

</style>
