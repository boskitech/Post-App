import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount
} from './CounterSlice'

const Counter = () => {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')


  return (
    <div style={{width: '500px', height:'350px', margin:'100px auto', backgroundColor:'#888888', padding:'0px'}} className="Counter">
      <div style={{height:'40px', backgroundColor:'#333333', padding:'15px', color:'#fff', fontSize:'30px'}} className="Header">
        <b>Simple Redux Counter</b>
      </div>
      <div className="body">
        <div className='buttons'>
          <button className="btn-add" onClick={() => dispatch(decrement())} style={{
            width:'150px', 
            height:'60px', 
            fontSize:'40px', 
            border:'0px', 
            borderRadius:'2px', 
            backgroundColor:'white',
            margin:'45px 30px 0px 45px',
            cursor:'pointer'
            }}

          >
            <b>-</b>
          </button>
            <span style={{fontSize:'30px', width:'40px', margin:'auto'}}>{count}</span>
          <button className="btn-minus" onClick={() => dispatch(increment())} style={{
            width:'150px', 
            height:'60px', 
            fontSize:'40px', 
            border:'0px', 
            borderRadius:'2px', 
            backgroundColor:'white',
            margin:'45px 30px',
            cursor:'pointer'

          }}>
            <b>+</b>
          </button>
        </div>
        <div style={{marginTop:'20px'}}className='textfields'>
          <input type="number" onChange={e => setIncrementAmount(e.target.value)}
          value={incrementAmount}
          style={{
            border:'none',
            height:'45px',
            width:'280px',
            marginLeft:'45px',
            fontSize:'25px'
          }}/>
          <button className="btn-minus" 
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
          style={{
            width:'100px', 
            height:'47px', 
            fontSize:'25px', 
            border:'none', 
            backgroundColor:'#333333',
            margin:'4',
            color:'white',
            cursor:'pointer'
          }}>
            <b>Add</b>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Counter