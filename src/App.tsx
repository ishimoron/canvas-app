import 'bootstrap/dist/css/bootstrap.min.css';
import { FC } from 'react';
import './App.css';
import Canvas from './components/Canvas/Canvas';

const App: FC = () => {
  return (
    <div className='container w-50 mt-5'>
      <Canvas width={700} height={500} />
    </div>
  );
};

export default App;
