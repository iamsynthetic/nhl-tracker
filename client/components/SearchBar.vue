<template>
    <div class="uk-navbar-item header-navbar-item uk-visible@s">
        <div class="header-search-icon">
            <vk-icon icon="search" class="uk-margin-small-right"></vk-icon>
        </div>
        <form class="header-search-bar" v-on:submit="getfilteredData">
            <!-- <input type="search" class="uk-search-input search-field" :class="[searchopen ? 'showme' : 'hideme']" placeholder="search"> -->
            <!-- <input type="search" class="uk-search-input search-field" placeholder="search"> -->
            <input type="search" class="uk-search-input search-field" placeholder="search" v-model="search" v-on:keyup="getfilteredData">
        </form>
    </div>
</template>

<script>

import { directive as onClickaway } from 'vue-clickaway';
import data from '../data/data';

export default {
    name: 'Searchbar',
    data(){
        return{
            headersearchbar: ".header-search-bar",
            searchopen:false,
            searchbarclickedaway:false,
            filteredData: [],
            search: '',
            stacks: [
            {
                checked: false,
                value: 'language'
            },
            {
                checked: false,
                value: 'framework'
            },
            {
                checked: false,
                value: 'frontend'
                },
            {
                checked: false,
                value: 'backend'
            },
            {
                checked: false,
                value: 'mobile'
            },
            {
                checked: false,
                value: 'web'
            },
            {
                checked: false,
                value: 'hybrid'
            },
            {
                checked: false,
                value: 'database'
            },
            {
                checked: false,
                value: 'console'
            },
            {
                checked: false,
                value: 'online'
            }
            ]
        }
    },
    mounted(){
        this.getfilteredData();
    },
    created(){
        //this.$eventHub.$on('filterdata', this.testit);
    },
    computed: {
        selectedFilters: function() {
            let filters = [];
            let checkedFiters = this.stacks.filter(obj => obj.checked);
            checkedFiters.forEach(element => {
                filters.push(element.value);
            });
            return filters;
        }
    },
    directives: {
        onClickaway: onClickaway,
    },
    methods:{
        clickTextlink(e){
            // if(this.searchopen == false){
            //     this.searchopen = true;
            //     this.searchbarclickedaway = false;
            //     TweenMax.to(e.target, .7, {autoAlpha:.6, ease:Power2.easeOut});
            //     TweenMax.to(this.headersearchbar, .7, {autoAlpha:1, width:"180px", repeat:0, ease:Power2.easeOut});
            // }
        },
        // away(){
        //     // if(this.searchbarclickedaway == false){
        //     //     TweenMax.to(this.headersearchbar, .7, {autoAlpha:0, width:"0px", repeat:0, ease:Power2.easeOut, onComplete:this.resetVariables});
        //     // }
        // },
        // resetVariables(){
        //     this.searchbarclickedaway = true;
        //     this.searchopen = false;
        // }
        getfilteredData: function() {
            this.filteredData = data;
            let filteredDataByfilters = [];
            let filteredDataBySearch = [];
            // first check if filters where selected
            if (this.selectedFilters.length > 0) {
                filteredDataByfilters= this.filteredData.filter(obj => this.selectedFilters.every(val => obj.stack.indexOf(val) >= 0));
                this.filteredData = filteredDataByfilters;
            }
            // then filter according to keyword, for now this only affects the name attribute of each data
            if (this.search !== '') {
                filteredDataBySearch = this.filteredData.filter(obj => obj.name.indexOf(this.search.toLowerCase()) >= 0);
                this.filteredData = filteredDataBySearch;
            }
            console.log('filtered data is: ' + this.filteredData);
            this.$eventHub.$emit('filterdata', this.filteredData);
        }

    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/styles.scss';

    .showme{
        display:block;
    }
    .hideme{
        display:none;
    }

    .header-navbar-item{
        height:60px;
    }

    .header-search-icon{
        float:left;
        //position: absolute;
    }

    .header-search-bar{
        float:left;
        //position: absolute;
        outline:none;
        width: 180px;       
    }
    .search-field{
        //outline: 0px solid transparent;
        background-color:$dark;
    }
</style>

