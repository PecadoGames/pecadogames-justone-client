/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.token = null;
    this.logged_in = null;
    this.creation_date = null;
    this.birthday = null;
    this.avatarColor = null;
    Object.assign(this, data);
  }
}
export default User;
