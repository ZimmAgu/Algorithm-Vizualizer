import React from 'react'
// Algorithms
import dijkstra, {getShortestPath} from '../Algorithms/dijkstra.js';

// CSS Imports
import './PathFinderVisuals.css'

// Hook Imports
import { useEffect, useState } from 'react';

import Node from './Node'

const GRID_ROW_LENGTH = 15;
const GRID_COL_LENGTH = 30;

const START_NODE_ROW = 5;
const START_NODE_COLUMN = 5;

const END_NODE_ROW = 5;
const END_NODE_COLUMN = 20;

function PathFinder () {
    const [gridState, setGridState] = useState([]);
    const [mousePressedState, setMousePressedState] = useState(false);


    useEffect(() => {
        const grid = [];

        setUpGrid(grid)

        setGridState(grid);
    }, [])


    function visualizeDijkstra (grid) {
        const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
        const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];
    
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
        const shortestPath = getShortestPath(endNode);

        animateDijkstra(visitedNodesInOrder, shortestPath)
    }
    

    
    function animateDijkstra (visitedNodesInOrder, shortestPath) {

        const ANIMATION_SPEED = 50;
        
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() =>{
                    animateShortestPath(shortestPath); 
                }, ANIMATION_SPEED * i)
            }
        }
        

        animateNeighborVisitation(visitedNodesInOrder);
    }


    function animateNeighborVisitation (visitedNodesInOrder) {
        
        const ANIMATION_SPEED = 50;

        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i]
            setTimeout(() => {
                const currentNode = document.getElementById(`node-${node.row}-${node.column}`)  // Gets each visited node by its id

                if (!currentNode.classList.contains("startNode")) { // I don't want to color the start node
                    currentNode.classList.add("visited")    // Adds a visited class to it so the CSS class can style it
                }
                
            }, ANIMATION_SPEED * i);
        }
    }


    function animateShortestPath (shortestPathNodes) {

        const ANIMATION_SPEED = 50;

        for (let i = 0; i < shortestPathNodes.length; i++) {
            const node = shortestPathNodes[i]
            setTimeout(() => {
                const currentNode = document.getElementById(`node-${node.row}-${node.column}`)  // Gets each visited node by its id

                if (!currentNode.classList.contains("startNode") && !currentNode.classList.contains("endNode")) {
                    currentNode.classList.remove("visited") // Removes the visited class to remove all of the previous coloring of the node
                    currentNode.classList.add("shortestPathNode")   // Adds the shortest path class to recolor the nodes
                }
                
            }, ANIMATION_SPEED * i);

        }
    }



    function handleMouseDownEvent (row, column) {
        const updatedGrid = getGridWithToggledWall(gridState, row, column)
        setGridState(updatedGrid)
        setMousePressedState(true);
        // console.log('Mouse down event', row, column)
    } 
    
    function handleMouseEnterEvent (row, column) {
        if (!mousePressedState) {
            return;
        }

        const updatedGrid = getGridWithToggledWall(gridState, row, column)
        setGridState(updatedGrid)

        // console.log('Mouse enter event', row, column)
    }


    function handleMouseUpEvent () {
        setMousePressedState(false);
        // console.log('Mouse up event')
    } 

    
    

    return (
        <>
            <button onClick={() => visualizeDijkstra(gridState)}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {gridState.map((row, rowId) => {
                    return (
                        <div key={rowId}>
                            {
                                row.map((node, nodeId) => {

                                    const {
                                        row, 
                                        column, 
                                        isStart, 
                                        isEnd, 
                                        isWall
                                    } = node;


                                    return (
                                        <Node 
                                            key={nodeId}
                                            nodeRow={row}
                                            nodeColumn={column}
                                            startNode={isStart}
                                            endNode={isEnd}
                                            wall={isWall}

                                            mouseDownEventHandler={(row, column) => {
                                                handleMouseDownEvent(row, column);
                                            }}

                                            mouseUpEventHandler={() => {
                                                handleMouseUpEvent();
                                            }}

                                            mouseEnterEventHandler={(row, column) => {
                                                handleMouseEnterEvent(row, column);
                                            }}
                                        >
                                        </Node>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </>
    );
}





function setUpGrid (grid) {
    
    for (let row = 0; row < GRID_ROW_LENGTH; row++) {
        const currentRow = [];

        for (let column = 0; column < GRID_COL_LENGTH; column++) {
            const currentNode = {
                row,
                column,
                isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
                isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
                previousNode: null,     // The previous node of every node starts at null
                isWall: false,          // None of the nodes are walls initially
            }

            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
}





function getGridWithToggledWall (grid, row, column) {
    const newGrid = grid.slice();
    const node = newGrid[row][column];

    if (!node.isStart && !node.isEnd) { // Starting and ending nodes can not be made in to walls
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
    
        newGrid[row][column] = newNode;
    }

    return newGrid;
}

export default PathFinder
