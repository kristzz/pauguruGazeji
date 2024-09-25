import Link from 'next/link';

export default function Settings() {
  return (
    <main>
      <Link href="/settings/notifications">
        <SettingsButton label="Notifications" />
      </Link>
      <Link href="/settings/accountprivacy">
        <SettingsButton label="Account privacy" />
      </Link>
      <Link href="/settings/subscriptions">
        <SettingsButton label="Subscriptions" />
      </Link>
      <Link href="/settings/languages">
        <SettingsButton label="Languages" />
      </Link>
      <Link href="/settings/help">
        <SettingsButton label="Help" />
      </Link>
      <Link href="/settings/account">
        <SettingsButton label="Account" />
      </Link>
      <button className="bg-main-red">!Log out!</button>
    </main>
  );
}

type SettingsButtonProps = {
  label: string;
};

function SettingsButton({ label }: SettingsButtonProps) {
  return (
    <button className="settings-button">
      {label}
    </button>
  );
}