import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import EventList from "@/components/EventList";
import Widgets from "@/components/Widgets";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events`);
  const events = await res.json();

  return { props: { events } };
}

const Events = ({ events }) => {
  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="イベントリスト" list={EventList(events)} />
      <Widgets />
    </div>
  );
};

export default Events;
