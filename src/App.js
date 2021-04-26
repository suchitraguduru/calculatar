
import './App.css';
import { useState } from "react";

function App() {
  let [oldExpression, setoldExpression] = useState('');
  let [expression, setExpression] = useState('0');
  let [prev, setprev] = useState('ANS');

  let numerics = new Set('0123456789.');
  let operators = new Set("+-*/%");

  let buttons = ["(", ")", "%", "AC", "7", "8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];

  let evaluateExpression = function(){
    let evaluate = eval(expression);
    setoldExpression(expression + "=");
    setExpression(String(evaluate));
    setprev("ANS");
  };

  let putNumerics = function(value){
    if(prev == "ANS"){
      setoldExpression("Ans = " + expression);
      setExpression(value);
    }else{
      setExpression(expression+value);
    }
    setprev("NUM");
  };

  let putOperator = function(value){
    if(prev != "OP"){
      setExpression(expression+value);
    }else{
      setExpression(expression.slice(0,-1)+value);
    }
    setprev("OP");
  };

  let putDelete = function(){
    if(expression.length >= 1){
      setExpression(expression.slice(0,-1));
    }
    setprev('DEL');
  };

  let handleKeyUp = function(event){
    console.log(event.key);
    if(event.key=== "Backspace"){
      putDelete();
    }else if(numerics.has(event.key)){
      putNumerics(event.key);
    }else if(operators.has(event.key)){
      putOperator(event.key);
    }
    else if(event.key==="Enter"){
      evaluateExpression();
    }
    
  };
  return (
    <div className="App" style={{
      width:"100%",
      height:"100vh",
      background:"gray",
      display:"flex",
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}
    tabIndex={0} onKeyUp={handleKeyUp}>
    <h1 style={{
      fontFamily:'sans-serif',
      fontWeight:"bold",
      fontSize:"70px",
      color:"yellow"
    }}>CALCULATAR</h1>
    

    <div style={{
      width:"400px",
      background:"white",
      display:"flex",
      flexDirection:"column",
      alignItems:"flex-end",
      justifyContent:"center",
      padding:"20px",
      borderRadius:"10px",
      overflow:"hidden"
    }}>

    <h6>{oldExpression}</h6>
    <h1>{expression}</h1>

    </div>

    
    <div style={{
      width:"400px",
      background:"white",
      display:"flex",
      flexDirection:"row",
      alignItems:"flex-end",
      justifyContent:"center",
      padding:"20px",
      borderRadius:"10px",
      flexWrap:"wrap",
      margin:"10px"
    }}>

      {buttons.map(function(buttonValue, idx){
        return <button style={{
          width:"80px",
          margin:"7px",
          borderRadius:"5px",
          padding:"7px",
          fontWeight:"bold"
        }} onClick={function(){
          if(buttonValue=== "AC"){
            putDelete();
          }else if(numerics.has(buttonValue)){
            putNumerics(buttonValue);
          }else if(operators.has(buttonValue)){
            putOperator(buttonValue);
          }
          else if(buttonValue==="="){
            evaluateExpression();
          }
        }}>{buttonValue}</button>
      })}

    </div>
 

      
    </div>
  );
}

export default App;
