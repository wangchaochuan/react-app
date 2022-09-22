import { FC } from 'react';

const Home: FC = () => {
  const handleClick = (name: string, age: number, event: any) => {
    console.log(name, age, event);
  };
  return (
    <div>
      <button onClick={handleClick.bind(this, 'wang', 28)}>button</button>
    </div>
  );
};

export default Home;
