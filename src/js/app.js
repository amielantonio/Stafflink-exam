import Vue from 'vue';

Vue.config.productionTip = false;

Vue.component('search-bar', require('./components/Views/SearchBar').default);
Vue.component('search-results', require('./components/Views/SearchResults').default);

window.onload = () => {
    let id = "app-vue";
    let hireBooking = document.getElementById(id);

    if(hireBooking){
        new Vue({
        }).$mount(`#${id}`)
    }



};