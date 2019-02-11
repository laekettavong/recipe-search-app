
export default (() => {
    return class DOMSelector {
        static getElement(id) {
            return document.querySelector(id)
        }

        static getElementById(id) {
            return document.getElementById(id)
        }

        static getAllElements(ids) {
            return document.querySelectorAll(ids)
        }
    }
})()