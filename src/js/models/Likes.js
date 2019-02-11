export default class Likes {

    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) {

        const like = { id, title, author, img }
        this.likes.push(like)
        this.persistData()
        return like
    }

    deleteLike(id) {
        this.likes = this.likes.filter(like => {
            if (like.id !== id) return like
        })

        this.persistData()
    }

    isLiked(id) {
        return this.likes.filter(like => {
            if (like.id === id) return like
        }).length === 1
    }

    getNumLikes() {
        return this.likes.length
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'))
        if (storage) this.likes = storage
    }
}