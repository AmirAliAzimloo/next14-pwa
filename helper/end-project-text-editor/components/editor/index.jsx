"use client"
import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({setmainText}) => {

   const editor = useRef(null);
	const [content, setContent] = useState('<p><br></p><p><br></p><h1>this is post 1</h1><p><br></p><p>sdfas asdfasd asdfasdfsdf dsfasdf</p><p><br></p><p>aisj aisd fioasfod ihasodifj [asijdf asijdfp iah</p><p><br></p><p><img src=\"https://dl.mernfa.ir/courses/text-editor-course/mernfa.ir-course-nextjs-text-editor.svg\" alt=\"عکس تستی\" width=\"300px\"></p><p><span style=\"background-color: rgb(56, 118, 29);\">yellow bg text</span></p><p><br></p><p>mernfa teasdfa sdfaxt editor course...</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>');



   return (
      <div>
         <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} 
			onBlur={newContent => {
            setContent(newContent)
            setmainText(newContent)
         }} 
		/>
      </div>
   );
}

export default Editor;