import {useState} from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

export const NoteEditor = ({
    onSave,
} : {
    onSave: (note: {title: string, content: string}) => void
}) => {
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    return (
        <div className='card mt-5 border border-slate-200 bg-base-100 shadow-xl'>
            <div className='card-body'>
                <h2 className='card-title'>
                    <input type='text' placeholder='Insert the title of note' className='input-primary input input-md w-full font-bold' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                </h2>
                <ReactCodeMirror value={text} width='500px' height='30vh' minWidth='100%' minHeight='30vh' extensions={[
                    markdown({base: markdownLanguage, codeLanguages: languages})
                ]} onChange={(value) => setText(value)} className='border border-slate-300'/>
            </div>
            <div className='card-actions justify-end'>
                <button onClick={() => {
                    onSave({
                        title,
                        content: text,
                    })
                    setText('')
                    setTitle('')
                }} className='btn-primary btn m-5' disabled={title.trim().length === 0 || text.trim().length === 0}>
                    Save
                </button>
            </div>
        </div>
    )
}
