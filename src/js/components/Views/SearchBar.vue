<template>

    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2">
                <form action="http/localhost/omdbapi/search-results" method="GET">
                    <div class="ombd-search">
                        <div class="input-group" >
                            <input type="text" class="omdb-search__input form-control" id="omdb-search__input" name="sr" aria-label="Search"
                                placeholder="Search a movie. eg: Red, Yellow, Blue">
                            <button type="submit" class="omdb-search__button btn btn-primary input-group-append">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>

    </div>

</template>
<script>

    export default {
        name: 'SearchBar',
        data() {
            return {

            }
        }
    }

</script>
