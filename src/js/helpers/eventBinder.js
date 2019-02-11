import DOMSelector from './domSelector'
import Constants from './constants'

export default (() => {
    return class EventBinder {
        static bind(id, eventType, callback) {
            DOMSelector.getElement(id).addEventListener(eventType, callback)
        }

        static bindWindow(eventType, callback) {
            window.addEventListener(eventType, callback)
        }

        static bindClick(id, callback) {
            this.bind(id, Constants.EVENT_CLICK, callback)
        }

        static bindSubmit(id, callback) {
            this.bind(id, Constants.EVENT_SUBMIT, callback)
        }

    }
})()