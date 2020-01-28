// ships is array of ship-ids
function createStrikeGroup(sgId, name, shipIds) {
    return {
        sgId,
        name,
        shipIds
    }
}

module.exports = createStrikeGroup;