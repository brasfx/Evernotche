import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import routesServices from '../../services/routesServices';

export default function TextEditor() {
  const LogContent = (content) => {
    note.payload = content
    note.userid = localStorage.getItem('id');
  }
  const initialUserState = {
    title: 'teste',
    payload: 'teste',
    userid: 'teste',
    timestamp: 'teste',
  };

  

  const [note, setNote] = useState(initialUserState);

  const SaveNote = (content) => {
    console.log('Content was updated:', content);
    


    var data = {
      title: note.title,
      payload: note.payload,
      userid: note.userid,
      timestamp: note.timestamp,
    };
    routesServices
      .createNote(data)
      .then((res) => {
        setNote({
          title: res.data.title,
          payload: res.data.payload,
          userid: res.data.userid,
          timestamp: res.data.timestamp,
        });
      })
      .catch((e) => {
        console.log(e);
      });

  };
  return (
    <div>
      <form onSubmit={SaveNote}>
        <Editor
          initialValue=""
          apiKey="jy6t6urrwi3ftemqyutf851d3ueq4y4q9cdqlud3havzhtbw"
          init={{
            height: 500,
            menubar: true,
            paste_data_images: true,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                  var id = 'blobid' + new Date().getTime();
                  var blobCache =
                    window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            },
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
          onEditorChange={LogContent}
          
        />
        <button
              className="waves-effect waves-light btn-small green darken-2"
              type="submit"
            >
              Criar
        </button>
      </form>
    </div>
  );
}
