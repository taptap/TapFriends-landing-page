import Friend from './Friend';

const title = import.meta.env.VITE_TITLE;

export default function App() {
  if (document.title !== title) {
    document.title = title;
  }

  return <Friend />;
}
