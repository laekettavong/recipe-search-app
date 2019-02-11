export default (() => {
    const privateState = {}
    return class StateManager {
        static get state() {
            return privateState
        }

        static set state({ prop, value }) {
            privateState[prop] = value
        }
    }
})()
