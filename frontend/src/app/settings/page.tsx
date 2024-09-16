export default function Settings() {
    return (
      <main>
        <SettingsButton label="Notifications" />
        <SettingsButton label="Account privacy" />
        <SettingsButton label="Subscriptions" />
        <SettingsButton label="Languages" />
        <SettingsButton label="Help" />
        <SettingsButton label="Account" />
        <button className="bg-main-red">!Log out!</button>
      </main>
    );
  }

type SettingsButtonProps = {
  label: string;
};

function SettingsButton({label}: SettingsButtonProps) {
  return(
    <button className="bg-main-white">
      {label}
    </button>
  )
}