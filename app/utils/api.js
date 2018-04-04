var axios = require('axios');

module.exports = {
    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=starts&order=desc&type=Repositories');
        
        // return data from the query above
        return axios.get(encodedURI)
            .then(function(response) {
                return response.data.items;
            });
    }
}
