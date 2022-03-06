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

                                <button type="button" class="btn btn-primary btn-sm btn-block search-result__button"
                                        @click="getSelectedMovie(movie)"
                                        :data-title="movie['Title']"
                                        :data-imdb-id="movie['imdbID']"
                                        data-toggle="modal"
                                        data-target="#movie-results"
                                >
                                    <i class="fa fa-play" aria-hidden="true"></i> <span class="ml-3">View more</span>
                                </button>

                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <!-- END COL -->
        </div>
        <!-- END ROW -->

        <!-- Modal -->
        <div class="modal fade search-modal" id="movie-results" tabindex="-1" role="dialog" aria-labelledby="movie-results" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header" id="modal-header-bg">

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img :src="this.selectedMovie.Poster" :alt="this.selectedMovie.Title" class="search-modal__poster">
                                    <div class="search-modal__below-image">
                                        <small class="search-modal__ratings">
                                            <i class="fa fa-star"></i>
                                            <span class="ml-2">{{this.selectedMovie.Ratings[0]['Value']}}</span>
                                        </small><br />
                                        <small class="search-modal__runtime">
                                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            <span class="ml-2">{{this.selectedMovie.Runtime}}</span>
                                        </small>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <h5 class="modal-title search-modal__title" id="popup-movie-title">
                                        {{ this.selectedMovie.Title }}<br />
                                    </h5>
                                    <p class="search-modal__plot">{{ this.selectedMovie.Plot }}</p>
                                    <ul class="search-modal__meta">
                                        <li class="search-modal__meta-item">
                                            <span class="search-modal__meta-item__label">Director</span>
                                            <span class="search-modal__meta-item__value">{{ this.selectedMovie.Director }}</span>
                                        </li>
                                        <li class="search-modal__meta-item">
                                            <span class="search-modal__meta-item__label">Actors</span>
                                            <span class="search-modal__meta-item__value">{{ this.selectedMovie.Actors }}</span>
                                        </li>
                                        <li class="search-modal__meta-item">
                                            <span class="search-modal__meta-item__label">Rated</span>
                                            <span class="search-modal__meta-item__value">{{ this.selectedMovie.Rated }}</span>
                                        </li>
                                        <li class="search-modal__meta-item">
                                            <span class="search-modal__meta-item__label">Released</span>
                                            <span class="search-modal__meta-item__value">{{ this.selectedMovie.Released }}</span>
                                        </li>
                                        <li class="search-modal__meta-item">
                                            <span class="search-modal__meta-item__label">Language</span>
                                            <span class="search-modal__meta-item__value">{{ this.selectedMovie.Language }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


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
                selectedMovie: {
                    Title: "",
                    Year: "",
                    Rated: "",
                    Released: "",
                    Runtime: "",
                    Genre: "",
                    Director: "",
                    Writer: "",
                    Actors: "",
                    Plot: "",
                    Language: "",
                    Country: "",
                    Awards: "",
                    Poster: "",
                    Ratings: [
                        { Value: "0/10" }
                    ],
                    Metascore: "",
                    imdbRating: "",
                    imdbVotes: "",
                    imdbID: "",
                    Type: "",
                    DVD: "",
                    BoxOffice: "",
                    Production: "",
                    Website: "",
                    Response: "",
                    Color: ""
                },
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

                //Get all movies from search string
                this.currentSearchTerms.forEach( async searchTerm => {
                    omdbapi.searchParams.set('s', searchTerm);
                    let results = await axios.get(omdbapi.href);

                    results.data.Search.forEach(movie => {
                        res.push(movie);
                    });
                });
                this.movieResults = res;
            },
            async getSelectedMovie(movie) {

                let omdbapi = new URL(this.api.link);
                omdbapi.searchParams.set('apikey', this.api.key);
                omdbapi.searchParams.set('type', this.api.type);
                omdbapi.searchParams.set('i', movie.imdbID);

                let mv = await axios.get( omdbapi.href );

                this.selectedMovie = mv.data;
                this.extractColorFromTitle(this.selectedMovie.Title);

                // Change bg color of modal
                let header = document.getElementById('modal-header-bg');
                let labels = document.querySelectorAll('.search-modal__meta-item__label');

                header.style.backgroundColor = this.selectedMovie.Color;

                //Change label colors
                labels.forEach( label => {
                    label.style.color = this.selectedMovie.Color;
                })


            },
            extractColorFromTitle(movieTitle) {
                this.currentSearchTerms.forEach( term => {

                    let title = movieTitle.toLowerCase();
                    let color = term.toLowerCase();

                    if(title.includes(color)) {
                        //return the matched color;
                        this.selectedMovie.Color = color;
                    }
                })
            }
        }
    }
</script>