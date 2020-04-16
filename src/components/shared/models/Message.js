/**
 * Message model
 */
class Message {
    constructor(data = {}) {
        this.id = null;
        Object.assign(this, data);
    }
}
export default Message;
