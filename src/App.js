import React, { useState } from 'react';
import './App.css';
export const Cash ={
  IN:'cash-in',
  OUT:'cash-out'
}
function App() {
  const [showModal, setShowModal] = useState(false);
  const [flowType, setFlowType] = useState();
  const [listOfEntries, setEntries] = useState([]);
  const [todaysBalance, setTodaysBalance] = useState(0);
  const closeModal = ()=>{
    setShowModal(false);
  }
  const handleSubmit = (newItem)=>{
    setShowModal(false);
    setEntries(oldEntries=>[...oldEntries,newItem]);
    setTodaysBalance(oldBalance=>(newItem.type==Cash.IN?oldBalance+parseFloat(newItem.amount):oldBalance-parseFloat(newItem.amount)));
  }
  console.log("listOfEntries ",listOfEntries)
  return (
    <div className="App">
        <div>
          <h1>My Cashbook</h1>
          {
          <div className={todaysBalance>0?"today-balance-green":"today-balance-red"}>
            <h1 data-testid="balance">{`${todaysBalance} INR`}</h1>
            <p>Today's Balance</p>
          </div>}
        </div>
      {listOfEntries.length? listOfEntries.map((obj)=>{
        console.log(obj.timesamp+"")
        return (
          <div className="transaction">
          <div className="entry">
            <div >
                {obj.timestamp}
            </div>
            <h1>{obj.note}</h1>
          </div>
          <div className="entry">
            <div className="out">
              <div>Out</div>
              <p>{obj.type===Cash.OUT?`INR ${obj.amount}`:"-"}</p>
            </div>
          </div>
          <div className="entry">
          <div className="in">
              <div>In</div>
              <p>{obj.type===Cash.IN?`INR ${obj.amount}`:"-"}</p>
            </div>
          </div>
      </div>
        )
      }):<div className="no-entries">
          <p>No Entry Found!</p>
        </div>}
      <div className="action-group">
        <button className="red" data-testid="create-entry-btn" onClick={()=>{
          setFlowType(Cash.OUT);
          setShowModal(true);
        }}>Out</button>
        <button className="green" data-testid="create-entry-btn" onClick={()=>{
          setFlowType(Cash.IN);
          setShowModal(true);
        }}>IN</button>
      </div>
      {showModal?<Modal handleSubmit={handleSubmit} closeModal={closeModal} flowtype={flowType}/>:null}
    </div>
  );
}
function Modal(props) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [disabled, isDisabled] = useState(true);
  const handleSubmit = (inOrOut)=>{
      props.handleSubmit({amount, note,timestamp:(new Date()+""),type:inOrOut});
  }
  const isString = (myVar)=>{
      console.log(typeof myVar === 'string' || myVar instanceof String);
      return (typeof myVar === 'string' || myVar instanceof String)
  }
return (
  <div className="model">
      <div className="model-content">
      <button className="close-btn" onClick={props.closeModal}>close</button>
          <div className="modal-head">
              New Entry
          </div>
          <input
              type="number"
              value={amount}
              data-testid="amount"
              onChange={e =>{
                  console.log(isNaN(e.target.value)+'nan'+isString(note))
                  isDisabled(()=>((!e.target.value || !note) || isNaN(e.target.value) || !isString(note)) );setAmount(e.target.value)}}
              placeholder="INR 0.00"
          />
          <textarea 
              value={note} 
              data-testid="note"
              onChange={e => {isDisabled(()=>(!amount || !e.target.value) || (isNaN(amount) || !isString(e.target.value))); setNote(e.target.value)}}
              placeholder="Entry Note"
          />
          {props.flowtype == Cash.IN ?
          <button className="green-btn" data-testid="cashin-btn'" disabled={disabled} onClick={()=>{handleSubmit(Cash.IN)}}>IN</button>
          :
          <button className="red-btn" data-testid="cashout-btn'" disabled={disabled} onClick={()=>{handleSubmit(Cash.OUT)}}>Out</button>
          }
      </div>
  </div>
);
}

export default App;
