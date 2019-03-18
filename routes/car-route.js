const carService = require('../services/car-service')
const reviewService = require('../services/review-service.js')

function checkAdmin(req, res, next) {
    console.log('INSIDE MIDDLEWARE: ', req.session.user);
    if (!req.session.user || !req.session.user.isAdmin ) {
        res.status(401).end('Unauthorized');
        return;
    }
    next();
}

function addCarRoutes(app) {
    // CARS REST API:

    // LIST
    app.get('/car', (req, res) => {
        carService.query()
            .then(cars => res.json(cars))
            
    })

    // SINGLE - GET Full details including reviews
    app.get('/car/:carId', (req, res) => {
        const carId = req.params.carId;
        Promise.all([
            carService.getById(carId),
            reviewService.query({carId})
        ])
        .then(([car,reviews]) => {
            res.json( {
                car,reviews
            })
        })
    })

    // DELETE
    app.delete('/car/:carId', checkAdmin, (req, res) => {
        
        const carId = req.params.carId;
        carService.remove(carId)
            .then(() => res.end(`Car ${carId} Deleted `))
    })

    // CREATE
    app.post('/car', (req, res) => {
        const car = req.body;
        carService.add(car)
            .then(car => {
                res.json(car)
            })
    })

    // UPDATE
    app.put('/car/:carId', (req, res) => {
        const car = req.body;
        carService.update(car)
            .then(car => res.json(car))
    })

}


module.exports = addCarRoutes;