import React, { useState, useEffect, memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import routesServices from '../../services/routesServices';
import { useLocation, useHistory } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from 'react-i18next'

function TextEditor({ note: state, newTitle }) {

  //const state = { title: "Upload", userid: "topper", id: "asdvassdfga", timestamp: "14" }
  const LogContent = (content) => {
    const payload = content;
    const userid = localStorage.getItem('id');
    setNote({ ...note, payload, userid });
  }

  const initialUserState = {
    title: state.title,
    payload: state.content,
    userid: state.userid,
    timestamp: new Date(),
    color: state.color,
  };

  const { t } = useTranslation();
  const history = useHistory()
  const [note, setNote] = useState(initialUserState);
  let editor_language = "";

  if (i18next.language == "pt") editor_language = "pt_BR"
  if (i18next.language == "en") editor_language = "en_US"


  const SaveNote = (event) => {
    event.preventDefault();

    let titleAux = "";

    if (newTitle === "") {
      if (i18next.language == "pt") titleAux = "Nota"
      if (i18next.language == "en") titleAux = "Note"

    } else {
      titleAux = newTitle

    }

    var data = {
      title: titleAux,
      payload: note.payload,
      userid: note.userid,
      color: note.color,
      timestamp: new Date(),
    };
    routesServices
      .updateNote(state.id, data)
      .then((res) => {
        history.push("/viewnotes");
      })
      .catch((e) => {
        console.log(e);
      });

  };
  return (

    <div>
      <form onSubmit={SaveNote}>
        <Editor
          initialValue={state.content}
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
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            language: editor_language,
          }}
          onEditorChange={LogContent}

        />
        <div style={{ display: "grid", placeContent: "center" }}>
          <button
            className="waves-effect waves-light btn-small green darken-2"
            type="submit"

          >
            {t("save_note")}
          </button>
        </div>
      </form>
    </div>
  );
}
export default TextEditor;
