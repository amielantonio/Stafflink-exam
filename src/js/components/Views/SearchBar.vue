<template>

    <form action="http/localhost/omdbapi/search-results" method="GET">
        <div class="ombd-search">
            <div class="form-group">
                <label for="omdb-search__input">Search a Movie: </label>
                <input type="text" class="omdb-search__input" id="omdb-search__input" name="sr">
                <button type="submit" class="omdb-search__button btn btn-primary">Search</button>
            </div>
        </div>
    </form>

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
