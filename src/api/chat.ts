import axios from 'axios';

import {Asset} from 'react-native-image-picker';
import {ChatMessageDto} from '../types/dto/ChatMessageDto';
import {ChatRoomDto} from '../types/dto/ChatRoomDto';
import {axiosChatInstance} from './axios';

export const getMessages = async (
  roomId: string,
  before?: string,
): Promise<ChatMessageDto[]> => {
  const {data} = await axiosChatInstance.get(
    `rooms/${roomId}/messages${before ? `?before=${before}` : ''}`,
  );
  return data;
};
const convertImageToBase64WithFetch = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    return base64;
  } catch (error) {
    throw new Error(`Failed to convert image: ${error}`);
  }
};
export const postImage = async (image: Asset) => {
  const base64Data = await convertImageToBase64WithFetch(image.uri);
  const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

  const {data: s3Data, status: s3Status} = await axiosChatInstance.post(
    '/attachments/presign',
    {
      mimeType: image.type,
    },
  );
  if (s3Status === 200) {
    try {
      const {data, status} = await axios.put(s3Data.url, binaryData, {
        headers: {
          'Content-Type': image.type,
        },
      });
      if (status === 200) return s3Data.s3Key;
    } catch (error) {
      console.log('error: ', error);
    }
  }
};

export const getImage = async (key: string) => {
  const response = await axiosChatInstance.get(
    `/attachments/presigned-url?s3Key=${key}`,
  );
  console.log('image::::', response);
  return response;
};

export const getRoomList = async (): Promise<ChatRoomDto[]> => {
  const {data} = await axiosChatInstance.get(`rooms`);
  return data;
};
