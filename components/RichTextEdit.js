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
        initialValue= {postContent?postContent:'<span style="font-size:30px;">Title goes here...</span><p>Content goes here...</p>'}
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } p{text-indent: 15px; font-size: 16px; margin-bottom: 15px;}'+
          'h1{text-indent: 20px;font-size:26px;text-align:center;} span{ font-size:26px; font-weight:500;}'
        }}
      />
    </>
  );
}
const forwardedRichTextEdit = React.forwardRef(RichTextEdit);

export default forwardedRichTextEdit;