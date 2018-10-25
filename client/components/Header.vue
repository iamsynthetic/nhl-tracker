<template>
    <div class="theheader">
        <header class="uk-position-fixed header-fixed uk-width-1-1">
            <div class="uk-container uk-container-expand header-container">
                <nav class="uk-navbar uk-light header-navbar" data-uk-navbar="mode:click; duration:250">
                    <div class="uk-navbar-left header-left">
                        <ul class="uk-navbar-nav header-navbar-nav-left">
                            <li><a class="header-navbar-nav-title" href="#">T</a></li>
                            <li><search-bar class="thesearchbar"></search-bar></li>
                        </ul>
                    </div>
                    <div class="uk-navbar-right header-right">
                        <ul class="uk-navbar-nav header-navbar-nav-right">
                            <li><a href="#" data-uk-icon="icon: user" title="Your Profile" data-uk-tooltip></a></li>
                            <li><a href="#" data-uk-icon="icon: settings" title="Settings" data-uk-tooltip></a></li>
                            <li><a href="#" data-uk-icon="icon: sign-out" title="Sign Out" data-uk-tooltip></a></li>
                            <li><a class="uk-navbar-toggle" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav" data-uk-icon="icon:" title="Offcanvas" data-uk-tooltip></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>

<script>

import Searchbar from './SearchBar.vue'
import { TweenMax } from 'gsap';


export default {
    name: 'Header',
    data(){
        return{
            
        }
    },
    created(){

    },
    mounted(){
    
    },
    methods:{
        mouseoverTextlink(e){
            
        },
        clickTextlink(e){

        }
    },
    components:{
        "searchBar": Searchbar
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/styles.scss';

    .theheader{
        height:60px;
        background-color:$dark;
    }

    .header-fixed{
        height:60px;
        z-index:10;
        background-color:$dark;
    }

    .header-container{
        padding-left:0px;
        padding-right:0px;
        height:60px;
    }

    .header-navbar{
        height:60px;
    }

    .header-left{
        height:60px;
        width:60px;
    }
    
    .header-navbar-nav-left{
        height:60px;
        width:60px;
    }
    
    .header-navbar-nav-title{
        height:60px;
        width:60px;
        background-color:$blue;
    }
    
    .thesearchbar{
        margin-left:30px;
    }
    
    .header-right{
        height:60px;
    }

    .header-navbar-nav-right{
        height:60px;
    }

    // .header-navbar-item{
    //     height:60px;
    // }

    // .header-search-icon{
    //     float:left;
    //     position: absolute;
    // }

    // .header-search-bar{
    //     float:left;
    //     //display:none;
    //     position: absolute;
    //     right: 120px;
    //     width: 0px;
    // }

    /* MEDIA QUERIES */

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen
    and (min-device-width : 320px)
    and (max-device-width : 480px) {
        .section-container{
                margin-top: 0;
            }
    }

    /* Smartphones (landscape) ----------- */
        @media only screen 
        and (min-width : 321px)
        and (max-width: 1023px)
        and (orientation:landscape) {
            padding-left:0px;
            padding-right:0px;
        }

    /* Smartphones (portrait) ----------- */
        @media only screen 
        and (min-width : 320px)
        and (max-width : 359px)
        and (orientation:portrait) {
            .section-container{
                margin-top: 0;
            }
        }

        /* Smartphones (portrait) ----------- */
        @media only screen 
        and (min-width : 360px)
        and (max-width : 410px)
        and (orientation:portrait) {
            padding-left:0px;
            padding-right:0px;
        }

        /* Smartphones (portrait) ----------- */
        @media only screen 
        and (min-width : 411px)
        and (max-width : 450px)
        and (orientation:portrait) {
            .section-container{
                margin-top: 0;
            }
        }


    /* iPads (portrait and landscape) ----------- */
        @media only screen 
        and (min-device-width : 768px) 
        and (max-device-width : 1024px) {
            .section-container{
                margin-top: 0;
            }
        }

    /* iPads (landscape) ----------- */
        @media only screen 
        and (min-device-width : 768px) 
        and (max-device-width : 1024px) 
        and (min-device-height: 768px)
        and (orientation : landscape) {
        
        }


    /* iPads (landscape) ----------- */
    @media only screen
    and (min-device-width : 768px)
    and (max-device-width : 1024px)
    and (orientation : landscape) {
    /* Styles */
    }

    /* iPads (portrait) ----------- */
    @media only screen
    and (min-device-width : 768px)
    and (max-device-width : 1024px)
    and (orientation : portrait) {
    /* Styles */
    }

    /* Desktops and laptops ----------- */
    @media only screen 
    and (min-width : 1224px) {
    /* Styles */
    }

    /* Large screens ----------- */
    @media only screen 
    and (min-width : 1824px) {
    /* Styles */
    }

    /* iPhone 4 ----------- */
    @media
    only screen and (-webkit-min-device-pixel-ratio : 1.5),
    only screen and (min-device-pixel-ratio : 1.5) {
    /* Styles */
    }
</style>

