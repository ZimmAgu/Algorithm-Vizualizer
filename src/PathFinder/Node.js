import React from 'react'

// CSS Imports
import "./Node.css"

function Node (props) {
    const {
        nodeRow,
        nodeColumn,
        startNode, 
        endNode, 
        isVisited,
        wall,
        mouseDownEventHandler,
        mouseUpEventHandler,
        mouseEnterEventHandler
    } = props;


    const nodeColorClass = (
        startNode ? 'startNode' 
        : endNode ? 'endNode' 
        : isVisited ? 'visited' 
        : wall ? 'wall'
        : ''
    );
    
    return (
        <div 
            id={`node-${nodeRow}-${nodeColumn}`}
            className={`node ${nodeColorClass}`}
            onMouseDown={() => mouseDownEventHandler(nodeRow, nodeColumn)}
            onMouseUp={() => mouseUpEventHandler()}
            onMouseEnter={() => mouseEnterEventHandler(nodeRow, nodeColumn)}
        >
        </div>
    )
}

export default Node
