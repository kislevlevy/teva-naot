import { useRef } from 'react';
import { Text, Group, Button } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from '../../../styles/modules/fileDropzone.module.css';
import { mdiClose, mdiCloudUploadOutline, mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';

export function FileDropzone({ setFiles, files, isMany }) {
  const openRef = useRef(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        maxFiles={isMany ? 10 : 1}
        onDrop={setFiles}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxSize={2 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <Icon path={mdiDownload} size={1} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Icon path={mdiClose} size={1} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Icon path={mdiCloudUploadOutline} size={1} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>עזוב את הקובץ כעת</Dropzone.Accept>
            <Dropzone.Reject>קובץ תמונה זה אינו תואם</Dropzone.Reject>
            <Dropzone.Idle>{isMany ? 'בחר תמונות' : 'בחר תמונה'}</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            (JPEG or PNG)
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        {isMany ? 'העלה תמונות' : 'העלה תמונה'}
      </Button>
    </div>
  );
}
