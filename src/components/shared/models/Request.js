/**
 * Request model
 */
class Request {
    constructor(data = {}) {
        this.id = null;
        Object.assign(this, data);
    }
}
export default Request;
