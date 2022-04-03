import React from 'react'

const hina = () => {

function printSolution(board)
{
	for(let i = 0; i < N; i++)
	{
		for(let j = 0; j < N; j++)
		{
			console.log(board[i][j], " ")
		}
		console.log()
	}
}


function isSafe(board, row, col)
{


	for(let i = 0; i < col; i++){
		if(board[row][i] == 1)
			return false
	}


	for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
		if (board[i][j])
			return false


	for (i = row, j = col; j >= 0 && i < N; i++, j--)
		if (board[i][j])
			return false

	return true
}

function solveNQUtil(board, col){
	
	
	if(col >= N)
		return true


	for(let i=0;i<N;i++){
		// keep queen at i, col and check
		if(isSafe(board, i, col)==true){
			// if is save move on to next queen
			
			board[i][col] = 1

		
			if(solveNQUtil(board, col + 1) == true)
				return true

			
			board[i][col] = 0
		}
	}
	
	return false
}
var cord = []
function getCoordinates(board) {
	
	n = board.length
	m = board[0].length
	for (let i=0; i<N; i++){
		
		for (let j=0; j<m; j++){
			if (board[i][j]===1){
				cord.push([i,j])
			}
		}
	}
	console.log(cord)


}


function solveNQ(){
	let board = []
	for (let i=0; i<N; i++){
		board.push([0])
		for (let j=0; j<N; j++){
			board[i][j] = 0;
		}
	}

	if(solveNQUtil(board, 0) == false){
		console.log("Solution does not exist")
		return false
	}
	getCoordinates(board);
	printSolution(board)
	return true
}


// Driver Code
solveNQ()
  return <div></div>
  
}

export default {hina, solveNQ, solveNQUtil, getCoordinates, isSafe}

