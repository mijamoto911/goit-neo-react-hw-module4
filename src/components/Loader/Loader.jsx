import { Oval } from 'react-loader-spinner';
import CSS from './Loader.module.css';

const Loader = () => {
  return (
    <div className={CSS.loader}>
      <Oval height={50} width={50} color="blue" />
    </div>
  );
};

export default Loader;
