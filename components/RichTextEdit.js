import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { useRef } from 'react';

const RichTextEdit = ({postContent,editorChange}, editorRef) => {
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      console.log(typeof(editorRef.current.getContent()))
    }
  };
  return (
    <>
      <Editor id="contentArea" onChange={editorChange} apiKey='jn2rvsmgm9a83b3446osxtuydmh1029afuavco7ndbb4aw77'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue= {postContent?postContent:'<p><span style="font-size:36pt;">Title goes here...</span></p><p>Content goes here...</p>'}
        init={{
          height: 500,
          menubar: false,
          paste_block_drop: false,
          plugins: [
            'advlist',' autolink','lists', 'link', 'image', 'charmap', 'preview',
            'searchreplace' ,'visualblocks' ,'code', 'fullscreen',"anchor","code","preview",
            'insertdatetime' ,'media' ,'table' ,'code' ,'help', 'wordcount','media',"image"
          ],
          toolbar:[ '| undo redo | fontfamily fontsize blocks | ',' | bold italic underline | backcolor forecolor \
          | align \
          bullist numlist removeformat | code media image preview'],
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } p{text-indent: 30px; margin-bottom: 15px;}'
        }}
      />
      {/* <p className='pt-2'>Preview:</p>
      <div className='bg-gray-100 p-2 rounded-xl '>{editorRef.current!=null &&(<div dangerouslySetInnerHTML={{ __html: editorRef.current.getContent() }} />)}</div>
      <div>
      </div> */}
    </>
  );
}
const forwardedRichTextEdit = React.forwardRef(RichTextEdit);

export default forwardedRichTextEdit;