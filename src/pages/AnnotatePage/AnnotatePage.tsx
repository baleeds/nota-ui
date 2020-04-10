import React, { useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { usePassage } from '../../hooks/usePassage';
import { PrimaryButton } from '../../components/Buttons';
import { Box } from '../../components/layout/Box';
import { Block } from '../../components/Block';
import { useScreen } from '../../hooks/useScreen';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';
import { Toolbar } from './Toolbar';
import { MobileHeaderNavLink } from '../../components/MobileHeader';
import { ReactComponent as ChevronLeftIcon } from '../../icons/chevron_left-24px.svg';
import { useCreateAnnotationMutation } from '../../api/__generated__/apollo-graphql';
import { attempt } from '../../base/utils/attempt';

const modules = {
  toolbar: {
    container: '#quill-toolbar',
  },
} as const;

const formats = ['bold', 'italic', 'blockquote', 'link'];

export const AnnotatePage: React.FC = () => {
  const quillRef = useRef<ReactQuill>();
  const contentRef = useRef<string>();
  const {
    fullName,
    bookName,
    chapterNumber,
    verseNumber,
    passageId,
  } = usePassage();
  const { width } = useScreen();
  const [createAnnotation, { loading }] = useCreateAnnotationMutation();

  const handlePublish = useCallback(async () => {
    if (loading) return;
    if (!passageId) throw new Error('No passage ID for annotation.');
    if (
      !quillRef.current?.editor ||
      quillRef.current.editor.getLength() <= 10 ||
      !contentRef.current
    ) {
      return;
    }

    console.log(contentRef.current);
    const [failure, result] = await attempt(
      createAnnotation({
        variables: {
          input: {
            annotationInput: { verseId: passageId, text: contentRef.current },
          },
        },
      })
    );

    console.log(failure, result);
  }, [createAnnotation, passageId, contentRef, quillRef, loading]);

  return (
    <>
      <NavigationContainer>
        <div style={{ borderBottom: `1px solid ${theme.borderColor}` }}>
          <CommandsContainer>
            <Box>
              <BackLink
                to={`/read/${bookName}/${chapterNumber}/${verseNumber}`}
              >
                <ChevronLeftIcon style={{ marginRight: 6 }} />
                {fullName || 'Unknown passage'}
              </BackLink>
            </Box>
            <Box>
              <PrimaryButton
                type="button"
                onClick={handlePublish}
                disabled={loading}
              >
                Publish
              </PrimaryButton>
            </Box>
          </CommandsContainer>
        </div>
        {width >= LARGE_SCREEN && (
          <DesktopToolbar>
            <Toolbar />
          </DesktopToolbar>
        )}
      </NavigationContainer>
      <AnnotationQuillContainer>
        <ReactQuill
          ref={instance => {
            if (!instance) return;
            instance.focus();
            quillRef.current = instance;
          }}
          placeholder="Let it fly..."
          modules={modules}
          formats={formats}
          onChange={html => (contentRef.current = html)}
        />
      </AnnotationQuillContainer>
      {width < LARGE_SCREEN && (
        <MobileToolbar>
          <Toolbar />
        </MobileToolbar>
      )}
    </>
  );
};

const NavigationContainer = styled.div`
  margin-bottom: 1px solid ${theme.borderColor};
  box-shadow: ${theme.navShadow};
  background-color: ${theme.blank};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
`;

const CommandsContainer = styled(Block)`
  display: flex;
  justify-content: space-between;
  max-width: ${theme.maxEditorWidth}px;
  margin: 0 auto;
  align-items: center;
  height: 60px;
`;

const BackLink = styled(MobileHeaderNavLink)`
  padding: 0px;
`;

const DesktopToolbar = styled.div`
  max-width: ${theme.maxEditorWidth}px;
  margin: 0 auto;
`;

const MobileToolbar = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  box-shadow: ${theme.navShadow};
`;

const AnnotationQuillContainer = styled.div`
  min-height: 100vh;
  max-width: ${theme.maxEditorWidth}px;
  margin: 0 auto;
  padding-top: 72px;

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    padding-top: 120px;
  }

  .quill {
    .ql-container {
      border: none;

      .ql-editor {
        font-size: 1.3em;
        padding: 16px;
        font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 80vh;

        p {
          margin-bottom: 16px;
        }
      }
    }
  }
`;
