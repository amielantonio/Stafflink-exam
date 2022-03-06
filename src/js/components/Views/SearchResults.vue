<template>

    <div class="container">

        <div class="row">
            <div class="col-sm-12">
                <h1 class="search-title">Search results for: <span v-html="this.searchResults"></span></h1>
            </div>

        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="search-results-container">

                    <ul class="search-results">
                        <li class="search-result" v-for="movie in movieResults">
                            <div class="search-result__img-container">
                                <img :src="movie['Poster']" :alt="movie['Title']" class="search-result__img">
                            </div>
                            <div class="search-result__description">

                                <span class="search-result__year">{{ movie['Year'] }}</span><br />
                                <p class="search-result__title">{{ movie['Title'] }}</p>

                                <button type="button" class="btn btn-primary btn-sm btn-block mt-2 search-result__button"
                                        :data-title="movie['Title']"
                                        :data-imdb-id="movie['imdbID']">
                                    <i class="fa fa-play mr-2" aria-hidden="true"></i> View more
                                </button>

                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <!-- END COL -->
        </div>
        <!-- END ROW -->


    </div>

</template>
<script>

    import axios from "axios";

    export default {
        name: 'SearchResults',
        data() {
            return {
                api: {
                    link: "http://omdbapi.com/",
                    key: "ec31a4ba",
                    type: "movie"
                },
                currentSearchTerms: [],
                movieResults: [],
            }
        },
        computed: {
            searchResults() {
                return this.currentSearchTerms.map( term => term.charAt(0).toUpperCase() + term.slice(1) ).join(', ');
            }
        },
        created() {
            let host = window.location;
            let url = new URL(host);

            this.currentSearchTerms = url.searchParams.get('sr').split(',').map(item => item.trim());

            this.getSearchList();
        },
        methods: {
            getSearchList() {

                let omdbapi = new URL(this.api.link);
                let res = [];
                omdbapi.searchParams.set('apikey', this.api.key);
                omdbapi.searchParams.set('type', this.api.type);

                this.currentSearchTerms.forEach( async searchTerm => {
                    omdbapi.searchParams.set('s', searchTerm);
                    let results = await axios.get(omdbapi.href);

                    results.data.Search.forEach(movie => {
                        res.push(movie);
                    });
                });

                this.movieResults = res;

            }
        }
    }
</script>