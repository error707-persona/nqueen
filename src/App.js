import React, {useState, useEffect} from 'react'

import './index.css'
import queen1 from "./queen1.png"

const App = () => {
  const [dimension, setDimension] = useState(0);
  const [chess, setChess] = useState([]);
  const [issolvable, setissolvable] = useState(true);

  const black = {
    width:"100px",
    height:"100px",
    backgroundColor:'rgb(19, 83, 83)',
    display: "flex",
    justifyContent: "center",
    
  }
  const white = {
    width:"100px",
    height:"100px",
    backgroundColor:'white',
    display: "flex",
    justifyContent: "center",
   
    
  }
  const chessBox = {
    width:100*dimension,
    display:'flex',
    flexWrap:'wrap',
    marginTop:"20px",
    boxShadow:`0px 10px 10px rgba(0,0,0,0.1)`
  }

  function isSafe(board, row, col, N)
  {
  
  
    for(let i = 0; i < col; i++){
      if(board[row][i] == 1)
        return false
    }
  
  
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (board[i][j])
        return false
  
  
    for (let i = row, j = col; j >= 0 && i < N; i++, j--)
      if (board[i][j])
        return false
  
    return true
  }
  
  function solveNQUtil(board, col, N){
    
    
    if(col >= N)
      return true
  
  
    for(let i=0;i<N;i++){
      // keep queen at i, col and check
      if(isSafe(board, i, col, N)==true){
        // if is save move on to next queen
        
        board[i][col] = 1
  
      
        if(solveNQUtil(board, col + 1, N) == true)
          return true
  
        
        board[i][col] = 0
      }
    }
    
    return false
  }
  var cord = []
  function getCoordinates(board) {
    
    let n = board.length
    let m = board[0].length
    for (let i=0; i<n; i++){
      
      for (let j=0; j<m; j++){
        if (board[i][j]===1){
          cord.push([i,j])
        }
      }
    }
    console.log(cord)
    console.log(board)
  
  
  }
  let board = [];
  const solveNQ = (N)=> {
    
    for (let i=0; i<N; i++){
      board.push([0])
      for (let j=0; j<N; j++){
        board[i][j] = 0;
      }
    }
  
    if(solveNQUtil(board, 0, N) == false){
      console.log("Solution does not exist")
      setissolvable(false);
      setChess([]);
      return false
    }
    setissolvable(true);
    getCoordinates(board);
    for (let i=0; i<cord.length; i++){
      if (cord){
      let j = cord[i][1]
      let ans = document.getElementById(i.toString()+j.toString())
      ans.innerHTML = '<img src="'+queen1+'" height="50px" width="50px" className="centerimage"></img>'
      }
    }
    // printSolution(board)
    return true
  }
 

 


  // const queens = () => {
  //   let arr = []
  //   for (let i=0;i<dimension;i++){
  //     arr.push(<div id={i}><img src={queen1} height="50px" width="50px"></img></div>)
  //   }
  //   setqueen(arr);
  // }

  const makeChessBoard = ()=>{
    let arr = [];
    
      for (let i=0;i<dimension;i++){
        let temp = [];
        for (let j=0;j<dimension;j++){
          if ((i+j)%2){
            temp.push(<div id={i.toString()+j.toString()} style={black}></div>);
          }
          else{  
            temp.push(<div id={i.toString()+j.toString()} style={white}></div>)
          }
        }
        arr.push(temp);
      }
    

    setChess(arr);
  }

  useEffect(()=>{
    makeChessBoard();
   
  }, [dimension])



  return (
    <div className='chess'>
      
      <div>
        <h2>
          <span>N x N </span> 
          ChessBoard
        </h2>
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimension(e.target.value)} />
        <button className="solve" onClick={()=>{solveNQ(dimension)}}>Solve</button>
      </div>

      <section style={chessBox}>
        {chess}
      </section>
     {!(issolvable)?<p className='edge'>Solution Does Not exists</p>:""}
    </div>
  )
}

export default App