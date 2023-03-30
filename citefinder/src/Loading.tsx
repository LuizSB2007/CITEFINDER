import loadingImg from './loading.png'
import './App.css';

function Loading(){
    return(
        <div className="loadingBox">
            <img src={loadingImg} alt="load" className='loading' />
        </div>
    )
}

export default Loading