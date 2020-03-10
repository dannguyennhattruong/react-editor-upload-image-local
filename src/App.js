import React from 'react';
import { Editor } from '@tinymce/tinymce-react'
import './App.css';
import renderHTML from 'react-render-html';
var h2m = require('h2m')
const cloudName = 'nonenone25251325zz';
const unsignedUploadPreset = 'adz8s31b';


function App() {
  const [state, setState] = React.useState({
    content: "",
    saved: false,
    post: {
      description: ""
    },
    urlImage: ''
  })
  const _handleEditorChange = e => {
    console.log('Content was updated:', h2m(e.target.getContent()))
    setState({ ...state, content: e.target.getContent() })
  }

  const _handSave = () => {
    //Let push state.content which you got to server
    //can view result at console window :)
    console.log(state.content)
    setState({ ...state, saved: true })

  }

  return (
    <div className="App">
      <div style={{ width: '100%' }}>
        <Editor
          apiKey={`0l9ca7pyz0qyliy0v9mmkfl2cz69uodvc8l6md8o4cnf6rnc`}
          initialValue='<p>This is the initial content of the editor</p>'
          init={{
            height: 600,
            menubar: true,
            config: {},
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              `undo redo| link code image | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help`,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
              var xhr = new XMLHttpRequest();
              var fd = new FormData();
              xhr.open('POST', url, true);

              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();
                xhr.onload = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    // File uploaded successfully
                    var response = JSON.parse(xhr.responseText);

                    // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                    var url = response.secure_url;
                    // console.log(url)
                    // Create a thumbnail of the uploaded image, with 150px width
                    cb(url, { title: response.original_filename });

                  }
                };

                reader.onload = function () {
                  var id = 'blobid' + (new Date()).getTime();
                  var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];

                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  // call the callback and populate the Title field with the file name

                  fd.append('upload_preset', unsignedUploadPreset);
                  fd.append('tags', 'browser_upload');
                  fd.append('file', blobInfo.blob(), blobInfo.filename());

                  xhr.send(fd);

                };
                reader.readAsDataURL(file);

              };

              input.click();
            }
          }}

          onChange={_handleEditorChange}
          value={state.saved ? "" : state.content}
        />
        <div>

          <button onClick={_handSave}>Save</button>

        </div>
        <div>
          {renderHTML(state.content)}
        </div>
      </div>
    </div>
  );
}

export default App;
