module.exports = function(app, request) {

    app.get("/api/project/search/:title", findRecipeByTitle);
    app.get("/api/project/search/recipe/:id", findRecipeById);


    var API_URL = "http://food2fork.com/api/";
    var API_KEY = "cc8d030ba4ca67ba101401778e70163e";


    function findRecipeByTitle(req, res) {
        var title = req.params.title;
        var url = API_URL + "search?" + "key=" + API_KEY + "&q=" + title;

        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                //console.log(body) // Print the json response
                res.json(body.recipes);
            }
        })

    }


    function findRecipeById(req, res) {
        var id = req.params.id;
        var url = API_URL + "get?" + "key=" + API_KEY + "&rId=" + id;

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log(body) // Print the json response
                res.json(body);
            }
        })

    }


}



