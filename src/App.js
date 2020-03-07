import React from 'react';
import { Editor } from '@tinymce/tinymce-react'
import './App.css';

function App() {
  const [state, setState] = React.useState({
    content: ""
  })
  const _handleEditorChange = e => {
    // console.log('Content was updated:', e.target)
    setState({ ...state, content: e.target.getContent() })
  }

  const _handSave = () => {
    //Let push state.content which you got to server
    //can view result at console window :)
    console.log(state.content)
  }
  console.log(window.tinymce)
  return (
    <div className="App">
      <div style={{ width: '100%' }}>
        <Editor
          apiKey={`0l9ca7pyz0qyliy0v9mmkfl2cz69uodvc8l6md8o4cnf6rnc`}
          initialValue='<p>This is the initial content of the editor</p>'
          init={{
            height: 600,
            menubar: true,
            // selector: 'textarea#full-featured',
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              `undo redo| link code image | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help`,
            // enable title field in the Image dialog
            image_title: true,
            // enable automatic uploads of images represented by blob or data URIs
            automatic_uploads: true,
            // add custom filepicker only to Image dialog
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();

                reader.onload = function () {
                  var id = 'blobid' + (new Date()).getTime();
                  var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  // call the callback and populate the Title field with the file name
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            }
          }}
          onChange={_handleEditorChange}
          value={state.content}
        />
        <div>

          <button onClick={_handSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default App;
