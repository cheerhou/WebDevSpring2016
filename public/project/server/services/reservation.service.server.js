module.exports = function(app, reservationModel, db) {

    app.post("/api/project/reservation/:userId", createReservation);
    app.get("/api/project/reservation", findAllReservation);
    app.get("/api/project/reservation/:userId", findReservationByUser);



    function createReservation(req, res) {
        var rev = req.body;
        var userId = req.params.userId;
        var revs = reservationModel.createReservation(userId, rev)
        res.json(revs);
    }

    function findAllReservation(req, res) {
        var revs = reservationModel.findAllRev();
        res.json(revs);
    }

    function findReservationByUser(req, res) {
        var userId = req.params.userId;
        var revs = reservationModel.findRevByUserId(userId);
        res.json(revs);
    }

}