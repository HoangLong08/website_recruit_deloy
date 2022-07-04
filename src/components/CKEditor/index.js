import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana'
];

const sortedFontOptions = [
  'Logical',
  'Salesforce Sans',
  'Garamond',
  'Sans-Serif',
  'Serif',
  'Times New Roman',
  'Helvetica',
  ...defaultFonts
].sort();

function CKeditor({ valueEditor, placeholder, onChangeEditor }) {
  return (
    <>
      <SunEditor
        placeholder={placeholder}
        height="200px"
        value={valueEditor || ''}
        setContents={valueEditor || ''}
        setOptions={{
          height: 'auto',
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize'],
            // ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor'],
            ['align', 'list', 'lineHeight'],
            ['outdent', 'indent'],

            ['table', 'horizontalRule', 'link', 'image', 'video'],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            // ["fullScreen", "showBlocks", "codeView"],
            ['preview', 'print'],
            ['removeFormat']

            // ['save', 'template'],
            // '/', Line break
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          attributesWhitelist: {
            table: 'style',
            tbody: 'style',
            thead: 'style',
            tr: 'style',
            td: 'style'
          },
          defaultTag: 'div',
          showPathLabel: false,
          font: sortedFontOptions,
          dialogsInBody: true
        }}
        onChange={onChangeEditor}
        onImageUploadBefore={function (files, info, uploadHandler) {
          // uploadImage(files[0], info, uploadHandler);
        }}
      />
    </>
  );
}

export default CKeditor;
