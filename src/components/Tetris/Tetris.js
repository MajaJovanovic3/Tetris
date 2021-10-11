import React, { useState } from 'react';
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { createStage } from './gameHelpers'
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [player,updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render')
    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0, colliede: false })

    }
    const startGame = () => {
        setStage(createStage())
        resetPlayer()


    }
    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, colliede: false })

    }
    const dropPlayer = () => {
        drop();

    }

    const move = (e) => {
        if (!gameOver) {
            if (e.keyCode === 37) {
                movePlayer(-1)
            }
            else if (e.keyCode === 39) {
                movePlayer(1)
            }
            else if (e.keyCode === 40) {
                dropPlayer()
            }
        }
    }


    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display gameOver={gameOver} text="Game Over" /> :
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                    }
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;