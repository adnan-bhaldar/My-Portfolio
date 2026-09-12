import { WindowControls } from '#components';
import { techStack } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import { Check } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

const COMMAND = 'show tech stack'

const Terminal = ({ isOpen }) => {
    const [phase, setPhase] = useState('idle') // idle | command | typing | done
    const [commandTyped, setCommandTyped] = useState('')
    const [stageIndex, setStageIndex] = useState(-1)
    const [stageTyped, setStageTyped] = useState('')

    const cancelledRef = useRef(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (!isOpen) return

        cancelledRef.current = false
        // This effect starts an external timer-driven animation sequence in
        // response to isOpen changing (not state derivable during render),
        // so resetting these here is intentional, not an avoidable pattern.
        /* eslint-disable react-hooks/set-state-in-effect */
        setPhase('command')
        setCommandTyped('')
        setStageIndex(-1)
        setStageTyped('')
        /* eslint-enable react-hooks/set-state-in-effect */

        const typeStage = (si, ci) => {
            if (cancelledRef.current) return

            if (si >= techStack.length) {
                timeoutRef.current = setTimeout(() => setPhase('done'), 400)
                return
            }

            const text = techStack[si].items.join(', ')
            setStageIndex(si)
            setStageTyped(text.slice(0, ci))

            timeoutRef.current = ci < text.length
                ? setTimeout(() => typeStage(si, ci + 1), 18)
                : setTimeout(() => typeStage(si + 1, 0), 150)
        }

        const typeCommand = (i = 0) => {
            if (cancelledRef.current) return
            setCommandTyped(COMMAND.slice(0, i))

            timeoutRef.current = i < COMMAND.length
                ? setTimeout(() => typeCommand(i + 1), 45)
                : setTimeout(() => {
                    setPhase('typing')
                    typeStage(0, 0)
                }, 300)
        }

        typeCommand()

        return () => {
            cancelledRef.current = true
            clearTimeout(timeoutRef.current)
        }
    }, [isOpen])

    const isDone = phase === 'done'
    const commandDone = phase === 'typing' || phase === 'done'

    const handleSkip = () => {
        if (phase === 'done') return
        cancelledRef.current = true
        clearTimeout(timeoutRef.current)
        setPhase('done')
    }

    return (
        <>
            <div id='window-header'>
                <WindowControls target="terminal" />
                <h2>Tech Stack</h2>
            </div>

            <div className='techstack' onClick={handleSkip}>
                <p>
                    <span className='font-bold'>@adnan % </span>
                    {commandDone ? COMMAND : commandTyped}
                    {!commandDone && <span className='cursor' />}
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }, catIdx) => {
                        const itemsDone = isDone || stageIndex > catIdx
                        const typingItems = !isDone && stageIndex === catIdx

                        return (
                            <li key={category} className='flex items-center'>
                                <Check className='check' size={20} />
                                <h3>{category}</h3>

                                {itemsDone ? (
                                    <ul>
                                        {items.map((item, i) => (
                                            <li key={i}>{item}{i < items.length - 1 ? ',' : ''}</li>
                                        ))}
                                    </ul>
                                ) : typingItems ? (
                                    <span className='typing-items'>
                                        {stageTyped}<span className='cursor' />
                                    </span>
                                ) : null}
                            </li>
                        )
                    })}
                </ul>

                <div className="footnote">
                    <p>
                        <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
                    </p>
                </div>

                <p className={`pt-3 ${isDone ? '' : 'invisible'}`}>
                    <span className='font-bold'>@adnan % </span>
                    <span className='cursor' />
                </p>
            </div>
        </>
    )
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow;