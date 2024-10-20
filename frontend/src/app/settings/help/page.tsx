export default function Settings() {
  return (
    <main className="p-4">
      <h3 className="text-2xl font-bold">Help</h3>
      <p>Need help? Check out the FAQ or contact us below!</p>
      
      <section className="mt-6">
          <h4 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h4>
          
          <div className="mt-4">
              <h5 className="font-medium">1. How do I reset my password?</h5>
              <p>You can reset your password by clicking on the "Forgot Password?" link on the login page. Follow the instructions in the email you receive to set a new password.</p>
          </div>

          <div className="mt-4">
              <h5 className="font-medium">2. What should I do if I encounter a bug?</h5>
              <p>If you find a bug, please report it to our support team via our email support@example.com Include as many details as possible to help us address the issue.</p>
          </div>

          <div className="mt-4">
              <h5 className="font-medium">3. How do I delete my account?</h5>
              <p>You can delete your account by going to the account settings and selecting "Delete Account." Please note that this action is irreversible, and all your data will be permanently removed.</p>
          </div>

          <div className="mt-4">
              <h5 className="font-medium">4. How do I manage my notification settings?</h5>
              <p>You can manage your notification settings in the settings page. Toggle the options for email and push notifications based on your preferences.</p>
          </div>

          <div className="mt-4">
              <h5 className="font-medium">5. Who can I contact for support?</h5>
              <p>If you need further assistance, please contact our support team via the contact form on our website, or reach us at support@example.com.</p>
          </div>
      </section>
    </main>
  );
}
