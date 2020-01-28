// systems is array of system-ids
function createShip(shipId, name, systemIds) {
    return {
        shipId,
        name,
        systemIds
    }
}

module.exports = createShip;