/**
 * Message model
 */
class Message {
    constructor(data = {}) {
        this.messageId = null;
        this.authorId = null;
        this.authorUsername = null;
        this.text = null;
        this.creationDate = null;
        Object.assign(this, data);
    }
}
export default Message;
