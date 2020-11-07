import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor() {
  const handleEditorChange = (content) => {
    console.log('Content was updated:', content);
  };
  return (
    <Editor
      initialValue="<p>Esse é nosso editor de textos.</p>"
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'language',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
        language: 'pt_BR',
      }}
      onEditorChange={handleEditorChange}
    />
  );
}
