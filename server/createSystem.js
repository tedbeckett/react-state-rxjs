function createSystem(systemId, name, status='ready') {
    return {
        systemId,
        name,
        status
    }
}

module.exports = createSystem;