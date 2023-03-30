import styled from 'styled-components';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';


const AppWrapper = styled.div`
  display: grid;
  margin: 5em;
`;

const EditorWrapper = styled.div`
`;

const EditorContentWrapper = styled.div`
  h2 {
    font-size: 2em;
    font-weight: bold;
  }

  p {
    font-size: 1.5em;
  }
`;

const CKEditorWrapper = styled(CKEditor)`
  .ck-editor__editable_inline {
    min-height: 500px;
  }
`;

const RichEditor = ({
    onContentChange
}) => {
    const [text, setText] = useState("")

    return (
        <AppWrapper>
      <EditorWrapper>
        <CKEditorWrapper
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
            onContentChange(text)
          }}
        />
      </EditorWrapper>
    </AppWrapper>
  )
};

export default RichEditor;