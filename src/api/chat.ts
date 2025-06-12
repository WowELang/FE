import axios from 'axios';
import {UserType} from './../types/dto/UserSignupReqDto';

import {useMutation, useQuery} from '@tanstack/react-query';
import {Asset} from 'react-native-image-picker';
import {useUser} from '../hooks/useUser';
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
      const {status} = await axios.put(s3Data.url, binaryData, {
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
  const response = await axiosChatInstance.get(`rooms`);
  return response.data;
};

export const getFriendList = async (userId: number, userType: UserType) => {
  const response = await axios.get(
    `http://3.36.209.182:8000/api/matching/list?userId=${userId}&userType=${userType}`,
  );
  return response.data;
};

export const getFriendRequestList = async () => {
  const response = await axiosChatInstance.get(`/matches?status=PENDING`);
  return response.data;
};

export const postFriendRequest = async (targetId: number) => {
  const response = await axiosChatInstance.post(`/matches/${targetId}`);
  return response.data;
};

export const postFriendResponse = async ({
  requestId,
  state,
}: {
  requestId: string;
  state: 'accept' | 'reject';
}) => {
  const response = await axiosChatInstance.post(
    `/matches/${requestId}/${state}`,
  );
  return response.data;
};

export const useFriend = () => {
  const {myProfileQuery} = useUser();
  const {data: userData} = myProfileQuery;

  const frienListQuery = useQuery({
    queryKey: ['friend'],
    queryFn: () => getFriendList(userData.userId, userData.usertype),
    enabled: !!userData,
  });

  const friendListRequestQuery = useQuery({
    queryKey: ['friend', 'request'],
    queryFn: getFriendRequestList,
    enabled: !!userData,
  });

  const friendRequestMutation = useMutation({
    mutationFn: postFriendRequest,
  });
  const friendResponseMutation = useMutation({
    mutationFn: postFriendResponse,
  });

  return {
    frienListQuery,
    friendListRequestQuery,
    friendRequestMutation,
    friendResponseMutation,
  };
};
