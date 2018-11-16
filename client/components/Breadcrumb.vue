<template>
    <div my-auto class="thebreadcrumb">
        <ul my-auto v-if="this.$store.getters.checkpagenumber === 2" class="breadcrumb">
            <li><a @click="clickTextLink('/teamselect')">teams</a></li>
            <li>schedule</li>
        </ul>
        <ul my-auto v-else-if="this.$store.getters.checkpagenumber === 3" class="breadcrumb">
            <li><a @click="clickTextLink('/teamselect')">teams</a></li>
            <li><a @click="clickTextLink('/schedule')">schedule</a></li>
            <li>matchup</li>
        </ul>
        <ul my-auto v-else-if="this.$store.getters.checkpagenumber === 4" class="breadcrumb">
            <li><a @click="clickTextLink('/teamselect')">teams</a></li>
            <li><a @click="clickTextLink('/schedule')">schedule</a></li>
            <li><a @click="clickTextLink('/matchup')">matchup</a></li>
            <li>franchise</li>
        </ul>
    </div>
</template>

<script>

import { TweenMax } from 'gsap'
import router from '../router'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'


export default {
    name: 'Breadcrumb',
    data(){
        return{
            page: "1"
        }
    },
    computed:{
        ...mapGetters(['checkpagenumber'])
    
    },
    created(){

    },
    mounted(){
    
    },
    methods:{
        ...mapMutations(['CHANGE_PAGENUMBER']),
        ...mapActions(['changePagenumber']),

        changethepagenumber(id){
            this.changePagenumber(id);
        },
        mouseoverTextlink(e){
            
        },

        clickTextLink(url){

            switch(url){
                case '/teamselect':
                console.log(this.changethepagenumber);
                console.log('breadcrumb clicktextlink')
                    //this.changethepagenumber(1)
                break;
                case '/schedule':
                console.log(this.changethepagenumber);
                console.log('breadcrumb clicktextlink')
                    //this.changethepagenumber(2)
                break;
                case '/matchup':
                    //this.changethepagenumber(3)
                break;
                case '/franchise':
                    //this.changethepagenumber(4)
                break;
                
                default:
                    //this.changethepagenumber(1)
            }
            router.push(url);
        }
    },
    components:{
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/styles.scss';

    .thebreadcrumb{
        height:60px;
        margin-left:100px;
        background-color:$info;
    }

    ul.breadcrumb {
    padding: 0px 0px;
    margin-top:30px;
    list-style: none;
    }
    ul.breadcrumb li {
        display: inline;
        font-size: 14px;
        color: $primary;
    }
    ul.breadcrumb li+li:before {
        padding-left: 9px;
        padding-right:9px;
        color: $grey;
        content: "\003e";
    }
    ul.breadcrumb li a {
        color: $success;
        text-decoration: none;
    }
    ul.breadcrumb li a:hover {
        
        text-decoration: underline;
    }

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

