export default function Settings() {
    return (
      <main>
        <h3>Notifications</h3>

        <p>Manage your notifications here</p>

        <form>
          <div className="">
            <label className="block">
              Email Notifications
            </label>
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Receive notifications via email</span>
          </div>

          <div className="mb-4">
            <label className="block">
              Push Notifications
            </label>
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Receive notifications via push notifications</span>
          </div>

          <button className="bg-green-500">Save</button>
        </form>
      </main>
    );
}