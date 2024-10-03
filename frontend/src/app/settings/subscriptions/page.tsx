import SubscriptionCard from './SubscriptionCard';

export default function Settings() {
    return (
      <main>
        <h3>Subscription</h3>

        <p>Manage your subscription here</p>

        <p>Subscription status: Active</p>

        <button className="btn-primary bg-red-500">Cancel Subscription</button>

        <p>"Step into the full world of [Company Name]—your subscription awaits!"</p>
        
        <div className="flex">
          <SubscriptionCard name="Monthly" price="$9.99" text="billed once a month" />
          <SubscriptionCard name="Yearly" price="$99.99" text="billed annually" />
          <SubscriptionCard name="Lifetime" price="$249.99" text="billed once in a lifetime" />
        </div>
      </main>
    );
}