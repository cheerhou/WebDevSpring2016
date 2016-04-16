module.exports = function(app, reservationModel) {

    app.post("/api/project/reservation", createReservation);
    app.get("/api/project/reservation", findAllReservation);
    app.get("/api/project/reservation/:userId", findReservationByUser);



    function createReservation(req, res) {
        var rev = req.body;

        reservationModel.createReservation(rev)
            .then(
                function (revs) {
                    res.json(revs);
                }, function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllReservation(req, res) {
        reservationModel.findAllRev()
            .then(
                function (revs) {
                    res.json(revs);
                }, function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findReservationByUser(req, res) {
        var userId = req.params.userId;

        reservationModel.findRevByUserId(userId)
            .then(
                function (revs) {
                    res.json(revs);
                }, function (err) {
                    res.status(400).send(err);
                }
            );
    }

}